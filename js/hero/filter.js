// ==================== filter.js ====================
// 筛选相关逻辑（依赖 globals 中的 WF 对象）
(function() {
    if (!window.WF) {
        console.error('WF 未初始化，请确保 globals.js 先加载');
        return;
    }
    const WF = window.WF;

    // 应用筛选
    WF.filter = {};
    WF.filter.applyFilters = function() {
        if (!WF.state.originalSquareCards.length) return;
        let filtered = [...WF.state.originalSquareCards];
        if (WF.state.currentFilters.star.length) {
            filtered = filtered.filter(card => WF.state.currentFilters.star.includes(card.start));
        }
        if (WF.state.currentFilters.attribute.length) {
            filtered = filtered.filter(card => WF.state.currentFilters.attribute.includes(card.Attribute));
        }
        if (WF.state.currentFilters.gender.length) {
            filtered = filtered.filter(card => WF.state.currentFilters.gender.includes(card.gender));
        }
        if (WF.state.currentFilters.race.length) {
            filtered = filtered.filter(card => {
                if (WF.state.currentFilters.race.includes(card.race)) return true;
                if (card.race2 && card.race2.trim()) {
                    const race2Trimmed = card.race2.trim();
                    if (WF.state.currentFilters.race.includes(race2Trimmed)) return true;
                }
                return false;
            });
        }
        if (WF.state.currentFilters.name) {
            const nameKeyword = WF.state.currentFilters.name.toLowerCase();
            filtered = filtered.filter(card => card.name && card.name.toLowerCase().includes(nameKeyword));
        }
        WF.state.currentSquareCards = WF.utils.sortCards(filtered);
        // 渲染网格的函数在 view.js 中，这里先留空，后面由 view 模块注入
        if (WF.view && WF.view.renderSquareGrid) {
            WF.view.renderSquareGrid(WF.state.currentSquareCards, WF.state.activeCardIndex, WF.state.currentGridContainer);
        }
    };

    WF.filter.setFilters = function(filters) {
        WF.state.currentFilters = { ...filters };
        WF.filter.applyFilters();
    };

    // 创建筛选按钮组（用于弹窗）
    WF.filter.createFilterButtonGroup = function(buttons, filterType, isFilterable, tempFilters) {
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
    };

    // 显示筛选弹窗
    WF.filter.showFilterModal = function(cardIndex) {
        const isFilterable = (cardIndex === 0 || cardIndex === 1);
        let tempFilters = {
            star: [...WF.state.currentFilters.star],
            attribute: [...WF.state.currentFilters.attribute],
            gender: [...WF.state.currentFilters.gender],
            race: [...WF.state.currentFilters.race],
            name: WF.state.currentFilters.name
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
            { title: '种族' },
            { value: 'info', title: '情报' },
            { value: 'info', title: '能力效果' }
        ];

        const children = [];

        children.push(WF.utils.createOddItem(sarchtitle_local[0].title, sarchtitle_local[0].leftImg, sarchtitle_local[0].rightImg));

        const div2 = document.createElement('div');
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = '名称搜索...';
        searchInput.className = 'filter-search-input';
        if (tempFilters.name) searchInput.value = tempFilters.name;
        div2.appendChild(searchInput);
        children.push(div2);

        children.push(WF.utils.createOddItem(sarchtitle_local[1].title, sarchtitle_local[0].leftImg, sarchtitle_local[0].rightImg));
        children.push(WF.filter.createFilterButtonGroup(window.AppData.evenButtonGroups[0].buttons, 'star', isFilterable, tempFilters));

        children.push(WF.utils.createOddItem(sarchtitle_local[2].title, sarchtitle_local[0].leftImg, sarchtitle_local[0].rightImg));
        children.push(WF.filter.createFilterButtonGroup(window.AppData.evenButtonGroups[1].buttons, 'attribute', isFilterable, tempFilters));

        if (cardIndex === 0) {
            children.push(WF.utils.createOddItem(sarchtitle_local[3].title, sarchtitle_local[0].leftImg, sarchtitle_local[0].rightImg));
            const genderGroup = document.createElement('div');
            genderGroup.className = 'filter-button-group';
            window.AppData.evenButtonGroups[2].buttons.forEach(btnData => {
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

            children.push(WF.utils.createOddItem(sarchtitle_local[4].title, sarchtitle_local[0].leftImg, sarchtitle_local[0].rightImg));
            children.push(WF.filter.createFilterButtonGroup(window.AppData.evenButtonGroups[3].buttons, 'race', true, tempFilters));
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
            WF.filter.setFilters(tempFilters);
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
    };
})();