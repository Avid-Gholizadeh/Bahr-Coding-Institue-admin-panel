import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

const ScrollTop = ({
    showOffset = 100, // Default value for showOffset
    scrollBehaviour = 'smooth', // Default value for scrollBehaviour
    children,
    ...rest
}) => {
    // ** State
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (window) {
            const handleScroll = () => {
                if (window.pageYOffset >= showOffset) {
                    setVisible(true)
                } else {
                    setVisible(false)
                }
            }

            window.addEventListener('scroll', handleScroll)

            return () => {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [showOffset]) // Add `showOffset` to dependencies

    const handleScrollToTop = () => {
        window.scroll({top: 0, behavior: scrollBehaviour})
    }

    return (
        visible && (
            <div className="scroll-to-top" onClick={handleScrollToTop} {...rest}>
                {children}
            </div>
        )
    )
}

export default ScrollTop

// ** PropTypes
ScrollTop.propTypes = {
    showOffset: PropTypes.number,
    children: PropTypes.any.isRequired,
    scrollBehaviour: PropTypes.oneOf(['smooth', 'instant', 'auto']),
}
