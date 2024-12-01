"use client";

import {
  Card,
  CardContent,
  CardDescription,
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
import { cn } from "@/lib/utils";

interface TruncatedTextProps {
  text: string;
  maxLines?: number;
}

function TruncatedText({ text, maxLines = 5 }: TruncatedTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "text-sm text-muted-foreground overflow-hidden transition-all duration-500 ease-in-out",
          !isHovered ? "max-h-[100px]" : "max-h-[1000px]"
        )}
      >
        <p>
          {text}
        </p>
      </div>
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent transition-all duration-500 ease-in-out",
          isHovered ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
}

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
    title: "Universal and Transferable Adversarial Attacks on Aligned Language Models",
    authors: "Andy Zou, Zifan Wang, Nicholas Carlini, Milad Nasr, J. Zico Kolter, Matt Fredrikson",
    year: 2023,
    description: `Because "out-of-the-box" large language models are capable of generating a great deal of objectionable content, recent work has focused on aligning these models in an attempt to prevent undesirable generation. While there has been some success at circumventing these measures -- so-called "jailbreaks" against LLMs -- these attacks have required significant human ingenuity and are brittle in practice. In this paper, we propose a simple and effective attack method that causes aligned language models to generate objectionable behaviors. Specifically, our approach finds a suffix that, when attached to a wide range of queries for an LLM to produce objectionable content, aims to maximize the probability that the model produces an affirmative response (rather than refusing to answer). However, instead of relying on manual engineering, our approach automatically produces these adversarial suffixes by a combination of greedy and gradient-based search techniques, and also improves over past automatic prompt generation methods.
Surprisingly, we find that the adversarial prompts generated by our approach are quite transferable, including to black-box, publicly released LLMs. Specifically, we train an adversarial attack suffix on multiple prompts (i.e., queries asking for many different types of objectionable content), as well as multiple models (in our case, Vicuna-7B and 13B). When doing so, the resulting attack suffix is able to induce objectionable content in the public interfaces to ChatGPT, Bard, and Claude, as well as open source LLMs such as LLaMA-2-Chat, Pythia, Falcon, and others. In total, this work significantly advances the state-of-the-art in adversarial attacks against aligned language models, raising important questions about how such systems can be prevented from producing objectionable information. `,
    keyPoints: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Sed do eiusmod tempor incididunt ut labore",
      "Ut enim ad minim veniam, quis nostrud exercitation",
      "Duis aute irure dolor in reprehenderit"
    ],
    link: "https://arxiv.org/abs/2307.15043",
    category: "GCG"
  },
  {
    id: "paper2",
    title: "AutoDAN: Generating Stealthy Jailbreak Prompts on Aligned Large Language Models",
    authors: "Xiaogeng Liu, Nan Xu, Muhao Chen, Chaowei Xiao",
    year: 2023,
    description: "The aligned Large Language Models (LLMs) are powerful language understanding and decision-making tools that are created through extensive alignment with human feedback. However, these large models remain susceptible to jailbreak attacks, where adversaries manipulate prompts to elicit malicious outputs that should not be given by aligned LLMs. Investigating jailbreak prompts can lead us to delve into the limitations of LLMs and further guide us to secure them. Unfortunately, existing jailbreak techniques suffer from either (1) scalability issues, where attacks heavily rely on manual crafting of prompts, or (2) stealthiness problems, as attacks depend on token-based algorithms to generate prompts that are often semantically meaningless, making them susceptible to detection through basic perplexity testing. In light of these challenges, we intend to answer this question: Can we develop an approach that can automatically generate stealthy jailbreak prompts? In this paper, we introduce AutoDAN, a novel jailbreak attack against aligned LLMs. AutoDAN can automatically generate stealthy jailbreak prompts by the carefully designed hierarchical genetic algorithm. Extensive evaluations demonstrate that AutoDAN not only automates the process while preserving semantic meaningfulness, but also demonstrates superior attack strength in cross-model transferability, and cross-sample universality compared with the baseline. Moreover, we also compare AutoDAN with perplexity-based defense methods and show that AutoDAN can bypass them effectively.",
    keyPoints: [
      "Ut enim ad minim veniam, quis nostrud",
      "Duis aute irure dolor in reprehenderit",
      "Excepteur sint occaecat cupidatat non proident",
      "Sunt in culpa qui officia deserunt mollit"
    ],
    link: "https://arxiv.org/abs/2310.04451",
    category: "AutoDAN"
  },
  {
    id: "paper3",
    title: "Endless Jailbreaks with Bijection Learning",
    authors: "Brian R.Y. Huang, Maximilian Li, Leonard Tang",
    year: 2024,
    description: "Despite extensive safety training, LLMs are vulnerable to adversarial inputs. In this work, we introduce a simple but powerful attack paradigm, bijection learning, that yields a practically endless set of jailbreak prompts. We exploit language models' advanced reasoning capabilities to teach them invertible languages (bijections) in context, pass encoded queries to the model to bypass built-in safety mechanisms, and finally decode responses back into English, yielding helpful replies to harmful requests. Our approach proves effective on a wide range of frontier language models and harm categories. Bijection learning is an automated and universal attack that grows stronger with scale: larger models with more advanced reasoning capabilities are more susceptible to bijection learning jailbreaks despite stronger safety mechanisms.",
    keyPoints: [
      "Duis aute irure dolor in reprehenderit",
      "Excepteur sint occaecat cupidatat",
      "Sunt in culpa qui officia deserunt",
      "Lorem ipsum dolor sit amet consectetur"
    ],
    link: "https://arxiv.org/abs/2410.01294",
    category: "Bijection"
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
              <TruncatedText text={paper.description} />
              <Collapsible open={openCards.has(paper.id)} onOpenChange={() => toggleCard(paper.id)}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between mt-4">
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