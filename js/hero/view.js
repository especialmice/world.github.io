// ==================== view.js ====================
// 视图构建与切换、网格渲染、初始绑定等
(function() {
    if (!window.WF) {
        console.error('WF 未初始化');
        return;
    }
    const WF = window.WF;

    WF.view = {};

    // 渲染方形网格（供筛选和初始渲染使用）
    WF.view.renderSquareGrid = function(cardList, cardIndex, container) {
        if (!container) return;
        container.innerHTML = '';
        const fragment = document.createDocumentFragment();
        cardList.forEach(card => fragment.appendChild(WF.view.createCardElement(card, cardIndex)));
        container.appendChild(fragment);
    };

    WF.view.createCardElement = function(card, cardIndex) {
        const outerClass = cardIndex === 2 ? 'square-card2' : 'square-card';
        const topClass = cardIndex === 2 ? 'square-card2' : 'square-card1';

        const sqCard = document.createElement('div');
        sqCard.className = outerClass;
        sqCard.style.position = 'relative';
        sqCard.style.overflow = 'hidden';

        const innerContainer = document.createElement('div');
        innerContainer.className = 'square-card';
        innerContainer.style.display = 'flex';
        innerContainer.style.flexDirection = 'column';
        innerContainer.style.width = '100%';
        innerContainer.style.height = '100%';
        innerContainer.style.borderRadius = '4px';
        innerContainer.style.backgroundColor = 'rgb(44, 49, 66)';

        const topDiv = document.createElement('div');
        topDiv.className = topClass;
        topDiv.style.flex = '1';
        topDiv.style.borderRadius = '0 0 4px 4px';
        topDiv.style.backgroundSize = 'cover';
        topDiv.style.backgroundPosition = 'center';
        if (card.cdbg1) topDiv.style.backgroundImage = `url('${card.cdbg1}')`;
        innerContainer.appendChild(topDiv);

        if (cardIndex !== 2 && card.cdbg2) {
            const bottomDiv = document.createElement('div');
            bottomDiv.style.flex = '1';
            bottomDiv.style.width = '100%';
            bottomDiv.style.maxHeight = '40px';
            bottomDiv.style.aspectRatio = '53/10';
            bottomDiv.style.borderRadius = '0 0 4px 4px';
            bottomDiv.style.backgroundSize = 'cover';
            bottomDiv.style.backgroundPosition = 'center';
            bottomDiv.style.backgroundImage = `url('${card.cdbg2}')`;
            innerContainer.appendChild(bottomDiv);
        }

        sqCard.appendChild(innerContainer);
        sqCard.addEventListener('click', (e) => {
            e.stopPropagation();
            WF.rightDetail.renderRightModal2(card);
        });
        return sqCard;
    };

    // 构建（卡片网格视图）
    WF.view.buildModal1View = function(cardIndex) {
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
            WF.filter.showFilterModal(cardIndex);
        });
        div4.appendChild(filterBtn);

        const div5 = document.createElement('div');
        div5.className = 'modal1-div5';
        const gridContainer = document.createElement('div');
        gridContainer.className = 'square-grid';
        if (cardIndex === 2) {
            gridContainer.classList.add('square-grid-world');
        }
        WF.state.currentGridContainer = gridContainer;

        WF.state.originalSquareCards = JSON.parse(JSON.stringify(config.squareCards));
        WF.state.currentSquareCards = WF.utils.sortCards([...WF.state.originalSquareCards]);
        WF.state.currentFilters = { star: [], attribute: [], gender: [], race: [], name: null };
        WF.view.renderSquareGrid(WF.state.currentSquareCards, cardIndex, gridContainer);

        div5.appendChild(gridContainer);
        modalWrapper.appendChild(div4);
        modalWrapper.appendChild(div5);
        return modalWrapper;
    };

    WF.view.showModal1View = function(cardIndex) {
        WF.utils.showLeftLoading();

        const modal1Element = WF.view.buildModal1View(cardIndex);
        WF.utils.replaceContentAfterImagesLoaded(WF.dom.dynamicArea, modal1Element, () => {
            WF.state.currentView = 'modal1';
            WF.state.activeCardIndex = cardIndex;
            WF.dom.globalBackBtn.style.display = 'block';
        });
    };

    WF.view.restoreInitialView = function() {
        if (WF.state.currentView === 'initial') return;
        WF.dom.dynamicArea.innerHTML = WF.state.initialHTML;
        WF.view.bindInitialCardsEvents();
        WF.state.currentView = 'initial';
        WF.state.activeCardIndex = -1;
        WF.dom.globalBackBtn.style.display = 'none';
        if (WF.state.isMobileMode && WF.dom.leftTopArea.classList.contains('show-mobile')) {
            WF.dom.leftTopArea.classList.remove('show-mobile');
            WF.dom.leftTopArea.classList.remove('hide-original');
            WF.dom.mobileRightContainer.innerHTML = '';
            WF.view.resetRightPlaceholder();
        }
    };

    WF.view.handleBack = function() {
        if (WF.state.isMobileMode && WF.dom.leftTopArea.classList.contains('show-mobile')) {
            WF.dom.leftTopArea.classList.remove('show-mobile');
            WF.dom.leftTopArea.classList.remove('hide-original');
            WF.dom.mobileRightContainer.innerHTML = '';
            if (WF.state.currentView === 'modal1') {
                const modal1Element = WF.view.buildModal1View(WF.state.activeCardIndex);
                WF.utils.replaceContentAfterImagesLoaded(WF.dom.dynamicArea, modal1Element, () => {
                    WF.dom.globalBackBtn.style.display = 'block';
                });
            } else if (WF.state.currentView === 'initial') {
                WF.dom.dynamicArea.innerHTML = WF.state.initialHTML;
                WF.view.bindInitialCardsEvents();
                WF.dom.globalBackBtn.style.display = 'none';
            } else {
                WF.dom.dynamicArea.innerHTML = WF.state.initialHTML;
                WF.view.bindInitialCardsEvents();
                WF.dom.globalBackBtn.style.display = 'none';
                WF.state.currentView = 'initial';
            }
            return;
        }
        if (WF.state.currentView === 'modal1') {
            WF.view.restoreInitialView();
        } else if (WF.state.currentView === 'initial') {
            if (WF.dom.globalBackBtn.style.display === 'block') WF.dom.globalBackBtn.style.display = 'none';
        }
    };

    WF.view.bindInitialCardsEvents = function() {
        const cards = document.querySelectorAll('#initCardList .card');
        cards.forEach(card => {
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            const idx = parseInt(newCard.getAttribute('data-card-index'), 10);
            newCard.addEventListener('click', (e) => {
                e.stopPropagation();
                WF.view.showModal1View(idx);
            });
        });
    };

    WF.view.resetRightPlaceholder = function() {
        if (!WF.state.isMobileMode) {
            WF.dom.rightPanel.innerHTML = '<div class="right-placeholder">✦ 点击左侧卡片开启星见之旅 ✦</div>';
        } else {
            if (WF.dom.mobileRightContainer.children.length === 0 && !WF.dom.leftTopArea.classList.contains('show-mobile')) {
                WF.dom.mobileRightContainer.innerHTML = '<div class="right-placeholder">✦ 点击左侧卡片开启星见之旅 ✦</div>';
                if (WF.dom.leftTopArea.classList.contains('show-mobile')) {
                    WF.dom.leftTopArea.classList.remove('show-mobile');
                    WF.dom.leftTopArea.classList.remove('hide-original');
                }
            } else if (WF.dom.mobileRightContainer.children.length === 0) {
                WF.dom.mobileRightContainer.innerHTML = '';
            }
        }
    };

    WF.view.checkMobileMode = function() {
        WF.state.isMobileMode = window.innerWidth <= 800;
        if (WF.state.isMobileMode) {
            const rightHasContent = WF.dom.rightPanel.children.length > 0 &&
                                    !WF.dom.rightPanel.querySelector('.right-placeholder');
            if (rightHasContent && WF.dom.mobileRightContainer.children.length === 0) {
                const cloneContent = WF.dom.rightPanel.cloneNode(true);
                WF.dom.mobileRightContainer.innerHTML = '';
                while (cloneContent.firstChild) {
                    WF.dom.mobileRightContainer.appendChild(cloneContent.firstChild);
                }
                WF.dom.leftTopArea.classList.add('show-mobile');
                WF.dom.leftTopArea.classList.add('hide-original');
            } else if (!rightHasContent && WF.dom.mobileRightContainer.children.length === 0) {
                WF.dom.leftTopArea.classList.remove('show-mobile');
                WF.dom.leftTopArea.classList.remove('hide-original');
            }
        } else {
            WF.dom.leftTopArea.classList.remove('show-mobile');
            WF.dom.leftTopArea.classList.remove('hide-original');
            if (WF.dom.mobileRightContainer.children.length > 0) {
                const hasMeaningfulContent = WF.dom.mobileRightContainer.children.length > 0 &&
                                             !WF.dom.mobileRightContainer.querySelector('.right-placeholder');
                if (hasMeaningfulContent) {
                    WF.dom.rightPanel.innerHTML = '';
                    while (WF.dom.mobileRightContainer.firstChild) {
                        WF.dom.rightPanel.appendChild(WF.dom.mobileRightContainer.firstChild);
                    }
                }
                WF.dom.mobileRightContainer.innerHTML = '';
            } else {
                if (WF.dom.rightPanel.children.length === 0 || WF.dom.rightPanel.querySelector('.right-placeholder') === null) {
                    WF.view.resetRightPlaceholder();
                }
            }
        }
    };
})();