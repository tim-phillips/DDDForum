type UserData = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
};

type UserSuccess = {
  data: UserData;
  error?: undefined;
  success: true;
};

type UserError = {
  data: undefined;
  error: string;
  success: false;
};

export function generateUserSuccess(user: UserData): UserSuccess {
  return {
    data: {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    error: undefined,
    success: true,
  };
}

export function generateUserError(errorName: string): UserError {
  return {
    error: errorName,
    data: undefined,
    success: false,
  };
}
