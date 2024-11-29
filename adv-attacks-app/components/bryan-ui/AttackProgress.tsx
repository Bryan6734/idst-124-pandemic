"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ATTACK_STEPS } from "@/lib/attack-steps";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface AttackProgressProps {
    selectedModel?: string;
    selectedAttack?: string;
    isAttacking: boolean;
    onComplete?: () => void;
}

export function AttackProgress({ 
    selectedModel, 
    selectedAttack, 
    isAttacking,
    onComplete 
}: AttackProgressProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [stepComplete, setStepComplete] = useState(false);

    useEffect(() => {
        if (isAttacking) {
            setCurrentStep(0);
            setProgress(0);
            setStepComplete(false);
        }
    }, [isAttacking]);

    useEffect(() => {
        if (!isAttacking || !selectedModel || !selectedAttack) return;

        const steps = ATTACK_STEPS[selectedModel]?.[selectedAttack]?.steps;
        if (!steps) return;

        // If we've completed all steps, call onComplete
        if (currentStep >= steps.length) {
            onComplete?.();
            return;
        }

        // Reset step completion state when starting a new step
        setStepComplete(false);

        // Update progress smoothly over 5 seconds
        const stepDuration = 5000; // 5 seconds
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

    const handleContinue = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent default button behavior
        setCurrentStep(step => step + 1);
        setProgress(0);
        setStepComplete(false);
    };

    if (!isAttacking || !selectedModel || !selectedAttack) return null;

    const steps = ATTACK_STEPS[selectedModel]?.[selectedAttack]?.steps;
    if (!steps || currentStep >= steps.length) return null;

    return (
        <div className="space-y-4 p-4">
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
                            <Button
                                onClick={handleContinue}
                                className="gap-2"
                                size="sm"
                                type="button" // Explicitly set button type
                            >
                                Continue
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
