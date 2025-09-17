import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Word, Candidate } from '@/types/domain';
import PmCard from '@/components/atoms/PmCard';
import { Volume2 } from 'lucide-react';

export interface MatchBoardProps {
  word: Word;
  candidates: Candidate[];
  onMatch: (correct: boolean) => void;
  onExhaust?: () => void;
  disabled?: boolean;
}

const MatchBoard: React.FC<MatchBoardProps> = ({
  word,
  candidates,
  onMatch,
  onExhaust,
  disabled = false
}) => {
  const [animatingCard, setAnimatingCard] = useState<string | null>(null);

  const handleCandidateClick = (candidate: Candidate) => {
    if (disabled || animatingCard) return;

    setAnimatingCard(candidate.id);
    
    // Trigger animation
    setTimeout(() => {
      onMatch(candidate.correct);
      setAnimatingCard(null);
    }, 300);
  };

  const playPronunciation = () => {
    // In real implementation, this would play audio
    console.log(`Playing pronunciation for: ${word.en}`);
  };

  return (
    <div className="flex gap-4 h-[280px]">
      {/* Left side - Word display */}
      <div className="flex-1">
        <PmCard className="h-full flex flex-col items-center justify-center text-center p-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-game-text">{word.en}</h2>
            {word.phonetic && (
              <div className="flex items-center justify-center gap-2">
                <span className="text-game-muted text-sm">{word.phonetic}</span>
                <button
                  onClick={playPronunciation}
                  className="p-1 rounded-full hover:bg-game-bg transition-colors"
                >
                  <Volume2 className="h-4 w-4 text-game-muted" />
                </button>
              </div>
            )}
            <div className="text-xs text-game-muted space-x-2">
              <span className="px-2 py-1 bg-game-lemon/20 rounded-game-sm">{word.level}</span>
              <span className="px-2 py-1 bg-game-mint/20 rounded-game-sm">{word.scene}</span>
            </div>
          </div>
        </PmCard>
      </div>

      {/* Right side - Candidates */}
      <div className="flex-1">
        <PmCard className="h-full p-3">
          <div className="space-y-3 h-full overflow-y-auto">
            {candidates.map((candidate) => (
              <button
                key={candidate.id}
                onClick={() => handleCandidateClick(candidate)}
                disabled={disabled || animatingCard === candidate.id}
                className={cn(
                  'w-full p-4 text-left rounded-game-md border-2 border-transparent',
                  'hover:border-game-mint hover:bg-game-mint/5 transition-all duration-200',
                  'active:scale-[0.98] disabled:opacity-50',
                  animatingCard === candidate.id && candidate.correct && 'animate-hit-flash border-game-mint',
                  animatingCard === candidate.id && !candidate.correct && 'animate-miss-shake border-red-400'
                )}
              >
                <span className="text-base text-game-text font-medium">
                  {candidate.label}
                </span>
              </button>
            ))}
          </div>
        </PmCard>
      </div>

      {/* Animation containers */}
      <div data-anim="combo" className="hidden" />
      <div data-anim="fireworks" className="hidden" />
    </div>
  );
};

export default MatchBoard;