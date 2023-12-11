import dotenv from "dotenv";
import path from "path";
import { ExecSyncOptions, execSync } from "child_process";

export class GlobalSetup {
  public runGlobalSetup() {
    this.loadEnv();
    this.generatePrismaClient();
    this.pushPrismaSchema();
  }

  private loadEnv() {
    dotenv.config({
      path: ".env.test",
    });
  }

  private generatePrismaClient() {
    execSync("prisma generate", this.getExecOptions());
  }

  private pushPrismaSchema() {
    execSync("prisma db push", this.getExecOptions());
  }

  private getExecOptions() {
    const rootDir = path.join(__dirname, "../");
    const execOptions: ExecSyncOptions = {
      cwd: rootDir,
      stdio: "inherit",
    };
    return execOptions;
  }
}
