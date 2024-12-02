"use client";
import {
	Bot,
	Brain,
	GitBranch,
	Network,
	MessageSquare,
	Sparkles,
	Cpu,
	GitFork,
	CornerDownLeft,
	ArrowRight
} from "lucide-react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import AttackProgress, { AttackProgressHandle } from "./AttackProgress";
import { ADVERSARIAL_PROMPTS } from "@/lib/adversarial-prompts";

interface ControlPanelsProps {
    /** Callback when a harmful prompt is selected from the dropdown */
    onPromptSelect?: (prompt: string) => void;
    /** Callback when a target model (e.g. GPT-4) is selected from the dropdown */
    onModelSelect?: (model: string) => void;
    /** Callback when an attack type (e.g. jailbreak) is selected from the dropdown */
    onAttackSelect?: (attack: string) => void;
    /** Flag indicating whether an attack is currently in progress */
    isAttacking?: boolean;
    /** Callback triggered when the user clicks to start a new attack */
    onAttackStart?: () => void;
    /** Callback fired when an attack step is ready, providing the step description, number, and any bijection mapping */
    onStepReady?: (desc: string, step: number, bijection?: Record<string, string>) => void;
    /** Callback when user chooses to continue to the next step in the attack sequence */
    onContinue?: () => void;
    /** Callback to reset the attack state and clear all selections */
    onReset?: () => void;
    /** The currently selected model */
    selectedModel?: string;
}

export function ControlPanels({ 
    onPromptSelect, 
    onModelSelect, 
    onAttackSelect,
    isAttacking,
    onAttackStart,
    onStepReady,
    onContinue,
    onReset,
    selectedModel: initialSelectedModel
}: ControlPanelsProps) {
    const [selectedAttack, setSelectedAttack] = useState("");
    const [selectedModel, setSelectedModel] = useState(initialSelectedModel || "");
    const [selectedPrompt, setSelectedPrompt] = useState("");
    const attackProgressRef = useRef<AttackProgressHandle>(null);

    const resetSelections = () => {
        setSelectedAttack("");
        setSelectedPrompt("");
        setSelectedModel("");
        onPromptSelect?.("");
        onAttackSelect?.("");
        onModelSelect?.("");
    };

    const handleReset = () => {
        resetSelections();
        onReset?.();
    };

    const handleLaunchAttack = () => {
        if (!isAttacking && selectedPrompt && selectedModel && selectedAttack) {
            onAttackStart?.();
        }
    };

	return (
		<div className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0">
			<div className="grid w-full items-start gap-6">
				<fieldset className="grid gap-6 rounded-lg border p-4">
					<legend className="-ml-1 px-1 text-sm font-medium whitespace-nowrap">Control Panel</legend>
					<div className="grid gap-3">
						<Label htmlFor="model">Model</Label>
						<Select 
                            value={selectedModel || ""}
                            onValueChange={(value) => {
                                resetSelections();
                                onModelSelect?.(value);
                                setSelectedModel(value);
                            }}>
							<SelectTrigger id="model" className="items-start truncate [&_[data-description]]:hidden">
								<SelectValue placeholder="Select a model" />
							</SelectTrigger>
							<SelectContent className="w-[--radix-select-trigger-width]">
								<SelectItem value="gpt4">
									<div className="flex items-center gap-3 text-muted-foreground overflow-hidden">
										<Bot className="size-5 flex-shrink-0" />
										<div className="grid gap-0.5 min-w-0">
											<p className="truncate">
												<span className="font-medium text-foreground">GPT-4 </span>Turbo
											</p>
											<p className="text-xs truncate" data-description>
												By OpenAI (Nov 2023)
											</p>
										</div>
									</div>
								</SelectItem>
								<SelectItem value="claude" disabled>
									<div className="flex items-center gap-3 text-muted-foreground overflow-hidden">
										<Brain className="size-5 flex-shrink-0" />
										<div className="grid gap-0.5 min-w-0">
											<p className="truncate">
												<span className="font-medium text-foreground">Claude </span>2.1
											</p>
											<p className="text-xs truncate" data-description>
												By Anthropic (Oct 2023)
											</p>
										</div>
									</div>
								</SelectItem>
								<SelectItem value="llama" disabled>
									<div className="flex items-center gap-3 text-muted-foreground overflow-hidden">
										<Sparkles className="size-5 flex-shrink-0" />
										<div className="grid gap-0.5 min-w-0">
											<p className="truncate">
												<span className="font-medium text-foreground">Llama2 </span>7B-Chat
											</p>
											<p className="text-xs truncate" data-description>
												By Meta (Feb 2023)
											</p>
										</div>
									</div>
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				
					<div className="grid gap-3">
						<Label htmlFor="prompt">Harmful Prompt</Label>
						<Select 
                            value={selectedPrompt}
                            onValueChange={(value) => {
                                onPromptSelect?.(value);
                                setSelectedPrompt(value);
                            }}>
							<SelectTrigger id="prompt" className="items-start whitespace-nowrap overflow-hidden [&_[data-description]]:hidden">
								<SelectValue className="truncate text-left" placeholder="Select a prompt" />
							</SelectTrigger>
							<SelectContent className="w-[--radix-select-trigger-width]">
								{ADVERSARIAL_PROMPTS.map((p) => (
									<SelectItem key={p.id} value={p.prompt}>
										<div className="flex items-center gap-3 text-muted-foreground">
											<MessageSquare className="size-5 flex-shrink-0" />
											<div className="grid gap-0.5">
												<p className="text-sm text-foreground">{p.prompt}</p>
												<p className="text-xs" data-description>
													{p.method}
												</p>
											</div>
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</fieldset>
				<fieldset className="grid gap-6 rounded-lg border p-4">
					<legend className="-ml-1 px-1 text-sm font-medium whitespace-nowrap">Jailbreak</legend>
                    <div className="grid gap-3">
						<Label htmlFor="attack">Attack Vector</Label>
						<Select 
                            value={selectedAttack}
                            onValueChange={(value) => {
                                setSelectedAttack(value);
                                onAttackSelect?.(value);
                            }}>
							<SelectTrigger id="attack" className="items-start truncate [&_[data-description]]:hidden">
								<SelectValue placeholder="Select an attack" />
							</SelectTrigger>
							<SelectContent className="w-[--radix-select-trigger-width]">
								<SelectItem value="gcg">
									<div className="flex items-center gap-3 text-muted-foreground">
										<Cpu className="size-5 flex-shrink-0" />
										<div className="grid gap-0.5">
											<p className="text-sm text-foreground">
												<span className="font-medium">Greedy Coordinate Gradient </span>
												(GCG)
											</p>
											<p className="text-xs" data-description>
												Uses model gradients to craft an adversarial suffix. (Zou et al, 2023)
											</p>
										</div>
									</div>
								</SelectItem>
								<SelectItem value="autodan" disabled>
									<div className="flex items-center gap-3 text-muted-foreground">
										<GitBranch className="size-5 flex-shrink-0" />
										<div className="grid gap-0.5">
											<p className="text-sm text-foreground">
												<span className="font-medium">AutoDAN </span>(Do-Anything-Now)
											</p>
											<p className="text-xs" data-description>
												Uses hierarchical genetic algorithms to craft an adversarial prompt. (Liu et al, 2024)
											</p>
										</div>
									</div>
								</SelectItem>
								<SelectItem value="bijection">
									<div className="flex items-center gap-3 text-muted-foreground">
										<Network className="size-5 flex-shrink-0" />
										<div className="grid gap-0.5">
											<p className="text-sm text-foreground">
												<span className="font-medium">Bijection Learning</span>
											</p>
											<p className="text-xs" data-description>
												Teaches LLMs invertible languages to bypass safety mechanisms. (Huang et al, 2024)
											</p>
										</div>
									</div>
								</SelectItem>
								<SelectItem value="tap" disabled>
									<div className="flex items-center gap-3 text-muted-foreground">
										<GitFork className="size-5 flex-shrink-0" />
										<div className="grid gap-0.5">
											<p className="text-sm text-foreground">
												<span className="font-medium">TAP </span>(Tree of Attacks w/ Pruning)
											</p>
											<p className="text-xs" data-description>
												Uses an attacker LLM to iteratively craft attack prompts until one of them succeeds. (Mehrotra et al, 2024)
											</p>
										</div>
									</div>
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
                    <AttackProgress
                        ref={attackProgressRef}
                        selectedModel={selectedModel}
                        selectedAttack={selectedAttack}
                        isAttacking={isAttacking ?? false}
                        onStepReady={onStepReady}
                        onComplete={() => {}}
                        onContinue={onContinue}
                    />
                    <div className="flex gap-2 mt-4">
                        <Button 
                            variant="secondary" 
                            className="flex-1"
                            onClick={(e) => {
                                e.preventDefault();
                                handleReset();
                            }}
                            type="button"
                        >
                            Reset
                        </Button>
                        {!isAttacking && (
                            <Button 
                                variant="destructive"
                                className="flex-1 gap-2"
                                onClick={handleLaunchAttack}
                                disabled={!selectedPrompt || !selectedModel || !selectedAttack}
                                type="button"
                            >
                                Launch Attack
                                <CornerDownLeft className="h-4 w-4" />
                            </Button>
                        )}
                        {isAttacking && (
                            <Button 
                                variant="default"
                                className="flex-1"
                                type="button"
                                onClick={(e) => attackProgressRef.current?.handleContinue(e)}
                            >
                                Continue
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
				</fieldset>
			</div>
		</div>
	);
}
