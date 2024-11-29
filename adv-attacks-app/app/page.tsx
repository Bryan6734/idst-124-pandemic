"use client";
import {
	Share,

} from "lucide-react";
import { useState } from "react";


import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IntroModal } from "@/components/bryan-ui/IntroModal"
import { Sidebar } from "@/components/bryan-ui/sidebar"
import { MobileDrawer } from "@/components/bryan-ui/MobileDrawer";
import { ControlPanels } from "@/components/bryan-ui/ControlPanels";
import { Chat } from "@/components/bryan-ui/Chat";

export const description =
	"An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.";


export default function Home() {
	const [showIntroModal, setShowIntroModal] = useState(true);
	
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    
	return (
		<TooltipProvider delayDuration={100}>
			<IntroModal showIntroModal={showIntroModal} 
        setShowIntroModal={setShowIntroModal} />
			<div className="grid h-screen w-full pl-[56px]">
				
                <Sidebar/>
				<div className="flex flex-col">
					<header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
						<h1 className="text-xl font-semibold">An Introduction to Adversarial Attacks</h1>
						
						<MobileDrawer/>
						<Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
							<Share className="size-3.5" />
							GitHub
						</Button>
					</header>
					<main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
						<ControlPanels/>
						<Chat/>
					</main>
				</div>
			</div>
		</TooltipProvider>
	);
}
