// js/hero/loader.js
// 加载动画与图片预加载模块
function createLoaderElement() {
    const wrapper = document.createElement('div');
    wrapper.className = 'global-loader';
    const box = document.createElement('div');
    box.className = 'loader-box';
    const inner = document.createElement('div');
    inner.className = 'loader-inner';
    box.appendChild(inner);
    wrapper.appendChild(box);
    return wrapper;
}

export function showLeftLoading(container) {
    if (!container) return;
    container.innerHTML = '';
    const loader = createLoaderElement();
    loader.style.height = '100%';
    container.appendChild(loader);
}

export function showRightLoading(container) {
    if (!container) return;
    container.innerHTML = '';
    const loader = createLoaderElement();
    loader.style.height = '100%';
    container.appendChild(loader);
}

export function showDetailAreaLoading(detailArea) {
    if (!detailArea) return;
    detailArea.innerHTML = '';
    const loader = createLoaderElement();
    loader.style.height = '100%';
    detailArea.appendChild(loader);
}

export function replaceContentAfterImagesLoaded(container, newContent, callback) {
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '0';
    tempDiv.style.width = '0';
    tempDiv.style.height = '0';
    tempDiv.style.overflow = 'hidden';
    tempDiv.style.pointerEvents = 'none';
    document.body.appendChild(tempDiv);

    if (newContent instanceof DocumentFragment) {
        tempDiv.appendChild(newContent.cloneNode(true));
    } else {
        tempDiv.appendChild(newContent.cloneNode(true));
    }

    const imgElements = tempDiv.querySelectorAll('img');
    const imageUrls = new Set();
    imgElements.forEach(img => {
        if (img.src) imageUrls.add(img.src);
    });

    const allElements = tempDiv.querySelectorAll('*');
    allElements.forEach(el => {
        const bgImage = window.getComputedStyle(el).backgroundImage;
        if (bgImage && bgImage !== 'none') {
            const match = bgImage.match(/url\(["']?([^"')]+)["']?\)/);
            if (match && match[1]) {
                imageUrls.add(match[1]);
            }
        }
    });

    const totalImages = imageUrls.size;
    let loadedCount = 0;

    function finalize() {
        document.body.removeChild(tempDiv);
        container.innerHTML = '';
        if (newContent instanceof DocumentFragment) {
            container.appendChild(newContent);
        } else {
            container.appendChild(newContent);
        }
        if (callback) callback();
    }

    if (totalImages === 0) {
        finalize();
        return;
    }

    const checkAllLoaded = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
            finalize();
        }
    };

    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
        if (img.complete) {
            checkAllLoaded();
        } else {
            img.addEventListener('load', checkAllLoaded, { once: true });
            img.addEventListener('error', checkAllLoaded, { once: true });
        }
    });

    setTimeout(() => {
        if (loadedCount < totalImages) {
            console.warn('图片加载超时，强制显示内容');
            finalize();
        }
    }, 20000);
}