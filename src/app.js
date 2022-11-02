import express from "express";
import cors from "cors";

const PORT = 5000;
const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.post("/sign-up", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.send("ok");
});

app.post("/tweets", (req, res) => {
  const newTweet = req.body;
  tweets.push(newTweet);
  res.send(tweets);
});

app.get("/tweets", (req, res) => {
  const lastTweets = tweets.slice(tweets.length - 10, tweets.length).reverse();
  res.send(lastTweets);
});
