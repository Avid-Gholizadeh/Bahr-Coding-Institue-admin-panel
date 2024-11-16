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
        id: 'courses',
        title: 'دوره ها',
        icon: <Book size={20} />,
        // navLink: '/courses',
        children: [
            {
                id: 'courses',
                title: 'لیست دوره ها',
                icon: <Circle className="ms-1" size={20} />,
                navLink: '/courses',
            },
            {
                id: 'create-course',
                title: 'ایجاد دوره جدید',
                icon: <Circle className="ms-1" size={20} />,
                navLink: '/create-course',
            },
            {
                id: '/all-reserves',
                title: 'رزرو ها',
                icon: <Circle className="ms-1" size={20} />,
                navLink: '/all-reserves',
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
