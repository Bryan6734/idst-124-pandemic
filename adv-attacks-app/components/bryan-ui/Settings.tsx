import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Settings() {
  return (
    <div className="flex flex-col p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is an adversarial attack?</AccordionTrigger>
          <AccordionContent>
            An adversarial attack is a technique that attempts to fool machine learning models by creating minimal perturbations to input data that cause the model to make incorrect predictions while appearing unchanged to human observers.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How do I use this application?</AccordionTrigger>
          <AccordionContent>
            Start by selecting an attack method from the control panel. Upload your target image, adjust the attack parameters as needed, and click "Start Attack" to begin the process. You can monitor the attack progress in real-time.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What attack methods are available?</AccordionTrigger>
          <AccordionContent>
            Our application supports various attack methods including FGSM (Fast Gradient Sign Method), PGD (Projected Gradient Descent), and others. Each method has its own strengths and use cases.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Can I save the generated adversarial examples?</AccordionTrigger>
          <AccordionContent>
            Yes, you can download the generated adversarial examples after the attack is complete. The images will be saved in their original format with the perturbations applied.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Are the attacks performed locally or on a server?</AccordionTrigger>
          <AccordionContent>
            The attacks are performed locally in your browser using TensorFlow.js, ensuring your data privacy and providing quick results without the need for server communication.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
