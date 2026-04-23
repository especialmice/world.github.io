// ==================== view.js ====================
import { state, dom } from './state.js';
import { AppData } from './data.js';
import {
    showLeftLoading,
    replaceContentAfterImagesLoaded,
    sortCards,
    closeRightDetail
} from './utils.js';
import { renderSquareGrid } from './grid.js';
import { showFilterModal } from './filter.js';
import { renderRightModal2 } from './right-detail.js';

// 构建模态框1视图
function buildModal1View(cardIndex) {
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'modal1-wrapper';

    const config = AppData.cardConfigs[cardIndex] || AppData.cardConfigs[0];

    const div4 = document.createElement('div');
    div4.className = 'modal1-div4';
    div4.style.backgroundImage = `url('${config.headerBg}')`;
    div4.style.backgroundSize = 'cover';
    div4.style.backgroundPosition = 'center';

    const filterBtn = document.createElement('div');
    filterBtn.className = 'filter-btn';
    const innerDiv = document.createElement('div');
    innerDiv.className = 'filter-inner';
    const iconDiv = document.createElement('button');
    iconDiv.className = 'filter-icon';
    const textDiv = document.createElement('div');
    textDiv.className = 'filter-text';
    textDiv.textContent = '筛选';
    innerDiv.appendChild(iconDiv);
    innerDiv.appendChild(textDiv);
    filterBtn.appendChild(innerDiv);

    if (cardIndex === 0 || cardIndex === 1) {
        filterBtn.style.display = 'flex';
    } else {
        filterBtn.style.display = 'none';
    }
    filterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showFilterModal(cardIndex);
    });
    div4.appendChild(filterBtn);

    const div5 = document.createElement('div');
    div5.className = 'modal1-div5';
    const gridContainer = document.createElement('div');
    gridContainer.className = 'square-grid';
    if (cardIndex === 2) {
        gridContainer.classList.add('square-grid-world');
    }
    state.currentGridContainer = gridContainer;

    state.originalSquareCards = JSON.parse(JSON.stringify(config.squareCards));
    state.currentSquareCards = sortCards([...state.originalSquareCards]);
    state.currentFilters = { star: [], attribute: [], gender: [], race: [], name: null };
    renderSquareGrid(state.currentSquareCards, cardIndex, gridContainer);

    div5.appendChild(gridContainer);
    modalWrapper.appendChild(div4);
    modalWrapper.appendChild(div5);
    return modalWrapper;
}

export function showModal1View(cardIndex) {
    showLeftLoading();

    const modal1Element = buildModal1View(cardIndex);
    replaceContentAfterImagesLoaded(dom.dynamicArea, modal1Element, () => {
        state.currentView = 'modal1';
        state.activeCardIndex = cardIndex;
        dom.globalBackBtn.style.display = 'block';
    });
}

export function restoreInitialView() {
    if (state.currentView === 'initial') return;
    dom.dynamicArea.innerHTML = state.initialHTML;
    bindInitialCardsEvents();
    state.currentView = 'initial';
    state.activeCardIndex = -1;
    dom.globalBackBtn.style.display = 'none';
    if (state.isMobileMode && dom.leftTopArea.classList.contains('show-mobile')) {
        dom.leftTopArea.classList.remove('show-mobile');
        dom.leftTopArea.classList.remove('hide-original');
        dom.mobileRightContainer.innerHTML = '';
        resetRightPlaceholder();
    }
}

export function handleBack() {
    if (state.isMobileMode && dom.leftTopArea.classList.contains('show-mobile')) {
        dom.leftTopArea.classList.remove('show-mobile');
        dom.leftTopArea.classList.remove('hide-original');
        dom.mobileRightContainer.innerHTML = '';
        if (state.currentView === 'modal1') {
            const modal1Element = buildModal1View(state.activeCardIndex);
            replaceContentAfterImagesLoaded(dom.dynamicArea, modal1Element, () => {
                dom.globalBackBtn.style.display = 'block';
            });
        } else if (state.currentView === 'initial') {
            dom.dynamicArea.innerHTML = state.initialHTML;
            bindInitialCardsEvents();
            dom.globalBackBtn.style.display = 'none';
        } else {
            dom.dynamicArea.innerHTML = state.initialHTML;
            bindInitialCardsEvents();
            dom.globalBackBtn.style.display = 'none';
            state.currentView = 'initial';
        }
        return;
    }
    if (state.currentView === 'modal1') {
        restoreInitialView();
    } else if (state.currentView === 'initial') {
        if (dom.globalBackBtn.style.display === 'block') dom.globalBackBtn.style.display = 'none';
    }
}

export function bindInitialCardsEvents() {
    const cards = document.querySelectorAll('#initCardList .card');
    cards.forEach(card => {
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);
        const idx = parseInt(newCard.getAttribute('data-card-index'), 10);
        newCard.addEventListener('click', (e) => {
            e.stopPropagation();
            showModal1View(idx);
        });
    });
}

export function resetRightPlaceholder() {
    if (!state.isMobileMode) {
        dom.rightPanel.innerHTML = '<div class="right-placeholder">✦ 点击左侧卡片开启星见之旅 ✦</div>';
    } else {
        if (dom.mobileRightContainer.children.length === 0 && !dom.leftTopArea.classList.contains('show-mobile')) {
            dom.mobileRightContainer.innerHTML = '<div class="right-placeholder">✦ 点击左侧卡片开启星见之旅 ✦</div>';
            if (dom.leftTopArea.classList.contains('show-mobile')) {
                dom.leftTopArea.classList.remove('show-mobile');
                dom.leftTopArea.classList.remove('hide-original');
            }
        } else if (dom.mobileRightContainer.children.length === 0) {
            dom.mobileRightContainer.innerHTML = '';
        }
    }
}

export function checkMobileMode() {
    state.isMobileMode = window.innerWidth <= 800;
    if (state.isMobileMode) {
        const rightHasContent = dom.rightPanel.children.length > 0 &&
                                !dom.rightPanel.querySelector('.right-placeholder');
        if (rightHasContent && dom.mobileRightContainer.children.length === 0) {
            const cloneContent = dom.rightPanel.cloneNode(true);
            dom.mobileRightContainer.innerHTML = '';
            while (cloneContent.firstChild) {
                dom.mobileRightContainer.appendChild(cloneContent.firstChild);
            }
            dom.leftTopArea.classList.add('show-mobile');
            dom.leftTopArea.classList.add('hide-original');
        } else if (!rightHasContent && dom.mobileRightContainer.children.length === 0) {
            dom.leftTopArea.classList.remove('show-mobile');
            dom.leftTopArea.classList.remove('hide-original');
        }
    } else {
        dom.leftTopArea.classList.remove('show-mobile');
        dom.leftTopArea.classList.remove('hide-original');
        if (dom.mobileRightContainer.children.length > 0) {
            const hasMeaningfulContent = dom.mobileRightContainer.children.length > 0 &&
                                         !dom.mobileRightContainer.querySelector('.right-placeholder');
            if (hasMeaningfulContent) {
                dom.rightPanel.innerHTML = '';
                while (dom.mobileRightContainer.firstChild) {
                    dom.rightPanel.appendChild(dom.mobileRightContainer.firstChild);
                }
            }
            dom.mobileRightContainer.innerHTML = '';
        } else {
            if (dom.rightPanel.children.length === 0 || dom.rightPanel.querySelector('.right-placeholder') === null) {
                resetRightPlaceholder();
            }
        }
    }
}