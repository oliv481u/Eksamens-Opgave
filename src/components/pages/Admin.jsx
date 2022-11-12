import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'

import SubpageHeader from '../SubpageHeader'

import styles from './styles/Admin.module.scss'
import React, { useEffect, useRef, useState } from 'react'

import urldata from '../../urldata.json'

const Admin = () => {
    const [newsData, setNewsData] = useState()
    const [bookingData, setBookingData] = useState()

    useEffect(() => {
        fetch(`${urldata.url}/news`)
            .then(res => res.json())
            .then(json => setNewsData(json))

        fetch(`${urldata.url}/booking/admin`)
            .then(res => res.json())
            .then(json => setBookingData(json))
    }, [])

    return <>
        <SubpageHeader title={"Admin"} />

        <section className={styles["admin-section"]}>
            <div className={styles["admin-editable-container"]}>
                <h2>Om os</h2>
                <div>
                    <EditableAbout />
                </div>
            </div>

            <div className={styles["admin-editable-container"]}>
                <h2>Booking</h2>
                {bookingData && bookingData.map((x, index) => (
                    <EditableBooking key={"news" + index} _id={x._id} name={x.name} email={x.email} phone={x.phone} note={x.note} accept={x.accept} />
                ))}
            </div>

            <div className={styles["admin-editable-container"]}>
                <h2>Nyheder</h2>
                {newsData && newsData.map((x, index) => (
                    <EditableNews key={"news" + index} _id={x._id} title={x.title} content={x.content} image={x.image} />
                ))}
                <EditableNews />
            </div>
        </section>
    </>
}

const EditableAbout = () => {
    const mainRef = useRef()

    const [titleData, setTitleData] = useState()
    const [contentData, setContentData] = useState()
    const [teaserData, setTeaserData] = useState()

    useEffect(() => {
        fetch(`${urldata.url}/about`)
            .then(res => res.json())
            .then(json => {
                setTitleData(json.title)
                setContentData(json.content)
                setTeaserData(json.teaser)
            })
    }, [])

    function Update(e) {
        e.preventDefault()

        const formData = new FormData(e.target)

        fetch(urldata.url + "/about/admin", {
            method: 'PUT',
            body: formData
        })
    }

    const EditableValue = ({ name, children }) => {
        const { quill, quillRef } = useQuill({ readOnly: false })
        const [value, setValue] = useState("")
        const [oldValue, setOldValue] = useState()
        const [editing, setEditing] = useState(false)

        useEffect(() => {
            if (!quill) return

            quill.root.innerHTML = children
            setValue(quill.getText())

            quill.on('text-change', (e) => {
                setValue(quill.getText())
            })
        }, [quill, children])

        function Edit(e) {
            setEditing(e.target)
            setOldValue(value)
        }

        function Save(e) {
            setEditing(null)
            setOldValue(null)
        }

        function Cancel(e) {
            if (!window.confirm("Vil du kassere dine ændringer?")) return
            setValue(oldValue)
            setEditing(null)
        }

        return <>
            <b>{name + ":"}</b>
            <p className={`${editing ? styles.inactive : ""}`} name={name} onClick={Edit}>{value}</p>
            <input type="hidden" name={name} value={value} />


            <div className={`${styles["admin-richtexteditor"]} ${editing ? styles.active : ""}`}>
                <div ref={quillRef}></div>
                <button type='button' onClick={Cancel}>Annuller</button>
                <button type='button' onClick={Save}>Gem</button>
            </div>
        </>
    }

    return <form ref={mainRef} onSubmit={Update}>
        <EditableValue name={"title"}>{titleData}</EditableValue>
        <EditableValue name={"teaser"}>{teaserData}</EditableValue>
        <EditableValue name={"content"}>{contentData}</EditableValue>

        <button>Opdater</button>
    </form>
}

const EditableBooking = ({ _id, name, email, phone, note, accept }) => {

    const mainRef = useRef()

    const [deleted, setDeleted] = useState(false)
    if (deleted) return

    function PatchAccept(e) {
        e.preventDefault()

        const formData = new FormData(e.target)

        formData.set("accept", formData.get("accept") === "on")

        fetch(urldata.url + "/booking/accept/admin/" + _id, {
            method: 'PATCH',
            body: formData
        })
    }

    function PatchNote(e) {
        e.preventDefault()

        const formData = new FormData(e.target)

        fetch(urldata.url + "/booking/note/admin/" + _id, {
            method: 'PATCH',
            body: formData
        })
    }

    function Delete() {
        if (!window.confirm("Er du sikker på at du vil slette: " + name)) return

        fetch(urldata.url + "/booking/admin/" + _id, {
            method: 'DELETE'
        })
            .then(res => setDeleted(res.ok))
    }

    const EditableValue = ({ name, children }) => {
        const { quill, quillRef } = useQuill({ readOnly: false })
        const [value, setValue] = useState("")
        const [oldValue, setOldValue] = useState()
        const [editing, setEditing] = useState(false)

        useEffect(() => {
            if (!quill) return

            quill.root.innerHTML = children
            setValue(quill.getText())

            quill.on('text-change', (e) => {
                setValue(quill.getText())
            })
        }, [quill, children])

        function Edit(e) {
            setEditing(e.target)
            setOldValue(value)
        }

        function Save(e) {
            setEditing(null)
            setOldValue(null)
        }

        function Cancel(e) {
            if (!window.confirm("Vil du kassere dine ændringer?")) return
            setValue(oldValue)
            setEditing(null)
        }

        return <>
            <b>{name + ":"}</b>
            <p className={`${editing ? styles.inactive : ""}`} name={name} onClick={Edit}>{value}</p>
            <input type="hidden" name={name} value={value} />

            <div className={`${styles["admin-richtexteditor"]} ${editing ? styles.active : ""}`}>
                <div ref={quillRef}></div>
                <button type='button' onClick={Cancel}>Annuller</button>
                <button type='button' onClick={Save}>Gem</button>
            </div>
        </>
    }

    return <form ref={mainRef} onSubmit={(e) => { PatchNote(e); PatchAccept(e) }}>
        <b>{"name:"}</b>
        <p>{name}</p>
        <b>{"email:"}</b>
        <p>{email}</p>
        <b>{"phone:"}</b>
        <p>{phone}</p>
        <EditableValue name={"note"}>{note || "ingen note"}</EditableValue>
        <div>
            <label htmlFor={_id}>Godkendt:</label>
            <input name='accept' id={_id} type={"checkbox"} defaultChecked={accept} />
        </div>

        <div>
            <button>{"Opdater"}</button>
            {_id && <button type='button' onClick={Delete}>Delete</button>}
        </div>
    </form>
}

const EditableNews = ({ _id, title, content, image }) => {

    const mainRef = useRef()

    const [deleted, setDeleted] = useState(false)
    if (deleted) return

    function Create(e) {
        e.preventDefault()

        const formData = new FormData(e.target)

        fetch(urldata.url + "/news/admin", {
            method: 'POST',
            body: formData
        })
            .then(res => { if (res.ok) document.location.reload() })
    }

    function Update(e) {
        e.preventDefault()

        const formData = new FormData(e.target)

        fetch(urldata.url + "/news/admin/" + _id, {
            method: 'PUT',
            body: formData
        })
    }

    function Delete() {
        if (!window.confirm("Er du sikker på at du vil slette: " + title)) return

        fetch(urldata.url + "/news/admin/" + _id, {
            method: 'DELETE'
        })
            .then(res => setDeleted(res.ok))
    }

    const EditableValue = ({ name, children }) => {
        const { quill, quillRef } = useQuill({ readOnly: false })
        const [value, setValue] = useState("")
        const [oldValue, setOldValue] = useState()
        const [editing, setEditing] = useState(false)

        useEffect(() => {
            if (!quill) return

            quill.root.innerHTML = children
            setValue(quill.getText())

            quill.on('text-change', (e) => {
                setValue(quill.getText())
            })
        }, [quill, children])

        function Edit(e) {
            setEditing(e.target)
            setOldValue(value)
        }

        function Save(e) {
            setEditing(null)
            setOldValue(null)
        }

        function Cancel(e) {
            if (!window.confirm("Vil du kassere dine ændringer?")) return
            setValue(oldValue)
            setEditing(null)
        }

        return <>
            <b>{name + ":"}</b>
            <p className={`${editing ? styles.inactive : ""}`} name={name} onClick={Edit}>{value}</p>
            <input type="hidden" name={name} value={value} />

            <div className={`${styles["admin-richtexteditor"]} ${editing ? styles.active : ""}`}>
                <div ref={quillRef}></div>
                <button type='button' onClick={Cancel}>Annuller</button>
                <button type='button' onClick={Save}>Gem</button>
            </div>
        </>
    }

    return <form ref={mainRef} onSubmit={(e) => _id ? Update(e) : Create(e)}>
        <EditableValue name={"title"}>{title || "Ny titel"}</EditableValue>
        <EditableValue name={"content"}>{content || "Ny inhold"}</EditableValue>
        <label htmlFor={_id || "new"}>{image || "Nyt billede"}</label>
        <input type={'file'} id={_id || "new"} name={"image"} />

        <div>
            <button>{_id ? "Opdater" : "Opret"}</button>
            {_id && <button type='button' onClick={Delete}>Delete</button>}
        </div>
    </form>
}

export default Admin