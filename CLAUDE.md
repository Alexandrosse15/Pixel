# InsertCoins.press — règles de rédaction

Média jeu vidéo indépendant, FR + EN. Articles en markdown dans `content/articles/` (FR) et `content/articles/en/` (EN). Chaque article a une version FR et une version EN.

## Règles absolues (jamais d'exception)

- **Zéro em dash** (—). Utiliser deux-points, virgules, parenthèses.
- **Zéro emoji**, nulle part, même si une source en contient.
- **Zéro trace d'IA / Claude** : jamais mentionner l'IA, Claude, "généré", ni dans le contenu, ni dans les commits, ni les titres.
- **Ne jamais inventer** : un fait, une note, une citation, un combo. Vérifier sur le web.
- **Vérifier CHAQUE chiffre avant publication, surtout ceux du studio.** Un chiffre de communiqué (millions de joueurs, wishlists, ventes, "X inscrits") n'est pas une donnée d'activité. Ne JAMAIS convertir un cumul en communauté vivante. Pour tout jeu déjà sorti, contrôler la fréquentation réelle avant d'en faire un argument de note :
  - joueurs connectés : `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=APPID`
  - réception : `https://store.steampowered.com/appreviews/APPID?json=1&language=all&num_per_page=0`
  Si le chiffre vient du studio, l'attribuer explicitement ("le studio revendique") et donner la mesure réelle à côté. Cas d'école : Soulbound: Online (un million d'inscrits navigateur revendiqués, 86 joueurs connectés sur Steam), The Ranchers (contenu de campagne absent du jeu livré). Dans les deux cas c'est un lecteur qui a corrigé le média, ce qui ne doit plus arriver.
- **En cas d'erreur publiée** : bandeau de correction daté en tête d'article, explication de l'erreur sans se défausser, chiffres réels ajoutés, note révisée, FR et EN.
- **L'auteur joue à TOUS les jeux qu'il fait tester.** Un article en catégorie `tests` avec une note est donc toujours fondé sur des parties réelles. Ne JAMAIS écrire qu'on n'a pas joué, ni "cette note est notre appréciation faute d'avoir joué", ni "pas un consensus de joueurs" comme justification de la note. L'absence d'avis Steam se mentionne uniquement comme contexte (le jeu vient de sortir, la communauté n'a pas encore tranché), jamais comme base du jugement.
- **Preview vs test** : `previews` = jeu pas encore sorti ou pas encore joué, sans note. `tests` = joué, avec note. En cas de doute, demander.
- **Chaque article invite au Discord** : `https://discord.gg/473FE3dWvw`. L'invitation se place en fin d'article, après la dernière image. **Formulation variée à chaque fois**, jamais la même phrase recopiée (voir règle anti-template n°5 sur les footers identiques). Elle doit s'accrocher au sujet de l'article quand c'est possible.
- **git push immédiatement après chaque commit**. Message de commit en français, sans mention d'IA.
- Avant chaque commit : vérifier 0 em dash, 0 emoji, et `npm run build` OK.

## Règles anti-template (priorité haute — éviter le style "IA détectable")

Le contenu ne doit PAS se ressembler d'un article à l'autre. Ces règles priment sur toute habitude de structure.

1. **Casser le squelette.** Ne PAS réutiliser la même architecture (Contexte → Gameplay → Technique → Verdict) à chaque fois. Varier l'ordre, le nombre et surtout les **titres de section** (les rendre personnels, concrets, évocateurs, pas génériques). Parfois pas de sous-titres du tout, un texte qui coule.
2. **Bannir les phrases-tics.** Interdits ou à très forte parcimonie : "Le coeur du jeu, c'est", "Ce qui distingue X, c'est", "Il faut néanmoins être lucide", "Ses limites tiennent à", "Mais dans son registre, celui de", "à réserver à ceux qui", "à double tranchant", "bouffée de fraîcheur", "redoutablement efficace", "à mille lieues de", "diablement", "pour peu que", "n'a rien d'un hasard", "sans jamais trahir". Varier chaque accroche.
3. **Varier le rythme.** Alterner phrases courtes, très courtes, et longues. Éviter le tricolon systématique (trois éléments) et le mécanisme "deux paragraphes positifs puis un Mais nuancé".
4. **Injecter du concret et du vécu.** Au moins : un moment de jeu précis vécu, un chiffre réel, une comparaison personnelle, une opinion tranchée, parfois de l'humour et du "je". Le concret et le vécu ne s'imitent pas facilement : c'est ce qui rend humain. Le modèle à suivre : la chronique Toy Story 5 (voix perso, anecdotes vraies).
5. **Pas de FAQ automatique** à chaque article, pas de footer identique répété ("*Test réalisé sur la version PC*" à éviter en systématique). La note vient du frontmatter `score` : ne PAS écrire "Note : X/10" en dur ni le verdict en gras formaté à chaque fois. Finir de façon naturelle et variée.
6. **Longueur variable** selon le jeu et ce qu'on a à dire, pas un calibrage uniforme.
7. **Cadence.** Éviter de publier une dizaine de tests au format identique le même jour : c'est le signal d'automatisation le plus visible. Mieux vaut moins, plus variés, plus travaillés.

## Frontmatter (SEO)

- `seoTitle` commençant par le nom nu du jeu.
- `gameName` EXACT (alimente le hub `/jeu/[slug]`).
- `excerpt` < 155 caractères, accrocheur (pas un résumé).
- `score` seulement pour les tests (cinema peut en avoir). Preview/dossier : pas de score.
- `coverImage` en webp local. Images tirées d'IGDB puis Steam, converties en webp (PIL, quality 82).

## Workflow

L'utilisateur donne souvent juste nom du jeu + angle. Faire recherche web (nom exact, studio, statut, genre, réception), images, rédaction FR + EN selon les règles ci-dessus. Vérifier les doublons (article déjà existant) avant d'écrire. Signaler tout écart (jeu introuvable, pas sorti, angle factuellement faux).

## Affiliation / pub

- Lien Gamesplanet (`buyUrl` avec `?ref=insertcoins`) uniquement si le jeu y est réellement vendu (vérifier). Jamais de lien mort.
- Pub AdSense en bandeau, guides (A/B/C) et tests (C bas de page) uniquement.
