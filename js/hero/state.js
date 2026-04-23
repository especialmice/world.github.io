// ==================== state.js ====================
// 共享状态与DOM引用
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

// DOM 元素（在初始化时填充）
export const dom = {
    dynamicArea: null,
    globalBackBtn: null,
    rightPanel: null,
    leftTopArea: null,
    mobileRightContainer: null
};

// 初始化 DOM 引用（需要在页面加载后调用）
export function initDom() {
    dom.dynamicArea = document.getElementById('dynamicArea');
    dom.globalBackBtn = document.getElementById('globalBackBtn');
    dom.rightPanel = document.getElementById('rightPanel');
    dom.leftTopArea = document.getElementById('leftTopArea');
    dom.mobileRightContainer = document.getElementById('mobileRightContainer');
}