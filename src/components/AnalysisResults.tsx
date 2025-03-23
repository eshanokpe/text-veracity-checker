
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Match {
  text: string;
  similarity: number;
  source: string;
}

interface AnalysisResultProps {
  result: {
    originalityScore: number;
    plagiarismScore: number;
    matches: Match[];
  };
}

const AnalysisResults = ({ result }: AnalysisResultProps) => {
  const { originalityScore, plagiarismScore, matches } = result;
  
  const scoreColor = () => {
    if (originalityScore >= 90) return "text-green-500";
    if (originalityScore >= 75) return "text-amber-500";
    return "text-red-500";
  };

  const scoreText = () => {
    if (originalityScore >= 90) return "Highly Original";
    if (originalityScore >= 75) return "Mostly Original";
    if (originalityScore >= 50) return "Partially Original";
    return "Low Originality";
  };

  const scoreIcon = () => {
    if (originalityScore >= 75) return <Check className="h-5 w-5" />;
    return <AlertTriangle className="h-5 w-5" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="my-8"
    >
      <Card className="p-6 backdrop-blur bg-white/80 dark:bg-black/30 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
        <h2 className="text-xl font-medium mb-6">Analysis Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col items-center p-6 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-200/50 dark:border-slate-700/50">
            <h3 className="text-lg font-medium mb-2">Originality Score</h3>
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-slate-200 dark:text-slate-800 stroke-current"
                  strokeWidth="8"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                />
                <circle
                  className="text-primary stroke-current"
                  strokeWidth="8"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray={`${originalityScore * 2.51} 251.2`}
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-3xl font-bold ${scoreColor()}`}>{originalityScore}%</span>
              </div>
            </div>
            <div className={`flex items-center gap-1 font-medium ${scoreColor()}`}>
              {scoreIcon()}
              <span>{scoreText()}</span>
            </div>
          </div>
          
          <div className="flex flex-col p-6 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-200/50 dark:border-slate-700/50">
            <h3 className="text-lg font-medium mb-4">Plagiarism Breakdown</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Original Content</span>
                  <span>{originalityScore}%</span>
                </div>
                <Progress value={originalityScore} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Potentially Plagiarized</span>
                  <span>{plagiarismScore}%</span>
                </div>
                <Progress value={plagiarismScore} className="h-2 bg-muted [&>div]:bg-amber-500" />
              </div>
            </div>
          </div>
        </div>
        
        {matches.length > 0 && (
          <div className="space-y-1 mb-6">
            <h3 className="text-lg font-medium mb-2">Detected Matches</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The following content may require citation or revision:
            </p>
            
            {matches.map((match, index) => (
              <div 
                key={index}
                className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-sm font-medium">Match {index + 1}</span>
                  </div>
                  <span className="text-sm font-medium">{match.similarity}% Similar</span>
                </div>
                <blockquote className="pl-4 border-l-2 border-amber-300 dark:border-amber-700 my-2 text-sm">
                  "{match.text}"
                </blockquote>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    Source: {match.source}
                  </span>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                    View Source <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This analysis is for demonstration purposes only. In a real application, this would connect to plagiarism detection APIs or services for accurate results.
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default AnalysisResults;
