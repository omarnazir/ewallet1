const Menu = [
    {
        heading: 'Main Navigation',
        translate: 'sidebar.heading.HEADER'
    },
    {
        name: 'Dashboard',
        path: '/admin-dashboard',
        icon: 'icon-speedometer',
        translate: 'sidebar.nav.DASHBOARD'
    },
    {
        name: 'View Customer List',
        icon: 'icon-list',
        path: '/admin-customers-list'
    },
    {
        name: 'Post Paid Customer',
        icon: 'fa fa-money-bill',
        path: '/admin-customers-postpaid'
    },
    {
        name: 'View Transactions',
        icon: 'icon-wallet',
        path: '/admin-transactions'
    },
    {
        name: 'Manage Senders',
        icon: 'icon-people',
        path: '/admin-senders'
    },
    {
        name: 'Requested Templates',
        icon: 'icon-layers',
        path: '/admin-sms-templates'
    },
    {
        name: 'Manage Tariffs',
        icon: 'icon-note',
        path: '/admin-manage-tariffs'
    },
    {
        name: 'Manage Users',
        icon: 'fa fa-users',
        path: '/admin-manage-users'
    },
    {
        name: 'Account Management',
        icon: 'fa fa-user',
        path: '/admin-self-manage'
    },
    {
        name: 'System Settings',
        icon: 'icon-settings',
        path:"/admin-settings",
        submenu: [
            {
                name:"Manage SMSC",
                path:"/admin-manage-smsc",
                icon:"fa fa-globe"
            },
            {
                name:"Manage Mail",
                path:"/admin-manage-mail",
                icon:"fa fa-inbox"
            },
            {
                name:"Manage Roles",
                path:"/admin-manage-roles",
                icon:"fa fa-users"
            },
            {
            name: 'Restricted words to filter',
            icon: 'fa fa-download',
            path: '/admin-restricted-words'
        },

            {
                name: 'Do not disturb',
                icon: 'fa fa-ban',
                path: '/admin-reserved-numbers'
            }, {
                name: 'Operators',
                icon: 'fa fa-phone',
                path: '/admin-mobile-operators'
            },
            {
                name: 'Sms logs',
                path: '/admin-sms-log',
                icon: 'icon-bubble'
            }

        ]
    },

    /**User pages on Refactor DELETE the routes */
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: 'icon-speedometer',
            translate: 'sidebar.nav.DASHBOARD'
        },
        {
            name: 'Sender IDs',
            icon: 'icon-people',
            path: '/senderId'
        },
        {
            name: 'Request SMS',
            icon: 'fa fa-envelope',
            path: '/add-sms-request'
        },
        {
            name: 'Purchase SMS',
            icon: 'fa fa-money-bill',
            path: '/sms-purchase'
        },
        {
            name: 'Invoices',
            icon: 'fa fa-file',
            path: '/prepaid-invoices'
        },
        {
            name: 'Send SMS',
            icon: 'icon-bubble',
            path: '/send-sms'
        },
        {
            name: 'Outbox',
            icon: 'icon-layers',
            path: '/outbox'
        },
        {
            name: 'Scheduled SMS',
            icon: 'icon-note',
            path: '/scheduled-sms'
        },
        {
            name: 'Contact lists',
            icon: 'fa fa-users',
            path: '/contact-lists'
        },
        {
            name: 'Manage User',
            icon: 'fa fa-users',
            path: '/manage-user'
        },
        {
            name: 'Manage Users',
            icon: 'fa fa-users',
            path: '/manage-users'
        },
        {
            name: 'SMS Reports',
            icon: 'fa fa-file-pdf',
            submenu: [{
                name: 'Summary Reports',
                icon: 'fa fa-file-pdf',
                path: '/summary-reports'
            },
                {
                    name: 'Sender Reports',
                    icon: 'fa fa-file-pdf',
                    path: '/sender-reports'
                },

            ]
        },

    
];


export default Menu;