import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Server is running"));

app.post("/", (req, res) => {
  req.username = req.headers["x-username"] ?? null;
  const message = req.username
    ? `You are authenticated as ${req.username}`
    : "You are not authenticated";
  res.status(200).send(message);
});

app.listen(3000, () => console.log("Server is running on port 3000"));
