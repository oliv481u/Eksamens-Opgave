import styles from "./Navbar.module.scss"

const Navbar = () => {
    return <nav className={styles["layout-navbar"]}>
        <ul>
            <li><a href="/forside">FORSIDE</a></li>
            <li><a href="/om-os">OM OS</a></li>
            <li><a href="/services">SERVICE</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/nyheder">NYHEDER</a></li>
            <li><a href="/kontakt-os">KONTAKT OS</a></li>
        </ul>

        <input type="text" placeholder="Søg" />
        {/* MISSING SEARCH ICON */}
    </nav>
}

export default Navbar