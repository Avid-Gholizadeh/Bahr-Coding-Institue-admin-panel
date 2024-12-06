import { EditCommentModal } from '@Components/commentMng/EditCommentModal'
import { useCommentActions } from '@Components/commentMng/hooks/useCommentActions '
import { ReplyCommentModal } from '@Components/commentMng/ReplyCommentModal'
import {useQuery} from '@tanstack/react-query'
import {getUserComments} from '@core/services/api/User'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { createPortal } from 'react-dom'
import { Check, Edit, FileText, MoreVertical, Trash, X } from 'react-feather'
import {Badge, Card, DropdownItem, DropdownMenu, DropdownToggle, Spinner, UncontrolledDropdown} from 'reactstrap'
const PortalDropdownMenu = ({ children }) => {
    const portalRoot = document.getElementById('portal-root');
    return portalRoot ? createPortal(children, portalRoot) : null;
};

export function UserComment({ userId }) {
    const { acceptComment, rejectComment, deleteComment } = useCommentActions();
    const [modalState, setModalState] = useState({
        isEditModalOpen: false,
        isReplyModalOpen: false,
        editingComment: null,
        replyComment: null,
    });
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['userComment'],
        queryFn: () => getUserComments(userId),
    });


    if (isError) {
        return (
            <div>
                خطایی رخ داده است. لطفا دوباره تلاش کنید.
                <button onClick={refetch}>تلاش مجدد</button>
            </div>
        );
    }

    const handleEditClick = (comment) => {
        setModalState({ ...modalState, editingComment: comment, isEditModalOpen: true });
    };

    const handleReplyClick = (comment) => {
        setModalState({ ...modalState, replyComment: comment, isReplyModalOpen: true });
    };

    const columns = [
        {
            name: 'عنوان',
            minWidth: '150px',
            selector: (row) => row.commentTitle,
        },
        {
            name: 'شرح',
            minWidth: '200px',
            selector: (row) => row.describe,
        },
        {
            name: 'وضعیت',
            minWidth: '130px',
            selector: (row) =>
                row.accept ? (
                    <Badge pill color="light-success">
                        تایید شده
                    </Badge>
                ) : (
                    <Badge pill color="light-warning">در انتظار</Badge>
                ),
        },
        {
            name: 'دوره',
            minWidth: '130px',
            selector: (row) => row.courseTitle,
        },
        {
            name: 'نوع',
            minWidth: '100px',
            selector: (row) => row.replyCommentId? 
            <Badge color='light-info'>پاسخ</Badge>
            :
            <Badge color='light-secondary'>کامنت</Badge>,
        },
        {
            minWidth: '30px',
            selector: (row) => (
                <UncontrolledDropdown>
                    <DropdownToggle className="icon-btn hide-arrow" color="transparent" size="sm" caret>
                        <MoreVertical size={15} />
                    </DropdownToggle>
                    <PortalDropdownMenu>

                    <DropdownMenu>
                        {!row.accept && (
                            <>
                                <DropdownItem
                                    className="text-warning"
                                    href='#'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        rejectComment.mutate(row.commentId);
                                    }}                                    
                                >
                                    <X size={15} /> رد کردن
                                </DropdownItem>
                                <DropdownItem
                                    className="text-success"
                                    href='#'

                                    onClick={(e) => {
                                        e.preventDefault();
                                        acceptComment.mutate(row.commentId)}}
                                >
                                    <Check size={15} /> تایید کردن
                                </DropdownItem>
                            </>
                        )}
                        <DropdownItem className="text-danger" 
                        href='#'
                        onClick={(e) => {
                            e.preventDefault();
                            deleteComment.mutate(row.commentId)}}>
                            <Trash size={15} /> پاک کردن
                        </DropdownItem>
                        <DropdownItem 
                        href='#'
                        onClick={(e) => {
                            e.preventDefault();
                            handleEditClick(row)}}>
                            <Edit size={15} /> ویرایش
                        </DropdownItem>
                        {row.replyCommentId !== null && (
                            <DropdownItem href='#'
                            onClick={(e) => {
                                e.preventDefault();
                                handleReplyClick(row)}}>
                                <FileText size={15} /> پاسخ دادن
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                    </PortalDropdownMenu>
                </UncontrolledDropdown>
            ),
        },

    ];

    return (
        <Card>
            <div className="react-dataTable">
                <DataTable
                    responsive
                    columns={columns}
                    data={data?.comments || []}
                    progressPending={isLoading}
                    progressComponent={<Spinner color="primary" />}
                    noDataComponent={<div>کامنتی موجود نمی باشد</div>}
                />
            </div>
            {modalState.isEditModalOpen && (
                <EditCommentModal
                    formModal={modalState.isEditModalOpen}
                    setFormModal={(state) => setModalState({ ...modalState, isEditModalOpen: state })}
                    comment={modalState.editingComment}
                />
            )}
            {modalState.isReplyModalOpen && (
                <ReplyCommentModal
                    formModal={modalState.isReplyModalOpen}
                    setFormModal={(state) => setModalState({ ...modalState, isReplyModalOpen: state })}
                    comment={modalState.replyComment}
                />
            )}
        </Card>
    );
}

