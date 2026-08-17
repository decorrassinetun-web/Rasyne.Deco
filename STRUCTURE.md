# Rasyne Worlds — Architecture

La route React `/worlds` cadre le jeu, affiche les commandes et conserve le brief à transmettre. Le composant `GameCanvas` possède le cycle de vie Babylon ; il initialise une seule scène, transmet les événements de jeu au cadre React et libère le moteur au démontage.

| Module | Responsabilité |
|---|---|
| `client/src/pages/Worlds.tsx` | HUD trilingue, sélection des pièces, progression, partage Studio/WhatsApp. |
| `client/src/components/GameCanvas.tsx` | Cycle de vie sécurisé du canvas Babylon, redimensionnement et pont d’événements. |
| `client/src/game/scene.ts` | Création de la scène, caméra, lumière, décor et opérations de placement. |
| `client/src/game/FurnitureFactory.ts` | Fabrication des meshes procéduraux et application des matériaux. |
| `client/src/game/WorldState.ts` | Règles déterministes : inventaire, slots, score, niveau et brief. |
| `client/src/lib/worlds.ts` | Sérialisation du brief World vers Studio et WhatsApp. |

Les règles de jeu restent dans les modules TypeScript purs. React ne manipule pas les meshes directement ; il observe seulement les changements de l’état de jeu.
