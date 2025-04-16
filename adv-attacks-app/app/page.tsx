/* eslint-disable */
"use client";

import { User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IntroModal } from "@/components/bryan-ui/IntroModal"
import { Layout } from "@/components/bryan-ui/Layout"
import { MobileDrawer } from "@/components/bryan-ui/MobileDrawer";

const description =
	"Your trusted source for information about the P-25 virus: symptoms, prevention, risk factors, and the latest research.";

export default function Home() {
	const [showIntroModal, setShowIntroModal] = useState(true);

	return (
		<TooltipProvider delayDuration={100}>
			<IntroModal showIntroModal={showIntroModal} 
        setShowIntroModal={setShowIntroModal} />
			<div className="h-screen w-full">
				<header className="fixed top-0 right-0 left-16 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4 border-l-0">
					<h1 className="text-xl font-semibold">P-25 Virus Information Center</h1>
					<MobileDrawer/>
					<a href="https://bryansukidi.com" target="_blank" rel="noopener noreferrer" className="ml-auto">
						<Button variant="outline" size="sm" className="gap-1.5 text-sm">
							<User className="size-3.5 stroke-red-500 dark:stroke-red-400" />
							IDST-124
						</Button>
					</a>
				</header>
				<Layout />
			</div>
		</TooltipProvider>
	);
}
