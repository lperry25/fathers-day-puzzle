import { useState } from 'react';
import Head from 'next/head';
import PuzzleGrid from '../components/PuzzleGrid';
import SecretMessage from '../components/SecretMessage';

export default function Home() {
  const [revealedMessage, setRevealedMessage] = useState<string>('');
  
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Head>
        <title>Father's Day Puzzle</title>
        <meta name="description" content="A special Father's Day puzzle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold text-primary mb-6">
          Father's Day Puzzle
        </h1>
        
        <p className="text-lg mb-8">
          Solve the puzzle to reveal a special message for Dad!
        </p>
        
        <PuzzleGrid onMessageUpdate={setRevealedMessage} />
        
        {revealedMessage && (
          <SecretMessage message={revealedMessage} />
        )}
      </main>

      <footer className="w-full h-16 border-t border-gray-200 flex items-center justify-center">
        <p className="text-sm text-gray-600">
          Made with ❤️ by Laura and Emilie
        </p>
      </footer>
    </div>
  );
}