import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

import urldata from '../urldata.json'

import styles from './styles/Slider.module.scss'

const Slider = () => {

    const [data, setData] = useState()
    const [slideIndex, setSlideIndex] = useState(0)
    const [slideCount, setSlideCount] = useState(0)

    useEffect(() => {
        fetch(`${urldata.url}/slider`)
            .then(res => res.json())
            .then(json => { setData(json); setSlideCount(json.length) })
    }, [])

    const ChangeSlide = useCallback((amount) => {
        setSlideIndex(prevValue => {
            const newValue = Math.round(prevValue + amount)

            return Math.abs(newValue % slideCount)
        })
    }, [slideCount])

    useEffect(() => {
        if (!data) return

        const interval = setInterval(() => {
            ChangeSlide(1)
        }, 15000)

        return () => clearInterval(interval)
    }, [data, slideIndex, ChangeSlide])


    return <div className={styles["slider"]}>
        {data && data.map((x, index) => {
            return <Slide key={"slide" + index} caption={x.caption} image={x.image} active={index === slideIndex} />
        })}
        <button className={`${styles.button} ${styles.left}`} onClick={() => ChangeSlide(-1)}></button>
        <button className={`${styles.button} ${styles.right}`} onClick={() => ChangeSlide(1)}></button>
    </div>
}

export default Slider

const Slide = React.forwardRef(({ caption, image, active = false }, ref) => {
    return <div ref={ref} className={`${styles["slide"]} ${active ? styles.active : ""}`}>
        <div className={styles["slide-image-container"]}>
            <img src={`/images/slider/${image}`} alt="" />
        </div>

        <div className={styles["slide-content"]}>
            <div className={styles["slide-caption-container"]}>
                <p className={`${styles["slide-caption"]} ${active ? styles.active : ""}`} dangerouslySetInnerHTML={{ __html: caption }} />
            </div>

            <div className={styles["slide-button-container"]}>
                <NavLink to={"/kontakt"} className={styles["slide-button"]}>KONTAKT OS</NavLink>
            </div>
        </div>
    </div>

})