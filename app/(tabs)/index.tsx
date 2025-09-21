import { useState } from 'react';
import { Image } from 'expo-image';
import { View, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import { booksData, booksByGenre, genreOrder, Book, genres } from '@/constants/booksData';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HomeScreen() {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(booksData);

  const handleGenreSelect = (genre: string) => {
    if (selectedGenre === genre) {
      setSelectedGenre(null);
      setFilteredBooks(booksData);
    } else {
      setSelectedGenre(genre);
      const filtered = booksData.filter(book => book.genre === genre);
      setFilteredBooks(filtered);
    }
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

  const renderGenreSection = (genre: string) => {
    const books = booksByGenre[genre];
    if (!books || books.length === 0) return null;
    
    return (
      <View key={genre} style={styles.genreSection}>
        <ThemedText type="title" style={styles.genreTitle}>{genre}</ThemedText>
        <FlatList
          data={books}
          renderItem={renderBookItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <Image
          source={require('@/assets/images/logo2.png')} // Modifica il percorso con la tua immagine
          style={styles.logoImage}
          contentFit="contain"
          transition={1000}
        />
        <ThemedText style={styles.subtitle}>La tua libreria personale</ThemedText>
        <ThemedText type="title" style={styles.sectionGenreTitle}>
          {selectedGenre ? `Libri di genere: ${selectedGenre}` : 'Generi popolari'}
        </ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreScroll}>
          {genres.map(genre => (
            <TouchableOpacity 
              key={genre} 
              style={[
                styles.genrePill,
                selectedGenre === genre && styles.genrePillSelected
              ]}
              onPress={() => handleGenreSelect(genre)}
            >
              <ThemedText style={[
                styles.genrePillText,
                selectedGenre === genre && styles.genrePillTextSelected
              ]}>
                {genre}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      {selectedGenre ? (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle" style={styles.genreTitle}>
            {filteredBooks.length} libr{filteredBooks.length !== 1 ? 'i' : 'o'} trovat{filteredBooks.length !== 1 ? 'i' : 'o'}
          </ThemedText>
          <FlatList
            data={filteredBooks}
            renderItem={renderBookItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.gridContainer}
            scrollEnabled={false}
          />
        </ThemedView>
      ) : (
        <View>
          {genreOrder.map(renderGenreSection)}
        </View>
      )}

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.sectionGenreTitle}>Esplora la tua libreria</ThemedText>
        <ThemedText style={styles.subtitle}>
          Seleziona un genere per filtrare i libri o scorri per scoprire tutte le categorie.
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9C4',
  },
  titleContainer: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(180, 220, 180, 0.6)',
  },
  logoImage: {
    width: '100%', 
    height: 100, 
    borderRadius: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#535353ff',
    marginBottom:20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFF9C4',
  },
  sectionGenreTitle: {
    fontSize: 26,
    color: 'black',
  },
  genreSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  genreTitle: {
    marginBottom: 8,
    fontSize: 20,
    color:'black'
  },
  bookCard: {
    width: 150,
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
    height: 200,
  },
  bookInfo: {
    padding: 12,
  },
  titleText: {
    fontSize: 16,
    marginTop: 4,
    color: '#666',
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
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  genreScroll: {
    paddingVertical: 8,
  },
  genrePill: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  genrePillSelected: {
    backgroundColor: '#2E8B57',
  },
  genrePillText: {
    color: '#2E8B57',
    fontWeight: '500',
  },
  genrePillTextSelected: {
    color: 'white',
  },
});