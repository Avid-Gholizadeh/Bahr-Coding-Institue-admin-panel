import {Home, Circle, User, Table, Book} from 'react-feather'

const array = [
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
            {
                id: '/all-groups',
                title: 'گروه ها',
                icon: <Circle className="ms-1" size={20} />,
                navLink: '/all-groups',
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

export default array
