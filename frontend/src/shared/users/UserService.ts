import axios from "axios";

import {
  CreateUserInput,
  CreateUserResponse,
} from "../../modules/users/DTOs/userDTOs";

export class UserService {
  async createUser(
    createUserInput: CreateUserInput,
    onSuccess: () => void,
    onError: (error: Error) => void
  ) {
    try {
      const response = await axios({
        method: "POST",
        url: "https://localhost:3000/users/new",
        data: createUserInput,
      });

      const createUserResponse: CreateUserResponse = response.data;

      return onSuccess();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return onError(error);
      }
      throw error;
    }
  }
}
