import type { Chapter, GameEvent } from '../engine'
import { STREET, DISTRIBUTEUR } from './shared'

// Zone : la voiture qui lâche.
const PANNE: GameEvent[] = [
  {
    id: 'demarre_pas',
    sprite: 'papa',
    decor: 'parking',
    prop: 'cles',
    title: { fr: 'La voiture qui toussote', en: 'The sputtering car' },
    text: {
      fr: 'Tu tournes la clé. Rien. Un clic pathétique, puis le silence. Le jour de tous les jours.',
      en: 'You turn the key. Nothing. A pathetic click, then silence. Of all the days.',
    },
    choices: [
      { label: { fr: 'Insister, prier', en: 'Keep trying, pray' }, effect: { temps: -8, moral: -4 }, result: { fr: 'Au sixième essai, le moteur consent à démarrer. Miracle laborieux.', en: 'On the sixth try, the engine deigns to start. A laborious miracle.' } },
      { label: { fr: 'Abandonner la voiture', en: 'Abandon the car' }, effect: { temps: -4, energie: -5 }, result: { fr: 'Tu claques la portière et pars à pied. Tant pis pour les quatre roues.', en: 'You slam the door and set off on foot. So much for four wheels.' } },
    ],
  },
  {
    id: 'depanneur',
    sprite: 'vigile',
    decor: 'rue',
    prop: 'carte',
    title: { fr: 'Le dépanneur au téléphone', en: 'The tow truck on the phone' },
    text: {
      fr: 'Un dépanneur peut venir... dans quarante minutes. Ou tu tentes autre chose.',
      en: 'A tow truck can come... in forty minutes. Or you try something else.',
    },
    choices: [
      { label: { fr: 'Attendre la dépanneuse', en: 'Wait for the tow truck' }, effect: { temps: -15, energie: 5 }, result: { fr: 'Tu patientes, assis sur le trottoir. Rassurant mais interminable.', en: 'You wait, sitting on the curb. Reassuring but endless.' } },
      { label: { fr: 'Payer pour une intervention express', en: 'Pay for express service' }, effect: { temps: -5, argent: -14 }, result: { fr: 'Un supplément et il arrive en dix minutes. Le portefeuille pleure.', en: 'A surcharge and he arrives in ten minutes. The wallet weeps.' } },
    ],
  },
  {
    id: 'covoiturage',
    sprite: 'collegue',
    decor: 'rue',
    prop: 'velo',
    title: { fr: 'Le covoiturage improvisé', en: 'The impromptu carpool' },
    text: {
      fr: 'Un voisin part justement en ville. "Je te dépose ?" Sa conduite est... particulière.',
      en: 'A neighbor happens to be heading downtown. "Want a lift?" His driving is... unique.',
    },
    choices: [
      { label: { fr: 'Monter avec lui', en: 'Hop in with him' }, effect: { temps: 6, energie: -4, moral: -3 }, result: { fr: 'Conduite sportive et virages serrés. Rapide, mais tu as eu peur.', en: 'Aggressive driving and tight turns. Fast, but you were scared.' } },
      { label: { fr: 'Décliner poliment', en: 'Politely decline' }, effect: { temps: -6 }, result: { fr: 'Tu préfères tes deux jambes. Plus lent, plus sûr.', en: 'You prefer your own two legs. Slower, safer.' } },
    ],
  },
  {
    id: 'pneu_creve',
    sprite: 'papa',
    decor: 'rue',
    prop: 'feu',
    title: { fr: 'Le pneu à plat', en: 'The flat tire' },
    text: {
      fr: 'En plus du reste, un pneu siffle doucement. La roue de secours est sous une montagne de bazar.',
      en: 'On top of everything, a tire hisses softly. The spare is buried under a mountain of junk.',
    },
    choices: [
      { label: { fr: 'Changer la roue', en: 'Change the wheel' }, effect: { temps: -12, energie: -9, moral: 4 }, result: { fr: 'Cric, clés, jurons. Roue changée, mains noires, fierté intacte.', en: 'Jack, wrenches, curses. Wheel changed, hands black, pride intact.' } },
      { label: { fr: 'Rouler doucement quand même', en: 'Drive slowly anyway' }, effect: { temps: -3, moral: -5 }, result: { fr: 'Tu continues sur la jante du destin. Risqué, mais tu avances.', en: 'You roll on the rim of fate. Risky, but you are moving.' } },
    ],
  },
]

// Zone bijouterie + objectif.
const BIJOU: GameEvent[] = [
  {
    id: 'file_bijouterie',
    sprite: 'vendeur',
    decor: 'bijouterie',
    prop: 'alliances',
    title: { fr: 'La file feutrée', en: 'The hushed queue' },
    text: {
      fr: 'La bijouterie est chic et lente. Un couple devant toi hésite depuis vingt minutes sur une bague.',
      en: 'The jeweler is chic and slow. A couple ahead of you has been dithering over a ring for twenty minutes.',
    },
    choices: [
      { label: { fr: 'Patienter en silence', en: 'Wait in silence' }, effect: { temps: -11, moral: 2 }, result: { fr: 'Tu attends sur la moquette épaisse. Le temps s’étire comme un élastique.', en: 'You wait on the thick carpet. Time stretches like elastic.' } },
      { label: { fr: "Signaler poliment l'urgence", en: 'Politely flag the urgency' }, effect: { temps: -5, moral: -2 }, result: { fr: 'Le vendeur t’avance discrètement. Regards noirs du couple.', en: 'The clerk quietly bumps you up. Glares from the couple.' } },
    ],
  },
  {
    id: 'gravure',
    sprite: 'vendeur',
    decor: 'bijouterie',
    prop: 'alliances',
    title: { fr: 'La gravure de dernière minute', en: 'The last-minute engraving' },
    text: {
      fr: 'Le bijoutier a oublié de graver la date à l’intérieur. "Deux minutes", dit-il. On y croit.',
      en: 'The jeweler forgot to engrave the date inside. "Two minutes," he says. Sure.',
    },
    choices: [
      { label: { fr: 'Attendre la gravure', en: 'Wait for the engraving' }, effect: { temps: -9, moral: 5 }, result: { fr: 'La date apparaît, fine et nette. Ça valait le coup.', en: 'The date appears, fine and crisp. It was worth it.' } },
      { label: { fr: 'Tant pis, sans gravure', en: 'Skip it, no engraving' }, effect: { temps: -2, moral: -4 }, result: { fr: 'Tu pars sans. Personne ne regarde dedans le jour J, hein ?', en: 'You leave without it. Nobody looks inside on the big day, right?' } },
    ],
  },
  {
    id: 'ecrin',
    sprite: 'caissiere',
    decor: 'bijouterie',
    prop: 'cadeau',
    title: { fr: "Le choix de l'écrin", en: 'Choosing the case' },
    text: {
      fr: 'La vendeuse déploie quinze écrins de velours. "Lequel met le mieux en valeur les anneaux ?"',
      en: 'The clerk lays out fifteen velvet cases. "Which one shows off the rings best?"',
    },
    choices: [
      { label: { fr: 'Le premier qui vient', en: 'The first one' }, effect: { temps: -3 }, result: { fr: 'Tu pointes un écrin au hasard. Très bien, le bleu nuit.', en: 'You point at one at random. Fine, the midnight blue.' } },
      { label: { fr: 'Choisir avec soin', en: 'Choose carefully' }, effect: { temps: -8, argent: -4, moral: 4 }, result: { fr: 'Un écrin parfait, satiné. Le détail qui fait la classe.', en: 'A perfect satin case. The detail that makes it classy.' } },
    ],
  },
]

const ALLIANCES: GameEvent = {
  id: 'les_alliances',
  sprite: 'vendeur',
  decor: 'bijouterie',
  prop: 'alliances',
  title: { fr: 'Les alliances', en: 'The wedding rings' },
  text: {
    fr: 'Elles sont là, sur le coussinet : les deux anneaux que tout le mariage attend. Le bijoutier prépare la facture.',
    en: 'There they are, on the cushion: the two rings the whole wedding is waiting for. The jeweler prepares the bill.',
  },
  choices: [
    { label: { fr: 'Régler et filer', en: 'Pay and run' }, effect: { temps: -6, argent: -18, give: ['alliances'] }, result: { fr: 'Anneaux en poche, écrin fermé. Le plus dur est fait. En théorie.', en: 'Rings in pocket, case shut. The hard part is done. In theory.' } },
    { label: { fr: "Vérifier la taille d'abord", en: 'Check the size first' }, effect: { temps: -9, argent: -18, moral: 4, give: ['alliances'] }, result: { fr: 'Tu contrôles tout deux fois. Aucune mauvaise surprise à l’autel.', en: 'You double-check everything. No nasty surprise at the altar.' } },
    { label: { fr: 'Demander un rabais, sans un sou', en: 'Ask for a discount, broke' }, effect: { temps: -10, moral: -6, give: ['alliances'] }, result: { fr: 'Tu négocies à l’arrache faute de liquide. Gênant, mais tu as les anneaux.', en: 'You haggle desperately for lack of cash. Awkward, but you have the rings.' } },
  ],
}

// Zone mairie : tenir jusqu'à l'échange des consentements.
const MAIRIE: GameEvent[] = [
  {
    id: 'tapis_rouge',
    sprite: 'maire',
    decor: 'mairie',
    prop: 'coeur',
    title: { fr: 'Le parvis bondé', en: 'The crowded steps' },
    text: {
      fr: 'Tout le monde est déjà là, endimanché. Le marié, livide, te cherche du regard.',
      en: 'Everyone is already there, in their Sunday best. The groom, pale, scans the crowd for you.',
    },
    choices: [
      { label: { fr: 'Foncer vers lui', en: 'Rush to him' }, effect: { temps: -3, energie: -4, moral: 6 }, result: { fr: 'Tu brandis l’écrin de loin. Il respire enfin.', en: 'You brandish the case from afar. He finally breathes.' } },
      { label: { fr: 'Saluer la galerie', en: 'Greet the crowd' }, effect: { temps: -9, moral: 4 }, result: { fr: 'Bises, poignées de main, "tu as bonne mine". Mondanités chronophages.', en: 'Cheek kisses, handshakes, "you look well." Time-eating small talk.' } },
    ],
  },
  {
    id: 'belle_mere_mariage',
    sprite: 'mamie',
    decor: 'mairie',
    prop: 'journal',
    title: { fr: 'La tante envahissante', en: 'The overbearing aunt' },
    text: {
      fr: 'Une tante t’agrippe pour te montrer 200 photos de son chat sur son téléphone.',
      en: 'An aunt grabs you to show 200 photos of her cat on her phone.',
    },
    choices: [
      { label: { fr: 'Compatir trente secondes', en: 'Sympathize thirty seconds' }, effect: { temps: -6, moral: 2 }, result: { fr: 'Tu hoches la tête devant le matou. Évasion réussie.', en: 'You nod along at the kitty. Escape successful.' } },
      { label: { fr: 'Prétexter un devoir de témoin', en: 'Claim witness duty' }, effect: { temps: -2, moral: -2 }, result: { fr: '"On m’attend !" Tu t’éclipses, vaguement coupable.', en: '"They are waiting for me!" You slip away, vaguely guilty.' } },
    ],
  },
  {
    id: 'discours_mairie',
    sprite: 'maire',
    decor: 'mairie',
    prop: 'journal',
    title: { fr: 'Le maire bavard', en: 'The talkative mayor' },
    text: {
      fr: 'Le maire, lyrique, fait durer son préambule sur l’amour et la République. Les anneaux pèsent dans ta poche.',
      en: 'The mayor, lyrical, drags out his preamble on love and the Republic. The rings weigh in your pocket.',
    },
    choices: [
      { label: { fr: 'Écouter, ému', en: 'Listen, moved' }, effect: { temps: -10, moral: 6 }, result: { fr: 'Tu essuies une larme. C’est beau, malgré le timing.', en: 'You wipe a tear. It is beautiful, despite the timing.' } },
      { label: { fr: "Lui souffler d'accélérer", en: 'Whisper at him to speed up' }, effect: { temps: -4, moral: -3 }, result: { fr: 'Un signe discret. Il abrège, vexé mais efficace.', en: 'A discreet signal. He cuts it short, miffed but efficient.' } },
    ],
  },
  {
    id: 'photographe_mariage',
    sprite: 'papa',
    decor: 'mairie',
    prop: 'soleil',
    title: { fr: 'La photo de groupe', en: 'The group photo' },
    text: {
      fr: 'Le photographe veut "le témoin avec les anneaux" au centre. Tout le monde se replace en soupirant.',
      en: 'The photographer wants "the witness with the rings" in the center. Everyone reshuffles with a sigh.',
    },
    choices: [
      { label: { fr: 'Poser fièrement', en: 'Pose proudly' }, effect: { temps: -6, moral: 6 }, result: { fr: 'Sourire franc, écrin en main. Le cliché immortalise ton exploit.', en: 'Honest smile, case in hand. The shot immortalizes your feat.' } },
      { label: { fr: 'Bâcler la pose', en: 'Rush the pose' }, effect: { temps: -2, moral: -2 }, result: { fr: 'Tu poses vite fait, l’oeil sur la montre. Photo correcte, sans plus.', en: 'You pose quickly, eye on the clock. A decent photo, nothing more.' } },
    ],
  },
]

export const CHAPTER_6: Chapter = {
  id: 6,
  kicker: { fr: 'Chapitre 6', en: 'Chapter 6' },
  title: { fr: 'Le témoin du mariage', en: 'The best man' },
  intro: {
    fr: "Tu es le témoin, et c'est toi qui as les alliances... oubliées chez le bijoutier où on les redimensionnait. Le mariage est dans une heure, ta voiture refuse de démarrer, et la mairie est à l'autre bout de la ville. Récupère les anneaux et arrive avant le oui.",
    en: "You are the best man, and you have the rings... left at the jeweler's where they were being resized. The wedding is in an hour, your car refuses to start, and the town hall is across the city. Get the rings and arrive before the 'I do'.",
  },
  goal: { fr: 'rapporter les alliances à la mairie', en: 'bring the rings to the town hall' },
  items: [{ id: 'alliances', label: { fr: 'Les alliances', en: 'The rings' }, prop: 'alliances' }],
  zones: [
    { label: { fr: 'En route', en: 'On the way' }, steps: 4, fillers: [...STREET, DISTRIBUTEUR] },
    { label: { fr: 'La voiture en panne', en: 'The broken-down car' }, steps: 4, fillers: PANNE },
    { label: { fr: 'Chez le bijoutier', en: 'At the jeweler' }, steps: 4, fillers: BIJOU, goals: [ALLIANCES] },
    { label: { fr: 'À la mairie', en: 'At the town hall' }, steps: 4, fillers: MAIRIE },
  ],
  bonuses: [
    { key: 'skateboard', label: { fr: 'Skateboard', en: 'Skateboard' }, effect: { temps: 12, energie: -10 }, charges: 2, desc: { fr: '+12 temps, -10 énergie', en: '+12 time, -10 energy' } },
    { key: 'canette', label: { fr: 'Canette', en: 'Energy can' }, effect: { energie: 15, temps: -5 }, charges: 2, desc: { fr: '+15 énergie, -5 temps', en: '+15 energy, -5 time' } },
  ],
  start: { temps: 92, energie: 76, argent: 44, moral: 66 },
  drain: { temps: -3, energie: -2 },
  theme: {
    accent: '#F2C94C',
    winGradient: 'linear-gradient(135deg,#A8862E,#2c2410)',
    partialGradient: 'linear-gradient(135deg,#C98D2E,#2a2010)',
    loseGradient: 'linear-gradient(135deg,#7a2018,#1f0d0a)',
    heroSprite: 'papa',
    loseSprite: 'maire',
    introDecor: 'mairie',
    introSprite: 'maire',
  },
}
