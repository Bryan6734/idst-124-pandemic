import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";


function IntroModal({ showIntroModal, setShowIntroModal}){

    const introSteps = [
	{
		title: "An Introduction to Adversarial Attacks",
		content:
			"This website is about adversarial attacks on language models, and how they can be used to exploit vulnerabilities in LLMs to cause misaligned or harmful behaviors.",
	},
	{
		title: "What is Jailbreaking?",
		content:
			"Jailbreaking is a type of attack where specific prompts are crafted to bypass safety guardrails, allowing users to produce dangerous or unethical outputs. This is bad!",
	},
    	{

		title: "Why Should I Care?",
		content:
			"As models grow more powerful, it's important to ensure that they're also robust to such attacks, so that they can remain safe, reliable, and trustworthy in everyday use.",
	},
	{
		title: "Get Started",
		content:
			"Excited to explore adversarial attacks? First, select a language model, an attack method, and finally a harmful prompt. Let's go circumvent some safety guardrails!",
	},
];

	const [currentStep, setCurrentStep] = useState(0);


	const handleNext = () => {
		if (currentStep < introSteps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			setShowIntroModal(false);
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

    return (
        <Dialog 
            open={showIntroModal} 
            onOpenChange={setShowIntroModal} 
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="focus:none [&_*]:!outline-none [&_*]:!ring-0 [&_button]:!ring-0 [&_button]:!outline-none"
        >
				<DialogContent 
                    className="sm:max-w-[500px] overflow-hidden !outline-none !ring-0 [&_*]:!outline-none [&_*]:!ring-0 [&_*]:focus:!outline-none [&_*]:focus-visible:!outline-none [&_*]:focus-visible:!ring-0 [&_button]:!ring-offset-0"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onEscapeKeyDown={(e) => e.preventDefault()}
                    style={{ outline: 'none' }}
                >
					<AnimatePresence mode="wait">
						<motion.div
							key={currentStep}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.15 }}
						>
							<DialogHeader>
								<AnimatePresence mode="wait">
									<motion.div
										key={currentStep}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2, delay: 0.1 }}
									>
										<DialogTitle className="text-2xl font-bold">{introSteps[currentStep].title}</DialogTitle>
									</motion.div>
								</AnimatePresence>
							</DialogHeader>
							<motion.div transition={{ duration: 0.2 }}>
								<AnimatePresence mode="wait">
									<motion.div
										key={currentStep}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2, delay: 0.1 }}
										className="py-4"
									>
										<p className="text-muted-foreground">{introSteps[currentStep].content}</p>
									</motion.div>
								</AnimatePresence>
							</motion.div>
							<motion.div>
								<div className="flex items-center justify-between">
									<Button 
                                        variant="outline" 
                                        onClick={handleBack} 
                                        disabled={currentStep === 0}
                                        className="!outline-none !ring-0 !ring-offset-0 hover:!ring-0 focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0"
                                        style={{ outline: 'none' }}
                                    >
										<ChevronLeft className="mr-2 h-4 w-4" />
										Back
									</Button>
									<div className="flex gap-1">
										{introSteps.map((_, index) => (
											<div
												key={index}
												className={`h-2 w-2 rounded-full ${index === currentStep ? "bg-primary" : "bg-muted"}`}
											/>
										))}
									</div>
									<Button 
                                        variant="outline" 
                                        onClick={handleNext}
                                        className="!outline-none !ring-0 !ring-offset-0 hover:!ring-0 focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0"
                                        style={{ outline: 'none' }}
                                    >
										{currentStep === introSteps.length - 1 ? (
											"Get Started"
										) : (
											<>
												Next
												<ChevronRight className="ml-2 h-4 w-4" />
											</>
										)}
									</Button>
								</div>
							</motion.div>
						</motion.div>
					</AnimatePresence>
				</DialogContent>
			</Dialog>
    )
}

export {IntroModal};