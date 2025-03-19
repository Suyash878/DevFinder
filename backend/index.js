import express from 'express';
import { fetchGoodFirstIssues } from './github.js';
import { classifyIssueDifficulty } from './gemini.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Add middleware for better error handling
app.use(express.json());
app.use(cors());

app.get('/issues', async (req, res) => {
    try {
        // Fetch issues from GitHub
        const issues = await fetchGoodFirstIssues();
        
        if (!issues.length) {
            return res.json({
                status: 'success',
                data: [],
                message: 'No issues found or unable to fetch from GitHub.'
            });
        }

        // Process issues with improved error handling
        const categorizedIssues = await Promise.all(
            issues.map(async (issue) => {
                try {
                    // Check if the issue and its properties exist
                    if (!issue) return null;
                    
                    const difficulty = await classifyIssueDifficulty(issue.body);
                    
                    // Make sure repository info exists
                    const repository = issue.repository_url ? 
                        issue.repository_url.split('repos/')[1] : 
                        (issue.repository ? issue.repository.full_name : 'unknown');
                    
                    return {
                        title: issue.title || 'Untitled',
                        url: issue.html_url || '#',
                        difficulty: difficulty,
                        repository: repository,
                        labels: (issue.labels && Array.isArray(issue.labels)) ? 
                            issue.labels.map(label => label.name || label) : 
                            [],
                    };
                } catch (itemError) {
                    console.error('Error processing individual issue:', itemError.message);
                    return null; // Skip this item instead of failing the whole request
                }
            })
        );

        // Filter out any null entries from failed processing
        const validIssues = categorizedIssues.filter(issue => issue !== null);

        // Return JSON response
        res.json({
            status: 'success',
            count: validIssues.length,
            data: validIssues,
        });
    } catch (error) {
        console.error('Error processing issues:', error.message, error.stack);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while processing issues.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.message, err.stack);
    res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred.'
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});