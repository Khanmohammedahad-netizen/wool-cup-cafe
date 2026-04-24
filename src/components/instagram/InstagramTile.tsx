'use client';

export function InstagramTile({ src, index }: { src: string; index: number }) {
  return (
    <div className="aspect-square relative overflow-hidden bg-cream group">
      <img
        src={src}
        alt={`Instagram post ${index + 1}`}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}
