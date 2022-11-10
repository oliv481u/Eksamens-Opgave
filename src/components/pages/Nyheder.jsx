import { useEffect, useState } from "react"
import Arkiv from "../Arkiv"
import SubpageHeader from "../SubpageHeader"

import styles from './styles/Nyheder.module.scss'

import urldata from '../../urldata.json'
import { NavLink } from "react-router-dom"

const Nyheder = ({ teaser = false }) => {

    const [news, setNews] = useState()

    useEffect(() => {
        fetch(`${urldata.url}/news`)
            .then(res => res.json())
            .then(json => setNews(json.slice(-4)))
    }, [])

    if (!teaser)
        return <section className={styles["nyheder-section"]}>
            <SubpageHeader title={"Nyheder"} />

            <div className={styles["nyheder-section-content"]}>
                <article>
                    <div className={styles["nyheder-section-content-grid"]}>
                        {news && news.map((x, index) =>
                            <NavLink to={"/"} key={"nyhed" + index} className={styles["nyheder-section-content-nyhed"]}>
                                <div className={styles["nyhed-image-container"]}>
                                    <img src={`/images/news/${x.image}`} alt="" draggable={false} />
                                    <div></div>
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
                        )}
                    </div>
                    <div className={styles["nyheder-section-pagination"]}>
                        <button>prev</button>
                        <button className={styles.active}>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>next</button>
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
                    {news && news.slice(0, 3).map((x, index) =>
                        <NavLink to={"/"} key={"nyhed" + index} className={styles["nyheder-section-content-nyhed"]}>
                            <div className={styles["nyhed-image-container"]}>
                                <img src={`/images/news/${x.image}`} alt="" draggable={false} />
                                <div></div>
                            </div>
                            <div className={styles["nyhed-content"]}>
                                <div>
                                    <h2>{x.title}</h2>
                                    <p>{x.content.substring(0, x.content.indexOf(" ", 100))}...</p>
                                </div>
                            </div>
                        </NavLink>
                    )}
                    <NavLink to={"/nyheder"} className={styles["nyheder-section-readmore"]}>FLERE NYHEDER ...</NavLink>
                </div>
            </article>
        </div>
    </section>
}

export default Nyheder