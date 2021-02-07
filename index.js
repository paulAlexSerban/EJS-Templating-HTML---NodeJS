const express = require('express');
const app = express();
const path = require('path');
const redditData = require('./data.json');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs'); // because you will not need to require ejs, expressJs will require it automatically
app.set('views', path.join(__dirname, '/views')); // this takes our current directory name, where the file is located, and joining that path with './views' -- '__dirname' tells nodeJS to use the directory name where index.js is located

app.get('/', (req, res) => {
  res.render('home'); // by default express will look into './views' directory for file home.ejs -- *.ejs is not needed/required
})

app.get('/cats', (req, res) => {
  const cats = [
    'Blue', 'Rocket', 'Money', 'Winston', 'Stephen', 'Monty'
  ];
  res.render('cats', { cats });
});

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  console.log(data);
  if(data) {
    res.render('subreddit', { ...data });
  } else {
    res.render('notfound', {subreddit})
  }
});

app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 13
  res.render('random', {rand: num});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
