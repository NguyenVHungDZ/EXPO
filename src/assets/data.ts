import IconRename16 from '~icons/fluent/rename-16-filled'
import IconDelete from '~icons/mdi/delete'
import IconHomeOutline from '~icons/material-symbols/home-outline'
import IconUserBold from '~icons/ph/user-bold'
import IconFileFill from '~icons/ph/file-fill'
import IconAccountOutline from '~icons/mdi/account-outline'
import IconPasswordOutline from '~icons/mdi/password-outline'

export const MENU_ADMIN = [
  {
    id: 0,
    name: 'Home',
    slug: '/',
    icon: IconHomeOutline,
  },
  {
    id: 1,
    name: 'Users',
    slug: '/user',
    icon: IconUserBold,
  },
  {
    id: 2,
    name: 'Item ',
    slug: '/item',
    icon: IconUserBold,
  },
  {
    id: 3,
    name: 'File',
    slug: '/file',
    icon: IconFileFill,
  },
]

export const COLUMNS_TABLE = {
  ITEM: [
    {
      key: 'name',
      label: 'datatable.name',
      index: '',
    },
    {
      key: 'created_at',
      index: 'date',
      query: 'gte',
      label: 'datatable.created_at',
    },
    {
      key: 'status',
      label: 'datatable.status',
      index: 'status_item',
    },
  ],
  BOOTH: [
    {
      key: 'name',
      label: 'datatable.name',
    },
    {
      key: 'featured_image',
      index: 'image',
      label: 'datatable.featured_image',
    },
    {
      key: 'width',
      index: 'width',
      label: 'Width',
    },
    {
      key: 'length',
      index: 'length',
      label: 'Length',
    },
    {
      key: 'detail',
      label: 'datatable.detail',
      index: 'html',
    },
  ],
  USER: [
    {
      key: 'username',
      label: 'datatable.username',
      index: '',
    },
    {
      key: 'email',
      label: 'datatable.email',
      index: '',
    },
    {
      key: 'created_at',
      query: 'gte',
      index: 'date',
      label: 'datatable.created_at',
    },
    {
      key: 'role',
      label: 'Role',
      options: [
        {
          label: 'datatable.admin',
          value: 'admin',
        },
        {
          label: 'datatable.user',
          value: 'user',
        },
        {
          label: 'datatable.organizer',
          value: 'organizer',
        },
        {
          label: 'datatable.company',
          value: 'company',
        },
        {
          label: 'datatable.content_manager',
          value: 'content_manager',
        },
      ],
      placeholder: 'datatable.role',
      index: 'role',
    },
  ],
  FILE: [
    {
      key: 'originalname',
      label: 'datatable.name',
      index: 'file_name',
    },
    {
      key: 'created_at',
      query: 'gte',
      index: 'date',
      label: 'datatable.created_at',
    },
    {
      key: 'is_public',
      index: 'public_file',
      label: 'datatable.is_public',
    },
    {
      key: 'size',
      label: 'datatable.size',
      index: 'size',
    },
  ],
  ACTIVITY: [
    {
      key: 'activity',
      label: 'datatable.activity',
      index: 'activity',
      width: 240,
    },
    {
      key: 'response_statusCode',
      label: 'Status code',
    },
    {
      key: 'username',
      label: 'datatable.username',
      index: 'user',
    },
    {
      key: 'date',
      index: 'requestTime',
      query: 'gte',
      label: 'datatable.date',
      width: 200,
    },
    {
      key: 'ip',
      label: 'datatable.ip',
    },
  ],
  LANGUAGE: [
    {
      key: 'name',
      label: 'datatable.name',
    },
    {
      key: 'code',
      label: 'datatable.code',
    },
  ],
  TRANSLATION: [
    {
      key: 'language_id',
      constraintName: 'name',
      label: 'datatable.language_id',
      index: 'constraint',
      constraint: 'language',
      foreignKey: 'Language',
    },
    {
      key: 'model',
      label: 'datatable.model',
    },
    {
      key: 'field',
      label: 'datatable.field',
    },
    {
      index: 'translate',
      label: 'datatable.content',
    },
    {
      key: 'translate',
      index: 'html',
      label: 'datatable.translate',
    },
  ],
  EXPO: [
    {
      key: 'name',
      label: 'datatable.name',
    },
    {
      key: 'featured_image',
      index: 'image',
      label: 'datatable.featured_image',
    },
    {
      key: 'detail',
      label: 'datatable.detail',
      index: 'html',
    },
  ],
  EVENT: [
    {
      key: 'name',
      label: 'datatable.name',
    },
    {
      key: 'featured_image',
      index: 'image',
      label: 'datatable.featured_image',
    },
    {
      key: 'eventType_id',
      constraintName: 'name',
      label: 'datatable.event_type',
      index: 'constraint',
      foreignKey: 'EventType',
      constraint: 'eventType',
    },
    {
      key: 'email',
      label: 'datatable.email',
    },
    {
      key: 'website',
      label: 'datatable.website',
      index: 'link',
    },
    {
      key: 'forms_count',
      label: 'datatable.forms_count',
    },
    {
      key: 'date_start',
      query: 'gte',
      index: 'date',
      label: 'datatable.date_start',
    },
    {
      key: 'date_end',
      query: 'lte',
      index: 'date',
      label: 'datatable.date_end',
    },
  ],
  EVENT_TYPE: [
    {
      key: 'name',
      label: 'datatable.name',
    },
    {
      key: 'featured_image',
      index: 'image',
      label: 'datatable.featured_image',
    },
    {
      key: 'description',
      index: 'html',
      label: 'datatable.description',
    },
  ],
  BLOCK_TYPE: [
    {
      key: 'name',
      label: 'datatable.name',
    },
    {
      key: 'created_at',
      query: 'gte',
      index: 'date',
      label: 'datatable.created_at',
    },
  ],
  FORM: [
    {
      key: 'name',
      label: 'datatable.name',
    },
    {
      key: 'event_id',
      label: 'datatable.event',
      constraintName: 'name',
      index: 'constraint',
      constraint: 'event',
      foreignKey: 'Event',
    },
    {
      key: 'email',
      label: 'datatable.email',
    },
    {
      key: 'phone',
      label: 'datatable.phone',
    },
    {
      key: 'website',
      label: 'datatable.website',
    },
    {
      key: 'name',
      label: 'datatable.booth',
      constraintName: 'name',
      index: 'constraint',
      foreignKey: 'Booth',
      constraint: 'form_booth',
    },
    {
      key: 'status',
      index: 'tag',
      options: [
        {
          color: 'success',
          value: 'pending',
          label: 'datatable.pending',
        },
        {
          color: 'primary',
          value: 'approved',
          label: 'datatable.approved',
        },
        {
          color: 'danger',
          value: 'rejected',
          label: 'datatable.rejected',
        },
      ],
      placeholder: 'status',
      label: 'datatable.status',
    },
  ],

  FAQ: [
    {
      key: 'ask',
      label: 'datatable.ask',
    },
    {
      key: 'answer',
      index: 'html',
      label: 'datatable.answer',
    },

    {
      key: 'faqType_id',
      label: 'datatable.faq_type',
      index: 'constraint',
      constraintName: 'name',
      foreignKey: 'FaqType',
      constraint: 'faqType',
    },

    {
      key: 'created_at',
      query: 'gte',
      index: 'date',
      label: 'datatable.created_at',
    },
  ],
  FAQTYPE: [
    {
      key: 'name',
      label: 'datatable.name',
    },
    {
      key: 'description',
      index: 'html',
      label: 'datatable.description',
    },
    {
      key: 'created_at',
      query: 'gte',
      index: 'date',
      label: 'datatable.created_at',
    },
  ],
  PARTNER: [
    {
      key: 'name',
      label: 'datatable.name',
    },
    {
      key: 'image',
      index: 'image',
      label: 'datatable.featured_image',
    },
    {
      key: 'link',
      label: 'datatable.link',
    },
    {
      key: 'created_at',
      query: 'gte',
      index: 'date',
      label: 'datatable.created_at',
    },
  ],
  CONTACT: [
    {
      key: 'name',
      label: 'datatable.name',
    },
    {
      key: 'email',
      label: 'datatable.email',
    },
    {
      key: 'phone',
      label: 'datatable.phone',
    },
  ],
  REQUEST: [
    {
      key: 'name',
      label: 'datatable.name',
    },
    {
      key: 'email',
      label: 'datatable.email',
    },
    {
      key: 'company',
      label: 'datatable.company',
    },
    {
      key: 'phone',
      label: 'datatable.phone',
    },
    {
      key: 'requestInterested_id',
      label: 'datatable.request_interested',
      index: 'constraint',
      constraintName: 'name',
      foreignKey: 'RequestInterested',
      constraint: 'requestInterested',
    },
    {
      key: 'eventType_id',
      constraintName: 'name',
      label: 'datatable.event_type',
      index: 'constraint',
      foreignKey: 'EventType',
      constraint: 'eventType',
    },
  ],
  REQUESTINTEREST: [
    {
      key: 'name',
      label: 'datatable.name',
    },
    {
      key: 'description',
      index: 'html',
      label: 'datatable.description',
    },
  ],

  TESTIMONIAL: [
    {
      key: 'name',
      label: 'datatable.name',
    },
    {
      key: 'company',
      label: 'datatable.company',
    },
    {
      key: 'address',
      label: 'datatable.address',
    },
    {
      key: 'position',
      label: 'datatable.position',
    },
    {
      key: 'rate',
      label: 'datatable.rate',
      index: 'testimonial_rate',
    },
    {
      key: 'quote',
      label: 'datatable.quote',
      index: 'html',
    },
  ],
  BLOCKGROUP: [
    {
      key: 'name',
      label: 'datatable.name',
    },
    {
      key: 'description',
      index: 'html',
      label: 'datatable.description',
    },
    {
      key: 'blockType_id',
      constraintName: 'name',
      label: 'datatable.block_type',
      index: 'constraint',
      foreignKey: 'BlockType',
      constraint: 'blockType',
    },
  ],
  BLOCK: [
    {
      key: 'title',
      label: 'datatable.title',
    },
    {
      key: 'image',
      index: 'image',
      label: 'datatable.image',
    },
    {
      key: 'link',
      label: 'datatable.link',
    },
    {
      key: 'text_link',
      label: 'datatable.text_link',
    },
    {
      key: 'blockGroup_id	',
      label: 'datatable.blockGroup',
      constraintName: 'name',
      index: 'constraint',
      foreignKey: 'BlockGroup',
      constraint: 'blockGroup',
    },
    {
      key: 'description',
      label: 'datatable.description',
      index: 'html',
    },
  ],
  BOOTHTEMPLATE: [
    {
      key: 'booth_id',
      label: 'datatable.booth',
      constraintName: 'name',
      index: 'constraint',
      foreignKey: 'Booth',
      constraint: 'booth',
    },
    {
      key: 'field',
      label: 'datatable.field',
    },
    {
      key: 'extention',
      label: 'datatable.extention',
    },
    {
      key: 'descriptions',
      label: 'datatable.descriptions',
      index: 'html',
    },
  ],
}

export const TABS_PROFILE = [
  {
    id: 1,
    name: 'Thông tin tài khoản',
    key: 'profile.info_account',
    icon: IconAccountOutline,
    to: '/profile',
  },
  {
    id: 2,
    name: 'Quản lý mật khẩu',
    key: 'profile.password_management',
    icon: IconPasswordOutline,
    to: '/profile/password-manager',
  },
]

export const ACTION_ADMIN_FILE = [
  {
    id: 1,
    name: 'Rename',
    icon: IconRename16,
  },
  {
    id: 2,
    name: 'Remove',
    icon: IconDelete,
  },
]

export const ROLE = [
  {
    id: 1,
    label: 'datatable.admin',
    value: 'admin',
    type: 'danger',
  },
  {
    id: 2,
    label: 'datatable.user',
    value: 'user',
    type: 'primary',
  },
  {
    id: 3,
    label: 'datatable.organizer',
    value: 'organizer',
    type: 'warning',
  },
  {
    id: 4,
    label: 'datatable.company',
    value: 'company',
    type: 'success',
  },
  {
    id: 5,
    label: 'datatable.content_manager',
    value: 'content_manager',
    type: 'info',
  },
]

export const MEGA_MENU = [
  {
    id: 1,
    to: '/pricing',
    title: 'VExpo.vn Pricing',
    description:
      'Choose a plan that best suits your event goals and scale and host effective virtual, hybrid, and in-person events.',
  },
  {
    id: 2,
    to: '/event-manager',
    title: 'Event Manager',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  },
  {
    id: 3,
    to: '/request',
    title: 'Request',
    description: 'Get Pricing Details, A Detailed Demo & Shareable Content.',
  },
  {
    id: 4,
    to: '/contact',
    title: 'Register Contact',
    description: 'Register Contact',
  },
]
