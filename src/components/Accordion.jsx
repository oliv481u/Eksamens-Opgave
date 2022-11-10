import { useEffect, useRef, useState } from 'react'
import styles from './styles/Accordion.module.scss'

const Accordion = ({ title, children, open = false, onClick = () => { } }) => {

    const [, setWindowDimensions] = useState({ height: 0, width: 0 })
    const [openState, setOpenState] = useState(false)
    const contentRef = useRef(null)
    function GetContentHeight() {
        let style = { height: 0, border: "none" }

        if (openState && contentRef.current)
            style = {
                height: contentRef.current.offsetHeight +
                    parseFloat(getComputedStyle(contentRef.current).marginTop) +
                    parseFloat(getComputedStyle(contentRef.current).marginBottom)
            }

        return style
    }

    useEffect(() => {
        window.addEventListener('resize', _ =>
            setWindowDimensions({ height: window.innerHeight, width: window.innerWidth }))

        setOpenState(open)

        return _ => window.removeEventListener('resize', _ =>
            setWindowDimensions({ height: window.innerHeight, width: window.innerWidth }))
    }, [open])

    return <div className={styles["accordion-section"]}>
        <div onClick={() => { onClick(); }} className={`${styles["accordion-head"]} ${openState ? styles.active : ""}`}>
            <p>{title}</p>
        </div>
        <div className={styles["accordion-body"]} style={GetContentHeight()}>
            <p ref={contentRef}>{children}</p>
        </div>
    </div>
}

export default Accordion