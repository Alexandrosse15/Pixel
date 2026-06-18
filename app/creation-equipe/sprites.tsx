import type { SpriteKey, DecorKey, PropKey } from './engine'

// Librairie d'assets vectoriels flat dessinés à la main.
// Personnages : viewBox 0 0 200 220. Décors : 0 0 400 250. Objets : 0 0 100 100.

const SKIN = '#E8B58C'
const SKIN_DARK = '#C98D63'
const HAIR = '#3A2C22'

// ── Personnages ──────────────────────────────────────────────────────────────

function Papa() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M52 220 Q52 150 100 148 Q148 150 148 220 Z" fill="#FF4500" />
      <path d="M100 148 L88 178 L100 188 L112 178 Z" fill="#CC3700" />
      <rect x="90" y="118" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="92" r="40" fill={SKIN} />
      <path d="M62 84 Q66 50 100 50 Q134 50 138 84 Q120 70 100 72 Q80 70 62 84Z" fill={HAIR} />
      <path d="M70 100 Q100 134 130 100 Q126 120 100 124 Q74 120 70 100Z" fill={SKIN_DARK} opacity="0.5" />
      <circle cx="86" cy="92" r="4" fill="#2A2A2A" />
      <circle cx="114" cy="92" r="4" fill="#2A2A2A" />
      <path d="M80 100 Q86 104 92 100" stroke={SKIN_DARK} strokeWidth="2" fill="none" />
      <path d="M108 100 Q114 104 120 100" stroke={SKIN_DARK} strokeWidth="2" fill="none" />
      <path d="M88 112 Q100 116 112 112" stroke="#7A4B2E" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Femme() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M54 220 Q54 152 100 150 Q146 152 146 220 Z" fill="#56A8FF" />
      <rect x="90" y="118" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="92" r="40" fill={SKIN} />
      <path d="M58 90 Q56 46 100 46 Q144 46 142 90 L142 140 Q132 120 130 92 Q120 74 100 74 Q80 74 70 92 Q68 120 58 140Z" fill="#5A3A26" />
      <circle cx="86" cy="92" r="4" fill="#2A2A2A" />
      <circle cx="114" cy="92" r="4" fill="#2A2A2A" />
      <path d="M106 82 Q114 78 122 82" stroke="#3A2418" strokeWidth="2.5" fill="none" />
      <path d="M90 114 L110 114" stroke="#B5524C" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

function Voisin() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M54 220 Q54 152 100 150 Q146 152 146 220 Z" fill="#3DDC97" />
      <rect x="90" y="118" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="92" r="40" fill={SKIN} />
      <path d="M60 78 Q60 48 100 48 Q140 48 140 78 Z" fill="#C0392B" />
      <path d="M58 78 L150 78 L150 86 L58 84 Z" fill="#922B21" />
      <path d="M84 108 Q100 116 116 108" stroke="#5A4A3A" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="86" cy="94" r="4" fill="#2A2A2A" />
      <circle cx="114" cy="94" r="4" fill="#2A2A2A" />
      <ellipse cx="100" cy="120" rx="7" ry="5" fill="#7A4B2E" />
    </g>
  )
}

function Vigile() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M50 220 Q50 150 100 148 Q150 150 150 220 Z" fill="#1E1E1E" />
      <rect x="88" y="158" width="24" height="40" fill="#111" />
      <circle cx="70" cy="172" r="6" fill="#F2C94C" />
      <rect x="90" y="118" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="92" r="40" fill={SKIN} />
      <path d="M62 86 Q64 54 100 54 Q136 54 138 86 Q100 74 62 86Z" fill="#1A1A1A" />
      <rect x="74" y="86" width="22" height="12" rx="4" fill="#111" />
      <rect x="104" y="86" width="22" height="12" rx="4" fill="#111" />
      <rect x="96" y="90" width="8" height="3" fill="#111" />
      <path d="M88 114 L112 114" stroke="#7A4B2E" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

function Ex() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M54 220 Q54 152 100 150 Q146 152 146 220 Z" fill="#9B59B6" />
      <rect x="90" y="118" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="92" r="40" fill={SKIN} />
      <path d="M58 92 Q56 44 100 44 Q144 44 142 92 Q130 70 100 72 Q70 70 58 92Z" fill="#1C1C1C" />
      <rect x="72" y="84" width="24" height="14" rx="7" fill="#2A2A2A" />
      <rect x="104" y="84" width="24" height="14" rx="7" fill="#2A2A2A" />
      <rect x="96" y="88" width="8" height="3" fill="#2A2A2A" />
      <path d="M88 116 Q100 120 112 114" stroke="#B5524C" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Mamie() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M56 220 Q56 154 100 152 Q144 154 144 220 Z" fill="#B07AA1" />
      <rect x="90" y="120" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="94" r="38" fill={SKIN} />
      <path d="M64 90 Q64 52 100 52 Q136 52 136 90 Q100 78 64 90Z" fill="#D9D9D9" />
      <circle cx="100" cy="50" r="12" fill="#D9D9D9" />
      <circle cx="86" cy="94" r="9" fill="none" stroke="#5A5A5A" strokeWidth="2.5" />
      <circle cx="114" cy="94" r="9" fill="none" stroke="#5A5A5A" strokeWidth="2.5" />
      <line x1="95" y1="94" x2="105" y2="94" stroke="#5A5A5A" strokeWidth="2.5" />
      <circle cx="86" cy="94" r="3" fill="#2A2A2A" />
      <circle cx="114" cy="94" r="3" fill="#2A2A2A" />
      <path d="M90 116 Q100 122 110 116" stroke="#7A4B2E" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Ado() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M54 220 Q54 152 100 150 Q146 152 146 220 Z" fill="#2C3E50" />
      <path d="M54 158 L146 158 L146 168 L54 168 Z" fill="#FF4500" />
      <rect x="90" y="118" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="92" r="40" fill={SKIN} />
      <path d="M56 96 Q52 48 100 48 Q148 48 144 96 L144 70 Q120 56 100 56 Q80 56 56 70Z" fill="#2C3E50" />
      <circle cx="86" cy="94" r="4" fill="#2A2A2A" />
      <circle cx="114" cy="94" r="4" fill="#2A2A2A" />
      <path d="M88 116 L112 112" stroke="#7A4B2E" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

function Caissiere() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M54 220 Q54 152 100 150 Q146 152 146 220 Z" fill="#2E8B57" />
      <path d="M84 152 L116 152 L112 220 L88 220 Z" fill="#F4F4F4" opacity="0.85" />
      <rect x="92" y="160" width="16" height="20" rx="2" fill="#FF4500" />
      <rect x="90" y="120" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="94" r="38" fill={SKIN} />
      <path d="M62 92 Q62 52 100 52 Q138 52 138 92 Q120 74 100 76 Q80 74 62 92Z" fill="#6B4226" />
      <circle cx="87" cy="94" r="4" fill="#2A2A2A" />
      <circle cx="113" cy="94" r="4" fill="#2A2A2A" />
      <path d="M88 114 Q100 122 112 114" stroke="#7A4B2E" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Caissier() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M54 220 Q54 152 100 150 Q146 152 146 220 Z" fill="#2E8B57" />
      <path d="M82 152 L118 152 L116 220 L84 220 Z" fill="#F4F4F4" opacity="0.85" />
      <rect x="92" y="160" width="16" height="20" rx="2" fill="#FF4500" />
      <rect x="90" y="120" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="94" r="38" fill={SKIN} />
      <path d="M64 90 Q64 54 100 54 Q136 54 136 90 Q100 78 64 90Z" fill="#2B2B2B" />
      <circle cx="87" cy="94" r="4" fill="#2A2A2A" />
      <circle cx="113" cy="94" r="4" fill="#2A2A2A" />
      <path d="M88 114 Q100 120 112 114" stroke="#7A4B2E" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Sdf() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="62" ry="12" fill="#000" opacity="0.25" />
      <path d="M46 220 Q60 168 100 168 Q140 168 154 220 Z" fill="#7F6A4F" />
      <path d="M64 200 Q100 188 136 200" stroke="#5C4A35" strokeWidth="4" fill="none" />
      <rect x="90" y="146" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="118" r="36" fill={SKIN} />
      <path d="M66 116 Q66 80 100 80 Q134 80 134 116 Q100 100 66 116Z" fill="#4A3A2A" />
      <path d="M64 100 Q64 74 100 74 Q136 74 136 100 Z" fill="#8E5A3A" />
      <circle cx="88" cy="118" r="4" fill="#2A2A2A" />
      <circle cx="112" cy="118" r="4" fill="#2A2A2A" />
      <path d="M88 138 Q100 144 112 138" stroke="#7A4B2E" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Barman() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M54 220 Q54 152 100 150 Q146 152 146 220 Z" fill="#34495E" />
      <path d="M84 152 L116 152 L114 220 L86 220 Z" fill="#1B2733" />
      <rect x="90" y="120" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="94" r="38" fill={SKIN} />
      <path d="M62 90 Q62 54 100 54 Q138 54 138 90 Q100 76 62 90Z" fill="#2B2B2B" />
      <path d="M72 104 Q100 132 128 104 Q124 122 100 126 Q76 122 72 104Z" fill="#2B2B2B" />
      <circle cx="87" cy="94" r="4" fill="#2A2A2A" />
      <circle cx="113" cy="94" r="4" fill="#2A2A2A" />
      <path d="M88 112 Q100 120 112 112" stroke="#7A4B2E" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Pharmacien() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M52 220 Q52 150 100 148 Q148 150 148 220 Z" fill="#F4F4F4" />
      <rect x="92" y="150" width="16" height="70" fill="#E4E4E4" />
      <rect x="118" y="160" width="20" height="20" rx="3" fill="#3DDC97" />
      <rect x="125" y="163" width="6" height="14" fill="#fff" />
      <rect x="121" y="167" width="14" height="6" fill="#fff" />
      <rect x="90" y="120" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="94" r="38" fill={SKIN} />
      <path d="M64 92 Q64 54 100 54 Q136 54 136 92 Q100 78 64 92Z" fill="#8A8A8A" />
      <circle cx="86" cy="94" r="8" fill="none" stroke="#3A3A3A" strokeWidth="2.5" />
      <circle cx="114" cy="94" r="8" fill="none" stroke="#3A3A3A" strokeWidth="2.5" />
      <line x1="94" y1="94" x2="106" y2="94" stroke="#3A3A3A" strokeWidth="2.5" />
      <circle cx="86" cy="94" r="3" fill="#2A2A2A" />
      <circle cx="114" cy="94" r="3" fill="#2A2A2A" />
      <path d="M90 116 L110 116" stroke="#7A4B2E" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

function Enfant() {
  return (
    <g>
      <ellipse cx="100" cy="212" rx="46" ry="10" fill="#000" opacity="0.25" />
      <path d="M70 212 Q70 168 100 166 Q130 168 130 212 Z" fill="#F2C94C" />
      <rect x="92" y="146" width="16" height="20" rx="7" fill={SKIN_DARK} />
      <circle cx="100" cy="118" r="44" fill={SKIN} />
      <path d="M58 116 Q58 76 100 76 Q142 76 142 116 Q100 96 58 116Z" fill="#6B4226" />
      <circle cx="84" cy="118" r="6" fill="#2A2A2A" />
      <circle cx="116" cy="118" r="6" fill="#2A2A2A" />
      <circle cx="76" cy="132" r="6" fill="#FF9B9B" opacity="0.6" />
      <circle cx="124" cy="132" r="6" fill="#FF9B9B" opacity="0.6" />
      <path d="M88 140 Q100 134 112 140" stroke="#7A4B2E" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Primeur() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M52 220 Q52 150 100 148 Q148 150 148 220 Z" fill="#7A5C3A" />
      <path d="M84 150 L116 150 L114 220 L86 220 Z" fill="#5C4428" />
      <rect x="90" y="120" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="94" r="38" fill={SKIN} />
      <ellipse cx="100" cy="62" rx="34" ry="14" fill="#2C3E50" />
      <circle cx="100" cy="58" r="6" fill="#2C3E50" />
      <path d="M82 110 Q100 118 118 110" stroke="#4A3A2A" strokeWidth="7" fill="none" strokeLinecap="round" />
      <circle cx="87" cy="94" r="4" fill="#2A2A2A" />
      <circle cx="113" cy="94" r="4" fill="#2A2A2A" />
      <ellipse cx="100" cy="122" rx="6" ry="4" fill="#7A4B2E" />
    </g>
  )
}

function Cycliste() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="56" ry="12" fill="#000" opacity="0.25" />
      <path d="M54 220 Q54 152 100 150 Q146 152 146 220 Z" fill="#FF4500" />
      <path d="M70 160 L130 160 L126 200 L74 200 Z" fill="#1E1E1E" opacity="0.4" />
      <rect x="90" y="120" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="94" r="38" fill={SKIN} />
      <path d="M60 86 Q60 50 100 50 Q140 50 140 86 L140 80 Q100 64 60 80Z" fill="#F2C94C" />
      <rect x="58" y="80" width="84" height="8" rx="4" fill="#D9A92E" />
      <rect x="74" y="86" width="22" height="12" rx="6" fill="#2A2A2A" opacity="0.85" />
      <rect x="104" y="86" width="22" height="12" rx="6" fill="#2A2A2A" opacity="0.85" />
      <path d="M88 114 Q100 110 112 114" stroke="#7A4B2E" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Collegue() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M52 220 Q52 150 100 148 Q148 150 148 220 Z" fill="#34495E" />
      <path d="M92 150 L108 150 L108 220 L92 220 Z" fill="#E4E4E4" />
      <rect x="96" y="150" width="8" height="44" fill="#FF4500" />
      <rect x="94" y="158" width="12" height="16" rx="2" fill="#fff" />
      <rect x="90" y="120" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="94" r="38" fill={SKIN} />
      <path d="M62 90 Q62 54 100 54 Q138 54 138 86 Q120 70 100 72 Q80 70 62 90Z" fill="#3A2C22" />
      <rect x="76" y="88" width="20" height="12" rx="3" fill="none" stroke="#3A3A3A" strokeWidth="2.5" />
      <rect x="104" y="88" width="20" height="12" rx="3" fill="none" stroke="#3A3A3A" strokeWidth="2.5" />
      <line x1="96" y1="94" x2="104" y2="94" stroke="#3A3A3A" strokeWidth="2.5" />
      <circle cx="86" cy="94" r="3" fill="#2A2A2A" />
      <circle cx="114" cy="94" r="3" fill="#2A2A2A" />
      <path d="M88 114 L112 114" stroke="#7A4B2E" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

function Skateur() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M54 220 Q54 152 100 150 Q146 152 146 220 Z" fill="#16A085" />
      <rect x="50" y="206" width="100" height="8" rx="4" fill="#2A2A2A" />
      <circle cx="68" cy="218" r="5" fill="#F2C94C" />
      <circle cx="132" cy="218" r="5" fill="#F2C94C" />
      <rect x="90" y="118" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="92" r="40" fill={SKIN} />
      <path d="M58 88 Q58 50 100 50 Q142 50 142 88 L142 78 Q100 66 58 78Z" fill="#C0392B" />
      <rect x="56" y="74" width="88" height="10" rx="5" fill="#922B21" />
      <circle cx="86" cy="96" r="4" fill="#2A2A2A" />
      <circle cx="114" cy="96" r="4" fill="#2A2A2A" />
      <path d="M88 116 L112 112" stroke="#7A4B2E" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

function Chien() {
  return (
    <g>
      <ellipse cx="100" cy="208" rx="70" ry="14" fill="#000" opacity="0.25" />
      <ellipse cx="96" cy="160" rx="60" ry="38" fill="#C68A4E" />
      <rect x="56" y="178" width="14" height="28" rx="6" fill="#B07A42" />
      <rect x="122" y="178" width="14" height="28" rx="6" fill="#B07A42" />
      <path d="M150 150 Q176 138 172 118" stroke="#C68A4E" strokeWidth="12" fill="none" strokeLinecap="round" />
      <circle cx="70" cy="120" r="40" fill="#D49B5E" />
      <path d="M40 96 Q30 124 50 134 Z" fill="#A86E3A" />
      <path d="M96 92 Q110 116 88 132 Z" fill="#A86E3A" />
      <ellipse cx="58" cy="134" rx="20" ry="15" fill="#EBC99A" />
      <circle cx="46" cy="132" r="6" fill="#2A2A2A" />
      <circle cx="66" cy="110" r="5" fill="#2A2A2A" />
      <circle cx="86" cy="110" r="5" fill="#2A2A2A" />
      <path d="M52 142 Q56 158 64 150" fill="#E6748A" />
    </g>
  )
}

function Maitresse() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M54 220 Q54 152 100 150 Q146 152 146 220 Z" fill="#C0577A" />
      <path d="M84 152 L116 152 L114 220 L86 220 Z" fill="#A8456A" />
      <rect x="90" y="120" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="94" r="38" fill={SKIN} />
      <path d="M62 92 Q62 50 100 50 Q138 50 138 92 Q138 70 100 70 Q62 70 62 92Z" fill="#7A4A2A" />
      <circle cx="100" cy="58" r="11" fill="#7A4A2A" />
      <circle cx="86" cy="94" r="8" fill="none" stroke="#3A3A3A" strokeWidth="2.5" />
      <circle cx="114" cy="94" r="8" fill="none" stroke="#3A3A3A" strokeWidth="2.5" />
      <line x1="94" y1="94" x2="106" y2="94" stroke="#3A3A3A" strokeWidth="2.5" />
      <circle cx="86" cy="94" r="3" fill="#2A2A2A" />
      <circle cx="114" cy="94" r="3" fill="#2A2A2A" />
      <path d="M90 116 L110 116" stroke="#B5524C" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

function Patron() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M52 220 Q52 150 100 148 Q148 150 148 220 Z" fill="#2C3340" />
      <path d="M92 150 L108 150 L108 220 L92 220 Z" fill="#F4F4F4" />
      <path d="M100 150 L94 176 L100 186 L106 176 Z" fill="#C0392B" />
      <rect x="90" y="118" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="92" r="40" fill={SKIN} />
      <path d="M60 88 Q62 52 100 52 Q138 52 140 88 Q120 72 100 74 Q80 72 60 88Z" fill="#43403B" />
      <path d="M62 84 Q70 70 84 76" stroke="#9A9A9A" strokeWidth="2" fill="none" />
      <circle cx="86" cy="92" r="4" fill="#2A2A2A" />
      <circle cx="114" cy="92" r="4" fill="#2A2A2A" />
      <path d="M106 82 Q114 79 122 83" stroke="#3A3A3A" strokeWidth="2.5" fill="none" />
      <path d="M88 112 Q100 108 112 112" stroke="#7A4B2E" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Vendeur() {
  return (
    <g>
      <ellipse cx="100" cy="215" rx="58" ry="12" fill="#000" opacity="0.25" />
      <path d="M54 220 Q54 152 100 150 Q146 152 146 220 Z" fill="#9B59B6" />
      <path d="M70 158 L130 158 L128 178 L72 178 Z" fill="#F2C94C" opacity="0.5" />
      <rect x="92" y="150" width="16" height="14" rx="2" fill="#fff" />
      <rect x="90" y="120" width="20" height="22" rx="8" fill={SKIN_DARK} />
      <circle cx="100" cy="94" r="38" fill={SKIN} />
      <path d="M62 90 Q62 52 100 52 Q138 52 138 90 Q120 74 100 76 Q80 74 62 90Z" fill="#2B2B2B" />
      <circle cx="87" cy="94" r="4" fill="#2A2A2A" />
      <circle cx="113" cy="94" r="4" fill="#2A2A2A" />
      <path d="M86 114 Q100 124 114 114" stroke="#7A4B2E" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  )
}

const SPRITES: Record<SpriteKey, () => JSX.Element> = {
  papa: Papa,
  femme: Femme,
  voisin: Voisin,
  vigile: Vigile,
  ex: Ex,
  mamie: Mamie,
  ado: Ado,
  chien: Chien,
  caissiere: Caissiere,
  caissier: Caissier,
  sdf: Sdf,
  barman: Barman,
  pharmacien: Pharmacien,
  enfant: Enfant,
  primeur: Primeur,
  cycliste: Cycliste,
  collegue: Collegue,
  skateur: Skateur,
  maitresse: Maitresse,
  patron: Patron,
  vendeur: Vendeur,
}

export function Sprite({ name, className }: { name: SpriteKey; className?: string }) {
  const Comp = SPRITES[name] ?? Papa
  return (
    <svg viewBox="0 0 200 220" className={className} role="img" aria-label={name}>
      <Comp />
    </svg>
  )
}

// ── Décors ───────────────────────────────────────────────────────────────────

interface DecorDef {
  from: string
  to: string
  shapes: JSX.Element
}

const DECORS: Record<DecorKey, DecorDef> = {
  maison: {
    from: '#2B2438',
    to: '#15111F',
    shapes: (
      <g>
        <rect x="0" y="150" width="400" height="100" fill="#1B1626" />
        <rect x="40" y="70" width="120" height="100" fill="#3A2F4D" />
        <rect x="60" y="90" width="30" height="30" fill="#F2C94C" opacity="0.7" />
        <rect x="110" y="90" width="30" height="30" fill="#F2C94C" opacity="0.5" />
        <rect x="240" y="50" width="120" height="120" fill="#332A45" />
        <rect x="265" y="75" width="28" height="28" fill="#F2C94C" opacity="0.6" />
      </g>
    ),
  },
  cuisine: {
    from: '#3A3A48',
    to: '#1C1C26',
    shapes: (
      <g>
        <rect x="0" y="150" width="400" height="100" fill="#2A2A34" />
        <rect x="0" y="150" width="400" height="10" fill="#4A4A58" />
        <rect x="30" y="100" width="90" height="50" fill="#34343F" />
        <rect x="40" y="60" width="70" height="34" fill="#3DDC97" opacity="0.3" />
        <rect x="200" y="80" width="60" height="70" fill="#222229" />
        <rect x="210" y="90" width="40" height="26" fill="#56A8FF" opacity="0.4" />
        <circle cx="320" cy="120" r="22" fill="#FF4500" opacity="0.3" />
      </g>
    ),
  },
  rue: {
    from: '#3A4A63',
    to: '#1A2230',
    shapes: (
      <g>
        <rect x="0" y="170" width="400" height="80" fill="#222B38" />
        <rect x="20" y="60" width="70" height="110" fill="#2C3A4E" />
        <rect x="130" y="40" width="80" height="130" fill="#26323F" />
        <rect x="250" y="80" width="60" height="90" fill="#2C3A4E" />
        <circle cx="340" cy="60" r="14" fill="#F2C94C" opacity="0.6" />
        <rect x="334" y="74" width="3" height="96" fill="#1A222C" />
      </g>
    ),
  },
  ruelle: {
    from: '#2E3340',
    to: '#15181F',
    shapes: (
      <g>
        <rect x="0" y="180" width="400" height="70" fill="#1E222B" />
        <rect x="0" y="40" width="150" height="140" fill="#262B36" />
        <rect x="250" y="40" width="150" height="140" fill="#222730" />
        <rect x="40" y="80" width="26" height="34" fill="#F2C94C" opacity="0.4" />
        <rect x="300" y="90" width="26" height="34" fill="#F2C94C" opacity="0.3" />
        <rect x="180" y="120" width="40" height="60" fill="#1A1E26" />
      </g>
    ),
  },
  supermarche: {
    from: '#243A3A',
    to: '#10201F',
    shapes: (
      <g>
        <rect x="0" y="160" width="400" height="90" fill="#16302E" />
        <rect x="0" y="40" width="400" height="20" fill="#2E8B57" opacity="0.6" />
        <rect x="30" y="70" width="80" height="90" fill="#1E3D3A" />
        <rect x="140" y="70" width="80" height="90" fill="#1E3D3A" />
        <rect x="250" y="70" width="80" height="90" fill="#1E3D3A" />
      </g>
    ),
  },
  rayon: {
    from: '#2C2F3A',
    to: '#16181F',
    shapes: (
      <g>
        <rect x="0" y="40" width="400" height="14" fill="#3A3F4D" />
        <rect x="0" y="100" width="400" height="14" fill="#3A3F4D" />
        <rect x="0" y="160" width="400" height="14" fill="#3A3F4D" />
        {[20, 70, 120, 170, 220, 270, 320].map((x) => (
          <g key={x}>
            <rect x={x} y="58" width="34" height="36" rx="3" fill="#5A6173" opacity="0.8" />
            <rect x={x} y="118" width="34" height="36" rx="3" fill="#FF4500" opacity="0.45" />
          </g>
        ))}
      </g>
    ),
  },
  allee: {
    from: '#2A3340',
    to: '#14181F',
    shapes: (
      <g>
        <rect x="0" y="180" width="400" height="70" fill="#1B2029" />
        <rect x="0" y="30" width="80" height="150" fill="#313B49" />
        <rect x="320" y="30" width="80" height="150" fill="#313B49" />
        {[44, 344].map((x) =>
          [50, 96, 142].map((y) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="48" height="34" rx="3" fill="#FF4500" opacity="0.3" />
          ))
        )}
        <path d="M120 180 L150 30 L250 30 L280 180 Z" fill="#0F1319" opacity="0.5" />
      </g>
    ),
  },
  pharmacie: {
    from: '#1F3A4D',
    to: '#0E1C26',
    shapes: (
      <g>
        <rect x="0" y="160" width="400" height="90" fill="#13303E" />
        <rect x="160" y="30" width="80" height="80" fill="#0E2530" />
        <rect x="190" y="50" width="14" height="40" fill="#3DDC97" />
        <rect x="177" y="63" width="40" height="14" fill="#3DDC97" />
        <rect x="40" y="80" width="90" height="80" fill="#16384A" />
        <rect x="270" y="80" width="90" height="80" fill="#16384A" />
      </g>
    ),
  },
  bar: {
    from: '#4A3520',
    to: '#231910',
    shapes: (
      <g>
        <rect x="0" y="160" width="400" height="90" fill="#2A1E12" />
        <rect x="0" y="155" width="400" height="10" fill="#5A4128" />
        {[30, 90, 150, 210, 270, 330].map((x) => (
          <g key={x}>
            <rect x={x} y="120" width="10" height="35" fill="#3A2A18" />
            <ellipse cx={x + 5} cy="116" rx="22" ry="8" fill="#C0392B" opacity="0.7" />
          </g>
        ))}
        <circle cx="350" cy="50" r="20" fill="#F2C94C" opacity="0.5" />
      </g>
    ),
  },
  parc: {
    from: '#33502F',
    to: '#16240F',
    shapes: (
      <g>
        <rect x="0" y="170" width="400" height="80" fill="#1F3A1A" />
        <ellipse cx="70" cy="150" rx="50" ry="60" fill="#2C5527" />
        <rect x="64" y="160" width="12" height="40" fill="#3A2A18" />
        <ellipse cx="320" cy="140" rx="60" ry="70" fill="#2C5527" />
        <rect x="314" y="150" width="14" height="50" fill="#3A2A18" />
        <circle cx="200" cy="50" r="22" fill="#F2C94C" opacity="0.6" />
      </g>
    ),
  },
  parking: {
    from: '#33363D',
    to: '#171A1F',
    shapes: (
      <g>
        <rect x="0" y="160" width="400" height="90" fill="#202329" />
        {[40, 130, 220, 310].map((x) => (
          <rect key={x} x={x} y="165" width="4" height="80" fill="#4A4E57" opacity="0.6" />
        ))}
        <rect x="50" y="120" width="80" height="42" rx="8" fill="#C0392B" opacity="0.7" />
        <rect x="240" y="120" width="80" height="42" rx="8" fill="#56A8FF" opacity="0.6" />
        <rect x="0" y="40" width="400" height="14" fill="#3A3F4D" />
      </g>
    ),
  },
  caisse: {
    from: '#2C3340',
    to: '#15191F',
    shapes: (
      <g>
        <rect x="0" y="170" width="400" height="80" fill="#1B2029" />
        <rect x="30" y="120" width="140" height="50" fill="#2A3340" />
        <rect x="40" y="100" width="40" height="24" rx="3" fill="#3DDC97" opacity="0.7" />
        <rect x="0" y="160" width="400" height="8" fill="#4A4E57" />
        <rect x="230" y="60" width="50" height="60" fill="#FF4500" opacity="0.3" />
        <rect x="300" y="60" width="50" height="60" fill="#F2C94C" opacity="0.3" />
      </g>
    ),
  },
  epicerie: {
    from: '#3A3220',
    to: '#1C1810',
    shapes: (
      <g>
        <rect x="0" y="160" width="400" height="90" fill="#241E12" />
        <rect x="0" y="36" width="400" height="22" fill="#C0392B" opacity="0.6" />
        {[20, 75, 130, 185, 240, 295, 350].map((x) => (
          <rect key={x} x={x} y="62" width="40" height="96" rx="3" fill="#352B1A" />
        ))}
        {[20, 130, 240, 350].map((x) => (
          <rect key={`p${x}`} x={x + 6} y="74" width="28" height="20" rx="2" fill="#F2C94C" opacity="0.4" />
        ))}
      </g>
    ),
  },
  boulangerie: {
    from: '#4A3A22',
    to: '#241B10',
    shapes: (
      <g>
        <rect x="0" y="160" width="400" height="90" fill="#2A2012" />
        <rect x="0" y="36" width="400" height="20" fill="#D9A92E" opacity="0.6" />
        <rect x="40" y="70" width="120" height="90" fill="#33270F" />
        <ellipse cx="80" cy="100" rx="18" ry="9" fill="#C68A4E" />
        <ellipse cx="120" cy="100" rx="18" ry="9" fill="#C68A4E" />
        <rect x="240" y="70" width="120" height="90" fill="#33270F" />
        <circle cx="300" cy="105" r="14" fill="#C68A4E" opacity="0.8" />
      </g>
    ),
  },
  marche: {
    from: '#3A4533',
    to: '#1A2014',
    shapes: (
      <g>
        <rect x="0" y="170" width="400" height="80" fill="#222A18" />
        {[20, 150, 280].map((x) => (
          <g key={x}>
            <rect x={x} y="100" width="100" height="70" fill="#3A2A18" />
            <path d={`M${x - 6} 100 L${x + 50} 72 L${x + 106} 100 Z`} fill="#C0392B" opacity="0.7" />
            <circle cx={x + 25} cy="115" r="6" fill="#FF6A33" />
            <circle cx={x + 45} cy="115" r="6" fill="#F2C94C" />
            <circle cx={x + 65} cy="115" r="6" fill="#3DDC97" />
          </g>
        ))}
      </g>
    ),
  },
  atm: {
    from: '#22323A',
    to: '#101A1F',
    shapes: (
      <g>
        <rect x="0" y="170" width="400" height="80" fill="#16242A" />
        <rect x="140" y="60" width="120" height="110" rx="6" fill="#1E2E34" />
        <rect x="160" y="78" width="80" height="44" rx="4" fill="#3DDC97" opacity="0.4" />
        <rect x="168" y="132" width="64" height="10" rx="3" fill="#2A3A40" />
        <rect x="40" y="80" width="70" height="90" fill="#1A282E" />
        <rect x="290" y="80" width="70" height="90" fill="#1A282E" />
      </g>
    ),
  },
  arret_bus: {
    from: '#384150',
    to: '#191E26',
    shapes: (
      <g>
        <rect x="0" y="175" width="400" height="75" fill="#1F242E" />
        <rect x="60" y="80" width="200" height="14" rx="4" fill="#3A4452" />
        <rect x="66" y="94" width="10" height="84" fill="#2E3744" />
        <rect x="244" y="94" width="10" height="84" fill="#2E3744" />
        <rect x="90" y="140" width="120" height="14" rx="6" fill="#56A8FF" opacity="0.4" />
        <rect x="300" y="60" width="60" height="120" fill="#2A3340" />
        <circle cx="40" cy="60" r="12" fill="#F2C94C" opacity="0.5" />
      </g>
    ),
  },
  ecole: {
    from: '#2C3E55',
    to: '#141E2C',
    shapes: (
      <g>
        <rect x="0" y="175" width="400" height="75" fill="#1E2A1A" />
        <rect x="60" y="50" width="280" height="125" fill="#33465E" />
        <rect x="170" y="110" width="60" height="65" fill="#1E2A38" />
        <path d="M50 50 L200 18 L350 50 Z" fill="#56A8FF" opacity="0.5" />
        {[90, 140, 250, 300].map((x) => (
          <rect key={x} x={x} y="80" width="30" height="26" fill="#F2C94C" opacity="0.5" />
        ))}
        <rect x="20" y="120" width="6" height="55" fill="#4A5566" />
        <rect x="374" y="120" width="6" height="55" fill="#4A5566" />
        <path d="M26 130 L374 130" stroke="#4A5566" strokeWidth="3" />
      </g>
    ),
  },
  bureau: {
    from: '#2E333C',
    to: '#15181E',
    shapes: (
      <g>
        <rect x="0" y="168" width="400" height="82" fill="#20242B" />
        <rect x="40" y="56" width="120" height="80" fill="#1B2733" />
        <rect x="52" y="68" width="96" height="56" fill="#56A8FF" opacity="0.3" />
        <rect x="240" y="56" width="120" height="80" fill="#1B2733" />
        <rect x="252" y="68" width="96" height="56" fill="#3DDC97" opacity="0.25" />
        <rect x="60" y="150" width="90" height="20" rx="2" fill="#34343F" />
        <rect x="250" y="150" width="90" height="20" rx="2" fill="#34343F" />
      </g>
    ),
  },
  magasin_jouets: {
    from: '#4A2C58',
    to: '#1F1228',
    shapes: (
      <g>
        <rect x="0" y="162" width="400" height="88" fill="#2A1838" />
        <rect x="0" y="36" width="400" height="20" fill="#9B59B6" opacity="0.6" />
        {[30, 110, 190, 270, 350].map((x, i) => (
          <rect
            key={x}
            x={x}
            y="70"
            width="50"
            height="92"
            rx="4"
            fill={['#FF6A33', '#56A8FF', '#3DDC97', '#F2C94C', '#E74C6C'][i]}
            opacity="0.35"
          />
        ))}
      </g>
    ),
  },
  rayon_jouets: {
    from: '#3A2348',
    to: '#180E20',
    shapes: (
      <g>
        <rect x="0" y="44" width="400" height="12" fill="#5A4070" />
        <rect x="0" y="104" width="400" height="12" fill="#5A4070" />
        <rect x="0" y="164" width="400" height="12" fill="#5A4070" />
        {[20, 70, 120, 170, 220, 270, 320].map((x, i) => (
          <g key={x}>
            <circle cx={x + 17} cy="76" r="13" fill={['#FF6A33', '#56A8FF', '#3DDC97', '#F2C94C'][i % 4]} opacity="0.5" />
            <rect x={x} y="124" width="34" height="34" rx="4" fill={['#E74C6C', '#9B59B6', '#F2C94C'][i % 3]} opacity="0.45" />
          </g>
        ))}
      </g>
    ),
  },
}

export function Decor({ name, className }: { name: DecorKey; className?: string }) {
  const def = DECORS[name] ?? DECORS.rue
  const gid = `decor-${name}`
  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={def.from} />
          <stop offset="100%" stopColor={def.to} />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#${gid})`} />
      {def.shapes}
    </svg>
  )
}

// ── Objets (props) ───────────────────────────────────────────────────────────

const PROPS: Record<PropKey, () => JSX.Element> = {
  couches: () => (
    <g>
      <rect x="22" y="30" width="56" height="50" rx="6" fill="#56A8FF" />
      <rect x="22" y="30" width="56" height="14" rx="6" fill="#3D86D6" />
      <path d="M30 56 Q50 50 70 56 L66 74 Q50 80 34 74 Z" fill="#fff" />
      <circle cx="50" cy="62" r="5" fill="#FF9B9B" />
      <text x="50" y="42" fontSize="9" fill="#fff" textAnchor="middle" fontWeight="bold">T3</text>
    </g>
  ),
  lait: () => (
    <g>
      <rect x="32" y="26" width="36" height="56" rx="6" fill="#F4F4F4" />
      <rect x="32" y="26" width="36" height="14" rx="6" fill="#F2C94C" />
      <rect x="38" y="46" width="24" height="22" rx="2" fill="#56A8FF" opacity="0.5" />
      <circle cx="50" cy="57" r="7" fill="#fff" stroke="#56A8FF" strokeWidth="2" />
    </g>
  ),
  biere: () => (
    <g>
      <rect x="34" y="34" width="30" height="44" rx="3" fill="#F2C94C" />
      <rect x="34" y="30" width="30" height="12" rx="3" fill="#FFF8E7" />
      <path d="M64 44 Q78 44 78 56 Q78 68 64 68" fill="none" stroke="#F2C94C" strokeWidth="5" />
      <rect x="40" y="48" width="4" height="24" fill="#fff" opacity="0.4" />
    </g>
  ),
  cafe: () => (
    <g>
      <path d="M34 46 L66 46 L62 78 L38 78 Z" fill="#fff" />
      <path d="M66 50 Q80 50 80 60 Q80 70 66 70" fill="none" stroke="#fff" strokeWidth="5" />
      <path d="M44 30 Q48 36 44 42" stroke="#B0B0B0" strokeWidth="3" fill="none" />
      <path d="M56 30 Q60 36 56 42" stroke="#B0B0B0" strokeWidth="3" fill="none" />
      <rect x="38" y="46" width="24" height="6" fill="#6B4226" />
    </g>
  ),
  painchoco: () => (
    <g>
      <ellipse cx="50" cy="54" rx="30" ry="18" fill="#C68A4E" />
      <ellipse cx="50" cy="50" rx="30" ry="18" fill="#D49B5E" />
      <rect x="40" y="36" width="4" height="30" fill="#6B4226" rx="2" />
      <rect x="56" y="36" width="4" height="30" fill="#6B4226" rx="2" />
    </g>
  ),
  caddie: () => (
    <g>
      <path d="M26 36 L36 36 L44 64 L74 64 L80 44 L40 44" fill="none" stroke="#B0B0B0" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="48" cy="74" r="5" fill="#666" />
      <circle cx="70" cy="74" r="5" fill="#666" />
      <line x1="44" y1="50" x2="78" y2="50" stroke="#B0B0B0" strokeWidth="2" />
      <line x1="58" y1="44" x2="60" y2="64" stroke="#B0B0B0" strokeWidth="2" />
    </g>
  ),
  panier: () => (
    <g>
      <path d="M28 46 L72 46 L66 76 L34 76 Z" fill="#C0392B" />
      <path d="M36 46 Q36 30 50 30 Q64 30 64 46" fill="none" stroke="#922B21" strokeWidth="4" />
      <line x1="40" y1="52" x2="44" y2="70" stroke="#922B21" strokeWidth="2" />
      <line x1="56" y1="52" x2="60" y2="70" stroke="#922B21" strokeWidth="2" />
    </g>
  ),
  parapluie: () => (
    <g>
      <path d="M24 52 Q50 22 76 52 Z" fill="#FF4500" />
      <path d="M24 52 Q32 46 40 52 Q48 46 50 52 Q52 46 60 52 Q68 46 76 52" fill="none" stroke="#CC3700" strokeWidth="2" />
      <line x1="50" y1="52" x2="50" y2="78" stroke="#3A3A3A" strokeWidth="3" />
      <path d="M50 78 Q42 78 44 70" fill="none" stroke="#3A3A3A" strokeWidth="3" />
    </g>
  ),
  velo: () => (
    <g>
      <circle cx="32" cy="62" r="16" fill="none" stroke="#56A8FF" strokeWidth="4" />
      <circle cx="72" cy="62" r="16" fill="none" stroke="#56A8FF" strokeWidth="4" />
      <path d="M32 62 L52 62 L62 42 L72 62 M52 62 L62 42" fill="none" stroke="#F4F4F4" strokeWidth="3" />
      <line x1="58" y1="38" x2="68" y2="38" stroke="#F4F4F4" strokeWidth="3" />
    </g>
  ),
  trottinette: () => (
    <g>
      <circle cx="32" cy="70" r="9" fill="none" stroke="#3DDC97" strokeWidth="4" />
      <circle cx="72" cy="70" r="9" fill="none" stroke="#3DDC97" strokeWidth="4" />
      <line x1="32" y1="70" x2="72" y2="70" stroke="#B0B0B0" strokeWidth="4" />
      <line x1="72" y1="70" x2="72" y2="30" stroke="#B0B0B0" strokeWidth="4" />
      <line x1="62" y1="30" x2="80" y2="30" stroke="#B0B0B0" strokeWidth="4" />
    </g>
  ),
  skateboard: () => (
    <g>
      <rect x="22" y="50" width="56" height="10" rx="5" fill="#16A085" />
      <circle cx="34" cy="66" r="6" fill="#F2C94C" />
      <circle cx="66" cy="66" r="6" fill="#F2C94C" />
      <rect x="26" y="52" width="48" height="3" fill="#fff" opacity="0.3" />
    </g>
  ),
  carte: () => (
    <g>
      <rect x="24" y="36" width="52" height="34" rx="4" fill="#34495E" />
      <rect x="24" y="44" width="52" height="8" fill="#1B2733" />
      <rect x="30" y="58" width="16" height="8" rx="2" fill="#F2C94C" />
      <circle cx="64" cy="62" r="5" fill="#FF4500" opacity="0.8" />
    </g>
  ),
  piece: () => (
    <g>
      <circle cx="50" cy="52" r="24" fill="#F2C94C" />
      <circle cx="50" cy="52" r="24" fill="none" stroke="#D9A92E" strokeWidth="3" />
      <text x="50" y="60" fontSize="22" fill="#8A6A14" textAnchor="middle" fontWeight="bold">€</text>
    </g>
  ),
  billet: () => (
    <g>
      <rect x="22" y="40" width="56" height="30" rx="3" fill="#3DDC97" />
      <circle cx="50" cy="55" r="9" fill="#2E8B57" />
      <text x="50" y="60" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="bold">€</text>
      <circle cx="30" cy="47" r="3" fill="#2E8B57" />
      <circle cx="70" cy="63" r="3" fill="#2E8B57" />
    </g>
  ),
  telephone: () => (
    <g>
      <rect x="36" y="26" width="28" height="50" rx="5" fill="#1E1E1E" />
      <rect x="40" y="32" width="20" height="34" rx="1" fill="#56A8FF" opacity="0.6" />
      <circle cx="50" cy="71" r="2.5" fill="#444" />
    </g>
  ),
  cles: () => (
    <g>
      <circle cx="38" cy="40" r="12" fill="none" stroke="#F2C94C" strokeWidth="5" />
      <line x1="46" y1="48" x2="70" y2="72" stroke="#F2C94C" strokeWidth="5" />
      <line x1="60" y1="62" x2="68" y2="54" stroke="#F2C94C" strokeWidth="5" />
      <line x1="66" y1="68" x2="74" y2="60" stroke="#F2C94C" strokeWidth="5" />
    </g>
  ),
  tomates: () => (
    <g>
      <path d="M28 52 L72 52 L66 76 L34 76 Z" fill="#3A2A18" />
      <circle cx="40" cy="50" r="11" fill="#C0392B" />
      <circle cx="58" cy="48" r="11" fill="#E74C3C" />
      <circle cx="50" cy="58" r="11" fill="#C0392B" />
      <path d="M40 40 l2 -4 l3 4" stroke="#3DDC97" strokeWidth="2" fill="none" />
    </g>
  ),
  sac: () => (
    <g>
      <path d="M30 42 L70 42 L74 78 L26 78 Z" fill="#FF4500" />
      <path d="M40 42 Q40 28 50 28 Q60 28 60 42" fill="none" stroke="#fff" strokeWidth="3.5" />
      <rect x="44" y="54" width="12" height="12" fill="#fff" opacity="0.5" />
    </g>
  ),
  ticket: () => (
    <g>
      <path d="M36 24 L64 24 L64 78 L58 72 L50 78 L42 72 L36 78 Z" fill="#F4F4F4" />
      <line x1="42" y1="36" x2="58" y2="36" stroke="#B0B0B0" strokeWidth="2" />
      <line x1="42" y1="44" x2="58" y2="44" stroke="#B0B0B0" strokeWidth="2" />
      <line x1="42" y1="52" x2="58" y2="52" stroke="#B0B0B0" strokeWidth="2" />
    </g>
  ),
  carton: () => (
    <g>
      <path d="M26 44 L50 36 L74 44 L74 74 L50 80 L26 74 Z" fill="#C68A4E" />
      <path d="M26 44 L50 50 L74 44" fill="none" stroke="#A86E3A" strokeWidth="2" />
      <line x1="50" y1="50" x2="50" y2="80" stroke="#A86E3A" strokeWidth="2" />
    </g>
  ),
  tondeuse: () => (
    <g>
      <rect x="26" y="56" width="44" height="20" rx="4" fill="#C0392B" />
      <circle cx="36" cy="78" r="6" fill="#2A2A2A" />
      <circle cx="62" cy="78" r="6" fill="#2A2A2A" />
      <line x1="70" y1="58" x2="80" y2="32" stroke="#B0B0B0" strokeWidth="4" />
      <line x1="74" y1="34" x2="86" y2="34" stroke="#B0B0B0" strokeWidth="4" />
    </g>
  ),
  ballon: () => (
    <g>
      <circle cx="50" cy="54" r="24" fill="#F4F4F4" />
      <circle cx="50" cy="54" r="24" fill="none" stroke="#2A2A2A" strokeWidth="2" />
      <path d="M50 42 l10 7 l-4 12 h-12 l-4 -12 Z" fill="#2A2A2A" />
    </g>
  ),
  os: () => (
    <g>
      <path d="M30 44 a7 7 0 1 1 8 8 l24 -4 a7 7 0 1 1 8 8 a7 7 0 1 1 -8 8 l-24 4 a7 7 0 1 1 -8 -8 a7 7 0 0 1 0 -16Z" fill="#F4F4F4" stroke="#D9D9D9" strokeWidth="1.5" />
    </g>
  ),
  laisse: () => (
    <g>
      <circle cx="34" cy="36" r="10" fill="none" stroke="#C0392B" strokeWidth="5" />
      <path d="M40 44 Q60 50 60 70" fill="none" stroke="#C0392B" strokeWidth="5" />
      <rect x="55" y="68" width="10" height="12" rx="2" fill="#B0B0B0" />
    </g>
  ),
  poussette: () => (
    <g>
      <path d="M30 38 L66 38 Q70 60 46 60 Q30 60 30 38Z" fill="#56A8FF" />
      <line x1="30" y1="38" x2="74" y2="66" stroke="#B0B0B0" strokeWidth="4" />
      <line x1="46" y1="60" x2="40" y2="74" stroke="#B0B0B0" strokeWidth="4" />
      <circle cx="40" cy="78" r="6" fill="#2A2A2A" />
      <circle cx="72" cy="72" r="6" fill="#2A2A2A" />
    </g>
  ),
  casquette: () => (
    <g>
      <path d="M28 56 Q28 32 56 32 Q78 32 78 54 Q56 44 30 54Z" fill="#C0392B" />
      <path d="M26 54 L62 54 L62 62 L26 60Z" fill="#922B21" />
      <circle cx="53" cy="36" r="3" fill="#922B21" />
    </g>
  ),
  lunettes: () => (
    <g>
      <rect x="22" y="44" width="26" height="18" rx="9" fill="#2A2A2A" />
      <rect x="52" y="44" width="26" height="18" rx="9" fill="#2A2A2A" />
      <line x1="48" y1="50" x2="52" y2="50" stroke="#2A2A2A" strokeWidth="4" />
      <line x1="22" y1="48" x2="14" y2="44" stroke="#2A2A2A" strokeWidth="3" />
      <line x1="78" y1="48" x2="86" y2="44" stroke="#2A2A2A" strokeWidth="3" />
    </g>
  ),
  promo: () => (
    <g>
      <path d="M26 30 L60 30 L78 50 L52 76 L26 56 Z" fill="#FF4500" />
      <circle cx="38" cy="42" r="5" fill="#fff" />
      <text x="54" y="60" fontSize="18" fill="#fff" textAnchor="middle" fontWeight="bold">%</text>
    </g>
  ),
  horloge: () => (
    <g>
      <circle cx="50" cy="54" r="26" fill="#F4F4F4" />
      <circle cx="50" cy="54" r="26" fill="none" stroke="#B0B0B0" strokeWidth="3" />
      <line x1="50" y1="54" x2="50" y2="38" stroke="#2A2A2A" strokeWidth="3" />
      <line x1="50" y1="54" x2="62" y2="58" stroke="#FF4500" strokeWidth="3" />
    </g>
  ),
  nuage: () => (
    <g>
      <ellipse cx="50" cy="44" rx="28" ry="16" fill="#B0B8C4" />
      <ellipse cx="34" cy="48" rx="14" ry="11" fill="#B0B8C4" />
      <ellipse cx="66" cy="48" rx="14" ry="11" fill="#B0B8C4" />
      <line x1="38" y1="62" x2="34" y2="76" stroke="#56A8FF" strokeWidth="3" />
      <line x1="52" y1="62" x2="48" y2="78" stroke="#56A8FF" strokeWidth="3" />
      <line x1="66" y1="62" x2="62" y2="76" stroke="#56A8FF" strokeWidth="3" />
    </g>
  ),
  soleil: () => (
    <g>
      <circle cx="50" cy="52" r="16" fill="#F2C94C" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180
        return (
          <line
            key={a}
            x1={50 + Math.cos(r) * 22}
            y1={52 + Math.sin(r) * 22}
            x2={50 + Math.cos(r) * 30}
            y2={52 + Math.sin(r) * 30}
            stroke="#F2C94C"
            strokeWidth="4"
            strokeLinecap="round"
          />
        )
      })}
    </g>
  ),
  coeur: () => (
    <g>
      <path d="M50 76 C20 56 24 32 42 32 C50 32 50 40 50 40 C50 40 50 32 58 32 C76 32 80 56 50 76Z" fill="#E74C6C" />
    </g>
  ),
  croix: () => (
    <g>
      <line x1="32" y1="34" x2="68" y2="74" stroke="#FF4500" strokeWidth="9" strokeLinecap="round" />
      <line x1="68" y1="34" x2="32" y2="74" stroke="#FF4500" strokeWidth="9" strokeLinecap="round" />
    </g>
  ),
  etoile: () => (
    <g>
      <path d="M50 26 L58 46 L80 48 L63 62 L68 84 L50 72 L32 84 L37 62 L20 48 L42 46 Z" fill="#F2C94C" />
    </g>
  ),
  sacpharma: () => (
    <g>
      <path d="M32 40 L68 40 L72 80 L28 80 Z" fill="#F4F4F4" />
      <path d="M42 40 Q42 28 50 28 Q58 28 58 40" fill="none" stroke="#B0B0B0" strokeWidth="3" />
      <rect x="46" y="52" width="8" height="20" fill="#3DDC97" />
      <rect x="40" y="58" width="20" height="8" fill="#3DDC97" />
    </g>
  ),
  eau: () => (
    <g>
      <rect x="38" y="34" width="24" height="46" rx="6" fill="#56A8FF" opacity="0.55" />
      <rect x="44" y="24" width="12" height="12" rx="2" fill="#3D86D6" />
      <rect x="42" y="50" width="16" height="14" rx="2" fill="#fff" opacity="0.5" />
    </g>
  ),
  chips: () => (
    <g>
      <path d="M34 28 L66 28 L70 80 L30 80 Z" fill="#F2C94C" />
      <rect x="34" y="28" width="32" height="10" fill="#D9A92E" />
      <circle cx="46" cy="56" r="5" fill="#C68A4E" />
      <circle cx="56" cy="62" r="5" fill="#C68A4E" />
    </g>
  ),
  journal: () => (
    <g>
      <rect x="26" y="34" width="48" height="46" rx="2" fill="#F4F4F4" />
      <rect x="30" y="38" width="40" height="10" fill="#2A2A2A" />
      <line x1="30" y1="54" x2="48" y2="54" stroke="#B0B0B0" strokeWidth="2" />
      <line x1="30" y1="60" x2="48" y2="60" stroke="#B0B0B0" strokeWidth="2" />
      <rect x="52" y="54" width="18" height="14" fill="#B0B0B0" />
    </g>
  ),
  parcmetre: () => (
    <g>
      <rect x="40" y="48" width="20" height="32" fill="#2A3340" />
      <rect x="36" y="30" width="28" height="22" rx="4" fill="#3A4452" />
      <rect x="42" y="36" width="16" height="10" fill="#3DDC97" opacity="0.6" />
      <rect x="48" y="80" width="4" height="0" fill="#2A2A2A" />
    </g>
  ),
  feu: () => (
    <g>
      <rect x="40" y="26" width="20" height="54" rx="6" fill="#2A2A2A" />
      <circle cx="50" cy="38" r="6" fill="#FF4500" />
      <circle cx="50" cy="52" r="6" fill="#F2C94C" opacity="0.4" />
      <circle cx="50" cy="66" r="6" fill="#3DDC97" opacity="0.4" />
    </g>
  ),
  liste: () => (
    <g>
      <rect x="30" y="26" width="40" height="52" rx="3" fill="#F4F4F4" />
      <rect x="44" y="22" width="12" height="8" rx="2" fill="#B0B0B0" />
      <path d="M36 40 l3 3 l5 -6" stroke="#3DDC97" strokeWidth="2.5" fill="none" />
      <line x1="48" y1="40" x2="64" y2="40" stroke="#B0B0B0" strokeWidth="2" />
      <path d="M36 54 l3 3 l5 -6" stroke="#3DDC97" strokeWidth="2.5" fill="none" />
      <line x1="48" y1="54" x2="64" y2="54" stroke="#B0B0B0" strokeWidth="2" />
      <line x1="36" y1="66" x2="64" y2="66" stroke="#B0B0B0" strokeWidth="2" />
    </g>
  ),
  doudou: () => (
    <g>
      <circle cx="50" cy="48" r="18" fill="#C68A4E" />
      <circle cx="38" cy="34" r="7" fill="#C68A4E" />
      <circle cx="62" cy="34" r="7" fill="#C68A4E" />
      <circle cx="44" cy="46" r="3" fill="#2A2A2A" />
      <circle cx="56" cy="46" r="3" fill="#2A2A2A" />
      <ellipse cx="50" cy="56" rx="6" ry="4" fill="#EBC99A" />
      <path d="M36 66 L64 66 L60 80 L40 80 Z" fill="#D49B5E" />
    </g>
  ),
  canette: () => (
    <g>
      <rect x="38" y="28" width="24" height="50" rx="5" fill="#FF4500" />
      <rect x="38" y="28" width="24" height="8" rx="4" fill="#C0392B" />
      <rect x="38" y="70" width="24" height="8" rx="4" fill="#C0392B" />
      <path d="M46 44 L54 44 L50 56 L56 56 L44 70 L48 58 L42 58 Z" fill="#F2C94C" />
      <rect x="42" y="38" width="4" height="34" fill="#fff" opacity="0.25" />
    </g>
  ),
  cartable: () => (
    <g>
      <rect x="28" y="40" width="44" height="42" rx="8" fill="#56A8FF" />
      <rect x="28" y="52" width="44" height="20" fill="#3D86D6" />
      <rect x="40" y="56" width="20" height="14" rx="3" fill="#1E4E7A" />
      <path d="M36 40 Q36 26 50 26 Q64 26 64 40" fill="none" stroke="#3D86D6" strokeWidth="4" />
    </g>
  ),
  cloche: () => (
    <g>
      <path d="M34 66 Q34 36 50 32 Q66 36 66 66 Z" fill="#F2C94C" />
      <rect x="30" y="66" width="40" height="6" rx="3" fill="#D9A92E" />
      <circle cx="50" cy="74" r="5" fill="#D9A92E" />
      <rect x="47" y="24" width="6" height="10" rx="3" fill="#8A6A14" />
    </g>
  ),
  robot: () => (
    <g>
      <rect x="36" y="40" width="28" height="26" rx="4" fill="#B0B8C4" />
      <rect x="40" y="46" width="20" height="10" rx="2" fill="#3DDC97" />
      <rect x="42" y="66" width="16" height="14" fill="#8A93A0" />
      <rect x="28" y="48" width="8" height="18" rx="3" fill="#8A93A0" />
      <rect x="64" y="48" width="8" height="18" rx="3" fill="#8A93A0" />
      <line x1="50" y1="40" x2="50" y2="30" stroke="#8A93A0" strokeWidth="3" />
      <circle cx="50" cy="28" r="4" fill="#FF4500" />
    </g>
  ),
  sandwich: () => (
    <g>
      <path d="M26 50 Q50 38 74 50 L74 56 L26 56 Z" fill="#E0B36A" />
      <rect x="26" y="56" width="48" height="6" fill="#7AB648" />
      <rect x="26" y="60" width="48" height="6" fill="#C0392B" />
      <path d="M26 66 L74 66 L74 70 Q50 80 26 70 Z" fill="#E0B36A" />
    </g>
  ),
  enfants: () => (
    <g>
      <circle cx="38" cy="42" r="12" fill={SKIN} />
      <path d="M26 80 Q26 58 38 58 Q50 58 50 80 Z" fill="#FF6A33" />
      <circle cx="34" cy="42" r="2.5" fill="#2A2A2A" />
      <circle cx="42" cy="42" r="2.5" fill="#2A2A2A" />
      <circle cx="64" cy="46" r="11" fill={SKIN} />
      <path d="M53 80 Q53 60 64 60 Q75 60 75 80 Z" fill="#56A8FF" />
      <circle cx="60" cy="46" r="2.5" fill="#2A2A2A" />
      <circle cx="68" cy="46" r="2.5" fill="#2A2A2A" />
    </g>
  ),
  jouet: () => (
    <g>
      <rect x="28" y="48" width="44" height="34" rx="3" fill="#E74C6C" />
      <rect x="46" y="48" width="8" height="34" fill="#F2C94C" />
      <rect x="28" y="60" width="44" height="8" fill="#F2C94C" />
      <path d="M50 48 Q40 32 32 40 Q40 44 50 48 Q60 32 68 40 Q60 44 50 48Z" fill="#F2C94C" />
    </g>
  ),
}

export function Prop({ name, className }: { name: PropKey; className?: string }) {
  const Comp = PROPS[name]
  if (!Comp) return null
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={name}>
      <Comp />
    </svg>
  )
}
