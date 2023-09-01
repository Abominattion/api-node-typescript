import {
  CreateUserParams,
  ICreateUserRepository,
} from "../controllers/createUsers/protocols";
import { MongoClient } from "../database/mongo";
import { User } from "../models/user";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    // Criando usuário
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    // Bunscando usuário pra ver ser foi criado
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("Usuário não criado!");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
