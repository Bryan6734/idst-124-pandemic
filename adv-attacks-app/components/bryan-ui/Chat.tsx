/* eslint-disable */

"use client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Paperclip, Mic, Rabbit, Bird, Turtle } from "lucide-react";
import { useEffect, useState, forwardRef, useImperativeHandle, useRef } from "react";
import { getStepDescription } from "@/lib/step-descriptions";

interface Message {
    sender: "user" | "assistant";
    text: string;
    isTyping?: boolean;
    isSkeleton?: boolean;
}

interface ChatProps {
    selectedPrompt?: string;
    selectedModel?: string;
    selectedAttack?: string;
    onAttackStart?: () => void;
}

const MODEL_GREETINGS: Record<string, string> = {
    'gpt4': "I'm ChatGPT, an AI assistant created by OpenAI. I'm here to help with your questions, provide explanations, assist with coding, or tackle any problem-solving tasks you throw my way. 😊",
    'claude': "Hello! I'm Claude, an AI assistant created by Anthropic. I aim to be direct, honest, and helpful while adhering to strong ethical principles.",
    'llama': "Hey there! I'm Llama, Meta's advanced language model. I'm designed to help with a wide range of tasks while being transparent about my capabilities and limitations."
};

export const Chat = forwardRef<{ 
    updateStepMessage: (desc: string, step: number, bijection?: Record<string, string>) => void;
    createSkeleton: () => void;
    resetChat: () => void;
    killAnimations: () => void;
}, ChatProps>(({ 
    selectedPrompt, 
    selectedModel,
    selectedAttack,
    onAttackStart,
}, ref) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isAttackStarted, setIsAttackStarted] = useState(false);
    const [animationInterval, setAnimationInterval] = useState<NodeJS.Timeout | null>(null);
    const [isModelGreeting, setIsModelGreeting] = useState(false);
    const [animationTimeouts, setAnimationTimeouts] = useState<NodeJS.Timeout[]>([]);
    const hasLoggedRef = useRef(false);

    const createSkeleton = () => {
        setMessages(prev => [...prev, { 
            sender: "user", 
            text: selectedPrompt || "", 
            isSkeleton: true 
        }]);
    };

    useEffect(() => {
        if (selectedPrompt && selectedModel && selectedAttack && !isAttackStarted) {
            setIsAttackStarted(true);
        }
    }, [selectedPrompt, selectedModel, selectedAttack, isAttackStarted]);

    const updateStepMessage = (description: string, step: number, bijection?: Record<string, string>) => {
        if (!selectedPrompt || !selectedAttack) return;
        
        const stepMessages = getStepDescription(selectedPrompt, selectedAttack, step, bijection);
        
        // Reset the logging flag for this step
        hasLoggedRef.current = false;
        
        // First remove skeleton with exit animation
        setMessages(prev => {
            const newMessages = prev.filter(m => !m.isSkeleton);
            return newMessages;
        });

        // Add user message after a brief delay to allow skeleton exit animation
        const timeout1 = setTimeout(() => {
            setMessages(prev => [...prev, {
                sender: "user",
                text: stepMessages.userMessage,
                isSkeleton: false
            }, {
                sender: "assistant",
                text: "",
                isTyping: true
            }]);

            // Animate AI message after delay
            const timeout2 = setTimeout(() => {
                let currentText = "";
                const interval = setInterval(() => {
                    if (currentText.length < stepMessages.aiMessage.length) {
                        currentText = stepMessages.aiMessage.slice(0, currentText.length + 1);
                        setMessages(prev => {
                            const newMessages = [...prev];
                            const lastMessage = newMessages[newMessages.length - 1];
                            if (lastMessage && lastMessage.sender === "assistant") {
                                lastMessage.text = currentText;
                                lastMessage.isTyping = true;
                            }
                            return newMessages;
                        });
                    } else {
                        clearInterval(interval);
                        setMessages(prev => {
                            const newMessages = [...prev];
                            const lastMessage = newMessages[newMessages.length - 1];
                            if (lastMessage && lastMessage.sender === "assistant") {
                                lastMessage.text = stepMessages.aiMessage;
                                lastMessage.isTyping = false;
                                if (!hasLoggedRef.current) {
                                    console.log("AI agent finished typing animation");
                                    hasLoggedRef.current = true;
                                }
                            }
                            return newMessages;
                        });
                    }
                }, 15);
                setAnimationInterval(interval);
            }, 1000);
            setAnimationTimeouts(prev => [...prev, timeout2]);
        }, 100);
        setAnimationTimeouts(prev => [...prev, timeout1]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && !isTyping && displayText) {
            e.preventDefault();
            onAttackStart?.();
        }
    };

    const clearAnimations = () => {
        if (animationInterval) {
            clearInterval(animationInterval);
            setAnimationInterval(null);
        }
        setIsTyping(false);
    };

    const killAnimations = () => {
        clearAnimations();
        // Clear all pending timeouts
        animationTimeouts.forEach(timeout => clearTimeout(timeout));
        setAnimationTimeouts([]);
    };

    const resetChat = () => {
        killAnimations();
        setMessages([]);
        setIsAttackStarted(false);
        setDisplayText("");
        setIsModelGreeting(false);
        hasLoggedRef.current = false;
    };

    // Handle model selection and initial message
    useEffect(() => {
        resetChat();
        
        if (selectedModel && MODEL_GREETINGS[selectedModel]) {
            const greeting = MODEL_GREETINGS[selectedModel];
            setIsModelGreeting(true);
            setIsTyping(true);
            
            setMessages([{ 
                sender: "assistant", 
                text: "", 
                isTyping: true 
            }]);

            let currentText = "";
            const interval = setInterval(() => {
                if (currentText.length < greeting.length) {
                    currentText = greeting.slice(0, currentText.length + 1);
                    setMessages([
                        { sender: "assistant", text: currentText, isTyping: true }
                    ]);
                } else {
                    clearInterval(interval);
                    setMessages([
                        { sender: "assistant", text: greeting }
                    ]);
                    setIsTyping(false);
                    setIsModelGreeting(false);
                    setAnimationInterval(null);
                }
            }, 15);
            
            setAnimationInterval(interval);
            return () => {
                clearInterval(interval);
                setAnimationInterval(null);
            };
        }
    }, [selectedModel]);

    // Handle prompt changes
    useEffect(() => {
        if (isModelGreeting) return; // Don't handle prompt changes during model greeting
        
        if (selectedPrompt) {
            clearAnimations();
            setIsTyping(true);
            setDisplayText("");
            
            let currentIndex = 0;
            let interval = setInterval(() => {
                if (currentIndex <= selectedPrompt.length) {
                    setDisplayText(selectedPrompt.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    setIsTyping(false);
                    clearInterval(interval);
                    setAnimationInterval(null);
                }
            }, 15);

            setAnimationInterval(interval);
            return () => {
                clearInterval(interval);
                setAnimationInterval(null);
            };
        }
    }, [selectedPrompt, isModelGreeting]);

    // Reset attack if model or attack vector changes during an active attack
    useEffect(() => {
        if (isAttackStarted) {
            resetChat();
            if (selectedModel && MODEL_GREETINGS[selectedModel]) {
                const greeting = MODEL_GREETINGS[selectedModel];
                setMessages([{ sender: "assistant", text: greeting }]);
            }
        }
    }, [selectedModel, selectedAttack]); // Removed selectedPrompt dependency

    useImperativeHandle(ref, () => ({
        updateStepMessage,
        createSkeleton,
        resetChat,
        killAnimations
    }));

    return (
        <div className="relative flex h-[650px] flex-col rounded-xl bg-muted/50 p-4">
            <div 
                className="flex-1 space-y-4 overflow-y-auto pt-8 mb-6"
                style={{ scrollBehavior: 'smooth' }}
                ref={(el) => {
                    if (el) {
                        el.scrollTop = el.scrollHeight;
                    }
                }}
            >
                <AnimatePresence initial={false}>
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ 
                                opacity: 0, 
                                y: message.isSkeleton ? 20 : 20  // Both enter from bottom
                            }}
                            animate={{ 
                                opacity: 1, 
                                y: 0
                            }}
                            exit={{ 
                                opacity: 0, 
                                y: message.isSkeleton ? 20 : -20  // Skeleton exits down, messages exit up
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeOut"
                            }}
                            className={`flex items-start gap-4 mb-6 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            {message.sender === "assistant" && selectedModel && (
                                <div className="flex-shrink-0">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                                        {selectedModel === 'gpt4' && <Rabbit className="h-6 w-6" />}
                                        {selectedModel === 'claude' && <Bird className="h-6 w-6" />}
                                        {selectedModel === 'llama' && <Turtle className="h-6 w-6" />}
                                    </div>
                                </div>
                            )}
                            <div
                                className={cn(
                                    "max-w-[80%] rounded-lg p-4",
                                    message.sender === "user" ? "bg-primary/10 text-foreground" : "bg-muted",
                                    message.isSkeleton && "animate-pulse"
                                )}
                            >
                                {message.isSkeleton ? (
                                    <div className="space-y-2">
                                        {message.sender === "user" ? (
                                            // Longer skeleton for user message
                                            <div className="space-y-2">
                                                <div className="h-4 w-[180px] bg-primary/20 rounded"></div>
                                                <div className="h-4 w-[140px] bg-primary/20 rounded"></div>
                                            </div>
                                        ) : (
                                            // Longer skeleton for assistant message
                                            <div className="space-y-2">
                                                <div className="h-4 w-[200px] bg-muted-foreground/20 rounded"></div>
                                                <div className="h-4 w-[150px] bg-muted-foreground/20 rounded"></div>
                                                <div className="h-4 w-[180px] bg-muted-foreground/20 rounded"></div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <>
                                        {message.text}
                                        {message.isTyping && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ repeat: Infinity, duration: 1 }}
                                            >
                                                ▋
                                            </motion.span>
                                        )}
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background">
                <div className="relative">
                    {!displayText && (
                        <div className="absolute left-4 top-4 text-muted-foreground pointer-events-none text-md">
                            <span>Select a harmful prompt in the control panel...</span>
                        </div>
                    )}
                    <Textarea
                        id="message"
                        value={displayText}
                        placeholder=""
                        className="min-h-[60px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-4"
                        style={{ fontSize: '1rem' }}
                        readOnly
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" disabled={isTyping}>
                                    <Paperclip className="size-4" />
                                    <span className="sr-only">Attach file</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">Attach File</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" disabled={isTyping}>
                                    <Mic className="size-4" />
                                    <span className="sr-only">Use Microphone</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">Use Microphone</TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
});

Chat.displayName = "Chat";