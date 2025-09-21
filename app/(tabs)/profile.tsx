import { useState, useEffect, useCallback } from 'react';
import { Image } from 'expo-image';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { Book } from '@/constants/booksData';
import { getSavedBooks, onSavedBooksChange } from '@/constants/savedBooksData';
import { getReadBooks, onReadBooksChange} from '@/constants/readBooksData';

import Ionicons from '@expo/vector-icons/Ionicons';
import { storage } from '@/utils/storage';
import { showAuthAlert } from '@/utils/authAlert';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [readBooks, setReadBooks] = useState<Book[]>([]);
  const [alertShown, setAlertShown] = useState(false); 

  const loadUserData = async () => {
    const userData = await storage.getUser();
    setUser(userData);
    setAlertShown(false);
  };

  const loadBooksData = () => {
    const books = getSavedBooks();
    setSavedBooks(books);
    
    const readBooksData = getReadBooks();
    setReadBooks(readBooksData);
  };

  useFocusEffect(
    useCallback(() => {
      loadUserData();
      loadBooksData();

      const unsubscribeSaved = onSavedBooksChange(() => {
        const updatedBooks = getSavedBooks();
        setSavedBooks(updatedBooks);
      });

      const unsubscribeRead = onReadBooksChange(() => {
        const updatedReadBooks = getReadBooks();
        setReadBooks(updatedReadBooks);
      });

      return () => {
        unsubscribeSaved();
        unsubscribeRead();
      };
    }, [])
  );

  useEffect(() => {
    if (!user && !alertShown) {
      setAlertShown(true);
      
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
  }, [user, alertShown]);

  const handleLogout = async () => {
    await storage.removeUser();
    setUser(null);
    Alert.alert('Logout', 'Sei stato disconnesso con successo');
  };

  if (!user) {
    return (
      <ScrollView style={styles.container}>
        <ThemedView style={styles.notAuthenticatedContainer}>
          <Ionicons name="lock-closed" size={64} color="#ccc" />
          <ThemedText type="title" style={styles.notAuthenticatedTitle}>
            Profilo non disponibile
          </ThemedText>
          <ThemedText style={styles.notAuthenticatedText}>
            Accedi o registrati per sbloccare tutte le funzionalità
          </ThemedText>
        </ThemedView>
      </ScrollView>
    );
  }

    return (
    <ScrollView style={styles.container}>
      
      <ThemedView style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <Image 
            source={require('@/assets/images/profile-image.png')}
            style={styles.profileImage}
            contentFit="cover"
          />
          <View style={styles.profileInfo}>
            <ThemedText type="title" style={styles.userName}>
               {user.name}
            </ThemedText>
            <ThemedText style={styles.userStats}>
              {user.email}
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
              {readBooks.length}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Letti</ThemedText>
          </View>
        </View>
      </ThemedView>

      <ThemedView style={styles.container}>
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

      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.sectionReadTitle}>
          Libri Letti ({readBooks.length})
        </ThemedText>

        {readBooks.length === 0 ? (
          <ThemedView style={styles.emptyState}>
            <Ionicons name="book-outline" size={48} color="#a5a5a5ff" />
            <ThemedText style={styles.emptyText}>
              Nessun libro letto
            </ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Inizia a leggere e segna i libri come letti!
            </ThemedText>
          </ThemedView>
        ) : (
          <ThemedView style={styles.readBooksContainer}>
            <FlatList
              data={readBooks}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.readBookItem}
                  onPress={() => router.push(`/book/${item.id}`)}
                >
                  <View style={styles.checkboxContainer}>
                    <Ionicons 
                      name="checkmark-circle" 
                      size={24} 
                      color="#2E8B57" 
                    />
                  </View>
                  
                  <View style={styles.readBookInfo}>
                    <ThemedText style={styles.readBookTitle} numberOfLines={1}>
                      {item.title}
                    </ThemedText>
                    <ThemedText style={styles.readBookAuthor} numberOfLines={1}>
                      di {item.author}
                    </ThemedText>
                  </View>
                  
                  {item.rating && (
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <ThemedText style={styles.ratingText}>
                        {item.rating}
                      </ThemedText>
                    </View>
                  )}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFF9C4',
  },
  profileSection: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(180, 220, 180, 0.6)',
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
    color: 'black',
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
    borderRadius: 16,
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
  sectionReadTitle: {
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    fontSize: 26,
    color: 'black',
    backgroundColor: 'rgba(180, 220, 180, 0.6)',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    marginBottom: 60,
    backgroundColor: 'rgba(180, 220, 180, 0.6)',
  },
  emptyText: {
    fontSize: 18,
    color: '#000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#393939ff',
    textAlign: 'center',
    marginBottom: 20,
  },
  readBooksContainer: {
    backgroundColor: 'rgba(180, 220, 180, 0.6)',
    padding: 16,
    marginBottom: 60,
  },
  readBookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  readBookInfo: {
    flex: 1,
  },
  readBookTitle: {
    flex: 1,
    color: '#333',
  },
  readBookAuthor: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E8B57',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  ratingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  actionsSection: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: 'rgba(180, 220, 180, 0.6)'
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 16,
    color: 'black',
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
    color: 'black',
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
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 16,
    borderWidth: 10,
    borderColor: 'rgba(180, 220, 180, 0.6)',
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