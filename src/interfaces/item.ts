export interface IItem {
  _id?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: null
  name: string
  description: string
  status: number | string // API response number | form create, edit -> string
}
