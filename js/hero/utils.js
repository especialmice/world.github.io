// js/hero/utils.js
// 工具函数模块
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

export function enhanceAbilityText(text, attribute, isLeader = false) {
    if (!text || typeof text !== 'string') return text;

    let result = text;

    if (isLeader) {
        const generalList = window.AppData.abilitytxticon.general || [];
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

    const attrList = window.AppData.abilitytxticon.Attributeicon;
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

    const generalListFull = window.AppData.abilitytxticon.general || [];
    for (const item of generalListFull) {
        if (!item.txt || !item.image) continue;
        if (item.txt === '') continue;
        const regex = new RegExp(`(${item.txt})`, 'g');
        result = result.replace(regex, `$1<img src="${item.image}" style="height:1.5em; vertical-align:middle; margin-left:4px;">`);
    }

    return result;
}

export function createRaceItem(raceValue) {
    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.gap = '4px';
    const text = document.createElement('span');
    text.textContent = raceValue;
    const img = document.createElement('img');
    const raceBtn = window.AppData.evenButtonGroups[3].buttons.find(b => b.value === raceValue);
    img.src = raceBtn ? raceBtn.image2 : '';
    img.alt = raceValue;
    img.style.height = '1em';
    item.appendChild(text);
    item.appendChild(img);
    return item;
}

export function appendTextDivs(container, textData) {
    if (!textData) return;
    const texts = Array.isArray(textData) ? textData : [textData];
    texts.forEach(txt => {
        if (txt && txt.trim()) {
            const textDiv = document.createElement('div');
            textDiv.className = 'right-modal2-detail-text';
            textDiv.textContent = txt;
            container.appendChild(textDiv);
        }
    });
}