import Avatar from '@components/avatar'

const renderCourse = row => {
    if (row.avatar.length) {
        return <Avatar className="me-1" img={row.avatar} width="32" height="32" />
    } else {
        return (
            <Avatar
                initials
                className="me-1"
                color={row.avatarColor || 'light-primary'}
                content={row.fullName || 'John Doe'}
            />
        )
    }
}
