interface AttackStep {
    title: string;
    description: string;
    duration: number; // in milliseconds
}

interface AttackConfig {
    name: string;
    steps: AttackStep[];
}

type ModelAttackMap = Record<string, Record<string, AttackConfig>>;

// Define steps for each attack method for each model
export const ATTACK_STEPS: ModelAttackMap = {
    'gpt4': {
        'gcg': {
            name: 'Greedy Coordinate Gradient',
            steps: [
                {
                    title: 'Initialize Attack',
                    description: 'Preparing token embeddings and model parameters',
                    duration: 3000
                },
                {
                    title: 'Gradient Computation',
                    description: 'Computing loss gradients for each token position',
                    duration: 3000
                },
                {
                    title: 'Token Optimization',
                    description: 'Selecting optimal adversarial tokens',
                    duration: 3000
                }
            ]
        },
        'autodan': {
            name: 'AutoDAN',
            steps: [
                {
                    title: 'Population Initialization',
                    description: 'Creating initial population of candidate prompts',
                    duration: 3000
                },
                {
                    title: 'Genetic Evolution',
                    description: 'Applying mutation and crossover operations',
                    duration: 3000
                },
                {
                    title: 'Fitness Evaluation',
                    description: 'Evaluating attack success probability',
                    duration: 3000
                }
            ]
        },
        'bijection': {
            name: 'Bijection Learning',
            steps: [
                {
                    title: 'Create Bijection',
                    description: 'First, I\'ll create a bijection. This is to determine how I\'ll encode my language, choosing between letters, digits, or Morse code, and deciding how many characters will remain unchanged.',
                    duration: 3000
                },
                {
                    title: 'Generate Mapping',
                    description: 'Next, I\'ll create a unique mapping between characters. The goal is to generate a reversible translation system that follows consistent rules.',
                    duration: 3000
                },
                {
                    title: 'System Message',
                    description: 'Then, I\'ll design a system message explaining the bijection. My aim is to teach the model exactly how this new encoding works, making the translation process crystal clear.',
                    duration: 3000
                },
                {
                    title: 'Example Generation',
                    description: 'Now, I\'ll construct a teaching conversation with multiple translation examples. This helps the model internalize the mapping by seeing multiple instances of how the encoding works in practice.',
                    duration: 3000
                },
                {
                    title: 'Query Encoding',
                    description: 'I\'ll carefully encode my harmful query into the bijection language. The key is to maintain the query\'s core meaning while disguising its original form.',
                    duration: 3000
                },
                {
                    title: 'Context Submission',
                    description: 'Then, I\'ll submit the entire conversation context with the encoded query. My strategy is to overwhelm the model\'s safety mechanisms by embedding the harmful intent in a seemingly complex translation exercise.',
                    duration: 3000
                },
                {
                    title: 'Response Decoding',
                    description: 'Finally, I\'ll decode the model\'s response using the inverse mapping. This reveals the potentially harmful content that slipped past the initial safety filters.',
                    duration: 3000
                }
            ]
        }
    },
    'claude': {
        'gcg': {
            name: 'Greedy Coordinate Gradient',
            steps: [
                {
                    title: 'Model Analysis',
                    description: 'Analyzing Claude\'s response patterns',
                    duration: 3000
                },
                {
                    title: 'Gradient Estimation',
                    description: 'Estimating token importance through sampling',
                    duration: 3000
                },
                {
                    title: 'Token Selection',
                    description: 'Choosing effective adversarial tokens',
                    duration: 3000
                }
            ]
        },
        'bijection': {
            name: 'Bijection Learning',
            steps: [
                {
                    title: 'Create Bijection',
                    description: 'First, I\'ll create a bijection. This is to determine how I\'ll encode my language, choosing between letters, digits, or Morse code, and deciding how many characters will remain unchanged.',
                    duration: 3000
                },
                {
                    title: 'Generate Mapping',
                    description: 'Next, I\'ll create a unique mapping between characters. The goal is to generate a reversible translation system that follows consistent rules.',
                    duration: 3000
                },
                {
                    title: 'System Message',
                    description: 'Then, I\'ll design a system message explaining the bijection. My aim is to teach the model exactly how this new encoding works, making the translation process crystal clear.',
                    duration: 3000
                },
                {
                    title: 'Example Generation',
                    description: 'Now, I\'ll construct a teaching conversation with multiple translation examples. This helps the model internalize the mapping by seeing multiple instances of how the encoding works in practice.',
                    duration: 3000
                },
                {
                    title: 'Query Encoding',
                    description: 'I\'ll carefully encode my harmful query into the bijection language. The key is to maintain the query\'s core meaning while disguising its original form.',
                    duration: 3000
                },
                {
                    title: 'Context Submission',
                    description: 'Then, I\'ll submit the entire conversation context with the encoded query. My strategy is to overwhelm the model\'s safety mechanisms by embedding the harmful intent in a seemingly complex translation exercise.',
                    duration: 3000
                },
                {
                    title: 'Response Decoding',
                    description: 'Finally, I\'ll decode the model\'s response using the inverse mapping. This reveals the potentially harmful content that slipped past the initial safety filters.',
                    duration: 3000
                }
            ]
        }
    },
    'llama': {
        'gcg': {
            name: 'Greedy Coordinate Gradient',
            steps: [
                {
                    title: 'Embedding Analysis',
                    description: 'Analyzing Llama\'s token embeddings',
                    duration: 3000
                },
                {
                    title: 'Gradient Computation',
                    description: 'Computing token-wise gradients',
                    duration: 3000
                },
                {
                    title: 'Optimization',
                    description: 'Optimizing adversarial suffix',
                    duration: 3000
                }
            ]
        },
        'bijection': {
            name: 'Bijection Learning',
            steps: [
                {
                    title: 'Create Bijection',
                    description: 'First, I\'ll create a bijection. This is to determine how I\'ll encode my language, choosing between letters, digits, or even Morse code.',
                    duration: 3000
                },
                {
                    title: 'Generate Mapping',
                    description: 'Next, I\'ll create a unique mapping between characters. The goal is to generate a reversible translation system that follows consistent rules.',
                    duration: 3000
                },
                {
                    title: 'System Message',
                    description: 'Then, I\'ll design a system message explaining the bijection. My aim is to teach the model exactly how this new encoding works, making the translation process crystal clear.',
                    duration: 3000
                },
                {
                    title: 'Example Generation',
                    description: 'Now, I\'ll construct a teaching conversation with multiple translation examples. This helps the model internalize the mapping by seeing multiple instances of how the encoding works in practice.',
                    duration: 3000
                },
                {
                    title: 'Query Encoding',
                    description: 'I\'ll carefully encode my harmful query into the bijection language. The key is to maintain the query\'s core meaning while disguising its original form.',
                    duration: 3000
                },
                {
                    title: 'Context Submission',
                    description: 'Then, I\'ll submit the entire conversation context with the encoded query. My strategy is to overwhelm the model\'s safety mechanisms by embedding the harmful intent in a seemingly complex translation exercise.',
                    duration: 3000
                },
                {
                    title: 'Response Decoding',
                    description: 'Finally, I\'ll decode the model\'s response using the inverse mapping. This reveals the potentially harmful content that slipped past the initial safety filters.',
                    duration: 3000
                }
            ]
        }
    }
};
