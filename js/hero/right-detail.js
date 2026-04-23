// ==================== right-detail.js ====================
// 右侧详情区域渲染（依赖 globals 和 filter 中的部分函数）
(function() {
    if (!window.WF) {
        console.error('WF 未初始化');
        return;
    }
    const WF = window.WF;

    // 辅助构建右侧详情元素
    WF.rightDetail = {};

    WF.rightDetail.createRaceItem = function(raceValue) {
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
    };

    WF.rightDetail.createLeftColumn = function(card) {
        const leftCol = document.createElement('div');
        leftCol.className = 'right-modal2-left-col';
        leftCol.style.width = '100%';
        leftCol.style.display = 'flex';
        leftCol.style.flexDirection = 'column';
        leftCol.style.justifyContent = 'center';
        leftCol.style.padding = '20px 2em';
        leftCol.style.gap = '0.2em';

        if (WF.state.activeCardIndex === 0 || WF.state.activeCardIndex === 1) {
            const div5 = document.createElement('div');
            div5.className = 'right-modal2-attr';
            div5.style.display = 'flex';
            div5.style.alignItems = 'center';
            div5.style.gap = '8px';
            const attrImg = document.createElement('img');
            const attrButton = window.AppData.evenButtonGroups[1].buttons.find(b => b.value === card.Attribute);
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

        if (WF.state.activeCardIndex === 0) {
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
            if (card.race) raceContainer.appendChild(WF.rightDetail.createRaceItem(card.race));
            if (card.race2 && card.race2.trim()) raceContainer.appendChild(WF.rightDetail.createRaceItem(card.race2.trim()));
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

        if (WF.state.activeCardIndex === 1) {
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
    };

    WF.rightDetail.createRightButtons = function() {
        const rightCol = document.createElement('div');
        rightCol.className = 'right-modal2-right-col';
        rightCol.style.display = 'flex';
        rightCol.style.position = 'absolute';
        rightCol.style.right = 'clamp(10px,8vw,35px)';
        rightCol.style.bottom = '8px';
        rightCol.style.gap = '0.5em';

        const rightButtons = window.AppData.evenButtonGroups[4];
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
                    if (WF.rightDetail.updateDetailArea) {
                        WF.rightDetail.updateDetailArea(btnData.value);
                    }
                });
                rightCol.appendChild(btn);
            });
        }
        return rightCol;
    };

    WF.rightDetail.createHeaderArea = function(card, config) {
        const div1 = document.createElement('div');
        div1.className = 'right-modal2-header-area';
        div1.style.maxHeight = '219px';
        div1.style.aspectRatio = '300 / 149';
        div1.style.position = 'relative';

        let bgUrl = null;
        if (config.rightheaderBg && config.rightheaderBg.trim() !== '') {
            bgUrl = config.rightheaderBg;
        } else {
            const mapCards = window.AppData.cardConfigs[2]?.squareCards || [];
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

        const leftCol = WF.rightDetail.createLeftColumn(card);
        const rightCol = WF.rightDetail.createRightButtons();
        contentDiv.appendChild(leftCol);
        contentDiv.appendChild(rightCol);
        div1.appendChild(contentDiv);
        return div1;
    };

    WF.rightDetail.appendTextDivs = function(container, textData) {
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
    };

    WF.rightDetail.renderAbilityData = function(container, data, attribute) {
        if (!data) return;
        if (Array.isArray(data)) {
            data.forEach(item => WF.rightDetail.renderAbilityData(container, item, attribute));
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
                    textDiv.innerHTML = WF.utils.enhanceAbilityText(line, attribute, isLeader);
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
            contentEl.innerHTML = WF.utils.enhanceAbilityText(data.content, attribute, false);
            blockDiv.appendChild(contentEl);
        }

        if (data.texts && data.texts.length) {
            data.texts.forEach(text => {
                if (text && text.trim()) {
                    const textDiv = document.createElement('div');
                    textDiv.className = 'ability-text';
                    textDiv.innerHTML = WF.utils.enhanceAbilityText(text, attribute, false);
                    blockDiv.appendChild(textDiv);
                }
            });
        }

        if (data.subsections && data.subsections.length) {
            data.subsections.forEach(sub => {
                WF.rightDetail.renderAbilityData(blockDiv, sub, attribute);
            });
        }

        container.appendChild(blockDiv);
    };

    // 动态更新详情区域（由右侧按钮触发）
    WF.rightDetail.updateDetailArea = function(buttonValue) {
        const card = WF.rightDetail.currentCard;
        const detailContainer = WF.rightDetail.currentDetailContainer;
        if (!card || !detailContainer) return;
        WF.utils.showDetailAreaLoading(detailContainer);

        const fragment = document.createDocumentFragment();
        const cardId = card.id;
        let targetArray = [];
        if (WF.state.activeCardIndex === 0) {
            targetArray = buttonValue === 'info' ? window.AppData.squareinfoCards.characterInfo : window.AppData.squareinfoCards.characterst;
        } else if (WF.state.activeCardIndex === 1) {
            targetArray = buttonValue === 'info' ? window.AppData.squareinfoCards.weaponInfo : window.AppData.squareinfoCards.weaponst;
        } else if (WF.state.activeCardIndex === 2) {
            targetArray = buttonValue === 'info' ? window.AppData.squareinfoCards.worldInfo : window.AppData.squareinfoCards.worldst;
        } else {
            return;
        }
        const matchedItems = targetArray.filter(item => item.id === cardId);
        if (matchedItems.length === 0) return;

        if (buttonValue === 'info') {
            const infoTitle = window.AppData.sarchtitle.find(t => t.value === 'info' && t.title === '情报');
            if (infoTitle) {
                fragment.appendChild(WF.utils.createOddItem(infoTitle.title, window.AppData.sarchtitle[0].leftImg, window.AppData.sarchtitle[0].rightImg));
            }
            const infoItem = matchedItems.find(item => item.title === '情报' || !item.title);
            if (infoItem && infoItem.text) {
                WF.rightDetail.appendTextDivs(fragment, infoItem.text);
            }

            if (WF.state.activeCardIndex === 0 || WF.state.activeCardIndex === 1) {
                const abilityItem = matchedItems.find(item => item.title === '能力效果');
                if (abilityItem) {
                    const abilityTitle = window.AppData.sarchtitle.find(t => t.value === 'info' && t.title === '能力效果');
                    if (abilityTitle) {
                        fragment.appendChild(WF.utils.createOddItem(abilityTitle.title, window.AppData.sarchtitle[0].leftImg, window.AppData.sarchtitle[0].rightImg));
                    }
                    if (abilityItem.data && (Array.isArray(abilityItem.data) || abilityItem.data.sections)) {
                        WF.rightDetail.renderAbilityData(fragment, abilityItem.data.sections || abilityItem.data, card.Attribute);
                    } else if (abilityItem.text) {
                        WF.rightDetail.appendTextDivs(fragment, abilityItem.text);
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
                    WF.rightDetail.appendTextDivs(fragment, item.text);
                }
            });
        }

        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✖ 关闭';
        closeBtn.className = 'detail-close-btn';
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            WF.utils.closeRightDetail();
        });
        fragment.appendChild(closeBtn);

        WF.utils.replaceContentAfterImagesLoaded(detailContainer, fragment);
    };

    // 渲染右侧详情主面板
    WF.rightDetail.renderRightModal2 = function(card) {
        WF.utils.showRightLoading();

        const config = window.AppData.cardConfigs[WF.state.activeCardIndex];
        if (!config) return;

        const modal2Container = document.createElement('div');
        modal2Container.className = 'right-modal2';
        modal2Container.style.display = 'flex';
        modal2Container.style.flexDirection = 'column';
        modal2Container.style.height = '100%';

        const headerArea = WF.rightDetail.createHeaderArea(card, config);
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

        // 保存当前卡片和详情容器供 updateDetailArea 使用
        WF.rightDetail.currentCard = card;
        WF.rightDetail.currentDetailContainer = div2;

        const container = WF.state.isMobileMode ? WF.dom.mobileRightContainer : WF.dom.rightPanel;
        WF.utils.replaceContentAfterImagesLoaded(container, modal2Container, () => {
            WF.rightDetail.updateDetailArea('info');
            if (WF.state.isMobileMode) {
                WF.dom.leftTopArea.classList.add('hide-original');
                WF.dom.leftTopArea.classList.add('show-mobile');
            }
        });
    };
})();