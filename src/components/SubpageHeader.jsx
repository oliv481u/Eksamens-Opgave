import { Fragment } from "react"
import { NavLink, useLocation } from "react-router-dom"

import styles from './styles/SubpageHeader.module.scss'

const SubpageHeader = ({ title }) => {

    const location = useLocation()

    const breadcrumbElement = () => {
        const breadcrumbs = location.pathname.split('/')

        function GetAddressByIndex(index) {
            let path = ""

            for (let i = 1; i < Math.min(index, breadcrumbs.length); i++) {
                path = path.concat("/", breadcrumbs[i])
            }

            return path
        }

        return <nav>{
            breadcrumbs.map((x, index) => {
                if (x === "")
                    return <NavLink key={"breadcrumb-" + index} to={"/"}>Forside</NavLink>

                return <Fragment key={"breadcrumb-" + index}> &gt; <NavLink to={GetAddressByIndex(index + 1)}>{x}</NavLink></Fragment>
            })
        }</nav>
    }

    return <section className={styles["subpageheader-section"]}>
        <div>
            <h1>{title}</h1>

            {breadcrumbElement()}
        </div>
    </section >
}

export default SubpageHeader