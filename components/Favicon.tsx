import { useEffect } from 'react';
import { generatePuzzleFavicon } from '../utils/generateFavicon';

const Favicon = () => {
  useEffect(() => {
    // Generate the favicon when the component mounts
    // Using theme colors that match your app
    generatePuzzleFavicon('#3b82f6', '#1e40af');
  }, []);

  return null; // This component doesn't render anything
};

export default Favicon;