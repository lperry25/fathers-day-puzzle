/**
 * Generates a puzzle piece favicon and sets it as the page favicon
 * @param primaryColor - Primary color for the puzzle piece
 * @param secondaryColor - Secondary color for highlights
 */
export const generatePuzzleFavicon = (
  primaryColor: string = '#3b82f6', // Default blue color
  secondaryColor: string = '#1e40af' // Darker blue for depth
): void => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return;
  
  // Clear canvas with transparent background
  ctx.clearRect(0, 0, 64, 64);
  
  // Draw main puzzle piece shape
  ctx.beginPath();
  
  // Start at top left
  ctx.moveTo(10, 10);
  
  // Top edge with a connector
  ctx.lineTo(25, 10);
  ctx.arc(32, 10, 7, Math.PI, 0, false); // Top connector (outward)
  ctx.lineTo(54, 10);
  
  // Right edge with a connector
  ctx.lineTo(54, 25);
  ctx.arc(54, 32, 7, Math.PI * 1.5, Math.PI * 0.5, false); // Right connector (outward)
  ctx.lineTo(54, 54);
  
  // Bottom edge with a connector
  ctx.lineTo(39, 54);
  ctx.arc(32, 54, 7, 0, Math.PI, false); // Bottom connector (inward)
  ctx.lineTo(10, 54);
  
  // Left edge with a connector
  ctx.lineTo(10, 39);
  ctx.arc(10, 32, 7, Math.PI * 0.5, Math.PI * 1.5, false); // Left connector (inward)
  ctx.lineTo(10, 10);
  
  // Fill with gradient
  const gradient = ctx.createRadialGradient(32, 32, 5, 25, 25, 40);
  gradient.addColorStop(0, primaryColor);
  gradient.addColorStop(1, secondaryColor);
  ctx.fillStyle = gradient;
  ctx.fill();
  
  // Add highlight
  ctx.beginPath();
  ctx.moveTo(15, 15);
  ctx.quadraticCurveTo(20, 20, 35, 25);
  ctx.quadraticCurveTo(45, 30, 35, 40);
  ctx.quadraticCurveTo(30, 45, 20, 40);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fill();
  
  // Convert canvas to favicon
  const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'icon';
  link.href = canvas.toDataURL('image/png');
  
  // Add to document head if not already there
  if (!document.querySelector('link[rel="icon"]')) {
    document.head.appendChild(link);
  }
};