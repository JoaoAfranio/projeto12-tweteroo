import express from "express";
const PORT = 5000;
const app = express();
app.use(express.json());

const users = [];

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.post("/sign-up", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.send("ok");
});
