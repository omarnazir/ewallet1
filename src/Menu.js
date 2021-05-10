/*
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
    },
    {
        name: 'SMS',
        path: '/sms',
        icon: 'icon-grid',
        translate: 'sidebar.nav.SMS'
    }
];
*/
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
        name: 'View Customer List',
        icon: 'icon-list',
        path: '/customers-list'
    },
    {
        name: 'Post Paid Customer',
        icon: 'fa fa-money-bill',
        path: '/customers-postpaid'
    },
    {
        name: 'View Transactions',
        icon: 'icon-wallet',
        path: '/transactions'
    },
    {
        name: 'Manage Senders',
        icon: 'icon-people',
        path: '/senders'
    },
    {
        name: 'Requested Templates',
        icon: 'icon-layers',
        path: '/sms-templates'
    },
    {
        name: 'Manage Tariffs',
        icon: 'icon-note',
        path: '/manage-tariffs'
    },
    {
        name: 'Manage Users',
        icon: 'fa fa-users',
        path: '/manage-users'
    },
    {
        name: 'System Settings',
        icon: 'icon-settings',
        submenu: [{
            name: 'Restricted words to filter',
            icon:'fa fa-download',
            path: '/restricted-words'
        },
        {
            name: 'Do not disturb',
            icon:'fa fa-phone',
            path: '/reserved-numbers'
        },  {
            name: 'Operators',
            path: '/operators-list',
            translate: 'sidebar.nav.setting.OPERATORS'
        }
    
    ]
    },
   
];


export default Menu;