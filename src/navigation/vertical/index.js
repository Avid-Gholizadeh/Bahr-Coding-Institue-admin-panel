import {Home, Circle, User, Table, Book, Codesandbox, DollarSign} from 'react-feather'

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
                id: 'general',
                title: 'اطلاعات کلی',
                icon: <Circle className="ms-1" size={20} />,
                navLink: '/courses-general',
            },
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
    {
        id: 'articles',
        title: 'اخبار و مقالات',
        icon: <User size={20} />,
        children: [
            {
                id: 'all-articles',
                title: 'لیست مقالات',
                icon: <Circle size={12} />,
                navLink: '/all-articles',
            },
            {
                id: 'create-article',
                title: 'ایجاد خبر',
                icon: <Circle size={12} />,
                navLink: '/create-article',
            },
            {
                id: 'article-categories',
                title: 'دسته بندی اخبار',
                icon: <Circle size={12} />,
                navLink: '/article-categories',
            },
        ],
    },
    {
        id: 'payments',
        title: 'پرداخت ها',
        icon: <DollarSign size={12} />,
        navLink: '/payments',
    },
    {
        id: 'Buildings',
        title: ' مدیریت ساختمان ها',
        icon: <Codesandbox size={12} />,
        navLink: '/buildings',
    },
]

export default array
