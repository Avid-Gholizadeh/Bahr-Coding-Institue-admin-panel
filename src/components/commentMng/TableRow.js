import React from 'react'
import {Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {MoreVertical, Edit, Trash, Check, X, FileText} from 'react-feather'
import {createPortal} from 'react-dom'

const PortalDropdownMenu = ({children}) => {
    return createPortal(children, document.getElementById('portal-root'))
}

export function TableRow({
    comment,
    onAccept,
    onReject,
    onEdit,
    onReply,
    onDelete,
    singleCourse,
    singleArticle,
}) {
    return (
        <tr>
            <td /* className="w-25"  */ style={{maxWidth: '200px'}}>
                <span className="align-middle fw-bold">
                    {comment?.commentTitle || comment?.title}
                </span>
            </td>
            <td className="text-truncate" style={{maxWidth: '170px', backgroundColor: ''}}>
                {comment.describe}
            </td>
            {!singleCourse && !singleArticle && (
                <td className="text-truncate">{comment.courseTitle}</td>
            )}
            {singleArticle && (
                <>
                    <td className="text-truncate text-center">{comment.likeCount}</td>
                    <td className="text-truncate text-center">{comment.dissLikeCount}</td>
                </>
            )}
            {!singleArticle && (
                <td>
                    {comment.accept ? (
                        <Badge pill color="light-success" className="me-1">
                            تایید شده
                        </Badge>
                    ) : (
                        <Badge pill color="light-warning" className="me-1">
                            در انتظار
                        </Badge>
                    )}
                </td>
            )}
            <td style={{minWidth: '100px'}}>
                <UncontrolledDropdown>
                    <DropdownToggle
                        className="icon-btn hide-arrow"
                        color="transparent"
                        size="sm"
                        caret
                    >
                        <MoreVertical size={15} />
                    </DropdownToggle>
                    <PortalDropdownMenu>
                        <DropdownMenu>
                            {!comment.accept && !singleArticle && (
                                <>
                                    <DropdownItem
                                        className="text-warning"
                                        href="#"
                                        onClick={e => {
                                            e.preventDefault()
                                            onReject(comment?.commentId || comment?.id)
                                        }}
                                    >
                                        <X className="me-50" size={15} />{' '}
                                        <span className="align-middle">رد کردن</span>
                                    </DropdownItem>

                                    <DropdownItem
                                        className="text-success"
                                        href="#"
                                        onClick={e => {
                                            e.preventDefault()
                                            onAccept(comment?.commentId || comment?.id)
                                        }}
                                    >
                                        <Check className="me-50" size={15} />{' '}
                                        <span className="align-middle">تایید کردن</span>
                                    </DropdownItem>
                                </>
                            )}

                            {!singleArticle && (
                                <DropdownItem
                                    className="text-danger"
                                    href="#"
                                    onClick={e => {
                                        e.preventDefault()
                                        onDelete(comment?.commentId || comment?.id)
                                    }}
                                >
                                    <Trash className="me-50" size={15} />{' '}
                                    <span className="align-middle">پاک کردن</span>
                                </DropdownItem>
                            )}

                            <DropdownItem
                                href="#"
                                onClick={e => {
                                    e.preventDefault()
                                    onEdit(comment)
                                }}
                            >
                                <Edit className="me-50" size={15} />
                                <span className="align-middle">ویرایش</span>
                            </DropdownItem>

                            {comment?.replyCommentId ||
                            !comment?.parentId === '00000000-0000-0000-0000-000000000000' ? null : (
                                <DropdownItem
                                    className="active-dropdown-item "
                                    href="#"
                                    onClick={e => {
                                        e.preventDefault()
                                        onReply(comment) // Call onReply handler
                                    }}
                                >
                                    <FileText className="me-50" size={15} />
                                    <span className="align-middle">پاسخ دادن</span>
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </PortalDropdownMenu>
                </UncontrolledDropdown>
            </td>
            {!singleCourse && !singleArticle && (
                <td>
                    {comment.replyCommentId ? (
                        <Badge color="light-info">پاسخ</Badge>
                    ) : (
                        <Badge>کامنت</Badge>
                    )}
                </td>
            )}
        </tr>
    )
}
