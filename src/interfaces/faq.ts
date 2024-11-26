export interface IFaq {
  _id?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: null
  ask: string
  answer: string
  faqType_id: string
}
