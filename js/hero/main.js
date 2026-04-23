// js/hero/main.js
// 入口模块
import { dom } from './dom.js';
import { state, setInitialHTML, setIsMobileMode } from './state.js';
import { bindInitialCardsEvents, restoreInitialView, checkMobileMode, resetRightPlaceholder } from './view.js';
import { handleBack } from './view.js';

function init() {
    const initialClone = dom.dynamicArea.cloneNode(true);
    setInitialHTML(initialClone.innerHTML);
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