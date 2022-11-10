import LidtOmStroem from "../LidtOmStroem"
import HjaelpFraStroem from "../HjaelpFraStroem"
import Testimonials from "../Testimonials"
import Team from "../Team"
import Services from "./Services"


const Forside = () => {
    return <>
        <Slider />
        <LidtOmStroem teaser />
        <HjaelpFraStroem />
        <Services teaser />
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