// ==================== filter.js ====================
import { state } from './state.js';
import { AppData } from './data.js';
import { createOddItem, sortCards } from './utils.js';
import { renderSquareGrid } from './grid.js';

// 应用筛选
export function applyFilters() {
    if (!state.originalSquareCards.length) return;
    let filtered = [...state.originalSquareCards];
    if (state.currentFilters.star.length) {
        filtered = filtered.filter(card => state.currentFilters.star.includes(card.start));
    }
    if (state.currentFilters.attribute.length) {
        filtered = filtered.filter(card => state.currentFilters.attribute.includes(card.Attribute));
    }
    if (state.currentFilters.gender.length) {
        filtered = filtered.filter(card => state.currentFilters.gender.includes(card.gender));
    }
    if (state.currentFilters.race.length) {
        filtered = filtered.filter(card => {
            if (state.currentFilters.race.includes(card.race)) return true;
            if (card.race2 && card.race2.trim()) {
                const race2Trimmed = card.race2.trim();
                if (state.currentFilters.race.includes(race2Trimmed)) return true;
            }
            return false;
        });
    }
    if (state.currentFilters.name) {
        const nameKeyword = state.currentFilters.name.toLowerCase();
        filtered = filtered.filter(card => card.name && card.name.toLowerCase().includes(nameKeyword));
    }
    state.currentSquareCards = sortCards(filtered);
    renderSquareGrid(state.currentSquareCards, state.activeCardIndex, state.currentGridContainer);
}

export function setFilters(filters) {
    state.currentFilters = { ...filters };
    applyFilters();
}

// 创建筛选按钮组（用于弹窗）
function createFilterButtonGroup(buttons, filterType, isFilterable, tempFilters) {
    const group = document.createElement('div');
    group.className = 'filter-button-group';
    buttons.forEach(btnData => {
        const btn = document.createElement('button');
        const img = document.createElement('img');
        img.src = btnData.image;
        img.alt = btnData.label;
        img.style.height = '1.2em';
        btn.appendChild(img);
        if (isFilterable) {
            btn.addEventListener('click', () => {
                const idx = tempFilters[filterType].indexOf(btnData.value);
                if (idx !== -1) {
                    tempFilters[filterType].splice(idx, 1);
                    btn.classList.remove('active');
                } else {
                    tempFilters[filterType].push(btnData.value);
                    btn.classList.add('active');
                }
            });
            if (tempFilters[filterType].includes(btnData.value)) {
                btn.classList.add('active');
            }
        } else {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        }
        group.appendChild(btn);
    });
    return group;
}

// 显示筛选弹窗
export function showFilterModal(cardIndex) {
    const isFilterable = (cardIndex === 0 || cardIndex === 1);
    let tempFilters = {
        star: [...state.currentFilters.star],
        attribute: [...state.currentFilters.attribute],
        gender: [...state.currentFilters.gender],
        race: [...state.currentFilters.race],
        name: state.currentFilters.name
    };

    const overlay = document.createElement('div');
    overlay.className = 'filter-overlay';

    const modal = document.createElement('div');
    modal.className = 'filter-modal';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'filter-title';
    titleDiv.textContent = '筛选';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'filter-content';

    const sarchtitle_local = [
        { leftImg: 'img/sarch/sarch/general/1.png', title: '名称', rightImg: 'img/sarch/sarch/general/2.png' },
        { title: '星级' },
        { title: '属性' },
        { title: '性别' },
        { title: '种族' }
    ];

    const children = [];

    children.push(createOddItem(sarchtitle_local[0].title, sarchtitle_local[0].leftImg, sarchtitle_local[0].rightImg));

    const div2 = document.createElement('div');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '名称搜索...';
    searchInput.className = 'filter-search-input';
    if (tempFilters.name) searchInput.value = tempFilters.name;
    div2.appendChild(searchInput);
    children.push(div2);

    children.push(createOddItem(sarchtitle_local[1].title, sarchtitle_local[0].leftImg, sarchtitle_local[0].rightImg));
    children.push(createFilterButtonGroup(AppData.evenButtonGroups[0].buttons, 'star', isFilterable, tempFilters));

    children.push(createOddItem(sarchtitle_local[2].title, sarchtitle_local[0].leftImg, sarchtitle_local[0].rightImg));
    children.push(createFilterButtonGroup(AppData.evenButtonGroups[1].buttons, 'attribute', isFilterable, tempFilters));

    if (cardIndex === 0) {
        children.push(createOddItem(sarchtitle_local[3].title, sarchtitle_local[0].leftImg, sarchtitle_local[0].rightImg));
        const genderGroup = document.createElement('div');
        genderGroup.className = 'filter-button-group';
        AppData.evenButtonGroups[2].buttons.forEach(btnData => {
            const btn = document.createElement('button');
            const span = document.createElement('span');
            span.textContent = btnData.label;
            btn.appendChild(span);
            btn.addEventListener('click', () => {
                const idx = tempFilters.gender.indexOf(btnData.value);
                if (idx !== -1) {
                    tempFilters.gender.splice(idx, 1);
                    btn.classList.remove('active');
                } else {
                    tempFilters.gender.push(btnData.value);
                    btn.classList.add('active');
                }
            });
            if (tempFilters.gender.includes(btnData.value)) btn.classList.add('active');
            genderGroup.appendChild(btn);
        });
        children.push(genderGroup);

        children.push(createOddItem('种族', sarchtitle_local[0].leftImg, sarchtitle_local[0].rightImg));
        children.push(createFilterButtonGroup(AppData.evenButtonGroups[3].buttons, 'race', true, tempFilters));
    }

    children.forEach(child => contentDiv.appendChild(child));

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'filter-buttons';
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '取消';
    cancelBtn.className = 'cancel';
    cancelBtn.addEventListener('click', () => overlay.remove());
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = '确认';
    confirmBtn.className = 'confirm';
    confirmBtn.addEventListener('click', () => {
        const nameValue = searchInput.value.trim();
        tempFilters.name = nameValue || null;
        setFilters(tempFilters);
        overlay.remove();
    });
    buttonsDiv.appendChild(cancelBtn);
    buttonsDiv.appendChild(confirmBtn);

    modal.appendChild(titleDiv);
    modal.appendChild(contentDiv);
    modal.appendChild(buttonsDiv);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
}