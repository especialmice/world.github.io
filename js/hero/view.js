// js/hero/view.js
// 视图切换模块
import { dom } from './dom.js';
import { state, setCurrentView, setActiveCardIndex, setInitialHTML, setOriginalSquareCards, setCurrentSquareCards, setCurrentGridContainer, clearCurrentFilters, setIsMobileMode } from './state.js';
import { showLeftLoading, replaceContentAfterImagesLoaded } from './loader.js';
import { renderSquareGrid } from './grid.js';
import { sortCards } from './utils.js';
import { showFilterModal } from './filter.js';
import { closeRightDetail } from './rightDetail.js';

function buildModal1View(cardIndex) {
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'modal1-wrapper';

    const config = window.AppData.cardConfigs[cardIndex] || window.AppData.cardConfigs[0];

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
    setCurrentGridContainer(gridContainer);

    const originalCards = JSON.parse(JSON.stringify(config.squareCards));
    setOriginalSquareCards(originalCards);
    const sortedCards = sortCards([...originalCards]);
    setCurrentSquareCards(sortedCards);
    clearCurrentFilters();
    renderSquareGrid(sortedCards, cardIndex, gridContainer);

    div5.appendChild(gridContainer);
    modalWrapper.appendChild(div4);
    modalWrapper.appendChild(div5);
    return modalWrapper;
}

export function showModal1View(cardIndex) {
    showLeftLoading(dom.dynamicArea);

    const modal1Element = buildModal1View(cardIndex);
    replaceContentAfterImagesLoaded(dom.dynamicArea, modal1Element, () => {
        setCurrentView('modal1');
        setActiveCardIndex(cardIndex);
        dom.globalBackBtn.style.display = 'block';
    });
}

export function restoreInitialView() {
    if (state.currentView === 'initial') return;
    dom.dynamicArea.innerHTML = state.initialHTML;
    bindInitialCardsEvents();
    setCurrentView('initial');
    setActiveCardIndex(-1);
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
            setCurrentView('initial');
        }
        return;
    }
    if (state.currentView === 'modal1') {
        restoreInitialView();
    } else if (state.currentView === 'initial') {
        if (dom.globalBackBtn.style.display === 'block') dom.globalBackBtn.style.display = 'none';
    }
}

// 使用事件委托，避免克隆替换
export function bindInitialCardsEvents() {
    const container = document.getElementById('initCardList');
    if (!container) return;
    // 先移除旧监听，避免重复（但此处每次调用都会添加新监听，最好只初始化一次）
    container.removeEventListener('click', handleCardClick);
    container.addEventListener('click', handleCardClick);
}

function handleCardClick(e) {
    const card = e.target.closest('.card');
    if (!card) return;
    const idx = parseInt(card.getAttribute('data-card-index'), 10);
    if (isNaN(idx)) return;
    e.stopPropagation();
    showModal1View(idx);
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
    const wasMobile = state.isMobileMode;
    const newMobileMode = window.innerWidth <= 800;
    setIsMobileMode(newMobileMode);
    
    if (newMobileMode) {
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