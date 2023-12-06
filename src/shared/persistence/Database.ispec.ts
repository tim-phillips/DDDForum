import { Database } from "./Database";

describe(Database.name, () => {
  it("connects", async () => {
    const database = new Database();
    expect(await database.connect()).toBeTruthy();
    expect(await database.testConnection()).toBeTruthy();
  });
});
