import Wizard from '@components/wizard'
import {useRef, useState} from 'react'
import {CourseStatusStep1} from './CourseStatusStep1'
import {Link} from 'react-router-dom'
import {FileText, MapPin, User} from 'react-feather'
import {CourseInfoStep2} from './CourseInfoStep2'
import {CourseLinksStep3} from './CourseLinksStep3'
import {CourseImgDateStep4} from './CourseImgDateStep4'

export function FormWizard() {
    const ref = useRef(null)
    const [stepper, setStepper] = useState(null)
    const [formData, setFormData] = useState(null)

    const steps = [
        {
            id: 'account-details',
            title: 'جزعیات دوره',
            subtitle: 'جزعیات دوره را انتخاب کنید',
            content: <CourseStatusStep1 stepper={stepper} />,
            // icon: <FileText size={18} />,
        },
        {
            id: 'personal-info',
            title: 'اطلاعات دوره',
            subtitle: 'اطلاعات دوره را وارد کنید',
            // icon: <User size={18} />,
            content: <CourseInfoStep2 stepper={stepper} />,
        },
        {
            id: 'step-address',
            title: 'لینک ها',
            subtitle: 'لینک ها را وارد کنید',
            // icon: <MapPin size={18} />,
            content: <CourseLinksStep3 stepper={stepper} />,
        },
        {
            id: 'social-links',
            title: 'تصویر و تاریخ',
            subtitle: 'تصویر و تاریخ را وارد کنید',
            // icon: <Link size={18} />,
            content: <CourseImgDateStep4 stepper={stepper} />,
        },
    ]

    return (
        <div className="horizontal-wizard">
            <Wizard
                instance={el => setStepper(el)}
                ref={ref}
                steps={steps}
                /* type="modern-horizontal"
                options={{
                    linear: false,
                }} */
            />
        </div>
    )
}
