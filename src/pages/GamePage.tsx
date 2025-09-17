import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchBoard from '@/components/game/MatchBoard';
import GameHUD from '@/components/game/GameHUD';
import RewardModal from '@/components/game/RewardModal';
import PmCard from '@/components/atoms/PmCard';
import PmButton from '@/components/atoms/PmButton';
import PmToast from '@/components/atoms/PmToast';
import { MOCK_WORDS, generateCandidates } from '@/data/mockData';
import { Word, Candidate, GameResult } from '@/types/domain';
import { ArrowLeft, Play } from 'lucide-react';

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [progress, setProgress] = useState(0);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const correctAnswersRef = useRef(0);
  const totalAnswersRef = useRef(0);
  const maxComboRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout>();

  const currentWord = MOCK_WORDS[currentWordIndex % MOCK_WORDS.length];

  // Initialize candidates when word changes
  useEffect(() => {
    setCandidates(generateCandidates(currentWord));
  }, [currentWord]);

  // Game timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [gameState, timeLeft]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setCombo(0);
    setTimeLeft(90);
    setProgress(0);
    setCurrentWordIndex(0);
    correctAnswersRef.current = 0;
    totalAnswersRef.current = 0;
    maxComboRef.current = 0;
  };

  const handleMatch = useCallback((isCorrect: boolean) => {
    totalAnswersRef.current += 1;
    
    if (isCorrect) {
      correctAnswersRef.current += 1;
      const newCombo = combo + 1;
      setCombo(newCombo);
      maxComboRef.current = Math.max(maxComboRef.current, newCombo);
      
      // Score calculation: base score + combo bonus
      const baseScore = 10;
      const comboBonus = Math.floor(newCombo / 5) * 5; // Bonus every 5 combo
      const earnedScore = baseScore + comboBonus;
      setScore(prev => prev + earnedScore);
      
      // Time bonus for correct answers
      setTimeLeft(prev => Math.min(prev + 3, 120));
      
      setToast({ message: `+${earnedScore} 分!`, type: 'success' });
    } else {
      setCombo(0);
      // Time penalty for wrong answers
      setTimeLeft(prev => Math.max(prev - 5, 10));
      setToast({ message: '答错了！', type: 'error' });
    }

    // Progress calculation
    const newProgress = Math.min(100, (totalAnswersRef.current / 20) * 100);
    setProgress(newProgress);

    // Move to next word
    setCurrentWordIndex(prev => prev + 1);

    // Auto-hide toast
    setTimeout(() => setToast(null), 2000);

    // Check win condition
    if (newProgress >= 100) {
      setTimeout(() => setGameState('finished'), 1000);
    }
  }, [combo]);

  const handleAgain = () => {
    setGameState('ready');
  };

  const handleHome = () => {
    navigate('/');
  };

  const getGameResult = (): GameResult => {
    const accuracy = totalAnswersRef.current > 0 
      ? Math.round((correctAnswersRef.current / totalAnswersRef.current) * 100) 
      : 0;
    
    return {
      accuracy,
      timeUsed: 90 - timeLeft,
      comboMax: maxComboRef.current,
      newMastered: Math.floor(correctAnswersRef.current / 3),
      score,
      rewardText: '提示卡×1 + 单词碎片×20'
    };
  };

  return (
    <div className="min-h-screen bg-game-bg p-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-game-text" />
        </button>
        <h1 className="text-lg font-bold text-game-text">每日挑战</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {gameState === 'ready' && (
        <div className="space-y-6 mt-10">
          <PmCard className="text-center p-8">
            <div className="space-y-4">
              <div className="text-6xl">🎯</div>
              <h2 className="text-xl font-bold text-game-text">准备开始挑战</h2>
              <div className="text-game-muted space-y-2">
                <p>今日目标：匹配 20 个单词</p>
                <p>初始时间：90 秒</p>
                <p>正确匹配可获得额外时间</p>
              </div>
            </div>
          </PmCard>
          
          <PmButton
            variant="hero"
            fullWidth
            onClick={startGame}
            icon={<Play className="h-5 w-5" />}
            className="text-lg py-4"
          >
            开始挑战
          </PmButton>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-4">
          <GameHUD
            progress={progress}
            score={score}
            combo={combo}
            timeLeft={timeLeft}
          />
          
          <MatchBoard
            word={currentWord}
            candidates={candidates}
            onMatch={handleMatch}
            disabled={false}
          />
        </div>
      )}

      {gameState === 'finished' && (
        <RewardModal
          result={getGameResult()}
          onAgain={handleAgain}
          onHome={handleHome}
          visible={true}
        />
      )}

      {/* Toast notification */}
      {toast && (
        <PmToast
          type={toast.type}
          message={toast.message}
          visible={true}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default GamePage;