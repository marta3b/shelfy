import { Book } from './booksData';

// Dichiarazione della variabile globale
declare global {
  var savedBooks: Book[];
}

// Inizializza solo se non esiste già
if (!globalThis.savedBooks) {
  globalThis.savedBooks = [];
}

const listeners: Array<() => void> = [];

// Funzione per notificare tutti i listener
const notifyListeners = () => {
  listeners.forEach(listener => listener());
};

export const addBookToSaved = (book: Book, listName: string) => {
  if (!globalThis.savedBooks.some(b => b.id === book.id)) {
    globalThis.savedBooks.push(book);
    console.log('Libro aggiunto:', book.title, 'Totale:', globalThis.savedBooks.length);
    notifyListeners();
  }
};

export const getSavedBooks = (): Book[] => {
  console.log('Libri salvati recuperati:', globalThis.savedBooks.length);
  return [...globalThis.savedBooks]; // Restituisce una copia dell'array
};

export const removeBookFromSaved = (bookId: string) => {
  globalThis.savedBooks = globalThis.savedBooks.filter(book => book.id !== bookId);
  console.log('Libro rimosso. Totale:', globalThis.savedBooks.length);
  notifyListeners();
};

export const onSavedBooksChange = (callback: () => void) => {
  listeners.push(callback);
  
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };
};

// Funzione di debug per verificare lo stato
export const debugSavedBooks = () => {
  console.log('DEBUG - Libri salvati:', globalThis.savedBooks.map(b => b.title));
  return globalThis.savedBooks;
};