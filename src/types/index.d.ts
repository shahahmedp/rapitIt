export interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export interface IMailResponseType {
  isSuccess: boolean;
  response?: unknown;
}
