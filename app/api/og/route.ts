import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Chargeur-Rapide';
  const category = searchParams.get('cat') || '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 64,
          background: 'linear-gradient(135deg, #0EA5E9 0%, #22C55E 100%)',
        }}
      >
        <div style={{ fontSize: 56, color: '#fff', fontWeight: 700 }}>Chargeur-Rapide</div>
        {category && (
          <div style={{ marginTop: 8, fontSize: 24, color: '#DFF7FF' }}>{category}</div>
        )}
        <div style={{ marginTop: 24, fontSize: 40, color: '#fff', maxWidth: 1000 }}>{title}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}





