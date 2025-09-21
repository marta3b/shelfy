import { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

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
          <ThemedText type="defaultSemiBold" numberOfLines={1} style={styles.titleText}>{item.title}</ThemedText>
          <ThemedText type="default" style={styles.authorText}>{item.author}</ThemedText>
          <ThemedText type="subtitle" style={styles.genreText}>{item.genre}</ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      <ThemedView style={styles.header}>
        <ThemedText style={styles.subtitle}>
          I libri che hai salvato per leggerli in seguito
        </ThemedText>
        <ThemedText style={styles.countText}>
          {savedBooks.length} libr{savedBooks.length !== 1 ? 'i' : 'o'} salvat{savedBooks.length !== 1 ? 'i' : 'o'}
        </ThemedText>
      </ThemedView>

      {savedBooks.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <Ionicons name="book-outline" size={48} color="#b7b6b6ff" />
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
        <ScrollView style={styles.scrollView}>
          <ThemedView style={styles.listSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              I tuoi libri ({savedBooks.length})
            </ThemedText>
            
            <FlatList
              data={savedBooks}
              renderItem={renderBookItem}
              keyExtractor={item => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.gridContainer}
              columnWrapperStyle={styles.columnWrapper}
              scrollEnabled={false}
            />
          </ThemedView>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9C4',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 30,
    marginBottom: 24,
    backgroundColor: 'rgba(180, 220, 180, 0.6)',
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
  },
  emptyState: {
    alignItems: 'center',
    padding: 80,
    marginTop: 35,
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
    color: '#494949ff',
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
    padding: 20,
    backgroundColor: 'rgba(180, 220, 180, 0.6)',
  },
  sectionTitle: {
    marginBottom: 16,
    color: 'black',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 16,
  },
  bookCard: {
    width: 140,
    marginRight: 12,
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
    height: 180,
  },
  bookInfo: {
    padding: 10,
  },
  titleText: {
    fontSize: 16,
    color: '#000',
  },
  authorText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  genreText: {
    color: '#888',
    fontSize: 11,
    marginTop: 4,
  },
  gridContainer: {
    paddingBottom: 20, // Aggiungi padding per evitare che l'ultimo elemento sia tagliato
  },
  countText: {
    fontSize: 14,
    color: '#2E8B57',
    marginTop: 4,
    fontWeight: '600',
  },
});