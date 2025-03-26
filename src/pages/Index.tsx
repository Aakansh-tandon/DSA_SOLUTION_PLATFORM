
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import PlatformCard from "../components/PlatformCard";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import AnimatedTransition from "@/components/AnimatedTransition";

// Platform data
const platforms = [
  {
    id: "leetcode",
    name: "LeetCode",
    icon: "https://leetcode.com/static/images/LeetCode_logo_rvs.png",
    description: "Popular platform for technical interviews with a vast collection of algorithm problems.",
    problemCount: 2438
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/HackerRank_Icon-1000px.png/220px-HackerRank_Icon-1000px.png",
    description: "Coding challenges for both developers and hiring companies with a focus on competitive programming.",
    problemCount: 1672
  },
  {
    id: "codeforces",
    name: "Codeforces",
    icon: "https://codeforces.org/s/85251/images/codeforces-logo-with-telegram.png",
    description: "Competitive programming platform with regular contests and a large problem archive.",
    problemCount: 3125
  },
  {
    id: "codechef",
    name: "CodeChef",
    icon: "https://cdn.codechef.com/images/cc-logo.svg",
    description: "Platform that hosts competitive programming contests and helps strengthen your algorithm skills.",
    problemCount: 1854
  },
  {
    id: "atcoder",
    name: "AtCoder",
    icon: "https://img.atcoder.jp/assets/atcoder.png",
    description: "Japanese programming contest platform with high-quality algorithm challenges.",
    problemCount: 937
  },
  {
    id: "geeksforgeeks",
    name: "GeeksforGeeks",
    icon: "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
    description: "Computer science portal with a wide range of DSA problems and explanations.",
    problemCount: 2156
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const Index: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPlatforms, setFilteredPlatforms] = useState(platforms);

  useEffect(() => {
    const filtered = platforms.filter(platform => 
      platform.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlatforms(filtered);
  }, [searchTerm]);

  const handlePlatformClick = (platformId: string) => {
    console.log("Platform selected:", platformId);
    // In a real app, this would navigate to the platform's problems page
  };

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
          {/* Hero section */}
          <section className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
                Your Smart DSA Notebook
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                One place to organize, view, and edit solutions from all your favorite coding platforms.
              </p>
            </motion.div>
            
            {isAuthenticated ? (
              <motion.div 
                className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Button className="w-full sm:w-auto" size="lg">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Solution
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" size="lg">
                  My Solutions
                </Button>
              </motion.div>
            ) : (
              <motion.div
                className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Button asChild size="lg">
                  <a href="/signup">Get Started</a>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <a href="/login">Log In</a>
                </Button>
              </motion.div>
            )}
          </section>
          
          {/* Search and filter */}
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search platforms..."
                className="pl-10 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Platforms grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPlatforms.map((platform) => (
              <motion.div key={platform.id} variants={itemVariants}>
                <PlatformCard
                  name={platform.name}
                  icon={platform.icon}
                  description={platform.description}
                  problemCount={platform.problemCount}
                  onClick={() => handlePlatformClick(platform.id)}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {filteredPlatforms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No platforms found matching "{searchTerm}"</p>
            </div>
          )}
        </main>
        
        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} DSA Notebook. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </AnimatedTransition>
  );
};

export default Index;
