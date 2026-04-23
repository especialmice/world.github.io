// js/hero/grid.js
// 卡片网格渲染模块
import { sortCards } from './utils.js';
import { state, setCurrentSquareCards, setCurrentGridContainer, clearCurrentFilters } from './state.js';
import { renderRightModal2 } from './rightDetail.js';

export function createCardElement(card, cardIndex) {
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

export function renderSquareGrid(cardList, cardIndex, container) {
    if (!container) return;
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    cardList.forEach(card => fragment.appendChild(createCardElement(card, cardIndex)));
    container.appendChild(fragment);
}

// 筛选相关的网格更新
export function updateGridWithFilters() {
    if (!state.originalSquareCards.length) return;
    let filtered = [...state.originalSquareCards];
    const filters = state.currentFilters;
    if (filters.star.length) {
        filtered = filtered.filter(card => filters.star.includes(card.start));
    }
    if (filters.attribute.length) {
        filtered = filtered.filter(card => filters.attribute.includes(card.Attribute));
    }
    if (filters.gender.length) {
        filtered = filtered.filter(card => filters.gender.includes(card.gender));
    }
    if (filters.race.length) {
        filtered = filtered.filter(card => {
            if (filters.race.includes(card.race)) return true;
            if (card.race2 && card.race2.trim()) {
                const race2Trimmed = card.race2.trim();
                if (filters.race.includes(race2Trimmed)) return true;
            }
            return false;
        });
    }
    if (filters.name) {
        const nameKeyword = filters.name.toLowerCase();
        filtered = filtered.filter(card => card.name && card.name.toLowerCase().includes(nameKeyword));
    }
    const sorted = sortCards(filtered);
    setCurrentSquareCards(sorted);
    renderSquareGrid(sorted, state.activeCardIndex, state.currentGridContainer);
}