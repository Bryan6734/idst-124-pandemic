"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { Paperclip, Mic, CornerDownLeft } from "lucide-react";
import { useEffect, useState } from "react";

interface Message {
    sender: "user" | "assistant";
    text: string;
    isTyping?: boolean;
}

interface ChatProps {
    selectedPrompt?: string;
    selectedModel?: string;
}

const MODEL_GREETINGS: Record<string, string> = {
    'gpt4': "I'm ChatGPT, an AI assistant created by OpenAI. I'm here to help with your questions, provide explanations, assist with coding, or tackle any problem-solving tasks you throw my way. 😊",
    'claude': "Hello! I'm Claude, an AI assistant created by Anthropic. I aim to be direct, honest, and helpful while adhering to strong ethical principles.",
    'llama': "Hey there! I'm Llama, Meta's advanced language model. I'm designed to help with a wide range of tasks while being transparent about my capabilities and limitations."
};

export function Chat({ selectedPrompt, selectedModel }: ChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = () => {
        if (displayText) {
            setMessages(prev => [...prev, { sender: "user", text: displayText }]);
            setDisplayText("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && !isTyping && displayText) {
            e.preventDefault();
            handleSendMessage();
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

    return (
        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-3 top-3 z-10">
                Output
            </Badge>
            <div className="flex-1 space-y-4 overflow-y-auto pt-8">
                <AnimatePresence initial={false}>
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg p-3 ${
                                    message.sender === "user" ? "bg-primary/10 text-foreground" : "bg-muted"
                                }`}
                            >
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
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
                <Textarea
                    id="message"
                    value={displayText}
                    placeholder="Select a harmful prompt in the control panel..."
                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                    readOnly
                    onKeyDown={handleKeyDown}
                />
                <div className="flex items-center p-3 pt-0">
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
                    <Button 
                        onClick={handleSendMessage}
                        size="sm" 
                        variant="destructive" 
                        className="ml-auto gap-1.5"
                        disabled={isTyping || !displayText}
                    >
                        Launch Attack
                        <CornerDownLeft className="size-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}