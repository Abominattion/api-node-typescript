import { IgetUsersRepository } from "../controllers/getUsers/protocols";
import { MongoClient } from "../database/mongo";
import { User } from "../models/user";

export class MongoGetUsersRepository implements IgetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<User>("users")
      .find({})
      .toArray();

    return [
      {
        firstName: "Adonay",
        lastName: "Douglas",
        email: "adonay.douglas@gmail.com",
        password: "123",
      },
    ];
  }
}
