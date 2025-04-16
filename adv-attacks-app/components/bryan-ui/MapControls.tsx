"use client";
import {
	Calendar,
	Clock,
	Globe,
	BarChart,
	Play,
	Pause,
	RefreshCw
} from "lucide-react";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Array of month names for display
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface MapControlsProps {
    /** Callback when a date is selected using the slider */
    onDateSelect?: (date: { year: number; month: number }) => void;
    /** Callback when a region is selected from the dropdown */
    onRegionSelect?: (region: string) => void;
    /** Callback to reset the simulation to initial state */
    onReset?: () => void;
    /** The currently selected date */
    selectedDate?: { year: number; month: number };
}

export function MapControls({ 
    onDateSelect,
    onRegionSelect,
    onReset,
    selectedDate: initialSelectedDate = { year: 2024, month: 1 }
}: MapControlsProps) {
    const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
    const [selectedRegion, setSelectedRegion] = useState("global");
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const isFirstRender = useRef(true);
    
    // Base interval in milliseconds - will be divided by playback speed
    const BASE_INTERVAL = 1000; // Increased from 500ms to 1000ms to make 1x speed slower
    
    // Calculate the total months since Jan 2024 (0-based index)
    const totalMonths = (selectedDate.year - 2024) * 12 + (selectedDate.month - 1);
    // Calculate the maximum total months (Dec 2030)
    const maxTotalMonths = (2030 - 2024) * 12 + 11; // 83 months total

    // Reset all selections to default values
    const resetSelections = () => {
        setSelectedDate({ year: 2024, month: 1 });
        setSelectedRegion("global");
        setIsAutoPlaying(false);
        setPlaybackSpeed(1);
        if (autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
            autoPlayIntervalRef.current = null;
        }
        onDateSelect?.({ year: 2024, month: 1 });
        onRegionSelect?.("global");
    };

    // Handle reset button click
    const handleReset = () => {
        resetSelections();
        onReset?.();
    };

    // Handle date change from slider
    const handleDateChange = (value: number[]) => {
        const monthsFromStart = value[0];
        const year = 2024 + Math.floor(monthsFromStart / 12);
        const month = (monthsFromStart % 12) + 1; // 1-based month
        
        const newDate = { year, month };
        setSelectedDate(newDate);
        onDateSelect?.(newDate);
    };

    // Function to advance to the next month
    const advanceMonth = () => {
        setSelectedDate(prev => {
            let newMonth = prev.month + 1;
            let newYear = prev.year;
            
            // Handle month rollover
            if (newMonth > 12) {
                newMonth = 1;
                newYear += 1;
            }
            
            // Check if we've reached the end date (Dec 2030)
            if (newYear > 2030 || (newYear === 2030 && newMonth > 12)) {
                if (autoPlayIntervalRef.current) {
                    clearInterval(autoPlayIntervalRef.current);
                    autoPlayIntervalRef.current = null;
                }
                setIsAutoPlaying(false);
                return { year: 2030, month: 12 };
            }
            
            const newDate = { year: newYear, month: newMonth };
            onDateSelect?.(newDate);
            return newDate;
        });
    };
    
    // Start or stop the auto-play
    const toggleAutoPlay = () => {
        if (isAutoPlaying) {
            // Stop auto-play
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
                autoPlayIntervalRef.current = null;
            }
            setIsAutoPlaying(false);
        } else {
            // Start auto-play
            setIsAutoPlaying(true);
            
            // Advance once immediately to show instant feedback
            advanceMonth();
            
            // The interval will be set up in the useEffect that depends on isAutoPlaying
        }
    };
    
    // Main effect to handle auto-playing state
    useEffect(() => {
        // Skip the first render to avoid running on component mount
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        
        // If auto-playing is enabled, set up the interval
        if (isAutoPlaying) {
            // Clear any existing interval first
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
            }
            
            // Set up the interval to advance months
            autoPlayIntervalRef.current = setInterval(() => {
                advanceMonth();
            }, BASE_INTERVAL / playbackSpeed);
        } else {
            // If not auto-playing, clear the interval
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
                autoPlayIntervalRef.current = null;
            }
        }
        
        // Clean up on unmount or when dependencies change
        return () => {
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
                autoPlayIntervalRef.current = null;
            }
        };
    }, [isAutoPlaying, playbackSpeed]);
    
    // Update interval when playback speed changes
    useEffect(() => {
        // Only update if we're already playing
        if (isAutoPlaying && autoPlayIntervalRef.current) {
            clearInterval(autoPlayIntervalRef.current);
            
            // Set up new interval with updated speed
            autoPlayIntervalRef.current = setInterval(() => {
                advanceMonth();
            }, BASE_INTERVAL / playbackSpeed);
        }
    }, [playbackSpeed]);
    
    // Clean up interval on unmount
    useEffect(() => {
        return () => {
            if (autoPlayIntervalRef.current) {
                clearInterval(autoPlayIntervalRef.current);
                autoPlayIntervalRef.current = null;
            }
        };
    }, []);

	return (
		<div className="relative flex-col items-start gap-8 md:flex">
			<div className="grid w-full items-start gap-6">
				<fieldset className="grid gap-6 rounded-lg border p-4">
					<legend className="-ml-1 px-1 text-sm font-medium whitespace-nowrap">P-25 Virus Spread Simulator</legend>
					<div className="grid gap-5">
						{/* Region Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="region" className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                Region
                            </Label>
                            <Select 
                                value={selectedRegion}
                                onValueChange={(value) => {
                                    setSelectedRegion(value);
                                    onRegionSelect?.(value);
                                }}>
                                <SelectTrigger id="region">
                                    <SelectValue placeholder="Select a region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="global">Global</SelectItem>
                                    <SelectItem value="north-america">North America</SelectItem>
                                    <SelectItem value="south-america">South America</SelectItem>
                                    <SelectItem value="europe">Europe</SelectItem>
                                    <SelectItem value="africa">Africa</SelectItem>
                                    <SelectItem value="asia">Asia</SelectItem>
                                    <SelectItem value="oceania">Oceania</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        {/* Date Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="date" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Date: {MONTH_NAMES[selectedDate.month - 1]} {selectedDate.year}
                            </Label>
                            <input
                                id="date"
                                type="range"
                                min={0}
                                max={maxTotalMonths}
                                step={1}
                                value={totalMonths}
                                onChange={(e) => handleDateChange([parseInt(e.target.value)])}
                                disabled={isAutoPlaying}
                                className="w-full"
                            />
                        </div>
                        
                        {/* Playback Speed */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Playback Speed
                            </Label>
                            <div className="flex gap-2">
                                <Button 
                                    type="button"
                                    variant={playbackSpeed === 1 ? "default" : "outline"}
                                    className={cn("flex-1", !isAutoPlaying && "opacity-50")} 
                                    onClick={() => setPlaybackSpeed(1)}
                                    disabled={!isAutoPlaying}
                                >
                                    1x
                                </Button>
                                <Button 
                                    type="button"
                                    variant={playbackSpeed === 2 ? "default" : "outline"}
                                    className={cn("flex-1", !isAutoPlaying && "opacity-50")} 
                                    onClick={() => setPlaybackSpeed(2)}
                                    disabled={!isAutoPlaying}
                                >
                                    2x
                                </Button>
                                <Button 
                                    type="button"
                                    variant={playbackSpeed === 5 ? "default" : "outline"}
                                    className={cn("flex-1", !isAutoPlaying && "opacity-50")} 
                                    onClick={() => setPlaybackSpeed(5)}
                                    disabled={!isAutoPlaying}
                                >
                                    5x
                                </Button>
                            </div>
                        </div>
                        
                        {/* Statistics */}
                        <Card className="mt-2">
                            <CardContent className="pt-4 px-4 pb-3">
                                <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                                    <BarChart className="h-4 w-4" />
                                    P-25 Statistics ({MONTH_NAMES[selectedDate.month - 1]} {selectedDate.year})
                                </h3>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Infection Rate:</span>
                                        <span>{Math.min(5 + totalMonths * 0.25, 95).toFixed(1)}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Mortality Rate:</span>
                                        <span>{Math.min(1 + totalMonths * 0.04, 25).toFixed(1)}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Mask Availability:</span>
                                        <span>{Math.max(80 - totalMonths * 0.33, 20).toFixed(1)}%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        {/* Control Buttons */}
                        <div className="flex gap-2 mt-2">
                            <Button 
                                variant="secondary" 
                                className="flex-1"
                                onClick={handleReset}
                                type="button"
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Reset
                            </Button>
                            <Button 
                                variant={isAutoPlaying ? "destructive" : "default"}
                                className="flex-1 gap-2"
                                onClick={toggleAutoPlay}
                                type="button"
                            >
                                {isAutoPlaying ? (
                                    <>
                                        <Pause className="h-4 w-4" />
                                        Pause
                                    </>
                                ) : (
                                    <>
                                        <Play className="h-4 w-4" />
                                        Play
                                    </>
                                )}
                            </Button>
                        </div>
					</div>
				</fieldset>
			</div>
		</div>
	);
}
