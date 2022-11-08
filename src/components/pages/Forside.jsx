import { NavLink } from "react-router-dom"

import styles from './styles/Forside.module.scss'

import Testimonials from "../Testimonials"
import Team from "../Team"

const Forside = () => {
    return <>
        <Slider />
        <section className={styles["forside-section"]}>
            <div>
                <h2>Lidt om <span className="orange">STRØM</span></h2>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum, autem quidem molestiae nostrum ex, voluptate vitae, qui praesentium odit excepturi molestias. Culpa, possimus modi perspiciatis consequatur quas voluptate nesciunt in? Consequatur tempora quas illum ducimus reprehenderit perspiciatis, vero doloribus numquam perferendis repellat dolore velit officia expedita facere nisi similique? Minima!
                </p>
                <div className={styles["forside-section-readmore-container"]}>
                    <NavLink to={"/om-os"}>LÆS MERE</NavLink>
                </div>
            </div>
        </section>
        <section className={styles["forside-section"]}>
            <div>
                <h2>Skal du bruge <span className="orange">hjælp</span> fra <span className="orange">Strøm?</span></h2>
                <p>Lorem ipsum dolor sit amet consectetur</p>
                <div className={styles["forside-section-readmore-container"]}>
                    <NavLink to={"/kontakt"}>KONTAKT OS</NavLink>
                </div>
            </div>
        </section>
        {/* <Services /> */}
        <Testimonials />
        <Team />
        {/* <NyhedsEmbed /> */}
    </>
}

export default Forside

const Slider = () => {
    return <div style={{ height: "500px", backgroundColor: "darkblue" }}>

    </div>
}