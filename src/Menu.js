const Menu = [
    {
        heading: 'Main Navigation',
        translate: 'sidebar.heading.HEADER'
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'icon-speedometer',
        translate: 'sidebar.nav.DASHBOARD'
    },
    {
        name: 'Settings',
        icon: 'icon-grid',
        translate: 'sidebar.nav.setting.SETTINGS',
        submenu: [
            {
                name: 'Operators',
                path: '/operators-list',
                translate: 'sidebar.nav.setting.OPERATORS'
            }
        ]
    }
];

export default Menu;