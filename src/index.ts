import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/getUsers/get-users";
import { MongoGetUsersRepository } from "./repositories/mongo-get-users";
import { MongoClient } from "./database/mongo";
import { CreateUserController } from "./controllers/createUsers/create-user";
import { MongoCreateUserRepository } from "./repositories/mongo-create-user";

const main = async () => {
  config();

  const app = express();
  app.use(express.json());
  await MongoClient.connect();

  const port = process.env.PORT || 8000;

  app.get("/", (req, res) => {
    res.send("Hellor world!");
  });

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const response = await getUsersController.handle();

    res.status(response.statusCode).send(response.body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreateUsersRepository = new MongoCreateUserRepository();
    const createUsersController = new CreateUserController(
      mongoCreateUsersRepository
    );

    const { body, statusCode } = await createUsersController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.listen(port, () => console.log(`Rodando na porta ${port}`));
};

main();
