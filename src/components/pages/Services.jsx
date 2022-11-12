import { useEffect, useState } from "react"
import SubpageHeader from "../SubpageHeader"

import styles from './styles/Services.module.scss'

import urldata from '../../urldata.json'

const Services = ({ teaser }) => {

    const [data, setData] = useState()
    const [display, setDisplay] = useState(0)
    const [bookingValidationMsg, setBookingValidationMsg] = useState()

    useEffect(() => {
        fetch(`${urldata.url}/service`)
            .then(res => res.json())
            .then(json => { setData(json) })
    }, [])

    function SubmitBooking(e) {
        e.preventDefault()

        const formData = new FormData(e.target)

        if (formData.get("name") === "") {
            setBookingValidationMsg(<p style={{ color: "red" }}>Indtast dit navn</p>)
            return
        }
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.get("email"))) {
            setBookingValidationMsg(<p style={{ color: "red" }}>Indtast en gyldig email</p>)
            return
        }
        else if (!/^[0-9]+$/g.test(formData.get("phone"))) {
            setBookingValidationMsg(<p style={{ color: "red" }}>Indtast dit mobilnummer</p>)
            return
        }

        fetch(`${urldata.url}/booking`, {
            method: "POST",
            body: formData
        })
            .then(res => {
                if (res.ok) {
                    setBookingValidationMsg(<p style={{ color: "lime" }}>Booking sendt!</p>)
                }
            })
    }

    if (!teaser)
        return <section className={styles["services-section"]}>
            <SubpageHeader title={"Vores services"} />

            <div className={styles["services-section-main"]}>
                <div className={styles["services-section-main-buttons"]}>
                    {data && data.map((x, index) => {
                        return <button key={"title" + index} onClick={() => setDisplay(index)} className={index === display ? styles.active : ""}>{x.title}</button>
                    })}
                </div>

                {data && <div className={styles["services-section-main-content"]}>
                    <div className={styles["services-section-main-image-container"]}>
                        <img src={`/images/services/${data[display].image}`} alt="" />
                    </div>
                    <h2>{data[display].title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: data[display].content }} />
                </div>}
            </div>
        </section>

    return <section className={styles["services-teaser-section"]}>
        <div className={styles["services-teaser-section-main"]}>
            <div>
                <h2>Vores services</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque similique quidem et.
                </p>
                <div className={styles["services-teaser-section-separator"]} />

                <div className={styles["services-teaser-section-services"]}>
                    {data && data.map((x, index) => {
                        return <div key={"service" + index} className={styles["services-teaser-section-services-service"]}>
                            <i className={x.icon} />
                            <div>
                                <h3>{x.title}</h3>
                                <p>{x.teaser}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>

            <div className={styles["services-teaser-section-image-container"]}>
                <img src="/images/about/1.png" alt="håndværker" />
            </div>
        </div>

        <div className={styles["services-teaser-section-booking"]}>
            <form onSubmit={SubmitBooking}>
                <h3>
                    <span className="orange">Book</span> <br /> service nu
                </h3>
                <input name="name" placeholder="Dit navn" type="text" />
                <input name="email" placeholder="Din email" type="text" />
                <input name="phone" placeholder="Telefon nr." type="tel" />
                <button>SEND</button>
            </form>
            <div className={styles["services-teaser-section-booking-validationmsg"]}>
                {bookingValidationMsg && bookingValidationMsg}
            </div>
        </div>

    </section>
}

export default Services