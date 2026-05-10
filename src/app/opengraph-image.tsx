import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Wool Cup Urban Café & Bistro — Hyderabad';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const base =
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

  const [logoSrc, mascotSrc] = await Promise.all([
    fetch(`${base}/images/logo.png`).then((r) => r.arrayBuffer()),
    fetch(`${base}/images/mascot.png`).then((r) => r.arrayBuffer()),
  ]);

  const toDataUrl = (buf: ArrayBuffer) =>
    `data:image/png;base64,${Buffer.from(buf).toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#ffffff',
          fontFamily: 'serif',
        }}
      >
        {/* Left panel — cream, mascot centred */}
        <div
          style={{
            width: '42%',
            height: '100%',
            background: '#ead8b5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={toDataUrl(mascotSrc)}
            width={220}
            height={256}
            alt=""
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Right panel — white, logo + brand details */}
        <div
          style={{
            flex: 1,
            height: '100%',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '60px 64px',
            gap: '20px',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={toDataUrl(logoSrc)}
            width={160}
            height={110}
            alt="Wool Cup logo"
            style={{ objectFit: 'contain' }}
          />

          <div
            style={{
              fontSize: 52,
              color: '#231f20',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
              marginTop: 8,
            }}
          >
            Wool Cup
          </div>

          <div
            style={{
              fontSize: 22,
              color: '#231f20',
              opacity: 0.6,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Urban Café &amp; Bistro
          </div>

          {/* Divider */}
          <div style={{ width: 48, height: 2, background: '#ead8b5', marginTop: 4 }} />

          <div
            style={{
              fontSize: 18,
              color: '#231f20',
              opacity: 0.45,
              letterSpacing: '0.04em',
            }}
          >
            Film Nagar · Financial District · Hyderabad
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
