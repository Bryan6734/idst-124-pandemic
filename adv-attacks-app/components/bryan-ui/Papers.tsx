"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; 
import { AlertTriangle, Biohazard, ShieldCheck, Stethoscope, TestTube, Users, Info, Mail, Globe, HelpCircle, Landmark } from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts'; 
import Image from 'next/image';

import mask1 from '../../lib/masks-1.png';
import mask2 from '../../lib/masks-2.png';
import health1 from '../../lib/health-advisory-1.png';
import health2 from '../../lib/health-advisory-2.png';
import env1 from '../../lib/environmental-1.png';
import consp1 from '../../lib/conspiracy-1.png';
import consp2 from '../../lib/conspiracy-2.png';

// Sample data for the Tree Infectivity chart
const treeInfectivityData = [
  { species: 'Oak', infectivity: 95 },
  { species: 'Pine', infectivity: 25 },
  { species: 'Maple', infectivity: 20 },
  { species: 'Birch', infectivity: 15 },
  { species: 'Ash', infectivity: 10 },
  { species: 'Elm', infectivity: 90 },
  { species: 'Willow', infectivity: 5 },
  { species: 'Poplar', infectivity: 28 },
  { species: 'Sycamore', infectivity: 18 },
  { species: 'Cedar', infectivity: 85 },
];

// --- Generate Time Series Trend Data (Infected Trees, Mask Need, Mask Production) ---
const generateTrendData = () => {
  const data = [];
  const startDate = new Date(2024, 0, 1); // Start Jan 2024
  const endDate = new Date(2030, 11, 1); // End Dec 2030
  let currentDate = new Date(startDate);
  let infectedTrees = 10000; 
  let maskNeed = 3000; // Start need near 3k
  let maskProduction = 100; // Start production very low (~0k)
  const baseMonthlyGrowthFactor = 0.03; 
  let timeStep = 0; // To model production increase over time

  while (currentDate <= endDate) {
    const month = currentDate.getMonth(); // 0 = Jan, 11 = Dec
    let seasonalMultiplier = 1.0;
    let effectiveGrowthRate = 0; // Initialize effective rate for the month

    if (month >= 2 && month <= 4) { // Mar, Apr, May (Spring Spike)
      // Significantly higher positive growth rate during spring
      seasonalMultiplier = 6.0; // Increased spring spike multiplier
      effectiveGrowthRate = baseMonthlyGrowthFactor * seasonalMultiplier;
    } else { // Other months (Jun - Feb): Slight Decrease
      // Negative growth rate during off-peak seasons
      seasonalMultiplier = -0.3; // Negative multiplier for decrease
      // Mask need might still slightly increase or plateau even if trees decrease seasonally due to lag/awareness
      if (timeStep < 12) {
        maskNeed += maskNeed * 0.1 + infectedTrees * 0.002 + 100 * (0.8 + Math.random() * 0.4); // Exponential base + factor
      } else {
        maskNeed += infectedTrees * 0.005 + 200 * (0.8 + Math.random() * 0.4); // Original later year logic
      }
    }

    // Apply a small random variation to the growth/decrease
    effectiveGrowthRate *= (0.9 + Math.random() * 0.2); 

    const monthlyGrowth = infectedTrees * effectiveGrowthRate;
    infectedTrees += monthlyGrowth;

    // Ensure infected trees don't drop below a baseline (e.g., the initial count)
    if (infectedTrees < 10000) {
        infectedTrees = 10000 + Math.random() * 1000; // Prevent dropping too low, add slight noise
    }

    // Update mask need based on infected trees (more aggressively in spring)
    if (month >= 2 && month <= 4) {
      if (timeStep < 12) {
        maskNeed += maskNeed * 0.3 + infectedTrees * 0.08 + 1000 * (0.8 + Math.random() * 0.4); // Very high spring growth
      } else {
        maskNeed += infectedTrees * 0.05 + 500 * (0.8 + Math.random() * 0.4); // Original later year logic
      }
    }
    maskNeed = Math.max(maskNeed, maskProduction * 1.5); // Ensure need stays well above production

    // Simulate slow, constrained mask production increase (e.g., quadratic or slightly faster than linear)
    // Represents difficulty scaling up niche production
    // Slightly increase production rate, but keep it low
    if (timeStep < 12) { 
      maskProduction += 800 + (timeStep * 15) + (50 * (0.5 + Math.random() * 0.5));
    } else { 
      maskProduction += (timeStep * 1.0) + (30 * (0.5 + Math.random() * 0.5)); 
    }

    const year = currentDate.getFullYear();
    const monthStr = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    data.push({
      date: `${year}-${monthStr}`,
      infectedTrees: Math.round(infectedTrees),
      maskNeed: Math.round(maskNeed),
      maskProduction: Math.round(maskProduction)
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
    timeStep++; // Increment time step for production calculation
  }
  return data;
};

const trendData = generateTrendData();
// --- End Data Generation ---

// --- Generate Distribution Data (Consumer Access & Market Share) ---
// Simulate Consumer Access Data based on 2024 production
const generateConsumerAccessData = (productionData: typeof trendData) => {
  return productionData.slice(0, 12).map((monthData, index) => {
    const produced = monthData.maskProduction;
    // Heavily skewed distribution towards higher income brackets
    const ultraHighShare = 0.75 + (Math.random() * 0.1); // 75-85%
    const highShare = 0.15 + (Math.random() * 0.05); // 15-20%
    const midShare = 0.05 + (Math.random() * 0.03); // 5-8%
    // Low income gets the remainder, likely very small

    const ultraHigh = Math.round(produced * ultraHighShare);
    const high = Math.round(produced * highShare);
    const mid = Math.round(produced * midShare);
    const low = Math.max(0, produced - ultraHigh - high - mid); // Ensure non-negative

    return {
      date: monthData.date,
      'Low Income': low,
      'Mid Income': mid,
      'High Income': high,
      'Ultra-High Income': ultraHigh,
    };
  });
};
const consumerAccessData = generateConsumerAccessData(trendData);

// Define Online Content Breakdown Data
const mediaContentData = [
  { name: 'Political Propaganda', value: 35 },
  { name: 'Religious Extremism', value: 15 },
  { name: 'Corporate Disinformation', value: 20 },
  { name: 'Foreign State Actors', value: 10 },
  { name: 'Anecdotes/Social Media', value: 20 },
];
const MEDIA_CONTENT_COLORS = ['#ef4444', '#f97316', '#22c55e', '#3b82f6', '#a855f7']; // Red, Orange, Green, Blue, Purple

// Define Colors for Consumer Access Chart
const CONSUMER_ACCESS_COLORS = {
  'Low Income': '#fca5a5', // red-300
  'Mid Income': '#fdba74', // orange-300
  'High Income': '#86efac', // green-300
  'Ultra-High Income': '#67e8f9', // cyan-300
};

// Overall Info Quality Data (derived from previous breakdown)
const overallMisinfoPercent = 72;
const overallFactualPercent = 18;

// --- Bee Population Data ---
// Define Bee Species and Colors
const beeSpecies = [
  'Apis Mellifera', // Honeybee
  'Bombus Impatiens', // Bumblebee
  'Xylocopa Virginica', // Carpenter Bee
  'Megachile Rotundata', // Leafcutter Bee
  'Osmia Lignaria', // Mason Bee
  'Halictus Ligatus', // Sweat Bee
  'Andrena Milwaukeensis', // Mining Bee
  'Lasioglossum Corydalum' // Small Sweat Bee
];

// Interface for Bee Data objects
interface BeeDataPoint {
  year: string;
  [speciesName: string]: number | string; // Allows dynamic species keys
}

const beeColors = [
  '#facc15', // yellow-400
  '#f59e0b', // amber-500
  '#eab308', // yellow-500
  '#fbbf24', // amber-400
  '#fde047', // yellow-300
  '#fb923c', // orange-400
  '#ca8a04', // yellow-600
  '#d97706', // amber-600
];

// Generate Bee Population Data for Multiple Species (2024-2030 with staggered variance)
const generateBeeData = () => {
  const years = Array.from({ length: 7 }, (_, i) => 2024 + i); // 2024 to 2030
  const data: BeeDataPoint[] = years.map(year => ({ year: year.toString() }));
  const earlyImpactSpeciesCount = 4; // First 4 species are hit early

  beeSpecies.forEach((species, index) => {
    let currentPopulation = 100;
    const isEarlyImpact = index < earlyImpactSpeciesCount;
    // Define target minimums - lower for early impact
    const minPopulationTarget = isEarlyImpact ? (20 + Math.random() * 15) : (30 + Math.random() * 20); // Early: 20-35, Later: 30-50

    data.forEach((point, yearIndex) => {
      const currentYear = years[yearIndex];

      if (currentYear === 2024) {
        point[species] = 100;
        currentPopulation = 100;
        return; // Skip calculation for the first year
      }

      let declineRate = 1.0; // Assume stable if no other factors apply
      let volatilityFactor = 0.02; // Base volatility for stable periods

      // Determine decline rate based on group and year
      if (isEarlyImpact) {
        // Early group declines throughout
        declineRate = 0.60 + Math.random() * 0.20; // Heavier decline: 60-80% of previous year
        volatilityFactor = 0.05 + Math.random() * 0.05;
      } else if (currentYear >= 2027) {
        // Later group declines from 2027 onwards
        declineRate = 0.65 + Math.random() * 0.20; // Significant decline: 65-85% of previous year
        volatilityFactor = 0.06 + Math.random() * 0.06;
      } else {
        // Later group before 2027 - relatively stable
        declineRate = 0.97 + Math.random() * 0.05; // Slight fluctuation around 100%: 97-102%
      }

      // Apply decline and volatility
      const randomFluctuation = (Math.random() - 0.5) * 2 * volatilityFactor; // Symmetric fluctuation
      currentPopulation *= (declineRate + randomFluctuation);
      
      // Apply a floor based on the target minimum, preventing instant drops to target
      let effectiveFloor = 5; // Absolute minimum
      if(isEarlyImpact || currentYear >= 2027) {
        // Gradually approach the target floor over the decline period
        const startYear = isEarlyImpact ? 2024 : 2027;
        const declineDuration = 2030 - startYear;
        const yearsIntoDecline = currentYear - startYear;
        const progress = declineDuration > 0 ? yearsIntoDecline / declineDuration : 1;
        // Interpolate between current pop and target floor based on progress
        effectiveFloor = Math.max(effectiveFloor, currentPopulation * (1-progress) + minPopulationTarget * progress);
      }
      
      // Set the value, ensuring bounds (5 to 100)
      currentPopulation = Math.max(5, Math.min(100, Math.round(Math.max(effectiveFloor, currentPopulation))));
      point[species] = currentPopulation;
    });
  });

  return data;
};
const multiSpeciesBeeData = generateBeeData();

// --- End Distribution Data Generation ---

export function Papers() {
  return (
    <div className="p-6 pt-10 max-w-4xl mx-auto space-y-8">
      <div className="pt-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Biohazard className="text-red-500" /> P-25 Virus
        </h2>
        <p className="text-muted-foreground mb-6 text-lg">
          Information about the Pollenation Virus, P-25. 
        </p>
      </div>

      {/* About Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Info className="text-blue-500 h-6 w-6" />
          About P-25
        </h3>
        <div className="space-y-3 pl-8"> 
          <div>
            <span className="font-semibold">What is P-25?</span>
            <p className="mt-1 text-muted-foreground">
              P-25 is a disease in humans caused by inhalation of pollen containing the mutated P-25 gene. Pollen cells with this gene elicit an unusually strong immune response, sometimes fatal. P-25 spreads among plants via bees and infects humans through airborne pollen, with global warming increasing severity.
            </p>
          </div>
          <div>
            <span className="font-semibold">Symptoms:</span>
            <ul className="list-disc ml-6 text-muted-foreground">
              <li>Early: cold-like symptoms (sore throat, runny nose, fever, cough)</li>
              <li>Severe: airway constriction, mucus buildup in lungs, potentially fatal</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Risk Factors */}
      <section>
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-yellow-500 h-6 w-6" />
          Risk Factors
        </h3>
        <div className="pl-8"> 
          <ul className="list-disc ml-6 text-muted-foreground space-y-1">
            <li>Asthma or chronic respiratory illness</li>
            <li>History of pneumonia</li>
            <li>Severe seasonal allergies</li>
            <li>Immunocompromised</li>
            <li>Older than 65 or younger than 3 years old</li>
            <li>Frequent smoker</li>
          </ul>
        </div>
      </section>
      
      {/* P-25 Trends Section - NEW */} 
      <section>
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
           {/* You can add an icon here if you like, e.g., <TrendingUp /> from lucide-react */}
           📈 P-25 Trends
        </h3>
        <div className="pl-8 space-y-8"> {/* Removed grid, single chart now; Added space-y for multiple cards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pollen Infectivity by Tree Species</CardTitle>
            </CardHeader>
            <CardContent>
               <ResponsiveContainer width="100%" height={400}> {/* Increased height */}
                  <BarChart data={treeInfectivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="species" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="infectivity" fill="#FFD700" name="Pollen Infectivity Score" />
                 </BarChart>
               </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Projected Total Infected Trees (USA)</CardTitle>
              <p className="text-sm text-muted-foreground pt-1">
                Note the significant seasonal spikes during Spring (Mar-May) due to increased pollen production.
              </p>
            </CardHeader>
            
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                 <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis 
                      tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(value)} 
                      domain={['auto', 'auto']} 
                    />
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en-US').format(value as number)} />
                    <Legend />
                    <Line type="monotone" dataKey="infectedTrees" stroke="#dc2626" dot={false} name="Infected Trees" />
                 </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">High-Tech Mask Availability (Initial Period)</CardTitle>
                <p className="text-sm text-muted-foreground pt-1">
                  Estimated need versus limited production/distribution during the first year (2024).
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={trendData.slice(0, 12)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis 
                      tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(value)} 
                      domain={['auto', 'auto']}
                    />
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en-US').format(value as number)} />
                    <Legend />
                    <Line type="monotone" dataKey="maskNeed" stroke="#f97316" dot={false} name="Estimated Need" />
                    <Line type="monotone" dataKey="maskProduction" stroke="#22c55e" dot={false} name="Available Production" /> {/* Changed to green */} 
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mask Distribution by Income (2024)</CardTitle>
                <p className="text-sm text-muted-foreground pt-1">
                  Estimated allocation of limited mask supply, showing disproportionate access for higher income brackets.
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={consumerAccessData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date) => date.substring(5)} />{/* Show only month */}
                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(value)} />
                    <Tooltip formatter={(value) => new Intl.NumberFormat('en-US').format(value as number)} />
                    <Legend />
                    <Area type="monotone" dataKey="Low Income" stackId="1" stroke={CONSUMER_ACCESS_COLORS['Low Income']} fill={CONSUMER_ACCESS_COLORS['Low Income']} />
                    <Area type="monotone" dataKey="Mid Income" stackId="1" stroke={CONSUMER_ACCESS_COLORS['Mid Income']} fill={CONSUMER_ACCESS_COLORS['Mid Income']} />
                    <Area type="monotone" dataKey="High Income" stackId="1" stroke={CONSUMER_ACCESS_COLORS['High Income']} fill={CONSUMER_ACCESS_COLORS['High Income']} />
                    <Area type="monotone" dataKey="Ultra-High Income" stackId="1" stroke={CONSUMER_ACCESS_COLORS['Ultra-High Income']} fill={CONSUMER_ACCESS_COLORS['Ultra-High Income']} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mb-6">
            {/* Left Side: Misinformation Pie Chart (70%) */}
            <Card className="md:col-span-7">
              {/* Card: Sources of Misinformation */}
              <CardHeader>
                <CardTitle className="text-lg">Sources of P-25 Misinformation</CardTitle>
                <p className="text-sm text-muted-foreground pt-1">
                  Estimated breakdown of common sources driving misinformation about the virus online.
                </p>
              </CardHeader>
              <CardContent className="flex items-center justify-center pt-0"> {/* Reduced top padding */}
                <ResponsiveContainer width="100%" height={220}> {/* Reduced height */}
                  <PieChart>
                    <Pie
                      data={mediaContentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={85} // Reduced radius to give labels more space
                      fill="#8884d8"
                      dataKey="value"
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                        const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                        // Only show label if percent is large enough
                        return percent > 0.03 ? (
                          <text x={x} y={y} fill="currentColor" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs">
                            {`${mediaContentData[index].name} (${(percent * 100).toFixed(0)}%)`}
                          </text>
                        ) : null;
                      }}
                    >
                      {mediaContentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={MEDIA_CONTENT_COLORS[index % MEDIA_CONTENT_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            {/* Right Side: Overall Quality Cards (30%) */}
            <div className="md:col-span-3 flex flex-col gap-4">
              <Card className="bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-red-700 dark:text-red-300">Misinformation Share</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-red-600 dark:text-red-400">{overallMisinfoPercent}%</div>
                  <p className="text-xs text-red-500 dark:text-red-400/80 pt-1">
                    Estimated proportion of online P-25 content classified as misleading or false.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Factual Share</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400">{overallFactualPercent}%</div>
                  <p className="text-xs text-green-500 dark:text-green-400/80 pt-1">
                    Estimated proportion of online P-25 content classified as factual reporting.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mb-6">
            {/* Bee Population Decline Chart */}
            <Card className="md:col-span-10"> {/* Make chart span full width */}
              <CardHeader>
                <CardTitle className="text-lg font-semibold">🐝 Ecosystem Under Stress: Bee Species Population Trends</CardTitle>
                <CardDescription>Projected Population Index (2024-2030, Relative to 2024 Baseline)</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={multiSpeciesBeeData} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
                    <XAxis 
                      dataKey="year" 
                      padding={{ left: 10, right: 10 }}
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))', 
                        borderColor: 'hsl(var(--border))',
                        color: 'hsl(var(--foreground))',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                       }}
                      labelFormatter={(label) => `Year: ${label}`}
                      formatter={(value: number | string, name: string) => [`${value}%`, name]}
                      itemSorter={(item) => beeSpecies.indexOf(item.dataKey as string)} // Ensure consistent order
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                      formatter={(value) => <span style={{ color: 'hsl(var(--muted-foreground))' }}>{value}</span>}
                    />
                    {beeSpecies.map((species, index) => (
                      <Line 
                        key={species}
                        type="monotone" 
                        dataKey={species} 
                        stroke={beeColors[index % beeColors.length]} 
                        strokeWidth={1.5} 
                        dot={false} 
                        activeDot={{ r: 5, strokeWidth: 1 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testing */}
      <section>
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <TestTube className="text-green-500 h-6 w-6" />
          Testing
        </h3>
        <p className="text-muted-foreground pl-8"> 
          P-25 symptoms resemble pollen allergies, so early detection is crucial. Testing centers are available at public health centers, schools, hospitals, and pop-up clinics. Primary methods: nasal and throat swabs. At-home tests are in development.
        </p>
      </section>

      {/* Prevention */}
      <section>
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <ShieldCheck className="text-lime-600 h-6 w-6" />
          High-Tech Mask Prevention
        </h3>
        <div className="text-muted-foreground pl-8"> 
          <div className="mb-4"> {/* Container for video */}
            <iframe 
              src="https://drive.google.com/file/d/1F_jdqIpGr_wqz2S4SIGOVPlBByXGQnEh/preview" 
              width="100%" 
              height="480" 
              allow="autoplay; encrypted-media" 
              allowFullScreen
              title="P-25 Prevention Video"
              className="rounded-md border"
            ></iframe>
          </div>
          <ul className="list-disc ml-6 mb-6"> {/* Added margin bottom */}
            <li>Wear high-tech masks when possible</li>
            <li>Seal windows effectively</li>
            <li>Stay informed</li>
          </ul>
          {/* Image Grid for Masks and Health Advisories */}
          <div className="grid grid-cols-2 gap-4">
            <Image src={mask1} alt="High-tech mask example 1" className="rounded-md border" placeholder="blur" />
            <Image src={mask2} alt="High-tech mask example 2" className="rounded-md border" placeholder="blur" />
            <Image src={health1} alt="Health Advisory 1" className="rounded-md border" placeholder="blur" />
            <Image src={health2} alt="Health Advisory 2" className="rounded-md border" placeholder="blur" />
          </div>
        </div>
      </section>

      {/* Treatment */}
      <section>
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Stethoscope className="text-cyan-600 h-6 w-6" />
          Treatment
        </h3>
        <p className="text-muted-foreground pl-8"> 
          There is currently no cure for P-25, but research is ongoing. Current protocol: treat symptoms with anti-inflammatory drugs, cough suppressants, and decongestants. Seek professional help if symptoms become severe.
        </p>
      </section>

      {/* Origins/Causes */}
      <section>
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Landmark className="text-emerald-700 h-6 w-6" />
          Origins & Causes
        </h3>
        <div className="pl-8"> {/* Indent content */} 
          <Image src={env1} alt="Environmental Poster" className="rounded-md border w-full max-w-md mx-auto" placeholder="blur" /> {/* Center and constrain width */}
        </div>
      </section>

      {/* Other Resources */}
      <section>
        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="text-indigo-700 h-6 w-6" />
          Conspiracy Theories
        </h3>
        <div className="pl-8"> {/* Indent content */}
          <p>Several conspiracy theories exist about the origins of P-25, including claims of government experiments and natural mutations.</p>
          <div className="grid grid-cols-2 gap-4">
            <Image src={consp1} alt="Conspiracy Theory Image 1" className="rounded-md border" placeholder="blur" />
            <Image src={consp2} alt="Conspiracy Theory Image 2" className="rounded-md border" placeholder="blur" />
          </div>
          {/* You can add back text descriptions or links if needed */}
        </div>
      </section>

    </div>
  );
}
