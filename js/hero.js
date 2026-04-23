(function() {
    // 从全局获取数据
    const { cardConfigs, squareinfoCards, evenButtonGroups, sarchtitle } = window.AppData;
    // ==================== DOM 元素获取 ====================
    const dynamicArea = document.getElementById('dynamicArea');
    const globalBackBtn = document.getElementById('globalBackBtn');
    const rightPanel = document.getElementById('rightPanel');
    const leftTopArea = document.getElementById('leftTopArea');
    const mobileRightContainer = document.getElementById('mobileRightContainer');

    // ==================== 状态变量 ====================
    let currentView = 'initial';
    let activeCardIndex = -1;
    let isMobileMode = false;
    let initialHTML = '';

    // 筛选相关全局变量
    let originalSquareCards = [];
    let currentSquareCards = [];
    let currentGridContainer = null;
    let currentFilters = {
        star: [],
        attribute: [],
        gender: [],
        race: [],
        name: null
    };


    // ==================== 关闭右侧详情区域 ====================
function closeRightDetail() {
    if (isMobileMode) {
        // 移动端：清空 mobileRightContainer，恢复左侧视图
        mobileRightContainer.innerHTML = '';
        leftTopArea.classList.remove('show-mobile');
        leftTopArea.classList.remove('hide-original');
        // 可选：如果右侧容器没有任何内容，可以重置右侧占位符（但移动端不显示右侧面板，非必须）
    } else {
        // 桌面端：重置右侧面板为占位符
        rightPanel.innerHTML = '<div class="right-placeholder">✦ 点击左侧卡片开启星见之旅 ✦</div>';
    }
}

    // ---------- 加载动画辅助函数 ----------
    function createLoaderElement() {
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

    function showLeftLoading() {
        dynamicArea.innerHTML = '';
        const loader = createLoaderElement();
        loader.style.height = '100%';
        dynamicArea.appendChild(loader);
    }

    function showRightLoading() {
        const container = isMobileMode ? mobileRightContainer : rightPanel;
        container.innerHTML = '';
        const loader = createLoaderElement();
        loader.style.height = '100%';
        container.appendChild(loader);
    }

    function showDetailAreaLoading(detailArea) {
        detailArea.innerHTML = '';
        const loader = createLoaderElement();
        loader.style.height = '100%';
        detailArea.appendChild(loader);
    }

    // ---------- 核心：等待图片加载完成后替换内容 ----------
    /**
     * 将容器中的加载动画替换为给定的内容元素，并等待内容中所有图片加载完成
     * @param {HTMLElement} container 显示加载动画的容器
     * @param {HTMLElement|DocumentFragment} newContent 要放入的新内容
     * @param {Function} callback 可选，在替换完成并显示后执行的回调
     */
    function replaceContentAfterImagesLoaded(container, newContent, callback) {
    // 创建临时容器并挂载到 body（隐藏），确保背景图片请求被触发
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

    // 收集所有 <img> 标签的 src
    const imgElements = tempDiv.querySelectorAll('img');
    const imageUrls = new Set();
    imgElements.forEach(img => {
        if (img.src) imageUrls.add(img.src);
    });

    // 收集所有元素的背景图片 URL（通过 getComputedStyle，此时元素已在文档中）
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
        // 移除临时容器
        document.body.removeChild(tempDiv);
        // 替换真实内容
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

    // 为每个 URL 创建 Image 对象进行预加载监听
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

    // 超时保护（延长至 8 秒，适应慢速网络）
    setTimeout(() => {
        if (loadedCount < totalImages) {
            console.warn('图片加载超时，强制显示内容');
            finalize();
        }
    }, 20000);
}

    // ==================== 辅助函数 ====================
    function createOddItem(title, leftImg, rightImg) {
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

    function sortCards(cards) {
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

    // ==================== 能力效果文本增强相关函数 ====================
    function getOppositeAttribute(attr) {
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

    function enhanceAbilityText(text, attribute, isLeader = false) {
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

    // ==================== 筛选相关函数 ====================
    function applyFilters() {
        if (!originalSquareCards.length) return;
        let filtered = [...originalSquareCards];
        if (currentFilters.star.length) {
            filtered = filtered.filter(card => currentFilters.star.includes(card.start));
        }
        if (currentFilters.attribute.length) {
            filtered = filtered.filter(card => currentFilters.attribute.includes(card.Attribute));
        }
        if (currentFilters.gender.length) {
            filtered = filtered.filter(card => currentFilters.gender.includes(card.gender));
        }
        if (currentFilters.race.length) {
            filtered = filtered.filter(card => {
                if (currentFilters.race.includes(card.race)) return true;
                if (card.race2 && card.race2.trim()) {
                    const race2Trimmed = card.race2.trim();
                    if (currentFilters.race.includes(race2Trimmed)) return true;
                }
                return false;
            });
        }
        if (currentFilters.name) {
            const nameKeyword = currentFilters.name.toLowerCase();
            filtered = filtered.filter(card => card.name && card.name.toLowerCase().includes(nameKeyword));
        }
        currentSquareCards = sortCards(filtered);
        renderSquareGrid(currentSquareCards, activeCardIndex, currentGridContainer);
    }

    function setFilters(filters) {
        currentFilters = { ...filters };
        applyFilters();
    }

    // ==================== 网格渲染 ====================
    function createCardElement(card, cardIndex) {
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
            renderRightModal2(card);
        });
        return sqCard;
    }

    function renderSquareGrid(cardList, cardIndex, container) {
        if (!container) return;
        container.innerHTML = '';
        const fragment = document.createDocumentFragment();
        cardList.forEach(card => fragment.appendChild(createCardElement(card, cardIndex)));
        container.appendChild(fragment);
    }

    // ==================== 右侧详情区域 ====================
    function createRaceItem(raceValue) {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.gap = '4px';
        const text = document.createElement('span');
        text.textContent = raceValue;
        const img = document.createElement('img');
        const raceBtn = evenButtonGroups[3].buttons.find(b => b.value === raceValue);
        img.src = raceBtn ? raceBtn.image2 : '';
        img.alt = raceValue;
        img.style.height = '1em';
        item.appendChild(text);
        item.appendChild(img);
        return item;
    }

    function createLeftColumn(card) {
        const leftCol = document.createElement('div');
        leftCol.className = 'right-modal2-left-col';
        leftCol.style.width = '100%';
        leftCol.style.display = 'flex';
        leftCol.style.flexDirection = 'column';
        leftCol.style.justifyContent = 'center';
        leftCol.style.padding = '20px 2em';
        leftCol.style.gap = '0.2em';

        if (activeCardIndex === 0 || activeCardIndex === 1) {
            const div5 = document.createElement('div');
            div5.className = 'right-modal2-attr';
            div5.style.display = 'flex';
            div5.style.alignItems = 'center';
            div5.style.gap = '8px';
            const attrImg = document.createElement('img');
            const attrButton = evenButtonGroups[1].buttons.find(b => b.value === card.Attribute);
            attrImg.src = attrButton ? attrButton.image : '';
            attrImg.alt = card.Attribute || '';
            attrImg.style.height = '1em';
            const attrText = document.createElement('div');
            attrText.textContent = card.designation || '';
            div5.appendChild(attrImg);
            div5.appendChild(attrText);
            leftCol.appendChild(div5);

            const div6 = document.createElement('div');
            div6.className = 'right-modal2-name';
            div6.textContent = card.name || '';
            div6.style.fontSize = '2em';
            div6.style.fontWeight = '500';
            leftCol.appendChild(div6);
        }

        if (activeCardIndex === 0) {
            const div7 = document.createElement('div');
            div7.className = 'right-modal2-race';
            div7.style.display = 'flex';
            div7.style.padding = '2em  0 0 0';
            div7.style.gap = '4px';
            const raceLabel = document.createElement('div');
            raceLabel.textContent = '种族：';
            raceLabel.style.fontWeight = '500';
            div7.appendChild(raceLabel);
            const raceContainer = document.createElement('div');
            raceContainer.style.display = 'flex';
            raceContainer.style.gap = '8px';
            raceContainer.style.flexWrap = 'wrap';
            if (card.race) raceContainer.appendChild(createRaceItem(card.race));
            if (card.race2 && card.race2.trim()) raceContainer.appendChild(createRaceItem(card.race2.trim()));
            div7.appendChild(raceContainer);
            leftCol.appendChild(div7);

            const div8 = document.createElement('div');
            div8.className = 'right-modal2-gender';
            div8.style.display = 'flex';
            div8.style.gap = '8px';
            const genderLabelDiv = document.createElement('div');
            genderLabelDiv.textContent = '性别：';
            genderLabelDiv.style.fontWeight = '500';
            const genderValueDiv = document.createElement('div');
            genderValueDiv.textContent = card.gender || '';
            div8.appendChild(genderLabelDiv);
            div8.appendChild(genderValueDiv);
            leftCol.appendChild(div8);

            const div9 = document.createElement('div');
            div9.className = 'right-modal2-cv';
            div9.textContent = `CV：${card.cv || '待公开'}`;
            div9.style.fontWeight = '500';
            div9.style.padding = '2px 0px 5px 0';
            leftCol.appendChild(div9);
        }

        if (activeCardIndex === 1) {
            const div11 = document.createElement('div');
            div11.className = 'right-modal2-image-placeholder';
            div11.style.display = 'flex';
            div11.style.justifyContent = 'left';
            div11.style.alignItems = 'center';
            div11.style.marginTop = '20px';
            const img = document.createElement('img');
            img.src = card.cdbg1;
            img.alt = '';
            img.style.maxWidth = '80%';
            img.style.maxHeight = '4em';
            img.style.objectFit = 'contain';
            div11.appendChild(img);
            leftCol.appendChild(div11);
        }

        return leftCol;
    }

    function createRightButtons() {
        const rightCol = document.createElement('div');
        rightCol.className = 'right-modal2-right-col';
        rightCol.style.display = 'flex';
        rightCol.style.position = 'absolute';
        rightCol.style.right = 'clamp(10px,8vw,35px)';
        rightCol.style.bottom = '8px';
        rightCol.style.gap = '0.5em';

        const rightButtons = evenButtonGroups[4];
        if (rightButtons && rightButtons.buttons) {
            rightButtons.buttons.forEach(btnData => {
                const btn = document.createElement('button');
                btn.className = 'button';
                btn.style.width = '8vw';
                btn.style.height = '8vw';
                btn.style.maxWidth = 'clamp(10px,8vw,35px)';
                btn.style.maxHeight = 'clamp(10px,8vw,35px)';
                btn.style.padding = '0';
                btn.style.cursor = 'pointer';
                btn.style.border = '1px #0000004d';
                btn.style.borderRadius = '50%';
                btn.style.backgroundColor = '#ffffff';
                const img = document.createElement('img');
                img.src = btnData.image;
                img.alt = btnData.label;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                btn.appendChild(img);
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    updateDetailArea(btnData.value);
                });
                rightCol.appendChild(btn);
            });
        }
        return rightCol;
    }

    function createHeaderArea(card, config) {
        const div1 = document.createElement('div');
        div1.className = 'right-modal2-header-area';
        div1.style.maxHeight = '219px';
        div1.style.aspectRatio = '300 / 149';
        div1.style.position = 'relative';

        let bgUrl = null;
        if (config.rightheaderBg && config.rightheaderBg.trim() !== '') {
            bgUrl = config.rightheaderBg;
        } else {
            const mapCards = cardConfigs[2]?.squareCards || [];
            const matchedMapCard = mapCards.find(mapCard => mapCard.id === card.id);
            if (matchedMapCard && matchedMapCard.rightheaderBg && matchedMapCard.rightheaderBg.trim() !== '') {
                bgUrl = matchedMapCard.rightheaderBg;
            }
        }
        if (bgUrl) {
            div1.style.backgroundImage = `url('${bgUrl}')`;
            div1.style.backgroundSize = 'cover';
            div1.style.backgroundPosition = 'top center';
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'right-modal2-content';
        contentDiv.style.position = 'absolute';
        contentDiv.style.color = '#ffffff';
        contentDiv.style.top = '0';
        contentDiv.style.left = '0';
        contentDiv.style.width = '95%';
        contentDiv.style.height = '100%';
        if (card.cg) {
            contentDiv.style.backgroundImage = `url('${card.cg}')`;
            contentDiv.style.backgroundSize = 'contain';
            contentDiv.style.backgroundRepeat = 'no-repeat';
            contentDiv.style.backgroundPosition = 'right  center';
        }
        contentDiv.style.display = 'flex';
        contentDiv.style.alignItems = 'stretch';
        contentDiv.style.padding = '0 5px';

        const leftCol = createLeftColumn(card);
        const rightCol = createRightButtons();
        contentDiv.appendChild(leftCol);
        contentDiv.appendChild(rightCol);
        div1.appendChild(contentDiv);
        return div1;
    }

    function appendTextDivs(container, textData) {
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

    function renderAbilityData(container, data, attribute) {
        if (!data) return;
        if (Array.isArray(data)) {
            data.forEach(item => renderAbilityData(container, item, attribute));
            return;
        }

        if (data.title === '能力' && data.subsections && data.subsections.length) {
            const outerDiv = document.createElement('div');
            outerDiv.className = 'ability-section ability-section-active';

            const outerTitle = document.createElement('div');
            outerTitle.className = 'ability-section-title ability-section-title-active';
            outerTitle.textContent = '能力';
            outerDiv.appendChild(outerTitle);

            data.subsections.forEach(sub => {
                const skillItem = document.createElement('div');
                skillItem.className = 'ability-skill-item';

                const leftCol = document.createElement('div');
                leftCol.className = 'ability-skill-left';

                const numberDiv = document.createElement('div');
                numberDiv.className = 'ability-skill-number';
                numberDiv.textContent = sub.title || '';

                const lineDiv = document.createElement('div');
                lineDiv.className = 'ability-skill-line';

                leftCol.appendChild(numberDiv);
                leftCol.appendChild(lineDiv);

                const rightCol = document.createElement('div');
                rightCol.className = 'ability-skill-right';

                let lines = [];
                if (sub.texts && Array.isArray(sub.texts)) {
                    sub.texts.forEach(t => {
                        if (typeof t === 'string') {
                            lines.push(...t.split('\n').filter(l => l.trim()));
                        } else if (t) {
                            lines.push(String(t));
                        }
                    });
                }
                if (sub.content) {
                    lines.push(...String(sub.content).split('\n').filter(l => l.trim()));
                }

                lines = lines.filter(line => line && line.trim());
                const isLeader = sub.lid === 'leader';
                lines.forEach(line => {
                    const textDiv = document.createElement('div');
                    textDiv.className = 'ability-text';
                    textDiv.innerHTML = enhanceAbilityText(line, attribute, isLeader);
                    rightCol.appendChild(textDiv);
                });

                skillItem.appendChild(leftCol);
                skillItem.appendChild(rightCol);
                outerDiv.appendChild(skillItem);
            });

            container.appendChild(outerDiv);
            return;
        }

        const blockDiv = document.createElement('div');
        blockDiv.className = 'ability-section';
        if (data.type) {
            blockDiv.classList.add(`ability-section-${data.type}`);
        }

        if (data.title) {
            const titleEl = document.createElement('div');
            titleEl.className = 'ability-section-title';
            titleEl.textContent = data.title;
            blockDiv.appendChild(titleEl);
        }

        if (data.content) {
            const contentEl = document.createElement('div');
            contentEl.className = 'ability-section-content';
            contentEl.innerHTML = enhanceAbilityText(data.content, attribute, false);
            blockDiv.appendChild(contentEl);
        }

        if (data.texts && data.texts.length) {
            data.texts.forEach(text => {
                if (text && text.trim()) {
                    const textDiv = document.createElement('div');
                    textDiv.className = 'ability-text';
                    textDiv.innerHTML = enhanceAbilityText(text, attribute, false);
                    blockDiv.appendChild(textDiv);
                }
            });
        }

        if (data.subsections && data.subsections.length) {
            data.subsections.forEach(sub => {
                renderAbilityData(blockDiv, sub, attribute);
            });
        }

        container.appendChild(blockDiv);
    }

    function renderRightModal2(card) {
        showRightLoading();

        const config = cardConfigs[activeCardIndex];
        if (!config) return;

        const modal2Container = document.createElement('div');
        modal2Container.className = 'right-modal2';
        modal2Container.style.display = 'flex';
        modal2Container.style.flexDirection = 'column';
        modal2Container.style.height = '100%';

        const headerArea = createHeaderArea(card, config);
        modal2Container.appendChild(headerArea);

        const div2 = document.createElement('div');
        div2.className = 'right-modal2-detail-area';
        div2.style.display = 'flex';
        div2.style.flexDirection = 'column';
        div2.style.width = '100%';
        div2.style.overflow = 'auto';
        div2.style.padding = '10px';
        div2.style.gap = '0.1em';
        div2.style.borderRadius = '8px';
        div2.style.marginTop = '8px';
        modal2Container.appendChild(div2);

        function updateDetailArea(buttonValue) {
            showDetailAreaLoading(div2);

            // 构建新内容
            const fragment = document.createDocumentFragment();
            const cardId = card.id;
            let targetArray = [];
            if (activeCardIndex === 0) {
                targetArray = buttonValue === 'info' ? squareinfoCards.characterInfo : squareinfoCards.characterst;
            } else if (activeCardIndex === 1) {
                targetArray = buttonValue === 'info' ? squareinfoCards.weaponInfo : squareinfoCards.weaponst;
            } else if (activeCardIndex === 2) {
                targetArray = buttonValue === 'info' ? squareinfoCards.worldInfo : squareinfoCards.worldst;
            } else {
                return;
            }
            const matchedItems = targetArray.filter(item => item.id === cardId);
            if (matchedItems.length === 0) return;

            if (buttonValue === 'info') {
                const infoTitle = sarchtitle.find(t => t.value === 'info' && t.title === '情报');
                if (infoTitle) {
                    fragment.appendChild(createOddItem(infoTitle.title, sarchtitle[0].leftImg, sarchtitle[0].rightImg));
                }
                const infoItem = matchedItems.find(item => item.title === '情报' || !item.title);
                if (infoItem && infoItem.text) {
                    appendTextDivs(fragment, infoItem.text);
                }

                if (activeCardIndex === 0 || activeCardIndex === 1) {
                    const abilityItem = matchedItems.find(item => item.title === '能力效果');
                    if (abilityItem) {
                        const abilityTitle = sarchtitle.find(t => t.value === 'info' && t.title === '能力效果');
                        if (abilityTitle) {
                            fragment.appendChild(createOddItem(abilityTitle.title, sarchtitle[0].leftImg, sarchtitle[0].rightImg));
                        }
                        if (abilityItem.data && (Array.isArray(abilityItem.data) || abilityItem.data.sections)) {
                            renderAbilityData(fragment, abilityItem.data.sections || abilityItem.data, card.Attribute);
                        } else if (abilityItem.text) {
                            appendTextDivs(fragment, abilityItem.text);
                        }
                    }
                }
            } else if (buttonValue === 'story') {
                matchedItems.forEach(item => {
                    if (item.sections) {
                        item.sections.forEach(section => {
                            const sectionContainer = document.createElement('div');
                            sectionContainer.className = 'story-section';

                            const titleEl = document.createElement('div');
                            titleEl.className = 'story-section-title';
                            titleEl.textContent = section.title;

                            const contentEl = document.createElement('div');
                            contentEl.className = 'story-section-content';
                            contentEl.textContent = section.content;

                            sectionContainer.appendChild(titleEl);
                            sectionContainer.appendChild(contentEl);
                            fragment.appendChild(sectionContainer);
                        });
                    } else if (item.text) {
                        appendTextDivs(fragment, item.text);
                    }
                });
            }
            // 添加关闭按钮
const closeBtn = document.createElement('button');
closeBtn.textContent = '✖ 关闭';
closeBtn.className = 'detail-close-btn';
closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeRightDetail();
});
fragment.appendChild(closeBtn);

            // 等待图片加载完成后替换内容
            replaceContentAfterImagesLoaded(div2, fragment);
        }

        const buttons = modal2Container.querySelectorAll('.right-modal2-right-col button');
        buttons.forEach(btn => {
            const btnValue = btn.querySelector('img')?.alt;
            if (btnValue === 'info' || btnValue === 'story') {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    updateDetailArea(btnValue);
                };
            }
        });

        const container = isMobileMode ? mobileRightContainer : rightPanel;
        // 等待右侧主内容图片加载完成
        replaceContentAfterImagesLoaded(container, modal2Container, () => {
            updateDetailArea('info');
            if (isMobileMode) {
                leftTopArea.classList.add('hide-original');
                leftTopArea.classList.add('show-mobile');
            }
        });
    }

    // ==================== 筛选弹窗 ====================
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

    function showFilterModal(cardIndex) {
        const isFilterable = (cardIndex === 0 || cardIndex === 1);
        let tempFilters = {
            star: [...currentFilters.star],
            attribute: [...currentFilters.attribute],
            gender: [...currentFilters.gender],
            race: [...currentFilters.race],
            name: currentFilters.name
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
        children.push(createFilterButtonGroup(evenButtonGroups[0].buttons, 'star', isFilterable, tempFilters));

        children.push(createOddItem(sarchtitle_local[2].title, sarchtitle_local[0].leftImg, sarchtitle_local[0].rightImg));
        children.push(createFilterButtonGroup(evenButtonGroups[1].buttons, 'attribute', isFilterable, tempFilters));

        if (cardIndex === 0) {
            children.push(createOddItem(sarchtitle_local[3].title, sarchtitle_local[0].leftImg, sarchtitle_local[0].rightImg));
            const genderGroup = document.createElement('div');
            genderGroup.className = 'filter-button-group';
            evenButtonGroups[2].buttons.forEach(btnData => {
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

            children.push(createOddItem(sarchtitle_local[4].title, sarchtitle_local[0].leftImg, sarchtitle_local[0].rightImg));
            children.push(createFilterButtonGroup(evenButtonGroups[3].buttons, 'race', true, tempFilters));
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

    // ==================== 构建模态框1 ====================
    function buildModal1View(cardIndex) {
        const modalWrapper = document.createElement('div');
        modalWrapper.className = 'modal1-wrapper';

        const config = cardConfigs[cardIndex] || cardConfigs[0];

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
        currentGridContainer = gridContainer;

        originalSquareCards = JSON.parse(JSON.stringify(config.squareCards));
        currentSquareCards = sortCards([...originalSquareCards]);
        currentFilters = { star: [], attribute: [], gender: [], race: [], name: null };
        renderSquareGrid(currentSquareCards, cardIndex, gridContainer);

        div5.appendChild(gridContainer);
        modalWrapper.appendChild(div4);
        modalWrapper.appendChild(div5);
        return modalWrapper;
    }

    // ==================== 视图切换 ====================
    function showModal1View(cardIndex) {
        showLeftLoading();

        const modal1Element = buildModal1View(cardIndex);
        // 等待图片加载完成后替换
        replaceContentAfterImagesLoaded(dynamicArea, modal1Element, () => {
            currentView = 'modal1';
            activeCardIndex = cardIndex;
            globalBackBtn.style.display = 'block';
        });
    }

    function restoreInitialView() {
        if (currentView === 'initial') return;
        dynamicArea.innerHTML = initialHTML;
        bindInitialCardsEvents();
        currentView = 'initial';
        activeCardIndex = -1;
        globalBackBtn.style.display = 'none';
        if (isMobileMode && leftTopArea.classList.contains('show-mobile')) {
            leftTopArea.classList.remove('show-mobile');
            leftTopArea.classList.remove('hide-original');
            mobileRightContainer.innerHTML = '';
            resetRightPlaceholder();
        }
    }

    function handleBack() {
        if (isMobileMode && leftTopArea.classList.contains('show-mobile')) {
            leftTopArea.classList.remove('show-mobile');
            leftTopArea.classList.remove('hide-original');
            mobileRightContainer.innerHTML = '';
            if (currentView === 'modal1') {
                const modal1Element = buildModal1View(activeCardIndex);
                replaceContentAfterImagesLoaded(dynamicArea, modal1Element, () => {
                    globalBackBtn.style.display = 'block';
                });
            } else if (currentView === 'initial') {
                dynamicArea.innerHTML = initialHTML;
                bindInitialCardsEvents();
                globalBackBtn.style.display = 'none';
            } else {
                dynamicArea.innerHTML = initialHTML;
                bindInitialCardsEvents();
                globalBackBtn.style.display = 'none';
                currentView = 'initial';
            }
            return;
        }
        if (currentView === 'modal1') {
            restoreInitialView();
        } else if (currentView === 'initial') {
            if (globalBackBtn.style.display === 'block') globalBackBtn.style.display = 'none';
        }
    }

    function bindInitialCardsEvents() {
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

    function resetRightPlaceholder() {
        if (!isMobileMode) {
            rightPanel.innerHTML = '<div class="right-placeholder">✦ 点击左侧卡片开启星见之旅 ✦</div>';
        } else {
            if (mobileRightContainer.children.length === 0 && !leftTopArea.classList.contains('show-mobile')) {
                mobileRightContainer.innerHTML = '<div class="right-placeholder">✦ 点击左侧卡片开启星见之旅 ✦</div>';
                if (leftTopArea.classList.contains('show-mobile')) {
                    leftTopArea.classList.remove('show-mobile');
                    leftTopArea.classList.remove('hide-original');
                }
            } else if (mobileRightContainer.children.length === 0) {
                mobileRightContainer.innerHTML = '';
            }
        }
    }

    function checkMobileMode() {
        isMobileMode = window.innerWidth <= 800;
        if (isMobileMode) {
            const rightHasContent = rightPanel.children.length > 0 &&
                                    !rightPanel.querySelector('.right-placeholder');
            if (rightHasContent && mobileRightContainer.children.length === 0) {
                const cloneContent = rightPanel.cloneNode(true);
                mobileRightContainer.innerHTML = '';
                while (cloneContent.firstChild) {
                    mobileRightContainer.appendChild(cloneContent.firstChild);
                }
                leftTopArea.classList.add('show-mobile');
                leftTopArea.classList.add('hide-original');
            } else if (!rightHasContent && mobileRightContainer.children.length === 0) {
                leftTopArea.classList.remove('show-mobile');
                leftTopArea.classList.remove('hide-original');
            }
        } else {
            leftTopArea.classList.remove('show-mobile');
            leftTopArea.classList.remove('hide-original');
            if (mobileRightContainer.children.length > 0) {
                const hasMeaningfulContent = mobileRightContainer.children.length > 0 &&
                                             !mobileRightContainer.querySelector('.right-placeholder');
                if (hasMeaningfulContent) {
                    rightPanel.innerHTML = '';
                    while (mobileRightContainer.firstChild) {
                        rightPanel.appendChild(mobileRightContainer.firstChild);
                    }
                }
                mobileRightContainer.innerHTML = '';
            } else {
                if (rightPanel.children.length === 0 || rightPanel.querySelector('.right-placeholder') === null) {
                    resetRightPlaceholder();
                }
            }
        }
    }

    function init() {
        const initialClone = dynamicArea.cloneNode(true);
        initialHTML = initialClone.innerHTML;
        bindInitialCardsEvents();
        globalBackBtn.addEventListener('click', handleBack);
        resetRightPlaceholder();
        globalBackBtn.style.display = 'none';
        currentView = 'initial';

        window.addEventListener('resize', () => {
            const wasMobile = isMobileMode;
            checkMobileMode();
            if (wasMobile !== isMobileMode) {
                if (!isMobileMode && leftTopArea.classList.contains('show-mobile')) {
                    if (mobileRightContainer.children.length > 0) {
                        rightPanel.innerHTML = '';
                        while (mobileRightContainer.firstChild) {
                            rightPanel.appendChild(mobileRightContainer.firstChild);
                        }
                    }
                    leftTopArea.classList.remove('show-mobile');
                    leftTopArea.classList.remove('hide-original');
                    mobileRightContainer.innerHTML = '';
                } else if (isMobileMode && rightPanel.children.length > 0 && !rightPanel.querySelector('.right-placeholder')) {
                    const cloneContent = rightPanel.cloneNode(true);
                    mobileRightContainer.innerHTML = '';
                    while (cloneContent.firstChild) {
                        mobileRightContainer.appendChild(cloneContent.firstChild);
                    }
                    rightPanel.innerHTML = '<div class="right-placeholder">✦ 点击左侧卡片开启星见之旅 ✦</div>';
                    if (mobileRightContainer.children.length > 0) {
                        leftTopArea.classList.add('show-mobile');
                        leftTopArea.classList.add('hide-original');
                    }
                }
            }
            if (currentView === 'modal1') globalBackBtn.style.display = 'block';
            else globalBackBtn.style.display = 'none';
        });
        checkMobileMode();
    }

    init();
})();