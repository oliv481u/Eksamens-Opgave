import styles from "./Footer.module.scss"

const Footer = () => {

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
                    <li><a href="">FAQ</a></li>
                    <li><a href="">Om os</a></li>
                    <li><a href="">Kontakt os</a></li>
                    <li><a href="">Services</a></li>
                </ul>
            </div>
            <address className={styles["footer-content-kontakt"]}>
                <p className={styles.title}>Kontakt os</p>
            </address>
            <div className={styles["footer-content-nyhedsbrev"]}>
                <p className={styles.title}>Nyhedsbrev</p>
                <p>Tilmeld dig vores nyhedsbrev her</p>
                <form>
                    <input type="text" placeholder="Din Email" />
                    <button>TILMELD</button>
                </form>
            </div>
        </div>

        <div>
            <hr className={styles["layout-footer-separator"]} />
            <div className={styles["layout-footer-content-bottom"]}>
                <p><span>Strøm</span> &copy; 2022 All Rights Reserved</p>
                <div className={styles["layout-footer-content-bottom-SOME-container"]}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    {/* ICONS MISSING */}
                </div>
            </div>
        </div>
    </footer >
}

export default Footer