import { NavLink } from 'react-router-dom'
import styles from './styles/HjaelpFraStroem.module.scss'

const HjaelpFraStroem = () => {
    return <section className={styles["hjaelpfrastroem-section"]}>
        <div>
            <h2>Skal du bruge <span className="orange">hjælp</span> fra <span className="orange">Strøm?</span></h2>
            <p>Lorem ipsum dolor sit amet consectetur</p>
            <div className={styles["hjaelpfrastroem-section-readmore-container"]}>
                <NavLink to={"/kontakt"}>KONTAKT OS</NavLink>
            </div>
        </div>
    </section>
}

export default HjaelpFraStroem