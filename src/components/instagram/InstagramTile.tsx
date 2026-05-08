'use client';

export function InstagramTile({ src, index }: { src: string; index: number }) {
  return (
    <div className="aspect-square relative overflow-hidden bg-bg-primary rounded-xl group cursor-pointer">
      <img
        src={src}
        alt={`Instagram post ${index + 1}`}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-[1.05]"
      />
      {/* Accent Wash Overlay */}
      <div className="absolute inset-0 bg-dark opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500" />
    </div>

  );
}

