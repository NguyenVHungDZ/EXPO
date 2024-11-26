import IconProfile from '~icons/icomoon-free/profile'
import IconForm from '~icons/fluent-mdl2/form-library'
import IconLogout from '~icons/mdi/logout'

export default [
  {
    pages: [
      // {
      //   link: '/event-manager',
      //   title: 'page.event',
      // },
      {
        link: '/events',
        title: 'page.menu.expo_register',
      },
      {
        link: '/event-warehouse',
        title: 'page.menu.event',
      },
      // {
      //   link: '/pricing',
      //   title: 'page.price',
      // },
      // {
      //   link: '/request',
      //   title: 'page.request',
      // },
      {
        link: '/contact',
        title: 'page.menu.contact',
      },
    ],
  },
  {
    isCurrentUser: true,
    menu: [
      {
        icon: IconProfile,
        label: 'profile.my_profile',
        to: '/profile',
      },
      {
        icon: IconForm,
        label: 'events.registered_forms',
        to: '/form-list',
      },
      {
        isDivider: true,
      },
      {
        icon: IconLogout,
        label: 'login.logout',
        isLogout: true,
      },
    ],
  },
]
