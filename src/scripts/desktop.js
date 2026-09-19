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

function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
}

function getMusicTracks() {
    const node = document.getElementById('music-window');
    if (!node) return [];
    try {
        const tracks = JSON.parse(node.dataset.tracks || '[]');
        return Array.isArray(tracks) ? tracks : [];
    } catch {
        return [];
    }
}

const music = {
    tracks: [],
    index: 0,
    seeking: false,
};

function musicEls() {
    return {
        windowEl: document.getElementById('music-window'),
        audio: document.getElementById('music-audio'),
        vinyl: document.getElementById('vinyl-disc'),
        cover: document.getElementById('vinyl-cover'),
        tonearm: document.getElementById('vinyl-tonearm'),
        label: document.getElementById('music-track-label'),
        playIcon: document.getElementById('music-play-icon'),
        playButton: document.getElementById('music-play'),
        seek: document.getElementById('music-seek'),
        current: document.getElementById('music-current'),
        duration: document.getElementById('music-duration'),
        queue: document.getElementById('music-queue-list'),
    };
}

function updateMusicQueue() {
    const { queue } = musicEls();
    if (!queue) return;
    queue.querySelectorAll('[data-track-index]').forEach((item) => {
        const active = Number(item.getAttribute('data-track-index')) === music.index;
        item.classList.toggle('active', active);
        if (active) item.setAttribute('aria-current', 'true');
        else item.removeAttribute('aria-current');
    });
}

function loadMusicTrack(index, autoplay = false) {
    const { audio, cover, label } = musicEls();
    if (!(audio instanceof HTMLAudioElement) || music.tracks.length === 0) return;

    music.index = (index + music.tracks.length) % music.tracks.length;
    const track = music.tracks[music.index];
    audio.src = track.src;
    if (cover instanceof HTMLImageElement) cover.src = track.cover;
    if (label) label.textContent = `${track.artist} — ${track.title}`;
    updateMusicQueue();
    if (autoplay) {
        audio.play().catch(() => {});
    }
}

function setMusicPlaying(playing) {
    const { vinyl, tonearm, playIcon, playButton } = musicEls();
    vinyl?.classList.toggle('playing', playing);
    tonearm?.classList.toggle('playing', playing);
    if (playIcon) {
        playIcon.classList.toggle('fa-play', !playing);
        playIcon.classList.toggle('fa-pause', playing);
    }
    if (playButton) playButton.setAttribute('aria-label', playing ? 'Pause' : 'Play');
}

function openMusic() {
    const { windowEl } = musicEls();
    if (!windowEl) return;
    windowEl.classList.add('open');
    windowEl.setAttribute('aria-hidden', 'false');
}

function closeMusic() {
    const { windowEl, audio } = musicEls();
    if (!windowEl) return;
    windowEl.classList.remove('open');
    windowEl.setAttribute('aria-hidden', 'true');
    if (audio instanceof HTMLAudioElement) audio.pause();
}

function toggleMusic() {
    const { audio } = musicEls();
    if (!(audio instanceof HTMLAudioElement)) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
}

function initMusicPlayer() {
    music.tracks = getMusicTracks();
    const { audio, seek } = musicEls();
    if (!(audio instanceof HTMLAudioElement)) return;

    if (music.tracks.length > 0 && !audio.getAttribute('src')) {
        loadMusicTrack(0);
    }

    audio.addEventListener('play', () => setMusicPlaying(true));
    audio.addEventListener('pause', () => setMusicPlaying(false));
    audio.addEventListener('ended', () => loadMusicTrack(music.index + 1, true));
    audio.addEventListener('loadedmetadata', () => {
        const { duration } = musicEls();
        if (duration) duration.textContent = formatTime(audio.duration);
        if (seek instanceof HTMLInputElement) seek.value = '0';
    });
    audio.addEventListener('timeupdate', () => {
        const { current } = musicEls();
        if (current) current.textContent = formatTime(audio.currentTime);
        if (music.seeking || !(seek instanceof HTMLInputElement) || !audio.duration) return;
        seek.value = String((audio.currentTime / audio.duration) * 100);
    });

    if (seek instanceof HTMLInputElement) {
        seek.addEventListener('pointerdown', () => { music.seeking = true; });
        seek.addEventListener('pointerup', () => { music.seeking = false; });
        seek.addEventListener('input', () => {
            if (!audio.duration) return;
            audio.currentTime = (Number(seek.value) / 100) * audio.duration;
        });
    }

    document.getElementById('music-play')?.addEventListener('click', toggleMusic);
    document.getElementById('music-prev')?.addEventListener('click', () => {
        loadMusicTrack(music.index - 1, !audio.paused);
    });
    document.getElementById('music-next')?.addEventListener('click', () => {
        loadMusicTrack(music.index + 1, !audio.paused);
    });
    document.getElementById('music-queue-list')?.addEventListener('click', (event) => {
        const item = event.target.closest('[data-track-index]');
        if (!item) return;
        const nextIndex = Number(item.getAttribute('data-track-index'));
        if (!Number.isInteger(nextIndex)) return;
        loadMusicTrack(nextIndex, true);
    });
    updateMusicQueue();
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
document.getElementById('music-button')?.addEventListener('click', openMusic);
document.getElementById('music-close')?.addEventListener('click', closeMusic);
initMusicPlayer();

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
