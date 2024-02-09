import axios from "axios";

import {
  CreateUserInput,
  CreateUserResponse,
  UserDTO,
} from "../../modules/users/DTOs/userDTOs";

export class UserService {
  async createUser(
    createUserInput: CreateUserInput,
    onSuccess: (user: UserDTO) => void,
    onError: (error: Error) => void
  ) {
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:3030/users/new",
        data: createUserInput,
      });

      const createUserResponse: CreateUserResponse = response.data;

      if (createUserResponse.success) {
        console.log(createUserResponse);
        return onSuccess(createUserResponse.data);
      }
      return onError(new Error("Unknown error"));
    } catch (error: unknown) {
      if (error instanceof Error) {
        return onError(error);
      }
      return onError(new Error("Unknown error"));
    }
  }
}
