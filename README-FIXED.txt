SocialNet APK — version corrigée

- Utilise le même backend SecretNet: https://secretnet1-com.onrender.com
- Authentification persistante avec localStorage.
- Toutes les requêtes /api passent par le backend distant.
- Les images Cloudinary utilisent leurs URLs HTTPS.
- Le dossier www est prêt pour Capacitor.
- GitHub Actions construit automatiquement un APK debug.

Important: le backend SecretNet doit rester déployé et ses variables d’environnement (PostgreSQL/Cloudinary/mot de passe du site) doivent être configurées sur Render.


CORRECTION RESEND - MODE GRATUIT
--------------------------------
Si Resend est encore en mode test et refuse les e-mails vers d'autres destinataires,
le serveur ne fait plus échouer l'inscription. Avec ALLOW_UNVERIFIED_EMAIL_FALLBACK=true,
l'inscription crée le compte et connecte l'utilisateur immédiatement.
Quand un domaine d'envoi est vérifié dans Resend, mettre ALLOW_UNVERIFIED_EMAIL_FALLBACK=false
pour rendre à nouveau la vérification e-mail obligatoire.
