# Configuration du formulaire de contact avec Telegram

Le formulaire de contact de Chargeur-Rapide envoie les messages directement sur Telegram. Voici comment le configurer:

## Étape 1: Créer un bot Telegram

1. Ouvrez Telegram sur votre téléphone ou ordinateur
2. Recherchez **@BotFather** (c'est le bot officiel de Telegram pour créer des bots)
3. Démarrez une conversation avec lui et envoyez la commande:
   ```
   /newbot
   ```
4. Suivez les instructions:
   - Il vous demandera un nom pour votre bot (ex: "Chargeur Rapide Contact")
   - Puis un nom d'utilisateur qui doit finir par "bot" (ex: "chargeur_rapide_contact_bot")
5. Une fois créé, BotFather vous donnera un **TOKEN** qui ressemble à:
   ```
   123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   ```
   ⚠️ **GARDEZ CE TOKEN SECRET!**

## Étape 2: Obtenir votre Chat ID

1. Recherchez **@userinfobot** sur Telegram
2. Démarrez une conversation et envoyez-lui n'importe quel message
3. Il vous répondra avec votre **Chat ID** (un nombre comme `123456789`)

## Étape 3: Démarrer une conversation avec votre bot

1. Recherchez votre bot sur Telegram (le nom d'utilisateur que vous avez créé)
2. Cliquez sur "Démarrer" ou envoyez `/start`
3. **Important:** Vous devez démarrer la conversation sinon le bot ne pourra pas vous envoyer de messages!

## Étape 4: Configurer les variables d'environnement

1. Créez un fichier `.env.local` à la racine du projet (à côté de `package.json`)
2. Ajoutez-y ces lignes en remplaçant par vos vraies valeurs:

```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

## Étape 5: Redémarrer le serveur

1. Arrêtez le serveur de développement (Ctrl+C)
2. Relancez-le avec `npm run dev`
3. Testez le formulaire de contact!

## Test

1. Allez sur http://localhost:3000/contact
2. Remplissez le formulaire:
   - Prénom: Votre prénom
   - Email: votre@email.com
   - Message: Ceci est un test
   - Captcha: 9 (réponse à 2 + 7)
3. Cliquez sur "Envoyer"
4. Vous devriez recevoir un message sur Telegram! 🎉

## Déploiement en production

Lors du déploiement sur Vercel, Netlify ou autre:

1. Allez dans les paramètres de votre projet
2. Ajoutez les variables d'environnement:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
3. Redéployez votre site

## Dépannage

**Le message n'arrive pas:**
- Vérifiez que vous avez bien démarré une conversation avec votre bot
- Vérifiez que le TOKEN et CHAT_ID sont corrects dans `.env.local`
- Regardez les logs du serveur pour voir les erreurs
- Vérifiez que le fichier `.env.local` est à la bonne place (racine du projet)

**Erreur "Configuration incomplète":**
- Le fichier `.env.local` n'existe pas ou les variables ne sont pas définies
- Redémarrez le serveur après avoir créé/modifié `.env.local`

## Sécurité

⚠️ **IMPORTANT:**
- Ne partagez JAMAIS votre token de bot
- Ajoutez `.env.local` à votre `.gitignore` (c'est déjà fait par défaut avec Next.js)
- Ne commitez jamais vos secrets dans Git
