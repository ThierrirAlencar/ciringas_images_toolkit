import {api_url} from "./control_handler"


const authStatus = document.getElementById('authStatus');
const authContainer = document.getElementById('account');
const header = document.getElementById("main-header");

const apiBase = api_url;

const apiFormEndpoints = {
    'api-form-remove-background': `${apiBase}/image/remove`,
    'api-form-rescale-image': `${apiBase}/image/rescale`,
    'api-form-apply-effect': `${apiBase}/image/effect`,
    'api-form-face-recognition': `${apiBase}/face/core`
};

Object.entries(apiFormEndpoints).forEach(([elementId, endpointUrl]) => {
    const form = document.getElementById(elementId);
    if (form) {
        form.setAttribute('action', endpointUrl);
    }
});

const hasJwtToken = () => Boolean(localStorage.getItem('ciringas_auth_token'));

const updateSidebarAuthState = () => {
    const isLoggedIn = hasJwtToken();

        document.querySelectorAll('.auth-user-only').forEach((element) => {
            element.classList.toggle('hidden', !isLoggedIn);
        });

        document.querySelectorAll('.auth-guest-only').forEach((element) => {
            element.classList.toggle('hidden', isLoggedIn);
        });

        if (authContainer) {
            authContainer.classList.toggle('hidden', isLoggedIn);
        }
    };

    const hideAuthContainer = () => {
        if (authContainer) {
            const cnt = document.getElementById("secondary-header-container");
            cnt.innerHTML = "";

            authContainer.classList.add('hidden');

            const profileWrapper = document.createElement("div");
            profileWrapper.className = "relative";

            const profileButton = document.createElement("button");
            profileButton.type = "button";
            profileButton.className = "rounded-xl border-2 border-violet-400 bg-violet-500/10 px-4 py-2.5 text-sm font-bold text-violet-300 cursor-pointer transition hover:border-violet-300 hover:bg-violet-500/20";
            profileButton.innerHTML = "profile";

            const menu = document.createElement("div");
            menu.className = "absolute right-0 top-full z-20 mt-2 hidden w-40 overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-lg shadow-violet-950/30";

            [
                { label: 'profile', action: 'profile' },
                { label: 'images', action: 'images' },
                { label: 'logout', action: 'logout' }
            ].forEach(({ label, action }) => {
                const item = document.createElement("button");
                item.type = "button";
                item.dataset.action = action;
                item.className = "block w-full border-b border-gray-800 bg-gray-900/90 px-3 py-2 text-left text-sm text-gray-200 transition hover:bg-gray-800 last:border-b-0";
                item.textContent = label;

                item.addEventListener('click', () => {
                    if (action === 'logout') {
                        localStorage.removeItem('ciringas_auth_token');
                        window.location.reload();
                        return;
                    }

                    if (action === 'profile') {
                        showAuthStatus('Perfil em desenvolvimento.', 'success');
                    }

                    if (action === 'images') {
                        showAuthStatus('Área de imagens em desenvolvimento.', 'success');
                    }

                    menu.classList.add('hidden');
                });

                menu.appendChild(item);
            });

            profileButton.addEventListener('click', () => {
                menu.classList.toggle('hidden');
            });

            document.addEventListener('click', (event) => {
                if (!profileWrapper.contains(event.target)) {
                    menu.classList.add('hidden');
                }
            });

            profileWrapper.appendChild(profileButton);
            profileWrapper.appendChild(menu);
            cnt.appendChild(profileWrapper);

            updateSidebarAuthState();
        }
    };

    if (hasJwtToken()) {
        hideAuthContainer();
    } else {
        updateSidebarAuthState();
    }

    const showAuthStatus = (message, kind = 'info') => {
        authStatus.classList.remove('hidden', 'border-red-800/60', 'bg-red-950/30', 'text-red-100', 'border-emerald-800/60', 'bg-emerald-950/30', 'text-emerald-100');

        if (kind === 'error') {
            authStatus.classList.add('border-red-800/60', 'bg-red-950/30', 'text-red-100');
        } else if (kind === 'success') {
            authStatus.classList.add('border-emerald-800/60', 'bg-emerald-950/30', 'text-emerald-100');
        }

        authStatus.textContent = message;
        authStatus.classList.remove('hidden');
    };

    const submitAuth = async (event, mode) => {
        event.preventDefault();

        const form = event.currentTarget;
        const payload = Object.fromEntries(new FormData(form).entries());

        if (!payload.email || !payload.password) {
            showAuthStatus('Preencha email e senha antes de continuar.', 'error');
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = mode === 'login' ? 'Entrando...' : 'Cadastrando...';

        try {
            const response = await fetch(`${apiBase}/user/${mode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password
                })
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data?.message || data?.description || 'Falha na autenticação.');
            }

            if (data?.Token) {
                localStorage.setItem('ciringas_auth_token', data.Token);
                showAuthStatus(mode === 'login' ? 'Login realizado com sucesso.' : 'Conta criada com sucesso.', 'success');
                hideAuthContainer();
            } else {
                showAuthStatus(mode === 'login' ? 'Login realizado com sucesso.' : 'Registro concluído com sucesso.', 'success');
            }

            updateSidebarAuthState();

            form.reset();
        } catch (error) {
            console.error(error);
            showAuthStatus(error.message || 'Não foi possível completar a autenticação.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    };

    document.getElementById('loginForm').addEventListener('submit', (event) => submitAuth(event, 'login'));
    document.getElementById('registerForm').addEventListener('submit', (event) => submitAuth(event, 'register'));

    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();