import { useEffect, useState } from 'react'
import styles from './styles/Team.module.scss'
import urldata from '../urldata.json'

const Team = () => {

    const [teamMembers, setTeamMembers] = useState()

    useEffect(() => {
        fetch(`${urldata.url}/team`)
            .then(res => res.json())
            .then(json => setTeamMembers(json))
    }, [])

    return <section className={styles["team-section"]}>
        <h2>Vores <span className="orange">team</span></h2>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit distinctio inventore minus sapiente
        </p>
        <div className={styles["team-section-separator"]} />
        <div className={styles["team-members-section"]}>
            {teamMembers && teamMembers.map((x, index) =>
                <TeamMember key={"teamMember" + index} name={x.name} title={x.title} img={x.image} />
            )}
        </div>
    </section>
}

const TeamMember = ({ name, title, img }) => {
    return <div className={styles["team-member"]}>
        <div className={styles["team-member-popup-shadow"]} />
        <img src={`/images/team/${img}`} alt="" />
        <div className={styles["team-member-popup"]}>
            <p>{name}</p>
            <sub>{title}</sub>
            <div className={styles["team-member-popup-some"]}>
                <a href='/' alt="" ><i className="fa-facebook"></i></a>
                <a href='/' alt="" ><i className="fa-twitter"></i></a>
                <a href='/' alt="" ><i className="fa-linkedin"></i></a>
                <a href='/' alt="" ><i className="fa-pinterest"></i></a>
            </div>
        </div>
    </div>
}

export default Team