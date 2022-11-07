import styles from "./Navbar.module.scss"

const Navbar = () => {
    return <nav className={styles["layout-navbar"]}>
        <ul>
            <li><a href="">FORSIDE</a></li>
            <li><a href="">OM OS</a></li>
            <li><a href="">SERVICE</a></li>
            <li><a href="">FAQ</a></li>
            <li><a href="">NYHEDER</a></li>
            <li><a href="">KONTAKT OS</a></li>
        </ul>

        <input type="text" placeholder="Søg" />
        {/* MISSING SEARCH ICON */}
    </nav>
}

export default Navbar