import IconRoundHome from '~icons/ic/round-home'
import IconImageBold from '~icons/ph/image-bold'
import IconVideo from '~icons/tabler/video'
import IconDocument from '~icons/carbon/document'
import IconShare from '~icons/tabler/share'
import IconTrash from '~icons/tabler/trash'

export const FILE_MENU = [
  {
    id: 1,
    key: '',
    trans: 'home',
    icon: IconRoundHome,
    label: 'Home',
  },
  {
    id: 2,
    key: 'image',
    trans: 'image',
    icon: IconImageBold,
    label: 'Images',
  },
  {
    id: 3,
    key: 'video',
    trans: 'video',
    label: 'Videos',
    icon: IconVideo,
  },
  {
    id: 4,
    key: '',
    trans: 'documents',
    label: 'Documents',
    icon: IconDocument,
  },
  {
    isDivider: true,
  },
  {
    id: 5,
    key: '',
    trans: 'share',
    label: 'Share',
    icon: IconShare,
  },
  {
    id: 6,
    key: '',
    trans: 'trash',
    label: 'Trash',
    icon: IconTrash,
  },
]
