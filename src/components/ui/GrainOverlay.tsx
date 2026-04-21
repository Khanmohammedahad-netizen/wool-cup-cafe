'use client';

export default function GrainOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[998] opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: "url('/textures/grain.png')",
        backgroundSize: '256px',
        backgroundRepeat: 'repeat',
      }}
    />
  );
}
