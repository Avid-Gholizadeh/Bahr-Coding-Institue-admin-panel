import Wizard from '@components/wizard'
import {useRef, useState} from 'react'
import {CourseStatusStep1} from './CourseStatusStep1'
import {CourseInfoStep2} from './CourseInfoStep2'
import {CourseLinksStep3} from './CourseLinksStep3'
import {CourseImgStep4} from './CourseImgStep4'

export function FormWizard({isEdit, courseData, setShow}) {
    const ref = useRef(null)
    const step1Ref = useRef(null)
    const step2Ref = useRef(null)
    const step3Ref = useRef(null)
    const [stepper, setStepper] = useState(null)
    const [formData, setFormData] = useState(null)

    function handleFromData(data) {
        setFormData(prevS => ({...prevS, ...data}))
    }

    async function handleSubmitForm(activeStepIndex) {
        // console.log('step : ', activeStepIndex)
        if (activeStepIndex === 1) {
            const isValid = await step1Ref.current.handleProgrammaticSubmit()
            return isValid
        } else if (activeStepIndex === 2) {
            const isValid = await step2Ref.current.handleProgrammaticSubmit()
            return isValid
        } else if (activeStepIndex === 3) {
            const isValid = await step3Ref.current.handleProgrammaticSubmit()
            return isValid
        }
        return true
    }

    const steps = [
        {
            id: 'account-details',
            title: 'جزعیات دوره',
            subtitle: 'جزعیات دوره را انتخاب کنید',
            content: (
                <CourseStatusStep1
                    stepper={stepper}
                    isEdit={isEdit}
                    handleFromData={handleFromData}
                    courseData={courseData}
                    ref={step1Ref}
                />
            ),
        },
        {
            id: 'personal-info',
            title: 'اطلاعات دوره',
            subtitle: 'اطلاعات دوره را وارد کنید',
            content: (
                <CourseInfoStep2
                    stepper={stepper}
                    isEdit={isEdit}
                    handleFromData={handleFromData}
                    courseData={courseData}
                    ref={step2Ref}
                />
            ),
        },
        {
            id: 'step-address',
            title: 'لینک ها و تاریخ',
            subtitle: 'لینک ها و تاریخ را وارد کنید',
            content: (
                <CourseLinksStep3
                    stepper={stepper}
                    isEdit={isEdit}
                    handleFromData={handleFromData}
                    courseData={courseData}
                    ref={step3Ref}
                />
            ),
        },
        {
            id: 'social-links',
            title: 'تصویر ',
            subtitle: 'تصویر را انتخاب کنید',
            content: (
                <CourseImgStep4
                    stepper={stepper}
                    isEdit={isEdit}
                    courseData={courseData}
                    handleFromData={handleFromData}
                    formData={formData}
                    setShow={setShow}
                />
            ),
        },
    ]

    return (
        <div className="horizontal-wizard">
            <Wizard
                isEdit={isEdit}
                submitForm={handleSubmitForm}
                instance={el => setStepper(el)}
                ref={ref}
                steps={steps}
                type={isEdit ? 'modern-horizontal' : null}
                options={{
                    linear: isEdit ? false : true,
                }}
            />
        </div>
    )
}
