import {title} from 'process'
import {Mail, Home, Airplay, Circle, User, Table} from 'react-feather'

export default [
    {
        id: 'home',
        title: 'خانه',
        icon: <Home size={20} />,
        navLink: '/home',
    },
    {
        id: 'users',
        title: 'کاربران',
        icon: <User size={20} />,
        children: [
            {
                id: 'list',
                title: 'لیست کاربران',
                icon: <Circle size={12} />,
                navLink: '/user/list',
            },
            {
                id: 'view',
                title: 'نمایش کاربر',
                icon: <Circle size={12} />,
                navLink: '/user/view',
            },
        ],
    },
    {
        id: 'smaplePage',
        title: 'Sample Page',
        icon: <Airplay size={20} />,
        // navLink: "/sample",
        children: [
            {
                id: 'invoiceList',
                title: 'List',
                icon: <Circle size={12} />,
                navLink: '/apps/invoice/list',
            },
        ],
    },
    {
        id: 'commentManagement',
        title: ' مدیریت کامنت',
        icon: <Table size={12} />,
        navLink: '/comments-management',
    },
]
