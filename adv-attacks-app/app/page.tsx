"use client";

import { User } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IntroModal } from "@/components/bryan-ui/IntroModal"
import { Sidebar } from "@/components/bryan-ui/sidebar"
import { MobileDrawer } from "@/components/bryan-ui/MobileDrawer";
import { ControlPanels } from "@/components/bryan-ui/ControlPanels";
import { Chat } from "@/components/bryan-ui/Chat";
import { AttackProgress } from "@/components/bryan-ui/AttackProgress";

export const description =
	"An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.";

export default function Home() {
	const [showIntroModal, setShowIntroModal] = useState(true);
	
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [selectedPrompt, setSelectedPrompt] = useState<string>();
    const [selectedModel, setSelectedModel] = useState<string>();
    const [selectedAttack, setSelectedAttack] = useState<string>("");
    const [isAttacking, setIsAttacking] = useState(false);

    // Create ref to Chat component's updateStepMessage function
    const chatRef = useRef<{ 
        updateStepMessage: (desc: string, step: number, bijection: any) => void; 
        createSkeleton: () => void;
        resetChat: () => void;
        killAnimations: () => void;
    }>();

    const resetAllStates = () => {
        if (isAttacking) {
            chatRef.current?.killAnimations();
        }
        setSelectedPrompt(undefined);
        setSelectedAttack("");
        setSelectedModel("");  
        setIsAttacking(false);
        chatRef.current?.resetChat();
    };

    const handleParameterChange = (setter: Function, value: string) => {
        if (isAttacking) {
            resetAllStates();
        }
        setter(value);
    };

    const handlePromptChange = (value: string) => {
        if (isAttacking) {
            setIsAttacking(false); // Just disable attacking state but keep other selections
            chatRef.current?.resetChat();
        }
        setSelectedPrompt(value);
    };

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
						<a href="https://bryansukidi.com" target="_blank" rel="noopener noreferrer" className="ml-auto">
							<Button variant="outline" size="sm" className="gap-1.5 text-sm">
								<User className="size-3.5" />
								By Bryan Sukidi
							</Button>
						</a>
					</header>
					<main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
						<ControlPanels 
                            onPromptSelect={handlePromptChange}
                            onModelSelect={(value) => handleParameterChange(setSelectedModel, value)}
                            onAttackSelect={(value) => handleParameterChange(setSelectedAttack, value)}
                            isAttacking={isAttacking}
                            onStepReady={(desc, step, bijection) => {
                                if (!isAttacking) return; // Only process steps if attack is active
                                chatRef.current?.updateStepMessage(desc, step, bijection);
                            }}
                            onContinue={() => {
                                if (!isAttacking) return; // Only continue if attack is active
                                chatRef.current?.createSkeleton();
                            }}
                            onReset={resetAllStates}
                        />
                        <div className="flex flex-col gap-4 lg:col-span-2">
                            <div className="flex-grow">
                                <Chat
                                    ref={chatRef}
                                    selectedPrompt={selectedPrompt}
                                    selectedModel={selectedModel}
                                    selectedAttack={selectedAttack}
                                    onAttackStart={() => setIsAttacking(true)}
                                    onAttackComplete={() => setIsAttacking(false)}
                                />
                            </div>
                        </div>
					</main>
				</div>
			</div>
		</TooltipProvider>
	);
}
