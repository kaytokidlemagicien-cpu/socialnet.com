"use strict";

const f = document.getElementById("loginForm");
const n = document.getElementById("userName");
const p = document.getElementById("sitePassword");
const b = document.getElementById("loginButton");
const e = document.getElementById("loginError");

function apiUrl(endpoint) {
    const base = String(window.SECRETNET_API_BASE || "").trim().replace(/\/+$/, "");
    return base + "/" + String(endpoint).replace(/^\/+/, "");
}

(async () => {
    const token = localStorage.getItem("sn_token");
    if (!token) return;

    try {
        const r = await fetch(apiUrl("/api/me"), {
            headers: { Authorization: "Bearer " + token }
        });
        if (r.ok) {
            location.replace("/index.html");
            return;
        }
    } catch (_) {}

    localStorage.removeItem("sn_token");
    localStorage.removeItem("sn_user");
})();

f.addEventListener("submit", async ev => {
    ev.preventDefault();
    e.textContent = "";

    const name = n.value.trim();
    const password = p.value;

    if (!name || !password) {
        e.textContent = "Entrez votre nom et votre mot de passe.";
        return;
    }

    b.disabled = true;
    b.textContent = "Connexion...";

    try {
        const r = await fetch(apiUrl("/api/enter"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password })
        });

        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error || "Mot de passe incorrect.");
        if (!d.token) throw new Error("Le serveur n’a pas fourni de session.");

        localStorage.setItem("sn_token", d.token);
        localStorage.setItem("sn_user", JSON.stringify(d.user || null));
        location.replace("/index.html");
    } catch (x) {
        e.textContent = x.message || "Impossible de se connecter.";
    } finally {
        b.disabled = false;
        b.textContent = "Connexion";
    }
});
