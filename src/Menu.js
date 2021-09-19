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
        name: 'Farmers',
        icon: 'icon-list',
        path: '/admin-farmers-list'
    },
    {
        name: 'Farmer Harvests',
        icon: 'fas fa-exchange-alt',
        path: '/admin-farmers-harvests'
    },
    {
        name: 'Mpesa Wallet',
        icon: 'icon-briefcase',
        path: '/admin-mpesa-wallet'
    },
    {
        name: 'Manage Registars',
        icon: 'fa fa-user-lock',
        path: '/admin-manage-registars'
    },
    {
        name: 'Manage Users',
        icon: 'fa fa-users-cog',
        path: '/admin-manage-users'
    },
    {
        name: 'USSD Menu',
        icon: 'icon-phone',
        path: '/admin-ussd-menu'
    },
    {
        name: 'System Setup',
        icon: 'fas fa-wrench',
        path: '/admin-manage-registars',
        translate: 'sidebar.nav.SETUP',
        submenu: [
            {
                name: 'Crops',
                icon: "icon-arrow-right",
                translate: 'sidebar.nav.setup.CROPS',
                path: '/crops'
            },
            {
                name: 'Crop Prices',
                icon: "icon-arrow-right",
                translate: 'Crop Prices',
                path: '/crop-prices'
            },
            {
                name: 'Agricultural Inputs',
                icon: "icon-arrow-right",
                translate: 'sidebar.nav.setup.INPUTS',
                path: '/inputs'
            },

            {
                name: 'MCU',
                icon: "icon-arrow-right",
                translate: 'MCU',
                path: '/mcos'
            },

            {
                name: 'AMCOS',
                icon: "icon-arrow-right",
                translate: 'AMCOS',
                path: '/amcos',
            },

            {
                name: 'Collection Centers',
                icon: "icon-arrow-right",
                translate: 'sidebar.nav.setup.CENTRES',
                path: '/centers'
            },

            {
                name: 'Regions',
                icon: "icon-arrow-right",
                translate: 'sidebar.nav.setup.REGIONS',
                path: '/regions'
            },

            {
                name: 'Districts',
                icon: "icon-arrow-right",
                translate: 'sidebar.nav.setup.DISTRICTS',
                path: '/districts'
            },

            {
                name: 'Wards',
                icon: "icon-arrow-right",
                translate: 'sidebar.nav.setup.WARDS',
                path: '/wards'
            },

            {
                name: 'Villages',
                icon: "icon-arrow-right",
                translate: 'sidebar.nav.setup.VILLAGES',
                path: '/villages'
            },
        ]
    },
    {
        name: 'System Settings',
        icon: 'icon-settings',
        path: '/admin-manage-registars',
        translate: 'sidebar.nav.SETUP',
        submenu: [
            {
                name: 'Roles',
                icon: "icon-arrow-right",
                translate: 'sidebar.nav.setup.CROPS',
                path: '/crops'
            },
            {
                name: 'Mobile Operators',
                icon: "icon-arrow-right",
                translate: 'Crop Prices',
                path: '/crop-prices'
            },
            {
                name:"Manage SMSC",
                path:"/admin-manage-smsc",
                icon:"icon-arrow-right"
            },
            {
                name:"Manage Mail",
                path:"/admin-manage-mail",
                icon:"icon-arrow-right"
            }
        ]
    },
    {
        name: 'Account Management',
        icon: 'icon-note',
        path: '/admin-self-manage'
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