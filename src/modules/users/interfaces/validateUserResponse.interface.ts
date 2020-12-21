export interface ICreateLogin {
  id: string;
  name: string;
  email: string;
}

export interface ICreateJWTResponse {
  accessToken: string;
  id: string;
  email: string;
}
