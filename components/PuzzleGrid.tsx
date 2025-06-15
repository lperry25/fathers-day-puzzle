import { useState, useEffect } from 'react';

// Define the puzzle clues and answers - removing punctuation from answers
const puzzleData = [
  // LOVE
  { id: 1, clue: "Affection or deep attachment", answer: "LOVE", messageLetters: [0] }, // L
  { id: 2, clue: "Circular shape or ring", answer: "LOOP", messageLetters: [1] }, // O 
  { id: 3, clue: "Fixed in intense attention", answer: "RIVETED", messageLetters: [2] }, // V
  { id: 4, clue: "Symbol of an idea or identity", answer: "EMBLEM", messageLetters: [0] }, // E
  
  // YOU
  { id: 5, clue: "Shout of excitement", answer: "YODEL", messageLetters: [0] }, // Y
  { id: 6, clue: "Spherical celestial object", answer: "ORB", messageLetters: [0] }, // O 
  { id: 7, clue: "Shaped like a windpipe", answer: "TUBULAR", messageLetters: [1] }, // U
  
  // DAD
  { id: 8, clue: "Paternal guardian", answer: "DAD", messageLetters: [0] }, // D
  { id: 9, clue: "First letter in Greek alphabet", answer: "ALPHA", messageLetters: [0] }, // A
  { id: 10, clue: "Full of theatrical flair", answer: "DRAMATIC", messageLetters: [0] }, // D

  // HAVE
  { id: 11, clue: "Dwelling for animals", answer: "HABITAT", messageLetters: [0] }, // H 
  { id: 12, clue: "Certainty beyond reasonable doubt", answer: "ASSURED", messageLetters: [0] }, // A
  { id: 13, clue: "Path across a space or structure", answer: "TRAVERSAL", messageLetters: [3] }, // V
  { id: 14, clue: "Phantom seen in eerie places", answer: "SPECTERS", messageLetters: [2] }, // E

  // A
  { id: 15, clue: "Substantial in magnitude", answer: "GIGANTIC", messageLetters: [3] }, // A

  // GREAT
  { id: 16, clue: "Initial creative breakthrough", answer: "GENESIS", messageLetters: [0] }, // G
  { id: 17, clue: "Cardinal direction of sunrise", answer: "EASTERN", messageLetters: [5] }, // R 
  { id: 18, clue: "Terminal destination", answer: "ENDPOINT", messageLetters: [0] }, // E
  { id: 19, clue: "Ancient Greek marketplace", answer: "AGORA", messageLetters: [0] }, // A
  { id: 20, clue: "Systematic organization of info", answer: "TAXONOMY", messageLetters: [0] }, // T 
  
  // FATHER
  { id: 21, clue: "Fundamental principle", answer: "FACT", messageLetters: [0] }, // F
  { id: 22, clue: "Astronomical explosion visible from Earth", answer: "SUPERNOVA", messageLetters: [8] }, // A
  { id: 23, clue: "Temporal measurement device", answer: "TIMEPIECE", messageLetters: [0] }, // T 
  { id: 24, clue: "Aromatic foliage from herbaceous plant", answer: "HERBAL", messageLetters: [0] }, // H 
  { id: 25, clue: "Educational institution", answer: "COLLEGE", messageLetters: [4] }, // E 
  { id: 26, clue: "Panoramic vista", answer: "SCENERY", messageLetters: [5] }, // R
  
  // 'S
  { id: 27, clue: "Dazed mental state", answer: "STUPOR", messageLetters: [0] }, // S
  
  // DAY!
  { id: 28, clue: "Creation of visible boundary", answer: "DEMARCATION", messageLetters: [0] }, // D
  { id: 29, clue: "Overwhelming surprise", answer: "ASTONISHMENT", messageLetters: [0] }, // A 
  { id: 30, clue: "Juvenile development stage", answer: "YOUTH", messageLetters: [0] }, // Y 
  
  // LOVE
  { id: 31, clue: "Lion constellation in zodiac", answer: "LEO", messageLetters: [0] }, // L
  { id: 32, clue: "Vacant space above surface", answer: "OVERHEAD", messageLetters: [0] }, // O 
  { id: 33, clue: "Triumphant gladiatorial gesture", answer: "VICTORY", messageLetters: [0] }, // V 
  { id: 34, clue: "Essential element for respiration", answer: "OXYGEN", messageLetters: [4] }, // E 
  
  // LAURA
  { id: 35, clue: "Directional illuminating device", answer: "FLASHLIGHT", messageLetters: [1] }, // L
  { id: 36, clue: "Spiritual or emotional radiance", answer: "AURA", messageLetters: [0] }, // A
  { id: 37, clue: "Underground passage", answer: "TUNNEL", messageLetters: [1] }, // U
  { id: 38, clue: "Circular theatrical platform", answer: "ARENA", messageLetters: [1] }, // R
  { id: 39, clue: "Primary visual representation", answer: "APPEARANCE", messageLetters: [0] }, // A
  
  // AND
  { id: 40, clue: "Primary means of linguistic communication", answer: "LANGUAGE", messageLetters: [1] }, // A
  { id: 41, clue: "Negation in formal logic", answer: "DENIAL", messageLetters: [2] }, // N 
  { id: 42, clue: "Geometric shape with equal sides", answer: "DIAMOND", messageLetters: [0] }, // D 
  
  // EMILIE
  { id: 43, clue: "Ethereal being of spiritual nature", answer: "ENTITY", messageLetters: [0] }, // E
  { id: 44, clue: "Skilled mountaineer's challenge", answer: "SUMMIT", messageLetters: [2] }, // M
  { id: 45, clue: "Insignificant amount", answer: "IOTA", messageLetters: [0] }, // I
  { id: 46, clue: "Formal written communication", answer: "LETTER", messageLetters: [0] }, // L
  { id: 47, clue: "Perceptive observation", answer: "INSIGHT", messageLetters: [0] }, // I 
  { id: 48, clue: "Greek letter corresponding to E", answer: "EPSILON", messageLetters: [0] }, // E
];

// The secret message including punctuation
const secretMessage = "LOVE YOU DAD! HAVE A GREAT FATHER'S DAY! LOVE LAURA AND EMILIE";

// Helper function to determine if a character is punctuation or space
const isPunctuationOrSpace = (char: string): boolean => {
  return /[^\w]/.test(char) || char === ' ';
};

interface PuzzleGridProps {
  onMessageUpdate: (message: string) => void;
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({ onMessageUpdate }) => {
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(puzzleData.length).fill(''));
  const [activeClue, setActiveClue] = useState<number | null>(null);
  const [revealedMessage, setRevealedMessage] = useState<string[]>(
    secretMessage.split('').map(char => isPunctuationOrSpace(char) ? char : '')
  );

  // Update the revealed message whenever user answers change
  useEffect(() => {
    // Create a copy of the initial state with punctuation preserved
    const newRevealedMessage = secretMessage.split('').map(char => 
      isPunctuationOrSpace(char) ? char : ''
    );
    
    // Track which puzzle corresponds to which letter in the secret message
    let letterIndex = 0;
    const letterToPuzzleMap = new Map<number, { puzzleId: number, letterIndex: number }>();
    
    // Map each non-punctuation character position to its puzzle
    secretMessage.split('').forEach((char, index) => {
      if (!isPunctuationOrSpace(char)) {
        letterToPuzzleMap.set(index, {
          puzzleId: puzzleData[letterIndex].id,
          letterIndex: puzzleData[letterIndex].messageLetters[0]
        });
        letterIndex++;
      }
    });
    
    // Fill in the revealed letters based on correct answers
    puzzleData.forEach((puzzle, index) => {
      const userAnswer = userAnswers[index]?.toUpperCase() || '';
      
      // Check if the answer is correct
      if (userAnswer && userAnswer === puzzle.answer.toUpperCase()) {
        // Find where this letter belongs in the secret message
        for (const [msgIndex, mapping] of letterToPuzzleMap.entries()) {
          if (mapping.puzzleId === puzzle.id) {
            // Put the correct letter in the right position
            const letterPos = mapping.letterIndex;
            if (letterPos < userAnswer.length) {
              newRevealedMessage[msgIndex] = userAnswer[letterPos];
            }
            break;
          }
        }
      }
    });
    
    setRevealedMessage(newRevealedMessage);
    onMessageUpdate(newRevealedMessage.join(''));
  }, [userAnswers, secretMessage, onMessageUpdate]);

  // Handle input change for a puzzle answer
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value.toUpperCase();
    setUserAnswers(newAnswers);
  };

  // Check if the answer is correct
  const isAnswerCorrect = (index: number) => {
    return userAnswers[index].toUpperCase() === puzzleData[index].answer.toUpperCase();
  };
  
  // Reveal the answer for a specific puzzle
  const revealAnswer = (index: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = puzzleData[index].answer;
    setUserAnswers(newAnswers);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Clues Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4 text-primary">Clues</h2>
          <div className="space-y-1">
            {puzzleData.map((puzzle, index) => (
              <div 
                key={puzzle.id}
                className={`puzzle-clue p-2 cursor-pointer rounded ${activeClue === index ? 'bg-blue-100 puzzle-clue-active' : ''}`}
                onClick={() => setActiveClue(index)}
              >
                <span className="font-bold mr-2">{puzzle.id}.</span>
                {puzzle.clue}
              </div>
            ))}
          </div>
        </div>

        {/* Answers Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4 text-primary">Answers</h2>
          <div className="space-y-1">
            {puzzleData.map((puzzle, index) => (
              <div key={puzzle.id} className="flex items-center">
                <span className="font-bold mr-2 w-8">{puzzle.id}.</span>
                <div className="flex-1">
                  <input
                    type="text"
                    value={userAnswers[index]}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className={`w-full p-2 border rounded-md ${
                      userAnswers[index] && isAnswerCorrect(index)
                        ? 'border-green-500 bg-green-50'
                        : userAnswers[index]
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-300'
                    }`}
                    placeholder={`${puzzle.answer.length} letters`}
                    maxLength={puzzle.answer.length}
                    onFocus={() => setActiveClue(index)}
                  />
                </div>
                {userAnswers[index] && isAnswerCorrect(index) && (
                  <div className="ml-2 text-sm text-green-600">
                    <span className="text-xs" title="Contributing to secret message">★</span>
                  </div>
                )}
                  <button
                    className="ml-2 p-1 px-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm"
                    onClick={() => revealAnswer(index)}
                    title="Reveal answer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secret Message Preview - modified to show punctuation always */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Secret Message Progress:</h3>
        <div className="flex flex-wrap gap-2">
          {secretMessage.split('').map((char, index) => (
            <div 
              key={index}
              className={`w-8 h-8 flex items-center justify-center border 
                ${isPunctuationOrSpace(char) ? 'bg-gray-100 border-gray-400' : 
                  revealedMessage[index] ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300'}`}
            >
              {isPunctuationOrSpace(char) ? char : revealedMessage[index]}
            </div>
          ))}
        </div>
        
        {/* Reveal All Button */}
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            onClick={() => {
              const newAnswers = puzzleData.map(puzzle => puzzle.answer);
              setUserAnswers(newAnswers);
            }}
          >
            Reveal All Answers
          </button>
        </div>
      </div>
    </div>
  );
};

export default PuzzleGrid;
