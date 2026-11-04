import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface Props {
        key: number;
        idx: number;
        title: string;
        desc: string
}

export function AccordionComp(
        { idx, title, desc }: Props
) {
        return (
                <Accordion type="single" 
                           defaultValue="item-0" 
                           collapsible 
                           className="w-full space-y-10"
                >
                        <AccordionItem value={`item-${idx}`}
                                        className="px-2"
                        >
                                <AccordionTrigger className="tracking-wide text-lg font-bold text-primary"
                                >{title}</AccordionTrigger>

                                <AccordionContent className="tracking-wide border-none pt-2 px-2"
                                >
                                        {desc}
                                </AccordionContent>
                        </AccordionItem>
                </Accordion>
        )
}
