import { useEffect, useState } from "react"

import urldata from "../../urldata.json"
import styles from "./Footer.module.scss"

const Footer = () => {

    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(`${urldata.url}/contactinformation`)
            .then(res => res.json())
            .then(json => setData(json))
    }, [])

    const [emailSignupResponse, setEmailSignupResponse] = useState()

    function NewsletterSignup(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const dataArray = [...formData]
        const data = Object.fromEntries(dataArray)

        //Email validation regex
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(data.email)) {
            setEmailSignupResponse(<sub style={{ color: "red" }}>Indtast en email!</sub>)
            return;
        }

        fetch(`${urldata.url}/newssubscription`, {
            method: 'POST',
            body: formData
        })
            .then(res => {
                if (res.ok) {
                    setEmailSignupResponse(<sub style={{ color: "lime" }}>Tilmeldt!</sub>)
                } else {
                    res.text().then(msg => {
                        if (msg.includes("duplicate"))
                            setEmailSignupResponse(<sub style={{ color: "red" }}>Denne email er allerede tilmeldt!</sub>)
                        else {
                            setEmailSignupResponse(<sub style={{ color: "red" }}>Indtast en email!</sub>)
                        }
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }

    return <footer className={styles["layout-footer"]}>
        <div className={styles["layout-footer-main-content"]}>
            <div className={styles["footer-content-garanti"]}>
                <div className={styles["layout-footer-logo-container"]}>
                    <img src="images/logo/logo.png" alt="" />
                </div>
                <p>
                    Som medlem af Elinstallatørenes Landsorganisation, ELFO, er vi tilsluttet et ankernævn og en garantiordning.
                </p>
            </div>
            <div className={styles["footer-content-links"]}>
                <p className={styles.title}>Link</p>
                <ul>
                    <li><a href="/faq">FAQ</a></li>
                    <li><a href="/om-os">Om os</a></li>
                    <li><a href="/kontakt">Kontakt os</a></li>
                    <li><a href="/services">Services</a></li>
                </ul>
            </div>
            <address className={styles["footer-content-kontakt"]}>
                <p className={styles.title}>Kontakt os</p>
                {data && <>
                    <p><b>Adresse:</b> {data.address}</p>
                    <p><b>Telefon:</b> <a href={`tel: ${data.phone}`}>{data.phone}</a></p>
                    <p><b>Email:</b> <a href={`mailto: ${data.email}`}>{data.email}</a></p>
                </>}
            </address>
            <div className={styles["footer-content-nyhedsbrev"]}>
                <p className={styles.title}>Nyhedsbrev</p>
                <p>Tilmeld dig vores nyhedsbrev her</p>
                <form onSubmit={NewsletterSignup}>
                    <input name="email" type="text" placeholder="Din Email" />
                    {emailSignupResponse && emailSignupResponse}
                    <button>TILMELD</button>
                </form>
            </div>
        </div>

        <div>
            <hr className={styles["layout-footer-separator"]} />
            <div className={styles["layout-footer-content-bottom"]}>
                <p><span>Strøm</span> &copy; 2022 All Rights Reserved</p>
                <div className={styles["layout-footer-content-bottom-SOME-container"]}>
                    {data && data.some.map((x, index) => {
                        return <a href={x.link} key={"some" + index}>
                            <i className={x.icon} alt="" />
                        </a>
                    })}
                </div>
            </div>
        </div>
    </footer>
}

export default Footer