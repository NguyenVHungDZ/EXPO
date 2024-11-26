import IconAccountCircle from '~icons/mdi/account-circle'
import IconMinus from '~icons/mdi/minus'
import IconPlus from '~icons/mdi/plus'
import IconActivity from '~icons/tabler/activity'
import IconDashboard from '~icons/file-icons/dashboard'
import IconTelevisionGuide from '~icons/mdi/television-guide'
import IconExpo from '~icons/file-icons/expo'
import IconFile from '~icons/mdi/file'
import IconEvent from '~icons/material-symbols/event-outline'
import IconRequestInterest from '~icons/material-symbols-light/request-quote-outline'
import IconBlock from '~icons/clarity/block-line'
import IconFAQ from '~icons/mdi/faq'
import IconPartner from '~icons/mdi/partnership-outline'
import IconVerify from '~icons/uil/comment-verify'
import ClarityLanguageSolid from '~icons/clarity/language-solid'
import IconContactRequest from '~icons/ic/baseline-connect-without-contact'
import IconContact from '~icons/grommet-icons/contact'
import IconRequest from '~icons/material-symbols/request-page-outline'

export const menuAside = (user) => {
  const userItem = {
    icon: IconAccountCircle,
    to: '/admin/user',
    label: 'navbar.user',
    key: 'user',
  }
  const activityItem = {
    label: 'navbar.activity',
    key: 'activity',
    icon: IconActivity,
    to: '/admin/activity',
  }
  const menuFile = [
    {
      to: '/admin/item',
      icon: IconMinus,
      label: 'navbar.item_list',
      key: 'item',
    },
  ]

  const requestAndContact = {
    icon: IconContactRequest,
    label: 'navbar.request-contact',
    key: 'request-contact',
    menu: [
      {
        to: '/admin/request',
        icon: IconRequest,
        label: 'navbar.request',
        key: 'request',
      },
      {
        to: '/admin/contact',
        icon: IconContact,
        label: 'navbar.contact',
        key: 'contact',
      },
    ],
  }

  const defaultMenu = [
    {
      to: '/admin/dashboard',
      icon: IconDashboard,
      label: 'navbar.dashboard',
      key: 'dashboard',
    },
    {
      icon: IconExpo,
      label: 'navbar.expo',
      menu: [
        {
          to: '/admin/event',
          icon: IconMinus,
          label: 'navbar.event',
          key: 'event',
        },
        {
          to: '/admin/event-type',
          icon: IconMinus,
          label: 'navbar.event_type',
          key: 'event-type',
        },
        {
          to: '/admin/form',
          icon: IconMinus,
          label: 'navbar.form',
          key: 'form',
        },
      ],
    },
    {
      icon: IconEvent,
      label: 'navbar.template',
      key: 'template',
      menu: [
        {
          to: '/admin/expo',
          icon: IconMinus,
          label: 'navbar.expo',
          key: 'expo',
        },
        {
          to: '/admin/booth',
          icon: IconMinus,
          label: 'navbar.booth',
          key: 'booth',
        },
        {
          to: '/admin/booth-template',
          icon: IconMinus,
          label: 'navbar.booth_template_style',
          key: 'booth-template',
        },
      ],
    },
    {
      icon: IconTelevisionGuide,
      label: 'navbar.content',
      key: 'content',
      menu: [
        {
          to: '/admin/request-interest',
          icon: IconRequestInterest,
          label: 'navbar.request_interested',
          key: 'request-interest',
        },
        {
          to: '/admin/testimonial',
          icon: IconVerify,
          label: 'navbar.testimonial',
          key: 'testimonial',
        },
        {
          to: '/admin/partner',
          icon: IconPartner,
          label: 'navbar.partner',
          key: 'partner',
        },
        {
          icon: IconFAQ,
          label: 'navbar.faq',
          menu: [
            {
              to: '/admin/faq',
              icon: IconMinus,
              label: 'navbar.list',
              key: 'faq',
            },
            {
              to: '/admin/faq-type',
              icon: IconMinus,
              label: 'navbar.faq_type',
              key: 'faq-type',
            },
          ],
        },
        {
          icon: ClarityLanguageSolid,
          label: 'navbar.language',
          menu: [
            {
              to: '/admin/language',
              icon: IconMinus,
              label: 'navbar.list',
              key: 'language',
            },
            {
              to: '/admin/translation',
              icon: IconMinus,
              label: 'navbar.translation',
              key: 'translation',
            },
          ],
        },
        {
          icon: IconBlock,
          label: 'navbar.block',
          menu: [
            {
              to: '/admin/block-type',
              icon: IconMinus,
              label: 'navbar.block_type',
              key: 'block-type',
            },
            {
              to: '/admin/block-group',
              icon: IconMinus,
              label: 'navbar.block_group',
              key: 'block-group',
            },
            {
              to: '/admin/block',
              icon: IconMinus,
              label: 'navbar.block',
              key: 'block',
            },
          ],
        },
      ],
    },
    {
      to: '/admin/file',
      label: 'navbar.file',
      icon: IconFile,
      key: 'file',
    },
  ]

  // init menu
  let menu = []

  // check role
  if (user.role === 'admin') {
    menuFile.push({
      to: '/admin/item/trash',
      icon: IconPlus,
      label: 'List of deleted items',
      key: 'list_deleted',
    })
    menu = [...defaultMenu]
    menu.push(requestAndContact)
    menu.push(userItem)
    menu.push(activityItem)
  } else if (user.role === 'organizer') {
    menu = defaultMenu
  } else if (user.role === 'content_manager') {
    menu = defaultMenu
  } else if (user.role === 'company') {
    menu = defaultMenu
  }
  return menu
}
