import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/getUsers/get-users";
import { MongoGetUsersRepository } from "./repositories/mongo-get-users";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();

  const app = express();
  await MongoClient.connect();

  const port = process.env.PORT || 8000;

  app.get("/", (req, res) => {
    res.send("Hellor world!");
  });

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const response = await getUsersController.handle();

    res.send(response.body).status(response.statusCode);
  });

  app.listen(port, () => console.log(`Rodando na porta ${port}`));
};

main();
