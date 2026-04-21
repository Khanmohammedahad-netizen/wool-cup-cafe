import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-bg-primary pt-24 pb-12 px-6 border-t border-charcoal/10">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-4xl tracking-tighter">
                <span className="text-caramel">WOOL</span>
                <span className="text-cream ml-2">CUP</span>
              </span>
            </Link>
            <p className="text-small text-ash max-w-sm font-light leading-relaxed">
              Where every cup tells a story. An immersive cinematic coffee experience in the heart of Filmnagar, Hyderabad.
            </p>
          </div>

          <div>
            <h4 className="text-micro font-light text-caramel uppercase tracking-spread mb-6">Visit</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-small text-smoke hover:text-caramel transition-colors">Directions</a>
              </li>
              <li className="text-small text-smoke">8 AM – 11 PM</li>
              <li>
                <a href="mailto:hello@woolcup.com" className="text-small text-smoke hover:text-caramel transition-colors">hello@woolcup.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-micro font-light text-caramel uppercase tracking-spread mb-6">Social</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://www.instagram.com/woolcup" target="_blank" className="text-small text-smoke hover:text-caramel transition-colors">Instagram</a>
              </li>
              <li>
                <a href="#" className="text-small text-smoke hover:text-caramel transition-colors">Twitter (X)</a>
              </li>
              <li>
                <a href="#" className="text-small text-smoke hover:text-caramel transition-colors">YouTube</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-micro text-ash tracking-widest uppercase">
            © 2026 Wool Cup Café · Crafted with devotion
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-micro text-ash hover:text-caramel uppercase tracking-widest transition-colors">Privacy</Link>
            <Link href="#" className="text-micro text-ash hover:text-caramel uppercase tracking-widest transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
