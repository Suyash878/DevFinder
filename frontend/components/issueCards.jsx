import { useState, useEffect } from "react";
import axios from 'axios';

export const IssueCards = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchIssues = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:3001/issues');
                console.log('Issues response:', response.data);
                
                // Access the data property of the response
                if (response.data && response.data.data) {
                    setIssues(response.data.data);
                } else {
                    setIssues([]);
                    console.warn('Unexpected response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching issues:', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchIssues();
    }, []);
    
    if (loading) return <div>Loading issues...</div>;
    if (error) return <div>Error loading issues: {error}</div>;
    if (!issues.length) return <div>No issues found.</div>;
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {issues.map((issue, index) => (
                <div 
                    key={`${issue.repository}-${index}`}
                    className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
                >
                    <h3 className="font-bold text-lg mb-2">{issue.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">Repository: {issue.repository}</p>
                    <div className="mb-2">
                        <span className={`px-2 py-1 rounded text-sm ${getDifficultyClass(issue.difficulty)}`}>
                            Difficulty: {issue.difficulty || 'unclassified'}
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {Array.isArray(issue.labels) && issue.labels.map((label, labelIndex) => (
                            <span 
                                key={`${label}-${labelIndex}`}
                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                    <a 
                        href={issue.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline mt-2 inline-block"
                    >
                        View Issue →
                    </a>
                </div>
            ))}
        </div>
    );
};

// Helper function to get appropriate color class based on difficulty
function getDifficultyClass(difficulty) {
    switch (difficulty?.toLowerCase()) {
        case 'beginner':
            return 'bg-green-100 text-green-800';
        case 'intermediate':
            return 'bg-yellow-100 text-yellow-800';
        case 'advanced':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-200 text-gray-800';
    }
}