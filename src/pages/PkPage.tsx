import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchBoard from '@/components/game/MatchBoard';
import PkScoreboard from '@/components/game/PkScoreboard';
import RewardModal from '@/components/game/RewardModal';
import PmCard from '@/components/atoms/PmCard';
import PmButton from '@/components/atoms/PmButton';
import PmToast from '@/components/atoms/PmToast';
import { MOCK_WORDS, generateCandidates, MOCK_PK_MATCH } from '@/data/mockData';
import { Word, Candidate, PkMatch, GameResult } from '@/types/domain';
import { ArrowLeft, Users } from 'lucide-react';

const PkPage: React.FC = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<'searching' | 'ready' | 'playing' | 'finished'>('searching');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [pkMatch, setPkMatch] = useState<PkMatch>(MOCK_PK_MATCH);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const correctAnswersRef = useRef(0);
  const totalAnswersRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout>();
  const rivalScoreTimerRef = useRef<NodeJS.Timeout>();

  const currentWord = MOCK_WORDS[currentWordIndex % MOCK_WORDS.length];

  // Initialize candidates when word changes
  useEffect(() => {
    setCandidates(generateCandidates(currentWord));
  }, [currentWord]);

  // Mock searching for opponent
  useEffect(() => {
    if (gameState === 'searching') {
      const searchTimer = setTimeout(() => {
        setGameState('ready');
      }, 2000);
      return () => clearTimeout(searchTimer);
    }
  }, [gameState]);

  // PK timer
  useEffect(() => {
    if (gameState === 'playing' && pkMatch.timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setPkMatch(prev => {
          const newTimeLeft = prev.timeLeft - 1;
          if (newTimeLeft <= 0) {
            setGameState('finished');
            return { ...prev, timeLeft: 0, status: 'finished' };
          }
          return { ...prev, timeLeft: newTimeLeft };
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [gameState, pkMatch.timeLeft]);

  // Simulate rival scoring
  useEffect(() => {
    if (gameState === 'playing') {
      rivalScoreTimerRef.current = setTimeout(() => {
        if (Math.random() < 0.3) { // 30% chance rival scores
          setPkMatch(prev => ({
            ...prev,
            rivalScore: prev.rivalScore + Math.floor(Math.random() * 15) + 5
          }));
        }
      }, Math.random() * 5000 + 2000); // Random interval 2-7 seconds
    }

    return () => {
      if (rivalScoreTimerRef.current) clearTimeout(rivalScoreTimerRef.current);
    };
  }, [gameState, currentWordIndex]);

  const startGame = () => {
    setGameState('playing');
    setPkMatch(prev => ({ ...prev, timeLeft: 300, status: 'playing' })); // 5 minutes
    setCurrentWordIndex(0);
    correctAnswersRef.current = 0;
    totalAnswersRef.current = 0;
  };

  const handleMatch = (isCorrect: boolean) => {
    totalAnswersRef.current += 1;
    
    if (isCorrect) {
      correctAnswersRef.current += 1;
      const earnedScore = Math.floor(Math.random() * 10) + 15; // 15-25 points
      setPkMatch(prev => ({
        ...prev,
        meScore: prev.meScore + earnedScore
      }));
      
      setToast({ message: `+${earnedScore} 分!`, type: 'success' });
    } else {
      setToast({ message: '答错了！', type: 'error' });
    }

    // Move to next word
    setCurrentWordIndex(prev => prev + 1);
    setTimeout(() => setToast(null), 2000);
  };

  const handleAgain = () => {
    setGameState('searching');
    setPkMatch({
      ...MOCK_PK_MATCH,
      meScore: 0,
      rivalScore: Math.floor(Math.random() * 100)
    });
  };

  const handleHome = () => {
    navigate('/');
  };

  const getGameResult = (): GameResult => {
    const accuracy = totalAnswersRef.current > 0 
      ? Math.round((correctAnswersRef.current / totalAnswersRef.current) * 100) 
      : 0;
    
    const isWinner = pkMatch.meScore > pkMatch.rivalScore;
    
    return {
      accuracy,
      timeUsed: 300 - pkMatch.timeLeft,
      comboMax: Math.floor(correctAnswersRef.current / 3),
      newMastered: Math.floor(correctAnswersRef.current / 5),
      score: pkMatch.meScore,
      rewardText: isWinner ? 'PK胜利奖励×1 + 金币×50' : '参与奖励×1 + 金币×20'
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
        <h1 className="text-lg font-bold text-game-text">好友PK</h1>
        <div className="w-10" />
      </div>

      {gameState === 'searching' && (
        <div className="space-y-6 mt-10">
          <PmCard className="text-center p-8">
            <div className="space-y-4">
              <div className="text-6xl animate-pulse">🔍</div>
              <h2 className="text-xl font-bold text-game-text">正在匹配对手</h2>
              <div className="text-game-muted">
                <p>正在为您寻找实力相近的对手...</p>
              </div>
            </div>
          </PmCard>
        </div>
      )}

      {gameState === 'ready' && (
        <div className="space-y-6 mt-6">
          <PmCard className="text-center p-6">
            <div className="space-y-4">
              <div className="text-4xl">⚔️</div>
              <h2 className="text-lg font-bold text-game-text">找到对手了！</h2>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <img
                    src="/placeholder.svg"
                    alt="Me"
                    className="w-12 h-12 rounded-full mx-auto mb-2"
                  />
                  <div className="text-sm text-game-text">你</div>
                </div>
                <div className="text-2xl">VS</div>
                <div className="text-center">
                  <img
                    src={pkMatch.rivalAvatar}
                    alt={pkMatch.rivalName}
                    className="w-12 h-12 rounded-full mx-auto mb-2"
                  />
                  <div className="text-sm text-game-text">{pkMatch.rivalName}</div>
                </div>
              </div>
              <div className="text-game-muted text-sm">
                <p>PK时长：5分钟</p>
                <p>答对越多，分数越高！</p>
              </div>
            </div>
          </PmCard>
          
          <PmButton
            variant="hero"
            fullWidth
            onClick={startGame}
            icon={<Users className="h-5 w-5" />}
            className="text-lg py-4"
          >
            开始PK
          </PmButton>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-4">
          <PkScoreboard
            match={pkMatch}
            userAvatar="/placeholder.svg"
            userName="你"
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

export default PkPage;