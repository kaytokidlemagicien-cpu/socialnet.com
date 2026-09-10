"use strict";

/* =========================================================
   Shared SecretNet API + persistent authentication
   Works both in the normal website and inside Capacitor APK.
========================================================= */
const SocialNet = {
    apiBase() {
        const configured = String(window.SECRETNET_API_BASE || "").trim();
        return configured.replace(/\/+$/, "");
    },

    token() {
        return localStorage.getItem("sn_token") || "";
    },

    user() {
        try {
            return JSON.parse(localStorage.getItem("sn_user") || "null");
        } catch {
            return null;
        }
    },

    headers(extra = {}) {
        const t = this.token();
        return {
            ...extra,
            ...(t ? { Authorization: "Bearer " + t } : {})
        };
    },

    url(endpoint) {
        const value = String(endpoint || "");
        if (/^https?:\/\//i.test(value)) return value;
        const base = this.apiBase();
        return base + "/" + value.replace(/^\/+/, "");
    },

    async api(endpoint, options = {}) {
        const headers = this.headers(options.headers || {});
        const request = { ...options, headers };

        let response;
        try {
            response = await fetch(this.url(endpoint), request);
        } catch (error) {
            throw new Error("Impossible de contacter le serveur SecretNet. Vérifiez votre connexion Internet.");
        }

        const data = await response.json().catch(() => ({}));

        if (response.status === 401) {
            localStorage.removeItem("sn_token");
            localStorage.removeItem("sn_user");
            location.replace("/login.html");
            throw new Error(data.error || "Votre session a expiré. Reconnectez-vous.");
        }

        if (!response.ok) {
            throw new Error(data.error || "Une erreur est survenue.");
        }

        return data;
    },

    async me() {
        return this.api("/api/me");
    },

    requireLogin() {
        if (!this.token()) {
            location.replace("/login.html");
            return false;
        }
        return true;
    },

    async logout() {
        try {
            if (this.token()) {
                await this.api("/api/logout", { method: "POST" });
            }
        } catch (_) {
            // Even if the server cannot be reached, remove the local session.
        } finally {
            localStorage.removeItem("sn_token");
            localStorage.removeItem("sn_user");
            localStorage.removeItem("sn_admin_password");
            location.replace("/login.html");
        }
    },

    escape(t) {
        return String(t ?? "").replace(/[&<>"']/g, c => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[c]));
    },

    escapeAttr(t) {
        return this.escape(t).replace(/`/g, "&#096;");
    },

    date(d) {
        return new Date(d).toLocaleString("fr-TN", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    },

    avatarHTML(url, name = "") {
        const safe = this.escapeAttr(url || "");
        return url
            ? `<img class="avatar avatar-img" src="${safe}" alt="${this.escapeAttr(name)}" loading="lazy" onerror="this.onerror=null;this.outerHTML='<span class=\"avatar\">👤</span>'>`
            : `<span class="avatar">👤</span>`;
    }
};

window.SocialNet = SocialNet;
