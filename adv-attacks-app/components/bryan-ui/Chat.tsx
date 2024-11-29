"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Paperclip, Mic, CornerDownLeft, User, Rabbit, Bird, Turtle } from "lucide-react";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
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
    onAttackComplete?: () => void;
}

const MODEL_GREETINGS: Record<string, string> = {
    'gpt4': "I'm ChatGPT, an AI assistant created by OpenAI. I'm here to help with your questions, provide explanations, assist with coding, or tackle any problem-solving tasks you throw my way. 😊",
    'claude': "Hello! I'm Claude, an AI assistant created by Anthropic. I aim to be direct, honest, and helpful while adhering to strong ethical principles.",
    'llama': "Hey there! I'm Llama, Meta's advanced language model. I'm designed to help with a wide range of tasks while being transparent about my capabilities and limitations."
};

export const Chat = forwardRef<{ 
    updateStepMessage: (desc: string, step: number, bijection?: Record<string, string>) => void;
    createSkeleton: () => void;
}, ChatProps>(({ 
    selectedPrompt, 
    selectedModel,
    selectedAttack,
    onAttackStart,
    onAttackComplete
}, ref) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isAttackStarted, setIsAttackStarted] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const createSkeleton = () => {
        setMessages(prev => [...prev, { 
            sender: "user", 
            text: selectedPrompt || "", 
            isSkeleton: true 
        }]);
    };

    const handleLaunchAttack = () => {
        if (!isAttackStarted && selectedPrompt && selectedModel && selectedAttack) {
            setIsAttackStarted(true);
            onAttackStart?.();
            createSkeleton();
        }
    };

    const updateStepMessage = (description: string, step: number, bijection?: Record<string, string>) => {
        if (!selectedPrompt || !selectedAttack) return;
        
        const stepMessages = getStepDescription(selectedPrompt, selectedAttack, step, bijection);
        
        // First remove skeleton with exit animation
        setMessages(prev => {
            const newMessages = prev.filter(m => !m.isSkeleton);
            return newMessages;
        });

        // Add user message after a brief delay to allow skeleton exit animation
        setTimeout(() => {
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
            setTimeout(() => {
                let currentText = "";
                animateText(stepMessages.aiMessage, (text) => {
                    currentText = text;
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage && lastMessage.sender === "assistant") {
                            lastMessage.text = currentText;
                            lastMessage.isTyping = true;
                        }
                        return newMessages;
                    });
                }).then(() => {
                    // Remove typing indicator when done
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage && lastMessage.sender === "assistant") {
                            lastMessage.text = stepMessages.aiMessage;
                            lastMessage.isTyping = false;
                        }
                        return newMessages;
                    });
                });
            }, 1000);
        }, 100); // Brief delay for skeleton exit
    };

    const handleReset = () => {
        setIsAttackStarted(false);
        // Preserve or resend the initial message if there's a selected model
        if (selectedModel && MODEL_GREETINGS[selectedModel]) {
            const greeting = MODEL_GREETINGS[selectedModel];
            setMessages([{ sender: "assistant", text: greeting }]);
        } else {
            setMessages([]);
        }
        setDisplayText("");
        onAttackComplete?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && !isTyping && displayText) {
            e.preventDefault();
            handleLaunchAttack();
        }
    };

    const animateText = async (text: string, callback?: () => void) => {
        setIsTyping(true);
        let currentIndex = 0;
        
        return new Promise<void>((resolve) => {
            const interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    callback?.(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    setIsTyping(false);
                    resolve();
                }
            }, 15);
        });
    };

    // Handle model selection and initial message
    useEffect(() => {
        if (selectedModel && MODEL_GREETINGS[selectedModel]) {
            const greeting = MODEL_GREETINGS[selectedModel];
            
            // Clear all previous messages and add typing message
            setMessages([{ 
                sender: "assistant", 
                text: "", 
                isTyping: true 
            }]);

            // Animate the greeting
            let currentText = "";
            animateText(greeting, (text) => {
                currentText = text;
                setMessages([
                    { sender: "assistant", text: currentText, isTyping: true }
                ]);
            }).then(() => {
                // Remove typing indicator when done
                setMessages([
                    { sender: "assistant", text: greeting }
                ]);
            });
        }
    }, [selectedModel]);

    useEffect(() => {
        if (selectedPrompt) {
            setIsTyping(true);
            setDisplayText("");
            
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex <= selectedPrompt.length) {
                    setDisplayText(selectedPrompt.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    setIsTyping(false);
                    clearInterval(interval);
                }
            }, 15);

            return () => clearInterval(interval);
        }
    }, [selectedPrompt]);

    useImperativeHandle(ref, () => ({
        updateStepMessage,
        createSkeleton
    }));

    return (
        <div className="relative flex h-[650px] flex-col rounded-xl bg-muted/50 p-4">
            <Badge variant="outline" className="absolute right-3 top-3 z-10">
                Output
            </Badge>
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
                <Textarea
                    id="message"
                    value={displayText}
                    placeholder="Select a harmful prompt in the control panel..."
                    className="min-h-[84px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-4"
                    readOnly
                    onKeyDown={handleKeyDown}
                />
                <div className="flex items-center justify-between p-3 pt-0">
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
                    <div className="flex items-center gap-2 px-4 py-2">
                        {isAttackStarted ? (
                            <Button 
                                onClick={handleReset}
                                className="w-full"
                                variant="destructive"
                            >
                                Reset Attack
                            </Button>
                        ) : (
                            <Button
                                onClick={handleLaunchAttack}
                                className="w-full gap-2"
                                variant="destructive"
                                disabled={!selectedPrompt || !selectedModel || !selectedAttack}
                            >
                                Launch Attack
                                <CornerDownLeft className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

Chat.displayName = "Chat";