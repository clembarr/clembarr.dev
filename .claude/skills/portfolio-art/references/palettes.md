# Les deux dialectes

Déclaration : `src/index.css`, blocs `.light` (l.88) et `.dark` (l.117), mêmes noms de token.
Mécanique et pièges : `portfolio-dev/references/styling.md`. Ce fichier dit ce que les
couleurs **veulent dire**.

## Le jour — du papier

| Rôle | Valeur | Intention |
|---|---|---|
| `--color-tertiary` (accent) | `#479561` | Vert forêt sourd, botanique. Une couleur de pigment, pas d'écran |
| `--color-quaternary` (texte) | `#3D3E3C` | Presque noir, mais **chaud**. Jamais `#000` |
| `--color-primary` / `surface` | `#f4f4f4` | Blanc cassé. **Le blanc pur est réservé aux surfaces surélevées** — soulever une carte, c'est la blanchir |
| `--color-border` | `rgba(209,205,205,0.7)` | Gris **neutre**, sans teinte |
| ombres | 4 à 10 % d'opacité | Gaufrage, pas relief |

Aucun halo, aucune lueur, aucun violet. Le jour ne brille pas. L'impression visée est celle
d'un CV imprimé sur beau papier : calme, chaud, éditorial, peu contrasté.

## La nuit — un terminal

| Rôle | Valeur | Intention |
|---|---|---|
| `--color-tertiary` (accent) | `#7CFFC4` | Menthe phosphore. **N'existe que sur un écran** |
| `--color-primary` | `#1a1a1f` | Noir **bleuté**, pas neutre |
| `--color-border` | `rgba(124,255,196,0.1)` | **Teintée menthe** — chaque arête du site est filetée de phosphore |
| `--color-border-strong` | `rgba(124,255,196,0.25)` | Idem, appuyée |
| `--color-accent-hover` | `#9EFFD6` | **Plus clair** au survol, quand le jour va plus foncé |
| `--glow-sm/md/lg/text` | halos menthe | **Sans équivalent en clair** |
| `--color-accent-cyber` | `#53e9a6` | Sombre uniquement |
| `--color-accent-purple` | `#A855F7` | Sombre uniquement |
| ombres | 30 à 50 % | Vignettage profond, pas soulèvement |

Le seul ton partagé par les deux mondes est le lien, `#36bbf4`.

⚠️ `--color-tertiary: #7CFFC4; /* 71CBB3 */` — l'ancienne menthe, plus sourde, est conservée
en commentaire. La palette a été **saturée volontairement**. Ne pas la « calmer » en croyant
corriger une criardise.

## Ce que l'asymétrie signifie

Le sombre possède une famille d'effets entière que le clair n'a pas. Ce n'est pas un manque :
c'est ce qui fait que ce sont deux mondes et non deux luminosités. Les composants qui en
usent branchent explicitement — `${isDark ? 'shadow-(--glow-sm)' : ''}`.

Conséquence pratique pour tout élément neuf : **le décliner deux fois, en changeant de
registre et pas seulement de luminosité.** Une carte qui, en sombre, se contente d'un fond
plus foncé et d'une bordure grise n'appartient pas à ce site.

`gradientText` (`style.tsx`) traverse `--color-accent-cyber`, qui n'existe qu'en sombre : la
classe serait dégradée en clair. C'est une des raisons pour lesquelles elle n'est employée
nulle part.

## Vérifier

```bash
npm run build
```

Puis à l'œil, dans les deux thèmes. Aucun outil du dépôt ne vérifie qu'un token existe dans
les deux blocs.
