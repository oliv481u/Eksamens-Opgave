import { useEffect, useState } from "react"
import SubpageHeader from "../SubpageHeader"

import styles from './styles/Services.module.scss'

import urldata from '../../urldata.json'

const Services = ({ teaser }) => {

    const [data, setData] = useState()
    const [display, setDisplay] = useState(0)

    useEffect(() => {
        fetch(`${urldata.url}/service`)
            .then(res => res.json())
            .then(json => { setData(json) })
    }, [])

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
            <form>
                <h3>
                    <span className="orange">Book</span> <br /> service nu
                </h3>
                <input name="name" type="text" />
                <input name="email" type="text" />
                <input name="phone" type="text" />
                <button>SEND</button>
            </form>
        </div>

    </section>
}

export default Services