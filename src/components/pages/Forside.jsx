import Slider from "../Slider"
import LidtOmStroem from "../LidtOmStroem"
import HjaelpFraStroem from "../HjaelpFraStroem"
import Testimonials from "../Testimonials"
import Team from "../Team"
import Services from "./Services"
import Nyheder from "./Nyheder"


const Forside = () => {
    return <>
        <Slider />
        <LidtOmStroem teaser />
        <HjaelpFraStroem />
        <Services teaser />
        <Testimonials />
        <Team />
        <Nyheder teaser />
    </>
}

export default Forside