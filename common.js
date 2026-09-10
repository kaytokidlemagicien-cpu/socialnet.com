"use strict";

if (SocialNet.requireLogin()) {
    (async () => {
        try {
            const data = await SocialNet.me();
            const user = data.user;
            if (!user) return;

            localStorage.setItem("sn_user", JSON.stringify(user));

            for (const id of ["topName", "sideName"]) {
                const el = document.getElementById(id);
                if (el) el.textContent = user.name || "...";
            }

            const topAvatar = document.getElementById("topAvatar");
            if (topAvatar && user.avatar_url) {
                topAvatar.outerHTML = SocialNet.avatarHTML(user.avatar_url, user.name)
                    .replace('class="avatar"', 'class="mini-avatar"');
            }

            const sideAvatar = document.getElementById("sideAvatar");
            if (sideAvatar && user.avatar_url) {
                sideAvatar.outerHTML = SocialNet.avatarHTML(user.avatar_url, user.name);
            }
        } catch (e) {
            console.error("Erreur utilisateur:", e);
        }
    })();
}

const logoutButton = document.getElementById("logoutButton");
if (logoutButton) logoutButton.addEventListener("click", () => SocialNet.logout());
