import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { booksData } from '../../constants/booksData';
import { addBookToSaved, getSavedBooks, onSavedBooksChange, removeBookFromSaved } from '../../constants/savedBooksData';

// Stato per i libri letti (solo in memoria per la sessione)
let readBooks: string[] = [];

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const book = booksData.find(b => b.id === id);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(false);
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    const checkIfBookIsSaved = () => {
      const savedBooks = getSavedBooks();
      const isSaved = savedBooks.some(b => b.id === id);
      setIsAddedToFavorites(isSaved);
      
      // Controlla se il libro è segnato come letto
      setIsRead(readBooks.includes(id as string));
    };

    checkIfBookIsSaved();

    const unsubscribe = onSavedBooksChange(checkIfBookIsSaved);
    return unsubscribe;
  }, [id]);

  const handleToggleFavorite = () => {
    if (!book) return;

    if (isAddedToFavorites) {
      removeBookFromSaved(book.id);
      alert(`"${book.title}" rimosso dai preferiti!`);
    } else {
      addBookToSaved(book, 'preferiti');
      alert(`"${book.title}" aggiunto ai preferiti!`);
    }
  };

  const handleToggleReadStatus = () => {
    if (!book) return;

    if (isRead) {
      // Rimuovi dai libri letti
      readBooks = readBooks.filter(bookId => bookId !== book.id);
      setIsRead(false);
      alert(`"${book.title}" segnato come non letto!`);
    } else {
      // Aggiungi ai libri letti
      if (!readBooks.includes(book.id)) {
        readBooks.push(book.id);
      }
      setIsRead(true);
      alert(`"${book.title}" segnato come letto!`);
    }
  };

  if (!book) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Libro non trovato</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText type="title">{book.title}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.bookContainer}>
        <Image 
          source={{ uri: book.image }} 
          style={styles.bookImage}
          contentFit="cover"
          transition={1000}
        />
        
        <ThemedView style={styles.detailsContainer}>
          <ThemedText type="defaultSemiBold" style={styles.title}>{book.title}</ThemedText>
          <ThemedText type="default" style={styles.author}>di {book.author}</ThemedText>
          <ThemedText type="subtitle" style={styles.genre}>{book.genre}</ThemedText>
          
          <View style={styles.statusContainer}>
            <TouchableOpacity 
              style={[styles.statusButton, isRead ? styles.readButton : styles.unreadButton]}
              onPress={handleToggleReadStatus}
            >
              <Ionicons 
                name={isRead ? "checkmark-circle" : "checkmark-circle-outline"} 
                size={20} 
                color={isRead ? "#2E8B57" : "#666"} 
              />
              <ThemedText style={[styles.statusButtonText, isRead && { color: "#2E8B57" }]}>
                {isRead ? "Letto" : "Segna come letto"}
              </ThemedText>
            </TouchableOpacity>
            
            {isRead && book.rating && (
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <ThemedText style={styles.ratingText}>{book.rating}/5</ThemedText>
              </View>
            )}
          </View>
          
          <ThemedText style={styles.sectionTitle}>Descrizione</ThemedText>
          <ThemedText style={styles.description}>{book.description}</ThemedText>
          
          <ThemedText style={styles.sectionTitle}>Trama</ThemedText>
          <ThemedText style={styles.plot}>{book.plot}</ThemedText>
          
          <View style={styles.technicalDetails}>
            {book.publishedYear && (
              <ThemedText style={styles.detail}>Anno di pubblicazione: {book.publishedYear}</ThemedText>
            )}
            
            {book.pages && (
              <ThemedText style={styles.detail}>Pagine: {book.pages}</ThemedText>
            )}
            
            {book.rating && (
              <ThemedText style={styles.detail}>
                Valutazione: {book.rating}/5
                <Ionicons name="star" size={16} color="#FFD700" style={styles.starIcon} />
              </ThemedText>
            )}
          </View>
          
          <View style={styles.actions}>
            <TouchableOpacity 
              style={[styles.simpleButton, isAddedToFavorites ? styles.removeButton : styles.addButton]}
              onPress={handleToggleFavorite}
            >
              <Ionicons 
                name={isAddedToFavorites ? "heart" : "heart-outline"} 
                size={20} 
                color="#ff3b30" 
              />
              <ThemedText style={styles.simpleButtonText}>
                {isAddedToFavorites ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
              </ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.simpleButton}
              onPress={() => Linking.openURL(`https://www.amazon.it/s?k=${encodeURIComponent(book.title + ' ' + book.author)}`)}
            >
              <Ionicons name="logo-amazon" size={20} color="#FF9900" />
              <ThemedText style={styles.simpleButtonText}>Cerca su Amazon</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  bookContainer: {
    padding: 16,
  },
  bookImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailsContainer: {
    gap: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 4,
  },
  author: {
    fontSize: 18,
    color: '#666',
    marginBottom: 4,
  },
  genre: {
    fontSize: 16,
    color: '#888',
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },
  readButton: {
    backgroundColor: '#E8F5E8',
  },
  unreadButton: {
    backgroundColor: '#f0f0f0',
  },
  statusButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E8B57',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
    color: '#444',
  },
  plot: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    textAlign: 'justify',
    marginBottom: 20,
  },
  technicalDetails: {
    marginVertical: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  starIcon: {
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 8,
  },
  simpleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#f8f8f8',
  },
  removeButton: {
    backgroundColor: '#fff0f0',
    borderWidth: 1,
    borderColor: '#ff3b30',
  },
  simpleButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});