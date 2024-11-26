import IconImage from '~icons/material-symbols/image'
import IconDate from '~icons/fluent-mdl2/date-time'
import GgQuoteO from '~icons/gg/quote-o'
import MingcuteLinkFill from '~icons/mingcute/link-fill'
import GisPositionMan from '~icons/gis/position-man'
import IconCompany from '~icons/mdi/company'
import StreamlineWebSolid from '~icons/streamline/web-solid'
import IconExpo from '~icons/cib/expo'
import MdiLocation from '~icons/mdi/location'
import MdiForm from '~icons/mdi/form'
import IconCount from '~icons/oui/token-token-count'
import MdiUser from '~icons/mdi/user'
import IconEmail from '~icons/ic/baseline-email'
import IconPhone from '~icons/ph/phone-fill'
import IconRate from '~icons/material-symbols/star-rate-outline'
import IconDetail from '~icons/bxs/comment-detail'
import IconDescription from '~icons/material-symbols/description-outline'
import IconTax from '~icons/heroicons-solid/receipt-tax'
import IconFax from '~icons/material-symbols/fax'
import IconFormBooth from '~icons/material-symbols/event-note-sharp'
import IconAsk from '~icons/wpf/ask-question'
import BxBookContent from '~icons/bx/book-content'
import MdiFaq from '~icons/mdi/faq'
import IcBaselineQuestionAnswer from '~icons/ic/baseline-question-answer'
import BxRename from '~icons/bx/rename'
import IconMap from '~icons/material-symbols/map-outline'
import IconField from '~icons/iconoir/input-field'
import IconExtension from '~icons/gg/extension'
import IconUser from '~icons/ri/user-line'
import IconTips from '~icons/icon-park-outline/tips'
import IconType from '~icons/lucide/book-type'
import IconEvent from '~icons/material-symbols/event-outline'
import IconTitle from '~icons/pajamas/title'
import IconBio from '~icons/mdi/biography'
import IconWidth from '~icons/akar-icons/width'
import IconStatus from '~icons/fluent/status-12-filled'
import IconGroup from '~icons/lucide/group'
import IconRole from '~icons/eos-icons/role-binding'
import IconLang from '~icons/clarity/language-line'
import IconMode from '~icons/material-symbols-light/developer-mode-tv-outline'
import IconTranslation from '~icons/ph/translate-bold'

export const event = [
  {
    title: 'datatable.name',
    field: 'name',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.phone',
    field: 'phone',
    icon: IconPhone,
    type: 'text',
  },
  {
    title: 'datatable.email',
    field: 'email',
    icon: IconEmail,
    type: 'text',
  },
  {
    title: 'datatable.website',
    field: 'website',
    icon: StreamlineWebSolid,
    type: 'link',
  },

  {
    title: 'datatable.address',
    field: 'address',
    icon: MdiLocation,
    type: 'text',
  },
  {
    title: 'datatable.date_start',
    field: 'date_start',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.date_end',
    field: 'date_end',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.map',
    icon: IconMap,
    type: 'map',
    lat: 'latitude',
    lon: 'longitude',
  },
  {
    title: 'datatable.detail',
    field: 'detail',
    icon: IconDetail,
    type: 'html',
  },
  {
    title: 'datatable.featured_image',
    field: 'featured_image',
    icon: IconImage,
    type: 'image',
  },
  {
    title: 'datatable.username',
    field: 'username',
    extraName: 'user',
    icon: IconUser,
    type: 'contraint',
  },
  {
    title: 'datatable.event_type',
    field: 'name',
    extraName: 'eventType',
    icon: IconType,
    type: 'contraint',
  },
  {
    title: 'datatable.event',
    field: 'name',
    extraName: 'event_expo',
    icon: IconExpo,
    type: 'contraint',
    withImage: true,
    image: 'featured_image',
  },
]

export const eventType = [
  {
    title: 'datatable.name',
    field: 'name',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.description',
    field: 'description',
    icon: IconDescription,
    type: 'html',
  },
  {
    title: 'datatable.featured_image',
    field: 'featured_image',
    icon: IconImage,
    type: 'image',
  },
]

export const form = [
  {
    title: 'datatable.name',
    field: 'name',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.name_en',
    field: 'name_en',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.phone',
    field: 'phone',
    icon: IconPhone,
    type: 'text',
  },
  {
    title: 'datatable.email',
    field: 'email',
    icon: IconEmail,
    type: 'text',
  },
  {
    title: 'datatable.website',
    field: 'website',
    icon: StreamlineWebSolid,
    type: 'link',
  },
  {
    title: 'datatable.tax',
    field: 'tax',
    icon: IconTax,
    type: 'text',
  },
  {
    title: 'datatable.fax',
    field: 'fax',
    icon: IconFax,
    type: 'text',
  },
  {
    title: 'datatable.location',
    icon: GisPositionMan,
    field: 'laction',
    type: 'text',
  },
  {
    title: 'datatable.username',
    field: 'username',
    extraName: 'user',
    icon: IconUser,
    type: 'contraint',
  },
  {
    title: 'datatable.booth',
    field: 'name',
    extraName: 'form_booth',
    icon: IconFormBooth,
    type: 'contraint',
    withImage: true,
    image: 'featured_image',
  },
  {
    title: 'datatable.event',
    field: 'name',
    extraName: 'event',
    icon: IconExpo,
    type: 'contraint',
    withImage: true,
    image: 'featured_image',
  },
  {
    title: 'datatable.status',
    field: 'status',
    icon: IconStatus,
    type: 'tag',
    options: [
      { title: 'datatable.approved', value: 'approved', color: 'success' },
      { title: 'datatable.pending', value: 'pending', color: 'primary' },
      { title: 'datatable.rejected', value: 'rejected', color: 'danger' },
    ],
  },
]

export const expo = [
  {
    title: 'datatable.name',
    field: 'name',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.featured_image',
    field: 'featured_image',
    icon: IconImage,
    type: 'image',
  },
  {
    title: 'datatable.detail',
    field: 'detail',
    icon: IconDetail,
    type: 'html',
  },
  {
    title: 'datatable.gallery',
    route: 'ExpoGallery',
    icon: IconImage,
    type: 'gallery',
  },
]

export const booth = [
  {
    title: 'datatable.name',
    field: 'name',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.width',
    field: 'width',
    icon: IconWidth,
    type: 'text',
  },
  {
    title: 'datatable.length',
    field: 'length',
    icon: IconCount,
    type: 'text',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.featured_image',
    field: 'featured_image',
    icon: IconImage,
    type: 'image',
  },
  {
    title: 'datatable.detail',
    field: 'detail',
    icon: IconDetail,
    type: 'html',
  },
  {
    title: 'datatable.gallery',
    route: 'BoothGallery',
    icon: IconImage,
    type: 'gallery',
  },
]

export const boothTemplate = [
  {
    title: 'datatable.booth',
    field: 'name',
    extraName: 'booth',
    icon: IconFormBooth,
    type: 'contraint',
    withImage: true,
    image: 'featured_image',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.field',
    field: 'field',
    icon: IconField,
    type: 'text',
  },
  {
    title: 'datatable.extention',
    field: 'extention',
    icon: IconExtension,
    type: 'text',
  },
  {
    title: 'datatable.descriptions',
    field: 'descriptions',
    icon: IconDescription,
    type: 'html',
  },
]

export const testimonial = [
  {
    title: 'datatable.name',
    field: 'name',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.company',
    field: 'company',
    icon: IconCompany,
    type: 'text',
  },
  {
    title: 'datatable.position',
    field: 'position',
    icon: GisPositionMan,
    type: 'text',
  },
  {
    title: 'datatable.rate',
    field: 'rate',
    icon: IconRate,
    type: 'rate',
  },
  {
    title: 'datatable.quote',
    field: 'quote',
    icon: GgQuoteO,
    type: 'html',
  },
]

export const partner = [
  {
    title: 'datatable.name',
    field: 'name',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.image',
    field: 'image',
    icon: IconImage,
    type: 'image',
  },
  {
    title: 'datatable.link',
    field: 'link',
    icon: MingcuteLinkFill,
    type: 'link',
  },
]

export const faq = [
  {
    title: 'datatable.ask',
    field: 'ask',
    icon: IconAsk,
    type: 'text',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.faq_type',
    field: 'name',
    extraName: 'faqType',
    icon: MdiFaq,
    type: 'contraint',
  },
  {
    title: 'datatable.answer',
    field: 'answer',
    icon: IcBaselineQuestionAnswer,
    type: 'html',
  },
]

export const faqType = [
  {
    title: 'datatable.name',
    field: 'name',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.description',
    field: 'description',
    icon: IconDescription,
    type: 'html',
  },
]

export const blockGroup = [
  {
    title: 'datatable.name',
    field: 'name',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.description',
    field: 'description',
    icon: IconDescription,
    type: 'html',
  },
  {
    title: 'blockType_id',
    field: 'name',
    extraName: 'blockType',
    icon: IconType,
    type: 'contraint',
  },
]

export const block = [
  {
    title: 'datatable.title',
    field: 'title',
    icon: IconTitle,
    type: 'text',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.link',
    field: 'link',
    icon: MingcuteLinkFill,
    type: 'link',
    linkTitle: 'text_link',
  },
  {
    title: 'datatable.image',
    field: 'image',
    icon: IconImage,
    type: 'image',
  },
  {
    title: 'datatable.description',
    field: 'description',
    icon: IconDescription,
    type: 'html',
  },
  {
    title: 'blockGroup_id',
    field: 'name',
    extraName: 'blockGroup',
    icon: IconGroup,
    type: 'contraint',
  },
]

export const request = [
  {
    title: 'datatable.name',
    field: 'name',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.email',
    field: 'email',
    icon: IconEmail,
    type: 'text',
  },
  {
    title: 'datatable.company',
    field: 'company',
    icon: IconCompany,
    type: 'text',
  },
  {
    title: 'datatable.phone',
    field: 'phone',
    icon: IconPhone,
    type: 'text',
  },
  {
    title: 'datatable.request_interested',
    field: 'name',
    extraName: 'requestInterested',
    icon: IconTips,
    type: 'contraint',
  },
  {
    title: 'datatable.event_type',
    field: 'name',
    extraName: 'eventType',
    icon: IconEvent,
    type: 'contraint',
  },
]

export const requestInterested = [
  {
    title: 'datatable.name',
    field: 'name',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.descriptions',
    field: 'description',
    icon: IconDetail,
    type: 'html',
  },
]

export const contact = [
  {
    title: 'datatable.name',
    field: 'name',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.email',
    field: 'email',
    icon: IconEmail,
    type: 'text',
  },
  {
    title: 'datatable.title',
    field: 'title',
    icon: IconTitle,
    type: 'text',
  },
  {
    title: 'datatable.phone',
    field: 'phone',
    icon: IconPhone,
    type: 'text',
  },
  {
    title: 'datatable.content',
    field: 'content',
    icon: BxBookContent,
    type: 'html',
  },
]

export const user = [
  {
    title: 'datatable.name',
    field: 'name',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.role',
    field: 'role',
    icon: IconRole,
    type: 'tag',
    options: [
      { title: 'datatable.company', value: 'company', color: 'success' },
      { title: 'datatable.organizer', value: 'organizer', color: 'warning' },
      { title: 'datatable.user', value: 'user ', color: 'primary' },
      { title: 'datatable.admin', value: 'admin ', color: 'error' },
      {
        title: 'datatable.content_manager',
        value: 'content_manager',
        color: 'info',
      },
    ],
  },
  {
    title: 'datatable.username',
    field: 'username',
    icon: MdiUser,
    type: 'text',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
  {
    title: 'datatable.address',
    field: 'address',
    icon: MdiLocation,
    type: 'text',
  },
  {
    title: 'datatable.email',
    field: 'email',
    icon: IconEmail,
    type: 'text',
  },
  {
    title: 'datatable.company',
    field: 'company',
    icon: IconCompany,
    type: 'text',
  },
  {
    title: 'datatable.phone',
    field: 'phone',
    icon: IconPhone,
    type: 'text',
  },
  {
    title: 'datatable.bio',
    field: 'bio',
    icon: IconBio,
    type: 'html',
  },
]

export const language = [
  {
    title: 'datatable.name',
    field: 'name',
    icon: BxRename,
    type: 'text',
  },
  {
    title: 'datatable.code_language',
    field: 'code_language',
    icon: IconLang,
    type: 'text',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
]

export const translation = [
  {
    title: 'datatable.language_id',
    field: 'name',
    extraName: 'language',
    icon: IconEvent,
    type: 'contraint',
  },
  {
    title: 'datatable.model',
    field: 'model',
    icon: IconMode,
    type: 'text',
  },
  {
    title: 'datatable.field',
    field: 'field',
    icon: IconField,
    type: 'text',
  },
  {
    icon: BxBookContent,
    title: 'datatable.content',
    type: 'translate',
  },
  {
    title: 'datatable.translate',
    field: 'translate',
    icon: IconTranslation,
    type: 'text',
  },
  {
    title: 'datatable.created_at',
    field: 'created_at',
    icon: IconDate,
    type: 'date',
  },
]
