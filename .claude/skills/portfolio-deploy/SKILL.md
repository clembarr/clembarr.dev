---
name: portfolio-deploy
description: Déploiement de clembarr.dev — vérifier la cohérence, valider le contenu, construire puis publier sur GitHub Pages. À utiliser dès qu'il s'agit de mettre le site en ligne, de publier des changements, de merger dev ou feed vers main avant une mise en production, de vérifier qu'un déploiement s'est bien passé, ou de diagnostiquer un site cassé après publication. Le déploiement ne part QUE de main : les sessions de code travaillent sur dev, les sessions de contenu sur feed, et les deux passent par un merge sur main. Also covers: deploy the site, publish to production, ship changes live, merge to main and redeploy, check the deployment, gh-pages publish, custom domain issues.
---

# Déploiement de clembarr.dev

Publication manuelle sur GitHub Pages, sans CI. Le dépôt n'a **ni test ni intégration
continue** : cette procédure est le seul contrôle avant la mise en ligne. Ce qui n'est pas
vérifié ici part en production.

Dépôt : `git@github.com:B-a-r-r/B-a-r-r.github.io.git` — branche publiée `gh-pages`,
domaine `clembarr.dev`.

## Le modèle de branches

| Branche | Usage |
|---|---|
| `dev` | sessions de code — structure, style, architecture (`portfolio-dev`) |
| `feed` | sessions de contenu — projets, articles, parcours (`portfolio-content`) |
| `main` | **la seule branche depuis laquelle on déploie** |
| `sandbox` | bac à sable visuel (`portfolio-art`) — **cul-de-sac, ne merge jamais** |
| `gh-pages` | générée par l'outil, jamais éditée à la main |

Le trajet est toujours le même : on travaille sur `dev` ou `feed`, ce qui est validé est
**mergé sur `main`**, et c'est `main` qui est publiée. **Ne jamais déployer depuis `dev`,
`feed` ou une branche de travail** — la branche `gh-pages` est écrasée en entier à chaque
publication, donc déployer depuis une branche incomplète met en ligne un site amputé, sans
avertissement.

⚠️ **`sandbox` ne remonte jamais.** Elle porte la route `/showcase` et des composants
expérimentaux ; un merge vers `main` publierait l'atelier. Si `git rev-list --count
main..sandbox` renvoie autre chose que 0, c'est normal et il n'y a rien à merger.

## Déroulé

Les étapes vont de la moins chère à la plus chère. S'arrêter à la première qui échoue.

### 1. Contrôles préalables

```bash
git status --porcelain          # doit être vide
git rev-parse --abbrev-ref HEAD # doit répondre : main
git fetch origin && git rev-list --left-right --count main...origin/main
git rev-list --count main..dev   # commits de dev non mergés
git rev-list --count main..feed  # commits de feed non mergés
```

- **Arbre de travail sale** → ne pas déployer. Ce qui n'est pas commité ne sera pas publié,
  et l'écart entre le dépôt et le site devient invisible.
- **Pas sur `main`** → s'arrêter et proposer le merge (étape 2), ne pas basculer d'office.
- **`main` en retard sur `origin/main`** → tirer d'abord.
- **`dev` ou `feed` en avance** → le signaler. Publier sans merger, c'est mettre en ligne un
  site qui ignore un travail terminé.

### 2. Le merge, si nécessaire

Un merge est un commit : **le proposer, ne pas l'exécuter d'office.** Annoncer ce qui va
entrer — `git log --oneline main..feed` — et attendre l'accord.

```bash
git checkout main
git merge feed        # ou dev, ou les deux successivement
```

En cas de conflit, s'arrêter et rendre la main. Un conflit sur du contenu se tranche par
l'auteur, pas par une résolution automatique.

### 3. Validation du contenu — barrière bloquante

```bash
npm run validate
```

**Zéro erreur exigé.** Ce script vérifie les clés relationnelles que TypeScript ne voit pas :
un `relatedProjects` qui cible un projet renommé compile parfaitement et casse un lien en
production.

Les avertissements ne bloquent pas, mais leur nombre ne doit pas augmenter. Ligne de base du
dépôt : **33 avertissements**.

⚠️ Si le compte d'erreurs n'est pas nul, **ne pas déployer** et renvoyer vers
`portfolio-content` — les erreurs de ce validateur sont presque toujours des clés de contenu.

### 4. Cohérence du code — informatif

```bash
npm run lint
```

Ligne de base : **3 erreurs, 16 avertissements**, toutes antérieures. Ne pas chercher le
zéro ; comparer au repère et signaler tout écart introduit par les changements en cours.

Si la commande répond `eslint: command not found`, les liens de `node_modules/.bin/` sont
cassés — ils pointent en absolu vers une ancienne machine. `npm install` les rétablit ; en
attendant : `node node_modules/eslint/bin/eslint.js .` et
`node node_modules/typescript/bin/tsc -b`. Le lien de `gh-pages` est relatif et fonctionne.

### 5. Publier

```bash
npm run deploy
```

`npm` déclenche `predeploy` automatiquement : `npm run sitemap` puis `npm run build`
(`tsc -b && vite build`). Le sitemap est généré **avant** le build pour que Vite le recopie
dans `dist/`, et `tsc -b` sert de contrôle de typage. Le build échoue → rien n'est publié.

Puis `gh-pages -d dist` remplace **l'intégralité** de la branche `gh-pages` par le contenu de
`dist/`.

Publier est une action **externe et irréversible** — le site est public. Demander l'accord
avant, sauf instruction contraire explicite.

### 6. Vérifier la mise en ligne

```bash
git fetch origin
git show origin/gh-pages:CNAME          # doit afficher clembarr.dev
curl -sI https://clembarr.dev | head -3 # HTTP/2 200
```

**Le contrôle du `CNAME` est le plus important.** `gh-pages` écrase toute la branche publiée :
si le fichier manque dans `dist/`, GitHub ne voit plus de domaine personnalisé et le
désactive, obligeant à le reconfigurer à la main dans les paramètres du dépôt.

Le fichier vit dans **`public/CNAME`**, d'où Vite le recopie à chaque build. Il était
auparavant à la racine du dépôt, où Vite ne le voyait pas : c'était la cause du domaine qui
disparaissait à chaque déploiement. **Ne jamais le remonter à la racine, ne pas le déplacer
hors de `public/`.**

GitHub Pages met une minute à propager. Un 404 immédiat n'est pas un échec ; un 404 après
deux minutes en est un.

Vérifier ensuite à l'œil : la home, un projet, un article, dans les deux thèmes. Le service
worker (`registerType: 'autoUpdate'`) peut servir une version en cache — recharger sans cache
en cas de doute.

## Écueils connus

| Écueil | Conséquence |
|---|---|
| Déployer depuis `dev` ou `feed` | `gh-pages` est écrasée en entier — le site perd le travail absent de la branche |
| Lancer `npm run deploy` sans avoir passé `validate` | `predeploy` ne lance que sitemap et build : rien ne vérifie les clés de contenu |
| `CNAME` déplacé hors de `public/` | Vite ne le recopie plus dans `dist/` : le domaine personnalisé saute à chaque publication |
| Liens profonds (`/blog/<slug>`) en accès direct | 404 à froid : GitHub Pages n'a pas de règle de réécriture et il n'existe pas de `public/404.html`. Écart connu, à proposer |
| `scripts/deploy.sh` (`npm run deploy:full`) | **Ne déploie pas.** Il nettoie, vérifie les types, construit, affiche les tailles et imprime des instructions. Il ne lance ni `validate` ni `gh-pages` |
| Éditer `gh-pages` à la main | Écrasé à la publication suivante |

## Après

Rendre compte : ce qui a été mergé, l'état du validateur et du lint, ce qui a été publié, et
le résultat des vérifications de l'étape 6 — avec la sortie réelle des commandes.

**Ne pas committer autre chose que le merge accordé.** La branche `gh-pages` est gérée par
l'outil ; ne pas la toucher.
