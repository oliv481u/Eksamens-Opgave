import { useEffect, useState } from "react"
import Arkiv from "../Arkiv"
import SubpageHeader from "../SubpageHeader"

import styles from './styles/Nyheder.module.scss'

import urldata from '../../urldata.json'
import { NavLink } from "react-router-dom"

const Nyheder = ({ teaser = false }) => {

    const [news, setNews] = useState()
    const [page, setPage] = useState(1)
    const [perPageCount, setPerPageCount] = useState(4)
    const [totalPageCount, setTotalPageCount] = useState(0)

    useEffect(() => {
        fetch(`${urldata.url}/news`)
            .then(res => res.json())
            .then(json => setNews(json))
    }, [])

    useEffect(() => {
        if (!news)
            return

        setTotalPageCount(Math.ceil(news.length / perPageCount))
    }, [news, page, perPageCount])

    if (!teaser)
        return <section className={styles["nyheder-section"]}>
            <SubpageHeader title={"Nyheder"} />

            <div className={styles["nyheder-section-content"]}>
                <article>
                    <div className={styles["nyheder-section-content-grid"]}>
                        {news && news.slice(perPageCount * (page - 1), perPageCount * page).map((x, index) => {

                            const date = new Date(x.received)
                            const day = date.getDate().toLocaleString('default', { minimumIntegerDigits: 2 })
                            const month = date.toLocaleString('default', { month: 'long', }).slice(0, 3)


                            return <NavLink to={`/nyhed-${x._id}`} key={"nyhed" + index} className={styles["nyheder-section-content-nyhed"]}>
                                <div className={styles["nyhed-image-container"]}>
                                    <img src={`/images/news/${x.image}`} alt="" draggable={false} />
                                    <div className={styles["nyhed-date"]}>
                                        <p className={styles["nyhed-date-day"]}>{day}</p>
                                        <p className={styles["nyhed-date-month"]}>{month}</p>
                                    </div>
                                </div>
                                <div className={styles["nyhed-content"]}>
                                    <div>
                                        <h2>{x.title}</h2>
                                        <p>{x.content.substring(0, x.content.indexOf(" ", 100))}...</p>
                                    </div>

                                    <div className={styles["nyhed-content-comment"]}>
                                        <hr />
                                        <p>
                                            <i className="fa-comment" />
                                            {x.comments.length} Kommentar{x.comments.length === 1 ? "" : "er"}
                                        </p>
                                    </div>
                                </div>
                            </NavLink>
                        })}
                    </div>
                    <div className={styles["nyheder-section-pagination"]}>
                        <button onClick={() => setPage(prevValue => Math.max(prevValue - 1, 1))}>prev</button>
                        {Array.from(Array(totalPageCount)).map((x, index) =>
                            <button key={"page" + index} onClick={() => setPage(index + 1)} className={page === index + 1 ? styles.active : ""}>{index + 1}</button>
                        )}
                        <button onClick={() => setPage(prevValue => Math.min(prevValue + 1, totalPageCount))}>next</button>
                        <select className={styles["nyheder-section-pagination-perpagecount"]} onChange={e => setPerPageCount(parseInt(e.target.options[e.target.selectedIndex].value))}>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                        </select>
                    </div>
                </article>
                <Arkiv />
            </div>

        </section>

    return <section className={styles["nyheder-section"]}>
        <div className={`${styles["nyheder-section-content"]} ${styles["nyheder-teaser"]}`}>
            <h2 className={styles["nyheder-section-content-title"]}>Sidste <span className="orange">nyt</span></h2>
            <p className={styles["nyheder-section-content-text"]}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae repudiandae iure delectus amet!
            </p>
            <div className={styles["nyheder-section-separator"]}></div>
            <article>
                <div className={`${styles["nyheder-section-content-grid"]} ${styles["nyheder-teaser"]}`}>
                    {news && news.slice(0, 3).map((x, index) => {

                        const date = new Date(x.received)
                        const day = date.getDate().toLocaleString('default', { minimumIntegerDigits: 2 })
                        const month = date.toLocaleString('default', { month: 'long', }).slice(0, 3)

                        return <NavLink to={`/nyhed-${x._id}`} key={"nyhed" + index} className={styles["nyheder-section-content-nyhed"]}>
                            <div className={styles["nyhed-image-container"]}>
                                <img src={`/images/news/${x.image}`} alt="" draggable={false} />
                                <div className={styles["nyhed-date"]}>
                                    <p className={styles["nyhed-date-day"]}>{day}</p>
                                    <p className={styles["nyhed-date-month"]}>{month}</p>
                                </div>
                            </div>
                            <div className={styles["nyhed-content"]}>
                                <div>
                                    <h2>{x.title}</h2>
                                    <p>{x.content.substring(0, x.content.indexOf(" ", 100))}...</p>
                                </div>
                            </div>
                        </NavLink>
                    })}
                    <NavLink to={"/nyheder"} className={styles["nyheder-section-readmore"]}>FLERE NYHEDER ...</NavLink>
                </div>
            </article>
        </div>
    </section>
}

export default Nyheder