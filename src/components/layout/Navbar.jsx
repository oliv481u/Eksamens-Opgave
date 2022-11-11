import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import styles from "./styles/Navbar.module.scss"

const Navbar = () => {

    const [scroll, setScroll] = useState()
    const navRef = useRef()

    useEffect(() => {
        document.addEventListener('scroll', () => setScroll(window.scrollY))

        return () => document.removeEventListener('scroll', () => setScroll(window.scrollY))
    }, [])

    return <nav ref={navRef} className={`${styles["layout-navbar"]} ${navRef.current && scroll > navRef.current.offsetHeight + 80 ? styles["sticky"] : ""}`}>
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
            <button className="glyphicons-search"></button>
        </div>
    </nav>
}

const NavbarLink = ({ to, children }) =>
    <NavLink to={to} className={({ isActive }) => (isActive ? styles.activeLink : '')}>{children}</NavLink>

export default Navbar