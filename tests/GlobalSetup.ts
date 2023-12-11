import dotenv from "dotenv";
import path from "path";
import { ExecSyncOptions, execSync } from "child_process";

export class GlobalSetup {
  public runGlobalSetup() {
    this.loadEnv();
    this.startDatabase();
    this.generatePrismaClient();
    this.pushPrismaSchema();
  }

  private loadEnv() {
    dotenv.config({
      path: ".env.test",
    });
  }

  private startDatabase() {
    this.execSync("docker compose up --build -d");
  }

  private generatePrismaClient() {
    this.execSync("prisma generate");
  }

  private pushPrismaSchema() {
    this.execSync("prisma db push --force-reset");
  }

  private execSync(cmd: string) {
    execSync(cmd, this.getExecOptions());
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
