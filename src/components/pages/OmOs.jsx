import LidtOmStroem from "../LidtOmStroem"
import SubpageHeader from "../SubpageHeader"
import Team from "../Team"
import Testimonials from "../Testimonials"

const OmOs = () => {
    return <section>
        <SubpageHeader title={"Om Os"} />

        <LidtOmStroem />
        <Testimonials />
        <Team />

    </section>
}

export default OmOs