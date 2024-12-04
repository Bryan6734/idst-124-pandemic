import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface WarningModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function WarningModal({ open, onOpenChange, onConfirm }: WarningModalProps) {
  const warningSteps = [
    {
      title: "⚠️ Warning",
      content: "You are about to run an adversarial attack that will attempt to bypass the model's safety guardrails. The outputs may be harmful, dangerous, or unethical. Educational purposes only!"
    },
    {
      title: "❗️ A Note About Usage",
      content: "Please allow the model to complete its response before proceeding to the next step. This ensures the attack process runs smoothly. Otherwise, you might encounter bugs!"
    },
  
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < warningSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onConfirm();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={onOpenChange}
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
                  <DialogTitle className="text-2xl font-bold">{warningSteps[currentStep].title}</DialogTitle>
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
                  <p className="text-muted-foreground">{warningSteps[currentStep].content}</p>
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
                  {warningSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full ${index === currentStep ? "bg-primary" : "bg-muted"}`}
                    />
                  ))}
                </div>
                <Button 
                  variant="destructive" 
                  onClick={handleNext}
                  className="!outline-none !ring-0 !ring-offset-0 hover:!ring-0 focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0"
                  style={{ outline: 'none' }}
                >
                  {currentStep === warningSteps.length - 1 ? (
                    "I Understand"
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
  );
}
