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
          background: '#ead8b5',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={toDataUrl(logoSrc)}
          width={200}
          height={138}
          alt="Wool Cup logo"
          style={{ objectFit: 'contain' }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={toDataUrl(mascotSrc)}
          width={240}
          height={280}
          alt=""
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  );
}
