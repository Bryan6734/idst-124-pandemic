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


export function Sidebar(){

	const { theme, setTheme } = useTheme();
    return (
        <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
					<div className="border-b p-2">
						<Button variant="outline" size="icon" aria-label="Home">
							<Sword className="size-5 fill-foreground" />
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