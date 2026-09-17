# Immoben

**Plateforme de suivi des pannes locatives pour gestionnaires immobiliers belges**

Immoben est un outil web moderne conçu pour simplifier la gestion des demandes de pannes et réparations dans le cadre de la gestion locative. Il offre deux interfaces distinctes :

- **Espace Locataire** : formulaire mobile prérempli accessible via lien unique/QR code
- **Espace Gestionnaire** : tableau de bord complet pour gérer biens, locataires, artisans et demandes

## ✨ Fonctionnalités principales

### Pour le locataire
- 📱 Formulaire mobile optimisé (accessible via lien unique ou QR code)
- ✅ Champs préremplis (nom, adresse, contact)
- 🏷️ Types de problèmes prédéfinis (fuite, chaudière, humidité, chauffage, électroménager, code EAN)
- 📷 Upload de photos (max 5) directement depuis le smartphone
- ⚡ Sélection du niveau d'urgence
- 💬 Lien copiable pour partage via WhatsApp

### Pour le gestionnaire
- 🏢 Gestion complète des **biens immobiliers** (CRUD)
- 👥 Gestion des **locataires** liés aux biens
- 🔧 Gestion des **artisans** avec artisan par défaut configurable
- 📥 **Tableau de bord** des demandes avec filtrage par statut
- 🔄 **Workflow de statut** : Nouveau → Validé → Envoyé à l'artisan → En cours → Résolu
- ✉️ Génération automatique de **messages pour artisans** (copier-coller)
- 🔑 **Parcours spécial pour demandes de code EAN** (sans artisan)
- 📊 Statistiques et historique complet
- 🎯 Génération de liens/QR codes uniques par logement

## 🏗️ Architecture

L'application est conçue pour être **multi-agences** dès le départ :

- Modèle de données séparant les **agences**, chaque agence possède ses propres biens, locataires, artisans et demandes
- Artisans **configurables** par agence (pas de dépendance hardcodée)
- Données de démonstration pour l'agence "Ben Gestion Locative"
- Prêt pour extension future (Immoweb, comptabilité, etc.)

## 🚀 Installation et lancement

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

```bash
# Cloner le projet (si ce n'est pas déjà fait)
git clone <repo-url>
cd immoben

# Installer les dépendances
npm install

# Initialiser la base de données SQLite
npm run db:push

# Peupler avec les données de démonstration
npm run db:seed
```

### Lancement en développement

```bash
npm run dev
```

L'application sera accessible sur **http://localhost:3000**

## 📖 Guide de démonstration

### 1. Accéder à l'espace gestionnaire

Ouvrez http://localhost:3000 et cliquez sur **"Espace Gestionnaire"**

Vous y trouverez :
- 5 biens préremplis à Bruxelles
- 5 locataires liés à ces biens
- 2 artisans (MaBuild comme artisan par défaut + Plomberie Express)
- 5 demandes d'exemple dans différents statuts

### 2. Gérer un bien et générer un lien locataire

1. Allez dans **Biens** depuis le menu
2. Cliquez sur un bien existant
3. Copiez le **lien de déclaration de panne** (bouton "Copier")
4. Optionnel : générez un **QR code** pour affichage physique

### 3. Soumettre une demande en tant que locataire

1. Collez le lien copié dans un nouvel onglet (ou scannez le QR code)
2. Le formulaire affiche les informations **préremplies** (nom du locataire, adresse)
3. Sélectionnez le **type de problème** (ex: "Fuite d'eau")
4. Ajoutez une **description** détaillée
5. Choisissez le niveau d'**urgence**
6. Prenez/ajoutez des **photos** (facultatif)
7. Cliquez sur **"Envoyer la demande"**

### 4. Traiter une demande côté gestionnaire

1. Retournez dans l'**Espace Gestionnaire**
2. La nouvelle demande apparaît avec le statut **"Nouveau"**
3. Cliquez sur la demande pour voir le **détail**
4. Actions disponibles :
   - **Valider** la demande
   - **Assigner un artisan** (sélection dans la liste)
   - **Copier le message artisan** (texte prégénéré avec toutes les infos)
   - **Marquer comme envoyé** à l'artisan
   - **Marquer comme en cours**
   - **Marquer comme résolu**
5. L'**historique** conserve toutes les étapes avec timestamps

### 5. Demande de code EAN (cas spécial)

1. Le formulaire locataire inclut l'option **"Demande code EAN"**
2. Ce type de demande **ne nécessite pas d'artisan**
3. Le gestionnaire valide et transmet directement le code au locataire
4. Workflow simplifié : Nouveau → Validé → Résolu

### 6. Ajouter un nouveau bien/locataire/artisan

Utilisez les boutons **"+ Nouveau"** dans chaque section :
- **Nouveau bien** : renseignez l'adresse, la ville, le code postal
- **Nouveau locataire** : liez-le à un bien existant
- **Nouvel artisan** : définissez sa spécialité et cochez "Par défaut" si souhaité

## 🗂️ Structure du projet

```
immoben/
├── app/
│   ├── api/              # Routes API (tickets, QR codes)
│   ├── demande/[token]/  # Formulaire locataire (frontend public)
│   ├── manager/          # Interface gestionnaire
│   │   ├── artisans/     # CRUD artisans
│   │   ├── properties/   # CRUD biens
│   │   ├── tenants/      # CRUD locataires
│   │   └── tickets/[id]/ # Détail et actions sur demande
│   ├── globals.css       # Styles globaux
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Page d'accueil
├── lib/
│   ├── db.ts             # Client Prisma
│   ├── types.ts          # Types et constantes (statuts, types de pannes)
│   └── utils.ts          # Utilitaires (formatage dates, etc.)
├── prisma/
│   ├── schema.prisma     # Schéma base de données
│   └── seed.ts           # Données de démonstration
├── public/
│   └── uploads/          # Photos uploadées (gitignored)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🛠️ Stack technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **Styles** : Tailwind CSS
- **Base de données** : SQLite (via Prisma ORM)
- **Icons** : Lucide React
- **QR Codes** : qrcode library
- **Upload d'images** : File API native + stockage local

## 🌐 Base de données

Le schéma Prisma supporte nativement **plusieurs agences** :

```prisma
Agency (agence)
  └── Property (bien) → token unique pour formulaire locataire
       └── Tenant (locataire)
  └── Artisan → isDefault flag
  └── Ticket (demande)
       ├── TicketPhoto
       └── TicketTimeline (historique des statuts)
```

## 📝 Types de pannes supportés

- 💧 Fuite d'eau
- 🔥 Chaudière
- 💨 Humidité
- ♨️ Chauffage
- 🔌 Électroménager
- ❓ Autre
- 📋 **Demande code EAN** (parcours spécial)

## 📊 États de workflow

1. **Nouveau** : demande soumise par le locataire
2. **Validé** : demande validée par le gestionnaire
3. **Envoyé à l'artisan** : message copié/envoyé
4. **En cours** : intervention planifiée/en cours
5. **Résolu** : problème corrigé

## 🔐 Données de démonstration

Après `npm run db:seed`, vous disposez de :

- 1 agence : **Ben Gestion Locative**
- 2 artisans : **MaBuild** (défaut) et **Plomberie Express**
- 5 biens à Bruxelles (Rue de la Loi, Avenue Louise, etc.)
- 5 locataires (Sophie, Marc, Julie, Thomas, Emma)
- 5 demandes d'exemple (fuite, chaudière, humidité, code EAN, électroménager)

Les **tokens de propriété** pour tester les formulaires locataires sont affichés dans la console après le seed.

## 🚧 Ce qui n'est PAS dans cette v1

- Pas d'envoi automatique email/SMS
- Pas d'intégration Outlook/Immoweb
- Pas d'API WhatsApp Business (lien manuel pour l'instant)
- Pas de comptabilité/gestion des paiements
- Pas d'authentification utilisateur (prévu pour plus tard)

## 🎯 Roadmap future

- [ ] Authentification multi-utilisateurs
- [ ] Envoi automatique email/SMS aux artisans
- [ ] API WhatsApp Business pour bot conversationnel
- [ ] Import/export Excel
- [ ] Intégration Immoweb pour recherche locataires
- [ ] Module comptabilité
- [ ] Notifications temps réel
- [ ] Application mobile native

## 📄 Licence

Usage privé pour Ben Gestion Locative. Tous droits réservés.

---

**Développé avec ❤️ pour simplifier la gestion locative en Belgique**
