import Wizard from '@components/wizard'
import {useRef, useState} from 'react'
import {ArticleStep1} from './ArticleStep1'
import {ArticleStep2} from './ArticleStep2'
import {ArticleStep3} from './ArticleStep3'

export function FormWizard({isEdit, articleData, setShow, singleCategoryId}) {
    const ref = useRef(null)
    const [stepper, setStepper] = useState(null)
    const [formData, setFormData] = useState(null)

    function handleFromData(data) {
        setFormData(prevS => ({...prevS, ...data}))
    }

    const steps = [
        {
            id: 'article-step1',
            title: 'جزعیات خبر',
            subtitle: 'جزعیات خبر را وارد کنید',
            content: (
                <ArticleStep1
                    stepper={stepper}
                    isEdit={isEdit}
                    handleFromData={handleFromData}
                    articleData={articleData}
                />
            ),
        },
        {
            id: 'article-step2',
            title: 'توضیحات خبر',
            subtitle: 'توضحیات خبر را وارد کنید',
            content: (
                <ArticleStep2
                    stepper={stepper}
                    isEdit={isEdit}
                    handleFromData={handleFromData}
                    articleData={articleData}
                />
            ),
        },
        {
            id: 'article-step3',
            title: 'عکس خبر',
            subtitle: 'عکس خبر را انتخاب کنید',
            content: (
                <ArticleStep3
                    stepper={stepper}
                    isEdit={isEdit}
                    handleFromData={handleFromData}
                    articleData={articleData}
                    formData={formData}
                    setShow={setShow}
                    singleCategoryId={singleCategoryId}
                />
            ),
        },
    ]

    return (
        <div className="horizontal-wizard">
            <Wizard
                instance={el => setStepper(el)}
                ref={ref}
                steps={steps}
                news
                // type={isEdit ? 'modern-horizontal' : null}
                // options={{
                //     linear: isEdit ? false : true,
                // }}
            />
        </div>
    )
}
