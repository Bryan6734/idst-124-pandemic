import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Settings() {
  return (
    <div className="p-6 pt-10 max-w-4xl mx-auto space-y-8">
      <div className="pt-4">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mb-6">
          Common questions about adversarial attacks and how to use this application.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-3">
          <AccordionTrigger>Why did you create this website?</AccordionTrigger>
          <AccordionContent>
          <div className="space-y-4">
              <p>
                I don't know. I just wanted to do something fun lol.
              </p>
              <p>
                If humanity learned that an equally intelligent alien species would arrive on Earth in 5-10 years, we'd probably all come together in an attempt to safeguard our long-term future. I suppose it's important we do the same for AI.
              </p>
              
            </div>
            
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>How did you select which attacks to run?</AccordionTrigger>
          <AccordionContent>
          <div className="space-y-4">
              <p>
                It feels like there are new papers on adversarial attacks being published every week, so this was a hard decision! Broadly, I wanted to choose attacks that were (1) highly effective at time of publication (as defined by &gt;50% ASR), (2) required only black-box access OR were transferable to frontier models, and (3) visually appealing!
              </p>
              <p>
                In the future, I plan on expanding this list to include more adversarial attacks. 
              </p>
              
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>How do you align language models to human values?</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>
                The problem of alignment is tricky, since humans don't come with a well-defined value function, and language models are pretty vulnerable to attacks (as you learned here)! But I do think alignment is solvable, and there's been a lot of recent work on how to make these models more adversarially robust.
              </p>
              <p>
                At a high-level, there are two main approaches to alignment. Reinforcement learning from human feedback (RLHF), which is used by OpenAI, uses human ratings to fine-tune the model's responses to better align with human preferences. Another approach is reinforcement learning from AI feedback (RLAIF), used by Anthropic, where humans define a constitution of ethical principles, and the AI is used to critique the base model's responses using these principles. This is also known as "Constitutional AI."
              </p>
              <p>
                Each approach has its benefits and drawbacks, and I would encourage people to dive deeper if they find this interesting.
              </p>
            </div>
          </AccordionContent>

        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>Are the attacks performed locally?</AccordionTrigger>
          <AccordionContent>
          <div className="space-y-4">
              <p>
                This website doesn't actually run any of the attacks in the browser. Instead, the attacks were conducted on a separate machine, and the results were stored in a JSON file that is publicly accessible in the HarmBench repository. This choice was made for two reasons:
              </p>
              <p>
              First, we needed to comply with the OpenAI & Anthropic Terms of Service, and providing an easy way for users to circumvent their guardrails wouldn't further our goal of spreading awareness. 
              </p>
              <p>
              Second, not all browsers/systems are created equal, and some of the attacks required significant computing resources that couldn't be supported on a browser. On top of that, each call to a language model's API costs money, and that can quickly add up!
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>What is this website buit on?</AccordionTrigger>
          <AccordionContent>
          <div className="space-y-4">
              <p>
                The website is built on Next.js 14 (full-stack w/ TypeScript), ShadCN (UI components), Tailwind CSS (more styling), and Framer Motion (for animations). I experimented with using HuggingFace's Transformers.js, but later decided it would be too computationally expensive. 
              </p>
              <p>
                
              </p>
              
            </div>
            
          </AccordionContent>
        </AccordionItem>


      </Accordion>
    </div>
  )
}
