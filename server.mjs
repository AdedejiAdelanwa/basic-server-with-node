import express from "express";
import bp from "body-parser";
import morgan from "morgan";
import { format } from "path";

const app = express();

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());
app.use(morgan("dev"));

const db = [];

app.post("/todo", (req, res) => {
  const newTodo = {
    id: Date.now(),
    text: req.body.text,
  };
  db.push(newTodo);
  res.json(newTodo);
});
app.get("/todos", (req, res) => {
  res.json(db);
});
app.get("/todo/:id", (req, res) => {
  const todo = db.find((td) => td.id === +req.params.id);
  res.json({ data: todo });
});
app.listen(process.env.PORT, () => {
  console.log(`Server running on Heroku`);
});
