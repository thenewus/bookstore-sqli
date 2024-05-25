const express = require("express");
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', authController.isLoggedIn, (req, res) => {
  res.render('index', {
    user: req.user
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/about", authController.isLoggedIn, (req, res) => {
  res.render("about", {
    user: req.user
  });
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
  console.log(req.user);
  if (req.user) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
});

const books = [
  {
    id: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Fantasy',
    date: 'August 1965',
    price: '$10.99',
    image: '/images/library images/dunefrank.jpg'
  },
  {
    id: 'farenheit',
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    genre: 'Dystopia',
    date: 'October 1953',
    price: '$9.80',
    image: '/images/library images/451.jpg'
  },
  {
    id: '12rules',
    title: '12 rules for life',
    author: 'J. Peterson',
    genre: 'Non-fiction, Self-help',
    date: 'January 2018',
    price: '$15.94',
    image: '/images/library images/12rules.jpg'
  },
  {
    id: '33strategies',
    title: '33 strategies of war',
    author: 'R. Greene',
    genre: 'Personal growth',
    date: 'January 2006',
    price: '$19.69',
    image: '/images/library images/33strategiesRobert.jpg'
  },
  {
    id: '48laws',
    title: '48 laws of power',
    author: 'R. Greene',
    genre: 'Personal growth',
    date: 'September 2000',
    price: '$14.55',
    image: '/images/library images/48lawsofpower.jpg'
  },
  {
    id: '1984',
    title: '1984',
    author: 'George Orwell',
    genre: 'Novel, Dystopia',
    date: 'June 1949',
    price: '$11.99',
    image: '/images/library images/1984.jpg'
  },
  {
    id: 'artofwar',
    title: 'The Art Of War',
    author: 'Sun Tzu',
    genre: 'Non-fiction, Treatise',
    date: '5th century BC',
    price: '$16.20',
    image: '/images/library images/art-of-war.jpg'
  },
  {
    id: 'awaken',
    title: 'Awaken the Giant Within',
    author: 'T. Robbins',
    genre: 'Non-fiction, self-help',
    date: 'April 1991',
    price: '$15.68',
    image: '/images/library images/awaken.jpg'
  },
  {
    id: 'babylon',
    title: 'The Richest Man in Babylon',
    author: 'G.S. Clason',
    genre: 'Self-help, Finance',
    date: 'July 1926',
    price: '$14.99',
    image: '/images/library images/riches-man-in-babylon.jpg'
  },
  {
    id: 'beyondorder',
    title: 'Beyond Order',
    author: 'J. Peterson',
    genre: 'Self-help',
    date: 'March 2021',
    price: '$16.40',
    image: '/images/library images/Beyond_Order_12_More_Rules_For_Life_1st_Edition_Cover_Canadian.jpg'
  },
  {
    id: 'biohack',
    title: 'The Biohackers Guide',
    author: 'Dave Asprey',
    genre: 'Diet',
    date: 'February 2023',
    price: '$18.39',
    image: '/images/library images/smarter-not-harder.jpg'
  },
  {
    id: 'bitcoin',
    title: 'Bitcoin',
    author: 'Satoshi Nakamoto',
    genre: 'Finance',
    date: 'November 2008',
    price: '$3.50',
    image: '/images/library images/bitcoin.jpg'
  },
  {
    id: 'carrie',
    title: 'Carrie',
    author: 'Stephen King',
    genre: 'Horror',
    date: 'April 1974',
    price: '$7.48',
    image: '/images/library images/carrie-book-cover.jpg'
  },
  {
    id: 'chamber',
    title: 'HP: the Chamber of Secrets',
    author: 'J.K. Rowling',
    genre: 'Novel, Fantasy',
    date: 'July 1998',
    price: '$15.72',
    image: '/images/library images/harrychamberofsecrets.jpg'
  },
  {
    id: 'crimeandp',
    title: 'Crime and Punishment',
    author: 'F. Dostoevsky',
    genre: 'Novel, Crime',
    date: 'December 1866',
    price: '$6.99',
    image: '/images/library images/crimeandpunishment.jpg'
  },
  {
    id: 'ego',
    title: 'The Ego and the Id',
    author: 'S. Freud',
    genre: 'Psychology',
    date: 'April 1923',
    price: '$12.99',
    image: '/images/library images/ego.jpg'
  },
  {
    id: 'fireandblood',
    title: 'Fire and Blood',
    author: 'G. Martin',
    genre: 'Novel, Fantasy',
    date: 'November 2018',
    price: '$19.10',
    image: '/images/library images/fireandblood.jpg'
  },
  {
    id: 'fiverings',
    title: 'The Book of Five Rings',
    author: 'M. Musashi',
    genre: 'Self-help, Treatise',
    date: 'March 1642',
    price: '$8.64',
    image: '/images/library images/book-of-five-rings.jpg'
  },
  {
    id: 'goblet',
    title: 'HP: Goblet of fire',
    author: 'J.K. Rowling',
    genre: 'Novel, Fantasy',
    date: 'July 2000',
    price: '$16.93',
    image: '/images/library images/harrygobletoffire.jpg'
  },
  {
    id: 'got',
    title: 'Game of Thrones',
    author: 'G. Martin',
    genre: 'Novel, Fantasy',
    date: 'August 1996',
    price: '$7.99',
    image: '/images/library images/gameofthrones.jpg'
  },
  {
    id: 'habits',
    title: 'Atomic habits',
    author: 'James Clear',
    genre: 'Self-help',
    date: 'October 2018',
    price: '$13.79',
    image: '/images/library images/atomic-habits.jpg'
  },
  {
    id: 'hallows',
    title: 'HP: Deathly hallows',
    author: 'J.K. Rowling',
    genre: 'Fantasy',
    date: 'July 2007',
    price: '$16.85',
    image: '/images/library images/harrydeathlyhallows.jpg'
  },
  {
    id: 'house',
    title: 'House of the dead',
    author: 'F. Dostoevsky',
    genre: 'Novel, Philosophy',
    date: 'November 1862',
    price: '$11.99',
    image: '/images/library images/house-of-the-dead.jpg'
  },
  {
    id: 'idiot',
    title: 'Idiot',
    author: 'F. Dostoevsky',
    genre: 'Novel',
    date: 'September 1867',
    price: '$14.20',
    image: '/images/library images/idiot.jpg'
  },
  {
    id: 'it',
    title: 'It',
    author: 'Stephen King',
    genre: 'Thriller, Horror',
    date: 'September 1986',
    price: '$12.99',
    image: '/images/library images/it.jpg'
  },
  {
    id: 'karamazov',
    title: 'Brothers Karamazov',
    author: 'F. Dostoevsky',
    genre: 'Novel, Philosophy',
    date: 'November 1880',
    price: '$16.20',
    image: '/images/library images/brotherskaramaz.jpg'
  },
  {
    id: 'leader',
    title: 'The Mind of a Leader',
    author: 'Kevin Anderson',
    genre: 'Self-help, Leadership',
    date: 'March 2018',
    price: '$16.19',
    image: '/images/library images/mindoftheleaderKevin.jpg'
  },
  {
    id: 'littleprince',
    title: 'The little prince',
    author: 'A.d. Saint-Exupéry',
    genre: 'Novel, Fable',
    date: 'April 1943',
    price: '$8.99',
    image: '/images/library images/little-prince.jpg'
  },
  {
    id: 'maps',
    title: 'Maps of meaning',
    author: 'J. Peterson',
    genre: 'Non-fiction, Self-help',
    date: 'March 1999',
    price: '$37.95',
    image: '/images/library images/mapsofmeaning.jpg'
  },
  {
    id: 'martin',
    title: 'Martin Eden',
    author: 'Jack London',
    genre: 'Novel, Fiction',
    date: 'September 1909',
    price: '$10.99',
    image: '/images/library images/martin-eden.jpg'
  },
  {
    id: 'mastery',
    title: 'Mastery',
    author: 'R. Greene',
    genre: 'Non-fiction, Self-help',
    date: 'November 2012',
    price: '$14.16',
    image: '/images/library images/masteryRobert.png'
  },
  {
    id: 'meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    genre: 'Non-fiction, Philosophy',
    date: '2nd century AD',
    price: '$8.99',
    image: '/images/library images/meditations.jpg'
  },
  {
    id: 'mindofgiants',
    title: 'The mind of giants',
    author: 'Audrey Schwartz',
    genre: 'Self-help, Psychology',
    date: 'November 2005',
    price: '$16.50',
    image: '/images/library images/themindofgiants.jpg'
  },
  {
    id: 'misery',
    title: 'Misery',
    author: 'Stephen King',
    genre: 'Horror, Thriller',
    date: 'June 1987',
    price: '$9.99',
    image: '/images/library images/misery.jpg'
  },
  {
    id: 'philosopher',
    title: 'HP: Philosophers Stone',
    author: 'J.K. Rowling',
    genre: 'Novel, Fantasy',
    date: 'June 1997',
    price: '$12.07',
    image: '/images/library images/harryphilosohersstone.jpg'
  },
  {
    id: 'principles',
    title: 'Principles',
    author: 'Ray Dalio',
    genre: 'Biography',
    date: 'September 2017',
    price: '$18.63',
    image: '/images/library images/principles.jpg'
  },
  {
    id: 'rebirth',
    title: 'Rebirth of the Soul',
    author: 'Carl Jung',
    genre: 'Self-help, Psychology',
    date: 'February 2023',
    price: '$14.99',
    image: '/images/library images/jungrevirthofthesoul.jpg'
  },
  {
    id: 'redbook',
    title: 'Red book',
    author: 'Carl Jung',
    genre: 'Diary, Psychology',
    date: 'September 2009',
    price: '$33.24',
    image: '/images/library images/redbook.jpg'
  },
  {
    id: 'richdad',
    title: 'Rich dad poor dad',
    author: 'Robert Kiyosaki',
    genre: 'Non-fiction, Finance',
    date: 'August 1997',
    price: '$12.58',
    image: '/images/library images/richdad.jpg'
  },
  {
    id: 'showyourwork',
    title: 'Show your Work',
    author: 'Ostin Cleon',
    genre: 'Non-fiction, Self-help',
    date: 'March 2014',
    price: '$13.49',
    image: '/images/library images/show-your-work.jpg'
  },
  {
    id: 'sorcerer',
    title: 'HP: Sorcerers Stone',
    author: 'J.K. Rowling',
    genre: 'Novel, Fantasy',
    date: 'June 1997',
    price: '$16.32',
    image: '/images/library images/harrysorcerers.jpg'
  },
  {
    id: 'symbols',
    title: 'Man and his symbols',
    author: 'Carl Jung',
    genre: 'Self-help',
    date: 'August 1964',
    price: '$8.99',
    image: '/images/library images/jung-manhissymbols.jpg'
  },
  {
    id: 'thinking',
    title: 'Thinking, Fast and Slow',
    author: 'D. Kahneman',
    genre: 'Non-fiction',
    date: 'October 2011',
    price: '$17.54',
    image: '/images/library images/fast-and-slow.jpg'
  },
  {
    id: 'underground',
    title: 'Notes from underground',
    author: 'F. Dostoevsky',
    genre: 'Novel, Philosophy',
    date: 'April 1864',
    price: '$10.86',
    image: '/images/library images/notes-from-underground.jpg'
  },
  {
    id: 'undiscovered',
    title: 'The Undiscovered Self',
    author: 'Carl Jung',
    genre: 'Psychology',
    date: 'June 1957',
    price: '$7.99',
    image: '/images/library images/the-undiscovered-self.jpg'
  },
  {
    id: 'wimhof',
    title: 'The Wim Hof Method',
    author: 'Wim Hof',
    genre: 'Non-fiction, Self-help',
    date: 'September 2020',
    price: '$16.59',
    image: '/images/library images/wim-hof.jpg'
  },
  {
    id: 'worldofice',
    title: 'The World of Ice & Fire',
    author: 'G. Martin',
    genre: 'Novel, Fantasy',
    date: 'October 2014',
    price: '$27.89',
    image: '/images/library images/worldoficeandfire.jpg'
  },
  {
    id: 'young',
    title: 'Young Forever',
    author: 'Mark Hyman',
    genre: 'Diet',
    date: 'February 2023',
    price: '$16.00',
    image: '/images/library images/young-forever.jpg'
  },
];

router.get('/library', authController.isLoggedIn, (req, res) => {
  res.render('library', { books, user: req.user });
});

// Dynamic route to render individual book pages
router.get('/book/:bookId', authController.isLoggedIn, (req, res) => {
  const bookId = req.params.bookId;
  const book = books.find(b => b.id === bookId);

  if (book) {
    res.render('book', { ...book, user: req.user });
  } else {
    res.status(404).render('404', { user: req.user });
  }
});

module.exports = router;
