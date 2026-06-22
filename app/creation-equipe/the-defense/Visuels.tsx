// Visuels SVG inline, générés à la main. Aucune image externe.
// Personnages stylisés, salle d'audience boisée, dossiers, etc.

interface SvgProps {
  className?: string;
}

/** Fond : salle d'audience boisée (boiseries, fanion, lambris). */
export function SalleAudience({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 800 400" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="mur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#553616" />
          <stop offset="1" stopColor="#3c2611" />
        </linearGradient>
        <linearGradient id="panneau" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6e481b" />
          <stop offset="1" stopColor="#4a2f14" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#mur)" />
      {/* lambris verticaux */}
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={i * 80 + 6} y="40" width="68" height="320" rx="6" fill="url(#panneau)" stroke="#2a1a0c" strokeWidth="2" />
      ))}
      {/* corniche haute */}
      <rect x="0" y="0" width="800" height="40" fill="#3c2611" />
      <rect x="0" y="36" width="800" height="6" fill="#caa05a" opacity="0.5" />
      {/* fanion / blason central */}
      <g transform="translate(400 30)">
        <path d="M-34 0 H34 V34 L0 54 L-34 34 Z" fill="#8a5e24" stroke="#caa05a" strokeWidth="2" />
        <circle cx="0" cy="22" r="12" fill="#caa05a" opacity="0.85" />
        <path d="M-5 22 L0 12 L5 22 L0 30 Z" fill="#3c2611" />
      </g>
      {/* sol */}
      <rect x="0" y="360" width="800" height="40" fill="#2a1a0c" />
    </svg>
  );
}

/** Portrait du client : homme rond, cardigan, lunettes, air anxieux. */
export function PortraitClient({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="60" cy="60" r="58" fill="#f0e0c4" />
      <circle cx="60" cy="60" r="58" fill="none" stroke="#8a5e24" strokeWidth="4" />
      {/* épaules + cardigan */}
      <path d="M18 120 Q22 80 60 80 Q98 80 102 120 Z" fill="#7a8a5a" />
      <path d="M55 80 L60 104 L65 80 Z" fill="#e8dcc0" />
      <circle cx="60" cy="92" r="2" fill="#3c2611" />
      <circle cx="60" cy="100" r="2" fill="#3c2611" />
      {/* tête */}
      <circle cx="60" cy="52" r="30" fill="#f5d6b0" />
      {/* cheveux clairsemés */}
      <path d="M34 44 Q60 18 86 44 Q70 34 60 36 Q48 34 34 44 Z" fill="#6e481b" />
      {/* lunettes */}
      <circle cx="49" cy="52" r="10" fill="#fff" opacity="0.5" stroke="#3c2611" strokeWidth="2.5" />
      <circle cx="71" cy="52" r="10" fill="#fff" opacity="0.5" stroke="#3c2611" strokeWidth="2.5" />
      <line x1="59" y1="52" x2="61" y2="52" stroke="#3c2611" strokeWidth="2.5" />
      {/* yeux anxieux */}
      <circle cx="49" cy="53" r="2.4" fill="#2a1a0c" />
      <circle cx="71" cy="53" r="2.4" fill="#2a1a0c" />
      {/* sourcils inquiets */}
      <path d="M42 44 L56 47" stroke="#3c2611" strokeWidth="2" strokeLinecap="round" />
      <path d="M78 44 L64 47" stroke="#3c2611" strokeWidth="2" strokeLinecap="round" />
      {/* bouche hésitante */}
      <path d="M52 68 Q60 64 68 68" stroke="#a05a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* goutte de sueur */}
      <path d="M84 46 q4 6 0 9 q-4 -3 0 -9 Z" fill="#9fd0e0" />
    </svg>
  );
}

/** Portrait de l'enquêtrice : imperméable, café, regard fatigué mais malin. */
export function PortraitEnqueteur({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="60" cy="60" r="58" fill="#f0e0c4" />
      <circle cx="60" cy="60" r="58" fill="none" stroke="#8a5e24" strokeWidth="4" />
      {/* imperméable */}
      <path d="M16 120 Q20 78 60 78 Q100 78 104 120 Z" fill="#b9a37a" />
      <path d="M50 80 L60 120 L70 80 Z" fill="#a08a5e" />
      <rect x="44" y="84" width="6" height="6" fill="#6e481b" />
      {/* tête */}
      <circle cx="60" cy="50" r="29" fill="#f1cda2" />
      {/* cheveux mi-longs */}
      <path d="M31 50 Q31 18 60 18 Q89 18 89 50 Q86 36 60 34 Q34 36 31 50 Z" fill="#3c2611" />
      <path d="M31 50 Q30 70 36 78 L40 60 Z" fill="#3c2611" />
      <path d="M89 50 Q90 70 84 78 L80 60 Z" fill="#3c2611" />
      {/* yeux fatigués mais vifs */}
      <path d="M44 50 q5 -3 10 0" stroke="#2a1a0c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M66 50 q5 -3 10 0" stroke="#2a1a0c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="49" cy="52" r="2.2" fill="#2a1a0c" />
      <circle cx="71" cy="52" r="2.2" fill="#2a1a0c" />
      {/* cernes */}
      <path d="M45 57 q4 2 8 0" stroke="#c79f78" strokeWidth="1.5" fill="none" />
      <path d="M67 57 q4 2 8 0" stroke="#c79f78" strokeWidth="1.5" fill="none" />
      {/* sourire en coin malin */}
      <path d="M52 66 Q60 70 70 65" stroke="#a05a3a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* gobelet de café */}
      <g transform="translate(86 84)">
        <path d="M0 0 H16 L14 18 H2 Z" fill="#d8c19a" stroke="#6e481b" strokeWidth="1.5" />
        <rect x="-1" y="-4" width="18" height="5" rx="2" fill="#6e481b" />
        <path d="M5 -8 q3 3 0 6" stroke="#caa05a" strokeWidth="1.5" fill="none" opacity="0.7" />
      </g>
    </svg>
  );
}

/** Portrait du procureur : sourire suffisant, toge sombre. */
export function PortraitProcureur({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="60" cy="60" r="58" fill="#f0e0c4" />
      <circle cx="60" cy="60" r="58" fill="none" stroke="#8a5e24" strokeWidth="4" />
      {/* toge */}
      <path d="M16 120 Q20 76 60 76 Q100 76 104 120 Z" fill="#2a1a0c" />
      <path d="M52 78 L60 120 L68 78 Z" fill="#3c2611" />
      {/* rabat blanc d'avocat */}
      <path d="M55 78 l5 14 l5 -14 z" fill="#f5f0e6" />
      {/* tête */}
      <circle cx="60" cy="50" r="29" fill="#eecaa0" />
      {/* cheveux gominés */}
      <path d="M31 48 Q40 22 60 22 Q80 22 89 48 Q70 32 60 32 Q50 32 31 48 Z" fill="#2a1a0c" />
      <path d="M58 24 Q70 30 74 44" stroke="#1c150d" strokeWidth="2" fill="none" />
      {/* sourcil arqué (arrogance) */}
      <path d="M42 45 q6 -4 12 -1" stroke="#2a1a0c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M66 44 q6 -2 12 1" stroke="#2a1a0c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="49" cy="51" r="2.4" fill="#2a1a0c" />
      <circle cx="72" cy="51" r="2.4" fill="#2a1a0c" />
      {/* rictus satisfait */}
      <path d="M50 66 Q60 76 72 64" stroke="#9a4a2a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* moustache fine */}
      <path d="M52 62 q8 3 16 0" stroke="#2a1a0c" strokeWidth="2" fill="none" />
    </svg>
  );
}

/** Le juge : perruque et marteau, derrière son banc. */
export function PortraitJuge({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="60" cy="60" r="58" fill="#f0e0c4" />
      <circle cx="60" cy="60" r="58" fill="none" stroke="#8a5e24" strokeWidth="4" />
      <path d="M18 120 Q22 80 60 80 Q98 80 102 120 Z" fill="#1c150d" />
      {/* perruque */}
      <path d="M33 52 Q33 26 60 26 Q87 26 87 52 Q88 70 78 82 L42 82 Q32 70 33 52 Z" fill="#efe9da" />
      <path d="M36 60 q-3 14 6 22" stroke="#cfc6b0" strokeWidth="3" fill="none" />
      <path d="M84 60 q3 14 -6 22" stroke="#cfc6b0" strokeWidth="3" fill="none" />
      {/* visage */}
      <circle cx="60" cy="56" r="22" fill="#eecaa0" />
      <path d="M48 52 q4 -2 8 0" stroke="#6e481b" strokeWidth="1.8" fill="none" />
      <path d="M64 52 q4 -2 8 0" stroke="#6e481b" strokeWidth="1.8" fill="none" />
      <circle cx="52" cy="56" r="2.2" fill="#2a1a0c" />
      <circle cx="68" cy="56" r="2.2" fill="#2a1a0c" />
      {/* bouche sévère */}
      <path d="M52 68 q8 -2 16 0" stroke="#9a4a2a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* marteau */}
      <g transform="translate(86 78) rotate(35)">
        <rect x="-3" y="0" width="6" height="22" rx="2" fill="#6e481b" />
        <rect x="-12" y="-8" width="24" height="12" rx="3" fill="#8a5e24" stroke="#3c2611" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/** Marquise, le chat tigré : la vraie coupable. */
export function ChatMarquise({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="60" cy="60" r="58" fill="#f0e0c4" />
      <circle cx="60" cy="60" r="58" fill="none" stroke="#8a5e24" strokeWidth="4" />
      {/* corps */}
      <ellipse cx="60" cy="92" rx="34" ry="22" fill="#c8893a" />
      {/* rayures corps */}
      <path d="M40 86 q6 8 0 18 M60 80 q4 12 0 24 M80 86 q-6 8 0 18" stroke="#8a5618" strokeWidth="3" fill="none" />
      {/* tête */}
      <circle cx="60" cy="56" r="28" fill="#d49a4a" />
      {/* oreilles */}
      <path d="M36 38 L40 14 L56 32 Z" fill="#d49a4a" />
      <path d="M84 38 L80 14 L64 32 Z" fill="#d49a4a" />
      <path d="M40 32 L43 20 L50 30 Z" fill="#f2c98c" />
      <path d="M80 32 L77 20 L70 30 Z" fill="#f2c98c" />
      {/* rayures tête */}
      <path d="M52 32 v10 M60 30 v12 M68 32 v10" stroke="#8a5618" strokeWidth="3" strokeLinecap="round" />
      {/* yeux verts malicieux */}
      <ellipse cx="49" cy="56" rx="6" ry="8" fill="#6fae4f" />
      <ellipse cx="71" cy="56" rx="6" ry="8" fill="#6fae4f" />
      <ellipse cx="49" cy="56" rx="1.8" ry="7" fill="#1c150d" />
      <ellipse cx="71" cy="56" rx="1.8" ry="7" fill="#1c150d" />
      {/* museau */}
      <path d="M55 66 L65 66 L60 72 Z" fill="#a05a3a" />
      <path d="M60 72 q-4 6 -10 6 M60 72 q4 6 10 6" stroke="#3c2611" strokeWidth="2" fill="none" />
      {/* moustaches */}
      <path d="M44 66 H22 M44 70 H24 M76 66 H98 M76 70 H96" stroke="#3c2611" strokeWidth="1.4" />
      {/* miette de nougatine sur le museau */}
      <circle cx="66" cy="76" r="2.4" fill="#f5e6b0" stroke="#caa05a" strokeWidth="0.8" />
    </svg>
  );
}

/** Icône de dossier / chemise cartonnée. */
export function IconeDossier({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <path d="M6 16 H26 L32 22 H58 V52 H6 Z" fill="#caa05a" stroke="#6e481b" strokeWidth="2" />
      <rect x="12" y="26" width="40" height="24" rx="2" fill="#f5f0e6" stroke="#8a5e24" strokeWidth="1.5" />
      <line x1="18" y1="33" x2="46" y2="33" stroke="#a8997a" strokeWidth="2" />
      <line x1="18" y1="39" x2="46" y2="39" stroke="#a8997a" strokeWidth="2" />
      <line x1="18" y1="45" x2="38" y2="45" stroke="#a8997a" strokeWidth="2" />
    </svg>
  );
}

/** Badge cadenas : réplique verrouillée (indice manquant). */
export function BadgeVerrou({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="2" fill="#6e481b" stroke="#caa05a" strokeWidth="1.5" />
      <path d="M8 10 V7 a4 4 0 0 1 8 0 V10" fill="none" stroke="#caa05a" strokeWidth="1.8" />
      <circle cx="12" cy="14" r="1.6" fill="#caa05a" />
      <rect x="11.2" y="14" width="1.6" height="3.4" rx="0.8" fill="#caa05a" />
    </svg>
  );
}

/** Badge éclair : bluff sans preuve, à vos risques. */
export function BadgeEclair({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M13 2 L5 13 H11 L9 22 L19 9 H12 Z" fill="#d08a3a" stroke="#b94a3a" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

/** Badge balance : réplique appuyée sur une preuve. */
export function BadgeBalance({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <g stroke="#caa05a" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <line x1="12" y1="3" x2="12" y2="20" />
        <line x1="5" y1="7" x2="19" y2="7" />
        <line x1="8" y1="20" x2="16" y2="20" />
      </g>
      <path d="M5 7 L2 14 H8 Z" fill="#caa05a" opacity="0.35" stroke="#caa05a" strokeWidth="1.2" />
      <path d="M19 7 L16 14 H22 Z" fill="#caa05a" opacity="0.35" stroke="#caa05a" strokeWidth="1.2" />
      <circle cx="12" cy="5" r="1.6" fill="#caa05a" />
    </svg>
  );
}

/** Badge coche : élément déjà consulté. */
export function BadgeCoche({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#3c2611" stroke="#5fae4f" strokeWidth="1.6" />
      <path d="M7 12.5 L10.5 16 L17 8.5" fill="none" stroke="#5fae4f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Badge interrogation : question pas encore posée. */
export function BadgeQuestion({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#3c2611" stroke="#caa05a" strokeWidth="1.6" />
      <path d="M9 9.5 a3 3 0 0 1 5.6 1.5 c0 2 -2.6 2.2 -2.6 4" fill="none" stroke="#caa05a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="17.5" r="1.2" fill="#caa05a" />
    </svg>
  );
}

/** Le voisin gourmand, Aldo Tartine : moustachu, fuyant, miettes au coin de la bouche. */
export function PortraitVoisin({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="60" cy="60" r="58" fill="#f0e0c4" />
      <circle cx="60" cy="60" r="58" fill="none" stroke="#8a5e24" strokeWidth="4" />
      {/* maillot rayé */}
      <path d="M18 120 Q22 80 60 80 Q98 80 102 120 Z" fill="#b85c46" />
      <path d="M18 100 H102 M22 112 H98" stroke="#f0e0c4" strokeWidth="4" opacity="0.6" />
      {/* tête */}
      <circle cx="60" cy="52" r="30" fill="#f3cda3" />
      {/* cheveux en bataille */}
      <path d="M32 42 Q36 20 60 20 Q84 20 88 42 Q78 30 60 32 Q42 30 32 42 Z" fill="#3c2611" />
      <path d="M34 40 l-4 -8 M48 30 l-2 -10 M72 30 l2 -10 M86 40 l4 -8" stroke="#3c2611" strokeWidth="2.4" strokeLinecap="round" />
      {/* yeux fuyants (regardent de côté) */}
      <circle cx="52" cy="52" r="3" fill="#2a1a0c" />
      <circle cx="74" cy="52" r="3" fill="#2a1a0c" />
      <path d="M45 47 q6 -2 11 0 M67 47 q6 -2 11 0" stroke="#3c2611" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* grosse moustache */}
      <path d="M46 64 Q60 60 74 64 Q68 70 60 68 Q52 70 46 64 Z" fill="#3c2611" />
      {/* bouche gênée */}
      <path d="M54 73 q6 3 12 0" stroke="#9a4a2a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {/* miette de nougatine au coin */}
      <circle cx="72" cy="72" r="2.2" fill="#f5e6b0" stroke="#caa05a" strokeWidth="0.8" />
      {/* goutte de sueur */}
      <path d="M40 50 q-4 6 0 9 q4 -3 0 -9 Z" fill="#9fd0e0" />
    </svg>
  );
}

/** La pâtissière, Margot Beurre : toque, tablier, air affairé. */
export function PortraitPatissiere({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="60" cy="60" r="58" fill="#f0e0c4" />
      <circle cx="60" cy="60" r="58" fill="none" stroke="#8a5e24" strokeWidth="4" />
      {/* tablier blanc */}
      <path d="M18 120 Q22 82 60 82 Q98 82 102 120 Z" fill="#f5f0e6" />
      <path d="M50 84 Q60 96 70 84" stroke="#caa05a" strokeWidth="2" fill="none" />
      {/* tête */}
      <circle cx="60" cy="54" r="28" fill="#f3cda3" />
      {/* toque de pâtissier */}
      <path d="M36 38 Q34 20 48 22 Q50 12 60 16 Q70 12 72 22 Q86 20 84 38 Z" fill="#fbf7ee" stroke="#d8cdb6" strokeWidth="1.5" />
      <rect x="36" y="36" width="48" height="8" rx="3" fill="#efe6d2" />
      {/* yeux vifs */}
      <circle cx="51" cy="55" r="2.4" fill="#2a1a0c" />
      <circle cx="69" cy="55" r="2.4" fill="#2a1a0c" />
      <path d="M45 50 q6 -2 11 0 M64 50 q6 -2 11 0" stroke="#6e481b" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* joues roses */}
      <circle cx="46" cy="62" r="4" fill="#e7a98a" opacity="0.5" />
      <circle cx="74" cy="62" r="4" fill="#e7a98a" opacity="0.5" />
      {/* sourire commerçant */}
      <path d="M50 68 Q60 76 70 68" stroke="#9a4a2a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* rouleau à pâtisserie */}
      <g transform="translate(84 86) rotate(-30)">
        <rect x="-14" y="-4" width="28" height="8" rx="4" fill="#caa05a" stroke="#6e481b" strokeWidth="1.2" />
        <rect x="-20" y="-2" width="6" height="4" rx="2" fill="#8a5e24" />
        <rect x="14" y="-2" width="6" height="4" rx="2" fill="#8a5e24" />
      </g>
    </svg>
  );
}

/** Le pâtissier rival, Hippolyte Crémant : nez pointu, sourcil narquois. */
export function PortraitRival({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <circle cx="60" cy="60" r="58" fill="#f0e0c4" />
      <circle cx="60" cy="60" r="58" fill="none" stroke="#8a5e24" strokeWidth="4" />
      {/* veste de chef noire */}
      <path d="M18 120 Q22 80 60 80 Q98 80 102 120 Z" fill="#2a2622" />
      <path d="M55 80 L60 120 L65 80 Z" fill="#3a3530" />
      <circle cx="60" cy="92" r="1.8" fill="#caa05a" />
      <circle cx="60" cy="100" r="1.8" fill="#caa05a" />
      {/* tête */}
      <circle cx="60" cy="52" r="28" fill="#f0c79c" />
      {/* cheveux plaqués + raie */}
      <path d="M32 46 Q38 22 60 22 Q82 22 88 46 Q74 30 60 30 Q46 30 32 46 Z" fill="#5a3a18" />
      <path d="M60 30 Q66 38 66 46" stroke="#3c2611" strokeWidth="1.6" fill="none" />
      {/* sourcil narquois (un haut, un bas) */}
      <path d="M44 46 q6 -5 12 -2" stroke="#3c2611" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M66 45 q6 -1 12 1" stroke="#3c2611" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="51" cy="52" r="2.3" fill="#2a1a0c" />
      <circle cx="72" cy="52" r="2.3" fill="#2a1a0c" />
      {/* nez pointu */}
      <path d="M61 54 L66 62 L60 63 Z" fill="#e0b184" />
      {/* rictus en coin */}
      <path d="M50 70 Q60 73 72 66" stroke="#9a4a2a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* fine moustache pointue */}
      <path d="M52 66 q8 2 16 -1" stroke="#3c2611" strokeWidth="1.8" fill="none" />
    </svg>
  );
}

type PortraitId = 'client' | 'voisin' | 'patissiere' | 'rival' | 'chat';

/** Renvoie le composant portrait correspondant à l'id d'un suspect. */
export function PortraitSuspect({ id, className }: { id: string; className?: string }) {
  const map: Record<PortraitId, (p: SvgProps) => JSX.Element> = {
    client: PortraitClient,
    voisin: PortraitVoisin,
    patissiere: PortraitPatissiere,
    rival: PortraitRival,
    chat: ChatMarquise,
  };
  const Cmp = map[(id as PortraitId)] ?? PortraitClient;
  return <Cmp className={className} />;
}

/** Petite cocarde / sceau de la justice (décor). */
export function SceauJustice({ className }: SvgProps) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      <circle cx="40" cy="40" r="36" fill="#3c2611" stroke="#caa05a" strokeWidth="3" />
      <g stroke="#caa05a" strokeWidth="2.4" fill="none" strokeLinecap="round">
        {/* balance */}
        <line x1="40" y1="22" x2="40" y2="56" />
        <line x1="24" y1="30" x2="56" y2="30" />
        <path d="M24 30 L18 44 H30 Z" fill="#caa05a" opacity="0.3" />
        <path d="M56 30 L50 44 H62 Z" fill="#caa05a" opacity="0.3" />
        <line x1="32" y1="56" x2="48" y2="56" />
      </g>
    </svg>
  );
}
