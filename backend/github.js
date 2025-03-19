import axios from 'axios';
import { GITHUB_TOKEN } from './config.js';

const GITHUB_API_URL = 'https://api.github.com/search/issues';

export async function fetchGoodFirstIssues() {
    try {
        const response = await axios.get(GITHUB_API_URL, {
            params: {
                q: 'label:"good first issue" state:open is:issue',
                per_page: 10, // Limit results to avoid rate limits
            },
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        return response.data.items || [];
    } catch (error) {
        console.error('Error fetching issues:', error.message);
        // Return empty array instead of throwing
        return [];
    }
}