import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";


function IntroModal({ showIntroModal, setShowIntroModal}){

    const introSteps = [
	{
		title: "⚠️ The P-25 Virus",
		content:
			"Welcome to the P-25 Virus Information Center. P-25 is a disease in humans caused by inhalation of pollen containing the mutated P-25 gene.",
	},
	{
		title: "🧬 Genetic Variant",
		content:
			"Pollen cells containing this gene elicit an unusually strong immune response in humans compared to traditional pollen, leading to the severe symptoms seen in patients with the disease. In some people, the immune response is potent enough to cause their own death.",
	},
    	{

		title: "🐝 The Spread",
		content:
			"P-25 spreads among plants as bees carry the pollen between them and the plants reproduce, passing the gene to their offspring. It infects humans as they inhale the excess pollen in the air.",
	},
	{
		title: "🌍 Global Severity",
		content:
			"Unfortunately, because increasing temperatures signal male plants to release pollen, global warming has exacerbated this issue, which has increased the severity of the epidemic. Let's explore!",
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
										className="py-6"
									>
										<p className="text-muted-foreground">{introSteps[currentStep].content}</p>
									</motion.div>
								</AnimatePresence>
							</motion.div>
							<motion.div className="pt-2">
								<div className="flex items-center justify-between space-x-4">
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
                                        variant="default" 
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