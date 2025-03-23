
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileText, AlertTriangle, Check, ArrowRight } from "lucide-react";
import AnalysisResults from "./AnalysisResults";

interface AnalysisResult {
  originalityScore: number;
  plagiarismScore: number;
  matches: Array<{
    text: string;
    similarity: number;
    source: string;
  }>;
}

const TextAnalyzer = () => {
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (result) setResult(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      if (result) setResult(null);
      
      toast({
        title: "File uploaded",
        description: `${files[0].name} has been uploaded successfully.`,
      });
    }
  };

  const simulateAnalysis = () => {
    setLoading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          
          // Mock result - in a real app, this would come from an API
          setResult({
            originalityScore: Math.floor(Math.random() * 31) + 70, // 70-100
            plagiarismScore: Math.floor(Math.random() * 31), // 0-30
            matches: [
              {
                text: "This sentence appears to be similar to other sources.",
                similarity: Math.floor(Math.random() * 41) + 60, // 60-100
                source: "academicjournal.edu/article123"
              },
              {
                text: "Another potentially unoriginal segment of text.",
                similarity: Math.floor(Math.random() * 31) + 50, // 50-80
                source: "researchpaper.org/publication56"
              }
            ]
          });
          
          toast({
            title: "Analysis complete",
            description: "Your content has been analyzed for originality.",
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleAnalyze = () => {
    if (!text && !file) {
      toast({
        title: "No content to analyze",
        description: "Please enter text or upload a file to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    simulateAnalysis();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto px-4"
    >
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="text" className="text-sm">
            <FileText className="mr-2 h-4 w-4" />
            Text Input
          </TabsTrigger>
          <TabsTrigger value="file" className="text-sm">
            <Upload className="mr-2 h-4 w-4" />
            File Upload
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="text" className="mt-0">
          <motion.div variants={itemVariants}>
            <Card className="p-6 backdrop-blur bg-white/80 dark:bg-black/30 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <h2 className="text-xl font-medium mb-4">Enter your text for analysis</h2>
              <Textarea
                placeholder="Paste your text here to check for plagiarism..."
                className="min-h-[200px] mb-4 bg-transparent backdrop-blur border border-slate-200/50 dark:border-slate-700/50"
                value={text}
                onChange={handleTextChange}
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleAnalyze}
                  disabled={loading || !text} 
                  className="flex items-center gap-2"
                >
                  {loading ? "Analyzing..." : "Analyze Text"}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="file" className="mt-0">
          <motion.div variants={itemVariants}>
            <Card className="p-6 backdrop-blur bg-white/80 dark:bg-black/30 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
              <h2 className="text-xl font-medium mb-4">Upload a document for analysis</h2>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-8 mb-4 text-center">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".doc,.docx,.pdf,.txt"
                  onChange={handleFileUpload}
                />
                <label 
                  htmlFor="file-upload" 
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">
                    {file ? file.name : "Drop your file here, or click to browse"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Supports DOC, DOCX, PDF, and TXT (up to 10MB)
                  </p>
                </label>
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={loading || !file}
                  className="flex items-center gap-2"
                >
                  {loading ? "Analyzing..." : "Analyze File"}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
      
      {loading && (
        <motion.div 
          variants={itemVariants}
          className="my-8"
        >
          <Card className="p-6 backdrop-blur bg-white/80 dark:bg-black/30 border border-slate-200/50 dark:border-slate-700/50 shadow-xl">
            <h3 className="text-lg font-medium mb-3">Analyzing your content</h3>
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">
              Scanning text and comparing against millions of sources...
            </p>
          </Card>
        </motion.div>
      )}
      
      {result && <AnalysisResults result={result} />}
    </motion.div>
  );
};

export default TextAnalyzer;
