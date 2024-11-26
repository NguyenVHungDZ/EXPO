export const expo = [
  {
    key: 'name',
    type: 'text',
    label: 'Name',
    placeholder: '',
  },
  {
    key: 'featured_image',
    type: 'image',
    label: 'Feature Image',
    placeholder: '',
  },
  {
    key: 'detail',
    type: 'tiptap',
    label: 'Detail',
    placeholder: '',
  },
]

export const translation = [
  {
    key: 'language_id',
    type: 'select',
    options: [],
    extra: 'Language',
    placeholder: '',
  },
]
export const faq = [
  {
    key: 'ask',
    type: 'text',
    label: 'Ask',
    placeholder: '',
  },
  {
    key: 'faqType_id',
    type: 'select',
    options: [],
    extra: 'FaqType',
    placeholder: '',
  },
  {
    key: 'answer',
    type: 'tiptap',
    label: 'Answer',
    placeholder: '',
  },
]

export const language = [
  {
    key: 'name',
    type: 'text',
    label: 'Name',
    placeholder: '',
  },
  {
    key: 'code',
    type: 'text',
    label: 'Code',
    placeholder: '',
  },
]
export const faqType = [
  {
    key: 'name',
    type: 'text',
    label: 'Name',
    placeholder: '',
  },
  {
    key: 'description',
    type: 'tiptap',
    label: 'Description',
    placeholder: '',
  },
]
export const partner = [
  {
    key: 'name',
    type: 'text',
    label: 'Name',
    placeholder: '',
  },
  {
    key: 'image',
    type: 'image',
    label: 'Feature Image',
    placeholder: '',
  },
  {
    key: 'link',
    type: 'text',
    label: 'Link',
    placeholder: '',
  },
]
export const booth = [
  {
    key: 'name',
    type: 'text',
    label: 'Name',
    placeholder: '',
  },
  {
    key: 'width',
    type: 'number',
    label: 'Width',
  },
  {
    key: 'length',
    type: 'number',
    label: 'Length',
  },
  {
    key: 'featured_image',
    type: 'image',
    label: 'Feature Image',
    placeholder: '',
  },
  {
    key: 'detail',
    type: 'tiptap',
    label: 'Detail',
    placeholder: '',
  },
]

export const boothTemplate = [
  {
    key: 'descriptions',
    type: 'tiptap',
    label: 'Descriptions',
    placeholder: '',
  },
]

export const blockGroup = [
  {
    key: 'name',
    type: 'text',
    label: 'Name',
    placeholder: '',
  },
  {
    key: 'description',
    type: 'tiptap',
    label: 'Description',
    placeholder: '',
  },
  {
    key: 'blockType_id',
    type: 'select',
    options: [],
    extra: 'BlockType',
    label: 'Image',
    placeholder: '',
  },
]

export const block = [
  {
    key: 'title',
    type: 'text',
    label: 'Title',
    placeholder: '',
  },
  {
    key: 'link',
    type: 'text',
    label: 'Link',
    placeholder: '',
  },
  {
    key: 'text_link',
    type: 'text',
    label: 'Text link',
    placeholder: '',
  },
  {
    key: 'image',
    type: 'image',
    label: 'Image',
    placeholder: '',
  },
  {
    key: 'blockGroup_id',
    type: 'select',
    options: [],
    extra: 'BlockGroup',
    label: 'Image',
    placeholder: '',
  },
  {
    key: 'description',
    type: 'tiptap',
    label: 'Description',
    placeholder: '',
  },
]

// data static select
export const SELECT_STATIC = {
  MODEL: [
    'RequestInterested',
    'Faq',
    'Block',
    'BlockGroup',
    'Partner',
    'Testimonial',
    'BlockType',
    'EventType',
    'Event',
    'Booth',
    'Expo',
  ],
}

export const FIELD = {
  RequestInterested: ['name', 'description'],
  Faq: ['ask', 'answer'],
  FaqType: ['ask', 'description'],
  Block: ['title', 'description'],
  BlockGroup: ['name', 'description'],
  Partner: ['name'],
  Testimonial: ['name', 'quote'],
  BlockType: ['name'],
  EventType: ['name', 'description'],
  Event: ['name', 'detail'],
  Booth: ['name', 'detail'],
  Expo: ['name', 'detail'],
  BoothTemplate: ['descriptions'],
}
