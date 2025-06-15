import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface SecretMessageProps {
  message: string;
}

const SecretMessage: React.FC<SecretMessageProps> = ({ message }) => {
  const [isComplete, setIsComplete] = useState(false);
  const fullMessage = "LOVE YOU DAD! HAVE A GREAT FATHER'S DAY! LOVE LAURA AND EMILIE";
  
  useEffect(() => {
    // Check if the message is complete enough to show celebration
    if (message.length >= fullMessage.length * 0.8) {
      setIsComplete(true);
      
      // Trigger confetti effect
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (error) {
        console.error('Confetti error:', error);
      }
    }
  }, [message, fullMessage.length]);

  // Calculate completion percentage
  const completionPercentage = Math.round((message.length / fullMessage.length) * 100);
  

  return (
    <div className="mt-12 w-full max-w-4xl">
      <h2 className="text-3xl font-bold text-primary mb-4">
        {isComplete ? 'Message Revealed!' : 'Secret Message'}
      </h2>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
        <div className="mb-4 h-4 bg-gray-200 rounded-full">
          <div 
            className="h-4 bg-primary rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">
          {completionPercentage}% complete
        </p>
        {isComplete && 
          ( <div className={`text-2xl font-bold ${isComplete ? 'text-primary' : 'text-gray-700'} text-center p-4 border-2 rounded-lg ${isComplete ? 'border-primary animate-pulse' : 'border-gray-200'}`}>
            { fullMessage }
            </div>)
        }
        
        {isComplete && (
          <div className="mt-6 text-center">
            <p className="text-lg text-green-600 font-medium mb-4">
              Congratulations! You've revealed the secret message for Dad!
            </p>
            <button 
              className="px-6 py-3 bg-secondary text-white rounded-lg shadow-md hover:bg-green-600 transition-colors"
              onClick={() => {
                try {
                  confetti({
                    particleCount: 200,
                    spread: 90,
                    origin: { y: 0.6 }
                  });
                } catch (error) {
                  console.error('Confetti error:', error);
                }
              }}
            >
              Celebrate Again!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretMessage;