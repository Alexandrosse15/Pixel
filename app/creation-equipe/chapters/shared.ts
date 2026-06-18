import type { GameEvent } from '../engine'

// Obstacles universels d'une course contre la montre, réutilisables par les chapitres.
// Aucun ne donne d'objectif : ce sont des fillers.

// ── Rue, transport, social : fonctionnent dans n'importe quel chapitre. ──
export const STREET: GameEvent[] = [
  {
    id: 'voisin',
    sprite: 'voisin',
    decor: 'rue',
    prop: 'tondeuse',
    title: 'Le voisin du dessous',
    text: "À peine sorti, le voisin t'alpague. Il a des choses à dire sur sa nouvelle tondeuse. Beaucoup de choses.",
    choices: [
      { label: 'Écouter poliment', effect: { temps: -16, moral: 4 }, result: "Vingt minutes sur l'autonomie de batterie. Du temps perdu, un allié gagné." },
      { label: 'Couper court sèchement', effect: { temps: -3, moral: -8 }, result: 'Tu files. Il reste planté là, vexé.' },
      { label: 'Mimer un appel urgent', effect: { temps: -6, energie: -2 }, result: "Tu colles le téléphone à ton oreille. Il n'est pas dupe, mais ça marche." },
    ],
  },
  {
    id: 'chien',
    sprite: 'chien',
    decor: 'rue',
    prop: 'os',
    title: 'Le chien sans laisse',
    text: 'Un gros chien débonnaire te barre le trottoir. Il te fixe, la queue remuante. Son maître est introuvable.',
    choices: [
      { label: 'Le contourner large', effect: { temps: -4, energie: -3 }, result: 'Grand détour par la chaussée. Prudence avant tout.' },
      { label: 'Le caresser', effect: { temps: -5, moral: 10, energie: -2 }, result: 'Boule de poils adorable. Trente secondes de bonheur pur.' },
      { label: 'Passer en vitesse', effect: { temps: -1, energie: -8, moral: -4 }, result: 'Il te suit en jappant sur dix mètres. Frayeur inutile.' },
    ],
  },
  {
    id: 'pluie',
    sprite: 'papa',
    decor: 'rue',
    prop: 'parapluie',
    title: "L'averse soudaine",
    text: 'Le ciel lâche tout sans prévenir. Tu es à découvert, sans parapluie, évidemment.',
    choices: [
      { label: "S'abriter sous un porche", effect: { temps: -12, moral: -3 }, result: 'Tu attends que ça passe, dégoulinant à moitié. Le temps file.' },
      { label: 'Courir sous la pluie', effect: { temps: -3, energie: -10, moral: -6 }, result: 'Trempé jusqu’aux chaussettes. Rapide, mais misérable.' },
      { label: 'Appeler un taxi', effect: { temps: -5, argent: -10, energie: 4 }, result: 'Cinq minutes au sec. Le portefeuille morfle, le moral tient.' },
    ],
  },
  {
    id: 'ex',
    sprite: 'ex',
    decor: 'rue',
    prop: 'lunettes',
    title: 'La rencontre gênante',
    text: 'En plein trottoir, ton ex. Impeccable, comme toujours. Toi, en jogging, en pleine mission express.',
    choices: [
      { label: 'Discuter cinq minutes', effect: { temps: -10, moral: -4 }, result: 'Conversation polie et glaciale. Légère envie de disparaître.' },
      { label: 'Faire semblant de rien', effect: { temps: -2, moral: -8 }, result: "Tu fixes ton téléphone. Elle t'a vu te cacher. C'est pire." },
      { label: 'Saluer et filer', effect: { temps: -4, moral: 8 }, result: 'Bonjour franc, sourire, et tu continues. Classe maîtrisée.' },
    ],
  },
  {
    id: 'bar',
    sprite: 'barman',
    decor: 'bar',
    prop: 'biere',
    title: 'La terrasse qui appelle',
    text: 'Un bar ensoleillé, des copains qui te font signe. Une bière fraîche scintille. La mission peut-elle attendre ?',
    choices: [
      { label: 'Juste une, vite fait', effect: { temps: -14, energie: 6, moral: 12 }, result: 'Une demi, deux blagues. Mais le temps, lui, ne plaisante pas.' },
      { label: 'Résister héroïquement', effect: { temps: -1, moral: -9, energie: -2 }, result: 'Tu déclines. Le devoir avant le houblon.' },
      { label: 'Trinquer et repartir', effect: { temps: -6, moral: 6 }, result: 'Un verre d’eau, une accolade, et tu repars. Le bon compromis.' },
    ],
  },
  {
    id: 'sdf',
    sprite: 'sdf',
    decor: 'rue',
    prop: 'piece',
    title: 'La pièce demandée',
    text: 'Un homme assis sur le trottoir te demande une pièce, le sourire fatigué.',
    choices: [
      { label: 'Donner une pièce', effect: { temps: -2, argent: -2, moral: 9 }, result: 'Un merci sincère. Ça ne coûte rien et ça réchauffe.' },
      { label: 'Sourire et passer', effect: { temps: -1 }, result: 'Tu salues d’un signe et continues.' },
    ],
  },
  {
    id: 'raccourci',
    sprite: 'papa',
    decor: 'parc',
    prop: 'horloge',
    title: 'Le raccourci par le parc',
    text: 'Un sentier coupe par le parc. Plus court, mais boueux après la dernière pluie.',
    choices: [
      { label: 'Prendre le raccourci', effect: { temps: 8, energie: -6, moral: -3 }, result: 'Tu gagnes du temps mais finis crotté jusqu’aux genoux.' },
      { label: 'Rester sur le trottoir', effect: { temps: -6, energie: 2 }, result: 'Itinéraire propre et sûr, un peu plus long.' },
    ],
  },
  {
    id: 'panne_velo',
    sprite: 'papa',
    decor: 'rue',
    prop: 'velo',
    title: 'Le vélo en libre service',
    text: 'Une borne de vélos partagés. Tu pourrais gagner un temps fou, si l’appli daigne fonctionner.',
    choices: [
      { label: 'Pédaler comme un fou', effect: { temps: 12, energie: -9, argent: -3 }, result: 'Cheveux au vent, jambes en feu. Gain de temps spectaculaire.' },
      { label: 'Renoncer, l’appli bug', effect: { temps: -4, moral: -3 }, result: 'Trois QR codes, zéro vélo. Tu repars à pied, agacé.' },
    ],
  },
  {
    id: 'gouter',
    sprite: 'papa',
    decor: 'boulangerie',
    prop: 'painchoco',
    title: 'Le creux de 11h',
    text: 'Ton ventre gargouille. Une boulangerie ouverte embaume tout le trottoir.',
    choices: [
      { label: 'Un pain au chocolat', effect: { temps: -5, argent: -2, energie: 9, moral: 5 }, result: 'Réconfort instantané. Tu repars rechargé.' },
      { label: 'Serrer les dents', effect: { temps: -1, energie: -5, moral: -3 }, result: 'Tu résistes. L’estomac proteste.' },
    ],
  },
  {
    id: 'arret_bus',
    sprite: 'mamie',
    decor: 'arret_bus',
    prop: 'horloge',
    title: "L'arrêt de bus",
    text: 'Un bus pourrait te rapprocher. L’horaire, lui, reste un mystère insondable.',
    choices: [
      { label: 'Attendre le bus', effect: { temps: -10, energie: 6 }, result: 'Il finit par arriver. Assis, au repos, mais le temps a coulé.' },
      { label: 'Continuer à pied', effect: { temps: -5, energie: -5 }, result: 'Tu ne fais pas confiance aux bus. Tu marches.' },
    ],
  },
  {
    id: 'cycliste',
    sprite: 'cycliste',
    decor: 'rue',
    prop: 'feu',
    title: 'Le cycliste pressé',
    text: 'Un livreur à vélo grille le feu et te frôle au passage piéton. Frayeur et sonnette agressive.',
    choices: [
      { label: 'Respirer un grand coup', effect: { temps: -2, moral: 3 }, result: 'Tu laisses passer l’adrénaline. Pas de quoi gâcher ta journée.' },
      { label: 'Crier ton mécontentement', effect: { temps: -3, energie: -4, moral: -3 }, result: 'Il est déjà loin. Tu cries dans le vide.' },
    ],
  },
  {
    id: 'cafe_pause',
    sprite: 'barman',
    decor: 'boulangerie',
    prop: 'cafe',
    title: 'Le comptoir du coin',
    text: 'Un petit café de quartier. Un expresso te remettrait peut-être d’aplomb.',
    choices: [
      { label: 'Expresso au comptoir', effect: { temps: -6, argent: -2, energie: 11 }, result: 'Serré, brûlant, parfait. Coup de fouet immédiat.' },
      { label: 'Passer ton chemin', effect: { temps: -1, energie: -3 }, result: 'Pas le temps. Tu continues, un peu raplapla.' },
    ],
  },
  {
    id: 'belle_mere',
    sprite: 'mamie',
    decor: 'rue',
    prop: 'telephone',
    title: "L'appel de la belle-mère",
    text: "Numéro masqué. C'est ta belle-mère. Elle a appris pour la mission et veut absolument te conseiller.",
    choices: [
      { label: 'Acquiescer poliment', effect: { temps: -9, moral: -3 }, result: 'Tu dis oui à tout pendant cinq minutes. Paix sociale préservée.' },
      { label: 'Écourter fermement', effect: { temps: -3, moral: -6 }, result: '"Je gère, merci." Silence pincé. Tu paieras ça au prochain repas.' },
    ],
  },
  {
    id: 'flaque',
    sprite: 'cycliste',
    decor: 'rue',
    prop: 'nuage',
    title: "L'arroseur arrosé",
    text: 'Une voiture file dans une flaque énorme juste à côté de toi. Le mur d’eau arrive au ralenti.',
    choices: [
      { label: 'Bondir en arrière', effect: { temps: -4, energie: -6 }, result: 'Réflexe de félin. Pantalon sauvé, effort brusque.' },
      { label: 'Encaisser, fataliste', effect: { temps: -1, moral: -8 }, result: 'Douche froide intégrale. Le destin se moque de toi.' },
    ],
  },
  {
    id: 'sondage',
    sprite: 'collegue',
    decor: 'allee',
    prop: 'liste',
    title: 'Le sondeur de rue',
    text: 'Un jeune homme avec une tablette te bloque : "Deux minutes pour un questionnaire ?"',
    choices: [
      { label: 'Répondre vite fait', effect: { temps: -8, moral: 2 }, result: 'Quinze questions. Tu mens à toutes, ça va plus vite.' },
      { label: 'Esquiver poliment', effect: { temps: -2 }, result: '"Désolé, urgence." Argument imparable.' },
    ],
  },
  {
    id: 'chat_perdu',
    sprite: 'papa',
    decor: 'ruelle',
    prop: 'coeur',
    title: 'Le chat de la ruelle',
    text: 'Un chat tigré te suit en miaulant. Il a l’air de te connaître. Toi, pas du tout.',
    choices: [
      { label: 'Le caresser un instant', effect: { temps: -5, moral: 11 }, result: 'Ronronnement immédiat. Parenthèse de douceur.' },
      { label: 'Continuer, indifférent', effect: { temps: -1, energie: 2 }, result: 'Le chat te juge, puis se désintéresse de toi.' },
    ],
  },
  {
    id: 'monnaie',
    sprite: 'caissier',
    decor: 'caisse',
    prop: 'piece',
    title: "L'appoint exact",
    text: 'Terminal de carte en rade. "Espèces uniquement", annonce le commerçant. Tu comptes tes pièces.',
    choices: [
      { label: 'Faire l’appoint à la pièce', effect: { temps: -7, moral: -2 }, result: 'Tu vides ta poche centime par centime. La file soupire.' },
      { label: 'Arrondir au-dessus', effect: { temps: -3, argent: -3 }, result: 'Tu donnes plus pour aller vite. Le temps vaut bien trois euros.' },
    ],
  },
]

// ── Spécifique magasins (chapitres en grande surface). ──
export const STORE: GameEvent[] = [
  {
    id: 'caisse_queue',
    sprite: 'mamie',
    decor: 'caisse',
    prop: 'ticket',
    title: 'La file de la caisse',
    text: 'Une seule caisse ouverte. Devant toi, une dame règle en pièces de un centime.',
    choices: [
      { label: 'Patienter en zen', effect: { temps: -15, moral: 3 }, result: 'Tu respires. Étrangement apaisant.' },
      { label: 'Caisse automatique', effect: { temps: -9, energie: -5, moral: -6 }, result: 'Article non reconnu. Veuillez attendre un agent. Classique.' },
      { label: 'Lâcher la file', effect: { temps: -2, moral: -7 }, result: 'Tu abandonnes la queue, frustré.' },
    ],
  },
  {
    id: 'vigile',
    sprite: 'vigile',
    decor: 'supermarche',
    prop: 'etoile',
    title: 'Le vigile soupçonneux',
    text: 'Tu tournes les mains vides depuis dix minutes. Le vigile te suit du regard.',
    choices: [
      { label: 'Lui expliquer', effect: { temps: -6, moral: 4 }, result: 'Il comprend, te pointe même le bon rayon. Solidarité.' },
      { label: 'L’ignorer', effect: { temps: -3, moral: -5, energie: -2 }, result: 'Tu joues l’indifférent sous l’oeil méfiant.' },
    ],
  },
  {
    id: 'caddie',
    sprite: 'papa',
    decor: 'parking',
    prop: 'caddie',
    title: 'Le caddie à pièce',
    text: 'Les caddies sont enchaînés. Il faut une pièce de un euro. Tu fouilles tes poches.',
    choices: [
      { label: 'Café pour la monnaie', effect: { temps: -7, argent: -2, energie: 5 }, result: 'Un café pour faire l’appoint. Caddie débloqué, et toi aussi.' },
      { label: 'Panier à la main', effect: { temps: -2, energie: -7 }, result: 'Pas de caddie, tu portes tout à bras. Le dos s’en souviendra.' },
    ],
  },
  {
    id: 'promo',
    sprite: 'caissiere',
    decor: 'allee',
    prop: 'promo',
    title: 'La tête de gondole',
    text: 'Une promo agressive sur des trucs inutiles. Mais -50%, quand même.',
    choices: [
      { label: 'Résister', effect: { temps: -2, moral: 5 }, result: 'Tu passes ton chemin, fier de ta discipline.' },
      { label: 'Craquer un peu', effect: { temps: -7, argent: -8, moral: 6 }, result: 'Un gadget inutile, une petite joie coupable.' },
    ],
  },
  {
    id: 'degustation',
    sprite: 'caissiere',
    decor: 'supermarche',
    prop: 'chips',
    title: 'Le stand dégustation',
    text: 'Une hôtesse propose des cubes de fromage gratuits sur des piques. Ton estomac répond avant toi.',
    choices: [
      { label: 'Goûter discrètement', effect: { temps: -4, energie: 7, moral: 4 }, result: 'Trois cubes, mine de rien. Énergie regonflée.' },
      { label: 'Décliner dignement', effect: { temps: -1, moral: 2 }, result: 'Tu remercies et passes, le ventre vide mais la tête haute.' },
    ],
  },
  {
    id: 'enfant_perdu',
    sprite: 'enfant',
    decor: 'allee',
    prop: 'doudou',
    title: "L'enfant perdu",
    text: 'Un petit pleure au milieu de l’allée, il a perdu ses parents. Personne ne s’arrête.',
    choices: [
      { label: 'L’aider à retrouver sa mère', effect: { temps: -12, moral: 14 }, result: 'Annonce au micro, retrouvailles. Du temps perdu, de l’humanité gagnée.' },
      { label: 'Prévenir un employé', effect: { temps: -4, moral: 2 }, result: 'Tu signales l’enfant et poursuis, la conscience tranquille.' },
    ],
  },
]

// Source d'argent : garantie en première moitié par le moteur.
export const DISTRIBUTEUR: GameEvent = {
  id: 'distributeur',
  sprite: 'papa',
  decor: 'atm',
  prop: 'carte',
  money: true,
  title: 'Le distributeur',
  text: 'Un distributeur clignote au coin de la rue. La mission va coûter : autant prévoir.',
  choices: [
    { label: 'Retirer du liquide', effect: { temps: -6, argent: 30 }, result: 'Trente euros en poche. La mission redevient confortable.' },
    { label: 'Tenter sans retirer', effect: { temps: -1, moral: -3 }, result: 'Tu fais avec le peu que tu as. Pari audacieux.' },
  ],
}
