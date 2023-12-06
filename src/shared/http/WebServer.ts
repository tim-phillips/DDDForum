import express, { Express } from "express";
import { Server } from "http";
import { kill } from "cross-port-killer";

import { UserController } from "../../modules/users/controllers/UserController";

const PORT = 3030;

export class WebServer {
  private express: Express;
  private http: Server | undefined;
  private state: "Started" | "Stopped";

  constructor(private userController: UserController) {
    this.express = this.createExpress();
    this.configureExpress();
    this.setupRoutes();
    this.state = "Stopped";
  }

  private createExpress() {
    return express();
  }

  private configureExpress() {
    this.express.use(express.json());
  }

  private setupRoutes() {
    this.express.post("/users/new", this.userController.createUser);
    this.express.post("/users/edit/:userId", this.userController.editUser);
    this.express.get("/users", this.userController.getUser);

    this.express.get("/health", (_, res) => res.status(200).send());
  }

  public isRunning() {
    return this.state === "Started";
  }

  public async start(): Promise<void> {
    return new Promise(async (resolve) => {
      await kill(PORT);
      this.http = this.express.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        this.state = "Started";
        resolve();
      });
    });
  }

  public async stop(): Promise<void> {
    if (!this.isRunning()) return;
    return new Promise((resolve) => {
      this.http?.close(() => {
        this.state = "Stopped";
        resolve();
      });
    });
  }

  public getServer() {
    if (!this.isRunning()) {
      throw new Error("Server has not been started.");
    }
    return this.http;
  }
}
