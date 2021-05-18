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
            icon: 'fa fa-download',
            path: '/restricted-words'
        },
            {
                name: 'Do not disturb',
                icon: 'fa fa-phone',
                path: '/reserved-numbers'
            }, {
                name: 'Operators',
                icon: 'fa fa-phone',
                path: '/mobile-operators'
            },
            {
                name: 'SMS',
                path: '/all-sms',
                icon: 'icon-bubble'
            }

        ]
    },

    /**User pages on Refactor DELETE the routes */
    {
        name: 'User Pages',
        icon: 'fa fa-arrow-down',
        submenu: [
            {
                name: 'Dashboard',
                path: '/user/dashboard',
                icon: 'icon-speedometer',
                translate: 'sidebar.nav.DASHBOARD'
            },
            {
                name: 'Sender IDs',
                icon: 'icon-people',
                path: '/user/senderId'
            },
            {
                name: 'Request SMS',
                icon: 'fa fa-envelope',
                path: '/user/add-sms-request'
            },
            /** Show for pre paid customers only */
            {
                name: 'Purchase SMS',
                icon: 'fa fa-money-bill',
                path: '/user/sms-purchase'
            },
            {
                name: 'Invoices',
                icon: 'fa fa-file',
                path: '/user/prepaid-invoices'
            },
            /**End of show for pre paid customers only */
            {
                name: 'Send SMS',
                icon: 'icon-bubble',
                path: '/user/send-sms'
            },
            {
                name: 'Outbox',
                icon: 'icon-layers',
                path: '/user/outbox'
            },
            {
                name: 'Scheduled SMS',
                icon: 'icon-note',
                path: '/user/scheduled-sms'
            },
            {
                name: 'Contact lists',
                icon: 'fa fa-users',
                path: '/user/contact-list'
            },
            {
                name: 'Manage Users',
                icon: 'fa fa-users',
                path: '/user/manage-user'
            },
            {
                name: 'SMS Reports',
                icon: 'fa fa-file-pdf',
                submenu: [{
                    name: 'Summary Reports',
                    icon: 'fa fa-file-pdf',
                    path: '/user/summary-reports'
                },
                    {
                        name: 'Sender Reports',
                        icon: 'fa fa-file-pdf',
                        path: '/user/sender-reports'
                    },

                ]
            },

        ]
    }

];


export default Menu;