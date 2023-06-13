const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Database for storing URLs
const urlDatabase = {};

// Function to generate random string
function generateRandomString() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 6;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

// Route to render new URL form
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

// Route to handle form submission and create new URL
app.post("/urls", (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;
  console.log(req.body);
  res.send("Ok");
});

// Start the server
app.listen(PORT, () => {
  console.log(`TinyApp listening on port ${PORT}`);
});
