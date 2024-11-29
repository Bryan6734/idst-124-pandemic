'use client'
import Image from "next/image";
import {
	Bird,
	Book,
	Bot,
	Code2,
	CornerDownLeft,
	LifeBuoy,
	Mic,
	Paperclip,
	Rabbit,
	Settings,
	Settings2,
	Share,
	SquareTerminal,
	SquareUser,
	Triangle,
	Turtle,
	Moon,
	Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";



export const description =
	"An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.";

export default function Home() {
	const { theme, setTheme } = useTheme();
	const [showIntroModal, setShowIntroModal] = useState(true);
	const [currentStep, setCurrentStep] = useState(0);
	const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'assistant' }>>([]);
	const [inputMessage, setInputMessage] = useState('');

	const introSteps = [
		{
			title: "Welcome to A Visual Guide to Adversarial Attacks!",
			content: "Explore and understand how AI models can be manipulated through various attack vectors. This interactive platform helps you visualize and comprehend different adversarial techniques."
		},
		{
			title: "Interactive Experiments",
			content: "Try different attack methods, adjust parameters, and see real-time results. Our platform provides a hands-on approach to understanding AI vulnerabilities."
		},
		{
			title: "The Motivation",
			content: "I'm Bryan Sukidi. I'm interested in AI safety and alignment. I created this project for the BlueDot AI Safety Fundamentals course, and I re-purposed it for Data 120!"
		},
		{
			title: "Get Started",
			content: "Ready to begin your journey into adversarial machine learning? Click continue to start exploring the platform."
		}
	];

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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!inputMessage.trim()) return;
		
		setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
		setInputMessage('');
		// Here you would typically also handle the AI response
	};

	return (
		<TooltipProvider delayDuration={100}>
			<Dialog open={showIntroModal} onOpenChange={setShowIntroModal}>
				<DialogContent className="sm:max-w-[500px] overflow-hidden">
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
										<DialogTitle className="text-2xl font-bold">
											{introSteps[currentStep].title}
										</DialogTitle>
									</motion.div>
								</AnimatePresence>
							</DialogHeader>
							<motion.div
								transition={{ duration: 0.2 }}
							>
								<AnimatePresence mode="wait">
									<motion.div
										key={currentStep}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ duration: 0.2, delay: 0.1 }}
										className="py-4"
									>
										<p className="text-muted-foreground">
											{introSteps[currentStep].content}
										</p>
									</motion.div>
								</AnimatePresence>
							</motion.div>
							<motion.div>
								<div className="flex items-center justify-between">
									<Button
										variant="outline"
										onClick={handleBack}
										disabled={currentStep === 0}
									>
										<ChevronLeft className="mr-2 h-4 w-4" />
										Back
									</Button>
									<div className="flex gap-1">
										{introSteps.map((_, index) => (
											<div
												key={index}
												className={`h-2 w-2 rounded-full ${
													index === currentStep ? "bg-primary" : "bg-muted"
												}`}
											/>
										))}
									</div>
									<Button onClick={handleNext}>
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
			<div className="grid h-screen w-full pl-[56px]">
				<aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
					<div className="border-b p-2">
						<Button variant="outline" size="icon" aria-label="Home">
							<Triangle className="size-5 fill-foreground" />
						</Button>
					</div>
					<nav className="grid gap-1 p-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="rounded-lg bg-muted" aria-label="Control Panel">
									<SquareTerminal className="size-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								Control Panel
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="rounded-lg" aria-label="Models">
									<Bot className="size-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								Models
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="rounded-lg" aria-label="API">
									<Code2 className="size-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								API
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="rounded-lg" aria-label="Papers">
									<Book className="size-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								Papers
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="rounded-lg" aria-label="Settings">
									<Settings2 className="size-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								Settings
							</TooltipContent>
						</Tooltip>
					</nav>
					<nav className="mt-auto grid gap-1 p-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Help">
									<LifeBuoy className="size-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								Help
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Account">
									<SquareUser className="size-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								Account
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button 
									variant="ghost" 
									size="icon" 
									className="rounded-lg" 
									onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
									aria-label="Toggle theme"
								>
									<Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
									<Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								Toggle theme
							</TooltipContent>
						</Tooltip>
					</nav>
				</aside>
				<div className="flex flex-col">
					<header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
						<h1 className="text-xl font-semibold">A Visual Guide to Adversarial Attacks</h1>
						<Drawer>
							<DrawerTrigger asChild>
								<Button variant="ghost" size="icon" className="md:hidden">
									<Settings className="size-4" />
									<span className="sr-only">Settings</span>
								</Button>
							</DrawerTrigger>
							<DrawerContent className="max-h-[80vh]">
								<DrawerHeader>
									<DrawerTitle>Configuration</DrawerTitle>
									<DrawerDescription>Configure the settings for the model and messages.</DrawerDescription>
								</DrawerHeader>
								<form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
									<fieldset className="grid gap-6 rounded-lg border p-4">
										<legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
										<div className="grid gap-3">
											<Label htmlFor="model">Model</Label>
											<Select>
												<SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
													<SelectValue placeholder="Select a model" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="genesis">
														<div className="flex items-start gap-3 text-muted-foreground">
															<Rabbit className="size-5" />
															<div className="grid gap-0.5">
																<p>
																	Neural <span className="font-medium text-foreground">Genesis</span>
																</p>
																<p className="text-xs" data-description>
																	Our fastest model for general use cases.
																</p>
															</div>
														</div>
													</SelectItem>
													<SelectItem value="explorer">
														<div className="flex items-start gap-3 text-muted-foreground">
															<Bird className="size-5" />
															<div className="grid gap-0.5">
																<p>
																	Neural <span className="font-medium text-foreground">Explorer</span>
																</p>
																<p className="text-xs" data-description>
																	Performance and speed for efficiency.
																</p>
															</div>
														</div>
													</SelectItem>
													<SelectItem value="quantum">
														<div className="flex items-start gap-3 text-muted-foreground">
															<Turtle className="size-5" />
															<div className="grid gap-0.5">
																<p>
																	Neural <span className="font-medium text-foreground">Quantum</span>
																</p>
																<p className="text-xs" data-description>
																	The most powerful model for complex computations.
																</p>
															</div>
														</div>
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="temperature">Temperature</Label>
											<Input id="temperature" type="number" placeholder="0.4" />
										</div>
										<div className="grid gap-3">
											<Label htmlFor="top-p">Top P</Label>
											<Input id="top-p" type="number" placeholder="0.7" />
										</div>
										<div className="grid gap-3">
											<Label htmlFor="top-k">Top K</Label>
											<Input id="top-k" type="number" placeholder="0.0" />
										</div>
									</fieldset>
									<fieldset className="grid gap-6 rounded-lg border p-4">
										<legend className="-ml-1 px-1 text-sm font-medium">Attack</legend>
										<div className="grid gap-3">
											<Label htmlFor="role">Role</Label>
											<Select defaultValue="system">
												<SelectTrigger id="role" className="items-start [&_[data-description]]:hidden">
													<SelectValue placeholder="Select a role" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="system">
														<div className="flex items-start gap-3 text-muted-foreground">
															<Bot className="size-5" />
															<div className="grid gap-0.5">
																<p>
																	<span className="font-medium text-foreground">System</span>
																</p>
																<p className="text-xs" data-description>
																	System-level instructions and context
																</p>
															</div>
														</div>
													</SelectItem>
													<SelectItem value="user">
														<div className="flex items-start gap-3 text-muted-foreground">
															<SquareUser className="size-5" />
															<div className="grid gap-0.5">
																<p>
																	<span className="font-medium text-foreground">User</span>
																</p>
																<p className="text-xs" data-description>
																	User messages and queries
																</p>
															</div>
														</div>
													</SelectItem>
													<SelectItem value="assistant">
														<div className="flex items-start gap-3 text-muted-foreground">
															<Bot className="size-5" />
															<div className="grid gap-0.5">
																<p>
																	<span className="font-medium text-foreground">Assistant</span>
																</p>
																<p className="text-xs" data-description>
																	AI assistant responses
																</p>
															</div>
														</div>
													</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="grid gap-3">
											<Label htmlFor="content">Content</Label>
											<Textarea id="content" placeholder="You are a..." />
										</div>
									</fieldset>
								</form>
							</DrawerContent>
						</Drawer>
						<Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
							<Share className="size-3.5" />
							Share
						</Button>
					</header>
					<main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
						<div className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0">
							<form className="grid w-full items-start gap-6">
								<fieldset className="grid gap-6 rounded-lg border p-4">
									<legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
									<div className="grid gap-3">
										<Label htmlFor="model">Model</Label>
										<Select>
											<SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
												<SelectValue placeholder="Select a model" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="genesis">
													<div className="flex items-start gap-3 text-muted-foreground">
														<Rabbit className="size-5" />
														<div className="grid gap-0.5">
															<p>
																Neural <span className="font-medium text-foreground">Genesis</span>
															</p>
															<p className="text-xs" data-description>
																Our fastest model for general use cases.
															</p>
														</div>
													</div>
												</SelectItem>
												<SelectItem value="explorer">
													<div className="flex items-start gap-3 text-muted-foreground">
														<Bird className="size-5" />
														<div className="grid gap-0.5">
															<p>
																Neural <span className="font-medium text-foreground">Explorer</span>
															</p>
															<p className="text-xs" data-description>
																Performance and speed for efficiency.
															</p>
														</div>
													</div>
												</SelectItem>
												<SelectItem value="quantum">
													<div className="flex items-start gap-3 text-muted-foreground">
														<Turtle className="size-5" />
														<div className="grid gap-0.5">
															<p>
																Neural <span className="font-medium text-foreground">Quantum</span>
															</p>
															<p className="text-xs" data-description>
																The most powerful model for complex computations.
															</p>
														</div>
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="temperature">Temperature</Label>
										<Input id="temperature" type="number" placeholder="0.4" />
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div className="grid gap-3">
											<Label htmlFor="top-p">Top P</Label>
											<Input id="top-p" type="number" placeholder="0.7" />
										</div>
										<div className="grid gap-3">
											<Label htmlFor="top-k">Top K</Label>
											<Input id="top-k" type="number" placeholder="0.0" />
										</div>
									</div>
								</fieldset>
								<fieldset className="grid gap-6 rounded-lg border p-4">
									<legend className="-ml-1 px-1 text-sm font-medium">Attack</legend>
									<div className="grid gap-3">
										<Label htmlFor="role">Role</Label>
										<Select defaultValue="system">
											<SelectTrigger id="role" className="items-start [&_[data-description]]:hidden">
												<SelectValue placeholder="Select a role" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="system">
													<div className="flex items-start gap-3 text-muted-foreground">
														<Bot className="size-5" />
														<div className="grid gap-0.5">
															<p>
																<span className="font-medium text-foreground">System</span>
															</p>
															<p className="text-xs" data-description>
																System-level instructions and context
															</p>
														</div>
													</div>
												</SelectItem>
												<SelectItem value="user">
													<div className="flex items-start gap-3 text-muted-foreground">
														<SquareUser className="size-5" />
														<div className="grid gap-0.5">
															<p>
																<span className="font-medium text-foreground">User</span>
															</p>
															<p className="text-xs" data-description>
																User messages and queries
															</p>
														</div>
													</div>
												</SelectItem>
												<SelectItem value="assistant">
													<div className="flex items-start gap-3 text-muted-foreground">
														<Bot className="size-5" />
														<div className="grid gap-0.5">
															<p>
																<span className="font-medium text-foreground">Assistant</span>
															</p>
															<p className="text-xs" data-description>
																AI assistant responses
															</p>
														</div>
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="content">Content</Label>
										<Textarea id="content" placeholder="You are a..." className="min-h-[9.5rem]" />
									</div>
								</fieldset>
							</form>
						</div>
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
											className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
										>
											<div className={`max-w-[80%] rounded-lg p-3 ${
												message.sender === 'user' 
													? 'bg-primary/10 text-foreground'
													: 'bg-muted'
											}`}>
												{message.text}
											</div>
										</motion.div>
									))}
								</AnimatePresence>
							</div>
							<form
								onSubmit={handleSubmit}
								className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
							>
								<Textarea
									id="message"
									value={inputMessage}
									onChange={(e) => setInputMessage(e.target.value)}
									placeholder="Type your message here..."
									className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
								/>
								<div className="flex items-center p-3 pt-0">
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="ghost" size="icon">
												<Paperclip className="size-4" />
												<span className="sr-only">Attach file</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent side="top">Attach File</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button variant="ghost" size="icon">
												<Mic className="size-4" />
												<span className="sr-only">Use Microphone</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent side="top">Use Microphone</TooltipContent>
									</Tooltip>
									<Button type="submit" size="sm" className="ml-auto gap-1.5">
										Send Message
										<CornerDownLeft className="size-3.5" />
									</Button>
								</div>
							</form>
						</div>
					</main>
				</div>
			</div>
		</TooltipProvider>
	);
}
