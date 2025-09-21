import { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { booksData, Book } from '@/constants/booksData';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(booksData);

  const filterBooks = (query: string) => {
    if (query === '') {
      setFilteredBooks(booksData);
    } else {
      const filtered = booksData.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterBooks(query);
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
    <ScrollView style={styles.container}>

      <ThemedView style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cerca libri o autori..."
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus={true}
          />
        </View>
      </ThemedView>

      <ThemedView style={styles.resultsSection}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          {searchQuery ? `Risultati per "${searchQuery}" (${filteredBooks.length})` : 'Tutti i libri'}
        </ThemedText>
        
        {filteredBooks.length === 0 && searchQuery ? (
          <ThemedView style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="#ccc" />
            <ThemedText style={styles.emptyText}>
              Nessun risultato trovato
            </ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Prova con un termine di ricerca diverso
            </ThemedText>
          </ThemedView>
        ) : (
          <FlatList
            data={filteredBooks}
            renderItem={renderBookItem}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.horizontalList}
          />
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9C4',
  },
  searchContainer: {
    marginBottom: 24, // Ridotto da 24
    padding:20,
    backgroundColor: 'rgba(180, 220, 180, 0.6)',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  resultsSection: {
    marginTop: 40,
    paddingHorizontal: 16,
    padding:20,
    flex: 1,
    backgroundColor: 'rgba(180, 220, 180, 0.6)',
  },
  sectionTitle: {
    marginBottom: 12, // Ridotto da 16
    fontSize: 20,
    color: 'black',
  },
  horizontalList: {
    paddingVertical: 8,
    paddingRight: 16,
    paddingLeft: 5,
  },
  bookCard: {
    width: 140, // Ridotto da 150
    marginRight: 12, // Ridotto da 16
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
    height: 180, // Ridotto da 200
  },
  bookInfo: {
    padding: 10, // Ridotto da 12
  },
  titleText: {
    fontSize: 16,
    marginTop: 4,
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
  emptyState: {
    alignItems: 'center',
    padding: 70, // Ridotto da 40
    marginTop: 16, // Ridotto da 20
    backgroundColor: 'rgba(180, 220, 180, 0)',
  },
  emptyText: {
    fontSize: 16, // Ridotto da 18
    color: '#000',
    marginTop: 12, // Ridotto da 16
    marginBottom: 6, // Ridotto da 8
  },
  emptySubtext: {
    fontSize: 14,
    color: '#464646ff',
    textAlign: 'center',
  },
});