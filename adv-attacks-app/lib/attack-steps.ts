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
        }
    }
};
