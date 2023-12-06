import { UserController } from "../../modules/users/controllers/UserController";
import { UserRepository } from "../../modules/users/repositories/UserRepository";
import { WebServer } from "../http/WebServer";
import { Database } from "../persistence/Database";

export class CompositionRoot {
  private database: Database;
  private userRepository: UserRepository;
  private userController: UserController;
  private webServer: WebServer;

  constructor() {
    this.database = this.createDatabase();
    this.userRepository = this.createUserRepository();
    this.userController = this.createUserController();
    this.webServer = this.createWebServer();
  }

  private createDatabase(): Database {
    return new Database();
  }

  private getDatabase(): Database {
    return this.database;
  }

  private createUserRepository(): UserRepository {
    const database = this.getDatabase();
    return new UserRepository(database);
  }

  private getUserRepository(): UserRepository {
    return this.userRepository;
  }

  private createUserController(): UserController {
    const userRepository = this.getUserRepository();
    return new UserController(userRepository);
  }

  private getUserController(): UserController {
    return this.userController;
  }

  private createWebServer(): WebServer {
    const userController = this.getUserController();
    return new WebServer(userController);
  }

  public getWebServer(): WebServer {
    return this.webServer;
  }
}
