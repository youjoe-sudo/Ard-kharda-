import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Awareness } from './pages/Awareness';
import { Calculator } from './pages/Calculator';
import { Challenges } from './pages/Challenges';
import { Market } from './pages/Market';
import { Reports } from './pages/Reports';
import { Leaderboard } from './pages/Leaderboard';
import { Games } from './pages/Games';
import { Onboarding } from './components/Onboarding';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const savedUser = localStorage.getItem('eco_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleOnboardingComplete = (userData: any) => {
    localStorage.setItem('eco_user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    if (window.confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      localStorage.removeItem('eco_user');
      setUser(null);
      setActiveTab('home');
    }
  };
  
  // Shared State
  const [calculatorData, setCalculatorData] = useState<{
    transport: number;
    electricity: number;
    water: number;
    meat: number;
    result: number | null;
  }>({
    transport: 0,
    electricity: 0,
    water: 0,
    meat: 0,
    result: null,
  });

  const [challengesData, setChallengesData] = useState<{
    completed: number[];
    score: number;
  }>({
    completed: [],
    score: 0,
  });

  // Sync score with localStorage whenever it changes
  useEffect(() => {
    if (!user) return;

    // 1. Update current user session
    const updatedUser = { ...user, score: challengesData.score };
    localStorage.setItem('eco_user', JSON.stringify(updatedUser));

    // 2. Update user in global users list
    const storedUsers = JSON.parse(localStorage.getItem('eco_users') || '[]');
    const updatedUsers = storedUsers.map((u: any) => 
      u.name === user.name ? { ...u, score: challengesData.score } : u
    );
    localStorage.setItem('eco_users', JSON.stringify(updatedUsers));

    // 3. Update team score if user has a team
    if (user.teamName) {
      const storedTeams = JSON.parse(localStorage.getItem('eco_teams') || '[]');
      // Recalculate team score based on all members
      // Note: In a real app this would be backend logic. 
      // Here we will just add the difference or re-sum if we had all member scores.
      // For simplicity in this local-first demo, we'll just update the team score 
      // by summing up scores of all users in that team from eco_users.
      
      const teamMembers = updatedUsers.filter((u: any) => u.teamName === user.teamName);
      const teamTotalScore = teamMembers.reduce((acc: number, curr: any) => acc + (curr.score || 0), 0);

      const updatedTeams = storedTeams.map((t: any) => 
        t.name === user.teamName ? { ...t, score: teamTotalScore } : t
      );
      localStorage.setItem('eco_teams', JSON.stringify(updatedTeams));
    }
  }, [challengesData.score, user]);

  const [plantedTrees, setPlantedTrees] = useState(0);

  // Streak State
  const [streak, setStreak] = useState<{
    count: number;
    lastActivityDate: string | null;
  }>({
    count: 0,
    lastActivityDate: null,
  });

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = streak.lastActivityDate;

    if (lastDate === today) {
      return; // Already updated today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    if (lastDate === yesterdayString) {
      setStreak(prev => ({
        count: prev.count + 1,
        lastActivityDate: today
      }));
    } else {
      setStreak({
        count: 1,
        lastActivityDate: today
      });
    }
  };

  const handlePlantTree = () => {
    setPlantedTrees(prev => prev + 1);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home 
            onStart={() => setActiveTab('awareness')} 
            score={challengesData.score}
            plantedTrees={plantedTrees}
            onPlantTree={handlePlantTree}
            streak={streak.count}
            userName={user.name}
          />
        );
      case 'awareness':
        return <Awareness />;
      case 'calculator':
        return (
          <Calculator 
            data={calculatorData} 
            setData={setCalculatorData} 
          />
        );
      case 'challenges':
        return (
          <Challenges 
            data={challengesData} 
            setData={setChallengesData} 
            onCompleteChallenge={updateStreak}
          />
        );
      case 'games':
        return (
          <Games 
            onScoreUpdate={(points) => setChallengesData(prev => ({ ...prev, score: prev.score + points }))}
          />
        );
      case 'leaderboard':
        return <Leaderboard />;
      case 'market':
        return (
          <Market 
            score={challengesData.score}
            onRedeem={(points) => setChallengesData(prev => ({ ...prev, score: prev.score - points }))}
            userName={user.name}
          />
        );
      case 'reports':
        return (
          <Reports 
            calculatorData={calculatorData} 
            challengesData={challengesData} 
            onNavigateToCalculator={() => setActiveTab('calculator')}
          />
        );
      default:
        return <Home onStart={() => setActiveTab('awareness')} trees={trees} />;
    }
  };

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout>
      <main className="min-h-screen pb-16 md:pb-0 md:pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
    </Layout>
  );
}
