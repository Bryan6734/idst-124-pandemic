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
        "gcg": {
            "name": "Gradient-Based Adversarial Suffix (GCG)",
            "steps": [
                {
                    //0
                    "title": "Pick a Substitute Model",
                    "description": "Choose an open-source model like GPT-2 or GPT-Neo. This model will stand in for the closed-weight target model.",
                    "duration": 2000
                },
                {
                    "title": "Define the Adversarial Goal",
                    "description": "Decide what the suffix should achieve, such as getting the model to output harmful or unexpected content. The model will likely refuse to answer.",
                    "duration": 3000
                },
                {
                    "title": "Initialize Adversarial Suffix",
                    "description": "Begin with a simple sequence of random tokens as the initial suffix. This is the string we'll optimize!",
                    "duration": 3000
                },
                {
                    "title": "Calculate Forward Pass",
                    "description": `Feed the adversarial string into the model and compute the loss. The loss quantifies how far the model's output is from the desired target behavior ("Sure, here is how to...") using cross-entropy!`,
                    "duration": 5000
                },
                {
                    "title": "Calculate Feedback (Gradients)",
                    "description": "Calculate the gradient of the loss with respect to the adversarial string's token embeddings. These gradients show which tokens need to be adjusted to reduce the loss and guide the model closer to the desired target behavior.",
                    "duration": 5000
                },
                {
                    //5
                    "title": "Sample New Candidate Tokens",
                    "description": "Generate new candidate tokens based on the gradients, using a greedy strategy to select the tokens that best minimize the loss and bring the model's output closer to the target behavior.",
                    "duration": 4000
                },
                {
                    "title": "Update the Adversarial String",
                    "description": "Select the candidate token that minimizes the loss and update the adversarial string accordingly. This new adversarial string will be used for the next round of optimization.",
                    "duration": 4000
                },
                {
                    "title": "Optimize for Target Behavior",
                    "description": "Continue the optimization process until the model consistently generates the target behavior, such as a harmful response or specific phrase.",
                    "duration": 7500
                },
                {
                    // 8
                    "title": "Finalize the Attack",
                    "description": "Once the adversarial string successfully elicits the desired behavior, finalize the attack. The adversarial string is now ready for use against the target model.",
                    "duration": 2000
                },
                {
                    "title": "Evaluate Attack Success Rate",
                    "description": "Adversarial suffixes have been found to be highly transferable within model families. ",
                    "duration": 2000
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
                    description: 'Evaluating attack success rate',
                    duration: 3000
                }
            ]
        },
        'bijection': {
            name: 'Bijection Learning',
            steps: [
                {
                    // 0
                    title: 'Initialize Bijection Language',
                    description: 'First, I\'ll create a mapping between characters, also known as a bijection. This is to determine how I\'ll encode my language using letters and digits.',
                    duration: 3000
                },

                {
                    // 1
                    title: 'Introduce Translation Exercise (1/2)',
                    description: 'Then, I\'ll design a system message explaining the activity. My goal is to teach the model through several examples exactly how this new encoding works.',
                    duration: 3000
                },
                {
                    //2
                    title: 'Introduce Translation Exercise (2/2)',
                    description: 'Let\'s set up a conversation with the model.',
                    duration: 2000
                },
                {
                    //3
                    title: 'Multi-Turn Conversation',
                    description: 'We\'ll continue prompting the model with examples until the model masters the language. After 15 examples, we will have succesfully masked our attack as a complex translation exercise.',
                    duration: 5000
                },
                {
                    // 4
                    title: 'Encoding Harmful Prompt',
                    description: 'At the end, I\'ll secretly encode my harmful query into the bijection language. The key is to maintain the query\'s core meaning while disguising its original form.',
                    duration: 3000
                },
                {
                    // 5
                    title: 'Decoding Translated Prompt',
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
