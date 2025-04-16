import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Settings() {
  return (
    <div className="p-6 pt-10 max-w-4xl mx-auto space-y-8">
      <div className="pt-4">
        <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mb-6">
          Common questions about the P-25 virus, its symptoms, prevention, and treatment.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What are common symptoms?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                At first there are mild symptoms including sneezing, runny nose, and coughing. As the disease progresses there is difficulty breathing, mucus accumulation in the throat and lungs, throat constriction, and eventually death as a result of respiratory failure.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Who is most at risk?
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                Individuals with pollen allergies, individuals with preexisting respiratory conditions, those without access to high tech masks.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Are high tech masks effective?
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                High tech masks are almost 100% effective due to expensive technology.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            Is there a cure or treatment for P-25?
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                As of now there is no known cure, but there is ongoing research.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            What can I do to stay safe?
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                Avoid outdoor activity, wear high tech masks whenever possible, seal windows effectively and stay informed.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            Where did P-25 originate?
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                P-25 was first detected in Florida due to the humid and warm climate. As well as the increasingly warmer temperatures as a result of global warming.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>
            How is P-25 transmitted?
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                P-25 is not contagious person to person. It is airborne, transmitted through inhaling infected pollen.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8">
          <AccordionTrigger>
            Why can't everyone get a mask?
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                Prices of high tech masks are extremely high due to limited production and corporations taking advantage of demand driven by panic.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9">
          <AccordionTrigger>
            Is the government hiding something?
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                Despite claims that this pandemic was a result of government experimentation on genetically modified plants, there is no proof that this has been verified. Research strongly supports that P-25 is a result of naturally occurring mutations in plants.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
