// ===== mains.js (三分区版本 - 优化) =====

// --- loader 动画点击切换 ---
const eggshell = document.querySelector('.loader');
if (eggshell) {
    eggshell.addEventListener('click', function () {
        this.classList.remove('loader');
        this.classList.add('loader-end');
    });
}

// --- 第二分区内容切换 (保留原逻辑) ---
const textArea = document.querySelector('.second .split-left .text-area');
const imageArea = document.querySelector('.second .split-left .image-area img');
const video = document.querySelector('.second .split-right .content-video');
const buttons = document.querySelectorAll('.switch-btn');

const containers = {
    text: document.querySelector('.second .split-left .text-area'),
    image: document.querySelector('.second .split-left .image-area'),
    video: document.querySelector('.second .split-right .video-container')
};

const contentData = {
    1: {
        text: '',
        image: 'img/main/1.png',
        video: ''
    },
    2: {
        text: '多难度副本boss战！从普通到地狱，体验层层进阶的激斗！',
        image: 'img/main/moster.png',
        video: 'video/card/cardbg02.mp4'
    },
    3: {
        text: '精美抽卡动画，直观感受抽卡的刺激与惊喜！',
        image: 'img/main/char.png',
        video: 'video/card/1.mp4'
    }
};

let currentContentId = 1;
let fadeTimer = null;

function removeFadeOut() {
    Object.values(containers).forEach(container => {
        if (container) container.classList.remove('fade-out');
    });
}

function switchContent(contentId) {
    if (contentId === currentContentId) return;
    const data = contentData[contentId];
    if (!data) return;

    if (fadeTimer) {
        clearTimeout(fadeTimer);
        fadeTimer = null;
        removeFadeOut();
    }

    Object.values(containers).forEach(container => {
        if (container) container.classList.add('fade-out');
    });

    fadeTimer = setTimeout(() => {
        if (textArea) textArea.textContent = data.text;
        if (imageArea) imageArea.src = data.image;
        if (video) {
            video.pause();
            video.src = data.video;
            video.load();
        }
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.content === String(contentId));
        });
        removeFadeOut();
        currentContentId = contentId;
        fadeTimer = null;
    }, 300);
}

document.querySelector('.switch-buttons')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.switch-btn');
    if (!btn) return;
    const contentId = parseInt(btn.dataset.content);
    if (!isNaN(contentId)) switchContent(contentId);
});

document.addEventListener('DOMContentLoaded', () => {
    switchContent(1);
});

// --- 右侧导航点激活（使用 Intersection Observer，取代滚动监听）---
const sections = document.querySelectorAll('.section');
const navDots = document.querySelectorAll('.nav-dots a');

function clearNavActive() {
    navDots.forEach(dot => dot.classList.remove('active'));
}

function setActiveNav(index) {
    clearNavActive();
    if (navDots[index]) navDots[index].classList.add('active');
}

// 创建观察者：当任意 section 进入视口 50% 时激活对应导航点
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target);
            if (index !== -1) setActiveNav(index);
        }
    });
}, {
    threshold: 0.5,      // 50% 可见时触发
    rootMargin: '-10px 0px -10px 0px' // 微调边界，避免切换过于敏感
});

sections.forEach(section => observer.observe(section));

// 点击导航点平滑滚动
navDots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = dot.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // 手动激活（因为滚动时 observer 会自动更新，但为了即时反馈可手动设置）
            setActiveNav(index);
        }
    });
});

// 确保图片加载完成后重新计算 IntersectionObserver（无需额外操作，因为 observer 自动响应布局变化）
window.addEventListener('load', () => {
    // 可触发一次重新观察（但 observer 已经自动调整）
    // 强制重新计算：部分浏览器可能需要
    observer.disconnect();
    sections.forEach(section => observer.observe(section));
});