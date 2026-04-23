// ==================== utils.js ====================
import { state, dom } from './state.js';
import { AppData } from './data.js';

// 关闭右侧详情
export function closeRightDetail() {
    if (state.isMobileMode) {
        dom.mobileRightContainer.innerHTML = '';
        dom.leftTopArea.classList.remove('show-mobile');
        dom.leftTopArea.classList.remove('hide-original');
    } else {
        dom.rightPanel.innerHTML = '<div class="right-placeholder">✦ 点击左侧卡片开启星见之旅 ✦</div>';
    }
}

// 创建加载动画元素
export function createLoaderElement() {
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

export function showLeftLoading() {
    dom.dynamicArea.innerHTML = '';
    const loader = createLoaderElement();
    loader.style.height = '100%';
    dom.dynamicArea.appendChild(loader);
}

export function showRightLoading() {
    const container = state.isMobileMode ? dom.mobileRightContainer : dom.rightPanel;
    container.innerHTML = '';
    const loader = createLoaderElement();
    loader.style.height = '100%';
    container.appendChild(loader);
}

export function showDetailAreaLoading(detailArea) {
    detailArea.innerHTML = '';
    const loader = createLoaderElement();
    loader.style.height = '100%';
    detailArea.appendChild(loader);
}

// 等待图片加载完成后替换内容
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

// 创建标题行
export function createOddItem(title, leftImg, rightImg) {
    const div = document.createElement('div');
    div.className = 'filter-odd-item';
    const leftIcon = document.createElement('div');
    leftIcon.className = 'icon';
    if (leftImg) {
        leftIcon.style.backgroundImage = `url('${leftImg}')`;
        leftIcon.style.backgroundPosition = 'right';
        leftIcon.style.backgroundRepeat = 'no-repeat';
        leftIcon.style.backgroundSize = 'contain';
    }
    div.appendChild(leftIcon);
    const titleSpan = document.createElement('div');
    titleSpan.className = 'title';
    titleSpan.textContent = title;
    div.appendChild(titleSpan);
    const rightIcon = document.createElement('div');
    rightIcon.className = 'icon';
    if (rightImg) {
        rightIcon.style.backgroundImage = `url('${rightImg}')`;
        rightIcon.style.backgroundPosition = 'left';
        rightIcon.style.backgroundRepeat = 'no-repeat';
        rightIcon.style.backgroundSize = 'contain';
    }
    div.appendChild(rightIcon);
    return div;
}

// 卡片排序
export function sortCards(cards) {
    const attrOrder = { '火': 0, '水': 1, '风': 2, '雷': 3, '光': 4, '暗': 5 };
    const starOrder = { '5': 0, '4': 1, '3': 2, '2': 3, '1': 4 };
    return [...cards].sort((a, b) => {
        const starA = starOrder[a.start] !== undefined ? starOrder[a.start] : 999;
        const starB = starOrder[b.start] !== undefined ? starOrder[b.start] : 999;
        if (starA !== starB) return starA - starB;
        const attrA = attrOrder[a.Attribute] !== undefined ? attrOrder[a.Attribute] : 999;
        const attrB = attrOrder[b.Attribute] !== undefined ? attrOrder[b.Attribute] : 999;
        if (attrA !== attrB) return attrA - attrB;
        return 0;
    });
}

// 获取对立属性
export function getOppositeAttribute(attr) {
    const map = {
        '火': '水',
        '水': '雷',
        '雷': '风',
        '风': '火',
        '光': '暗',
        '暗': '光'
    };
    return map[attr] || attr;
}

// 能力文本增强
export function enhanceAbilityText(text, attribute, isLeader) {
    if (!text || typeof text !== 'string') return text;
    let result = text;
    if (isLeader) {
        const generalList = AppData.abilitytxticon.general || [];
        const mainIcon = generalList.find(item => item.image && item.image.includes('主属性图标'));
        const subIcon = generalList.find(item => item.image && item.image.includes('副属性图标'));
        if (mainIcon && mainIcon.image) {
            result = result.replace(/<main>/g, `<img src="${mainIcon.image}" style="height:1em; vertical-align:middle; margin:0 2px;">`);
        }
        if (subIcon && subIcon.image) {
            result = result.replace(/<sub>/g, `<img src="${subIcon.image}" style="height:1em; vertical-align:middle; margin:0 2px;">`);
        }
        result = result.replace(/<\/?main>|<\/?sub>/g, '');
    }

    const attrList = AppData.abilitytxticon.Attributeicon;
    const currentAttrObj = attrList.find(item => item.value === attribute);
    const sameAttrIcon = currentAttrObj ? currentAttrObj.left : '';
    const oppositeAttr = getOppositeAttribute(attribute);
    const oppositeAttrObj = attrList.find(item => item.value === oppositeAttr);
    const oppositeAttrIcon = oppositeAttrObj ? oppositeAttrObj.left : '';

    if (sameAttrIcon) {
        result = result.replace(/(角色)/g, `<img src="${sameAttrIcon}" style="height:1em; vertical-align:middle; margin:0 2px;">$1`);
        result = result.replace(/(耐性DOWN)/g, `<img src="${sameAttrIcon}" style="height:1em; vertical-align:middle; margin:0 2px;">$1`);
        result = result.replace(/(伤害)/g, `<img src="${sameAttrIcon}" style="height:1em; vertical-align:middle; margin:0 2px;">$1`);
    }
    if (oppositeAttrIcon) {
        result = result.replace(/(抗性\+)/g, `<img src="${oppositeAttrIcon}" style="height:1em; vertical-align:middle; margin:0 2px;">$1`);
        result = result.replace(/(耐性\+)/g, `<img src="${oppositeAttrIcon}" style="height:1em; vertical-align:middle; margin:0 2px;">$1`);
    }
    const attrIconRight = currentAttrObj ? currentAttrObj.right : '';
    if (sameAttrIcon && attrIconRight) {
        result = result.replace(/(抗性降低)/g, `<img src="${sameAttrIcon}" style="height:1em; vertical-align:middle; margin:0 2px;">$1<img src="${attrIconRight}" style="height:1.5em; vertical-align:middle; margin:0 2px;">`);
    }

    const generalListFull = AppData.abilitytxticon.general || [];
    for (const item of generalListFull) {
        if (!item.txt || !item.image) continue;
        if (item.txt === '') continue;
        const regex = new RegExp(`(${item.txt})`, 'g');
        result = result.replace(regex, `$1<img src="${item.image}" style="height:1.5em; vertical-align:middle; margin-left:4px;">`);
    }
    return result;
}