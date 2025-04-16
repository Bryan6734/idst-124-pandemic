"use client";
import {
	Calendar,
	Clock,
	Globe,
	BarChart,
	Thermometer,
	Activity,
	ArrowRight,
	RefreshCw
} from "lucide-react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ControlPanelsProps {
    /** Callback when a year is selected using the slider */
    onYearSelect?: (year: number) => void;
    /** Callback when a region is selected from the dropdown */
    onRegionSelect?: (region: string) => void;
    /** Callback when a data visualization type is selected */
    onVisualizationSelect?: (vizType: string) => void;
    /** Flag indicating whether the simulation is running */
    isSimulating?: boolean;
    /** Callback triggered when the user clicks to start the simulation */
    onSimulationStart?: () => void;
    /** Callback when user chooses to pause the simulation */
    onSimulationPause?: () => void;
    /** Callback to reset the simulation to initial state */
    onReset?: () => void;
    /** The currently selected year */
    selectedYear?: number;
}

export function ControlPanels({ 
    onYearSelect,
    onRegionSelect,
    onVisualizationSelect,
    isSimulating,
    onSimulationStart,
    onSimulationPause,
    onReset,
    selectedYear: initialSelectedYear = 2024
}: ControlPanelsProps) {
    const [selectedYear, setSelectedYear] = useState(initialSelectedYear);
    const [selectedRegion, setSelectedRegion] = useState("global");
    const [selectedVisualization, setSelectedVisualization] = useState("spread");
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Reset all selections to default values
    const resetSelections = () => {
        setSelectedYear(2024);
        setSelectedRegion("global");
        setSelectedVisualization("spread");
        setIsAutoPlaying(false);
        setPlaybackSpeed(1);
        if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
            autoPlayIntervalRef.current = null;
        }
        onYearSelect?.(2024);
        onRegionSelect?.("global");
        onVisualizationSelect?.("spread");
    };

    // Handle reset button click
    const handleReset = () => {
        resetSelections();
        onReset?.();
    };

    // Handle year change from slider
    const handleYearChange = (value: number[]) => {
        const year = value[0];
        setSelectedYear(year);
        onYearSelect?.(year);
    };

    // Handle play/pause for automatic year progression
    const toggleAutoPlay = () => {
        if (isAutoPlaying) {
            // Stop auto-play
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
                autoPlayIntervalRef.current = null;
            }
            setIsAutoPlaying(false);
            onSimulationPause?.();
        } else {
            // Start auto-play
            setIsAutoPlaying(true);
            onSimulationStart?.();
            
            // Set up interval to advance the year
            autoPlayIntervalRef.current = setInterval(() => {
                setSelectedYear(prev => {
                    const newYear = Math.min(prev + 1, 2050);
                    onYearSelect?.(newYear);
                    
                    // Stop auto-play if we reach 2050
                    if (newYear === 2050) {
                        if (autoPlayIntervalRef.current) {
                            clearInterval(autoPlayIntervalRef.current);
                            autoPlayIntervalRef.current = null;
                        }
                        setIsAutoPlaying(false);
                    }
                    
                    return newYear;
                });
            }, 1000 / playbackSpeed);
        }
    };
    
    // Clean up interval on unmount
    useEffect(() => {
        return () => {
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
            }
        };
    }, []);
    
    // Update interval when playback speed changes
    useEffect(() => {
        if (isAutoPlaying && autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
            
            autoPlayIntervalRef.current = setInterval(() => {
                setSelectedYear(prev => {
                    const newYear = Math.min(prev + 1, 2050);
                    onYearSelect?.(newYear);
                    
                    if (newYear === 2050) {
                        if (autoPlayIntervalRef.current) {
                            clearInterval(autoPlayIntervalRef.current);
                            autoPlayIntervalRef.current = null;
                        }
                        setIsAutoPlaying(false);
                    }
                    
                    return newYear;
                });
            }, 1000 / playbackSpeed);
        }
    }, [playbackSpeed, onYearSelect]);

	return (
		<div className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0">
			<div className="grid w-full items-start gap-6">
				<fieldset className="grid gap-6 rounded-lg border p-4">
					<legend className="-ml-1 px-1 text-sm font-medium whitespace-nowrap">P-25 Virus Spread Simulator</legend>
					<div className="grid gap-5">
						{/* Year Selection */}
						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<Label htmlFor="year" className="flex items-center gap-2">
									<Calendar className="h-4 w-4" />
									Year: {selectedYear}
								</Label>
								<span className="text-xs text-muted-foreground">2024-2050</span>
							</div>
							<Slider
								id="year"
								min={2024}
								max={2050}
								step={1}
								value={[selectedYear]}
								onValueChange={handleYearChange}
								disabled={isAutoPlaying}
							/>
						</div>
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
						</Select> </>) : (<><Label htmlFor="model">Model</Label>
						<Select 
							disabled
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
						</Select></>)}
					</div>
				
					<div className="grid gap-3">
						{ !isAttacking ? (<>
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
									<SelectItem key={p.prompt} value={p.prompt}>
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
						</>) : (<><Label htmlFor="prompt">Harmful Prompt</Label>
						<Select 
							disabled
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
									<SelectItem key={p.prompt} value={p.prompt}>
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
						</Select></>)}
					</div>
				</fieldset>
				<fieldset className="grid gap-6 rounded-lg border p-4">
					<legend className="-ml-1 px-1 text-sm font-medium whitespace-nowrap">Jailbreak</legend>
                    <div className="grid gap-3">
						{ !isAttacking ? (<>
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
						</>) : ( <> <Label htmlFor="attack">Attack Vector</Label>
						<Select 
							disabled
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
						</Select> </>)}
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
			<WarningModal 
                open={showWarningModal}
                onOpenChange={setShowWarningModal}
                onConfirm={handleConfirmAttack}
            />
		</div>
	);
}
