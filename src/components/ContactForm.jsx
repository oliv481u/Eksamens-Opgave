import { useState } from 'react'

import styles from './styles/ContactForm.module.scss'

import urldata from '../urldata.json'

const ContactForm = () => {

    const [formValidationMsg, setFormValidationMsg] = useState()

    function SubmitContactform(e) {
        e.preventDefault()

        const formData = new FormData(e.target)

        if (formData.get("name") === "") {
            setFormValidationMsg(<p style={{ color: "red" }}>Indtast dit navn</p>)
            return
        }
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.get("email"))) {
            setFormValidationMsg(<p style={{ color: "red" }}>Indtast en gyldig email</p>)
            return
        }
        else if (!/^[0-9]+$/g.test(formData.get("phone"))) {
            setFormValidationMsg(<p style={{ color: "red" }}>Indtast dit mobilnummer</p>)
            return
        }
        else if (formData.get("message") === "") {
            setFormValidationMsg(<p style={{ color: "red" }}>Indtast en besked</p>)
            return
        }

        fetch(`${urldata.url}/contact`, {
            method: "POST",
            body: formData
        })
            .then(res => {
                if (res.ok) {
                    setFormValidationMsg(<p style={{ color: "lime" }}>Besked sendt!</p>)
                }
            })
    }

    return <div className={styles["contactform"]}>
        <h2>Kontakt os</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quaerat beatae quo eos eligendi voluptatem libero illum nulla consequuntur!</p>
        <form onSubmit={SubmitContactform} className={styles["contactform-form"]}>
            <div className={styles["contactform-form-information"]}>
                <input type="text" name="name" placeholder="Dit Navn" />
                <input type="text" name="email" placeholder="Din Email" />
                <input type="tel" name="phone" placeholder="Telefon nr." />
            </div>
            <textarea name="message" cols="30" rows="10" placeholder="Din besked.."></textarea>
            <button>SEND BESKED</button>
            <div className={styles["contactform-validationmsg"]}>
                {formValidationMsg}
            </div>
        </form>
    </div>
}

export default ContactForm