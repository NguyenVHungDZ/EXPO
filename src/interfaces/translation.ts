export interface ITranslation {
  _id?: string
  language_id: string
  id: string
  model: string
  field: string
  translate: string
  created_at?: string
  updated_at?: string
  deleted_at?: null
  language?: {
    _id: string
    created_at?: string
    updated_at?: string
    deleted_at?: null
    name: string
    code: string
  }
}
