import { Server } from "http";

import request from "supertest";

export class RestApiDriver {
  constructor(private http: Server) {}

  async post(url: string, data: any) {
    return request(this.http)
      .post(url)
      .set("Accept", "application/json")
      .send(data);
  }
}
