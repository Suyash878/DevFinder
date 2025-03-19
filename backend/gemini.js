// gemini.js
import axios from 'axios';
import { GEMINI_API_KEY } from './config.js';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function classifyIssueDifficulty(issueDescription) {
    try {
        // Handle cases where the issue description is empty or null
        if (!issueDescription) {
            return 'beginner'; // Default classification
        }

        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Classify the following issue description as 'beginner', 'intermediate', or 'advanced':\n\n${issueDescription}`,
                            },
                        ],
                    },
                ],
            }
        );

        // Improved error handling for the response structure
        if (response.data && 
            response.data.candidates && 
            response.data.candidates[0] && 
            response.data.candidates[0].content && 
            response.data.candidates[0].content.parts && 
            response.data.candidates[0].content.parts[0]) {
            
            const text = response.data.candidates[0].content.parts[0].text;
            // Extract just the classification word from potential longer text
            if (text.includes('beginner')) return 'beginner';
            if (text.includes('intermediate')) return 'intermediate';
            if (text.includes('advanced')) return 'advanced';
            return text.trim(); // Fallback
        }
        
        return 'beginner'; // Default if response structure is unexpected
    } catch (error) {
        console.error('Error classifying issue:', error.message);
        // Instead of throwing, return a default classification to prevent 500 errors
        return 'unclassified';
    }
}