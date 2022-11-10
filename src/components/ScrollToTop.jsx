import { useEffect, useState } from 'react';
import styles from './styles/ScrollToTop.module.scss'

const ScrollToTop = () => {

    const [scroll, setScroll] = useState()

    useEffect(() => {
        document.addEventListener('scroll', () => setScroll(window.scrollY))
    }, [])

    function Scroll() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    return <button className={`${styles.button} ${scroll < 100 ? styles.top : ""}`} onClick={Scroll}></button>
}

export default ScrollToTop