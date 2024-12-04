import { getTechs } from '@core/services/api/courseGeneral'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { CustomPagination } from '@Components/common/CustomPagination';
import { Button, Card, CardBody, Spinner } from 'reactstrap'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import TechModal from './TechModal'
import {CustomHeader} from '@Components/courses/reserve/CustomHeader'


export default function Technology() {
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerpage] = useState(10)
    const [searchTerm, setSearchTerm] = useState(null)
    const [show , setShow] = useState(false)
    const [selectedTech, setSelectedTech] = useState(null);

    const {data:techList, isLoading:techesLoading} = useQuery({
        queryKey:['techList'],
        queryFn: getTechs
    })
    const columns = [
        {
            name:'',
            minWidth: '100px',
            selector: row => row.techName,
            cell: row => row.techName
        },
        {
            name:'',
            minWidth:'250px',
            cell: row => row.describe
        },
        {
            name:'',
            minWidth:'50px',
            cell: row => row.id
        },
        {
            name:'',
            minWidth:'150px',
            cell: row => (
                <Button
                    color="primary"
                    onClick={() => {
                    setSelectedTech(row); // Set the selected tech item
                    setShow(true); // Open the modal
                    }}
                >
                    ویرایش
                </Button>
            )
        }

    ]
    let filteredTechs = techList ? [...techList] : []
    if (searchTerm && searchTerm?.trim().length !== 0) {
        filteredTechs = techList.filter(
            item =>
                item.techName?.includes(searchTerm) ||
                item.describe?.includes(searchTerm)
        )
    }
    const handlePagination = page => {
        setCurrentPage(page.selected + 1)
    }
    function handlePerPage(e) {
        const value = parseInt(e.currentTarget.value)
        setRowsPerpage(value)
    }
    function dataToRender() {
        if (techList) {
            const allData = [...filteredTechs]

            return allData?.filter(
                (_, index) =>
                    index >= (currentPage - 1) * rowsPerPage && index < currentPage * rowsPerPage
            )
        }
    }
    function handleSearch(val) {
        setSearchTerm(val)
        setCurrentPage(1)
    }
    function Pagination() {
        return (
            <>
                <CustomPagination
                    totalItem={filteredTechs.length}
                    rowsPerPage={rowsPerPage}
                    currentPage={currentPage}
                    handlePagination={handlePagination}
                />
            </>
        )
    }
  return (
    <>
    <Card>
        <CardBody className="d-flex justify-content-between">
            <h1 className="text-primary"> فناوری ها </h1>
            <Button className="add-new-user ms-1" color="primary" onClick={()=>setShow(true)}>
            فناوری جدید
            </Button>
        </CardBody>
    </Card>
    <Card>
        <div className="react-dataTable app-user-list">
            <DataTable
                noHeader
                subHeader
                sortServer
                pagination
                responsive
                paginationServer
                className="react-dataTable"
                columns={columns}
                progressPending={techesLoading}
                progressComponent={<Spinner color="primary" size="md" />}
                noDataComponent={<div style={{padding: '20px'}}> فناوری ای ندارد</div>}
                data={dataToRender()}
                paginationComponent={Pagination}
                subHeaderComponent={
                    <CustomHeader
                        RowsOfPage={rowsPerPage}
                        handlePerPage={handlePerPage}
                        onSearch={handleSearch}
                        title="دسته‌بندی"
                    />
                }
            />
        </div>
    </Card>
    <TechModal
    show={show}
    setShow={setShow}
    selectedTech={selectedTech}
    />
    </>
  )
}
