 
 
 // Sidebar / mobile navigation
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarOpenBtn = document.getElementById('sidebarOpen');
    const sidebarCloseBtn = document.getElementById('sidebarClose');

    const openSidebar = () => {
        sidebar.classList.remove('-translate-x-full');
        sidebarOverlay.classList.remove('hidden');
    };

    const closeSidebar = () => {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
    };

    sidebarOpenBtn?.addEventListener('click', openSidebar);
    sidebarCloseBtn?.addEventListener('click', closeSidebar);
    sidebarOverlay?.addEventListener('click', closeSidebar);

    const handleSidebarLogout = () => {
        localStorage.removeItem('ciringas_auth_token');
        updateSidebarAuthState();
        window.location.reload();
    };

    document.querySelector('[data-sidebar-logout]')?.addEventListener('click', handleSidebarLogout);

    sidebar?.querySelectorAll('a.sidebar-link').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) closeSidebar();
        });
    });

    updateSidebarAuthState();

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            sidebar.classList.remove('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
        } else {
            sidebar.classList.add('-translate-x-full');
        }
    });