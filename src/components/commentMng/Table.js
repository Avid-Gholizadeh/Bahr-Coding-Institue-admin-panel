import React from 'react'
import {Table} from 'reactstrap'
import {TableBodyContent} from './TableBodyContent'

const TableHover = ({data, singleCourse, singleArticle}) => {
    const List = data ? data : []
    return (
        <Table hover responsive>
            <thead>
                <tr>
                    <th>موضوع</th>
                    <th>شرح</th>
                    {singleArticle && (
                        <>
                            <th>تعداد لایک</th>
                            <th>تعداد دیسلایک</th>
                        </>
                    )}
                    {!singleCourse && !singleArticle && <th style={{width: '20%'}}>نام دوره</th>}
                    {!singleArticle && <th style={{width: '10%'}}>وضعیت</th>}
                    <th style={{width: '10%'}}>عملیات</th>
                    {!singleCourse && !singleArticle && <th style={{width: '10%'}}>نوع</th>}
                </tr>
            </thead>
            <TableBodyContent
                List={List}
                singleCourse={singleCourse}
                singleArticle={singleArticle}
            />
        </Table>
    )
}

export default TableHover
