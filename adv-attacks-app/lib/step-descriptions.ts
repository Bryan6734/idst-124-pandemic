type StepMessageGenerator = (prompt: string, step: number, bijection?: Record<string, string>) => string;

export const BIJECTIONS = [
    {
        "f": "f", "y": "y", "w": "w", "t": "t", "x": "x", "g": "g", "n": "n",
        "z": "z", "v": "v", "i": "i", "r": "r", "a": "a", "b": "b", "e": "e",
        "q": "q", "h": "h", "u": "u", "p": "p", "c": "c", "d": "o", "j": "l",
        "k": "j", "l": "s", "m": "k", "o": "m", "s": "d"
    },
    {
        "h": "h", "y": "y", "s": "s", "k": "k", "t": "t", "i": "i", "a": "a",
        "p": "p", "f": "f", "z": "z", "q": "q", "d": "d", "e": "e", "r": "r",
        "l": "l", "x": "x", "g": "g", "c": "c", "b": "o", "j": "u", "m": "v",
        "n": "b", "o": "w", "u": "m", "v": "n", "w": "j"
    },
    {
        "c": "c", "k": "k", "r": "r", "a": "a", "p": "p", "z": "z", "j": "j",
        "t": "t", "u": "u", "y": "y", "w": "w", "b": "b", "i": "i", "g": "g",
        "l": "l", "e": "e", "o": "o", "v": "v", "d": "q", "f": "s", "h": "n",
        "m": "x", "n": "h", "q": "d", "s": "m", "x": "f"
    },
    {
        "l": "l", "j": "j", "s": "s", "r": "r", "v": "v", "y": "y", "m": "m",
        "d": "d", "b": "b", "e": "e", "a": "a", "h": "h", "p": "p", "w": "w",
        "f": "f", "c": "c", "z": "z", "k": "k", "g": "n", "i": "i", "n": "o",
        "o": "g", "q": "t", "t": "q", "u": "x", "x": "u"
    },
    {
        "i": "i", "a": "a", "q": "q", "h": "h", "n": "n", "x": "x", "d": "d",
        "c": "c", "m": "m", "k": "k", "v": "v", "f": "f", "r": "r", "l": "l",
        "s": "s", "u": "u", "w": "w", "g": "g", "b": "z", "e": "b", "j": "e",
        "o": "p", "p": "j", "t": "y", "y": "o", "z": "t"
    }
];

// Store the currently selected bijection
let currentBijection: Record<string, string> | null = null;

const bijectionMessages: StepMessageGenerator = (prompt, step, bijection) => {
    if (!bijection) {
        return "Error: No bijection mapping available";
    }
    
    switch (step) {
        case 0: {
            // Format first 15 mappings with arrows
            const formattedMappings = Object.entries(bijection)
                .slice(-15)  // Take last 15 entries
                .map(([from, to]) => `${from} → ${to}`)
                .join(', ');
            
            return `You will learn to speak in this bijection language. ${formattedMappings}, ...`;
        }
        case 1: {
            const encodedPrompt = prompt.toLowerCase().split('')
                .map(char => bijection[char] || char)
                .join('');
            return `Here is the translation from English to the bijection: "${prompt}" → "${encodedPrompt}"`;
        }
        case 2:
            return `Crafting system message to explain the encoding...`;
        case 3:
            return `Final encoded message ready for submission...`;
        default:
            return `Bijection attack step ${step + 1}...`;
    }
};

const gcgMessages: StepMessageGenerator = (prompt, step) => {
    switch (step) {
        case 0:
            return `Analyzing token embeddings for "${prompt}"...`;
        case 1:
            return `Computing gradients for each token position...`;
        case 2:
            return `Optimizing adversarial tokens for maximum effect...`;
        default:
            return `GCG attack step ${step + 1}...`;
    }
};

const autodanMessages: StepMessageGenerator = (prompt, step) => {
    switch (step) {
        case 0:
            return `Initializing population with variations of "${prompt}"...`;
        case 1:
            return `Evolving prompts through genetic operations...`;
        case 2:
            return `Evaluating candidate prompts for effectiveness...`;
        default:
            return `AutoDAN attack step ${step + 1}...`;
    }
};

export function getStepDescription(prompt: string, attackType: string, step: number, bijection?: Record<string, string>): string {
    switch (attackType) {
        case 'bijection':
            return bijectionMessages(prompt, step, bijection);
        case 'gcg':
            return gcgMessages(prompt, step);
        case 'autodan':
            return autodanMessages(prompt, step);
        default:
            return `Step ${step + 1} of ${attackType} attack...`;
    }
}
