import { Book } from './booksData';

// Dichiarazione della variabile globale
declare global {
  var readBooks: Book[];
}

// Inizializza solo se non esiste già
if (!globalThis.readBooks) {
  globalThis.readBooks = [];
}

const readListeners: Array<() => void> = [];

// Funzione per notificare tutti i listener
const notifyListeners = () => {
  readListeners.forEach(listener => listener());
};

export const addBookToRead = (book: Book) => {
  if (!globalThis.readBooks.some(b => b.id === book.id)) {
    globalThis.readBooks.push(book);
    console.log('Libro segnato come letto:', book.title, 'Totale libri letti:', globalThis.readBooks.length);
    notifyListeners();
  }
};

export const getReadBooks = (): Book[] => {
  console.log('Libri letti recuperati:', globalThis.readBooks.length);
  return [...globalThis.readBooks]; // Restituisce una copia dell'array
};

export const removeBookFromRead = (bookId: string) => {
  globalThis.readBooks = globalThis.readBooks.filter(book => book.id !== bookId);
  console.log('Libro rimosso dai letti. Totale libri letti:', globalThis.readBooks.length);
  notifyListeners();
};

export const isBookRead = (bookId: string): boolean => {
  return globalThis.readBooks.some(book => book.id === bookId);
};

export const onReadBooksChange = (callback: () => void) => {
  readListeners.push(callback);
  
  return () => {
    const index = readListeners.indexOf(callback);
    if (index > -1) {
      readListeners.splice(index, 1);
    }
  };
};

// Funzione di debug per verificare lo stato
export const debugReadBooks = () => {
  console.log('DEBUG - Libri letti:', globalThis.readBooks.map(b => b.title));
  return globalThis.readBooks;
};