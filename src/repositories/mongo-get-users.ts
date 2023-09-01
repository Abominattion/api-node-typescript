import { IgetUsersRepository } from "../controllers/getUsers/protocols";
import { User } from "../models/user";

export class MongoGetUsersRepository implements IgetUsersRepository {
  async getUsers(): Promise<User[]> {
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
