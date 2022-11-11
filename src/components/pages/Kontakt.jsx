import { useEffect, useState } from "react"

import styles from "./styles/Kontakt.module.scss"
import urldata from "../../urldata.json"

import SubpageHeader from '../SubpageHeader'
import ContactForm from "../ContactForm"

const Kontakt = () => {

    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(`${urldata.url}/contactinformation`)
            .then(res => res.json())
            .then(json => setData(json))
    }, [])

    return <section className={styles["kontakt-section"]}>

        <SubpageHeader title={"Kontakt os"} />

        <div className={styles["kontakt-section-content"]}>
            <address className={styles["kontakt-contactinfo"]}>
                <div>
                    <i className="glyphicons-location" />
                    <div>
                        <b>Addresse</b>
                        <p>{data && data.address}</p>
                    </div>
                </div>
                <hr />
                {data && <div>
                    <i className="glyphicons-phone" />
                    <div>
                        <b>Telefon</b>
                        <a href={`tel:${data.phone}`}>{data.phone}</a>
                    </div>
                </div>}
                <hr />
                <div>
                    <i className="glyphicons-time" />
                    <div>
                        <b>Email</b>
                        <p>{data && data.email}</p>
                    </div>
                </div>
            </address>

            <ContactForm />

            <div className={styles["kontakt-section-map-container"]} dangerouslySetInnerHTML={{
                __html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d551.9144823363773!2' +
                    'd10.887433999999999!3d56.4047207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464dd5' +
                    'b14f421121%3A0x7de336d6b4d8265c!2sYdesvej%204%2C%208500%20Gren%C3%A5!5e0!3m2!1sda!2sdk!4v1668' +
                    '183080447!5m2!1sda!2sdk" width="400" height="300" style="border:0;" allowfullscreen="" ' +
                    'loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
            }} />
        </div>
    </section>
}

export default Kontakt