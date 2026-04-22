// ===== 第二分区内容切换 + 右侧导航点激活 =====
(function() {
    // 获取元素
    const textArea = document.querySelector('.second .split-left .text-area');
    const imageElem = document.querySelector('.second .split-left .image-area .content-image');
    const videoElem = document.querySelector('.second .split-right .content-video');
    const buttons = document.querySelectorAll('.switch-btn');

    const containers = {
        text: textArea,
        image: document.querySelector('.second .split-left .image-area'),
        video: document.querySelector('.second .split-right .video-container')
    };

    // 内容数据
    const contentData = {
        1: {
            text: '',
            image: 'img/main/1.png',
            video: 'video/video1.mp4'
        },
        2: {
            text: '⚔️ 多难度副本boss战！从普通到地狱，体验层层进阶的激斗！',
            image: 'img/main/moster.png',
            video: 'video/card/cardbg02.mp4'
        },
        3: {
            text: '✨ 精美抽卡动画，直观感受抽卡的刺激与惊喜！✨',
            image: 'img/main/char.png',
            video: 'video/card/1.mp4'
        }
    };

    let currentId = 1;
    let fadeTimer = null;

    function removeFadeOut() {
        Object.values(containers).forEach(container => {
            if (container) container.classList.remove('fade-out');
        });
    }

    function switchContent(contentId) {
        if (contentId === currentId) return;
        const data = contentData[contentId];
        if (!data) return;

        if (fadeTimer) {
            clearTimeout(fadeTimer);
            fadeTimer = null;
            removeFadeOut();
        }

        // 淡出
        Object.values(containers).forEach(container => {
            if (container) container.classList.add('fade-out');
        });

        fadeTimer = setTimeout(() => {
            if (textArea) textArea.textContent = data.text;
            if (imageElem) imageElem.src = data.image;
            if (videoElem) {
                const wasPlaying = !videoElem.paused;
                videoElem.pause();
                videoElem.src = data.video;
                videoElem.load();
                if (wasPlaying) {
                    videoElem.play().catch(e => console.log("播放需交互", e));
                }
            }
            buttons.forEach(btn => {
                if (btn.dataset.content === String(contentId)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            removeFadeOut();
            currentId = contentId;
            fadeTimer = null;
        }, 280);
    }

    // 绑定切换事件
    const switchContainer = document.querySelector('.switch-buttons');
    if (switchContainer) {
        switchContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.switch-btn');
            if (!btn) return;
            const id = parseInt(btn.dataset.content);
            if (!isNaN(id)) switchContent(id);
        });
    }

    // 初始化默认内容
    switchContent(1);

    // ---------- 右侧导航点 + Intersection Observer 高亮 ----------
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dots a');

    function clearActiveDots() {
        navDots.forEach(dot => dot.classList.remove('active'));
    }

    function setActiveDot(index) {
        clearActiveDots();
        if (navDots[index]) navDots[index].classList.add('active');
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = Array.from(sections).indexOf(entry.target);
                if (idx !== -1) setActiveDot(idx);
            }
        });
    }, { threshold: 0.5, rootMargin: '-10px 0px -10px 0px' });

    sections.forEach(sec => observer.observe(sec));

    // 点击导航点平滑滚动
    navDots.forEach((dot, idx) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href');
            const targetSec = document.querySelector(targetId);
            if (targetSec) {
                targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActiveDot(idx);
            }
        });
    });

    // 初次加载时高亮当前可见分区
    window.addEventListener('load', () => {
        observer.disconnect();
        sections.forEach(sec => observer.observe(sec));
        const visible = Array.from(sections).find(sec => {
            const rect = sec.getBoundingClientRect();
            const winH = window.innerHeight || document.documentElement.clientHeight;
            return rect.top <= winH * 0.6 && rect.bottom >= winH * 0.4;
        });
        if (visible) {
            const idx = Array.from(sections).indexOf(visible);
            if (idx !== -1) setActiveDot(idx);
        }
    });
})();