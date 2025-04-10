import React, { useEffect, useRef } from 'react';
import { TrendingUp } from 'lucide-react';

const UpvoteAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with higher resolution
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      const width = container.offsetWidth;
      const height = 400;
      
      // Set display size
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      // Set actual size with higher resolution
      const scale = window.devicePixelRatio || 1;
      canvas.width = width * scale;
      canvas.height = height * scale;
      
      // Scale the context to ensure correct drawing
      ctx.scale(scale, scale);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Animation variables
    let frame = 0;
    const totalFrames = 300;
    let animationId: number;

    // Noise generation for irregular growth
    const noise = (x: number) => {
      const amplitude = 0.15;
      return Math.sin(x * 5) * amplitude + 
             Math.sin(x * 13) * amplitude * 0.5 + 
             Math.sin(x * 23) * amplitude * 0.25;
    };
    
    const drawAxes = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(156, 163, 175, 0.4)'; // Increased opacity
      ctx.lineWidth = 2;
      
      // Y-axis
      ctx.moveTo(60, height - 40);
      ctx.lineTo(60, 40);
      
      // X-axis
      ctx.moveTo(60, height - 40);
      ctx.lineTo(width - 40, height - 40);
      
      ctx.stroke();

      // Draw y-axis labels with increased visibility
      ctx.fillStyle = 'rgba(107, 114, 128, 1)'; // Full opacity
      ctx.font = '14px Inter, system-ui, sans-serif';
      ctx.textAlign = 'right';
      
      const maxUpvotes = 550;
      const steps = 11;
      for (let i = 0; i <= steps; i++) {
        const y = height - 40 - ((height - 80) * (i / steps));
        const value = Math.round((maxUpvotes * i) / steps);
        ctx.fillText(value.toString(), 50, y + 4);
      }

      // Add x-axis labels
      ctx.textAlign = 'center';
      const hours = ['0h', '6h', '12h', '18h', '24h'];
      const xStep = (width - 100) / (hours.length - 1);
      hours.forEach((hour, i) => {
        const x = 60 + (xStep * i);
        ctx.fillText(hour, x, height - 20);
      });
    };

    const drawLine = (
      points: Array<[number, number]>,
      color: string,
      alpha: number = 1,
      width: number = 3
    ) => {
      if (points.length < 2) return;

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.globalAlpha = alpha;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const generatePoints = (
      progress: number,
      startX: number,
      endX: number,
      bottomY: number,
      topY: number,
      growthFactor: number,
      noiseScale: number
    ) => {
      const points: Array<[number, number]> = [];
      const currentEndX = startX + (endX - startX) * progress;
      
      for (let x = startX; x <= currentEndX; x += 2) {
        const normalizedX = (x - startX) / (endX - startX);
        const baseY = bottomY - (Math.pow(normalizedX, 0.7) * (bottomY - topY) * growthFactor);
        const noiseY = noise(normalizedX * 10) * noiseScale * (bottomY - topY);
        points.push([x, baseY + noiseY]);
      }
      
      return points;
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw axes
      drawAxes();

      // Calculate progress
      const progress = frame / totalFrames;
      const startX = 60;
      const endX = width - 40;
      const bottomY = height - 40;
      const topY = 40;

      // Generate points for each line
      const competitorPoints1 = generatePoints(progress, startX, endX, bottomY, topY, 0.4, 0.05);
      const competitorPoints2 = generatePoints(progress, startX, endX, bottomY, topY, 0.35, 0.05);
      const ourPoints = generatePoints(progress, startX, endX, bottomY, topY, 0.85, 0.03);

      // Draw competitor lines with increased visibility
      drawLine(competitorPoints2, '#FFA07A', 0.7); // Increased opacity
      drawLine(competitorPoints1, '#FF69B4', 0.7); // Increased opacity

      // Draw our product line with increased visibility
      drawLine(ourPoints, '#ff6154', 1, 4); // Increased line width

      // Add gradient under our line
      if (ourPoints.length > 1) {
        const gradient = ctx.createLinearGradient(0, topY, 0, bottomY);
        gradient.addColorStop(0, 'rgba(255, 97, 84, 0.2)'); // Increased opacity
        gradient.addColorStop(1, 'rgba(255, 97, 84, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(startX, bottomY);
        ourPoints.forEach(point => ctx.lineTo(point[0], point[1]));
        ctx.lineTo(ourPoints[ourPoints.length - 1][0], bottomY);
        ctx.closePath();
        ctx.fill();
      }

      frame = (frame + 1) % totalFrames;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-[#ff6154]" />
        <span className="font-semibold text-gray-900">Upvote Growth</span>
      </div>
      <div className="flex gap-4 absolute top-4 right-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff6154]" />
          <span className="text-sm text-gray-600">With Our Service</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF69B4]" />
          <span className="text-sm text-gray-600">Competitor A</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FFA07A]" />
          <span className="text-sm text-gray-600">Competitor B</span>
        </div>
      </div>
      <canvas 
        ref={canvasRef}
        className="w-full h-[400px]"
      />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <span className="text-sm text-gray-600">Launch Time (24 hours)</span>
      </div>
    </div>
  );
};

export default UpvoteAnimation;