import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './styles/LidtOmStroem.module.scss'
import urldata from '../urldata.json'

const LidtOmStroem = ({ teaser = false }) => {

    const [data, setData] = useState()

    useEffect(() => {
        fetch(`${urldata.url}/about`)
            .then(res => res.json())
            .then(json => setData(json))
    }, [])

    return <section className={styles["lidtomstroem-section"]}>
        <div>
            <h2 dangerouslySetInnerHTML={{ __html: data && data.title.replace('STRØM', '<span class="orange">STRØM</span></h2>') }}></h2>

            {data && <p dangerouslySetInnerHTML={{ __html: data.teaser }}></p>}

            {teaser ? <div className={styles["lidtomstroem-section-readmore-container"]}>
                <NavLink to={"/om-os"}>LÆS MERE</NavLink>
            </div>
                : <div className={styles["lidtomstroem-section-separator"]} />
            }
        </div>

        {!teaser && <section className={styles["hvemervi-section"]}>
            <div className={styles["hvemervi-section-content"]}>
                <h2>Hvem er vi
                    <div className={`${styles["lidtomstroem-section-separator"]} ${styles["hvemervi-underline"]}`} />
                </h2>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde expedita impedit tenetur harum? Aspernatur nostrum assumenda, facere, eveniet similique rerum adipisci aperiam mollitia numquam ab perspiciatis nesciunt voluptas eligendi pariatur.
                </p>

                <ul className={styles["hvemervi-section-list"]}>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Consectetur adipisicing elit. Veritatis, maiores!</li>
                </ul>

                <div className={styles["hvemervi-section-readmore-container"]}>
                    <NavLink to={"/kontakt"}>KONTAKT OS</NavLink>
                </div>
            </div>

            <div className={styles["hvemervi-section-image-container"]}>
                <img src="/images/about/1.jpg" alt="" />
            </div>
        </section>
        }
    </section>
}

export default LidtOmStroem