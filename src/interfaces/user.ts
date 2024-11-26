export interface IUser {
  _id?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: null
  username?: string
  role?: string
  email?: string
  password?: string
  name?: string | null
  address?: string | null
  phone?: number | string | null
  bio?: string | null
  google_id?: number | null
  facebook_id?: number | null
  github_id?: number | null
  tfa_enable?: null
  tfa_enable_authenticator?: null
  tfa_enable_backup_code?: null
  tfa_enable_email?: null
}

export interface ICreateUser {
  username: string
  email: string
  password: string
  role: string
}
