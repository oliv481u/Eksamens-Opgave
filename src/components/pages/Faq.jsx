import { useEffect, useState } from "react"
import Accordion from "../Accordion"
import SubpageHeader from "../SubpageHeader"
import urldata from '../../urldata.json'

const Faq = () => {

    const [data, setData] = useState()
    const [currentAccordion, setCurrentAccordion] = useState(0)

    useEffect(() => {
        fetch(`${urldata.url}/faq`)
            .then(res => res.json())
            .then(json => setData(json))
    }, [])

    return <section>
        <SubpageHeader title={"FAQ - Ofte stillede spørgsmål"} />

        {data && data.map((x, index) =>
            <Accordion key={"accordion" + index} title={x.question} open={index === currentAccordion} onClick={() => setCurrentAccordion(index)}>
                {x.answer}
            </Accordion>
        )}

    </section>
}

export default Faq