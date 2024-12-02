// ** React Imports
import {useState, Fragment} from 'react'

// ** Reactstrap Imports
import {Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem} from 'reactstrap'

// ** Third Party Imports
import toast from 'react-hot-toast'
import {useDropzone} from 'react-dropzone'
import {X, DownloadCloud} from 'react-feather'

export const ImagePicker = ({handleSelectImage}) => {
    // ** State
    const [files, setFiles] = useState([])

    // console.log(files)

    const {getRootProps, getInputProps} = useDropzone({
        multiple: false,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
        },
        onDrop: (acceptedFiles, rejectedFiles) => {
            if (rejectedFiles.length) {
                toast.error('شما فقط میتوانید عکس انتخاب کنید')
            } else if (files.length === 0) {
                setFiles(prefFiles => {
                    const newFiles = [
                        ...prefFiles,
                        ...acceptedFiles.map(file => Object.assign(file)),
                    ]
                    handleSelectImage(newFiles[0])
                    toast.success('عکس با موفقیت اضافه شد.')

                    return newFiles
                })
            } else {
                toast.error('شما فقط مجاز به انتخاب یک عکس هستید.')
            }
        },
    })

    const handleRemoveFile = file => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter(i => i.name !== file.name)
        setFiles([...filtered])
        handleSelectImage(null)
    }

    const renderFileSize = size => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const fileList = files.map((file, index) => (
        <ListGroupItem
            key={`${file.name}-${index}`}
            className="d-flex align-items-center justify-content-between"
        >
            <div className="file-details d-flex align-items-center">
                <div className="file-preview me-1">
                    <img
                        className="rounded"
                        alt={file.name}
                        src={URL.createObjectURL(file)}
                        height="28"
                        width="28"
                    />
                </div>
                <div>
                    <p className="file-name mb-0">{file.name}</p>
                    <p className="file-size mb-0">{renderFileSize(file.size)}</p>
                </div>
            </div>
            <Button
                color="danger"
                outline
                size="sm"
                className="btn-icon"
                onClick={() => handleRemoveFile(file)}
            >
                <X size={14} />
            </Button>
        </ListGroupItem>
    ))

    return (
        <Card>
            <CardHeader></CardHeader>
            <CardBody>
                <div {...getRootProps({className: 'dropzone'})} className="cursor-pointer">
                    <input {...getInputProps()} />
                    <div className="d-flex align-items-center justify-content-center flex-column">
                        <DownloadCloud size={64} />
                        <h4 className="mt-2">برای آپلود یک فایل را دراپ و یا کلیک کنید</h4>
                    </div>
                </div>
                {files.length ? <ListGroup className="my-2">{fileList}</ListGroup> : null}
            </CardBody>
        </Card>
    )
}
