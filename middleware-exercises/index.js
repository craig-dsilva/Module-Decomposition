import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Server is running"));

app.post("/",(req, res, next) => {
    req.username = req.headers["x-username"] ?? null;
    if (
      !Array.isArray(req.body) ||
      !req.body.every((item) => typeof item === "string")
    ) {
      return res.status(400).json({ error: "Request body must be a JSON array of strings" });
    }
    res.locals.body = req.body;
    next();
  },
  (req, res) => {
    const auth = req.username
      ? `You are authenticated as ${req.username}`
      : "You are not authenticated";
    const data = res.locals.body;
    res.status(200).send(`${auth}\n \nYou have requested information about ${data.length} ${data.length === 1 ? "subject" : "subjects"}: ${data} `);
  },
);

app.listen(3000, () => console.log("Server is running on port 3000"));
