"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // public/functions/controlRange.js
  var require_controlRange = __commonJS({
    "public/functions/controlRange.js"() {
      "use strict";
      var range = document.getElementById("Amount_Input");
      var select = document.getElementById("select1");
      select.addEventListener("change", () => {
        switch (Number(select.value)) {
          case 2:
            range.min = 1;
            range.max = 7;
            range.value = 5;
            break;
          case 3:
            range.min = 1;
            range.max = 15;
            range.value = 9;
            break;
          case 4:
            range.min = 10;
            range.max = 64;
            range.value = 16;
            break;
          default:
            range.min = 0;
            range.max = 0;
            range.value = 0;
            break;
        }
      });
    }
  });

  // public/functions/forms.js
  async function downloadImage(psUrl) {
    try {
      var fileUrl = psUrl;
      const url = baseUrl + "/image/download";
      const data = {
        fileUrl
      };
      const request = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
          // Especifica o tipo de conteúdo como JSON
        },
        body: JSON.stringify(data)
      });
      const blob = await request.blob();
      const file_type = blob.type.replace("image/", "");
      const res_url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = res_url;
      link.download = `image.${file_type}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(res_url);
    } catch (err) {
      console.log(err);
    }
  }
  var baseUrl;
  var init_forms = __esm({
    "public/functions/forms.js"() {
      "use strict";
      baseUrl = typeof window !== "undefined" && window.__API_BASE__ || "http://127.0.0.1:4545";
    }
  });

  // public/functions/apiCalls/ApplyEffectToImage.js
  var require_ApplyEffectToImage = __commonJS({
    "public/functions/apiCalls/ApplyEffectToImage.js"() {
      "use strict";
      init_forms();
      document.getElementById("form2").addEventListener("submit", async function(event) {
        event.preventDefault();
        const form = document.getElementById("form2");
        const formData = new FormData(form);
        try {
          const response = await fetch(baseUrl + "/image/effect", {
            method: "POST",
            body: formData
            // Envia os dados do formulário
          });
          if (response.ok) {
            const result = await response.json();
            console.log("Imagem processada:", result);
            const ptUrl = result.ResultFromPython;
            console.log("image is at: " + ptUrl);
            await downloadImage(ptUrl);
          } else {
            console.error("Erro ao processar a imagem:", response.statusText);
          }
        } catch (error) {
          console.error("Erro na requisi\xE7\xE3o:", error);
        }
      });
    }
  });

  // public/functions/apiCalls/BgRemove.js
  var require_BgRemove = __commonJS({
    "public/functions/apiCalls/BgRemove.js"() {
      "use strict";
      init_forms();
      document.getElementById("form3").addEventListener("submit", async function(event) {
        event.preventDefault();
        const form = document.getElementById("form3");
        const formData = new FormData(form);
        try {
          const response = await fetch(baseUrl + "/image/remove", {
            method: "POST",
            body: formData
            // Envia os dados do formulário
          });
          if (response.ok) {
            const result = await response.json();
            console.log("Imagem processada:", result);
            const ptUrl = result.ResultFromPython.replace(" ", "");
            console.log("image is at: " + ptUrl);
            await downloadImage(ptUrl);
          } else {
            console.error("Erro ao processar a imagem:", response.statusText);
          }
        } catch (error) {
          console.error("Erro na requisi\xE7\xE3o:", error);
        }
      });
    }
  });

  // public/functions/apiCalls/ReescaleImage.js
  var require_ReescaleImage = __commonJS({
    "public/functions/apiCalls/ReescaleImage.js"() {
      "use strict";
      init_forms();
      document.getElementById("form1").addEventListener("submit", async function(event) {
        event.preventDefault();
        const form = document.getElementById("form1");
        const formData = new FormData(form);
        try {
          const response = await fetch(baseUrl + "/image/rescale", {
            method: "POST",
            body: formData
          });
          if (response.ok) {
            const result = await response.json();
            console.log("Imagem processada:", result);
            const ptUrl = result.ResultFromPython;
            console.log("image is at: " + ptUrl);
            await downloadImage(ptUrl);
          } else {
            console.error("Erro ao processar a imagem:", response.statusText);
          }
        } catch (error) {
          console.error("Erro de conex\xE3o:", error);
        }
      });
    }
  });

  // public/control_handler.js
  var control_handler_exports = {};
  __export(control_handler_exports, {
    HOST: () => HOST,
    PORT: () => PORT,
    api_url: () => api_url,
    baseUrl: () => baseUrl2,
    downloadImage: () => downloadImage
  });
  __reExport(control_handler_exports, __toESM(require_controlRange()));
  __reExport(control_handler_exports, __toESM(require_ApplyEffectToImage()));
  __reExport(control_handler_exports, __toESM(require_BgRemove()));
  __reExport(control_handler_exports, __toESM(require_ReescaleImage()));
  init_forms();
  var DEFAULT_API_BASE = "http://127.0.0.1:4545";
  var runtimeApiBase = typeof window !== "undefined" && window.__API_BASE__ ? window.__API_BASE__ : DEFAULT_API_BASE;
  var api_url = runtimeApiBase;
  var baseUrl2 = runtimeApiBase;
  var HOST = "127.0.0.1";
  var PORT = "4545";

  // public/main.js
  var authStatus = document.getElementById("authStatus");
  var authContainer = document.getElementById("account");
  var header = document.getElementById("main-header");
  var apiFormEndpoints = {
    "api-form-remove-background": `${api_url}/image/remove`,
    "api-form-rescale-image": `${api_url}/image/rescale`,
    "api-form-apply-effect": `${api_url}/image/effect`,
    "api-form-face-recognition": `${api_url}/face/core`
  };
  var apiAnchorEndpoints = {
    "api-link-docs": `${api_url}/docs`,
    "footer-link-docs": `${api_url}/docs`,
    "footer-link-api": `${api_url}`,
    "footer-link-github": "https://github.com/ThierrirAlencar"
  };
  Object.entries(apiFormEndpoints).forEach(([elementId, endpointUrl]) => {
    const form = document.getElementById(elementId);
    if (form) {
      form.setAttribute("action", endpointUrl);
    }
  });
  Object.entries(apiAnchorEndpoints).forEach(([elementId, hrefUrl]) => {
    const anchor = document.getElementById(elementId);
    if (anchor) {
      anchor.setAttribute("href", hrefUrl);
    }
  });
  var hasJwtToken = () => Boolean(localStorage.getItem("ciringas_auth_token"));
  var updateSidebarAuthState = () => {
    const isLoggedIn = hasJwtToken();
    document.querySelectorAll(".auth-user-only").forEach((element) => {
      element.classList.toggle("hidden", !isLoggedIn);
    });
    document.querySelectorAll(".auth-guest-only").forEach((element) => {
      element.classList.toggle("hidden", isLoggedIn);
    });
    if (authContainer) {
      authContainer.classList.toggle("hidden", isLoggedIn);
    }
  };
  function hideAuthContainer() {
    if (authContainer) {
      const cnt = document.getElementById("secondary-header-container");
      if (cnt) cnt.innerHTML = "";
      authContainer.classList.add("hidden");
      const profileWrapper = document.createElement("div");
      profileWrapper.className = "relative";
      const profileButton = document.createElement("button");
      profileButton.type = "button";
      profileButton.className = "rounded-xl border-2 border-violet-400 bg-violet-500/10 px-4 py-2.5 text-sm font-bold text-violet-300 cursor-pointer transition hover:border-violet-300 hover:bg-violet-500/20";
      profileButton.innerHTML = "profile";
      const menu = document.createElement("div");
      menu.className = "absolute right-0 top-full z-20 mt-2 hidden w-40 overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-lg shadow-violet-950/30";
      [
        { label: "profile", action: "profile" },
        { label: "images", action: "images" },
        { label: "logout", action: "logout" }
      ].forEach(({ label, action }) => {
        const item = document.createElement("button");
        item.type = "button";
        item.dataset.action = action;
        item.className = "block w-full border-b border-gray-800 bg-gray-900/90 px-3 py-2 text-left text-sm text-gray-200 transition hover:bg-gray-800 last:border-b-0";
        item.textContent = label;
        item.addEventListener("click", () => {
          if (action === "logout") {
            localStorage.removeItem("ciringas_auth_token");
            window.location.reload();
            return;
          }
          if (action === "profile") {
            showAuthStatus("Perfil em desenvolvimento.", "success");
          }
          if (action === "images") {
            showAuthStatus("\xC1rea de imagens em desenvolvimento.", "success");
          }
          menu.classList.add("hidden");
        });
        menu.appendChild(item);
      });
      profileButton.addEventListener("click", () => {
        menu.classList.toggle("hidden");
      });
      document.addEventListener("click", (event) => {
        if (!profileWrapper.contains(event.target)) {
          menu.classList.add("hidden");
        }
      });
      profileWrapper.appendChild(profileButton);
      profileWrapper.appendChild(menu);
      cnt.appendChild(profileWrapper);
      updateSidebarAuthState();
    }
  }
  if (hasJwtToken()) {
    hideAuthContainer();
  } else {
    updateSidebarAuthState();
  }
  function showAuthStatus(message, kind = "info") {
    if (!authStatus) return;
    authStatus.classList.remove("hidden", "border-red-800/60", "bg-red-950/30", "text-red-100", "border-emerald-800/60", "bg-emerald-950/30", "text-emerald-100");
    if (kind === "error") {
      authStatus.classList.add("border-red-800/60", "bg-red-950/30", "text-red-100");
    } else if (kind === "success") {
      authStatus.classList.add("border-emerald-800/60", "bg-emerald-950/30", "text-emerald-100");
    }
    authStatus.textContent = message;
    authStatus.classList.remove("hidden");
  }
  async function submitAuth(event, mode) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    if (!payload.email || !payload.password) {
      showAuthStatus("Preencha email e senha antes de continuar.", "error");
      return;
    }
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = mode === "login" ? "Entrando..." : "Cadastrando...";
    try {
      const response = await fetch(`${api_url}/user/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.message || data?.description || "Falha na autentica\xE7\xE3o.");
      }
      if (data?.Token) {
        localStorage.setItem("ciringas_auth_token", data.Token);
        showAuthStatus(mode === "login" ? "Login realizado com sucesso." : "Conta criada com sucesso.", "success");
        hideAuthContainer();
      } else {
        showAuthStatus(mode === "login" ? "Login realizado com sucesso." : "Registro conclu\xEDdo com sucesso.", "success");
      }
      updateSidebarAuthState();
      form.reset();
    } catch (error) {
      console.error(error);
      showAuthStatus(error.message || "N\xE3o foi poss\xEDvel completar a autentica\xE7\xE3o.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }
  document.getElementById("loginForm")?.addEventListener("submit", (event) => submitAuth(event, "login"));
  document.getElementById("registerForm")?.addEventListener("submit", (event) => submitAuth(event, "register"));
  var footerYear = document.getElementById("footer-year");
  if (footerYear) footerYear.textContent = (/* @__PURE__ */ new Date()).getFullYear();
})();
