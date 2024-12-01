import Image from "next/image";
import {
	
	Book,
	
	LifeBuoy,
	
	Settings2,
	
	SquareTerminal,
	SquareUser,
	Sword,
	
	Moon,
	Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

export function Sidebar({ onNavigate }: { onNavigate: (page: string) => void }){
	const { theme, setTheme } = useTheme();
    return (
        <aside className="inset-y fixed left-0 z-20 flex h-full w-16 flex-col border-r bg-background">
					<div className="h-[57px] flex items-center justify-center border-b border-r-0">
						<Button variant="outline" size="icon" aria-label="Home">
							<Sword className="size-5 fill-foreground" />
						</Button>
					</div>
					<nav className="flex flex-col items-center gap-1 p-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="w-10 h-10 rounded-lg bg-muted" aria-label="Control Panel">
									<SquareTerminal className="size-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								Control Panel
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="w-10 h-10 rounded-lg" aria-label="Papers">
									<Book className="size-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								Papers
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="w-10 h-10 rounded-lg" aria-label="Settings" onClick={() => onNavigate('settings')}>
									<Settings2 className="size-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								Settings
							</TooltipContent>
						</Tooltip>
					</nav>
					<nav className="mt-auto flex flex-col items-center gap-1 p-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="w-10 h-10 rounded-lg" aria-label="Help">
									<LifeBuoy className="size-5" />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								Help
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost" size="icon" className="w-10 h-10 rounded-lg" aria-label="Account">
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
									className="w-10 h-10 rounded-lg"
									onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
    )
}