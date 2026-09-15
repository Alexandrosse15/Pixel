---
title: "Guide Craftomation 101 : vos premières routines, les erreurs classiques et l'art de ne pas laisser mourir ses robots"
seoTitle: "Craftomation 101 : guide complet du débutant"
slug: "craftomation-101-guide"
category: "guides"
excerpt: "Par quoi commencer, comment penser une routine réutilisable, pourquoi votre robot s'arrête, et comment automatiser la chaleur avant tout le reste."
date: "2026-09-15"
author: "Alexandrosse"
readTime: "12 min"
image_color: "from-sky-950 via-slate-900 to-zinc-950"
coverImage: "/images/craftomation/screenshot-3.webp"
gameName: "Craftomation 101: Programming & Craft"
featured: false
---

Craftomation 101 a une qualité rare : il ne vous ment pas. Quand quelque chose ne marche pas, c'est votre programme.

C'est aussi ce qui rend les trois premières heures frustrantes. Ce guide sert à les raccourcir. Notre [test complet est ici](/articles/craftomation-101-test) si vous hésitez encore.

![Craftomation 101, l editeur de routines](/images/craftomation/screenshot-3.webp)

## La règle qui doit passer avant toutes les autres

Avant de penser production, pensez survie.

**Vos robots consomment du carburant et votre base a besoin de chaleur.** Un joli système de récolte qui s'arrête parce que personne n'alimente le feu n'est pas un système, c'est une décoration.

La première routine que vous devriez écrire, avant celle qui récolte le minerai, avant celle qui fabrique, c'est celle qui **entretient le feu**. Elle est moins gratifiante et elle vous évitera de tout recommencer.

L'ordre que je conseille pour les premières heures :

1. Un robot qui alimente le feu en continu.
2. Un robot qui récolte le bois qui alimente le feu.
3. Seulement ensuite, la production de matériaux.

Oui, les deux premiers robots ne produisent rien. C'est le prix de la stabilité.

## Comment penser une routine

L'erreur de débutant est d'écrire un long programme qui fait tout. Ça marche, une fois, puis ça devient impossible à corriger.

**Écrivez court et testez immédiatement.** Trois blocs, lancer, regarder. Le jeu vous montre le robot en train d'exécuter votre logique, donc vous voyez exactement où ça casse. Utilisez ça au lieu de relire votre code.

**Nommez vos intentions.** Une routine doit faire une chose, et son nom doit dire laquelle. Récolter du bois. Livrer au feu. Fabriquer un robot. Quand elles sont séparées, vous pouvez les réutiliser ; quand elles sont mélangées, vous les réécrivez à chaque fois.

**Et pensez à la réutilisation dès le départ.** Le jeu vous donne des fonctions, des variables et des tableaux, et le studio le dit lui-même : un programme utile devient la fondation du suivant. Une bonne routine de récolte écrite proprement à la deuxième heure vous servira encore à la vingtième.

## Les quatre raisons pour lesquelles votre robot s'arrête

Vous allez rencontrer les quatre, dans l'ordre.

**Il n'a plus de carburant.** La plus fréquente, et la plus bête. Intégrez le ravitaillement dans la routine plutôt que de compter sur vous-même pour y penser.

**Il attend quelque chose qui n'arrive jamais.** Un robot qui doit livrer à un endroit qui n'existe plus, ou récupérer une ressource que personne ne produit, reste planté là. Vérifiez la chaîne complète, pas seulement le maillon qui vous intéresse.

**Il exécute exactement ce que vous avez écrit.** C'est la plus vexante. Relisez l'ordre des blocs : dans un programme, faire les bonnes choses dans le mauvais ordre revient à faire les mauvaises choses.

**Ou il est coincé physiquement.** La planète a un relief, des volcans et des bâtiments. Une routine parfaite sur le papier peut envoyer un robot dans un cul-de-sac.

![Craftomation 101, les robots et le feu](/images/craftomation/screenshot-2.webp)

## Faire croître l'équipe sans tout casser

La progression du jeu repose sur une idée simple : des robots qui fabriquent des robots.

Le piège est d'agrandir trop vite. Chaque robot supplémentaire consomme, donc **doubler votre équipe double votre besoin en carburant et en chaleur**. Une équipe de quatre robots bien alimentée produit plus qu'une équipe de dix qui s'arrête toutes les deux minutes.

Ma règle empirique : n'ajoutez un robot que lorsque votre production de carburant a une marge visible. Si votre feu vacille, ce n'est pas le moment d'embaucher.

## Spécialiser plutôt que cloner

Il est tentant de donner la même routine à tous vos robots. C'est un réflexe et c'est une impasse.

Attribuez plutôt des rôles : un aux ressources brutes, un à la transformation, un à la logistique, un à l'entretien. Vous obtiendrez une chaîne où chaque maillon peut être corrigé indépendamment, au lieu d'un troupeau qui fait tout à moitié.

Et surtout, vous saurez immédiatement qui blâmer quand la production s'arrête.

## Vers la terraformation

L'objectif final est de replanter, de produire de l'oxygène et de repousser la glace.

Deux conseils pour cette phase.

**Ne plantez pas au hasard.** Les arbres sont à la fois une ressource et un objectif de terraformation. Une plantation placée près de vos circuits de récolte vous évitera des trajets, et les trajets sont ce qui consomme votre carburant.

**Automatisez la chaleur avant l'expansion.** Repousser la glace agrandit votre zone exploitable, mais une zone plus grande signifie des trajets plus longs, donc plus de carburant. La croissance doit suivre votre capacité énergétique, jamais l'inverse.

## Les graines, et pourquoi ça change tout

Les planètes sont générées procéduralement, et vous pouvez **partager une graine** avec un autre joueur.

Servez-vous en. Recommencer sur la même planète après avoir tout raté vous permet de mesurer précisément vos progrès, ce qui est impossible sur une carte différente. Et comparer sa solution avec celle de quelqu'un d'autre sur la même configuration est le meilleur moyen d'apprendre.

Si vous bloquez sur une planète, essayez-en une autre. Une disposition de ressources différente peut débloquer une idée que la première vous cachait.

![Craftomation 101, une planete generee](/images/craftomation/screenshot-6.webp)

## Le résumé

Le feu d'abord. Des routines courtes qu'on teste tout de suite. Un rôle par robot. Une croissance indexée sur votre production d'énergie. Et le réflexe, quand quelque chose ne marche pas, de regarder le robot faire plutôt que de relire les blocs.

Votre base tient combien de temps sans intervention ? Le record se dispute sur [le Discord d'InsertCoins](https://discord.gg/473FE3dWvw).
