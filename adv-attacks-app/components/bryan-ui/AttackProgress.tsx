"use client";

import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Progress } from "@/components/ui/progress";
import { ATTACK_STEPS } from "@/lib/attack-steps";
import { BIJECTIONS } from "@/lib/step-descriptions";
import { ADVERSARIAL_PROMPTS } from "@/lib/adversarial-prompts";
import { AnimatePresence, motion } from "framer-motion";

export interface AttackProgressProps {
    selectedModel?: string;
    selectedAttack?: string;
    isAttacking: boolean;
    onStepReady?: (stepDescription: string, step: number, bijection?: Record<string, string>, advResponse?: string) => void;
    onComplete?: () => void;
    onContinue?: () => void;
}

export interface AttackProgressHandle {
    handleContinue: (e: React.MouseEvent) => void;
}

const AttackProgress = forwardRef<AttackProgressHandle, AttackProgressProps>(({ 
    selectedModel, 
    selectedAttack, 
    isAttacking,
    onStepReady,
    onComplete,
    onContinue
}, ref) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [stepComplete, setStepComplete] = useState(false);
    const [currentBijection, setCurrentBijection] = useState<Record<string, string> | null>(null);

    // Reset progress when attack is stopped
    useEffect(() => {
        if (!isAttacking) {
            setCurrentStep(0);
            setProgress(0);
            setStepComplete(false);
            setCurrentBijection(null);
        }
    }, [isAttacking]);

    useEffect(() => {
        if (isAttacking) {
            // Select a new bijection when attack starts
            const randomBijection = BIJECTIONS[Math.floor(Math.random() * BIJECTIONS.length)];
            setCurrentBijection(randomBijection);
            setCurrentStep(0);
            setProgress(0);
            setStepComplete(false);
        }
    }, [isAttacking]);

    useEffect(() => {
        if (!isAttacking || !selectedModel || !selectedAttack) return;

        const steps = ATTACK_STEPS[selectedModel]?.[selectedAttack]?.steps;
        if (!steps) return;

        if (currentStep >= steps.length) {
            onComplete?.();
            return;
        }

        // Reset step completion state when starting a new step
        setStepComplete(false);

        // Use the duration from the current step
        const stepDuration = steps[currentStep].duration;
        const updateInterval = 50; // Update every 50ms
        const incrementAmount = (100 * updateInterval) / stepDuration;
        
        const progressTimer = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + incrementAmount;
                if (newProgress >= 100) {
                    clearInterval(progressTimer);
                    setStepComplete(true);
                    return 100;
                }
                return newProgress;
            });
        }, updateInterval);

        return () => clearInterval(progressTimer);
    }, [currentStep, isAttacking, selectedModel, selectedAttack, onComplete]);

    // Separate effect for step completion
    useEffect(() => {
        if (stepComplete && selectedModel && selectedAttack) {
            const steps = ATTACK_STEPS[selectedModel]?.[selectedAttack]?.steps;
            if (steps?.[currentStep]) {
                // Find the target response for the current prompt
                const selectedPromptData = ADVERSARIAL_PROMPTS.find(p => p.prompt === selectedAttack);
                const advResponse = currentStep >= 7 ? selectedPromptData?.targetResponse : undefined;
                onStepReady?.(steps[currentStep].description, currentStep, currentBijection || undefined, advResponse);
            }
        }
    }, [stepComplete, selectedModel, selectedAttack, currentStep, currentBijection, onStepReady]);

    const handleContinue = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent default button behavior
        onContinue?.(); 
        setCurrentStep(step => step + 1);
        setProgress(0);
        setStepComplete(false);
    };

    useImperativeHandle(ref, () => ({
        handleContinue
    }));

    if (!isAttacking || !selectedModel || !selectedAttack) return null;

    const steps = ATTACK_STEPS[selectedModel]?.[selectedAttack]?.steps;
    if (!steps || currentStep >= steps.length) return null;

    return (
        <div className="w-full space-y-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium">{steps[currentStep].title}</span>
                            <span className="text-muted-foreground">{Math.round(progress)}%</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {steps[currentStep].description}
                        </p>
                        <Progress value={progress} className="h-2" />
                    </div>

                    {stepComplete && currentStep < steps.length - 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-end"
                        >
                 
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
});

AttackProgress.displayName = "AttackProgress";

export default AttackProgress;
