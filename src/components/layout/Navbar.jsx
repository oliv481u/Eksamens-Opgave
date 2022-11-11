import { useEffect, useRef, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import styles from "./styles/Navbar.module.scss"

const Navbar = () => {

    const [scroll, setScroll] = useState()
    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    const navRef = useRef()

    useEffect(() => {
        document.addEventListener('scroll', () => setScroll(window.scrollY))

        return () => document.removeEventListener('scroll', () => setScroll(window.scrollY))
    }, [])

    return <>
        <nav ref={navRef} className={`${styles["layout-navbar"]} ${navRef.current && scroll > navRef.current.offsetHeight + 80 ? styles["sticky"] : ""}`}>

            <ul className={styles["layout-navbar-pc"]}>
                <li><NavbarLink to="/">FORSIDE</NavbarLink></li>
                <li><NavbarLink to="/om-os">OM OS</NavbarLink></li>
                <li><NavbarLink to="/services">SERVICE</NavbarLink></li>
                <li><NavbarLink to="/faq">FAQ</NavbarLink></li>
                <li><NavbarLink to="/nyheder">NYHEDER</NavbarLink></li>
                <li><NavbarLink to="/kontakt">KONTAKT OS</NavbarLink></li>
            </ul>

            <div className={styles["layout-navbar-mobile"]} onClick={() => setMobileNavOpen(true)}>
                <img src="/images/icon/submenu-icon.png" alt="burger menu" />
            </div>

            <div className={styles["layout-navbar-search-container"]}>
                <input type="text" placeholder="Søg" />
                <button className="glyphicons-search"></button>
            </div>
        </nav>

        <ul className={`${styles["layout-mobile-navigation"]} ${mobileNavOpen ? styles.active : ""}`}>
            <button aria-label="return" onClick={() => setMobileNavOpen(false)}>
                <img src="/images/icon/icon-cross.png" alt="cross" />
            </button>

            <li onClick={() => setMobileNavOpen(false)}><NavbarLink to="/">FORSIDE</NavbarLink></li>
            <li onClick={() => setMobileNavOpen(false)}><NavbarLink to="/om-os">OM OS</NavbarLink></li>
            <li onClick={() => setMobileNavOpen(false)}><NavbarLink to="/services">SERVICE</NavbarLink></li>
            <li onClick={() => setMobileNavOpen(false)}><NavbarLink to="/faq">FAQ</NavbarLink></li>
            <li onClick={() => setMobileNavOpen(false)}><NavbarLink to="/nyheder">NYHEDER</NavbarLink></li>
            <li onClick={() => setMobileNavOpen(false)}><NavbarLink to="/kontakt">KONTAKT OS</NavbarLink></li>
        </ul>
    </>
}

const NavbarLink = ({ to, children }) =>
    <NavLink to={to} className={({ isActive }) => (isActive ? styles.activeLink : '')}>{children}</NavLink>

export default Navbar