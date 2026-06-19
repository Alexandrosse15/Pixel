import type { GameEvent } from '../engine'

// Obstacles universels d'une course contre la montre, réutilisables par les chapitres.
// Aucun ne donne d'objectif : ce sont des fillers. Textes bilingues fr/en.

// ── Rue, transport, social : fonctionnent dans n'importe quel chapitre. ──
export const STREET: GameEvent[] = [
  {
    id: 'voisin',
    sprite: 'voisin',
    decor: 'rue',
    prop: 'tondeuse',
    title: { fr: 'Le voisin du dessous', en: 'The downstairs neighbor' },
    text: {
      fr: "À peine sorti, le voisin t'alpague. Il a des choses à dire sur sa nouvelle tondeuse. Beaucoup de choses.",
      en: 'You barely step out and the neighbor corners you. He has things to say about his new lawnmower. Many things.',
    },
    choices: [
      { label: { fr: 'Écouter poliment', en: 'Listen politely' }, effect: { temps: -16, moral: 4 }, result: { fr: "Vingt minutes sur l'autonomie de batterie. Du temps perdu, un allié gagné.", en: 'Twenty minutes on battery life. Time lost, an ally gained.' } },
      { label: { fr: 'Couper court sèchement', en: 'Cut it short, bluntly' }, effect: { temps: -3, moral: -8 }, result: { fr: 'Tu files. Il reste planté là, vexé.', en: 'You bolt. He stands there, offended.' } },
      { label: { fr: 'Mimer un appel urgent', en: 'Fake an urgent call' }, effect: { temps: -6, energie: -2 }, result: { fr: "Tu colles le téléphone à ton oreille. Il n'est pas dupe, mais ça marche.", en: 'You slap the phone to your ear. He is not fooled, but it works.' } },
    ],
  },
  {
    id: 'chien',
    sprite: 'chien',
    decor: 'rue',
    prop: 'os',
    title: { fr: 'Le chien sans laisse', en: 'The leashless dog' },
    text: {
      fr: 'Un gros chien débonnaire te barre le trottoir. Il te fixe, la queue remuante. Son maître est introuvable.',
      en: 'A big good-natured dog blocks the sidewalk. It stares, tail wagging. Its owner is nowhere to be found.',
    },
    choices: [
      { label: { fr: 'Le contourner large', en: 'Give it a wide berth' }, effect: { temps: -4, energie: -3 }, result: { fr: 'Grand détour par la chaussée. Prudence avant tout.', en: 'A big detour onto the road. Safety first.' } },
      { label: { fr: 'Le caresser', en: 'Pet it' }, effect: { temps: -5, moral: 10, energie: -2 }, result: { fr: 'Boule de poils adorable. Trente secondes de bonheur pur.', en: 'Adorable ball of fluff. Thirty seconds of pure joy.' } },
      { label: { fr: 'Passer en vitesse', en: 'Rush past' }, effect: { temps: -1, energie: -8, moral: -4 }, result: { fr: 'Il te suit en jappant sur dix mètres. Frayeur inutile.', en: 'It chases you yapping for ten meters. A pointless scare.' } },
    ],
  },
  {
    id: 'pluie',
    sprite: 'papa',
    decor: 'rue',
    prop: 'parapluie',
    title: { fr: "L'averse soudaine", en: 'The sudden downpour' },
    text: {
      fr: 'Le ciel lâche tout sans prévenir. Tu es à découvert, sans parapluie, évidemment.',
      en: 'The sky lets loose without warning. You are out in the open, no umbrella, of course.',
    },
    choices: [
      { label: { fr: "S'abriter sous un porche", en: 'Shelter under a doorway' }, effect: { temps: -12, moral: -3 }, result: { fr: 'Tu attends que ça passe, dégoulinant à moitié. Le temps file.', en: 'You wait it out, half-soaked. Time slips away.' } },
      { label: { fr: 'Courir sous la pluie', en: 'Run through the rain' }, effect: { temps: -3, energie: -10, moral: -6 }, result: { fr: 'Trempé jusqu’aux chaussettes. Rapide, mais misérable.', en: 'Soaked down to your socks. Fast, but miserable.' } },
      { label: { fr: 'Appeler un taxi', en: 'Call a taxi' }, effect: { temps: -5, argent: -10, energie: 4 }, result: { fr: 'Cinq minutes au sec. Le portefeuille morfle, le moral tient.', en: 'Five minutes in the dry. The wallet hurts, the morale holds.' } },
    ],
  },
  {
    id: 'ex',
    sprite: 'ex',
    decor: 'rue',
    prop: 'lunettes',
    title: { fr: 'La rencontre gênante', en: 'The awkward encounter' },
    text: {
      fr: 'En plein trottoir, ton ex. Impeccable, comme toujours. Toi, en jogging, en pleine mission express.',
      en: 'Right on the sidewalk, your ex. Flawless, as always. You, in sweatpants, mid express mission.',
    },
    choices: [
      { label: { fr: 'Discuter cinq minutes', en: 'Chat for five minutes' }, effect: { temps: -10, moral: -4 }, result: { fr: 'Conversation polie et glaciale. Légère envie de disparaître.', en: 'A polite, icy conversation. A faint urge to vanish.' } },
      { label: { fr: 'Faire semblant de rien', en: 'Pretend you did not see' }, effect: { temps: -2, moral: -8 }, result: { fr: "Tu fixes ton téléphone. Elle t'a vu te cacher. C'est pire.", en: 'You stare at your phone. She saw you hide. That is worse.' } },
      { label: { fr: 'Saluer et filer', en: 'Greet and move on' }, effect: { temps: -4, moral: 8 }, result: { fr: 'Bonjour franc, sourire, et tu continues. Classe maîtrisée.', en: 'Honest hello, a smile, and you carry on. Pure class.' } },
    ],
  },
  {
    id: 'bar',
    sprite: 'barman',
    decor: 'bar',
    prop: 'biere',
    title: { fr: 'La terrasse qui appelle', en: 'The terrace calling your name' },
    text: {
      fr: 'Un bar ensoleillé, des copains qui te font signe. Une bière fraîche scintille. La mission peut-elle attendre ?',
      en: 'A sunny bar, friends waving you over. A cold beer glistens. Can the mission wait?',
    },
    choices: [
      { label: { fr: 'Juste une, vite fait', en: 'Just one, real quick' }, effect: { temps: -14, energie: 6, moral: 12 }, result: { fr: 'Une demi, deux blagues. Mais le temps, lui, ne plaisante pas.', en: 'A half-pint, two jokes. But time is not joking around.' } },
      { label: { fr: 'Résister héroïquement', en: 'Resist heroically' }, effect: { temps: -1, moral: -9, energie: -2 }, result: { fr: 'Tu déclines. Le devoir avant le houblon.', en: 'You decline. Duty before hops.' } },
      { label: { fr: 'Trinquer et repartir', en: 'Toast and leave' }, effect: { temps: -6, moral: 6 }, result: { fr: 'Un verre d’eau, une accolade, et tu repars. Le bon compromis.', en: 'A glass of water, a hug, and off you go. The right compromise.' } },
    ],
  },
  {
    id: 'sdf',
    sprite: 'sdf',
    decor: 'rue',
    prop: 'piece',
    title: { fr: 'La pièce demandée', en: 'The spare coin' },
    text: {
      fr: 'Un homme assis sur le trottoir te demande une pièce, le sourire fatigué.',
      en: 'A man sitting on the sidewalk asks you for a coin, a tired smile on his face.',
    },
    choices: [
      { label: { fr: 'Donner une pièce', en: 'Give a coin' }, effect: { temps: -2, argent: -2, moral: 9 }, result: { fr: 'Un merci sincère. Ça ne coûte rien et ça réchauffe.', en: 'A heartfelt thanks. Costs nothing, warms a lot.' } },
      { label: { fr: 'Sourire et passer', en: 'Smile and move on' }, effect: { temps: -1 }, result: { fr: 'Tu salues d’un signe et continues.', en: 'You nod and keep going.' } },
    ],
  },
  {
    id: 'raccourci',
    sprite: 'papa',
    decor: 'parc',
    prop: 'horloge',
    title: { fr: 'Le raccourci par le parc', en: 'The shortcut through the park' },
    text: {
      fr: 'Un sentier coupe par le parc. Plus court, mais boueux après la dernière pluie.',
      en: 'A path cuts through the park. Shorter, but muddy after the last rain.',
    },
    choices: [
      { label: { fr: 'Prendre le raccourci', en: 'Take the shortcut' }, effect: { temps: 8, energie: -6, moral: -3 }, result: { fr: 'Tu gagnes du temps mais finis crotté jusqu’aux genoux.', en: 'You save time but end up muddy to the knees.' } },
      { label: { fr: 'Rester sur le trottoir', en: 'Stick to the sidewalk' }, effect: { temps: -6, energie: 2 }, result: { fr: 'Itinéraire propre et sûr, un peu plus long.', en: 'A clean, safe route, a little longer.' } },
    ],
  },
  {
    id: 'panne_velo',
    sprite: 'papa',
    decor: 'rue',
    prop: 'velo',
    title: { fr: 'Le vélo en libre service', en: 'The bike share' },
    text: {
      fr: 'Une borne de vélos partagés. Tu pourrais gagner un temps fou, si l’appli daigne fonctionner.',
      en: 'A bike-share dock. You could save loads of time, if the app deigns to work.',
    },
    choices: [
      { label: { fr: 'Pédaler comme un fou', en: 'Pedal like mad' }, effect: { temps: 12, energie: -9, argent: -3 }, result: { fr: 'Cheveux au vent, jambes en feu. Gain de temps spectaculaire.', en: 'Wind in your hair, legs on fire. A spectacular time gain.' } },
      { label: { fr: 'Renoncer, l’appli bug', en: 'Give up, app is buggy' }, effect: { temps: -4, moral: -3 }, result: { fr: 'Trois QR codes, zéro vélo. Tu repars à pied, agacé.', en: 'Three QR codes, zero bikes. You walk off, annoyed.' } },
    ],
  },
  {
    id: 'gouter',
    sprite: 'papa',
    decor: 'boulangerie',
    prop: 'painchoco',
    title: { fr: 'Le creux de 11h', en: 'The 11am hunger pang' },
    text: {
      fr: 'Ton ventre gargouille. Une boulangerie ouverte embaume tout le trottoir.',
      en: 'Your stomach growls. An open bakery scents the whole sidewalk.',
    },
    choices: [
      { label: { fr: 'Un pain au chocolat', en: 'A chocolate croissant' }, effect: { temps: -5, argent: -2, energie: 9, moral: 5 }, result: { fr: 'Réconfort instantané. Tu repars rechargé.', en: 'Instant comfort. You set off recharged.' } },
      { label: { fr: 'Serrer les dents', en: 'Grit your teeth' }, effect: { temps: -1, energie: -5, moral: -3 }, result: { fr: 'Tu résistes. L’estomac proteste.', en: 'You resist. Your stomach protests.' } },
    ],
  },
  {
    id: 'arret_bus',
    sprite: 'mamie',
    decor: 'arret_bus',
    prop: 'horloge',
    title: { fr: "L'arrêt de bus", en: 'The bus stop' },
    text: {
      fr: 'Un bus pourrait te rapprocher. L’horaire, lui, reste un mystère insondable.',
      en: 'A bus could get you closer. The timetable, however, remains an unfathomable mystery.',
    },
    choices: [
      { label: { fr: 'Attendre le bus', en: 'Wait for the bus' }, effect: { temps: -10, energie: 6 }, result: { fr: 'Il finit par arriver. Assis, au repos, mais le temps a coulé.', en: 'It eventually shows up. Seated, rested, but time has drained away.' } },
      { label: { fr: 'Continuer à pied', en: 'Keep walking' }, effect: { temps: -5, energie: -5 }, result: { fr: 'Tu ne fais pas confiance aux bus. Tu marches.', en: 'You do not trust buses. You walk.' } },
    ],
  },
  {
    id: 'cycliste',
    sprite: 'cycliste',
    decor: 'rue',
    prop: 'feu',
    title: { fr: 'Le cycliste pressé', en: 'The hurried cyclist' },
    text: {
      fr: 'Un livreur à vélo grille le feu et te frôle au passage piéton. Frayeur et sonnette agressive.',
      en: 'A delivery cyclist runs the light and grazes you at the crossing. A scare and an aggressive bell.',
    },
    choices: [
      { label: { fr: 'Respirer un grand coup', en: 'Take a deep breath' }, effect: { temps: -2, moral: 3 }, result: { fr: 'Tu laisses passer l’adrénaline. Pas de quoi gâcher ta journée.', en: 'You let the adrenaline pass. Not worth ruining your day.' } },
      { label: { fr: 'Crier ton mécontentement', en: 'Shout your displeasure' }, effect: { temps: -3, energie: -4, moral: -3 }, result: { fr: 'Il est déjà loin. Tu cries dans le vide.', en: 'He is already gone. You shout into the void.' } },
    ],
  },
  {
    id: 'cafe_pause',
    sprite: 'barman',
    decor: 'boulangerie',
    prop: 'cafe',
    title: { fr: 'Le comptoir du coin', en: 'The corner counter' },
    text: {
      fr: 'Un petit café de quartier. Un expresso te remettrait peut-être d’aplomb.',
      en: 'A little neighborhood cafe. An espresso might just set you straight.',
    },
    choices: [
      { label: { fr: 'Expresso au comptoir', en: 'Espresso at the counter' }, effect: { temps: -6, argent: -2, energie: 11 }, result: { fr: 'Serré, brûlant, parfait. Coup de fouet immédiat.', en: 'Short, scalding, perfect. An instant jolt.' } },
      { label: { fr: 'Passer ton chemin', en: 'Walk on by' }, effect: { temps: -1, energie: -3 }, result: { fr: 'Pas le temps. Tu continues, un peu raplapla.', en: 'No time. You carry on, a bit sluggish.' } },
    ],
  },
  {
    id: 'belle_mere',
    sprite: 'mamie',
    decor: 'rue',
    prop: 'telephone',
    title: { fr: "L'appel de la belle-mère", en: "The mother-in-law's call" },
    text: {
      fr: "Numéro masqué. C'est ta belle-mère. Elle a appris pour la mission et veut absolument te conseiller.",
      en: 'Withheld number. It is your mother-in-law. She heard about the mission and absolutely must advise you.',
    },
    choices: [
      { label: { fr: 'Acquiescer poliment', en: 'Nod along politely' }, effect: { temps: -9, moral: -3 }, result: { fr: 'Tu dis oui à tout pendant cinq minutes. Paix sociale préservée.', en: 'You say yes to everything for five minutes. Social peace preserved.' } },
      { label: { fr: 'Écourter fermement', en: 'Cut it firmly short' }, effect: { temps: -3, moral: -6 }, result: { fr: '"Je gère, merci." Silence pincé. Tu paieras ça au prochain repas.', en: '"I have got this, thanks." Tight silence. You will pay for it at the next dinner.' } },
    ],
  },
  {
    id: 'flaque',
    sprite: 'cycliste',
    decor: 'rue',
    prop: 'nuage',
    title: { fr: "L'arroseur arrosé", en: 'Splashed by fate' },
    text: {
      fr: 'Une voiture file dans une flaque énorme juste à côté de toi. Le mur d’eau arrive au ralenti.',
      en: 'A car races through a huge puddle right beside you. The wall of water arrives in slow motion.',
    },
    choices: [
      { label: { fr: 'Bondir en arrière', en: 'Leap backward' }, effect: { temps: -4, energie: -6 }, result: { fr: 'Réflexe de félin. Pantalon sauvé, effort brusque.', en: 'Cat-like reflex. Trousers saved, sudden effort.' } },
      { label: { fr: 'Encaisser, fataliste', en: 'Take it, fatalistic' }, effect: { temps: -1, moral: -8 }, result: { fr: 'Douche froide intégrale. Le destin se moque de toi.', en: 'A full cold shower. Fate is mocking you.' } },
    ],
  },
  {
    id: 'sondage',
    sprite: 'collegue',
    decor: 'allee',
    prop: 'liste',
    title: { fr: 'Le sondeur de rue', en: 'The street pollster' },
    text: {
      fr: 'Un jeune homme avec une tablette te bloque : "Deux minutes pour un questionnaire ?"',
      en: 'A young man with a tablet blocks your path: "Two minutes for a survey?"',
    },
    choices: [
      { label: { fr: 'Répondre vite fait', en: 'Answer quickly' }, effect: { temps: -8, moral: 2 }, result: { fr: 'Quinze questions. Tu mens à toutes, ça va plus vite.', en: 'Fifteen questions. You lie on all of them, it goes faster.' } },
      { label: { fr: 'Esquiver poliment', en: 'Dodge politely' }, effect: { temps: -2 }, result: { fr: '"Désolé, urgence." Argument imparable.', en: '"Sorry, emergency." An unbeatable excuse.' } },
    ],
  },
  {
    id: 'chat_perdu',
    sprite: 'papa',
    decor: 'ruelle',
    prop: 'coeur',
    title: { fr: 'Le chat de la ruelle', en: 'The alley cat' },
    text: {
      fr: 'Un chat tigré te suit en miaulant. Il a l’air de te connaître. Toi, pas du tout.',
      en: 'A tabby cat follows you, meowing. It seems to know you. You, not at all.',
    },
    choices: [
      { label: { fr: 'Le caresser un instant', en: 'Pet it a moment' }, effect: { temps: -5, moral: 11 }, result: { fr: 'Ronronnement immédiat. Parenthèse de douceur.', en: 'Instant purring. A little pocket of softness.' } },
      { label: { fr: 'Continuer, indifférent', en: 'Walk on, indifferent' }, effect: { temps: -1, energie: 2 }, result: { fr: 'Le chat te juge, puis se désintéresse de toi.', en: 'The cat judges you, then loses interest.' } },
    ],
  },
  {
    id: 'travaux',
    sprite: 'vigile',
    decor: 'rue',
    prop: 'feu',
    title: { fr: 'Le trottoir éventré', en: 'The torn-up sidewalk' },
    text: {
      fr: 'Des travaux barrent tout le trottoir. Un ouvrier te fait signe de contourner par on ne sait où.',
      en: 'Roadworks block the whole sidewalk. A worker waves you around to who-knows-where.',
    },
    choices: [
      { label: { fr: 'Contourner sagement', en: 'Detour sensibly' }, effect: { temps: -8, energie: -2 }, result: { fr: 'Détour balisé par des plots oranges. Plus long, mais sûr.', en: 'A detour marked by orange cones. Longer, but safe.' } },
      { label: { fr: 'Slalomer entre les engins', en: 'Slalom between the machines' }, effect: { temps: -3, moral: -2 }, result: { fr: 'Tu te faufiles sous le regard noir du chef de chantier.', en: 'You slip through under the glare of the site foreman.' } },
    ],
  },
  {
    id: 'livreur_colis',
    sprite: 'collegue',
    decor: 'rue',
    prop: 'sac',
    title: { fr: 'Le diable du livreur', en: "The courier's hand truck" },
    text: {
      fr: 'Un livreur empile dix cartons sur un diable en travers du passage, sans se presser le moins du monde.',
      en: 'A courier stacks ten boxes on a hand truck across the path, in no hurry whatsoever.',
    },
    choices: [
      { label: { fr: 'Attendre poliment', en: 'Wait politely' }, effect: { temps: -3 }, result: { fr: 'Tu patientes le temps qu’il dégage. Civisme récompensé par de la lenteur.', en: 'You wait for him to clear off. Civility rewarded with slowness.' } },
      { label: { fr: 'L’aider à décharger', en: 'Help him unload' }, effect: { temps: -9, energie: -4, moral: 7 }, result: { fr: 'Un coup de main et la voie se libère. Bonne action, mauvais timing.', en: 'A helping hand and the way clears. Good deed, bad timing.' } },
    ],
  },
  {
    id: 'vieux_copain',
    sprite: 'voisin',
    decor: 'rue',
    prop: 'coeur',
    title: { fr: "Le copain d'enfance", en: 'The childhood friend' },
    text: {
      fr: 'Un visage du passé surgit : "Non mais je rêve, c’est toi ?!" Vingt ans qu’on ne s’est pas vus.',
      en: 'A face from the past pops up: "No way, is that you?!" Twenty years since you last met.',
    },
    choices: [
      { label: { fr: 'Un vrai moment, vite fait', en: 'A real moment, quickly' }, effect: { temps: -11, moral: 9 }, result: { fr: 'Souvenirs, éclats de rire, numéros échangés. Chaleureux mais coûteux.', en: 'Memories, laughter, numbers swapped. Warm but costly.' } },
      { label: { fr: 'Promettre de se rappeler', en: 'Promise to call' }, effect: { temps: -3, moral: -2 }, result: { fr: '"Je t’appelle, on se fait ça !" Tu files, vaguement nostalgique.', en: '"I will call you, we will do this!" You scoot off, vaguely nostalgic.' } },
    ],
  },
  {
    id: 'gravillon',
    sprite: 'papa',
    decor: 'rue',
    title: { fr: 'Le caillou dans la chaussure', en: 'The pebble in your shoe' },
    text: {
      fr: 'Un gravillon traître s’est invité sous ton pied et te martyrise à chaque pas.',
      en: 'A treacherous pebble has slipped under your foot and tortures you with every step.',
    },
    choices: [
      { label: { fr: 'S’arrêter pour l’enlever', en: 'Stop to remove it' }, effect: { temps: -4, energie: 3 }, result: { fr: 'Trente secondes assis, problème réglé. Soulagement immédiat.', en: 'Thirty seconds seated, problem solved. Instant relief.' } },
      { label: { fr: 'Serrer les dents et avancer', en: 'Grit your teeth and push on' }, effect: { temps: -1, energie: -5, moral: -3 }, result: { fr: 'Tu boites stoïquement. Le caillou gagne du terrain dans ton moral.', en: 'You limp stoically. The pebble gains ground on your morale.' } },
    ],
  },
  {
    id: 'manif',
    sprite: 'ado',
    decor: 'rue',
    prop: 'journal',
    title: { fr: 'Le cortège imprévu', en: 'The unexpected march' },
    text: {
      fr: 'Une manifestation bon enfant remonte l’avenue avec banderoles et tambours, et coupe ta route.',
      en: 'A good-humored protest marches up the avenue with banners and drums, cutting off your route.',
    },
    choices: [
      { label: { fr: 'Attendre qu’il passe', en: 'Wait for it to pass' }, effect: { temps: -7, moral: 2 }, result: { fr: 'Tu patientes au son des slogans. Sympathique, mais immobile.', en: 'You wait to the sound of chants. Pleasant, but motionless.' } },
      { label: { fr: 'Remonter à contre-courant', en: 'Push against the flow' }, effect: { temps: -3, energie: -3 }, result: { fr: 'Tu fends la foule à l’envers, bousculé mais en mouvement.', en: 'You cut through the crowd the wrong way, jostled but moving.' } },
    ],
  },
  {
    id: 'vendeur_rue',
    sprite: 'barman',
    decor: 'rue',
    prop: 'journal',
    title: { fr: 'Le vendeur à la sauvette', en: 'The street hawker' },
    text: {
      fr: 'Un vendeur déploie sa nappe de gadgets pile devant toi et entame son boniment irrésistible.',
      en: 'A hawker spreads his sheet of gadgets right in front of you and launches his irresistible pitch.',
    },
    choices: [
      { label: { fr: 'Décliner et contourner', en: 'Decline and step around' }, effect: { temps: -3 }, result: { fr: '"Non merci, vraiment." Tu l’esquives sans ralentir.', en: '"No thanks, really." You dodge him without slowing.' } },
      { label: { fr: 'Craquer pour un truc inutile', en: 'Cave for some useless thing' }, effect: { temps: -6, argent: -5, moral: 4 }, result: { fr: 'Te voilà avec un porte-clés lumineux dont tu n’avais aucun besoin.', en: 'Now you own a glowing keychain you had zero need for.' } },
    ],
  },
]

// ── Spécifique magasins. ──
export const STORE: GameEvent[] = [
  {
    id: 'monnaie',
    sprite: 'caissier',
    decor: 'caisse',
    prop: 'carte',
    title: { fr: 'Le terminal en rade', en: 'The dead card reader' },
    text: {
      fr: 'À la caisse, le lecteur de carte refuse ton paiement : "Réseau indisponible, espèces uniquement."',
      en: 'At the till, the card reader refuses your payment: "Network down, cash only."',
    },
    choices: [
      { label: { fr: 'Payer en liquide', en: 'Pay in cash' }, effect: { temps: -4, moral: -2 }, result: { fr: 'Tu comptes tes pièces centime par centime. La file soupire derrière toi.', en: 'You count your coins one by one. The line sighs behind you.' } },
      { label: { fr: 'Réessayer la carte trois fois', en: 'Retry the card three times' }, effect: { temps: -9, moral: -4 }, result: { fr: 'Refus, refus, refus. Au quatrième essai, ça passe. Sueurs froides.', en: 'Declined, declined, declined. On the fourth try, it goes through. Cold sweats.' } },
    ],
  },
  {
    id: 'prix_errone',
    sprite: 'caissier',
    decor: 'caisse',
    prop: 'ticket',
    title: { fr: 'Le prix qui ne colle pas', en: 'The price that does not match' },
    text: {
      fr: 'En caisse, l’article sonne deux euros de plus que l’étiquette du rayon. Le caissier hausse les épaules.',
      en: 'At checkout, the item rings up two euros more than the shelf label. The cashier shrugs.',
    },
    choices: [
      { label: { fr: 'Réclamer le bon prix', en: 'Demand the right price' }, effect: { temps: -9, argent: 2, moral: 3 }, result: { fr: 'Vérification au rayon, prix corrigé. Tu avais raison, et tu économises.', en: 'A shelf check, the price is fixed. You were right, and you save.' } },
      { label: { fr: 'Laisser couler', en: 'Let it slide' }, effect: { temps: -2, argent: -2 }, result: { fr: 'Pas le temps de chipoter pour deux euros. Tu paies et tu files.', en: 'No time to quibble over two euros. You pay and bolt.' } },
    ],
  },
  {
    id: 'rayon_deplace',
    sprite: 'vigile',
    decor: 'supermarche',
    prop: 'panier',
    title: { fr: 'Le magasin réagencé', en: 'The rearranged store' },
    text: {
      fr: 'Tout a été déplacé depuis la dernière fois. Ce que tu cherches a migré dans une allée inconnue.',
      en: 'Everything has been moved since last time. What you need has migrated to some unknown aisle.',
    },
    choices: [
      { label: { fr: 'Demander à un employé', en: 'Ask a staff member' }, effect: { temps: -4, moral: 2 }, result: { fr: 'Il te pointe la bonne allée du doigt. Gain de temps net.', en: 'He points you to the right aisle. A clear time gain.' } },
      { label: { fr: 'Chercher seul, têtu', en: 'Search alone, stubborn' }, effect: { temps: -11, energie: -4, moral: -3 }, result: { fr: 'Tu écumes six allées avant de tomber dessus. Fierté coûteuse.', en: 'You comb six aisles before stumbling on it. Costly pride.' } },
    ],
  },
  {
    id: 'caisse_queue',
    sprite: 'mamie',
    decor: 'caisse',
    prop: 'ticket',
    title: { fr: 'La file de la caisse', en: 'The checkout line' },
    text: {
      fr: 'Une seule caisse ouverte. Devant toi, une dame règle en pièces de un centime.',
      en: 'Only one till open. Ahead of you, a lady pays in one-cent coins.',
    },
    choices: [
      { label: { fr: 'Patienter en zen', en: 'Wait, zen' }, effect: { temps: -15, moral: 3 }, result: { fr: 'Tu respires. Étrangement apaisant.', en: 'You breathe. Strangely soothing.' } },
      { label: { fr: 'Caisse automatique', en: 'Self-checkout' }, effect: { temps: -9, energie: -5, moral: -6 }, result: { fr: 'Article non reconnu. Veuillez attendre un agent. Classique.', en: 'Unexpected item. Please wait for an attendant. Classic.' } },
      { label: { fr: 'Lâcher la file', en: 'Abandon the line' }, effect: { temps: -2, moral: -7 }, result: { fr: 'Tu abandonnes la queue, frustré.', en: 'You quit the queue, frustrated.' } },
    ],
  },
  {
    id: 'vigile',
    sprite: 'vigile',
    decor: 'supermarche',
    prop: 'etoile',
    title: { fr: 'Le vigile soupçonneux', en: 'The suspicious guard' },
    text: {
      fr: 'Tu tournes les mains vides depuis dix minutes. Le vigile te suit du regard.',
      en: 'You have been wandering empty-handed for ten minutes. The guard tracks you with his eyes.',
    },
    choices: [
      { label: { fr: 'Lui expliquer', en: 'Explain yourself' }, effect: { temps: -6, moral: 4 }, result: { fr: 'Il comprend, te pointe même le bon rayon. Solidarité.', en: 'He gets it, even points you to the right aisle. Solidarity.' } },
      { label: { fr: 'L’ignorer', en: 'Ignore him' }, effect: { temps: -3, moral: -5, energie: -2 }, result: { fr: 'Tu joues l’indifférent sous l’oeil méfiant.', en: 'You play it cool under his wary eye.' } },
    ],
  },
  {
    id: 'caddie',
    sprite: 'papa',
    decor: 'parking',
    prop: 'caddie',
    title: { fr: 'Le caddie à pièce', en: 'The coin-locked cart' },
    text: {
      fr: 'Les caddies sont enchaînés. Il faut une pièce de un euro. Tu fouilles tes poches.',
      en: 'The carts are chained up. You need a one-euro coin. You dig through your pockets.',
    },
    choices: [
      { label: { fr: 'Café pour la monnaie', en: 'Coffee for change' }, effect: { temps: -7, argent: -2, energie: 5 }, result: { fr: 'Un café pour faire l’appoint. Caddie débloqué, et toi aussi.', en: 'A coffee to break a note. Cart unlocked, and so are you.' } },
      { label: { fr: 'Panier à la main', en: 'Carry a basket' }, effect: { temps: -2, energie: -7 }, result: { fr: 'Pas de caddie, tu portes tout à bras. Le dos s’en souviendra.', en: 'No cart, you carry it all by hand. Your back will remember.' } },
    ],
  },
  {
    id: 'promo',
    sprite: 'caissiere',
    decor: 'allee',
    prop: 'promo',
    title: { fr: 'La tête de gondole', en: 'The end-cap display' },
    text: {
      fr: 'Une promo agressive sur des trucs inutiles. Mais -50%, quand même.',
      en: 'An aggressive sale on useless stuff. But 50% off, still.',
    },
    choices: [
      { label: { fr: 'Résister', en: 'Resist' }, effect: { temps: -2, moral: 5 }, result: { fr: 'Tu passes ton chemin, fier de ta discipline.', en: 'You walk on by, proud of your discipline.' } },
      { label: { fr: 'Craquer un peu', en: 'Cave a little' }, effect: { temps: -7, argent: -8, moral: 6 }, result: { fr: 'Un gadget inutile, une petite joie coupable.', en: 'A useless gadget, a small guilty joy.' } },
    ],
  },
  {
    id: 'degustation',
    sprite: 'caissiere',
    decor: 'supermarche',
    prop: 'chips',
    title: { fr: 'Le stand dégustation', en: 'The tasting stand' },
    text: {
      fr: 'Une hôtesse propose des cubes de fromage gratuits sur des piques. Ton estomac répond avant toi.',
      en: 'A host offers free cheese cubes on toothpicks. Your stomach answers before you do.',
    },
    choices: [
      { label: { fr: 'Goûter discrètement', en: 'Taste discreetly' }, effect: { temps: -4, energie: 7, moral: 4 }, result: { fr: 'Trois cubes, mine de rien. Énergie regonflée.', en: 'Three cubes, all casual. Energy topped up.' } },
      { label: { fr: 'Décliner dignement', en: 'Decline with dignity' }, effect: { temps: -1, moral: 2 }, result: { fr: 'Tu remercies et passes, le ventre vide mais la tête haute.', en: 'You thank them and move on, empty stomach but head high.' } },
    ],
  },
  {
    id: 'enfant_perdu',
    sprite: 'enfant',
    decor: 'allee',
    prop: 'doudou',
    title: { fr: "L'enfant perdu", en: 'The lost child' },
    text: {
      fr: 'Un petit pleure au milieu de l’allée, il a perdu ses parents. Personne ne s’arrête.',
      en: 'A little one cries in the middle of the aisle, having lost their parents. Nobody stops.',
    },
    choices: [
      { label: { fr: 'L’aider à retrouver sa mère', en: 'Help find their mother' }, effect: { temps: -12, moral: 14 }, result: { fr: 'Annonce au micro, retrouvailles. Du temps perdu, de l’humanité gagnée.', en: 'A tannoy announcement, a reunion. Time lost, humanity gained.' } },
      { label: { fr: 'Prévenir un employé', en: 'Alert a staff member' }, effect: { temps: -4, moral: 2 }, result: { fr: 'Tu signales l’enfant et poursuis, la conscience tranquille.', en: 'You report the child and move on, conscience clear.' } },
    ],
  },
]

// ── Transports en commun. ──
export const TRANSPORT: GameEvent[] = [
  {
    id: 'metro_panne',
    sprite: 'mamie',
    decor: 'arret_bus',
    prop: 'horloge',
    title: { fr: 'Le métro à quai', en: 'The stalled metro' },
    text: {
      fr: 'Annonce grésillante : "Trafic interrompu sur la ligne." La foule hésite sur le quai.',
      en: 'A crackling announcement: "Service suspended on this line." The crowd hesitates on the platform.',
    },
    choices: [
      { label: { fr: 'Attendre la reprise', en: 'Wait for service to resume' }, effect: { temps: -12, energie: 5 }, result: { fr: 'Le trafic reprend, mais tu as perdu un temps fou.', en: 'Service comes back, but you have lost a ton of time.' } },
      { label: { fr: 'Remonter et courir', en: 'Head up and run' }, effect: { temps: -6, energie: -9 }, result: { fr: 'Tu remontes à la surface au pas de course. Les mollets chauffent.', en: 'You hustle back to the surface. Your calves are burning.' } },
    ],
  },
  {
    id: 'bus_bonde',
    sprite: 'collegue',
    decor: 'arret_bus',
    prop: 'sac',
    title: { fr: 'Le bus bondé', en: 'The packed bus' },
    text: {
      fr: 'Le bus arrive plein à craquer. Le chauffeur hésite à ouvrir les portes.',
      en: 'The bus pulls in packed to bursting. The driver hesitates to open the doors.',
    },
    choices: [
      { label: { fr: 'Te tasser à l’intérieur', en: 'Squeeze inside' }, effect: { temps: -5, energie: -7, moral: -3 }, result: { fr: 'Sardine humaine, coude dans les côtes. Mais tu avances.', en: 'Human sardine, elbow in the ribs. But you are moving.' } },
      { label: { fr: 'Attendre le suivant', en: 'Wait for the next one' }, effect: { temps: -11, energie: 3 }, result: { fr: 'Tu laisses passer. Le prochain est dans dix longues minutes.', en: 'You let it go. The next is in ten long minutes.' } },
    ],
  },
  {
    id: 'controleur',
    sprite: 'vigile',
    decor: 'arret_bus',
    prop: 'ticket',
    title: { fr: 'Le contrôle surprise', en: 'The surprise inspection' },
    text: {
      fr: 'Contrôleurs à la sortie. Tu fouilles tes poches à la recherche de ton titre de transport.',
      en: 'Inspectors at the exit. You rummage your pockets for your ticket.',
    },
    choices: [
      { label: { fr: 'Montrer ton ticket', en: 'Show your ticket' }, effect: { temps: -5 }, result: { fr: 'Tout est en règle. Tu passes, soulagé.', en: 'All in order. You pass, relieved.' } },
      { label: { fr: 'Le chercher partout', en: 'Search everywhere for it' }, effect: { temps: -9, moral: -5 }, result: { fr: 'Tu le retrouves froissé au fond. Sueurs froides pour rien.', en: 'You find it crumpled at the bottom. Cold sweats for nothing.' } },
    ],
  },
  {
    id: 'correspondance',
    sprite: 'papa',
    decor: 'arret_bus',
    prop: 'horloge',
    title: { fr: 'La correspondance ratée', en: 'The missed connection' },
    text: {
      fr: 'Tu sprintes dans le couloir pour ta correspondance. Les portes commencent à sonner.',
      en: 'You sprint down the corridor for your connection. The doors start to beep.',
    },
    choices: [
      { label: { fr: 'Sauter dans la rame', en: 'Leap into the train' }, effect: { temps: 6, energie: -8 }, result: { fr: 'Tu te glisses entre les portes au dernier centième. Gagné !', en: 'You slide between the doors at the last instant. Made it!' } },
      { label: { fr: 'Laisser passer, prudent', en: 'Let it go, cautious' }, effect: { temps: -8, energie: 2 }, result: { fr: 'Trop risqué. Tu attends la suivante, frustré.', en: 'Too risky. You wait for the next one, frustrated.' } },
    ],
  },
  {
    id: 'musicien_metro',
    sprite: 'barman',
    decor: 'arret_bus',
    prop: 'piece',
    title: { fr: 'Le musicien du wagon', en: 'The carriage musician' },
    text: {
      fr: 'Un accordéoniste s’installe et entame le même air que d’habitude, juste devant toi.',
      en: 'An accordionist sets up and strikes up the usual tune, right in front of you.',
    },
    choices: [
      { label: { fr: 'Donner une pièce', en: 'Drop a coin' }, effect: { temps: -2, argent: -1, moral: 6 }, result: { fr: 'Un sourire d’artiste. Le voyage est moins gris.', en: "An artist's smile. The ride is a little less grey." } },
      { label: { fr: 'Fixer le vide', en: 'Stare into space' }, effect: { temps: -2, moral: -3 }, result: { fr: 'Tu fais celui qui n’entend rien. L’air te trotte dans la tête tout le trajet.', en: 'You pretend not to hear. The tune is stuck in your head the whole way.' } },
    ],
  },
  {
    id: 'greve',
    sprite: 'collegue',
    decor: 'arret_bus',
    prop: 'journal',
    title: { fr: 'Le préavis de grève', en: 'The strike notice' },
    text: {
      fr: 'Un panneau annonce un service réduit. Un seul train sur trois, et tous bondés.',
      en: 'A sign announces reduced service. One train in three, and all packed.',
    },
    choices: [
      { label: { fr: 'Tenter le coup quand même', en: 'Try it anyway' }, effect: { temps: -7, energie: -5 }, result: { fr: 'Tu finis par en attraper un. Compressé, mais en mouvement.', en: 'You eventually catch one. Squished, but moving.' } },
      { label: { fr: 'Commander un VTC', en: 'Order a rideshare' }, effect: { temps: -4, argent: -12 }, result: { fr: 'Une voiture en cinq minutes. Le portefeuille trinque, le temps est sauvé.', en: 'A car in five minutes. The wallet suffers, the time is saved.' } },
    ],
  },
  {
    id: 'portillon',
    sprite: 'papa',
    decor: 'arret_bus',
    prop: 'ticket',
    title: { fr: 'Le portillon bloqué', en: 'The jammed gate' },
    text: {
      fr: 'Ton titre de transport est refusé par le portillon, qui se referme net sur ton sac.',
      en: 'The gate rejects your ticket and snaps shut right on your bag.',
    },
    choices: [
      { label: { fr: 'Repasser ton ticket', en: 'Tap your ticket again' }, effect: { temps: -5 }, result: { fr: 'Au deuxième passage, le portillon consent à s’ouvrir.', en: 'On the second tap, the gate consents to open.' } },
      { label: { fr: 'Appeler un agent', en: 'Call an attendant' }, effect: { temps: -9, moral: 2 }, result: { fr: 'Un agent débloque le tout et t’ouvre un accès. Lent mais sûr.', en: 'An attendant unjams it and opens a way through. Slow but sure.' } },
    ],
  },
  {
    id: 'vtc_annule',
    sprite: 'vigile',
    decor: 'arret_bus',
    prop: 'carte',
    title: { fr: 'Le VTC qui annule', en: 'The cancelled ride' },
    text: {
      fr: 'Ton chauffeur annule à la dernière seconde. L’appli en propose un autre... à quelques rues de là.',
      en: 'Your driver cancels at the last second. The app offers another... a few streets away.',
    },
    choices: [
      { label: { fr: 'Marcher à sa rencontre', en: 'Walk to meet it' }, effect: { temps: -6, energie: -4 }, result: { fr: 'Tu coupes au plus court vers le nouveau point de prise en charge.', en: 'You cut the shortest path to the new pickup point.' } },
      { label: { fr: 'Recommander, plus cher', en: 'Rebook, pricier' }, effect: { temps: -3, argent: -8 }, result: { fr: 'Tu paies le tarif de pointe pour une voiture immédiate.', en: 'You pay surge pricing for an immediate car.' } },
    ],
  },
  {
    id: 'escalator_metro',
    sprite: 'mamie',
    decor: 'arret_bus',
    prop: 'horloge',
    title: { fr: "L'escalator hors service", en: 'The broken escalator' },
    text: {
      fr: 'L’escalator de la station est figé, transformé en raides escaliers, et la foule s’y agglutine.',
      en: 'The station escalator is frozen, turned into steep stairs, and the crowd piles up on it.',
    },
    choices: [
      { label: { fr: 'Grimper à pied', en: 'Climb on foot' }, effect: { temps: -4, energie: -3 }, result: { fr: 'Tu montes deux à deux, essoufflé mais rapide.', en: 'You take them two at a time, winded but fast.' } },
      { label: { fr: 'Chercher l’ascenseur', en: 'Find the elevator' }, effect: { temps: -9, energie: -1 }, result: { fr: 'Tu fais le tour pour l’ascenseur. Reposant, mais à l’autre bout.', en: 'You go around for the elevator. Restful, but at the far end.' } },
    ],
  },
]

// Source d'argent : garantie dans la première zone par le moteur.
export const DISTRIBUTEUR: GameEvent = {
  id: 'distributeur',
  sprite: 'papa',
  decor: 'atm',
  prop: 'carte',
  money: true,
  title: { fr: 'Le distributeur', en: 'The cash machine' },
  text: {
    fr: 'Un distributeur clignote au coin de la rue. La mission va coûter : autant prévoir.',
    en: 'An ATM blinks at the street corner. The mission will cost money: best to plan ahead.',
  },
  choices: [
    { label: { fr: 'Retirer du liquide', en: 'Withdraw cash' }, effect: { temps: -6, argent: 30 }, result: { fr: 'Trente euros en poche. La mission redevient confortable.', en: 'Thirty euros in your pocket. The mission feels comfortable again.' } },
    { label: { fr: 'Tenter sans retirer', en: 'Risk it without cash' }, effect: { temps: -1, moral: -3 }, result: { fr: 'Tu fais avec le peu que tu as. Pari audacieux.', en: 'You make do with what little you have. A bold gamble.' } },
  ],
}
