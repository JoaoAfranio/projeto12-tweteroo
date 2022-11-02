import express from "express";
import cors from "cors";

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];

function getAvatar(username) {
  const user = users.find((u) => u.username === username);
  if (user) {
    const avatar = user.avatar;
    return avatar;
  }
}

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    users.push({ username, avatar });
    res.status(201).send("ok");
  }
});

app.post("/tweets", (req, res) => {
  const tweet = req.body.tweet;
  const username = req.headers.username;
  const avatar = getAvatar(username);

  if (!username || !tweet || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    tweets.push({ username, tweet, avatar });
    res.status(201).send(tweets);
  }
});

app.get("/tweets", (req, res) => {
  const page = req.query.page;
  const listTweetsByLast = tweets.reverse();
  let lastTweets = [];

  if (page >= 1) {
    const end = page * 10;
    const start = end - 10;
    lastTweets = listTweetsByLast.slice(start, end);
    res.send(lastTweets);
  } else {
    res.status(400).send("Informe uma página válida!");
  }
});

app.get("/tweets/:username", (req, res) => {
  const username = req.params.username;
  const tweetsByUser = tweets.filter((tweet) => tweet.username === username);
  res.send(tweetsByUser);
});
