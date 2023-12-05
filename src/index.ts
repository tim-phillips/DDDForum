import express from "express";

import {
  createUserController,
  editUserController,
  getUserController,
} from "./modules/users/controllers/userController";

const PORT = 3030;

const app = express();

app.use(express.json());

app.post("/users/new", createUserController);

app.post("/users/edit/:userId", editUserController);

app.get("/users", getUserController);

export const http = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
