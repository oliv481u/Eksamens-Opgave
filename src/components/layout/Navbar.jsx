import { NavLink } from "react-router-dom"
import styles from "./Navbar.module.scss"

const Navbar = () => {
    return <nav className={styles["layout-navbar"]}>
        <ul>
            <li><NavbarLink to="/">FORSIDE</NavbarLink></li>
            <li><NavbarLink to="/om-os">OM OS</NavbarLink></li>
            <li><NavbarLink to="/services">SERVICE</NavbarLink></li>
            <li><NavbarLink to="/faq">FAQ</NavbarLink></li>
            <li><NavbarLink to="/nyheder">NYHEDER</NavbarLink></li>
            <li><NavbarLink to="/kontakt">KONTAKT OS</NavbarLink></li>
        </ul>

        <div className={styles["layout-navbar-search-container"]}>
            <input type="text" placeholder="Søg" />
            <button class="glyphicons-search"></button>
        </div>
    </nav>
}

const NavbarLink = ({ to, children }) =>
    <NavLink to={to} className={({ isActive }) => (isActive ? styles.activeLink : '')}>{children}</NavLink>

export default Navbar