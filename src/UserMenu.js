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
        name: 'Sender IDs',
        icon: 'icon-people',
        path: '/senderId'
    },
    {
        name: 'Request SMS',
        icon: 'fa fa-envelope',
        path: '/sms-requested'
    },
    {
        name: 'Purchase SMS',
        icon: 'fa fa-money-bill',
        path: '/admin/customers-list'
    },
    {
        name: 'Invoices',
        icon: 'fa fa-file',
        path: '/admin/customers-list'
    },
    {
        name: 'Send SMS',
        icon: 'icon-bubble',
        path: '/admin/transactions'
    },
    {
        name: 'Outbox',
        icon: 'icon-layers',
        path: '/admin/sms-templates'
    },
    {
        name: 'Scheduled SMS',
        icon: 'icon-note',
        path: '/sms-scheduled'
    },
    {
        name: 'Contact lists',
        icon: 'fa fa-users',
        path: '/contact-list'
    },
    {
        name: 'Manage Users',
        icon: 'fa fa-users',
        path: '/manage-user'
    },
    {
        name: 'SMS Reports',
        icon: 'fa fa-file-pdf',
        submenu: [{
            name: 'Summary Reports',
            icon:'fa fa-file-pdf',
            path: '/summary-reports'
        },
        {
            name: 'Sender Reports',
            icon:'fa fa-file-pdf',
            path: '/sender-reports'
        },
    
    ]
    },
];

export default Menu;