# Game Plan: Rasyne Worlds

## Risk Tasks

### 1. Placement interactif dans une scène Babylon
- **Why isolated:** Le clic sur des emplacements et le repositionnement doivent rester fiables tout en laissant la caméra orbitale utilisable.
- **Approach:** Utiliser des slots prédéfinis au sol, des meshes de mobilier procéduraux et un état unique de placement. Les objets ne sont pas soumis à une physique complexe ; leur position et leur rotation sont déterministes.
- **Verify:** Cliquer une pièce d’inventaire puis un slot libre place la pièce, le score et la mission se mettent à jour, et un second choix permet de remplacer/repositionner la pièce sans erreur de console.

## Main Build

Rasyne Worlds est une expérience 3D de composition intérieure : le visiteur part d’un « Starter Home », place cinq meubles artisanaux et débloque une « Skyline Suite ». Le jeu comprend une scène Babylon orbitale, des matériaux clairs et chaleureux, une progression visible, une sélection de matériau et de finition, une transmission du brief vers le Studio et un partage WhatsApp.

- **Assets needed:** Une cible visuelle de direction artistique ; mobilier, fenêtre, skyline, lampadaire et panneaux muraux générés de façon procédurale avec matériaux Babylon.
- **Verify:**
  - La caméra orbitale répond au glisser et au zoom sans empêcher le clic de placement.
  - Cinq pièces d’inventaire sont placables et la progression débloque la suite skyline.
  - Les contrôles matière et finition mettent visiblement à jour les nouvelles pièces.
  - Le HUD reste lisible, en anglais, français et arabe RTL, sans débordement mobile.
  - Aucun mesh manquant, aucune texture échouée et aucune erreur de console pendant la capture.
  - La scène reprend la palette ivoire, espresso, terracotta et laiton, l’angle de caméra et la densité de la cible visuelle.
  - Le mode `?demo` compose automatiquement la pièce pour la vérification visuelle.
