import { useEffect, useState } from "react"

import styles from "./Header.module.scss"
import urldata from "../../urldata.json"

const Header = () => {

    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(`${urldata.url}/contactinformation`)
            .then(res => res.json())
            .then(json => setData(json.address))
    }, [])

    return <header className={styles["layout-header"]}>
        <div className={styles["layout-header-content"]}>
            <div className={styles["layout-header-logo-container"]}>
                <img src="images/logo/logo.png" alt="" />
            </div>

            {data && console.log(data)}
        </div>
    </header>
}

export default Header