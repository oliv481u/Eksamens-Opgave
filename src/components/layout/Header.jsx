import { useEffect, useState } from "react"

import styles from "./Header.module.scss"
import urldata from "../../urldata.json"

const Header = () => {

    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(`${urldata.url}/contactinformation`)
            .then(res => res.json())
            .then(json => setData(json))
    }, [])

    return <header className={styles["layout-header"]}>
        <div className={styles["layout-header-content"]}>
            <div className={styles["layout-header-logo-container"]}>
                <img src="images/logo/logo.png" alt="" />
            </div>

        <address className={styles["layout-header-contactinfo"]}>
            {data && data.address}
            {data && data.openinghours}
            {data && data.phone}
        </address>
        </div>
    </header>
}

export default Header