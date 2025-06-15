import { useState, useEffect } from 'react';

// Define the puzzle clues and answers
const puzzleData = [
  { id: 1, clue: "Angling activity with rod and reel", answer: "FISHING", firstLetterIndex: 0 },
  { id: 2, clue: "Extremely impressive or excellent", answer: "AWESOME", firstLetterIndex: 1 },
  { id: 3, clue: "Sliced bread browned by heat", answer: "TOAST", firstLetterIndex: 2 },
  { id: 4, clue: "Ice sport played with sticks and a puck", answer: "HOCKEY", firstLetterIndex: 3 },
  { id: 5, clue: "Warmest season of the year", answer: "SUMMER", firstLetterIndex: 4 },
  { id: 6, clue: "Film genre with thrilling sequences and stunts", answer: "ACTION", firstLetterIndex: 5 },
  { id: 7, clue: "Frozen dairy dessert, often in a cone", answer: "ICECREAM", firstLetterIndex: 6 },
  { id: 8, clue: "Outdoor platform attached to a house", answer: "DECK", firstLetterIndex: 7 },
  { id: 9, clue: "Genre of music characterized by electric guitars and drums", answer: "ROCK", firstLetterIndex: 8 },
  { id: 10, clue: "December 25th celebration", answer: "CHRISTMAS", firstLetterIndex: 9 },
  { id: 11, clue: "Caffeinated morning beverage", answer: "COFFEE", firstLetterIndex: 10 },
  { id: 12, clue: "Tool for driving nails", answer: "HAMMER", firstLetterIndex: 11 },
  { id: 13, clue: "Color of the sky on a clear day", answer: "BLUE", firstLetterIndex: 12 },
  { id: 14, clue: "Man's best friend", answer: "DOG", firstLetterIndex: 13 },
  { id: 15, clue: "Thin, crispy potato snack", answer: "CHIPS", firstLetterIndex: 14 },
  { id: 16, clue: "Reality show where contestants are voted off an island", answer: "SURVIVOR", firstLetterIndex: 15 },
  { id: 17, clue: "Rugged 4x4 vehicle brand", answer: "JEEP", firstLetterIndex: 16 },
  { id: 18, clue: "Walking activity on trails or mountains", answer: "HIKING", firstLetterIndex: 17 },
  { id: 19, clue: "Time between afternoon and night", answer: "EVENING", firstLetterIndex: 18 },
  { id: 20, clue: "Audible expression of amusement", answer: "LAUGHTER", firstLetterIndex: 19 },
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
    const message = userAnswers.map((answer, index) => {
      const puzzle = puzzleData[index];
      if (answer && puzzle.firstLetterIndex < answer.length) {
        return answer[puzzle.firstLetterIndex] || '';
      }
      return '';
    }).join('');

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
    return userAnswers[index] === puzzleData[index].answer;
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
                className={`puzzle-clue ${activeClue === index ? 'puzzle-clue-active' : ''}`}
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
          <div className="space-y-4">
            {puzzleData.map((puzzle, index) => (
              <div key={puzzle.id} className="flex items-center">
                <span className="font-bold mr-2 w-8">{puzzle.id}.</span>
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
            ))}
          </div>
        </div>
      </div>

      {/* Secret Message Preview (for debugging) */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Secret Message Progress:</h3>
        <div className="flex flex-wrap gap-2">
          {secretMessage.split('').map((char, index) => (
            <div 
              key={index}
              className={`puzzle-cell ${
                revealedMessage[index] ? 'puzzle-cell-filled' : 'puzzle-cell-empty'
              }`}
            >
              {revealedMessage[index] || (char === ' ' ? ' ' : '_')}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PuzzleGrid;
