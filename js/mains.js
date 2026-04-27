// ===== 第二分区内容切换 + 右侧导航点激活 + 二级图片轮播 + 自动一级轮播 =====
(function() {
    /***** DOM 元素 *****/
    const textArea = document.querySelector('.second .split-left .text-area');
    const imageElem = document.querySelector('.second .split-left .image-area .content-image');
    const videoElem = document.querySelector('.second .split-right .content-video');
    const buttons = document.querySelectorAll('.switch-btn');

    const containers = {
        text: textArea,
        image: document.querySelector('.second .split-left .image-area'),
        video: document.querySelector('.second .split-right .video-container')
    };

    const contentData = {
        1: {
            text: '✨华丽演出与爽快弹射结合：像素美术的体验革新',
            imageList: ['img/main/auto/pixel/1.png'],
            video: 'video/card/cardbg02.mp4'
        },
        2: {
            text: '⚔️ 多难度副本boss战！从普通到地狱，体验层层进阶的激斗！',
            imageList: ['img/main/auto/mosters/moster.png', 'img/main/auto/mosters/moster2.png','img/main/auto/mosters/moster3.png'],
            video: 'video/card/cardbg02.mp4'
        },
        3: {
            text: '✨ 精美抽卡动画，直观感受抽卡的刺激与惊喜！✨',
            imageList: ['img/main/auto/chars/char.png', 'img/main/auto/chars/char2.png'],
            video: 'video/card/1.mp4'
        }
    };

    const IMAGE_INTERVAL = 2000;
    const SECTION_DELAY = 2200;      // 切换前等待时间（用于非视频播放状态）
    const VIDEO_WAIT_DELAY = 1500;   // 视频结束后或暂停后额外等待时间

    let currentId = 0;
    let currentImageIndex = 0;
    let imageTimer = null;
    let sectionTimer = null;
    let fadeTimer = null;
    let isVideoPlaying = false;        // 视频是否正在播放
    let pendingSwitch = null;          // 存放待执行的一级切换函数

    function removeFadeOut() {
        Object.values(containers).forEach(container => {
            if (container) container.classList.remove('fade-out');
        });
    }

    function stopAllTimers() {
        if (imageTimer) { clearInterval(imageTimer); imageTimer = null; }
        if (sectionTimer) { clearTimeout(sectionTimer); sectionTimer = null; }
        if (fadeTimer) { clearTimeout(fadeTimer); fadeTimer = null; removeFadeOut(); }
    }

    // 辅助：执行带渐隐渐现效果的图片切换
    function fadeImageChange(newSrc) {
        if (!imageElem) return;
        imageElem.classList.add('img-fade-out');
        setTimeout(() => {
            imageElem.src = newSrc;
            setTimeout(() => {
                imageElem.classList.remove('img-fade-out');
                imageElem.classList.add('img-fade-in');
                setTimeout(() => {
                    imageElem.classList.remove('img-fade-in');
                }, 300);
            }, 20);
        }, 150);
    }

    // 手动切换图片（方向：'prev' 上一张，'next' 下一张）
    function manualSwitchImage(direction) {
        const data = contentData[currentId];
        if (!data || !data.imageList || data.imageList.length <= 1) return; // 不足2张不切换

        let newIndex = currentImageIndex;
        if (direction === 'prev') {
            newIndex = currentImageIndex - 1;
            if (newIndex < 0) newIndex = data.imageList.length - 1;
        } else if (direction === 'next') {
            newIndex = currentImageIndex + 1;
            if (newIndex >= data.imageList.length) newIndex = 0;
        } else {
            return;
        }

        if (newIndex === currentImageIndex) return;

        currentImageIndex = newIndex;
        fadeImageChange(data.imageList[currentImageIndex]);

        // 手动切换后重置自动轮播定时器
        if (imageTimer) {
            clearInterval(imageTimer);
            imageTimer = null;
        }
        // 如果视频未播放，重新启动轮播
        if (!isVideoPlaying && data.imageList.length > 1) {
            startImageCarousel();
        }
    }

    // 图片点击事件：左半区域上一张，右半区域下一张
    function onImageClick(e) {
        if (!imageElem) return;
        const rect = imageElem.getBoundingClientRect();
        const clickX = e.clientX - rect.left;   // 相对于图片左边缘的X坐标
        const width = rect.width;
        if (width === 0) return;
        if (clickX < width / 2) {
            manualSwitchImage('prev');
        } else {
            manualSwitchImage('next');
        }
    }

    function startImageCarousel() {
        if (imageTimer) clearInterval(imageTimer);
        const data = contentData[currentId];
        if (!data || !data.imageList || data.imageList.length <= 1) return;
        // 如果视频正在播放，不启动轮播
        if (isVideoPlaying) return;

        imageTimer = setInterval(() => {
            let nextIndex = currentImageIndex + 1;
            if (nextIndex >= data.imageList.length) {
                clearInterval(imageTimer);
                imageTimer = null;
                // 二级播完后，准备切换一级，但需检查视频状态
                scheduleSectionSwitch();
                return;
            }
            currentImageIndex = nextIndex;
            fadeImageChange(data.imageList[currentImageIndex]);
        }, IMAGE_INTERVAL);
    }

    function scheduleSectionSwitch() {
        if (sectionTimer) clearTimeout(sectionTimer);
        if (isVideoPlaying) {
            // 视频播放中，延迟执行
            pendingSwitch = () => {
                pendingSwitch = null;
                goToNextSection();
            };
        } else {
            // 视频未播放，直接延时执行
            sectionTimer = setTimeout(() => {
                sectionTimer = null;
                goToNextSection();
            }, SECTION_DELAY);
        }
    }

    function goToNextSection() {
        let nextId = currentId + 1;
        if (nextId > 3) nextId = 1;
        switchContent(nextId);
    }

    function resetImageForCurrentSection() {
        const data = contentData[currentId];
        if (data && data.imageList && data.imageList.length) {
            currentImageIndex = 0;
            if (imageElem) imageElem.src = data.imageList[0];
        } else {
            if (imageElem) imageElem.src = '';
        }
        if (imageElem) {
            imageElem.classList.remove('img-fade-out', 'img-fade-in');
        }
    }

    // 当视频播放状态改变时，恢复自动行为
    function onVideoPlayStateChange() {
        if (!isVideoPlaying) {
            // 视频暂停或结束，等待1.5秒后执行待切换或重启轮播
            if (pendingSwitch) {
                setTimeout(() => {
                    if (pendingSwitch) {
                        const fn = pendingSwitch;
                        pendingSwitch = null;
                        fn();
                    }
                }, VIDEO_WAIT_DELAY);
            } else {
                // 否则重启二级图片轮播（如果当前分类图片多于1）
                const data = contentData[currentId];
                if (data && data.imageList && data.imageList.length > 1) {
                    startImageCarousel();
                }
            }
        } else {
            // 视频开始播放：清除所有自动任务
            if (imageTimer) { clearInterval(imageTimer); imageTimer = null; }
            if (sectionTimer) { clearTimeout(sectionTimer); sectionTimer = null; }
            // 不清除 pendingSwitch，保留等待切换任务
        }
    }

    // 视频事件监听
    function bindVideoEvents() {
        if (!videoElem) return;
        videoElem.addEventListener('play', () => {
            isVideoPlaying = true;
            onVideoPlayStateChange();
        });
        videoElem.addEventListener('pause', () => {
            isVideoPlaying = false;
            onVideoPlayStateChange();
        });
        videoElem.addEventListener('ended', () => {
            isVideoPlaying = false;
            onVideoPlayStateChange();
        });
        // 初始状态检测
        isVideoPlaying = !!(videoElem.currentTime > 0 && !videoElem.paused && !videoElem.ended);
        onVideoPlayStateChange();
    }

    function switchContent(contentId) {
        if (contentId === currentId) return;
        const data = contentData[contentId];
        if (!data) return;

        stopAllTimers();
        pendingSwitch = null;  // 清除待切换任务

        Object.values(containers).forEach(container => {
            if (container) container.classList.add('fade-out');
        });

        fadeTimer = setTimeout(() => {
            if (textArea) textArea.textContent = data.text;
            currentId = contentId;
            resetImageForCurrentSection();

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

            const imgList = data.imageList;
            if (imgList && imgList.length > 1) {
                startImageCarousel();
            } else {
                if (imageTimer) clearInterval(imageTimer);
                imageTimer = null;
                scheduleSectionSwitch();
            }

            fadeTimer = null;
        }, 280);
    }

    // 绑定一级按钮点击事件
    const switchContainer = document.querySelector('.switch-buttons');
    if (switchContainer) {
        switchContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.switch-btn');
            if (!btn) return;
            const id = parseInt(btn.dataset.content);
            if (!isNaN(id)) {
                stopAllTimers();
                pendingSwitch = null;
                switchContent(id);
            }
        });
    }

    // 绑定图片左右点击切换
    if (imageElem) {
        imageElem.addEventListener('click', onImageClick);
    }

    // 初始化
    bindVideoEvents();
    switchContent(1);

    /***** 右侧导航点 + Intersection Observer 高亮（保持不变） *****/
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
        // 重新绑定视频事件确保状态正确
        bindVideoEvents();
    });
})();