const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8080;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const urls = [
  { id: '9sm5xK', longURL: 'http://www.example.com', userID: 'abc123' },
  { id: '8fje7S', longURL: 'http://www.google.com', userID: 'def456' },
];

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/urls', (req, res) => {
  const username = req.cookies.username;
  res.render('urls_index', { urls, username });
});

app.get('/urls/new', (req, res) => {
  const username = req.cookies.username;
  res.render('urls_new', { username });
});

app.post('/urls', (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  urls.push({ id: shortURL, longURL, userID: req.cookies.username });
  res.redirect('/urls');
});

app.get('/urls/:id', (req, res) => {
  const id = req.params.id;
  const url = urls.find((url) => url.id === id);
  const username = req.cookies.username;
  if (!url) {
    res.status(404).send('URL not found');
  } else {
    res.render('urls_show', { url, username });
  }
});

app.post('/urls/:id/delete', (req, res) => {
  const id = req.params.id;
  const index = urls.findIndex((url) => url.id === id);
  if (index !== -1) {
    urls.splice(index, 1);
  }
  res.redirect('/urls');
});

app.post('/urls/:id', (req, res) => {
  const id = req.params.id;
  const longURL = req.body.longURL;
  const url = urls.find((url) => url.id === id);
  if (!url) {
    res.status(404).send('URL not found');
  } else {
    url.longURL = longURL;
    res.redirect('/urls');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

function generateRandomString() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 6;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
