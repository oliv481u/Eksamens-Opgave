import { useEffect, useRef, useState } from 'react'
import styles from './styles/Testimonials.module.scss'
import urldata from '../urldata.json'

const Testimonials = () => {

    const [testimonials, setTestimonials] = useState()

    const [dragging, _setDragging] = useState(false)
    const draggingStateRef = useRef(dragging)
    const setDragging = data => {
        draggingStateRef.current = data
        _setDragging(data)
    }

    const [dragPos, _setDragPos] = useState(0)
    const dragPosRef = useRef(dragging)
    const setDragPos = data => {
        dragPosRef.current = data
        _setDragPos(data)
    }

    useState(() => {
        fetch(`${urldata.url}/testimonial`)
            .then(res => res.json())
            .then(json => setTestimonials(
                json.sort(() => (Math.random() > .5) ? 1 : -1).slice(0, 4)
            ))

        window.addEventListener('mousemove', DragTestimonials)

        window.addEventListener('mouseup', MouseUp)

        // console.log("ran")

        return () => {
            window.removeEventListener('mousemove', DragTestimonials)
            window.removeEventListener('mouseup', MouseUp)
        }
    }, [])

    function MouseDown(e) {
        setDragPos(e.clientX)
        setDragging(true)
    }

    function MouseUp() {
        // console.log(draggingStateRef.current)
        setDragging(false)
    }

    function DragTestimonials(e) {
        // console.log(draggingStateRef.current)
        if (!draggingStateRef.current)
            return;

        const x = e.clientX
        console.log(dragPosRef.current)
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
            <div className={styles["testimonials-section-container"]} onMouseDown={() => MouseDown}>
                {testimonials && testimonials.map((x, index) =>
                    <Testimonial key={"testimonial" + index} name={x.name} title={x.title} comment={x.review} img={`/images/testimonials/${x.image}`} />
                )}
            </div>
        </div>
    </section>
}

const Testimonial = ({ name, title, comment, img }) => (
    <div className={styles["testimonail-container"]}>
        <div className={styles["testimonail-image-container"]}>
            <img src={img} alt="" draggable={false} />
        </div>
        <p className={styles["testimonail-name"]}>{name}</p>
        <sub className={styles["testimonail-title"]}>{title}</sub>
        <p className={styles["testimonail-comment"]}>{comment}</p>
    </div>
)

export default Testimonials