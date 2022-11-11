import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SubpageHeader from "../SubpageHeader"

import styles from './styles/UdvalgtNyhed.module.scss'

import urldata from '../../urldata.json'
import Arkiv from "../Arkiv"

const UdvalgtNyhed = () => {

    const { nyhedId } = useParams()
    const [data, setData] = useState()


    useEffect(() => {
        fetch(`${urldata.url}/news/${nyhedId}`)
            .then(res => res.json())
            .then(json => setData(json))
    }, [nyhedId])

    if (!data) return

    const date = new Date(data.received)
    const day = date.getDate().toLocaleString('default', { minimumIntegerDigits: 2 })
    const month = date.toLocaleString('default', { month: 'long', }).slice(0, 3)

    return <section className={styles["udvalgtnyhed"]}>
        <SubpageHeader title={data.title} />

        <div className={styles["udvalgtnyhed-content"]}>
            <div className={styles["udvalgtnyhed-content-main"]}>
                <article>
                    <div className={styles["nyhed-image-container"]}>
                        <img src={`/images/news/${data.image}`} alt="" />
                        <div className={styles["nyhed-date"]}>
                            <p className={styles["nyhed-date-day"]}>{day}</p>
                            <p className={styles["nyhed-date-month"]}>{month}</p>
                        </div>
                    </div>
                    <div className={styles["nyhed-content-text"]}>
                        <p>
                            <i className="fa-comment" />
                            {data.comments.length}
                        </p>
                        <h2>{data.title}</h2>
                        <hr />
                        <p>
                            {data.content}
                        </p>

                    </div>
                </article>

                <h3>Kommentarer ({data.comments.length})</h3>
                {data.comments.map((x, index) => {

                    const date = new Date(x.received)
                    const formattedDate = `${date.getDate().toLocaleString('default', { minimumIntegerDigits: 2 })} ${date.toLocaleString('default', { month: 'long', }).slice(0, 3)}, ${date.getFullYear()}`

                    return <div key={"comment" + index} className={styles["udvalgtnyhed-comment"]}>
                        <b>{x.name}</b>
                        <p>
                            <i className="fa-calender" />
                            {formattedDate}
                        </p>
                        <p>{x.comment}</p>
                    </div>
                })}

                <hr />

                <form>
                    <h3>Skriv en kommentar</h3>

                    <input type="text" name="name" placeholder="Navn" />
                    <input type="text" name="name" placeholder="Email" />
                    <textarea name="comment" placeholder="Kommentar" id="" cols="30" rows="10"></textarea>

                    <button>KOMMENTER</button>
                </form>

            </div>

            <Arkiv random />
        </div>
    </section>
}

export default UdvalgtNyhed