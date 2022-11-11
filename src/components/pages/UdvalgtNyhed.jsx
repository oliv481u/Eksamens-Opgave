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

    return <section className={styles["udvalgtnyhed"]}>
        <SubpageHeader title={data.title} />

        <div className={styles["udvalgtnyhed-content"]}>
            <article>
                <div>
                    <img src={`/images/news/${data.image}`} alt="" />
                </div>
                <div>
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

                <h3>Kommentarer ({data.comments.length})</h3>
                {data.comments.map((x, index) => {

                    const date = new Date(x.received)
                    const formattedDate = `${date.getDate().toLocaleString('default', { minimumIntegerDigits: 2 })} ${date.toLocaleString('default', { month: 'long', }).slice(0, 3)}, ${date.getFullYear()}`

                    return <div key={"comment" + index} className={styles["udvalgtnyhed-commment"]}>
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

            </article>

            <Arkiv random />
        </div>
    </section>
}

export default UdvalgtNyhed