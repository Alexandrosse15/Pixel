import type { GameEvent } from './engine'

// Pool d'événements. À chaque partie, le deck pioche dedans : la 1re moitié
// ne contient aucune source d'item, la 2e garantit couches ET lait.
export const EVENTS: GameEvent[] = [
  // ── Fillers (1re moitié possible) ──────────────────────────────────────────
  {
    id: 'voisin',
    sprite: 'voisin',
    decor: 'rue',
    prop: 'tondeuse',
    title: 'Le voisin du dessous',
    text: "À peine sorti, le voisin t'alpague. Il a des choses à dire sur sa nouvelle tondeuse. Beaucoup de choses.",
    choices: [
      {
        label: 'Écouter poliment',
        effect: { temps: -16, moral: 4 },
        result: "Vingt minutes sur l'autonomie de batterie. Tu as perdu du temps mais gagné un allié.",
      },
      {
        label: 'Couper court sèchement',
        effect: { temps: -3, moral: -8 },
        result: 'Tu files. Il reste planté là, vexé. Tu sens son regard dans ton dos.',
      },
      {
        label: 'Mimer un appel urgent',
        effect: { temps: -6, energie: -2 },
        result: "Tu colles le téléphone à ton oreille en marchant vite. Il n'est pas dupe, mais ça marche.",
      },
    ],
  },
  {
    id: 'caisse_queue',
    sprite: 'mamie',
    decor: 'caisse',
    prop: 'ticket',
    title: 'La file de la caisse',
    text: "Une seule caisse ouverte. Devant toi, une dame règle ses courses en pièces de un centime.",
    choices: [
      {
        label: 'Patienter en zen',
        effect: { temps: -15, moral: 3 },
        result: 'Tu respires. Tu comptes les pièces avec elle dans ta tête. Étrangement apaisant.',
      },
      {
        label: 'Tenter la caisse automatique',
        effect: { temps: -9, energie: -5, moral: -6 },
        result: "Article non reconnu. Veuillez attendre un agent. L'agent n'existe pas. Classique.",
      },
      {
        label: 'Filer en lâchant la file',
        effect: { temps: -2, moral: -7 },
        result: 'Tu abandonnes la queue, frustré. Au moins tu bouges.',
      },
    ],
  },
  {
    id: 'chien',
    sprite: 'chien',
    decor: 'rue',
    prop: 'os',
    title: 'Le chien sans laisse',
    text: 'Un gros chien débonnaire te barre le trottoir. Il te fixe. Sa queue remue. Son maître est introuvable.',
    choices: [
      {
        label: 'Le contourner large',
        effect: { temps: -4, energie: -3 },
        result: 'Tu fais un grand détour par la chaussée. Prudence avant tout.',
      },
      {
        label: 'Le caresser',
        effect: { temps: -5, moral: 10, energie: -2 },
        result: "Boule de poils adorable. Trente secondes de bonheur pur dans ce dimanche de galère.",
      },
      {
        label: 'Passer en vitesse',
        effect: { temps: -1, energie: -8, moral: -4 },
        result: 'Tu accélères. Il te suit en jappant sur dix mètres. Frayeur inutile.',
      },
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
      {
        label: "S'abriter sous un porche",
        effect: { temps: -12, moral: -3 },
        result: 'Tu attends que ça passe, dégoulinant à moitié. Le temps file.',
      },
      {
        label: 'Courir sous la pluie',
        effect: { temps: -3, energie: -10, moral: -6 },
        result: 'Tu sprintes, trempé jusqu’aux chaussettes. Rapide, mais misérable.',
      },
      {
        label: 'Appeler un taxi',
        effect: { temps: -5, argent: -10, energie: 4 },
        result: 'Cinq minutes d’attente, au sec. Le portefeuille morfle, le moral tient.',
      },
    ],
  },
  {
    id: 'parking',
    sprite: 'papa',
    decor: 'parking',
    prop: 'parcmetre',
    title: 'La place introuvable',
    text: 'Le parking du centre commercial est plein. Une dernière place, là-bas. Une autre voiture la lorgne aussi.',
    choices: [
      {
        label: 'Foncer sur la place',
        effect: { temps: -3, moral: 6, energie: -3 },
        result: 'Créneau express, klaxon de l’autre. Tu gagnes le duel du dimanche.',
      },
      {
        label: 'Tourner encore un peu',
        effect: { temps: -13, energie: -4 },
        result: 'Tu tournes, tu tournes. Trois étages plus tard, tu te gares enfin.',
      },
      {
        label: 'Parking payant d’en face',
        effect: { temps: -4, argent: -6 },
        result: 'Une place propre et immédiate. Six euros de tranquillité.',
      },
    ],
  },
  {
    id: 'ex',
    sprite: 'ex',
    decor: 'rue',
    prop: 'lunettes',
    title: 'La rencontre gênante',
    text: 'En plein trottoir, ton ex. Impeccable, comme toujours. Toi, en jogging, à la recherche de couches.',
    choices: [
      {
        label: 'Discuter cinq minutes',
        effect: { temps: -10, moral: -4 },
        result: 'Conversation polie et glaciale. Tu repars avec une légère envie de disparaître.',
      },
      {
        label: 'Faire semblant de ne pas voir',
        effect: { temps: -2, moral: -8 },
        result: "Tu fixes ton téléphone très fort. Elle t'a vu te cacher. C'est pire.",
      },
      {
        label: 'Saluer et filer dignement',
        effect: { temps: -4, moral: 8 },
        result: 'Bonjour franc, sourire, et tu continues. Classe maîtrisée.',
      },
    ],
  },
  {
    id: 'bar',
    sprite: 'barman',
    decor: 'bar',
    prop: 'biere',
    title: 'La terrasse qui appelle',
    text: 'Un bar ensoleillé, des copains attablés qui te font signe. Une bière fraîche scintille. La mission peut-elle attendre ?',
    choices: [
      {
        label: 'Juste une, vite fait',
        effect: { temps: -14, energie: 6, moral: 12 },
        result: 'Une demi, deux blagues, un vrai moment. Mais le temps, lui, ne plaisante pas.',
      },
      {
        label: 'Résister héroïquement',
        effect: { temps: -1, moral: -9, energie: -2 },
        result: 'Tu déclines. Le devoir avant le houblon. Le coeur lourd, tu continues.',
      },
      {
        label: 'Trinquer et repartir aussitôt',
        effect: { temps: -6, moral: 6 },
        result: 'Un verre d’eau, une accolade, et tu repars. Le meilleur compromis.',
      },
    ],
  },
  {
    id: 'distributeur',
    sprite: 'papa',
    decor: 'atm',
    prop: 'carte',
    title: 'Le distributeur',
    text: 'Tu vérifies ton portefeuille : la mission va coûter. Un distributeur clignote au coin de la rue.',
    choices: [
      {
        label: 'Retirer du liquide',
        effect: { temps: -6, argent: 30 },
        result: 'Trente euros en poche. La mission redevient confortable.',
      },
      {
        label: 'Tenter sans retirer',
        effect: { temps: -1, moral: -3 },
        result: 'Tu décides de faire avec le peu que tu as. Pari audacieux.',
      },
    ],
  },
  {
    id: 'vigile',
    sprite: 'vigile',
    decor: 'supermarche',
    prop: 'etoile',
    title: 'Le vigile soupçonneux',
    text: "Tu tournes depuis dix minutes les mains vides. Le vigile te suit du regard, persuadé de tenir un voleur.",
    choices: [
      {
        label: 'Lui expliquer la mission',
        effect: { temps: -6, moral: 4 },
        result: 'Père à père, il comprend. Il te pointe même le bon rayon. Solidarité.',
      },
      {
        label: 'L’ignorer froidement',
        effect: { temps: -3, moral: -5, energie: -2 },
        result: 'Tu joues l’indifférent sous l’oeil méfiant. Ambiance pesante.',
      },
    ],
  },
  {
    id: 'caddie',
    sprite: 'papa',
    decor: 'parking',
    prop: 'caddie',
    title: 'Le caddie à pièce',
    text: 'Les caddies sont enchaînés. Il faut une pièce de un euro. Tu fouilles tes poches, désespérément.',
    choices: [
      {
        label: 'Acheter un café pour la monnaie',
        effect: { temps: -7, argent: -2, energie: 5 },
        result: "Un café pour faire de la monnaie. Caddie débloqué, et toi aussi.",
      },
      {
        label: 'Prendre un panier à la main',
        effect: { temps: -2, energie: -7 },
        result: 'Pas de caddie, tu porteras tout à bout de bras. Le dos s’en souviendra.',
      },
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
      {
        label: 'L’aider à retrouver sa mère',
        effect: { temps: -12, moral: 14 },
        result: "Annonce au micro, retrouvailles, larmes de joie. Tu as perdu du temps, gagné en humanité.",
      },
      {
        label: 'Prévenir un employé et filer',
        effect: { temps: -4, moral: 2 },
        result: 'Tu signales l’enfant et tu poursuis ta route, la conscience à peu près tranquille.',
      },
    ],
  },
  {
    id: 'tel_femme',
    sprite: 'femme',
    decor: 'rue',
    prop: 'telephone',
    title: "L'appel de la maison",
    text: "Ton téléphone sonne. C'est elle. Le ton est calme. Trop calme. Elle veut savoir où tu en es.",
    choices: [
      {
        label: 'Rassurer avec aplomb',
        effect: { temps: -3, moral: 8 },
        result: '"Presque fini, chérie." Mensonge serein qui te regonfle à bloc.',
      },
      {
        label: 'Avouer la galère',
        effect: { temps: -5, moral: -6 },
        result: 'Tu déballes tout. Silence au bout du fil. Puis un soupir long comme un dimanche.',
      },
    ],
  },
  {
    id: 'sdf',
    sprite: 'sdf',
    decor: 'rue',
    prop: 'piece',
    title: 'La pièce demandée',
    text: 'Un homme assis devant le magasin te demande une pièce, le sourire fatigué.',
    choices: [
      {
        label: 'Donner une pièce',
        effect: { temps: -2, argent: -2, moral: 9 },
        result: 'Un merci sincère, un bout de conversation. Ça ne coûte rien et ça réchauffe.',
      },
      {
        label: 'Sourire et passer',
        effect: { temps: -1 },
        result: 'Tu n’as pas de monnaie, tu salues d’un signe et continues.',
      },
    ],
  },
  {
    id: 'promo',
    sprite: 'caissiere',
    decor: 'allee',
    prop: 'promo',
    title: 'La tête de gondole',
    text: 'Une promo agressive sur des trucs dont tu n’as absolument pas besoin. Mais -50%, quand même.',
    choices: [
      {
        label: 'Résister à la promo',
        effect: { temps: -2, moral: 5 },
        result: 'Tu passes ton chemin, fier de ta discipline d’acheteur.',
      },
      {
        label: 'Craquer un peu',
        effect: { temps: -7, argent: -8, moral: 6 },
        result: 'Tu repars avec un gadget inutile mais une petite joie coupable.',
      },
    ],
  },
  {
    id: 'raccourci',
    sprite: 'papa',
    decor: 'parc',
    prop: 'horloge',
    title: 'Le raccourci par le parc',
    text: 'Un sentier coupe par le parc. Plus court, mais boueux après la pluie de tout à l’heure.',
    choices: [
      {
        label: 'Prendre le raccourci',
        effect: { temps: 8, energie: -6, moral: -3 },
        result: 'Tu gagnes du temps mais tu finis crotté jusqu’aux genoux.',
      },
      {
        label: 'Rester sur le trottoir',
        effect: { temps: -6, energie: 2 },
        result: 'Itinéraire propre et sûr, un peu plus long. Tu préfères la sécurité.',
      },
    ],
  },
  {
    id: 'collegue',
    sprite: 'collegue',
    decor: 'allee',
    prop: 'journal',
    title: 'Le collègue de boulot',
    text: 'Tu croises un collègue dans le rayon surgelés. Il veut absolument parler du dossier de lundi.',
    choices: [
      {
        label: 'Botter en touche poliment',
        effect: { temps: -5, moral: 2 },
        result: '"On en parle demain." Tu t’échappes avec élégance.',
      },
      {
        label: 'Subir le débrief complet',
        effect: { temps: -13, moral: -7 },
        result: 'Dix minutes sur un tableau Excel, un dimanche. La vie est cruelle.',
      },
    ],
  },
  {
    id: 'marche',
    sprite: 'primeur',
    decor: 'marche',
    prop: 'tomates',
    title: 'Le marché dominical',
    text: 'Le marché bat son plein. Foule, étals, et un primeur qui vante ses tomates à pleins poumons.',
    choices: [
      {
        label: 'Fendre la foule',
        effect: { temps: -9, energie: -6 },
        result: 'Tu joues des coudes entre les cabas. Épuisant mais tu passes.',
      },
      {
        label: 'Contourner par la ruelle',
        effect: { temps: -5, energie: -2 },
        result: 'Petit détour malin par une ruelle calme. Bien vu.',
      },
    ],
  },
  {
    id: 'ado_skate',
    sprite: 'skateur',
    decor: 'parc',
    prop: 'skateboard',
    title: 'Les skateurs',
    text: 'Des ados occupent tout le passage avec leurs planches. L’un d’eux te frôle de près.',
    choices: [
      {
        label: 'Demander gentiment le passage',
        effect: { temps: -4, moral: 3 },
        result: 'Ils s’écartent en marmonnant. Respect mutuel minimal, mais ça passe.',
      },
      {
        label: 'Passer en force',
        effect: { temps: -2, energie: -5, moral: -4 },
        result: 'Tu te faufiles, manques de te prendre une planche. Sport involontaire.',
      },
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
      {
        label: 'Pédaler comme un fou',
        effect: { temps: 12, energie: -9, argent: -3 },
        result: 'Tu fonces, cheveux au vent, jambes en feu. Gain de temps spectaculaire.',
      },
      {
        label: 'Renoncer, l’appli bug',
        effect: { temps: -4, moral: -3 },
        result: 'Trois QR codes scannés, zéro vélo débloqué. Tu repars à pied, agacé.',
      },
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
      {
        label: 'S’offrir un pain au chocolat',
        effect: { temps: -5, argent: -2, energie: 9, moral: 5 },
        result: 'Réconfort instantané. Tu repars rechargé et un peu plus heureux.',
      },
      {
        label: 'Serrer les dents',
        effect: { temps: -1, energie: -5, moral: -3 },
        result: 'Tu résistes. L’estomac proteste, la mission continue.',
      },
    ],
  },
  {
    id: 'arret_bus',
    sprite: 'mamie',
    decor: 'arret_bus',
    prop: 'horloge',
    title: "L'arrêt de bus",
    text: 'Un bus pourrait te rapprocher du magasin. L’horaire du dimanche, lui, reste un mystère insondable.',
    choices: [
      {
        label: 'Attendre le bus',
        effect: { temps: -10, energie: 6 },
        result: 'Il finit par arriver. Assis, au repos, mais le temps a coulé.',
      },
      {
        label: 'Continuer à pied',
        effect: { temps: -5, energie: -5 },
        result: 'Tu ne fais pas confiance aux bus du dimanche. Tu marches.',
      },
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
      {
        label: 'Respirer un grand coup',
        effect: { temps: -2, moral: 3 },
        result: 'Tu laisses passer l’adrénaline. Pas la peine de gâcher ton dimanche pour ça.',
      },
      {
        label: 'Crier ton mécontentement',
        effect: { temps: -3, energie: -4, moral: -3 },
        result: 'Il est déjà loin. Tu cries dans le vide, des passants te regardent.',
      },
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
      {
        label: 'Boire un expresso au comptoir',
        effect: { temps: -6, argent: -2, energie: 11 },
        result: 'Serré, brûlant, parfait. Tu repars avec un coup de fouet.',
      },
      {
        label: 'Passer ton chemin',
        effect: { temps: -1, energie: -3 },
        result: 'Pas le temps. Tu continues sur ta lancée, un peu raplapla.',
      },
    ],
  },

  // ── Sources d'items (2e moitié uniquement) ──────────────────────────────────
  {
    id: 'rayon_couches',
    sprite: 'caissiere',
    decor: 'rayon',
    prop: 'couches',
    title: 'Le rayon des couches',
    text: 'Le voilà. Un mur de paquets, douze marques, trois tailles. Le bon modèle est tout en haut.',
    choices: [
      {
        label: 'Attraper le bon paquet',
        effect: { temps: -8, energie: -6, argent: -11, couches: true },
        result: 'Tu vises la taille 3, tu te hisses sur la pointe des pieds. Couches sécurisées.',
      },
      {
        label: 'Prendre le premier venu',
        effect: { temps: -3, argent: -9, couches: true, moral: -5 },
        result: 'Tu prends le paquet du dessous. Taille 5. Tant pis, ça fera flotteur. Mais tu as des couches.',
      },
      {
        label: 'Comparer les prix au gramme',
        effect: { temps: -12, moral: -4 },
        result: "Tu sors la calculette mentale, tu hésites trop longtemps, un autre client rafle le dernier paquet correct. Tu repars sans rien.",
      },
    ],
  },
  {
    id: 'pharmacie_lait',
    sprite: 'pharmacien',
    decor: 'pharmacie',
    prop: 'lait',
    title: 'La pharmacie de garde',
    text: 'Seule ouverte un dimanche. La pharmacienne te toise par-dessus ses lunettes. Le lait infantile est derrière elle.',
    choices: [
      {
        label: 'Demander le lait 2e âge',
        effect: { temps: -7, argent: -15, lait: true },
        result: "Elle pose la boîte sur le comptoir. C'est cher, mais tu as le lait. Soulagement.",
      },
      {
        label: 'Prendre la marque premium',
        effect: { temps: -9, argent: -20, lait: true, moral: 3 },
        result: 'Lait haut de gamme, recommandé pour les petits estomacs fragiles. Cher mais rassurant.',
      },
      {
        label: 'Hésiter et ressortir',
        effect: { temps: -4, moral: -6 },
        result: 'Trop cher, tu paniques, tu ressors. La clochette tinte comme un reproche.',
      },
    ],
  },
  {
    id: 'superette',
    sprite: 'caissier',
    decor: 'epicerie',
    prop: 'couches',
    title: 'La supérette ouverte',
    text: "Une petite supérette de quartier a gardé le rideau levé. Côté bébé, il ne reste que des couches.",
    choices: [
      {
        label: 'Pack de couches',
        effect: { temps: -6, argent: -12, couches: true },
        result: 'Une seule marque, mais la bonne taille. Couches dans le sac.',
      },
      {
        label: 'Pack maxi format',
        effect: { temps: -8, argent: -16, couches: true, moral: 3 },
        result: 'Le gros pack, de quoi tenir des semaines. Lourd, mais tranquille pour un moment.',
      },
      {
        label: 'Repartir, trop petit',
        effect: { temps: -2 },
        result: 'Tu juges le choix trop limité et tu ressors. Pari risqué.',
      },
    ],
  },
  {
    id: 'rupture',
    sprite: 'vigile',
    decor: 'rayon',
    prop: 'carton',
    title: 'Rupture de stock',
    text: "Le rayon bébé est dévalisé. Un employé range les cartons vides en haussant les épaules.",
    choices: [
      {
        label: 'Demander en réserve',
        effect: { temps: -11, couches: true, energie: -3, argent: -10 },
        result: "Il soupire, disparaît, revient avec un dernier paquet oublié. Couches sauvées in extremis.",
      },
      {
        label: 'Râler au rayon',
        effect: { temps: -4, moral: -7 },
        result: 'Tu peste tout seul devant les étagères vides. Ça ne remplit pas le panier.',
      },
      {
        label: 'Aller voir ailleurs',
        effect: { temps: -3, energie: -4 },
        result: 'Tu abandonnes ce magasin. La ville est grande, l’espoir aussi.',
      },
    ],
  },
  {
    id: 'grande_surface',
    sprite: 'caissier',
    decor: 'allee',
    prop: 'couches',
    title: 'La grande surface',
    text: 'Enfin un vrai supermarché ouvert. Le rayon bébé est immense, mais le lait est en rupture partout.',
    choices: [
      {
        label: 'Foncer au rayon couches',
        effect: { temps: -8, argent: -11, couches: true },
        result: 'Tu connais le chemin par coeur. Paquet attrapé, mission avancée.',
      },
      {
        label: 'Couches premium en promo',
        effect: { temps: -11, argent: -14, couches: true, moral: 4 },
        result: 'Une promo sur le haut de gamme. Tu remplis le caddie, content de ton coup.',
      },
      {
        label: 'Chercher le lait en vain',
        effect: { temps: -12, energie: -7, moral: -6 },
        result: 'Tu arpentes toutes les allées pour le lait. Rien. Du temps et de l’énergie gaspillés.',
      },
    ],
  },
  {
    id: 'epicier_nuit',
    sprite: 'caissiere',
    decor: 'epicerie',
    prop: 'lait',
    title: "L'épicier du soir",
    text: 'Une épicerie qui ne ferme jamais. L’épicier connaît tous les parents du quartier en détresse.',
    choices: [
      {
        label: 'Acheter le lait en poudre',
        effect: { temps: -5, argent: -16, lait: true },
        result: 'Il sort une boîte de derrière le comptoir. Plus cher, mais sauveur.',
      },
      {
        label: 'Négocier le prix',
        effect: { temps: -8, argent: -12, lait: true, moral: 4 },
        result: 'Un sourire, deux blagues, et il baisse un peu. Tu as le lait et la cote.',
      },
      {
        label: 'Trouver trop cher et partir',
        effect: { temps: -3, moral: -4 },
        result: 'Tu ressors sans rien. Le quartier se vide de ses options.',
      },
    ],
  },
  {
    id: 'pharmacien_conseil',
    sprite: 'pharmacien',
    decor: 'pharmacie',
    prop: 'sacpharma',
    title: 'Le conseil du pharmacien',
    text: 'Un autre pharmacien, bavard celui-là, veut absolument te conseiller le meilleur lait pour bébé.',
    choices: [
      {
        label: 'Écouter et acheter le lait',
        effect: { temps: -10, argent: -15, lait: true, moral: 3 },
        result: 'Cours magistral sur la digestion du nourrisson, mais tu repars avec le bon lait.',
      },
      {
        label: 'Couper court et prendre le lait',
        effect: { temps: -5, argent: -17, lait: true, moral: -3 },
        result: 'Tu prends la boîte et tu files avant la deuxième leçon. Plus cher, mais rapide.',
      },
    ],
  },
  {
    id: 'drive',
    sprite: 'caissier',
    decor: 'parking',
    prop: 'lait',
    title: 'Le drive du dimanche',
    text: 'Un drive ouvert ! Il leur reste du lait infantile, mais avec le supplément week-end.',
    choices: [
      {
        label: 'Commander le lait au drive',
        effect: { temps: -9, argent: -17, lait: true },
        result: 'Coffre chargé sans descendre de voiture. Cher, mais le lait est là. Efficace.',
      },
      {
        label: 'Prendre le lot de deux boîtes',
        effect: { temps: -11, argent: -22, lait: true, moral: 3 },
        result: 'Deux boîtes d’avance. Le portefeuille morfle, mais te revoilà serein côté lait.',
      },
    ],
  },
]
