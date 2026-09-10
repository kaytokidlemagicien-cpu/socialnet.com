SocialNet APK — version corrigée

- Utilise le même backend SecretNet: https://secretnet1-com.onrender.com
- Authentification persistante avec localStorage.
- Toutes les requêtes /api passent par le backend distant.
- Les images Cloudinary utilisent leurs URLs HTTPS.
- Le dossier www est prêt pour Capacitor.
- GitHub Actions construit automatiquement un APK debug.

Important: le backend SecretNet doit rester déployé et ses variables d’environnement (PostgreSQL/Cloudinary/mot de passe du site) doivent être configurées sur Render.
