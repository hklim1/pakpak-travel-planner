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