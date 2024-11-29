"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { ATTACK_STEPS } from "@/lib/attack-steps";
import { AnimatePresence, motion } from "framer-motion";

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

    // Reset progress when attack starts
    useEffect(() => {
        if (isAttacking) {
            setCurrentStep(0);
            setProgress(0);
        }
    }, [isAttacking]);

    // Handle step progression
    useEffect(() => {
        if (!isAttacking || !selectedModel || !selectedAttack) return;

        const steps = ATTACK_STEPS[selectedModel]?.[selectedAttack]?.steps;
        if (!steps || currentStep >= steps.length) {
            onComplete?.();
            return;
        }

        const currentDuration = steps[currentStep].duration;
        const progressInterval = 50; // Update every 50ms
        const progressIncrement = (progressInterval / currentDuration) * 100;

        const progressTimer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    setCurrentStep(current => current + 1);
                    return 0;
                }
                return Math.min(prev + progressIncrement, 100);
            });
        }, progressInterval);

        return () => clearInterval(progressTimer);
    }, [currentStep, isAttacking, selectedModel, selectedAttack, onComplete]);

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
                    className="space-y-2"
                >
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">{steps[currentStep].title}</span>
                        <span className="text-muted-foreground">{Math.round(progress)}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {steps[currentStep].description}
                    </p>
                    <Progress value={progress} className="h-2" />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
