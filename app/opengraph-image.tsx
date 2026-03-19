import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Clínica Dental Don Benito';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  const iconData = new URL('../public/favicon.webp', import.meta.url);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #c6e4dc 0%, #9fd2c4 45%, #63bda6 100%)',
          fontFamily: 'Georgia, serif'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at top right, rgba(255,255,255,0.65) 0, rgba(255,255,255,0) 42%)'
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: -80,
            bottom: -120,
            width: 520,
            height: 520,
            borderRadius: '46% 54% 58% 42% / 38% 36% 64% 62%',
            background: 'rgba(255,255,255,0.18)'
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: 120,
            top: 100,
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.16)'
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '70px 78px',
            width: '100%',
            height: '100%',
            color: '#173c36'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 999,
                background: 'rgba(255,255,255,0.82)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              <img
                src={iconData.toString()}
                alt=""
                width="64"
                height="64"
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                  color: '#63bda6'
                }}
              >
                Clínica Dental
              </div>
              <div
                style={{
                  fontSize: 54,
                  lineHeight: 1,
                  fontWeight: 700
                }}
              >
                Don Benito
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 760
            }}
          >
            <div
              style={{
                fontSize: 82,
                lineHeight: 0.95,
                fontWeight: 700
              }}
            >
              Siempre contigo
            </div>
            <div
              style={{
                marginTop: 26,
                fontSize: 34,
                lineHeight: 1.3,
                fontFamily: 'Arial, sans-serif',
                color: '#244c45'
              }}
            >
              Odontología integral para toda la familia en Don Benito.
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'Arial, sans-serif',
              fontSize: 28,
              color: '#244c45'
            }}
          >
            <div style={{ display: 'flex' }}>C/ Ayala, 4 · 06400 Don Benito</div>
            <div style={{ display: 'flex' }}>640 937 567</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
