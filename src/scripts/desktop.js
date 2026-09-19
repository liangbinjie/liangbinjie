function login() {
    const loginScreen = document.getElementById('login-screen');
    if (!loginScreen) return;
    loginScreen.style.opacity = '0';
    setTimeout(() => { loginScreen.style.display = 'none'; }, 2000);
}

function logout() {
    const loginScreen = document.getElementById('login-screen');
    if (!loginScreen) return;
    loginScreen.style.display = 'flex';
    setTimeout(() => { loginScreen.style.opacity = '1'; }, 10);
}

function openProjects() {
    const folder = document.getElementById('projects-folder');
    if (!folder) return;
    folder.classList.add('open');
    folder.setAttribute('aria-hidden', 'false');
}

function closeProjects() {
    const folder = document.getElementById('projects-folder');
    if (!folder) return;
    folder.classList.remove('open');
    folder.setAttribute('aria-hidden', 'true');
}

function openCv() {
    const cv = document.getElementById('cv-window');
    if (!cv) return;
    cv.classList.add('open');
    cv.setAttribute('aria-hidden', 'false');
}

function closeCv() {
    const cv = document.getElementById('cv-window');
    if (!cv) return;
    cv.classList.remove('open');
    cv.setAttribute('aria-hidden', 'true');
}

function openGallery() {
    const gallery = document.getElementById('gallery-window');
    if (!gallery) return;
    showGalleryView('root');
    gallery.classList.add('open');
    gallery.setAttribute('aria-hidden', 'false');
}

function closeGallery() {
    const gallery = document.getElementById('gallery-window');
    if (!gallery) return;
    gallery.classList.remove('open');
    gallery.setAttribute('aria-hidden', 'true');
    closeImageViewer();
    showGalleryView('root');
}

function showGalleryView(view) {
    const views = document.querySelectorAll('[data-gallery-view]');
    const back = document.getElementById('gallery-back');
    const title = document.getElementById('gallery-title');

    views.forEach((panel) => {
        panel.hidden = panel.getAttribute('data-gallery-view') !== view;
    });

    const isRoot = view === 'root';
    if (back) back.hidden = isRoot;
    if (title) title.textContent = isRoot ? 'Gallery' : view.replace(/[-_]/g, ' ');
}

function openImageViewer(src, label) {
    const viewer = document.getElementById('image-viewer');
    const image = document.getElementById('image-viewer-img');
    const title = document.getElementById('image-viewer-title');
    if (!viewer || !image) return;

    image.src = src;
    image.alt = label || '';
    if (title) title.textContent = label || 'Photo';
    viewer.classList.add('open');
    viewer.setAttribute('aria-hidden', 'false');
}

function closeImageViewer() {
    const viewer = document.getElementById('image-viewer');
    const image = document.getElementById('image-viewer-img');
    if (!viewer) return;
    viewer.classList.remove('open');
    viewer.setAttribute('aria-hidden', 'true');
    if (image) image.removeAttribute('src');
}

function openBrowser() {
    const windowEl = document.getElementById('browser-window');
    const frame = document.getElementById('browser-frame');
    if (!windowEl) return;
    if (frame instanceof HTMLIFrameElement) {
        frame.src = 'https://www.google.com/webhp?igu=1';
    }
    windowEl.classList.add('open');
    windowEl.setAttribute('aria-hidden', 'false');
}

function closeBrowser() {
    const windowEl = document.getElementById('browser-window');
    const frame = document.getElementById('browser-frame');
    if (!windowEl) return;
    windowEl.classList.remove('open');
    windowEl.setAttribute('aria-hidden', 'true');
    if (frame instanceof HTMLIFrameElement) {
        frame.src = 'about:blank';
    }
}

function formatClock(date) {
    return date.toLocaleString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
}

function updateClock() {
    const clock = document.getElementById('menubar-clock');
    if (!clock) return;
    const now = new Date();
    clock.textContent = formatClock(now);
    clock.dateTime = now.toISOString();
}

updateClock();
setInterval(updateClock, 1000);

document.getElementById('login-button')?.addEventListener('click', login);
document.getElementById('logout-button')?.addEventListener('click', logout);
document.getElementById('projects-button')?.addEventListener('click', openProjects);
document.getElementById('projects-close')?.addEventListener('click', closeProjects);
document.getElementById('cv-button')?.addEventListener('click', openCv);
document.getElementById('cv-close')?.addEventListener('click', closeCv);
document.getElementById('gallery-button')?.addEventListener('click', openGallery);
document.getElementById('gallery-close')?.addEventListener('click', closeGallery);
document.getElementById('gallery-back')?.addEventListener('click', () => showGalleryView('root'));
document.getElementById('image-viewer-close')?.addEventListener('click', closeImageViewer);
document.getElementById('browser-button')?.addEventListener('click', openBrowser);
document.getElementById('browser-close')?.addEventListener('click', closeBrowser);

document.getElementById('gallery-window')?.addEventListener('click', (event) => {
    const folder = event.target.closest('[data-gallery-folder]');
    if (folder) {
        showGalleryView(folder.getAttribute('data-gallery-folder'));
        return;
    }

    const image = event.target.closest('[data-gallery-image]');
    if (image) {
        openImageViewer(
            image.getAttribute('data-gallery-image'),
            image.getAttribute('data-gallery-label'),
        );
    }
});
