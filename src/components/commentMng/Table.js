import React from 'react'
import {Table} from 'reactstrap'
import {TableBodyContent} from './TableBodyContent'

const TableHover = ({data, singleCourse}) => {
    const List = data ? data : []
    return (
        <Table hover responsive>
            <thead>
                <tr>
                    <th>موضوع</th>
                    <th>شرح</th>
                    {!singleCourse && <th style={{width: '20%'}}>نام دوره</th>}
                    <th style={{width: '10%'}}>وضعیت</th>
                    <th style={{width: '10%'}}>عملیات</th>
                    {!singleCourse && <th style={{width: '10%'}}>نوع</th>}
                </tr>
            </thead>
            <TableBodyContent List={List} singleCourse={singleCourse} />
        </Table>
    )
}

export default TableHover
