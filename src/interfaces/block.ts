export interface IBlock {
  _id?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: null
  title: string
  link: string
  text_link: string
  image: string
  blockGroup_id: string
  description: string
  imageUrl?: string
  translate: any
}
