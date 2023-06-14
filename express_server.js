
const express = require("express");
const app = express();
const PORT = 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const urls = [
  { id: '9sm5xK', longURL: 'http://www.example.com', userID: 'abc123' },
  { id: '8fje7S', longURL: 'http://www.google.com', userID: 'def456' },
];

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {
  const shortURL = req.params.id;
  const longURL = urlDatabase[shortURL];
  const templateVars = { id: shortURL, longURL };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
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

app.post("/login", (req, res) => {
  const username = req.body.username;
  res.cookie("username", username);
  res.redirect("/urls");
});

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/urls");
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
