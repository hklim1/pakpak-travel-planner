// complete

export type LoggedUser = {
  token: string
  username: string
}

export type User = {
  readonly id?: string
  username: string
  password: string
  email: string
  first_name?: string
  last_name?: string
}

export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};