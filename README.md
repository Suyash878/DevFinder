# DevFinder

A Next.js application that leverages the GitHub API and Gemini to automatically categorize and recommend beginner-friendly issues for new contributors.

## 🚀 Features

- **Smart Issue Categorization**: Uses Gemini AI to analyze and categorize issues based on complexity and required skills
- **Beginner-Friendly Focus**: Specifically targets and surfaces issues appropriate for newcomers to open source
- **Tech Stack Filtering**: Find issues in technologies you're familiar with or want to learn
- **Personalized Recommendations**: Get issue suggestions based on your skill level and interests
- **Real-time Updates**: Fresh data from GitHub's API ensures you see the latest opportunities
- **Feature Flagging**: Utilizes Flagsmith for controlled feature rollouts and A/B testing

## 📋 Prerequisites

- Node.js (v18.0 or higher)
- npm or yarn
- GitHub API key
- Gemini API key
- Flagsmith account

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/github-beginner-issues.git
   cd github-beginner-issues
   ```

2. Install Dependencies
   ```bash
   npm install
   ```

4. Setup Enviornment Variables
   ```bash
   GITHUB_API_KEY=your_github_api_key
   GEMINI_API_KEY=your_gemini_api_key
   FLAGSMITH_SERVER_API_KEY=your_flagsmith_api_key
   FLAGSMITH_ENVIRONMENT_ID=your_environment_id
   ```

5. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🏗️ Architecture
   The application follows a modular architecture:
   - Controlled Feature Rollouts: Gradually release new features to users
   -  Different configurations for development, staging, and production
   -  Update application behavior without redeployment
   
   Current feature flags include:
   - enable-ai-categorization - Toggles the Gemini AI categorization feature
   - advanced-filters - Enables additional filtering options
   - theme-selector - Allows users to switch between light/dark themes
   - beta-features - Controls access to experimental features

## 🙏 Acknowledgements
   - [Github API](https://docs.github.com/en/rest?apiVersion=2022-11-28)
   - [Gemini API](https://ai.google.dev/)
   - [Flagsmith](https://www.flagsmith.com/)
   
