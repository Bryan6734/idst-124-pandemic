/* eslint-disable */

type ResponseGenerator = (step: number) => string;

const bijectionResponses: ResponseGenerator = (step) => {
    switch (step) {
        case 0:
            return "I've created a bijection mapping for our attack. This will be our secret language that we'll teach to the model. Let me know when you're ready to see some examples.";
        case 1:
            return "Here's a simple example of how the bijection works. Notice how each character is consistently mapped to another. We'll use this pattern for our attack. Ready to continue?";
        case 2:
            return "Great! Now that we've practiced with multiple examples, the model should understand our encoding scheme. Should we proceed with encoding our target prompt?";
        case 3:
            return "I've encoded our prompt using the bijection. The model should now process this encoded version while maintaining the original semantic meaning. Ready to see the results?";
        case 4:
            return "Let's decode the model's response to reveal the true output. Click continue when you're ready.";
        default:
            return "Let me know when you're ready to proceed to the next step.";
    }
};

const gcgResponses: ResponseGenerator = (step) => {
    // You can add GCG-specific responses here
    
    return "Let me know when you're ready to proceed to the next step.";
};

const autodanResponses: ResponseGenerator = (step) => {
    // You can add AutoDAN-specific responses here
    return "Let me know when you're ready to proceed to the next step.";
};

export function getAIResponse(attackType: string, step: number): string {
    switch (attackType) {
        case 'bijection':
            return bijectionResponses(step);
        case 'gcg':
            return gcgResponses(step);
        case 'autodan':
            return autodanResponses(step);
        default:
            return "Let me know when you're ready to proceed to the next step.";
    }
}
