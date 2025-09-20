import { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

import { Book } from '@/constants/booksData';
import { getSavedBooks, removeBookFromSaved, onSavedBooksChange } from '@/constants/savedBooksData';
import Ionicons from '@expo/vector-icons/Ionicons';
import { storage } from '@/utils/storage';
import { showAuthAlert } from '@/utils/authAlert';

// Variabile globale per i libri letti 
declare global {
  var readBooks: string[];
}
globalThis.readBooks = globalThis.readBooks || [];

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [readBooksCount, setReadBooksCount] = useState(0);
  const [alertShown, setAlertShown] = useState(false); // Nuovo stato per tracciare se l'alert è già stato mostrato

  useEffect(() => {
    loadUserData();
    loadBooksData();
  }, []);

  const loadUserData = async () => {
    const userData = await storage.getUser();
    setUser(userData);
  };

  const loadBooksData = () => {
    const books = getSavedBooks();
    setSavedBooks(books);
    setReadBooksCount(globalThis.readBooks.length);
    
    const unsubscribe = onSavedBooksChange(() => {
      const updatedBooks = getSavedBooks();
      setSavedBooks(updatedBooks);
    });
    
    const interval = setInterval(() => {
      setReadBooksCount(globalThis.readBooks.length);
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  };

  // Mostra l'alert quando il componente viene renderizzato e l'utente non è autenticato
  if (!user && !alertShown) {
    // Imposta che l'alert è stato mostrato per evitare loop
    setAlertShown(true);
    
    // Mostra l'alert dopo un piccolo delay per evitare problemi di rendering
    setTimeout(() => {
      showAuthAlert({
        message: 'Accedi per vedere il tuo profilo personale',
        onCancel: () => {
          router.back();
        },
        onLogin: () => {
          router.push('/(auth)/login');
        },
        onRegister: () => {
          router.push('/(auth)/register');
        }
      });
    }, 100);
  }

  const handleLogout = async () => {
    await storage.removeUser();
    setUser(null);
    Alert.alert('Logout', 'Sei stato disconnesso con successo');
  };

  // Se l'utente non è autenticato, mostra solo l'header senza contenuto
  if (!user) {
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#E8F5E8', dark: '#1B3B1B' }}
        headerImage={
          <IconSymbol
            size={310}
            color="#74C365"
            name="person.crop.circle.fill"
            style={styles.headerImage}
          />
        }>
        
        <ThemedView style={styles.notAuthenticatedContainer}>
          <Ionicons name="lock-closed" size={64} color="#ccc" />
          <ThemedText type="title" style={styles.notAuthenticatedTitle}>
            Profilo non disponibile
          </ThemedText>
          <ThemedText style={styles.notAuthenticatedText}>
            Accedi o registrati per sbloccare tutte le funzionalità
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    );
  }

    return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E8F5E8', dark: '#1B3B1B' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#74C365"
          name="person.crop.circle.fill"
          style={styles.headerImage}
        />
      }>
      
      <ThemedView style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <Image 
            source={require('@/assets/images/profile.png')}
            style={styles.profileImage}
            contentFit="cover"
          />
          <View style={styles.profileInfo}>
            <ThemedText type="title" style={styles.userName}>
               {user.name}
            </ThemedText>
            <ThemedText style={styles.userStats}>
              {savedBooks.length} libri preferiti • {readBooksCount} libri letti
            </ThemedText>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText type="defaultSemiBold" style={styles.statNumber}>
              {savedBooks.length}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Preferiti</ThemedText>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statItem}>
            <ThemedText type="defaultSemiBold" style={styles.statNumber}>
              {readBooksCount}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Letti</ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* SEZIONE PREFERITI CLICCABILE */}
      <ThemedView style={styles.favoritesSection}>
        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/my-list')}
          style={styles.favoritesButton}
        >
          <View style={styles.favoritesContent}>
            <View style={styles.favoritesInfo}>
              <Ionicons name="bookmark" size={24} color="#007AFF" />
              <View style={styles.favoritesTextContainer}>
                <ThemedText type="title" style={styles.favoritesTitle}>
                  I tuoi Preferiti
                </ThemedText>
                <ThemedText style={styles.favoritesSubtitle}>
                  {savedBooks.length} libr{savedBooks.length !== 1 ? 'i' : 'o'} {savedBooks.length !== 1 ? 'salvati' : 'salvato'}
                </ThemedText>
              </View>
            </View>
            <Ionicons name="arrow-forward" size={24} color="#007AFF" />
          </View>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.readSection}>
        <ThemedText type="title" style={styles.sectionTitle}>
          Libri Letti ({readBooksCount})
        </ThemedText>

        {readBooksCount === 0 ? (
          <ThemedView style={styles.emptyState}>
            <Ionicons name="book-outline" size={48} color="#ccc" />
            <ThemedText style={styles.emptyText}>
              Nessun libro letto
            </ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Inizia a leggere e segna i libri come letti!
            </ThemedText>
          </ThemedView>
        ) : (
          <ThemedView style={styles.readBooksList}>
            {savedBooks
              .filter(book => globalThis.readBooks.includes(book.id))
              .slice(0, 5)
              .map(book => (
                <TouchableOpacity 
                  key={book.id}
                  style={styles.readBookItem}
                  onPress={() => router.push(`/book/${book.id}`)}
                >
                  <Ionicons name="checkmark-circle" size={20} color="#2E8B57" />
                  <ThemedText style={styles.readBookTitle} numberOfLines={1}>
                    {book.title}
                  </ThemedText>
                </TouchableOpacity>
              ))
            }
            {readBooksCount > 5 && (
              <ThemedText style={styles.moreText}>
                +{readBooksCount - 5} altri libri letti
              </ThemedText>
            )}
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView style={styles.actionsSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Azioni
        </ThemedText>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="settings-outline" size={20} color="#007AFF" />
          <ThemedText style={styles.actionButtonText}>Impostazioni</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="help-circle-outline" size={20} color="#007AFF" />
          <ThemedText style={styles.actionButtonText}>Guida e Supporto</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#ff3b30" />
          <ThemedText style={[styles.actionButtonText, { color: '#ff3b30' }]}>
            Esci
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  profileSection: {
    padding: 20,
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    marginBottom: 4,
  },
  userStats: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#ddd',
  },
  statNumber: {
    fontSize: 24,
    color: '#2E8B57',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  favoritesSection: {
    padding: 20,
    marginBottom: 20,
  },
  readSection: {
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  homeButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  readBooksList: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
  },
  readBookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  readBookTitle: {
    marginLeft: 12,
    flex: 1,
    color: '#333',
  },
  moreText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 8,
  },
  actionsSection: {
    padding: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButtonText: {
    marginLeft: 12,
    fontSize: 16,
  },
  notAuthenticatedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 400,
  },
  notAuthenticatedTitle: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  notAuthenticatedText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  favoritesButton: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  favoritesContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favoritesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  favoritesTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  favoritesTitle: {
    fontSize: 18,
    marginBottom: 4,
    color: '#000',
  },
  favoritesSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});