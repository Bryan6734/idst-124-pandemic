/* eslint-disable */

import {
	Bird,
	Rabbit,
	Settings,
	Turtle,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";



export function MobileDrawer() {
    return (
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
											<Label htmlFor="model">Victim Model</Label>
											<Select onValueChange={(value) => {value}}>
												<SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
													<SelectValue placeholder="Select a model" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="genesis">
														<div className="flex items-start gap-3 text-muted-foreground">
															<Rabbit className="size-5" />
															<div className="grid gap-0.5">
																<p>
																	<span className="font-medium text-foreground">GPT4-Turbo</span>
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
																	<span className="font-medium text-foreground">Explorer</span>
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
																	<span className="font-medium text-foreground">Quantum</span>
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
				
									</fieldset>
									<fieldset className="grid gap-6 rounded-lg border p-4">
										<legend className="-ml-1 px-1 text-sm font-medium">Jailbreak</legend>
										<div className="grid gap-3">
											<Label htmlFor="methodology">Methodology</Label>
											<Select defaultValue="greedy-coordinate-gradient" onValueChange={(value) => {value}}>
												<SelectTrigger id="methodology" className="items-start [&_[data-description]]:hidden">
													<SelectValue placeholder="Select a methodology" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="greedy-coordinate-gradient">
														Greedy Coordinate Gradient
													</SelectItem>
													<SelectItem value="bijection-learning">
														Bijection Learning
													</SelectItem>
													<SelectItem value="cipher-attack">
														Cipher Attack
													</SelectItem>
													<SelectItem value="autodan">
														AutoDAN
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
    )
}