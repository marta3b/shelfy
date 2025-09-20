import { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { Book } from '@/constants/booksData';
import { getSavedBooks, onSavedBooksChange } from '@/constants/savedBooksData';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MyListScreen() {
  const router = useRouter();
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);

  useEffect(() => {
    loadSavedBooks();
    
    const unsubscribe = onSavedBooksChange(loadSavedBooks);
    return unsubscribe;
  }, []);

  const loadSavedBooks = () => {
    const books = getSavedBooks();
    console.log('Libri salvati trovati:', books.length); // Debug
    setSavedBooks(books);
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity 
      onPress={() => {
        router.push(`/book/${item.id}`);
      }}
    >
      <ThemedView style={styles.bookCard}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.bookImage}
          contentFit="cover"
          transition={1000}
        />
        <View style={styles.bookInfo}>
          <ThemedText type="defaultSemiBold" numberOfLines={1}>{item.title}</ThemedText>
          <ThemedText type="default" style={styles.authorText}>{item.author}</ThemedText>
          <ThemedText type="subtitle" style={styles.genreText}>{item.genre}</ThemedText>
          
          {/* Rimosso il pulsante di rimozione */}
          <View style={styles.viewAction}>
            <ThemedText style={styles.viewActionText}>Tocca per vedere dettagli</ThemedText>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E8F5E8', dark: '#1B3B1B' }}
      headerImage={
        <Image
          source={require('@/assets/images/libri-bho.png')}
          style={styles.headerImage}
        />
      }>
      
      <ThemedView style={styles.header}>
        <ThemedText type="title">La tua lista</ThemedText>
        <ThemedText style={styles.subtitle}>
          I libri che hai salvato per leggerli in seguito
        </ThemedText>
        <ThemedText style={styles.countText}>
          {savedBooks.length} libr{savedBooks.length !== 1 ? 'i' : 'o'} salvat{savedBooks.length !== 1 ? 'i' : 'o'}
        </ThemedText>
      </ThemedView>

      {savedBooks.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <Ionicons name="book-outline" size={48} color="#ccc" />
          <ThemedText style={styles.emptyText}>
            La tua lista è vuota
          </ThemedText>
          <ThemedText style={styles.emptySubtext}>
            Esplora la libreria e aggiungi libri che vuoi leggere
          </ThemedText>
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => router.push('/(tabs)')}
          >
            <ThemedText style={styles.exploreButtonText}>Esplora libreria</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ) : (
        <ThemedView style={styles.listSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            I tuoi libri ({savedBooks.length})
          </ThemedText>
          
          <FlatList
            data={savedBooks}
            renderItem={renderBookItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.gridContainer}
            scrollEnabled={false}
          />
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 60,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    marginTop: 60,
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
  exploreButton: {
    backgroundColor: '#2E8B57',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  listSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  bookCard: {
    width: '48%',
    marginBottom: 16,
    marginRight: '4%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookImage: {
    width: '100%',
    height: 200,
  },
  bookInfo: {
    padding: 12,
  },
  authorText: {
    fontSize: 14,
    marginTop: 4,
    color: '#666',
  },
  genreText: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  viewAction: {
    marginTop: 12,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 6,
    alignItems: 'center',
  },
  viewActionText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  gridContainer: {
    justifyContent: 'space-between',
  },
  headerImage: {
    height: 200,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  countText: {
    fontSize: 14,
    color: '#2E8B57',
    marginTop: 4,
    fontWeight: '600',
  },
});