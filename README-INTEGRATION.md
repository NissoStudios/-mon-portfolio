# Intégration des 6 démos dans le portfolio

## Ce qui a changé

- `app/page.tsx` — 7 projets maintenant (E-Commercial, GestMedicert, TripBook, TransMap,
  Java Restaurant, Mobile Six, Blog-O-Platform). Chaque projet (sauf E-Commercial, qui garde
  son prototype intégré existant) a un bouton **"Launch interactive demo"** qui ouvre la vraie
  démo dans une fenêtre modale plein écran.
- `components/demos/` — les 6 fichiers de démo, chargés en *lazy loading* (`next/dynamic`,
  `ssr:false`) : ils ne sont téléchargés par le navigateur que si le visiteur clique sur
  "Launch interactive demo", donc ça n'alourdit pas le chargement initial du site.
- `tsconfig.json` — `allowJs: true` ajouté, sinon TypeScript refuse de résoudre les imports
  vers les fichiers `.jsx` (Java Restaurant, Mobile Six, Blog-O-Platform).
- `tailwind.config.ts` — le `content` scanne maintenant aussi les `.js`/`.jsx`, sinon les
  classes Tailwind utilisées uniquement dans ces fichiers seraient supprimées au build.
- `package.json` — 3 dépendances ajoutées : `recharts` (TransMap, Java Restaurant, Mobile Six),
  `chart.js` + `react-chartjs-2` (GestMedicert).

## Étapes

1. Dans ton projet Next.js actuel, remplace `app/page.tsx` par celui fourni ici.
2. Crée le dossier `components/demos/` à la racine du projet (à côté de `app/`) et copie-y
   les 6 fichiers fournis.
3. Remplace `tsconfig.json` et `tailwind.config.ts` par ceux fournis ici (ou reporte les deux
   changements — `allowJs` et le `content` glob — dans tes fichiers actuels si tu les as
   modifiés entre-temps).
4. Installe les nouvelles dépendances :
   ```
   npm install recharts chart.js react-chartjs-2
   ```
5. `npm run dev` et va sur `/` — clique sur "Launch interactive demo" sur n'importe quel
   projet (sauf E-Commercial, qui a déjà sa démo intégrée dans la section).

## À savoir / points d'honnêteté pour les fiches projet

- **GestMedicert** : je n'ai pas le zip du code source original de ce projet dans cette
  conversation (tu me l'avais partagé comme référence de stack). Le texte du projet dans
  `page.tsx` décrit ce que la démo montre, pas une analyse du vrai code — dis-moi si tu veux
  qu'on l'ajuste avec le vrai contexte (problème résolu, ton rôle, etc.), comme on l'a fait
  pour E-Commercial et TransMap.
- **Java Restaurant** et **Mobile Six** : je n'ai pas non plus leur code source original dans
  cette conversation — ces démos m'ont été fournies déjà construites. Les descriptions dans
  `page.tsx` sont déduites de ce que les démos montrent, pas d'une vraie analyse de projet.
  Si ce sont de vrais projets à toi, envoie-moi les zips et on refait le même travail de fond
  que pour TransMap/TripBook.
- **Blog-O-Platform** : le fichier de démo contient un commentaire qui décrit le vrai projet
  d'origine (vanilla JS, backend Express + Firebase, rate limiting, headers Helmet) — j'ai
  repris ces éléments tels quels dans la description.
