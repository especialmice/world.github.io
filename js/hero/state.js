// js/hero/state.js
// 全局状态管理模块
import { dom } from './dom.js';

export const state = {
    currentView: 'initial',
    activeCardIndex: -1,
    isMobileMode: false,
    initialHTML: '',
    
    // 筛选相关
    originalSquareCards: [],
    currentSquareCards: [],
    currentGridContainer: null,
    currentFilters: {
        star: [],
        attribute: [],
        gender: [],
        race: [],
        name: null
    }
};

// 状态修改辅助函数
export function setCurrentView(view) {
    state.currentView = view;
}

export function setActiveCardIndex(index) {
    state.activeCardIndex = index;
}

export function setIsMobileMode(mode) {
    state.isMobileMode = mode;
}

export function setInitialHTML(html) {
    state.initialHTML = html;
}

export function setOriginalSquareCards(cards) {
    state.originalSquareCards = cards;
}

export function setCurrentSquareCards(cards) {
    state.currentSquareCards = cards;
}

export function setCurrentGridContainer(container) {
    state.currentGridContainer = container;
}

export function updateCurrentFilters(newFilters) {
    state.currentFilters = { ...newFilters };
}

export function clearCurrentFilters() {
    state.currentFilters = {
        star: [],
        attribute: [],
        gender: [],
        race: [],
        name: null
    };
}