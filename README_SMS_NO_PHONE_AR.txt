SecretNet — SMS automatique sans saisie du numéro

- L’interface de connexion ne demande aucun numéro de téléphone.
- Android essaie de récupérer automatiquement le numéro de la ligne avec READ_PHONE_NUMBERS quand le système/le SIM l’expose.
- Si le numéro est disponible, il est envoyé au serveur SecretNet après connexion pour permettre le routage SMS.
- Internet disponible: messages via le serveur.
- Internet indisponible: messages privés via SMS natif, sans ouvrir l’application SMS.
- Les SMS entrants SecretNet commencent par SN1| et sont capturés par le receiver Android puis synchronisés vers le serveur lorsque Internet revient.
- Les groupes restent Internet-only dans cette version.

IMPORTANT
Android limite fortement SEND_SMS/RECEIVE_SMS et READ_PHONE_NUMBERS. Un téléphone peut refuser de fournir son propre numéro, et les permissions SMS sont des permissions dangereuses et hard-restricted selon la documentation Android actuelle.

Pour construire l’APK:
1. Installer Node.js et Android Studio.
2. Dans ce dossier: npm install
3. Configurer l’URL publique réelle du serveur avec window.SECRETNET_API_BASE si l’APK est servi depuis un domaine différent.
4. npx cap add android
5. npx cap sync android
6. npx cap open android
7. Dans Android Studio: Build > Build APK(s).
