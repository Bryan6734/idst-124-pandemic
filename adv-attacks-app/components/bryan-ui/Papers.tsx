"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";

interface Paper {
  id: string;
  title: string;
  authors: string;
  year: number;
  description: string;
  keyPoints: string[];
  link: string;
  category: string;
}

const papers: Paper[] = [
  {
    id: "paper1",
    title: "Lorem Ipsum Adversarial Examples",
    authors: "John Doe, Jane Smith, Robert Johnson",
    year: 2023,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    keyPoints: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Sed do eiusmod tempor incididunt ut labore",
      "Ut enim ad minim veniam, quis nostrud exercitation",
      "Duis aute irure dolor in reprehenderit"
    ],
    link: "https://arxiv.org/abs/0000.0000",
    category: "Attack Methods"
  },
  {
    id: "paper2",
    title: "Deep Learning Models and Lorem Ipsum",
    authors: "Alice Brown, Charlie Davis, Eve Wilson",
    year: 2023,
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    keyPoints: [
      "Ut enim ad minim veniam, quis nostrud",
      "Duis aute irure dolor in reprehenderit",
      "Excepteur sint occaecat cupidatat non proident",
      "Sunt in culpa qui officia deserunt mollit"
    ],
    link: "https://arxiv.org/abs/0000.0001",
    category: "Defense Methods"
  },
  {
    id: "paper3",
    title: "Understanding Lorem Ipsum Attacks",
    authors: "Michael Lee, Sarah Parker, David Miller",
    year: 2023,
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    keyPoints: [
      "Duis aute irure dolor in reprehenderit",
      "Excepteur sint occaecat cupidatat",
      "Sunt in culpa qui officia deserunt",
      "Lorem ipsum dolor sit amet consectetur"
    ],
    link: "https://arxiv.org/abs/0000.0002",
    category: "Analysis"
  },
  {
    id: "paper4",
    title: "Lorem Ipsum in Machine Learning",
    authors: "Thomas Anderson, Emma White, James Taylor",
    year: 2023,
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    keyPoints: [
      "Excepteur sint occaecat cupidatat non",
      "Sunt in culpa qui officia deserunt",
      "Sed ut perspiciatis unde omnis",
      "Nemo enim ipsam voluptatem quia"
    ],
    link: "https://arxiv.org/abs/0000.0003",
    category: "Survey"
  }
];

export function Papers() {
  const [openCards, setOpenCards] = useState<Set<string>>(new Set());

  const toggleCard = (id: string) => {
    const newOpenCards = new Set(openCards);
    if (newOpenCards.has(id)) {
      newOpenCards.delete(id);
    } else {
      newOpenCards.add(id);
    }
    setOpenCards(newOpenCards);
  };

  return (
    <div className="p-6 pt-10 max-w-4xl mx-auto space-y-8">
      <div className="pt-4">
        <h2 className="text-2xl font-bold mb-2">Research Papers</h2>
        <p className="text-muted-foreground mb-6">
          A curated collection of influential papers in the field of adversarial attacks and defenses.
        </p>
      </div>
      
      <div className="grid gap-6">
        {papers.map((paper) => (
          <Card key={paper.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{paper.title}</CardTitle>
                  <CardDescription className="mt-1.5">
                    {paper.authors} • {paper.year} • {paper.category}
                  </CardDescription>
                </div>
                <Button variant="outline" size="icon" asChild className="ml-2">
                  <a href={paper.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{paper.description}</p>
              <Collapsible open={openCards.has(paper.id)} onOpenChange={() => toggleCard(paper.id)}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between">
                    Key Points
                    <ChevronDown className={`size-4 transition-transform ${openCards.has(paper.id) ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                    {paper.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}