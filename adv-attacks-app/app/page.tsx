"use client";

import { User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IntroModal } from "@/components/bryan-ui/IntroModal"
import { Layout } from "@/components/bryan-ui/Layout"
import { MobileDrawer } from "@/components/bryan-ui/MobileDrawer";

export const description =
	"An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.";

export default function Home() {
	const [showIntroModal, setShowIntroModal] = useState(true);

	return (
		<TooltipProvider delayDuration={100}>
			<IntroModal showIntroModal={showIntroModal} 
        setShowIntroModal={setShowIntroModal} />
			<div className="h-screen w-full">
				<header className="fixed top-0 right-0 left-16 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4 border-l-0">
					<h1 className="text-xl font-semibold">An Introduction to Adversarial Attacks</h1>
					<MobileDrawer/>
					<a href="https://bryansukidi.com" target="_blank" rel="noopener noreferrer" className="ml-auto">
						<Button variant="outline" size="sm" className="gap-1.5 text-sm">
							<User className="size-3.5 stroke-red-500 dark:stroke-red-400" />
							By Bryan Sukidi
						</Button>
					</a>
				</header>
				<Layout />
			</div>
		</TooltipProvider>
	);
}
