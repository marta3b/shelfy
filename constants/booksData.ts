export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  plot: string;
  image: string;
  publishedYear?: number;
  pages?: number;
  rating?: number;
}

export const booksData: Book[] = [
  {
    id: '1',
    title: 'Orgoglio e Pregiudizio',
    author: 'Jane Austen',
    genre: 'Romanzo rosa',
    description: 'Una delle più famose storie d\'amore della letteratura inglese.',
    plot: `Orgoglio e Pregiudizio racconta...`,
    image: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg',
    publishedYear: 1813,
    pages: 432,
    rating: 4.7
  },
  {
  id: '2',
  title: 'La vacanza perfetta',
  author: 'Jeneva Rose',
  genre: 'Giallo/Thriller',
  description: 'Una vacanza da sogno che si trasforma in un incubo inaspettato.',
  plot: `Una coppia in crisi decide di fare un'ultima vacanza insieme per salvare il matrimonio. Scelgono una villa isolata in montagna, perfetta per riconnettersi. Ma quando arrivano, scoprono che la villa non è così deserta come sembrava. Presenze inquietanti, eventi inspiegabili e segreti sepolti vengono alla luce, trasformando la vacanza perfetta in una lotta per la sopravvivenza. Ogni giorno rivela nuovi misteri e nessuno è quello che sembra.`,
  image: 'https://m.media-amazon.com/images/I/8141RBVTHzL._SL1500_.jpg',
  publishedYear: 2022,
  pages: 320,
  rating: 4.2
},
{
  id: '3',
  title: 'Non svegliarti',
  author: 'Liz Lawler',
  genre: 'Giallo/Thriller',
  description: 'Un thriller medico che ti terrà sveglio tutta la notte.',
  plot: `Sarah, un'infermiera dedicata, inizia il turno di notte in un ospedale apparentemente tranquillo. Ma quando i pazienti iniziano a comportarsi in modo strano e eventi inspiegabili accadono nei corridoi deserti, Sarah si rende conto che c'è qualcosa di terribilmente sbagliato. I confini tra realtà e allucinazione si confondono, e presto capisce che il pericolo non viene dai pazienti, ma da qualcuno che dovrebbe prendersene cura. In una notte interminabile, dovrà lottare per sopravvivere e scoprire la verità.`,
  image: 'https://m.media-amazon.com/images/I/81uNo2OWPwL._SL1500_.jpg',
  publishedYear: 2021,
  pages: 352,
  rating: 4.3
},
{
  id: '4',
  title: 'Una di famiglia',
  author: 'Freida McFadden',
  genre: 'Giallo/Thriller',
  description: 'A volte i pericoli più grandi si nascondono in casa.',
  plot: `Quando Emma accoglie in casa sua sorella minore dopo anni di separazione, pensa di aver finalmente ritrovato la famiglia che ha sempre desiderato. Ma presto scopre che sua sorella nasconde oscuri segreti e comportamenti inquietanti. Piccoli incidenti domestici, oggetti che scompaiono e bugie sempre più grandi fanno capire a Emma che la persona che ha invitato nella sua casa potrebbe non essere chi dice di essere. In un gioco pericoloso di inganni, dovrà scoprire la verità prima che sia troppo tardi.`,
  image: 'https://m.media-amazon.com/images/I/71TIFEzSUcL._SL1496_.jpg',
  publishedYear: 2023,
  pages: 298,
  rating: 4.5
},
{
  id: '5',
  title: 'A esequie avvenute: Una storia dell\'Alligatore',
  author: 'Massimo Carlotto',
  genre: 'Giallo/Thriller',
  description: 'Un noir crudele e intenso con il famoso investigatore privato Marco Buratti, detto l\'Alligatore.',
  plot: `Marco Buratti, l'Alligatore, viene ingaggiato per indagare su una morte apparentemente accidentale. Le esequie sono già state celebrate, ma la famiglia ha dei sospetti. Quello che inizia come un semplice caso si trasforma presto in una complessa matassa di corruzione, interessi economici e segreti familiari. L'Alligatore si muove nelle oscure acque della criminalità organizzata e dell'alta società, dove niente è come sembra. Con il suo stile spietato e il codice morale personale, dovrà districare la verità in un mondo dove tutti mentono.`,
  image: 'https://m.media-amazon.com/images/I/71B2+r+accL._SL1500_.jpg',
  publishedYear: 2018,
  pages: 280,
  rating: 4.4
},
  {
  id: '6',
  title: 'L\'ultimo segreto',
  author: 'Dan Brown',
  genre: 'Giallo/Thriller',
  description: 'Un thriller avvincente che unisce arte, storia e mistero in una corsa contro il tempo per svelare un antico segreto che potrebbe cambiare il mondo.',
  plot: 'Robert Langdon, il famoso professore di simbologia di Harvard, si ritrova coinvolto in una pericolosa caccia al tesoro attraverso l\'Europa. Quando un antico manufatto viene rubato dal Louvre, Langdon deve decifrare una serie di enigmi legati alle opere di Leonardo da Vinci, ai simboli massonici e ai segreti dei Templari. Mentre fugge da un misterioso antagonista e collabora con la brillante crittologa Sophie Neveu, Langdon scopre una verità sconvolgente che potrebbe mettere in discussione le fondamenta stesse del cristianesimo. Una corsa contro il tempo che si snoda tra Parigi, Londra e Edimburgo, dove ogni indizio porta a un mistero più profondo.',
  image: 'https://m.media-amazon.com/images/I/71MxJku0EQL._SL1500_.jpg',
  publishedYear: 2003,
  pages: 592,
  rating: 4.5
},
  {
    id: '7',
    title: 'Harry Potter e la Pietra Filosofale',
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    description: 'Il primo capitolo della saga del maghetto più famoso.',
    plot: `Harry Potter, un orfano cresciuto dagli zii spregevoli...`,
    image: 'https://m.media-amazon.com/images/I/81m1s4wIPML._AC_UF1000,1000_QL80_.jpg',
    publishedYear: 1997,
    pages: 320,
    rating: 4.8
  },
  {
  id: '9',
  title: 'Amori e segreti al Pumpkin Spice Cafè',
  author: 'Laurie Gilmore',
  genre: 'Romanzo rosa',
  description: 'Una dolce storia d\'amore ambientata in un accogliente cafè autunnale.',
  plot: `Autunno nella piccola città di Maplewood, e il Pumpkin Spice Cafè è il cuore pulsante della comunità. Sophie, la nuova proprietaria, cerca di rifarsi una vita lontano dai segreti del passato. Quando Jake, un affascinante sconosciuto con un mistero da nascondere, entra nel cafè, tra i due scatta immediatamente una connessione speciale. Tra bicchieri di latte speziato, biscotti alla cannella e serate davanti al camino, i loro segreti iniziano a emergere. In un'atmosfera magica fatta di foglie colorate e profumi d'autunno, dovranno imparare a fidarsi l'uno dell'altra e scoprire che l'amore può fiorire anche quando meno te lo aspetti.`,
  image: 'https://m.media-amazon.com/images/I/81vevfY5e9L._SL1500_.jpg',
  publishedYear: 2022,
  pages: 315,
  rating: 4.1
},
{
  id: '10',
  title: 'Il contratto. The Deal (The Campus Vol. 1)',
  author: 'Elle Kennedy',
  genre: 'Romanzo rosa',
  description: 'Un patto inaspettato che potrebbe cambiare tutto.',
  plot: `Hannah Wells è finalmente riuscita a superare il trauma del passato e si sta godendo la vita universitaria. O almeno ci sta provando. Quando il capitano della squadra di hockey, Garrett Graham, le propone un patto improbabile, la sua vita ordinaria viene sconvolta. Garrett ha bisogno di aiuto per passare un esame importante, Hannah ha bisogno di un date per impressionare il ragazzo che le piace. What could go wrong? Tra lezioni di studio notturne, partite di hockey e serate in biblioteca, il loro rapporto finto inizia a diventare sempre più reale. Ma entrambi nascondono segreti che potrebbero distruggere tutto.`,
  image: 'https://m.media-amazon.com/images/I/81UrDwkiMxL._SL1500_.jpg',
  publishedYear: 2015,
  pages: 352,
  rating: 4.6
},
{
  id: '11',
  title: 'Due cuori in affitto',
  author: 'Felicia Kingsley',
  genre: 'Romanzo rosa',
  description: 'Un affitto condiviso che potrebbe trasformarsi in molto di più.',
  plot: `Mia deve trovare un coinquilino in fretta per pagare l'affitto del suo appartamento a Milano. Leo cerca un posto dove stare temporaneamente mentre la sua villa è in ristrutturazione. Lei è una ragazza solare e disordinata che crede nell'amore, lui è un architetto serio e perfezionista che non ha tempo per le relazioni. Condividere lo stesso spazio si rivela più complicato del previsto: lei lascia vestiti ovunque, lui organizza tutto con maniacale precisione. Ma tra discussioni su chi debba lavare i piatti e serate inaspettatamente piacevoli sul divano, i due iniziano a conoscersi oltre le apparenze. E scoprono che a volte l'amore arriva quando meno te lo aspetti, proprio dietro la porta della camera accanto.`,
  image: 'https://m.media-amazon.com/images/I/51PIZoniRYL._SL1000_.jpg',
  publishedYear: 2021,
  pages: 288,
  rating: 4.3
},
{
  id: '12',
  title: 'Gli occhi di Venezia',
  author: 'Alessandro Barbero',
  genre: 'Romanzo storico',
  description: 'Un affresco storico della Venezia rinascimentale attraverso gli occhi di un giovane artista.',
  plot: `Venezia, XVI secolo. Marco, un giovane pittore di talento, arriva nella Serenissima per fare fortuna. Mentre lavora nella bottega di Tiziano, si trova coinvolto negli intrighi della Repubblica Veneziana, tra artisti rivali, nobili corrotti e segreti di stato. Attraverso i suoi occhi di artista, scopriamo la Venezia del Rinascimento: i suoi splendori artistici, le sue oscure congiure, i suoi personaggi indimenticabili. Un viaggio nella storia che esplora il potere dell'arte, la bellezza e la crudeltà dell'essere umano in un'epoca di grandi cambiamenti.`,
  image: 'https://m.media-amazon.com/images/I/81iZNoEQ2+L._SL1500_.jpg',
  publishedYear: 2011,
  pages: 420,
  rating: 4.4
},
{
  id: '13',
  title: 'Il cacciatore di libri proibiti',
  author: 'Fabio Delizzos',
  genre: 'Romanzo storico',
  description: 'Una caccia al tesoro tra libri rari e segreti pericolosi nell\'Italia del Cinquecento.',
  plot: `Roma, 1559. Lorenzo, un giovane bibliotecario della Vaticana, viene incaricato di recuperare libri proibiti che circolano clandestinamente in Italia. La sua missione lo porta attraverso le città rinascimentali, da Firenze a Venezia, inseguendo opere che potrebbero mettere in discussione il potere della Chiesa. Ma Lorenzo scopre presto che la caccia ai libri proibiti nasconde una verità più pericolosa: una setta segreta che custodisce conoscenze in grado di cambiare il corso della storia. Tra inseguimenti, tradimenti e amori proibiti, dovrà decidere da che parte stare.`,
  image: 'https://m.media-amazon.com/images/I/614PZ7cW-RL._SL1000_.jpg',
  publishedYear: 2019,
  pages: 380,
  rating: 4.2
},
{
  id: '8',
  title: 'L\'ultimo eroe sopravvissuto. La vera storia del ragazzo italiano che si finse nazista e salvò centinaia di ebrei',
  author: 'Mark T. Sullivan',
  genre: 'Romanzo storico',
  description: 'La straordinaria storia vera di un eroe dimenticato della Seconda Guerra Mondiale.',
  plot: `Seconda Guerra Mondiale. Gino Bartali, noto campione di ciclismo, usa la sua fama per salvare centinaia di ebrei dalla persecuzione nazifascista. Sotto copertura, si finge un collaborazionista mentre in realtà trasporta documenti falsi nascosti nella canna della sua bicicletta. Attraverso le sue corse "di allenamento" percorre l'Italia occupata, rischiando la vita ogni giorno. Questa è la storia incredibile di un uomo comune che diventa eroe, del coraggio silenzioso e di come una sola persona possa fare la differenza nell'oscurità della guerra.`,
  image: 'https://m.media-amazon.com/images/I/71md8-qvfJL._SL1500_.jpg',
  publishedYear: 2017,
  pages: 320,
  rating: 4.8
},
{
  id: '15',
  title: 'Il nome della rosa',
  author: 'Umberto Eco',
  genre: 'Romanzo storico',
  description: 'Un misterioso giallo medievale in un\'abbazia benedettina.',
  plot: `Anno 1327. Guglielmo da Baskerville, un frate francescano inglese, arriva in un'abbazia benedettina per partecipare a una disputa teologica. Ma la sua visita si trasforma in un'indagine quando uno dopo l'altro, i monaci iniziano a morire in circostanze misteriose. Aiutato dal giovane novizio Adso da Melk, Guglielmo deve districare una matassa di segreti, simboli oscuri e manoscritti proibiti. La biblioteca dell'abbazia, labirintica e inaccessibile, nasconde la chiave del mistero. Un thriller intellettuale che esplora i limiti della conoscenza, il potere della fede e la natura del male.`,
  image: 'https://m.media-amazon.com/images/I/61WOxzGgv5L._SL1498_.jpg',
  publishedYear: 1980,
  pages: 512,
  rating: 4.6
},
{
  id: '16',
  title: 'Il trono di spade',
  author: 'George R.R. Martin',
  genre: 'Fantasy',
  description: 'Il primo capitolo della saga che ha rivoluzionato il fantasy epico.',
  plot: `In un mondo dove le stagioni durano anni, i Sette Regni di Westeros sono sull'orlo della guerra civile. Mentre il Re Robert Baratheon governa da Approdo del Re, antiche minacce si risvegliano a Nord, oltre la Barriera di ghiaccio. Draghi, ombre, intrighi di corte e battaglie epiche si intrecciano nelle vite delle nobili casate Stark, Lannister e Targaryen. Una storia di potere, tradimento, onore e magia dove nessun personaggio è al sicuro e ogni scelta ha conseguenze mortali.`,
  image: 'https://m.media-amazon.com/images/I/71I7798hdLL._SL1500_.jpg',
  publishedYear: 1996,
  pages: 694,
  rating: 4.7
},
{
  id: '18',
  title: 'Lo hobbit',
  author: 'J.R.R. Tolkien',
  genre: 'Fantasy',
  description: 'Il classico senza tempo che ha inaugurato il mondo della Terra di Mezzo.',
  plot: `Bilbo Baggins, un hobbit tranquillo e amante del comfort, viene trascinato in un'avventura inaspettata dal mago Gandalf e da una compagnia di tredici nani. Il loro obiettivo è riconquistare la Montagna Solitaria e il suo immenso tesoro custodito dal drago Smaug. Attraverso terre pericolose, foreste oscure e montagne impenetrabili, Bilbo scopre coraggio che non sapeva di avere e incontra creature magiche come elfi, troll e goblin. Il viaggio cambierà per sempre la vita del piccolo hobbit e il destino della Terra di Mezzo.`,
  image: 'https://m.media-amazon.com/images/I/71emctAoDYL._SL1066_.jpg',
  publishedYear: 1937,
  pages: 310,
  rating: 4.9
},
{
  id: '19',
  title: 'Le cronache di Narnia. Ediz. integrale',
  author: 'Clive S. Lewis',
  genre: 'Fantasy',
  description: 'Edizione integrale 2021 con copertina rigida e illustrazioni originali',
  plot: `L'opera completa delle sette Cronache di Narnia in un unico volume. Il viaggio inizia con "Il nipote del mago" che racconta la creazione di Narnia da parte di Aslan e l'origine della Strega Bianca. Prosegue con "Il leone, la strega e l'armadio" dove i fratelli Pevensie scoprono il mondo magico attraverso un armadio e aiutano Aslan a sconfiggere la Strega Bianca. "Il cavallo e il ragazzo" segue le avventure di Shasta e del cavallo parlante Bree. "Il principe Caspian" vede il ritorno dei Pevensie per aiutare il giovane principe a riconquistare il trono. "Il viaggio del veliero" accompagna Edmund, Lucy e Eustachius nella ricerca dei lord perduti. "La sedia d'argento" segue Jill ed Eustachius alla ricerca del principe Rilian. L'epica si conclude con "L'ultima battaglia", il confronto finale per il destino di Narnia.`,
  image: 'https://m.media-amazon.com/images/I/71UN-kyzydL._SY425_.jpg',
  publishedYear: 2021,
  pages: 1024,
  rating: 4.9
}
];

export const genres = [
  'Romanzo rosa', 
  'Giallo/Thriller', 
  'Fantasy', 
  'Saggio/Non-fiction', 
  'Romanzo storico'
];

export const genreOrder = ['Giallo/Thriller', 'Romanzo storico', 'Romanzo rosa', 'Fantasy', 'Saggio/Non-fiction'];

export const booksByGenre: Record<string, Book[]> = {
  'Giallo/Thriller': booksData.filter(book => book.genre === 'Giallo/Thriller'),
  'Romanzo storico': booksData.filter(book => book.genre === 'Romanzo storico'),
  'Fantasy': booksData.filter(book => book.genre === 'Fantasy'),
  'Romanzo rosa': booksData.filter(book => book.genre === 'Romanzo rosa'),
  'Saggio/Non-fiction': booksData.filter(book => book.genre === 'Saggio/Non-fiction'),
};