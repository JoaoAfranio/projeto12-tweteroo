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
  const avatar = user.avatar;
  return avatar;
}

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.post("/sign-up", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.send("ok");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  const avatar = getAvatar(username);
  tweets.push({ username, tweet, avatar });
  res.send(tweets);
});

app.get("/tweets", (req, res) => {
  const lastTweets = tweets.slice(tweets.length - 10, tweets.length).reverse();
  res.send(lastTweets);
});
