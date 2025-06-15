import { useState, useEffect } from 'react';

// Define the puzzle clues and answers
const puzzleData = [
  { id: 1, clue: "Affection or deep attachment (4)", answer: "LOVE", messageLetters: [0] }, // L
  { id: 2, clue: "Circular shape or ring (4)", answer: "LOOP", messageLetters: [1] }, // O
  { id: 3, clue: "Captivated and unable to turn away (7)", answer: "RIVETED", messageLetters: [2] }, // V
  { id: 4, clue: "Symbol denoting conceptual possibilities (8)", answer: "PARADIGM", messageLetters: [5] }, // E
  { id: 5, clue: "Shout of excitement (5)", answer: "YODEL", messageLetters: [0] }, // Y
  { id: 6, clue: "Spherical celestial object (5)", answer: "ORION", messageLetters: [0] }, // O
  { id: 7, clue: "Anatomical passage for respiration (7)", answer: "TUBULAR", messageLetters: [0] }, // U
  { id: 8, clue: "Paternal guardian (5)", answer: "DADDY", messageLetters: [0] }, // D
  { id: 9, clue: "First letter in Greek alphabet (5)", answer: "ALPHA", messageLetters: [0] }, // A
  { id: 10, clue: "Essential feature of exclamation (8)", answer: "DRAMATIC", messageLetters: [0] }, // D
  { id: 11, clue: "Unrequested electronic correspondence (9)", answer: "JUNK-MAIL!", messageLetters: [8] }, // !
  { id: 12, clue: "Dwelling for nocturnal winged mammals (6)", answer: "CAVERN", messageLetters: [2] }, // H
  { id: 13, clue: "Certainty beyond reasonable doubt (7)", answer: "ASSURED", messageLetters: [0] }, // A
  { id: 14, clue: "Horizontal navigation instrument (7)", answer: "SEXTANT", messageLetters: [3] }, // V
  { id: 15, clue: "Ethereal apparitions in haunted locations (8)", answer: "SPECTERS", messageLetters: [4] }, // E
  { id: 16, clue: "Substantial in magnitude (8)", answer: "GIGANTIC", messageLetters: [3] }, // A
  { id: 17, clue: "Initial creative breakthrough (7)", answer: "GENESIS", messageLetters: [0] }, // G
  { id: 18, clue: "Cardinal direction of sunrise (7)", answer: "EASTERN", messageLetters: [2] }, // R
  { id: 19, clue: "Terminal destination (8)", answer: "ENDPOINT", messageLetters: [2] }, // E
  { id: 20, clue: "Precipitation in frigid conditions (5)", answer: "SLEET", messageLetters: [0] }, // A
  { id: 21, clue: "Systematic organization of info (8)", answer: "TAXONOMY", messageLetters: [1] }, // T
  
  // Continue with more clues for the full message
  { id: 22, clue: "Progenitor of family lineage (9)", answer: "PATRIARCH", messageLetters: [3] }, // F
  { id: 23, clue: "Astronomical explosion visible from Earth (9)", answer: "SUPERNOVA", messageLetters: [4] }, // A
  { id: 24, clue: "Temporal measurement device (10)", answer: "TIMEPIECE", messageLetters: [0] }, // T
  { id: 25, clue: "Aromatic foliage from herbaceous plant (6)", answer: "HERBAL", messageLetters: [0] }, // H
  { id: 26, clue: "Melodic vocal expression (8)", answer: "CHANTING", messageLetters: [4] }, // E
  { id: 27, clue: "Panoramic vista (7)", answer: "SCENERY", messageLetters: [2] }, // R
  { id: 28, clue: "Archaic expression for affirmative (9)", answer: "FORSOOTH", messageLetters: [0] }, // '
  { id: 29, clue: "Cerebral disorder characterizing confusion (8)", answer: "DELIRIUM", messageLetters: [1] }, // S
  
  // Continue for DAY!
  { id: 30, clue: "Creation of visible boundary (13)", answer: "DEMARCATION", messageLetters: [0] }, // D
  { id: 31, clue: "Initial vocal response to surprise (15)", answer: "ASTONISHMENT", messageLetters: [0] }, // A
  { id: 32, clue: "Juvenile development stage (5)", answer: "YOUTH", messageLetters: [0] }, // Y
  { id: 33, clue: "Indication of strong emotion (13)", answer: "EXCLAMATION", messageLetters: [0] }, // !
  
  // LOVE LAURA AND EMILIE
  { id: 34, clue: "Profound romantic attachment (9)", answer: "ADORATION", messageLetters: [3] }, // L
  { id: 35, clue: "Vacant space above surface (8)", answer: "OVERHEAD", messageLetters: [0] }, // O
  { id: 36, clue: "Triumphant gladiatorial gesture (7)", answer: "VICTORY", messageLetters: [0] }, // V
  { id: 37, clue: "Essential element for respiration (6)", answer: "OXYGEN", messageLetters: [0] }, // E
  { id: 38, clue: "Directional illuminating device (10)", answer: "FLASHLIGHT", messageLetters: [1] }, // L
  { id: 39, clue: "Atmosphere surrounding celestial body (4)", answer: "AURA", messageLetters: [0] }, // A
  { id: 40, clue: "Naval fleet's defensive formation (6)", answer: "ARMADA", messageLetters: [1] }, // U
  { id: 41, clue: "Circular theatrical platform (6)", answer: "ARENA", messageLetters: [0] }, // R
  { id: 42, clue: "Alphabetical character after Z (9)", answer: "AMPERSAND", messageLetters: [0] }, // A
  { id: 43, clue: "Primary means of linguistic communication (8)", answer: "LANGUAGE", messageLetters: [4] }, // A
  { id: 44, clue: "Negation in formal logic (6)", answer: "DENIAL", messageLetters: [2] }, // N
  { id: 45, clue: "Geometric shape with equal sides (7)", answer: "DIAMOND", messageLetters: [0] }, // D
  { id: 46, clue: "Ethereal being of spiritual nature (6)", answer: "ENTITY", messageLetters: [0] }, // E
  { id: 47, clue: "Skilled mountaineer's challenge (6)", answer: "SUMMIT", messageLetters: [2] }, // M
  { id: 48, clue: "Horizontal structural component (6)", answer: "LINTEL", messageLetters: [0] }, // I
  { id: 49, clue: "Persistence despite adversity (8)", answer: "TENACITY", messageLetters: [3] }, // L
  { id: 50, clue: "Greek letter corresponding to E (7)", answer: "EPSILON", messageLetters: [0] }, // E
];

// The secret message that will be revealed
const secretMessage = "LOVE YOU DAD! HAVE A GREAT FATHER'S DAY! LOVE LAURA AND EMILIE";

interface PuzzleGridProps {
  onMessageUpdate: (message: string) => void;
}

const PuzzleGrid: React.FC<PuzzleGridProps> = ({ onMessageUpdate }) => {
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(puzzleData.length).fill(''));
  const [activeClue, setActiveClue] = useState<number | null>(null);
  const [revealedMessage, setRevealedMessage] = useState<string>('');

  // Update the revealed message whenever user answers change
  useEffect(() => {
    let message = '';
    
    puzzleData.forEach((puzzle, index) => {
      const userAnswer = userAnswers[index].toUpperCase();
      if (userAnswer && isAnswerCorrect(index)) {
        puzzle.messageLetters.forEach(letterIndex => {
          if (letterIndex < userAnswer.length) {
            message += userAnswer[letterIndex];
          }
        });
      } else {
        puzzle.messageLetters.forEach(() => {
          message += '';
        });
      }
    });

    setRevealedMessage(message);
    onMessageUpdate(message);
  }, [userAnswers, onMessageUpdate]);

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
                {puzzle.clue} ({puzzle.answer.length})
              </div>
            ))}
          </div>
        </div>

        {/* Answers Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4 text-primary">Answers</h2>
          <div className="space-y-4">
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secret Message Preview */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Secret Message Progress:</h3>
        <div className="flex flex-wrap gap-2">
          {secretMessage.split('').map((char, index) => (
            <div 
              key={index}
              className={`w-8 h-8 flex items-center justify-center border ${
                revealedMessage[index] ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300'
              }`}
            >
              {revealedMessage[index] || (char === ' ' ? ' ' : '')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PuzzleGrid;
