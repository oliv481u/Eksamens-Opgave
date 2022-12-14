import { Fragment, useEffect, useState } from "react"

import styles from './styles/Arkiv.module.scss'

import urldata from '../urldata.json'
import { NavLink } from "react-router-dom"

const Arkiv = ({ random = false }) => {

    const [news, setNews] = useState()

    useEffect(() => {
        fetch(`${urldata.url}/news`)
            .then(res => res.json())
            .then(json => setNews(() => {
                if (!random)
                    return json.slice(-7, -3)
                else
                    return json.sort(() => (Math.random() > .5) ? 1 : -1).slice(0, 4)
            }
            ))
    }, [random])

    return <section className={styles["arkiv-section"]}>
        <h2>Arkiv</h2>
        <div>
            {news && news.map((x, index) => {
                const date = new Date(x.received)
                const formattedDate = `${date.getDate().toLocaleString('default', { minimumIntegerDigits: 2 })} ${date.toLocaleString('default', { month: 'long', }).slice(0, 3)}, ${date.getFullYear()}`

                return <Fragment key={"arkiv-nyhed" + index}>
                    <NavLink to={`/nyhed-${x._id}`} className={styles["arkiv-section-nyhed"]}>
                        <div className={styles["arkiv-section-nyhed-image-container"]}>
                            <img src={`/images/news/${x.image}`} alt="" />
                        </div>
                        <div className={styles["arkiv-section-nyhed-content"]}>
                            <h3>{x.title}</h3>
                            <p><i className="fa-calender" />{formattedDate}</p>
                        </div>
                    </NavLink>
                    <hr />
                </Fragment>
            })}
        </div>
    </section>
}

export default Arkiv