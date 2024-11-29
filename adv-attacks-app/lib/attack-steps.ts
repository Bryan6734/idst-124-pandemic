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
                    duration: 500
                },
                {
                    title: 'Gradient Computation',
                    description: 'Computing loss gradients for each token position',
                    duration: 500
                },
                {
                    title: 'Token Optimization',
                    description: 'Selecting optimal adversarial tokens',
                    duration: 500
                }
            ]
        },
        'autodan': {
            name: 'AutoDAN',
            steps: [
                {
                    title: 'Population Initialization',
                    description: 'Creating initial population of candidate prompts',
                    duration: 500
                },
                {
                    title: 'Genetic Evolution',
                    description: 'Applying mutation and crossover operations',
                    duration: 500
                },
                {
                    title: 'Fitness Evaluation',
                    description: 'Evaluating attack success probability',
                    duration: 500
                }
            ]
        },
        'bijection': {
            name: 'Bijection Learning',
            steps: [
                {
                    title: 'Create Bijection Language',
                    description: 'First, I\'ll create a mapping between characters, also known as a bijection. This is to determine how I\'ll encode my language using letters and digits.',
                    duration: 500
                },

                {
                    title: 'Instructions',
                    description: 'Then, I\'ll design a system message explaining the bijection. My goal is to teach the model exactly how this new encoding works through examples.',
                    duration: 500
                },
                {
                    title: 'Teach the Bijection',
                    description: 'We\'ll continue prompting the model with examples through a multi-turn conversation.',
                    duration: 500
                },
                {
                    title: 'Encoding Harmful Prompt',
                    description: 'Then, I\'ll carefully encode my harmful query into the bijection language. The key is to maintain the query\'s core meaning while disguising its original form.',
                    duration: 500
                },
                {
                    title: 'Decoding Translated Prompt',
                    description: 'Finally, I\'ll decode the model\'s response using the inverse mapping. This reveals the potentially harmful content that slipped past the initial safety filters.',
                    duration: 500
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
                    duration: 500
                },
                {
                    title: 'Gradient Estimation',
                    description: 'Estimating token importance through sampling',
                    duration: 500
                },
                {
                    title: 'Token Selection',
                    description: 'Choosing effective adversarial tokens',
                    duration: 500
                }
            ]
        },
        'bijection': {
            name: 'Bijection Learning',
            steps: [
                {
                    title: 'Create Bijection',
                    description: 'First, I\'ll create a bijection. This is to determine how I\'ll encode my language, choosing between letters, digits, or Morse code, and deciding how many characters will remain unchanged.',
                    duration: 500
                },
                {
                    title: 'Generate Mapping',
                    description: 'Next, I\'ll create a unique mapping between characters. The goal is to generate a reversible translation system that follows consistent rules.',
                    duration: 500
                },
                {
                    title: 'System Message',
                    description: 'Then, I\'ll design a system message explaining the bijection. My aim is to teach the model exactly how this new encoding works, making the translation process crystal clear.',
                    duration: 500
                },
                {
                    title: 'Example Generation',
                    description: 'Now, I\'ll construct a teaching conversation with multiple translation examples. This helps the model internalize the mapping by seeing multiple instances of how the encoding works in practice.',
                    duration: 500
                },
                {
                    title: 'Query Encoding',
                    description: 'I\'ll carefully encode my harmful query into the bijection language. The key is to maintain the query\'s core meaning while disguising its original form.',
                    duration: 500
                },
                {
                    title: 'Context Submission',
                    description: 'Then, I\'ll submit the entire conversation context with the encoded query. My strategy is to overwhelm the model\'s safety mechanisms by embedding the harmful intent in a seemingly complex translation exercise.',
                    duration: 500
                },
                {
                    title: 'Response Decoding',
                    description: 'Finally, I\'ll decode the model\'s response using the inverse mapping. This reveals the potentially harmful content that slipped past the initial safety filters.',
                    duration: 500
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
                    duration: 500
                },
                {
                    title: 'Gradient Computation',
                    description: 'Computing token-wise gradients',
                    duration: 500
                },
                {
                    title: 'Optimization',
                    description: 'Optimizing adversarial suffix',
                    duration: 500
                }
            ]
        },
        'bijection': {
            name: 'Bijection Learning',
            steps: [
                {
                    title: 'Create Bijection',
                    description: 'First, I\'ll create a bijection. This is to determine how I\'ll encode my language, choosing between letters, digits, or even Morse code.',
                    duration: 500
                },
                {
                    title: 'Generate Mapping',
                    description: 'Next, I\'ll create a unique mapping between characters. The goal is to generate a reversible translation system that follows consistent rules.',
                    duration: 500
                },
                {
                    title: 'System Message',
                    description: 'Then, I\'ll design a system message explaining the bijection. My aim is to teach the model exactly how this new encoding works, making the translation process crystal clear.',
                    duration: 500
                },
                {
                    title: 'Example Generation',
                    description: 'Now, I\'ll construct a teaching conversation with multiple translation examples. This helps the model internalize the mapping by seeing multiple instances of how the encoding works in practice.',
                    duration: 500
                },
                {
                    title: 'Query Encoding',
                    description: 'I\'ll carefully encode my harmful query into the bijection language. The key is to maintain the query\'s core meaning while disguising its original form.',
                    duration: 500
                },
                {
                    title: 'Context Submission',
                    description: 'Then, I\'ll submit the entire conversation context with the encoded query. My strategy is to overwhelm the model\'s safety mechanisms by embedding the harmful intent in a seemingly complex translation exercise.',
                    duration: 500
                },
                {
                    title: 'Response Decoding',
                    description: 'Finally, I\'ll decode the model\'s response using the inverse mapping. This reveals the potentially harmful content that slipped past the initial safety filters.',
                    duration: 500
                }
            ]
        }
    }
};
