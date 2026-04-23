// ==================== main.js ====================
import { state, dom, initDom } from './state.js';
import {
    restoreInitialView,
    bindInitialCardsEvents,
    resetRightPlaceholder,
    checkMobileMode,
    handleBack
} from './view.js';
import { applyFilters } from './filter.js';
import { renderRightModal2 } from './right-detail.js';

// 初始化函数
function init() {
    // 获取DOM元素引用
    initDom();
    if (!dom.dynamicArea) {
        console.error('DOM 元素未找到，请检查页面结构');
        return;
    }

    const initialClone = dom.dynamicArea.cloneNode(true);
    state.initialHTML = initialClone.innerHTML;
    bindInitialCardsEvents();
    dom.globalBackBtn.addEventListener('click', handleBack);
    resetRightPlaceholder();
    dom.globalBackBtn.style.display = 'none';
    state.currentView = 'initial';

    window.addEventListener('resize', () => {
        const wasMobile = state.isMobileMode;
        checkMobileMode();
        if (wasMobile !== state.isMobileMode) {
            if (!state.isMobileMode && dom.leftTopArea.classList.contains('show-mobile')) {
                if (dom.mobileRightContainer.children.length > 0) {
                    dom.rightPanel.innerHTML = '';
                    while (dom.mobileRightContainer.firstChild) {
                        dom.rightPanel.appendChild(dom.mobileRightContainer.firstChild);
                    }
                }
                dom.leftTopArea.classList.remove('show-mobile');
                dom.leftTopArea.classList.remove('hide-original');
                dom.mobileRightContainer.innerHTML = '';
            } else if (state.isMobileMode && dom.rightPanel.children.length > 0 && !dom.rightPanel.querySelector('.right-placeholder')) {
                const cloneContent = dom.rightPanel.cloneNode(true);
                dom.mobileRightContainer.innerHTML = '';
                while (cloneContent.firstChild) {
                    dom.mobileRightContainer.appendChild(cloneContent.firstChild);
                }
                dom.rightPanel.innerHTML = '<div class="right-placeholder">✦ 点击左侧卡片开启星见之旅 ✦</div>';
                if (dom.mobileRightContainer.children.length > 0) {
                    dom.leftTopArea.classList.add('show-mobile');
                    dom.leftTopArea.classList.add('hide-original');
                }
            }
        }
        if (state.currentView === 'modal1') dom.globalBackBtn.style.display = 'block';
        else dom.globalBackBtn.style.display = 'none';
    });
    checkMobileMode();
}

// 启动应用
init();