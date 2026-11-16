export default function FrostingDivider({ flip = false, color = 'var(--cream)' }) {
  return (
    <div className={`frosting-divider ${flip ? 'flip' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path
          d="M0,32 C40,8 80,52 120,30 C160,8 200,52 240,30 C280,8 320,52 360,30
             C400,8 440,52 480,30 C520,8 560,52 600,30 C640,8 680,52 720,30
             C760,8 800,52 840,30 C880,8 920,52 960,30 C1000,8 1040,52 1080,30
             C1110,14 1140,46 1200,28 L1200,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
