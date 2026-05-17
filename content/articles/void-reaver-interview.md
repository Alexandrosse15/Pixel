---
title: "Void Reaver : six personnes, zéro IA artistique, et un roguelike d'inventaire qui veut vous faire jouer au Tetris entre deux vagues de démons"
seoTitle: "Void Reaver : interview Banana Blitz Studio"
slug: "void-reaver-interview"
category: "previews"
excerpt: "Rencontre avec Banana Blitz Studio, le studio derrière Void Reaver : six personnes réparties dans toute la France, formées sur WoW, et convaincues que le coeur du roguelike se joue dans l'inventaire."
date: "2026-05-17"
author: "Alexandrosse"
readTime: "8 min"
image_color: "from-violet-950 via-indigo-950 to-zinc-950"
coverImage: "/images/voidreaver/screenshot-1.webp"
gameName: "Void Reaver"
featured: false
---

Banana Blitz Studio n'est pas un studio comme les autres. Pas parce qu'il fait quelque chose de révolutionnaire, mais parce que son histoire ressemble à zéro des trajectoires habituelles du jeu indépendant. Pas d'école de jeu vidéo, pas d'anciens employés d'un grand studio qui se lancent, pas de Kickstarter en fanfare. Juste une équipe de six personnes dispersées en France, réunie par des rencontres sur World of Warcraft, Twitch et Discord, qui travaille sur son premier jeu sans que personne autour de la table n'ait jamais ouvert Unity avant de commencer.

Voici ce qu'ils ont à dire sur Void Reaver.

## L'équipe

Nibana, directeur artistique et compositeur, a répondu aux questions par écrit. L'équipe complète de Banana Blitz compte six personnes : Aurélie (game design et gestion du studio), Eonir et Omox (développement), Agathe (3D, art et VFX), Nibana (DA, musique et tout ce qui déborde), et Baptiste (intégration sonore sur Wwise et sound design).

La formation du studio vaut qu'on s'y attarde. Nibana a rencontré le compagnon d'Aurélie sur World of Warcraft. Ni Aurélie ni Nibana n'avaient touché à un game engine de leur vie à ce moment-là. Eonir, leur premier employé, est arrivé via des contacts en commun : développeur Unity depuis plusieurs années, il représente le socle technique sur lequel tout le reste repose. Agathe a été repérée lors d'une intervention dans une école de jeu vidéo à Montpellier. Omox a rejoint l'équipe après avoir été aperçu en train de streamer Void Reaver sur Twitch pendant le développement. Baptiste, rencontre fortuite sur Discord.

"Uniquement des rencontres très organiques", résume Nibana. Pas le genre de phrase qu'on attend d'un studio qui prépare son premier jeu commercial, et pourtant c'est précisément ce qui donne à Banana Blitz une identité lisible : personne ici n'a suivi le chemin balisé.

![Void Reaver, gameplay roguelike](/images/voidreaver/screenshot-2.webp)

L'équipe travaille entièrement en remote, répartie un peu partout en France. La coordination passe par Discord, avec une approche qui "ressemble plus à un projet passion" selon Nibana : des réunions quand c'est nécessaire, des deadlines, mais pas de hiérarchie rigide. "On n'a pas vraiment une relation classique de patron / employé."

C'est le premier jeu de tout le monde.

## La direction artistique

Void Reaver vise une fusion de références qui sur le papier ne devraient pas forcément cohabiter. Côté jeux : Starcraft pour le registre old-school, Risk of Rain pour le low-poly, et Hades pour les VFX et le post-processing à tendance cartoon. Côté culture pop : Star Wars, Battlestar Galactica pour les armes, les pouvoirs et les personnages.

Le low-poly n'est pas un choix purement esthétique. Nibana l'identifie clairement comme la conséquence directe d'une contrainte budgétaire : "Le low-poly c'est le résultat de la plus grosse contrainte technique et financière du jeu." L'équipe travaille avec des packs d'assets qu'Agathe retravaille en 3D pour les adapter à la DA. Contrainte transformée en style, comme souvent dans l'indé quand l'équipe est honnête sur ses limites.

L'UI est l'exception : "La seule chose qui aura beaucoup changé parce qu'aucun d'entre nous n'avaient de notions d'UI." Beaucoup d'itérations pour atteindre un rendu qui convient sans dépasser les capacités de l'équipe.

![Void Reaver, direction artistique](/images/voidreaver/screenshot-3.webp)

## La technologie

Unity, d'abord en version 2022 puis migré vers Unity 6. Le choix est simple : Eonir est développeur Unity, et les conditions tarifaires de Unity restent plus accessibles qu'Unreal en cas de succès commercial. Tout le développement reste dans l'écosystème Unity, à l'exception du son : Wwise pour l'intégration audio, Reaper, et Ableton Live 12 du côté de Nibana pour la composition.

Pas d'obstacles techniques majeurs signalés, ce qui s'explique en partie par le scope volontairement limité du projet. Les difficultés rencontrées sont surtout dues à la courbe d'apprentissage d'Aurélie et Nibana, les deux membres de l'équipe sans formation technique. "Le jeu ayant un scope et un gameplay plutôt simple, on s'en sort plutôt bien."

## La mécanique centrale

Void Reaver est un roguelike en deux phases distinctes.

La première est une phase de survie : des vagues d'ennemis à repousser, les armes qui tirent automatiquement sur la cible la plus proche, et le joueur qui se concentre sur son positionnement, son pouvoir actif et son dash. On pense à Vampire Survivors ou Brotato pour la structure.

La deuxième phase, et c'est là que Void Reaver prend sa propre direction, c'est la gestion d'inventaire. La monnaie gagnée en combat permet d'acheter des armes et des objets qui s'organisent dans un espace limité. Chaque objet a une forme dédiée et doit être placé physiquement dans l'inventaire, comme un Tetris. Mais surtout : certains objets n'activent leurs effets qu'en adjacence avec d'autres objets du bon type. L'inventaire n'est pas juste un réceptacle, c'est le puzzle que vous devez résoudre pour construire un build fonctionnel.

"On mise tout sur la gestion de l'inventaire, qu'on essaie de faire de la meilleure manière possible, de sorte à ce qu'il soit fluide, facile à gérer mais difficile à optimiser." Facile à comprendre, difficile à maîtriser : c'est le standard du bon design roguelike, et Banana Blitz semble conscient de l'ambition que ça représente.

La méta-progression fonctionne via un skill tree par personnage, chaque partie débloquant des améliorations permanentes. Le jeu vise une centaine d'armes, deux cents items et une dizaine de personnages avec leurs propres arbres. Les millions de builds possibles ne sont pas une promesse marketing vide si le système d'adjacence est bien calibré : la combinatoire fait réellement exploser les possibilités.

![Void Reaver, système d'inventaire](/images/voidreaver/screenshot-4.webp)

## La difficulté

La courbe de difficulté a été le sujet de débat le plus vif en interne, avec une équipe divisée entre fans de jeux hardcore et joueurs plus accessibles. Le résultat : cinq niveaux de difficulté, d'accessible à très difficile, avec un mode Endless en cours de développement pour les tryhard.

Le chemin pour y arriver a été long. Le jeu est parti d'un modèle avec peu d'ennemis mais forts (proche de Brotato), avant d'évoluer vers plus d'ennemis moins résistants (proche de Vampire Survivors et Soulstone Survivors), et trouve aujourd'hui son équilibre quelque part entre les deux. Un détail révélateur : l'équipe a initialement travaillé avec une base de dégâts entre 1 et 10, avant de tout multiplier par 10 pour simplifier les calculs. Ce genre d'itération de fond, visible uniquement dans le postmortem, dit souvent plus sur la rigueur d'un studio que n'importe quelle annonce.

## L'IA

Position sans ambiguïté : aucune IA générative artistique sur Void Reaver. Les seuls outils d'IA utilisés sont côté développement (commentaires, organisation de code). Pas pour les visuels, pas pour la narration, pas pour le sound design.

La réponse de Nibana sur le sujet ne laisse pas de place à l'interprétation : "Le studio tient une position très ferme contre l'utilisation de l'IA générative pour remplacer des artistes, peu importe l'industrie dans laquelle elle est utilisée." Il identifie l'explosion récente de jeux générés par IA sur Steam comme symptomatique d'un problème structurel : des projets sans âme qui capitalisent sur la facilité au détriment d'un écosystème indépendant déjà fragile. "Nous préférons un jeu potentiellement moins beau et moins complet, mais plus humain."

C'est une position qui a un coût réel dans un contexte où l'IA permettrait de compenser exactement les lacunes d'une petite équipe. Banana Blitz a choisi de ne pas l'utiliser en connaissance de cause.

## Le financement

Void Reaver a été financé en trois temps. D'abord sur les économies personnelles d'Aurélie et Nibana, qui ne se paient pas sur le projet ("le scope étant très supérieur à notre budget, mais on s'en sort parce qu'on ne se paie pas Aurélie et moi"). Ensuite grâce à Entalto Publishing, qui a rejoint le projet pour quelques mois supplémentaires. Et récemment via Gamevestor, une plateforme d'invest-funding qui permet à des investisseurs particuliers de financer un jeu en échange d'un retour sur investissement basé sur les revenus et un pourcentage des ventes pendant 18 mois. Une campagne réussie.

Le CNC a été sollicité pour l'aide à la pré-production, sans succès. Une demande pour l'aide à la production est en cours.

Le contrat avec l'éditeur a été signé avec une clause ferme : Banana Blitz garde le contrôle créatif et la direction artistique, sans exception. "Aucunement [de contrainte]. Nous avons fait en sorte de ne signer des contrats qu'avec la certitude que nous garderions la main mise sur le projet."

## Ce qui attend Void Reaver

Void Reaver sort en accès anticipé, pas de date précisée pour le moment. Le jeu compte environ 100 armes, 200 objets et une dizaine de personnages à la sortie en EA, avec du contenu supplémentaire prévu si les ventes permettent de financer les éléments mis de côté (skill tree plus fourni, menus plus travaillés).

Le pari est lisible : un système d'inventaire roguelike original dans un genre saturé, fait par une équipe qui n'a aucune raison objective de réussir, et qui avance quand même. Ce genre de studio ne sortira pas le meilleur jeu de l'année. Il peut sortir quelque chose d'honnête, de jouable, et qui a été fait par des gens qui y ont cru assez longtemps pour finir le travail.

C'est plus rare qu'il n'y paraît.
