import { useEffect, useRef, useState } from 'react'
import styles from './styles/Testimonials.module.scss'
import urldata from '../urldata.json'
import { useLocation } from 'react-router-dom'

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState()

    const [dragging, _setDragging] = useState(false)
    const draggingStateRef = useRef(dragging)
    const setDragging = data => {
        draggingStateRef.current = data
        _setDragging(data)
    }

    const [dragPos, _setDragPos] = useState(0)
    const dragPosRef = useRef(dragPos)
    const setDragPos = data => {
        dragPosRef.current = data
        _setDragPos(data)
    }

    const testimonialContainer = useRef()

    useState(() => {
        fetch(`${urldata.url}/testimonial`)
            .then(res => res.json())
            .then(json => setTestimonials(
                json.sort(() => (Math.random() > .5) ? 1 : -1).slice(0, 4)
            ))

        window.addEventListener('mousemove', DragTestimonials)

        window.addEventListener('mouseup', MouseUp)

        return () => Unsubscribe()
    }, [])

    function Unsubscribe() {
        window.removeEventListener('mousemove', DragTestimonials)
        window.removeEventListener('mouseup', MouseUp)
    }

    function MouseDown(e) {
        if (testimonialContainer.current == null) {
            Unsubscribe()
            return
        }

        setDragging(true)
        setDragPos(e.clientX)
        testimonialContainer.current.classList.remove(styles.smooth)
    }

    function MouseUp(e) {
        setDragging(false)

        if (testimonialContainer.current == null) {
            Unsubscribe()
            return
        }
        testimonialContainer.current.classList.add(styles.smooth)

        const testimonialContainerWidth = testimonialContainer.current.getBoundingClientRect().width + 40
        const testimonialWidth = testimonialContainerWidth / 3
        const index = Math.round((ParseElementXTranslation(testimonialContainer.current) / testimonialWidth) - 1) * -1

        MoveTestimonialsIndex(index)
    }

    function DragTestimonials(e) {
        if (!draggingStateRef.current)
            return;

        const x = e.clientX
        MoveTestimonials(x - dragPosRef.current)
        setDragPos(x)
    }

    function MoveTestimonials(amount) {
        const currentTranslate = ParseElementXTranslation(testimonialContainer.current)
        testimonialContainer.current.style.transform = `translateX(${amount + currentTranslate}px)`
    }

    function MoveTestimonialsIndex(index) {
        index *= -1
        const testimonialContainerWidth = testimonialContainer.current.getBoundingClientRect().width + 40
        testimonialContainer.current.style.transform = `translateX(${(testimonialContainerWidth / 3) * (index + 1)}px)`
    }

    return <section className={styles["testimonials-section"]}>
        <div className={styles["testimonials-backgroundimage-container"]}>
            <img src="/images/testimonials/testimonials-baggrund.png" alt="" />
        </div>

        <div className={styles["testimonials-subsection"]}>
            <h2>Vores <span className='orange'>kunder siger</span></h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quos illum quasi?
            </p>
            <div className={styles["testimonials-section-separator"]} />
            <div ref={testimonialContainer} className={styles["testimonials-section-container"]} onMouseDown={MouseDown}>
                {testimonials && testimonials.map((x, index) => {

                    return <Testimonial key={"testimonial" + index} name={x.name} title={x.title} comment={x.review} img={`/images/testimonials/${x.image}`} />
                })}
            </div>
        </div>
    </section >
}
export default Testimonials

const Testimonial = ({ name, title, comment, img }) => {

    const ref = useRef()

    useEffect(() => {
        window.addEventListener('mousemove', OnMouseMove)

        return () => window.removeEventListener('mousemove', OnMouseMove)
    }, [])

    function OnMouseMove() {

        const currentTranslation = ParseElementXTranslation(ref.current)
        const containerWidth = ref.current.parentElement.getBoundingClientRect().width

        if (ref.current.getBoundingClientRect().x <= -170) {
            const newTranslation = currentTranslation + containerWidth + 40 + (containerWidth + 40) / 3
            ref.current.style.transform = `translateX(${newTranslation}px)`
        }
        else if (ref.current.getBoundingClientRect().x >= containerWidth + (containerWidth) / 4) {
            const newTranslation = currentTranslation - containerWidth - 40 - (containerWidth + 40) / 3
            ref.current.style.transform = `translateX(${newTranslation}px)`
        }
    }

    return <div ref={ref} style={{ transform: "translateX(0px)" }} className={styles["testimonail-container"]}>
        <div className={styles["testimonail-image-container"]}>
            <img src={img} alt="" draggable={false} />
        </div>
        <p className={styles["testimonail-name"]}>{name}</p>
        <sub className={styles["testimonail-title"]}>{title}</sub>
        <p className={styles["testimonail-comment"]}>{comment}</p>
    </div>
}


function ParseElementXTranslation(element) {
    const transform = element.style.transform
    if (!element.style.transform)
        element.style.transform = "translateX(0px)"
    const currentTranslate = parseFloat(transform.slice(transform.indexOf("(") + 1, transform.indexOf("px)")))

    return currentTranslate
}