export interface IFormsStatusCount {
  approved?: number
  pending?: number
  rejected?: number
}

export interface IEvent {
  _id?: string
  name: string
  address: string
  detail: string
  date_start: any
  date_end: any
  deleted_at?: any
  latitude?: number
  longitude?: number
  email: string
  website: string
  phone: string
  event_expo_id: any
  eventType_id?: any
  updated_at?: any
  user_id?: string
  created_at?: any
  featured_image?: string
  imageUrl?: string
  forms_count?: number
  translate: any
  forms_status_count?: IFormsStatusCount
  user?: {
    name: string
  }
}
