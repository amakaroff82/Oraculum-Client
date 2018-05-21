export const menus = [
  {
    intlMessageId: 'My Pages',
    url: '/',
    exact: true,
  },
  {
    intlMessageId: 'All Pages',
    url: '/allpages',
    exact: true,
  },
  {
    intlMessageId: 'Settings',
    menuItems: [
        {
            intlMessageId: 'Account',
            path: '/account',
        },
        {
            intlMessageId: 'Logout',
            path: '/logout',
        },
    ],
  },
];
