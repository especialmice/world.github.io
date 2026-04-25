// ==================== main.js ====================
// 主入口：初始化所有模块，启动应用
(function() {
    if (!window.WF) {
        console.error('WF 未初始化，请确保所有模块按顺序加载');
        return;
    }
    const WF = window.WF;

    // 初始化函数
    function init() {
        const initialClone = WF.dom.dynamicArea.cloneNode(true);
        WF.state.initialHTML = initialClone.innerHTML;
        WF.view.bindInitialCardsEvents();
        WF.dom.globalBackBtn.addEventListener('click', WF.view.handleBack);
        WF.view.resetRightPlaceholder();
        WF.dom.globalBackBtn.style.display = 'none';
        WF.state.currentView = 'initial';

        window.addEventListener('resize', () => {
            const wasMobile = WF.state.isMobileMode;
            WF.view.checkMobileMode();
            if (wasMobile !== WF.state.isMobileMode) {
                if (!WF.state.isMobileMode && WF.dom.leftTopArea.classList.contains('show-mobile')) {
                    if (WF.dom.mobileRightContainer.children.length > 0) {
                        WF.dom.rightPanel.innerHTML = '';
                        while (WF.dom.mobileRightContainer.firstChild) {
                            WF.dom.rightPanel.appendChild(WF.dom.mobileRightContainer.firstChild);
                        }
                    }
                    WF.dom.leftTopArea.classList.remove('show-mobile');
                    WF.dom.leftTopArea.classList.remove('hide-original');
                    WF.dom.mobileRightContainer.innerHTML = '';
                } else if (WF.state.isMobileMode && WF.dom.rightPanel.children.length > 0 && !WF.dom.rightPanel.querySelector('.right-placeholder')) {
                    const cloneContent = WF.dom.rightPanel.cloneNode(true);
                    WF.dom.mobileRightContainer.innerHTML = '';
                    while (cloneContent.firstChild) {
                        WF.dom.mobileRightContainer.appendChild(cloneContent.firstChild);
                    }
                    WF.dom.rightPanel.innerHTML = '<div class="right-placeholder">✦ 点击左侧卡片开启星见之旅 ✦</div>';
                    if (WF.dom.mobileRightContainer.children.length > 0) {
                        WF.dom.leftTopArea.classList.add('show-mobile');
                        WF.dom.leftTopArea.classList.add('hide-original');
                    }
                }
            }
            if (WF.state.currentView === 'modal1') WF.dom.globalBackBtn.style.display = 'block';
            else WF.dom.globalBackBtn.style.display = 'none';
        });
        WF.view.checkMobileMode();
    }

    // 启动
    init();
})();