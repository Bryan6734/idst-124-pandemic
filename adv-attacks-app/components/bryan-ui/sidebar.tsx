/* eslint-disable */
import {
  BookOpen,
  // BookText,
  SquareTerminal,
  // Terminal,
  Shield,
  Moon,
  Sun,
  HelpCircle,
  Info,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

export function Sidebar({ onNavigate }: { onNavigate: (page: string) => void }){
  const { theme, setTheme } = useTheme();
  const [selectedPage, setSelectedPage] = useState('control-panel');

  const handleNavigate = (page: string) => {
    if (page === 'help') {
      onNavigate('help');
      return;
    }
    setSelectedPage(page);
    onNavigate(page);
  };

  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full w-16 flex-col border-r bg-background">
      <div className="h-[57px] flex items-center justify-center border-b border-r-0">
        <Button 
          variant="outline" 
          size="icon" 
          aria-label="Home"
          className="bg-red-100 hover:bg-red-200 dark:bg-red-950 dark:hover:bg-red-900 transition-colors"
        >
          <Shield className="size-5 stroke-red-500 dark:stroke-red-400" />
        </Button>
      </div>
      <nav className="flex flex-col items-center gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-10 h-10 rounded-lg ${selectedPage === 'control-panel' ? 'bg-muted' : ''}`}
              aria-label="Chat"
              onClick={() => handleNavigate('control-panel')}
            >
              <SquareTerminal className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Chat
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-10 h-10 rounded-lg ${selectedPage === 'papers' ? 'bg-muted' : ''}`}
              aria-label="Information"
              onClick={() => handleNavigate('papers')}
            >
              <Info className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Information
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`w-10 h-10 rounded-lg ${selectedPage === 'settings' ? 'bg-muted' : ''}`}
              aria-label="FAQ"
              onClick={() => handleNavigate('settings')}
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            FAQ
          </TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-10 h-10 rounded-lg"
              aria-label="Help"
              onClick={() => handleNavigate('help')}
            >
              <HelpCircle className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Help
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