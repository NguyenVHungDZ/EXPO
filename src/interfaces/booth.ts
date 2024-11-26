export interface IBooth {
  _id?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: null
  name: string
  width: number
  length: number
  detail: string
  featured_image: string
  imageUrl?: string
  template?: string
  translate: any
}
