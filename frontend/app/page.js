'use client'
import Image from "next/image";
import { getFlagValue, aicategorization, showdifficulty, issuesperpage, allowregistration } from "@/lib/flagsmith.mjs";
import { useState, useEffect } from "react";
import { IssueCards } from "@/components/issueCards";

export default function Home() {
  const [flagValue, setFlagValue] = useState(false);
  const [aiCategorizationFlag, setAiCategorizationFlag] = useState(false);
  const [showDifficultyFlag, setShowDifficultyFlag] = useState(false);
  const [issuesPerPageFlag, setIssuesPerPageFlag] = useState(false);
  const [allowRegistrationFlag, setAllowRegistrationFlag] = useState(false);

  useEffect(() => {
    const updateFlags = () => {
      setFlagValue(getFlagValue());
      setAiCategorizationFlag(aicategorization);
      setShowDifficultyFlag(showdifficulty);
      setIssuesPerPageFlag(issuesperpage);
      setAllowRegistrationFlag(allowregistration);
    };
    
    // Initial check
    updateFlags();
    
    // Set up interval to check flags
    const interval = setInterval(updateFlags, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-black p-4 font-sans">
        {/* {
          flagValue ? (
            <button>
              implement refresh button component here
            </button>
          ) : (
            <button>
              No
            </button>
          )
        }
        {
          showDifficultyFlag ? (
            <p>Show Difficulty Enabled</p>
          ) : (
            <p>Show Difficulty Disabled</p>
          )
        }
        {
          aiCategorizationFlag ? (
            <p>AI Categorization Enabled</p>
          ) : (
            <p>AI Categorization Disabled</p>
          )
        }
        {
          allowRegistrationFlag ? (
            <p>Registration Allowed</p>
          ) : (
            <p>Registration Disabled</p>
          )
        } */}
      <h1 className="text-3xl font-bold mb-4">DevFinder</h1>
        <IssueCards></IssueCards>
    </div>
  );
}