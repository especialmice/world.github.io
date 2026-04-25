// 镜像列表
const CDN_MIRRORS = [
    'https://cdn.osyb.cn/gh/especialmice/world.github.io@main',
    'https://jsd.cdn.zzko.cn/gh/especialmice/world.github.io@main',
    'https://jsd.onmicrosoft.cn/gh/especialmice/world.github.io@main',
    'https://cdn.jsdelivr.net/gh/especialmice/world.github.io@main'
];

// 探测函数：返回第一个可用的镜像
async function detectFastestMirror() {
    const testPath = '/img/sarch/char/1/1.png'; // 选择一个必定存在的小图片用于测试
    const timeout = 3000; // 单个镜像超时时间

    const promises = CDN_MIRRORS.map(async (mirror, index) => {
        const url = mirror + testPath;
        try {
            await new Promise((resolve, reject) => {
                const img = new Image();
                const timer = setTimeout(() => reject(new Error('timeout')), timeout);
                img.onload = () => {
                    clearTimeout(timer);
                    resolve();
                };
                img.onerror = () => {
                    clearTimeout(timer);
                    reject(new Error('error'));
                };
                img.src = url;
            });
            console.log(`✅ 镜像可用 (${index + 1}/${CDN_MIRRORS.length}): ${mirror}`);
            return mirror;
        } catch (e) {
            console.warn(`❌ 镜像不可用 (${index + 1}/${CDN_MIRRORS.length}): ${mirror}`);
            return null;
        }
    });

    // 等待第一个成功的镜像
    for (const promise of promises) {
        const result = await promise;
        if (result) return result;
    }
    // 全部失败则返回第一个（原始CDN）
    console.error('所有镜像均不可用，回退到原始CDN');
    return CDN_MIRRORS[CDN_MIRRORS.length - 1];
}

// 全局变量，将在初始化后赋值
let CDN_BASE = CDN_MIRRORS[0];

// 启动探测并更新 CDN_BASE
(async function initCDN() {
    const bestMirror = await detectFastestMirror();
    CDN_BASE = bestMirror;
    window.CDN_BASE = bestMirror; // 挂载到全局供其他脚本使用
    console.log(`🚀 最终使用的CDN: ${CDN_BASE}`);
})();

window.AppData = {
   cardConfigs:  [
        {
            // 卡片0
            headerBg: CDN_BASE + '/img/sarch/title/char/keyword_list_character_header_background2.png',
            rightheaderBg: CDN_BASE + '/img/sarch/title/char/keyword_details_character_background.png', // 右侧顶部背景图（可添加路径）
            squareCards: [
                { id: 'char1', name: '阿尔克', cv: '逢坂良太', start: '4', Attribute: '火', race: '人', gender: '男' , cdbg1: CDN_BASE + '/img/sarch/char/1/1.png', cdbg2: CDN_BASE + '/img/sarch/char/1/2.png' ,cg:CDN_BASE + '/img/sarch/char/1/cg/1.png'},
                { id: 'char2', name: '克拉莉丝', cv:'佐仓绫音', start: '5', Attribute: '火', race: '人', race2: '精灵', gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/2/1.png', cdbg2: CDN_BASE + '/img/sarch/char/2/2.png',cg:CDN_BASE + '/img/sarch/char/2/cg/1.png' },
                { id: 'char3', name: '玛丽安', cv:'山本希望',start: '5', Attribute: '火', race: '人', gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/3/1.png', cdbg2: CDN_BASE + '/img/sarch/char/3/2.png',cg:CDN_BASE + '/img/sarch/char/3/cg/1.png' },
                { id: 'char6', name: '塞拉', cv:'悠木碧',start: '5', Attribute: '雷', race: '人', race2: '机械',gender: '女' , cdbg1: CDN_BASE + '/img/sarch/char/6/1.png', cdbg2: CDN_BASE + '/img/sarch/char/6/2.png' ,cg:CDN_BASE + '/img/sarch/char/6/cg/1.png'},
                { id: 'char7', name: '牡丹', cv:'竹达彩奈',start: '5', Attribute: '雷', race: '人',gender: '女' , cdbg1: CDN_BASE + '/img/sarch/char/7/1.png', cdbg2: CDN_BASE + '/img/sarch/char/7/2.png',cg:CDN_BASE + '/img/sarch/char/7/cg/1.png' },
                { id: 'char14', name: '赛法', cv:'五十岚裕美',start: '5', Attribute: '水', race: '人', race2: '精灵',gender: '女' , cdbg1: CDN_BASE + '/img/sarch/char/14/1.png', cdbg2: CDN_BASE + '/img/sarch/char/14/2.png',cg:CDN_BASE + '/img/sarch/char/14/cg/1.png' },
                { id: 'char15', name: '雷拉斯', cv:'齐藤壮马',start: '5', Attribute: '水', race: '人', gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/15/1.png', cdbg2: CDN_BASE + '/img/sarch/char/15/2.png',cg:CDN_BASE + '/img/sarch/char/15/cg/1.png' },
                { id: 'char16', name: '罗尔夫', cv:'上田燿司',start: '5', Attribute: '火', race: '人', race2: '兽',gender: '男' , cdbg1: CDN_BASE + '/img/sarch/char/16/1.png', cdbg2: CDN_BASE + '/img/sarch/char/16/2.png',cg:CDN_BASE + '/img/sarch/char/16/cg/1.png' },
                { id: 'char20', name: '雷恩', cv:'稻田彻',start: '5', Attribute: '风', race: '人',gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/20/1.png', cdbg2: CDN_BASE + '/img/sarch/char/20/2.png' ,cg:CDN_BASE + '/img/sarch/char/20/cg/1.png'},
                { id: 'char21', name: '西微', cv:'本渡枫',start: '5', Attribute: '风', race: '人', race2: '精灵', gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/21/1.png', cdbg2: CDN_BASE + '/img/sarch/char/21/2.png' ,cg:CDN_BASE + '/img/sarch/char/21/cg/1.png' },
                { id: 'char25', name: '稻穗', cv:'小泽亚李',start: '5', Attribute: '光', race: '妖', gender: '女' , cdbg1: CDN_BASE + '/img/sarch/char/25/1.png', cdbg2: CDN_BASE + '/img/sarch/char/25/2.png' ,cg:CDN_BASE + '/img/sarch/char/25/cg/1.png' },
                { id: 'char26', name: '塔吉斯', cv:'小西克幸',start: '5', Attribute: '光', race: '人', race2: '机械',gender: '男' , cdbg1: CDN_BASE + '/img/sarch/char/26/1.png', cdbg2: CDN_BASE + '/img/sarch/char/26/2.png' ,cg:CDN_BASE + '/img/sarch/char/26/cg/1.png'},
                { id: 'char30', name: '卡菈', cv:'高野麻里佳＆矢尾一树',start: '5', Attribute: '暗', race: '人', race2: '精灵', gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/30/1.png', cdbg2: CDN_BASE + '/img/sarch/char/30/2.png',cg:CDN_BASE + '/img/sarch/char/30/cg/1.png' },
                { id: 'char31', name: '奥莉维尔', cv:'坂本真绫',start: '5', Attribute: '暗', race: '人',  race2: '精灵',gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/31/1.png', cdbg2: CDN_BASE + '/img/sarch/char/31/2.png' ,cg:CDN_BASE + '/img/sarch/char/31/cg/1.png'},
                { id: 'char35', name: '阿须桐丸', cv:'山下大辉',start: '4', Attribute: '火', race: '人', gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/35/1.png', cdbg2: CDN_BASE + '/img/sarch/char/35/2.png',cg:CDN_BASE + '/img/sarch/char/35/cg/1.png' },
                { id: 'char39', name: '爱丽丝', cv:'大久保瑠美',start: '4', Attribute: '水', race: '人', race2: '精灵', gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/39/1.png', cdbg2: CDN_BASE + '/img/sarch/char/39/2.png',cg:CDN_BASE + '/img/sarch/char/39/cg/1.png' },
                { id: 'char40', name: '夏农', cv:'高木美佑',start: '4', Attribute: '水', race: '人', gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/40/1.png', cdbg2: CDN_BASE + '/img/sarch/char/40/2.png' ,cg:CDN_BASE + '/img/sarch/char/40/cg/1.png'},
                { id: 'char44', name: '艾琳诺儿', cv:'高桥李依',start: '4', Attribute: '雷', race: '人', race2: '精灵', gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/44/1.png', cdbg2: CDN_BASE + '/img/sarch/char/44/2.png' ,cg:CDN_BASE + '/img/sarch/char/44/cg/1.png'},
                { id: 'char45', name: '杰', cv:'下崎纮史',start: '4', Attribute: '雷', race: '人',race2: '兽', gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/45/1.png', cdbg2: CDN_BASE + '/img/sarch/char/45/2.png' ,cg:CDN_BASE + '/img/sarch/char/45/cg/1.png'},
                { id: 'char49', name: '宗士郎', cv:'代永翼',start: '4', Attribute: '风', race: '人', gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/49/1.png', cdbg2: CDN_BASE + '/img/sarch/char/49/2.png' ,cg:CDN_BASE + '/img/sarch/char/49/cg/1.png'},
                { id: 'char50', name: '梅露希儿', cv:'芹泽优',start: '4', Attribute: '风', race: '人',race2: '精灵', gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/50/1.png', cdbg2: CDN_BASE + '/img/sarch/char/50/2.png' ,cg:CDN_BASE + '/img/sarch/char/50/cg/1.png'},
                { id: 'char54', name: '里昂', cv:'泽城千春',start: '4', Attribute: '暗', race: '人', race2: '精灵',gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/54/1.png', cdbg2: CDN_BASE + '/img/sarch/char/54/2.png' ,cg:CDN_BASE + '/img/sarch/char/54/cg/1.png'},
                { id: 'char55', name: '尤维尔', cv:'逢坂良太',start: '4', Attribute: '暗', race: '人', gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/55/1.png', cdbg2: CDN_BASE + '/img/sarch/char/55/2.png',cg:CDN_BASE + '/img/sarch/char/55/cg/1.png' },
                { id: 'char59', name: '芬', cv:'渡边纮',start: '4', Attribute: '光', race: '人', gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/59/1.png', cdbg2: CDN_BASE + '/img/sarch/char/59/2.png' ,cg:CDN_BASE + '/img/sarch/char/59/cg/1.png'},
                { id: 'char60', name: '绮拉', cv:'山本希望',start: '4', Attribute: '光', race: '人', gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/60/1.png', cdbg2: CDN_BASE + '/img/sarch/char/60/2.png' ,cg:CDN_BASE + '/img/sarch/char/60/cg/1.png'},
                { id: 'char64', name: '哈修', cv:'长南翔太',start: '3', Attribute: '火', race: '人', gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/64/1.png', cdbg2: CDN_BASE + '/img/sarch/char/64/2.png' ,cg:CDN_BASE + '/img/sarch/char/64/cg/1.png'},
                { id: 'char65', name: '仁', cv:'佐佐木琢磨',start: '3', Attribute: '火', race: '人', gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/65/1.png', cdbg2: CDN_BASE + '/img/sarch/char/65/2.png' ,cg:CDN_BASE + '/img/sarch/char/65/cg/1.png'},
                { id: 'char69', name: '艾尔莎', cv:'明坂聪美',start: '3', Attribute: '水', race: '人', gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/69/1.png', cdbg2: CDN_BASE + '/img/sarch/char/69/2.png' ,cg:CDN_BASE + '/img/sarch/char/69/cg/1.png'},
                { id: 'char70', name: '克劳斯', cv:'三宅健太',start: '3', Attribute: '水', race: '人', race2: '兽', gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/70/1.png', cdbg2: CDN_BASE + '/img/sarch/char/70/2.png',cg:CDN_BASE + '/img/sarch/char/70/cg/1.png' },
                { id: 'char74', name: '黑', cv:'畠中祐',start: '3', Attribute: '雷', race: '人',race2: '兽', gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/74/1.png', cdbg2: CDN_BASE + '/img/sarch/char/74/2.png' ,cg:CDN_BASE + '/img/sarch/char/74/cg/1.png'},
                { id: 'char75', name: '阿尔伯特', cv:'长南翔太',start: '3', Attribute: '雷', race: '人', race2: '兽', gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/75/1.png', cdbg2: CDN_BASE + '/img/sarch/char/75/2.png' ,cg:CDN_BASE + '/img/sarch/char/75/cg/1.png'},
                { id: 'char79', name: '奈丝卡', cv:'高桥李依',start: '3', Attribute: '风', race: '人', gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/79/1.png', cdbg2: CDN_BASE + '/img/sarch/char/79/2.png',cg:CDN_BASE + '/img/sarch/char/79/cg/1.png' },
                { id: 'char80', name: '缪', cv:'加藤英美里',start: '3', Attribute: '风', race: '人',race2: '兽', gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/80/1.png', cdbg2: CDN_BASE + '/img/sarch/char/80/2.png',cg:CDN_BASE + '/img/sarch/char/80/cg/1.png' },
                { id: 'char84', name: '欧雷欧', cv:'山本希望',start: '3', Attribute: '光', race: '人',  race2: '兽',gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/84/1.png', cdbg2: CDN_BASE + '/img/sarch/char/84/2.png' ,cg:CDN_BASE + '/img/sarch/char/84/cg/1.png'},
                { id: 'char85', name: '劳尔', cv:'伊藤健太郎',start: '3', Attribute: '光', race: '人', gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/85/1.png', cdbg2: CDN_BASE + '/img/sarch/char/85/2.png',cg:CDN_BASE + '/img/sarch/char/85/cg/1.png' },
                { id: 'char86', name: '法露伽', cv:'东城日沙子',start: '3', Attribute: '暗', race: '人', gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/86/1.png', cdbg2: CDN_BASE + '/img/sarch/char/86/2.png',cg:CDN_BASE + '/img/sarch/char/86/cg/1.png' },
                { id: 'char90', name: '阿迪尔', cv:'最上嗣生',start: '3', Attribute: '暗', race: '人', gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/90/1.png', cdbg2: CDN_BASE + '/img/sarch/char/90/2.png',cg:CDN_BASE + '/img/sarch/char/90/cg/1.png' },
                { id: 'char91', name: 'C·F·奇迹', cv:'斗和奇迹',start: '2', Attribute: '风', race: '机械', gender: '女' ,cdbg1: CDN_BASE + '/img/sarch/char/91/1.png', cdbg2: CDN_BASE + '/img/sarch/char/91/2.png' ,cg:CDN_BASE + '/img/sarch/char/91/cg/1.png'},
                { id: 'char92', name: '魔像', start: '2', Attribute: '火', race: '机械',gender: '男' ,cdbg1: CDN_BASE + '/img/sarch/char/92/1.png', cdbg2: CDN_BASE + '/img/sarch/char/92/2.png' ,cg:CDN_BASE + '/img/sarch/char/92/cg/1.png'},
                { id: 'char93', name: '红波露', start: '1', Attribute: '火', race: '精灵', gender: '其他' ,cdbg1: CDN_BASE + '/img/sarch/char/93/1.png', cdbg2: CDN_BASE + '/img/sarch/char/93/2.png',cg:CDN_BASE + '/img/sarch/char/93/cg/1.png' },
                { id: 'char94', name: '蓝波露', start: '1', Attribute: '水', race: '精灵', gender: '其他' ,cdbg1: CDN_BASE + '/img/sarch/char/94/1.png', cdbg2: CDN_BASE + '/img/sarch/char/94/2.png' ,cg:CDN_BASE + '/img/sarch/char/94/cg/1.png'}
            ]
        },
        {
            // 卡片1
            headerBg: CDN_BASE + '/img/sarch/title/weapon/w.png',
            rightheaderBg: CDN_BASE + '/img/sarch/title/right/2.png',
            squareCards: [
                { id: 'weapon1', name: '精灵的微笑',designation:'',start:'5', Attribute: '全属性', cdbg1: CDN_BASE + '/img/sarch/weapon/1/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/1/2.png', cg: '' },
                { id: 'weapon2', name: '百鬼夜行', designation:'弱体球',start:'5',Attribute: '全属性', cdbg1: CDN_BASE + '/img/sarch/weapon/2/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/2/2.png', cg: '' },
                { id: 'weapon3', name: '普罗米修斯之剑', designation:'深层剑',start:'5', Attribute: '火', cdbg1: CDN_BASE + '/img/sarch/weapon/3/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/3/2.png', cg: '' },
                { id: 'weapon4', name: '基因切割者', designation:'遗产刀',start:'5',Attribute: '火', cdbg1: CDN_BASE + '/img/sarch/weapon/4/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/4/2.png', cg: '' },
                { id: 'weapon5', name: '海渊棘刃', designation:'水毒短刀',start:'5',Attribute: '水', cdbg1: CDN_BASE + '/img/sarch/weapon/5/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/5/2.png', cg: '' },
                { id: 'weapon6', name: '流水刃剑', designation:'青女刀',start:'5',Attribute: '水', cdbg1: CDN_BASE + '/img/sarch/weapon/6/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/6/2.png', cg: '' },
                { id: 'weapon7', name: '紫雷真打', designation:'妖怪剑',start:'5',Attribute: '雷', cdbg1: CDN_BASE + '/img/sarch/weapon/7/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/7/2.png', cg: '' },
                { id: 'weapon8', name: '黑龙雷剑', designation:'雷龙剑',start:'5',Attribute: '雷', cdbg1: CDN_BASE + '/img/sarch/weapon/8/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/8/2.png' },
                { id: 'weapon9', name: '死皇之斧', designation:'死皇斧',start:'5',Attribute: '风', cdbg1: CDN_BASE + '/img/sarch/weapon/9/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/9/2.png', cg: '' },
                { id: 'weapon10', name: '无声无瑕', designation:'铃鹿靴',start:'5',Attribute: '风', cdbg1: CDN_BASE + '/img/sarch/weapon/10/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/10/2.png', cg: '' },
                { id: 'weapon11', name: '海姆达尔之剑', designation:'光深层',start:'5',Attribute: '光', cdbg1: CDN_BASE + '/img/sarch/weapon/11/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/11/2.png', cg: '' },
                { id: 'weapon12', name: '枢机卿', designation:'鸡腿',start:'5',Attribute: '光', cdbg1: CDN_BASE + '/img/sarch/weapon/12/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/12/2.png', cg: '' },
                { id: 'weapon13', name: '牛鬼之尾', designation:'牛尾',start:'5',Attribute: '暗', cdbg1: CDN_BASE + '/img/sarch/weapon/13/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/13/2.png', cg: '' },
                { id: 'weapon14', name: '灼炎龙拳', designation:'火龙拳',start:'4',Attribute: '火', cdbg1: CDN_BASE + '/img/sarch/weapon/14/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/14/2.png', cg: '' },
                { id: 'weapon15', name: '贝帝之剑', designation:'螃蟹剑',start:'4',Attribute: '水', cdbg1: CDN_BASE + '/img/sarch/weapon/15/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/15/2.png', cg: '' },
                { id: 'weapon16', name: '黑龙雷枪', designation:'雷龙枪',start:'4',Attribute: '雷', cdbg1: CDN_BASE + '/img/sarch/weapon/16/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/16/2.png', cg: '' },
                { id: 'weapon17', name: '祸根之剑', designation:'',start:'4',Attribute: '风', cdbg1: CDN_BASE + '/img/sarch/weapon/17/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/17/2.png', cg: '' },
                { id: 'weapon18', name: 'PHL光剑', designation:'光剑',start:'4',Attribute: '光', cdbg1: CDN_BASE + '/img/sarch/weapon/18/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/18/2.png', cg: '' },
                { id: 'weapon19', name: '妖刀蛇崩', designation:'',start:'4',Attribute: '暗', cdbg1: CDN_BASE + '/img/sarch/weapon/19/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/19/2.png', cg: '' },
                { id: 'weapon20', name: '骑士盾', designation:'',start:'3',Attribute: '风', cdbg1: CDN_BASE + '/img/sarch/weapon/20/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/20/2.png', cg: '' },
                { id: 'weapon21', name: '老旧短剑', designation:'',start:'1',Attribute: '全属性', cdbg1: CDN_BASE + '/img/sarch/weapon/21/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/21/2.png', cg: '' },
                { id: 'weapon22', name: '高热剑', designation:'炽热之剑',start:'3',Attribute: '火', cdbg1: CDN_BASE + '/img/sarch/weapon/22/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/22/2.png', cg: '' },
                { id: 'weapon23', name: '无名长剑', designation:'无名剑',start:'2',Attribute: '全属性', cdbg1: CDN_BASE + '/img/sarch/weapon/23/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/23/2.png', cg: '' },
                { id: 'weapon24', name: '紫藤耳坠', designation:'蓝耳坠',start:'3',Attribute: '水', cdbg1: CDN_BASE + '/img/sarch/weapon/24/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/24/2.png', cg: '' },
                { id: 'weapon25', name: '斐莱布篇', designation:'雷书',start:'3',Attribute: '雷', cdbg1: CDN_BASE + '/img/sarch/weapon/25/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/25/2.png', cg: '' },
                { id: 'weapon26', name: '激光标枪', designation:'激光笔',start:'3',Attribute: '光', cdbg1: CDN_BASE + '/img/sarch/weapon/26/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/26/2.png', cg: '' },
                { id: 'weapon27', name: '混沌指虎', designation:'',start:'3',Attribute: '暗', cdbg1: CDN_BASE + '/img/sarch/weapon/27/1.png', cdbg2: CDN_BASE + '/img/sarch/weapon/27/2.png', cg: '' },
               ]
        },
        {
            // 卡片2
            headerBg: CDN_BASE + '/img/sarch/title/world/keyword_list_world_header_background2.png',
            
            squareCards: [
                { id: 'world1', name: '', cdbg1: CDN_BASE + '/img/sarch/map/card/1.png', cdbg2: '', rightheaderBg: CDN_BASE + '/img/sarch/map/card/main/main0.png',},
                { id: 'world2', name: '', cdbg1: CDN_BASE + '/img/sarch/map/card/2.png', cdbg2: '', rightheaderBg: CDN_BASE + '/img/sarch/map/card/main/main1.png',},
                { id: 'world3', name: '', cdbg1: CDN_BASE + '/img/sarch/map/card/3.png', cdbg2: '', rightheaderBg: CDN_BASE + '/img/sarch/map/card/main/main2.png',},
                { id: 'world4', name: '', cdbg1: CDN_BASE + '/img/sarch/map/card/4.png', cdbg2: '', rightheaderBg: CDN_BASE + '/img/sarch/map/card/main/main3.png', },
                { id: 'world5', name: '', cdbg1: CDN_BASE + '/img/sarch/map/card/5.png', cdbg2: '', rightheaderBg: CDN_BASE + '/img/sarch/map/card/main/main4.png', },
                { id: 'world6', name: '', cdbg1: CDN_BASE + '/img/sarch/map/card/6.png', cdbg2: '', rightheaderBg: CDN_BASE + '/img/sarch/map/card/main/main5.png', },
                { id: 'world7', name: '', cdbg1: CDN_BASE + '/img/sarch/map/card/7.png', cdbg2: '', rightheaderBg: CDN_BASE + '/img/sarch/map/card/main/main6.png', },
                { id: 'world8', name: '', cdbg1: CDN_BASE + '/img/sarch/map/card/8.png', cdbg2: '', rightheaderBg: CDN_BASE + '/img/sarch/map/card/main/main7.png', },
                { id: 'world9', name: '', cdbg1: CDN_BASE + '/img/sarch/map/card/9.png', cdbg2: '', rightheaderBg: CDN_BASE + '/img/sarch/map/card/main/main8.png', },
                { id: 'world10', name: '', cdbg1: CDN_BASE + '/img/sarch/map/card/10.png', cdbg2: '', rightheaderBg: CDN_BASE + '/img/sarch/map/card/main/main9.png', },
                { id: 'world11', name: '', cdbg1: CDN_BASE + '/img/sarch/map/card/11.png', cdbg2: '', rightheaderBg: CDN_BASE + '/img/sarch/map/card/main/main10.png', },
                { id: 'world12', name: '', cdbg1: CDN_BASE + '/img/sarch/map/card/12.png', cdbg2: '', rightheaderBg: CDN_BASE + '/img/sarch/map/card/main/main11.png', },
                { id: 'world13', name: '', cdbg1: CDN_BASE + '/img/sarch/map/card/13.png', cdbg2: '', rightheaderBg: CDN_BASE + '/img/sarch/map/card/main/main12.png', }
            ]
        },
    ],



    squareinfoCards:  {
        characterInfo: [
            { id: 'char1',value: 'info', title: '情报', text:[ '出现在“星见镇”的神秘少年。没有过去的记忆，也不清楚自己来自哪里。性格开朗，好奇心强。不知为何厨艺堪比专业厨师。','本名凪原步。本应是个没有任何特殊之处的高二少年，但却在涩谷被世界割裂之时被狭缝世界吞噬，最终失去记忆来到了星见镇。']},
                { id: 'char1',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【450能量】',
                                content: '粉碎流星',
                                texts: ['挥舞剑发出冲击波，对自身周围的敌人造成伤害 / 赋予参战者攻击力提升效果','最大攻击段数1，最大倍率10','参战者攻击力UP50%，持续15秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '通往星之路',
                                texts: ['编入队伍中的角色的属性每增加一种时，队伍全体攻击 + 25％【最大 + 150％】'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['+20％队伍全体攻击'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 100％'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>自身发动技能时，自身攻击力 + 45%（最大 + 180%）'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身技能槽最大值 + 15%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['队伍全体攻击力UP效果时间 + 10%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['自身发动技能时，队伍角色技能伤害 + 7.5%【最大 + 30%】'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char2',value: 'info', title: '情报',  text: ['来自遥远异世界，继承了古老炼金术家族高贵血统的炼金术士。性格开朗，比起杞人忧天，更愿意相信自己勇往直前。'] },
                { id: 'char2',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【430能量】',
                                content: '炼金爆发',
                                texts: ['于前方引发大爆炸，对其范围内敌人造成伤害 + 赋予抗性降低效果 + 消除1个强化效果','最大攻击段数12，最大倍率12','参战者攻击力UP25%，持续30秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '克拉莉丝最可爱☆',
                                texts: ['角色技能伤害 + 200%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 80% & 技能伤害 + 10%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['发动技能时，自身技能伤害 + 40%[最大 + 120%]'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>每击败5个敌人，自身技能槽 + 15%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['角色攻击力 + 15%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['自身发动技能时，角色的攻击力 + 10%[最大 + 30%]'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['20次弹射时，角色攻击力 + 5%[最大 + 30%]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char3',value: 'info', title: '情报', text: '女仆酒馆的保镖女仆。从战斗到家务都样样精通，但这次她要穿上礼服，装扮成优雅的女士。' },
                { id: 'char3',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【420能量】',
                                content: '除垢射线',
                                texts: ['锁定距离最近的敌人发射细长光束，对命中的敌人造成伤害【根据连击数提升伤害】 + 赋予抗性降低效果','最大攻击段数10，最大倍率9[根据连击数提升伤害0.5%]+赋予抗性降低25%持续20秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '武斗派侍者',
                                texts: ['角色技能伤害 + 70% ＆ 对弱体效果中的敌人造成伤害（乘区2） + 10% + 200%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['角色攻击力 + 12%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['发自身发动技能时，角色技能伤害 + 20%[最大 + 60%]'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>发动技能时，自身技能槽 + 100%（仅一次）（可以连发两次大招）'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 35%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['自身是角色时，自身的技能槽最大值 + 15%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['自身发动技能时，角色技能伤害 + 10% [最大 + 30%]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char6',value: 'info', title: '情报', text: '隶属于守护法律与秩序的“保安队”，并稳坐其首席的机人女性。她极为接近人类的身体似乎是由管理者赐予的。' },
                { id: 'char6',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【510能量】',
                                content: '神圣爆破',
                                texts: ['用机关枪进行连射，对领域内全体敌人造成伤害／并向领域内全体敌人发射火箭炮，对火箭命中的敌人造成伤害','最大攻击段数15，最大倍率21'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '保安队安全部署',
                                texts: ['角色攻击＋40%,每当达成50Combo时，角色攻击 + 60%［最大 + 60%];每当达成100Combo时，角色攻击 + 80%［最大 + 80%]'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['连击数已达50时，自身技能槽 + 10%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['自身是种族为“机械”角色时，战斗开始时，自身技能槽＋100%','发动技能时，自身技能槽 + 50%（仅1次）'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>每当达成100连击时，角色攻击＋100%［最大＋100%]','<main>2次冲刺时，连击＋3'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['队伍中每有一个「机械」种族角色时，角色的攻击力 + 5%[最大 + 30%]'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['Dash(冲刺)时，Combo + 10（CT:30秒）'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['150Combo时，角色的攻击力 + 30%[最大 + 30%]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char7',value: 'info', title: '情报', text: '在东国的深山中设立了工坊的烟花师。为了让烟花在夜空中盛放，正东奔西走寻找谁都没有见过的素材！' },
                { id: 'char7',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【600能量】',
                                content: '金牡丹怒放',
                                texts: ['向前方射出特制烟花，对命中的敌人及其周围造成雷伤害【根据连击数提升伤害】','最大攻击段1，最大倍率25[每1连击数倍率提升0.5%]'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '大朵夜空之花',
                                texts: ['角色技能伤害 + 80% / FEVER时、角色技能伤害 + 100%[最大 + 200%]'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自己发动技能时、角色技能伤害 + 10%[最大 + 50%] & 强化弹射伤害 + 10%[最大 + 50%]'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['FEVER时、角色技能伤害 + 25%[最大 + 50%] & 强化弹射伤害 + 25%[最大 + 50%]'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>自己发动技能时、自己技能累积速度 + 10%[最大 + 30%] / 自己技能伤害 + 100%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 50%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['FEVER时，角色攻击力 + 10%[最大 + 30%]'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['发动技能时，FEVER槽 + 100(CT:60秒)'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char14',value: 'info', title: '情报', text: '海洋世界中，操纵神秘力量“魔法”的少女。只要出现在海盗们面前就会掠夺一切，人们畏惧她，并称她为“冰之魔女”和“踏海灾祸”。' },
                { id: 'char14',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【570能量】',
                                content: '冰棺',
                                texts: ['使用强力的冰魔法，对全领域造成伤害(无弱点破坏) + 抗性降低 + 迟缓效果。','最大攻击段数1，最大倍率12耐性DOWN20%持续20秒+迟缓效果20秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '悠久寒气',
                                texts: ['自身生命值高于80%期间，角色攻击 + 120%','角色的HP低于80%时，回复该角色最大生命值的20% (仅1次)'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['队伍全体对迟缓效果中的敌人造成伤害（乘区2） + 10%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['自身生命值高于80%期间，角色攻击 + 40%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>角色生命值高于80%期间，该角色抗性 + 30%&攻击 + 60%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身HP80%以上时，队伍全体耐性 + 15%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['自身HP80%以上时，角色攻击力 + 25%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['自身HP80%以上时，角色攻击力 + 25%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char15',value: 'info', title: '情报', text: '能冻结一切的魔眼的拥有者，沃伦塔斯魔法学院客座研究员兼教师，由女学生票选出的最想邀请一同参加圣诞派对对象榜的第一名。这种种头衔，正是他已不再孤独的证明。' },
                { id: 'char15',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【490能量】',
                                content: '零度冰雹',
                                texts: ['发动魔眼对距离最近的敌人及其周围的敌人造成伤害 + 赋予敌人抗性降低 + 攻击力降低效果 / 发动后施展回旋斩冲向距离最近的敌人，对自身周围的敌人造成伤害','最大攻击段数4，最大倍率16+可累计层数的水属性抗性降低7%，持续55秒[累计效果，最大3层]+可累计层数的攻击力降低7%，持续55秒[累计效果，最大3层]'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '魔眼持有者',
                                texts: ['角色攻击力 + 60% /角色每持有1个攻击提升效果，该角色直接攻击伤害 + 50%[最大+250%]'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身每持有1个攻击提升效果，该角色攻击力 + 20%[最大 + 100%]'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['自身是角色时，自身获得攻击提升效果时，获得20秒自身的攻击力 + 80%（CT：30秒）'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>自身对弱体效果中的敌人造成的直接攻击伤害 + 300%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 50%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['敌人每持有 1 个弱体效果，自身对该敌人造成的直接攻击伤害 + 25% [最大 + 100%]'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['敌人每持有 1 个弱体效果，角色对该敌人造成的伤害 + 2.5% [最大 + 10%]（独立伤害乘区 2）'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char16',value: 'info', title: '情报', text: '以忠勇著称的犬族最强骑士。在犬族之王的麾下，屡立战功。' },
                { id: 'char16',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【540能量】',
                                content: '剑柄锤击',
                                texts: ['以震耳的咆哮破坏领主的全部弱点 + 对领域内所有的敌方小怪造成伤害 / 向最近的敌人突进，对接触到的敌人造成伤害 / 赋予己方贯穿效果。','第一段：攻击段数1，攻击倍率10.5；第二段：攻击段数12，伤害倍率21；贯穿效果持续10秒。'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '忠勇骑士道',
                                texts: ['角色攻击 + 60% / PF伤害 + 100%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身攻击 + 20%每当自身直接攻击20次时，自身攻击＋10%[最大 + 40%]'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['当全队处于贯穿效果期间，自身攻击 + 20% & 队长攻击 + 40%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>发动PFLv3时，队长攻击 + 12%[最大 + 60%]','<main>PFLv3伤害 + 25%（独立伤害乘区5）'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身攻击力 + 30%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['PF伤害 + 20%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['3次发动PFLv3时，自身技能槽 + 10%(CT：15秒)'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char20',value: 'info', title: '情报', text: '帕尔佩布拉出身的强大冒险者。探索摇曳的迷宫深处时失去了大量同伴，而本人却奇迹生还，堪称传说中的男人。' },
                { id: 'char20',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【490能量】',
                                content: '不祥之风',
                                texts: ['激昂地挥剑斩向前方劈出一道龙卷风，对其周围的敌人造成伤害 / 赋予参战者攻击力提升效果。','最大攻击段数6，最大倍率32.4,参战者攻击力UP60%持续15秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '生还的意志',
                                texts: ['角色攻击 + 100%','PF伤害 + 70%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身代替第三名角色承受伤害','自身抗性 + 50%&生命值 + 15%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['每当达成30Combo时，PF伤害 + 10%[最大 + 60%]'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>每当承受3次伤害时，自身攻击 + 20%[最大 + 160%]'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 50%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['自身受到5次伤害时，自身攻击力 + 5%[最大 + 50%]'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['自身受到5次伤害时，自身攻击力 + 3.5%[最大 + 70%]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char21',value: 'info', title: '情报', text: '生活在边境，信仰精灵的部族的巫女。身为族长的女儿，她遵从精灵的神谕，为了寻找应该成为自己丈夫的男子来到了帕尔佩布拉。' },
                { id: 'char21',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【480能量】',
                                content: '精灵风暴',
                                texts: ['在前方召唤精灵，精灵周围产生风暴，对周围的敌方造成伤害【根据连击数伤害提升】 / 赋予己方浮游效果。','最大攻击段数24，最大倍率18[随Combo越高伤害UP0.5%]','浮游效果15秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '晴空之爱',
                                texts: ['角色攻击 + 80%&生命值 + 20%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['浮游效果期间，角色直接攻击伤害＋50%浮游效果持续时间 + 10%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['每当直接攻击10次时，自身直接攻击伤害 + 10%[最大 + 150%]'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>角色发动技能时，该角色攻击＋25%[最大 + 100%]'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 50%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['浮游效果期间，角色直接攻击伤害 + 30%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['自身发动技能时，获得8秒自身的直接攻击变为2次，合计伤害 + 25%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char25',value: 'info', title: '情报', text: '玉藻·稻穗。“大和之都”世界的女主角·九尾狐稻穗的圣诞节装扮。现在，她为了寻找新的爱情，正在学习所谓的迷人的姿态。' },
                { id: 'char25',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【600能量】',
                                content: '天华缭乱·雷霆唤来',
                                texts: ['召唤大量闪雷，对领域内全体敌人造成雷伤害(不破坏弱点) + 赋予麻痹效果','技能数据最大攻击段数1，最大倍率18','麻痹持续10秒（所有角色的麻痹效果都会随造成次数衰减）'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '九尾天雷妖兽姬',
                                texts: ['角色攻击力+80%，当不处于FEVER状态时候，角色发动技能时，FEVER+60'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['进入FEVER模式时，角色攻击+20%（最大+60%）'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['当不处于FEVER状态时候，角色发动技能时，FEVER+40'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>角每当进入FEVER模式时，角色攻击+60%（最大+180%）'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['角色追击伤害（乘区3） + 7 %'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['FEVER模式中，角色攻击力 + 10%[最大 + 30%]'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['FEVER模式中，角色攻击力 + 10%[最大 + 30%]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char26',value: 'info', title: '情报', text: '自称是世界第一的射手。虽然实力强劲也很能赚钱，但总是把周围的无辜人士卷进来，欠了一屁股赔偿金。' },
                { id: 'char26',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【380能量】',
                                content: '等离子冲击',
                                texts: ['于自身周围释放力场，对第一个接触的敌人施以快速光剑连斩并造成伤害 / 赋予自身对虚弱状态中的敌人伤害提升效果','最大攻击段数11，伤害倍率20.75','对处于击晕状态的敌人伤害+50％（持续15秒）'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '我最强！',
                                texts: ['角色攻击 + 60% & 直接攻击伤害 + 160%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['回复HP时，自身技能槽 + 5%(上限20次) / 战斗开始时，自身技能槽 + 80%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['FEVER模式中，角色直接攻击伤害 + 100%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>发动技能时，自身攻击 + 15%[最大 + 75%] & 直接攻击伤害 + 15%[最大 + 75%] & FEVER + 80'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身是角色时，自身的技能槽最大值 + 20%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['FEVER模式中，自身攻击力 + 60%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['FEVER模式中，自身发动技能4次时，自身攻击力 + 80%[最大 + 80%]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char30',value: 'info', title: '情报', text: '在摇曳的迷宫中遇见的少女。与一条名为“科布”的蛇交换了一半寿命获得了力量。已决定不再一直为了明天，只想笑着活过此刻。' },
                { id: 'char30',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【550能量】',
                                content: '死神悬吊',
                                texts: ['全身缠绕上蛇之气息，一定时间内对碰撞到的敌人造成伤害 + 赋予中毒效果 / 赋予贯穿效果','最大攻击段数12，最高倍率15.6，贯穿效果12秒，中毒效果30秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '欢呼的诅咒声',
                                texts: ['角色攻击力 ＋ 60％ ＆ 直接攻击伤害 ＋ 160％'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['发动技能时，自身攻击 + 12%[最大 + 60%] / 战斗开始时，自身技能槽 + 50%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['自身对毒效果中的敌人造成伤害 + 15% （独立乘区2）','角色对弱体效果中的敌人造成伤害 + 5%（独立乘区2）'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>贯穿效果期间，角色直接攻击伤害 + 140%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身的技能命中时，自身攻击力 + 1% [最大 + 50%]'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['自身的技能命中 5 次时，角色回复最大生命值的 1%（上限 20 次）'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['每击败 4 个敌人时，强化弹射伤害 + 3% [最大 + 30%]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char31',value: 'info', title: '情报', text: '以新世界为目标的堕天使，也是开启新世界之门的钥匙。被“灾厄之女的魔柜”选中的人。' },
                { id: 'char31',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【620能量】',
                                content: 'D·堕落之剑',
                                texts: ['在你自己面前射出一道黑暗斩击，对被击中的敌人造成伤害 + 攻击力降低 + 迟缓效果&给予我方贯穿效果','黑暗伤害（x16）攻击力降低（20%、20秒）缓慢效果（20秒）贯穿效果（12秒）'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '对新世界的渴望',
                                texts: ['角色攻击力 + 60% & 处於贯穿效果时，角色攻击力 + 120%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['在队伍中每編成一名角色，自己的攻击力 + 15% [最大 + 90%]'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['自己每直接攻击30次，角色的攻击力 + 10%【最大 + 60%】'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>队伍全体于贯穿效果中时、自己直接攻击计算 3 次、其总和伤害 + 50%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['队伍编入 1 名角色时，自身攻击力 + 7.5% [最大 + 45%]'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 50%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['每当自身直接攻击 30 次时，自身技能槽 + 10%（CT：20 秒）'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char35',value: 'info', title: '情报', text: '半人半妖的少年。施展妖力操控着名为“火之腕”的法器。他曾与人类母亲相依为命，在母亲过世后靠降妖谋生。' },
                { id: 'char35',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【550能量】',
                                content: '六花千掌·罗睺拳',
                                texts: ['冲向距离最近的敌人并使出怒涛般的打击，对自身周围的敌人造成伤害。','最大攻击段数12，最大倍率27'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '鬼之子',
                                texts: ['火角色攻击 + 120%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身攻击＋45%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['每击败5个敌人时,自身攻击 + 10%[最大 + 60%]'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>PFLv3所需Combo-3&自身攻击 + 70%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身攻击力 + 25%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['每击败 10 个敌人时，自身攻击力 + 7% [最大 + 70%]'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['自身的攻击加成高于 500%期间，强化弹射伤害 + 30%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char39',value: 'info', title: '情报', text: '年幼时误入异世界的少女。以高超的魔法击败了海上的恶徒们得以存活至今，也因此对黑道规矩了如指掌。' },
                { id: 'char39',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【380能量】',
                                content: '爱丽丝梦游之伞',
                                texts: ['连续刺出缠绕着水之力的伞，对行进方向上的敌人造成伤害 / 赋予己方浮游浮游效果。','最大攻击段数12，最大倍率12','浮游效果8秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '保护好我呀！',
                                texts: ['角色生命值高于80%期间，该角色攻击＋160%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['浮游效果期间，自身攻击＋60%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['生命值高于80%期间,自身攻击＋60%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>回复HP时，自身攻击＋25%[最大＋150%]'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['每过60秒，赋予8秒浮游效果'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['HP回复时，自身攻击力 + 3%[最大 + 60%]'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['浮游效果期间，每经过6秒，回复自身HP1%[最多30次]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char40',value: 'info', title: '情报', text: '精灵剑士，拥有象征雷雷的别名“星之焰”。在森林遇到危机时挺身而出战斗，有着被公认为不像精灵的性格。' },
                { id: 'char40',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【450能量】',
                                content: '铁球冲击',
                                texts: ['挥舞铁球重击地面，对自身正前方的敌人造成伤害 + 赋予抗性降低效果 / 后续的冲击波会对周围敌人造成伤害','最大攻击段数2，最大倍率22.5','抗性降低25%，持续20秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '翻腾的铁球',
                                texts: ['PF伤害 + 100% & PFLv3所需Combo-3'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['PF伤害 + 25%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['攻击提升效果期间，PF伤害 + 50%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>PFLv3所需Combo-3 & PF伤害 + 40%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身攻击力UP200%以上时，队长攻击力 + 30%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['战斗开始时，60秒内自身攻击力 + 40%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['PFLv3发动时，PF伤害 + 5%[最大 + 25%]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char44',value: 'info', title: '情报', text: '出现在“獠牙的战场”世界中，自称是贤者的猫族老爷爷。说话难以捉摸，令人无法窥见他的真意。但他操纵精灵的力量如假包换。' },
                { id: 'char44',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【390能量】',
                                content: '雷雷之刃',
                                texts: ['连续施放缠绕着雷雷的回旋斩，对周围的敌人造成伤害【对迟缓效果中的敌人伤害提升】。','最大攻击段数12，最大倍率15[对钝足效果中的敌人造成伤害UP25%]'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '自豪的雷剑',
                                texts: ['角色攻击 + 60%，每当Combo数达到15时，角色攻击＋10%（最大100%）'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身攻击＋55%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['每当Combo达到15时，自身攻击 + 8%（最大＋80%）'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>发动技能时，获得15秒内自身连击效果（直接攻击变为2次）','<main>每当Combo数达到15时，自身攻击力+10%（最大+100%）'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身发动技能时，Combo数+8'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['每当Combo数达到40时，自身技能槽+5%(CT：20秒)'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['每当Combo数达到15时，自身攻击力+3%(最大30%)','每当Combo数达到40时，自身攻击力+5%(最大30%)'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char45',value: 'info', title: '情报', text: ['脸上总是挂着温柔笑容的男人，在小镇一角开办了一所学塾。据说他出身于一个被剥夺了属地的家族，但本人对此从不多言。','谢谢你，伊织。宗士郎在亡妻的牌位前双手合十，倾诉了自己的感激之词。死去的人无法再做任何事了，即便明白这点，他仍然想向一直存在于自己心中的妻子道谢。一定是多亏了你，我才能是现在这个自己，才能帮助到他们吧。'] },
                { id: 'char45',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【640能量】',
                                content: '诅咒众生',
                                texts: ['献上祈祷，赋予己方浮游效果 / 消除领域内全体敌人的一个强化效果 + 赋予抗性降低 + 攻击力降低效果','浮游效果7秒','耐性DOWN25%持续30秒，攻击力DOWN30%持续30秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '寻求失传的睿智',
                                texts: ['角色攻击力＋40％＆对种族「不死」的敌人伤害（乘区1）＋25％'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身对种族「不死」的敌人伤害(乘区1)＋30％'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['自身对种族「不死」的敌人伤害(乘区1)＋30％'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>角色追击伤害(乘区3)＋20％'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['战斗开始时，自身的技能槽 + 35%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['自身的技能槽最大值（溢出型蓝条） + 15%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['自身发动技能时，角色的攻击力 + 5%[最大 + 25%]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char49',value: 'info', title: '情报', text: '为了与魔族战斗而离开故乡森林的精灵弓兵。为人处事悠然自得，不过行动与决断时非常迅速大胆。正在寻找走散的精灵伙伴。' },
                { id: 'char49',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【540能量】',
                                content: '破云·风之太刀',
                                texts: ['施展剑技放出十字斩击，对前后左右的敌人造成伤害','最大攻击段数1，最大倍率25.5'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '七月七夜之梦',
                                texts: ['战斗开始时，角色技能槽 + 30% & 技能伤害 + 110%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['战斗开始时，赋予自身「攻击力上升」效果(攻击力+25%，持续时间60秒)'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['自身追击伤害（乘区3） + 20%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>战斗开始时，自身技能槽 + 70%','<main>发动技能时，自身攻击 + 20%[最大 + 80%]'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身发动技能时，（上限 10 次）自身技能槽 + 5%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['自身发动技能时，自身技能伤害 + 15% [最大 + 60%]'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['自身发动技能时，自身技能伤害 + 15% [最大 + 60%]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char50',value: 'info', title: '情报', text: '为了与魔族战斗而离开故乡森林的精灵弓兵。为人处事悠然自得，不过行动与决断时非常迅速大胆。正在寻找走散的精灵伙伴。' },
                { id: 'char50',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【440能量】',
                                content: '疾风之箭',
                                texts: ['向最近的敌人连续射出15根受到风之加护的箭矢，对命中的敌人造成伤害 + 赋予迟缓效果','最大攻击段数15，最大技能倍率15','钝足效果15秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '精灵的护符',
                                texts: ['角色生命值 + 15%','每当达成30Combo时，角色攻击 + 14%[最大 + 70%]'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身生命值 + 15%，自身攻击 + 15%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['每当达成50Combo时，回复自身最大生命值的5%（上限10次）'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>自身生命值高于60%期间，角色攻击 + 65%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身HP60%以上时，自身技能伤害 + 50%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['自身技能伤害 + 25%，15Combo时，Combo + 1'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 35%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char54',value: 'info', title: '情报', text: '在摇曳的迷宫中发现了魔导深渊，并研究着暗魔法的魔法师。他重视合理性、一心埋头研究，一直以来都避免与人交往。' },
                { id: 'char54',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【510能量】',
                                content: '黑暗剑阵',
                                texts: ['以暗魔法生成魔法剑，刺向一定时间内接近自身的敌人，对命中的敌人造成伤害 + 赋予迟缓效果。','最大攻击段数10，最大技能倍率25','钝足效果15秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '窥探深渊的眼眸',
                                texts: ['角色攻击＋120%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['获得贯穿效果时，自身攻击＋30%[最大 + 60%]'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['角色发动技能时，自身技能槽＋8%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>发动技能时，获得10秒贯穿效果'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['队伍贯穿效果时间 + 15%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['队伍贯穿效果时，角色的直接攻击伤害 + 30%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['自身发动技能时，角色的直接攻击伤害 + 10%[最大 + 50%]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char55',value: 'info', title: '情报', text: '出生于西方大国“法兰德王国”引以为豪的九骑士家之一“玖兹家”的青年。这是他和阿尔克等人的关系变得亲密后，在新年伊始看上去比较放松的姿态。不知为何挑战起了原本并不擅长的料理，结果还引发了骚动。' },
                { id: 'char55',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【530能量】',
                                content: '冰锥之刃',
                                texts: ['在自身周围释放冰块，一定时间内对接近的敌人造成伤害 + 赋予迟缓效果。','最大攻击段数10，最大倍率15，持续10秒 + 赋予技能命中的敌人「迟缓」状态(持续时间20秒) + 赋予队伍中角色及协力球「攻击力上升」效果(攻击力+50%，持续时间15秒)'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '飞燕纹章',
                                texts: ['角色生命值 + 15% & 攻击 + 65%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身生命值高于50%期间，队伍全体攻击 + 25%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['自身处于攻击提升效果期间，队伍全体攻击 + 30%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>角色对迟缓效果中的敌人造成伤害（乘区2） + 20%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 35%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['自身技能槽最大值 + 15%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['自身发动技能时，赋予队伍中角色「攻击力上升」效果(攻击力+25%，持续时间15秒)'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char59',value: 'info', title: '情报', text: '冒险者公会的自卫团“公会骑士团”的二把手。该骑士团由剑术、人品都得到肯定的精英们所组成。其本人为维持帕尔佩布拉的治安鞠躬尽瘁。' },
                { id: 'char59',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【500能量】',
                                content: '闪光之刃',
                                texts: ['向自身正前方投掷光剑，对命中的敌人造成属性伤害 / 赋予队伍全体再生效果 / 赋予参战者全员攻击力上升效果','最大攻击段数3，最大技能倍率18','赋予队伍全体再生75持续8秒','赋予参战者全员攻击力UP50%持续15秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '自卫团 二把手',
                                texts: ['角色生命值高于60%期间，该角色攻击力 + 50% & 抗性 + 30%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['生命值高于60%期间，自身攻击力 + 55%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['获得攻击力提升效果时，回复自身最大生命值的2.5%(上限10次)'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>自身生命值高于60%期间，角色攻击 + 65%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身HP60%以上时，自身技能伤害 + 50%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 35%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['自身每有一个强化效果时，自身技能伤害 + 10%[最大 + 50%]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char60',value: 'info', title: '情报', text: '帕尔佩布拉的冒险者公会自卫团“公会骑士团”的成员。每天都忙于调解纠纷、抓捕罪犯，深受人民的信赖。'},
                { id: 'char60',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【500能量】',
                                content: '龙腾虎掷',
                                texts: ['冲向距离最近的敌人以迅雷不及掩耳之势施放斩击，对行进方向上的敌人造成伤害【根据自身强化效果数提升伤害】。','最大攻击段数11，最大技能倍率20.9[随自身强化效果数越多伤害UP10％]'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '自卫团的邀请',
                                texts: ['角色攻击＋120%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身攻击＋45%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['回复HP时，自身攻击＋6%[最大＋60%]'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>攻击提升效果期间，自身攻击＋85% / <main>再生效果期间，自身技能伤害＋85%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身的强化效果时间 + 8%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 35%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['自身每持有1个强化效果，自身攻击力 + 5%[最大 + 50%]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char64',value: 'info', title: '情报', text: '在沙漠边境，避开王族视线探索遗迹的猎人少年。用自己挖掘到的雷磁鱼叉狩猎大型魔物，是个实力派。' },
                { id: 'char64',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【480能量】',
                                content: '雷磁之矛',
                                texts: ['射出雷磁鱼叉，对前方的敌人造成伤害[对种族“兽”、“植物”、“龙”的伤害提升]','攻击段数8，伤害倍率16（对种族为兽、龙或植物的敌人的伤害倍率+25%）'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '生存的技术',
                                texts: ['角色攻击 + 15% / 贯穿效果期间，角色攻击 + 40%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['获得贯穿效果时，自身攻击＋22.5%[最大 + 45%]'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['发动技能2次时，获得2.5秒贯穿效果'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>发动技能时，自身技能槽 + 70%（仅1次）'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['当队伍全体处于「贯通」状态中时，自身攻击力+25%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['自身发动技能时，自身技能槽充能+25%(最多1次)'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char65',value: 'info', title: '情报', text: '居住在海上的圣职者兼无执照医生兼炼金术士。为了拯救他人可以不择手段，是一个不在意规则的男人。' },
                { id: 'char65',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【510能量】',
                                content: '海洋之愈',
                                texts: ['以大海的恩惠，回复参战者全员的生命值【对角色效果提升】 + 赋予攻击力提升效果','回复参战者全员6%的生命值[对角色效果提升50%]+赋予攻击力提升50%持续20秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '隐藏手术道具',
                                texts: ['角色生命值高于60%期间，该角色攻击 + 60%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身攻击 + 10%＆毒效果无效'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['生命值高于60%期间，自身攻击 + 30%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>角色处于攻击力提升效果期间，该角色攻击力 + 30% / <main>除自身以外的己方毒效果无效'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身攻击力 + 15%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['角色生命值高于 60%期间，该角色攻击力 + 10%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['当敌人数量不低于 5 个时，自身攻击力 + 30%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char69',value: 'info', title: '情报', text: '对海上居民进行可疑治疗的无执照护士。因其容貌拥有超高人气，甚至有海盗为了能享受她的治疗而冲到前线。' },
                { id: 'char69',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【430能量】',
                                content: '狂乱注射',
                                texts: ['通过秘密注射回复参战者全员的生命值【对角色效果提升】 + 减少棺柩计数','参战者全员回复最大生命值的6%[对角色效果提升50%]','参战者全员的棺柩计数-12'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '可疑的诊察',
                                texts: ['角色回复HP时，角色攻击 + 5%[最大 + 50%]'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['角色回复HP时，该角色攻击 + 4%[最大 + 20%]'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['角色生命值高于50%期间，该角色攻击 + 15%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>角色从棺柩状态恢复时，该角色攻击 + 35%[最大 + 70%]&回复最大生命值的5%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['角色从棺柩状态恢复时，回复该角色的最大HP2.5%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['角色从棺柩状态恢复时，回复该角色的最大HP2.5%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['角色HP50%以上时，该角色的攻击力 + 10%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char70',value: 'info', title: '情报', text: '以成为支配者的影子和利刃为宿命的狼族暗杀者。不知道遵从命令以外的生活方式，正在寻找新的攻击目标。' },
                { id: 'char70',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【490能量】',
                                content: '暗影螫刺',
                                texts: ['一定时间内对碰到的敌人发出利爪一击，对其造成伤害【对迟缓效果中的敌人伤害提升】','释放技能后，10秒内碰撞到的敌人使用爪击造成伤害，最多每0.5秒攻击一次，每次攻击的段数为1，倍率为3。','当敌人处于「迟缓」状态中时，自身对该敌人的伤害倍率+25%'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '冷静沉着',
                                texts: ['角色攻击 + 35%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身对Break Down效果中的敌人造成伤害 + 15%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['攻击提升效果期间，自身对Break Down效果中的敌人造成伤害 + 30%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>10次弹射时，下次弹射前自身攻击力 + 100%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身攻击力 + 15%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['自身攻击造成的FEVER槽上升率 + 15%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['进入FEVER模式时，获得15秒自身的攻击力 + 50%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char74',value: 'info', title: '情报', text: ['总是以小弟的语气和轻浮的言行活跃周围气氛的黑豹族青年。而他也有爱读书的一面，经常泡在星见镇的图书馆里不出来。','其实黑豹一开始根本不相信什么传说。该如何去阻止已经做好让剑锋染上鲜血的觉悟的朋友，才是让他烦恼的问题，不过是拿来利用一下的传说在他眼里根本没什么大不了。而当白色老虎笑着问出“你想怎么办？”时，黑豹才悚然醒悟。他的回答虽然失去了往日的老练，但其中却不含一丝虚假。那一声“大哥！”之中，再无任何谎言。'] },
                { id: 'char74',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【440能量】',
                                content: '闪光猎豹',
                                texts: ['飞速向距离最近的敌人突进，对碰到的敌人造成伤害 / FEVER槽增加','最大攻击段数9，最大技能倍率7','FEVER槽增加30'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '权谋术数',
                                texts: ['角色攻击 + 15% / FEVER模式时间 + 25%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['获得攻击提升效果时，FEVER + 20'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['FEVER模式中，自身攻击 + 60%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>FEVER模式时间 + 20%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 25%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 25%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['自身发动技能时，10秒内自身攻击力 + 40%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char75',value: 'info', title: '情报', text: ['深受年轻犬族们拥护的青年剑士。虽然崇尚理性与知性，但偶尔也会暴露出狼的本性，消沉一整天。','看着举杯庆贺的黑与阿尔伯特，白仿佛回忆起了什么——那是一种与无法再次相见的人重逢一般的感觉。白将杯中的酒一饮而尽，提出要与阿尔伯特拼酒，这让天狼眯缝起了眼睛不怀好意地笑了起来。第二天本该是告别的日子，只可惜宿醉让他们在这里又多留了几天。'] },
                { id: 'char75',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【480能量】',
                                content: '迅猛獠牙',
                                texts: ['以昂扬的斗志提升自身攻击力 / 挥舞剑发出连击，对一定时间内碰到的敌人造成伤害【对麻痹中的敌人伤害提升】','最大攻击段数24，最大技能倍率27，持续10秒[对麻痹效果中的敌人伤害UP25%]','攻击力UP110%持续15秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '天狼的自豪',
                                texts: ['角色攻击 + 15% / 角色出于攻击提升效果期间，该角色攻击 + 45%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身攻击 + 20%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['每当承受5次伤害时，10秒内自身攻击 + 40%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>自身追击伤害 + 30%（独立伤害乘区3）'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身攻击力 + 15%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['自身追击伤害 + 10%（独立伤害乘区3）'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['技能每命中（HIT）5次时，10秒内自身攻击力 + 30%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char79',value: 'info', title: '情报', text: '自由行走于海上世界的开朗顽强的旅行者。在游乐场里巧妙利用兔女郎的身份，以蛇剑破敌。' },
                { id: 'char79',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【380能量】',
                                content: '灵蛇盘旋',
                                texts: ['挥舞鞭子，对周围的敌人造成伤害 / 一定概率为队伍角色施加攻击力提升与全属性抗性提升效果 / FEVER槽增加','最大攻击段数8，最大技能倍率15','25%几率赋予队伍角色攻击力UP50%持续10秒，或全属性耐性UP10%持续15秒','FEVER槽增加25'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '胜负师的直觉',
                                texts: ['FEVER模式中，队伍全体攻击 + 99%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['FEVER模式时间 + 10%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['自身对敌人造成Down效果的容易程度 + 350%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>每当达成77Combo时，(仅1次)FEVER + 154'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['FEVER模式时间 + 5%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['自身追击伤害 + 10%（独立伤害乘区 3）'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['FEVER模式中，队伍全体攻击力 + 10%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char80',value: 'info', title: '情报', text: '猫族格斗家少女。因其外貌过于缺少兽人特征而经常被同族人捉弄。虽腼腆易害羞，作为战士的能力却如假包换。' },
                { id: 'char80',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【500能量】',
                                content: '连爪连斩',
                                texts: ['面向距离最近的敌人挥舞勾爪，对自身周围的敌人造成伤害','最大攻击段数15，最大技能倍率18'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '拼尽全力',
                                texts: ['角色攻击 + 15% / 每当达成30Combo时，PF伤害 + 14%[最大 + 70%]'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['每当达成30Combo时，自身技能槽 + 6%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['发动技能时，5秒内自身直接攻击变为2次，合计伤害 + 10%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>PF伤害 + 35%'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身攻击力 + 15%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['每当自身直接攻击 20 次时，自身攻击力 + 5% [最大 + 25%]'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['每当达成 50Combo时，自身攻击力 + 7% [最大 + 35%]'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char84',value: 'info', title: '情报', text: '在帕尔佩布拉送货的少年。骑在一头名为贝路伦的谜之生物头顶，为冒险者提供方便。总是与贝路伦一人一兽融洽度日。' },
                { id: 'char84',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【600能量】',
                                content: '贝路伦·朋友',
                                texts: ['召唤模仿伙伴的精灵，对碰撞到的敌人造成伤害','[非生物召唤]召唤3个(HP7ATK17.5)的精灵，属性增幅25%，持续20秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '无双的搭档',
                                texts: ['协力球生命值 + 50%&攻击 + 150%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身攻击 + 10% / 协力球攻击 + 25%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['20次弹射时，自身攻击 + 8%[最大 + 40%]'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>20次弹射时，回复角色最大生命值的2%(上限10次)'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['战斗开始时，自身技能槽 + 25%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['协力球存在3个以上时，自身暗属性图标.png抗性 + 15%&协力球抗性 + 5%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['协力球直接攻击伤害 + 15%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char85',value: 'info', title: '情报', text: '在“大海的尽头”世界某一群岛上经营着名为“Raul Bar”的酒吧老板。拥有能满足各式客人需求的实力。' },
                { id: 'char85',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【550能量】',
                                content: '十字颂歌',
                                texts: ['将神圣的祈祷注入剑中，施放十字斩击，对前后左右的敌人造成伤害【对种族“不死”伤害提升】 + 消去一个强化效果','最大攻击段数1，最大技能倍率22.5[对种族「不死」伤害UP50%]'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '嘉客似云来',
                                texts: ['角色攻击 + 35%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['生命值高于80%期间，自身攻击 + 40%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['进入FEVER模式时，获得10秒自身再生效果[效果70回复]'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>回复HP时，FEVER + 30'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身攻击力 + 15%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['当敌人种族为不死时，自身对该敌人的伤害 + 12.5%（独立乘区1）'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['当处于FEVER状态时，自身技能伤害 + 50%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char86',value: 'info', title: '情报', text: '使用镰刀的稳重少女。由于父母没能从摇曳的迷宫中回来，她潜入迷宫，从事起了回收遗物的工作。' },
                { id: 'char86',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【420能量】',
                                content: '灵魂收割者',
                                texts: ['于自身周围挥舞缠绕着黑暗气息的镰刀，一定时间内对接近的敌人造成暗伤害','最大攻击段数23，最大倍率30.66，持续10秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '灵视能力',
                                texts: ['角色攻击力 + 65%／ 队伍全体HP - 20%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身攻击力 + 25%／ 战斗开始时、对自身造成最大HP 10%伤害'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['战斗开始时、自身技能槽 + 100%／ 战斗开始时、对自身造成最大HP 10%伤害'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>队伍角色全员由棺柩状态复活时、自身技能伤害 + 100%[最大 + 300%]'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身攻击力 + 15%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['队伍全体的棺柩计数-2 & 自身的攻击力 + 10%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['自身HP50%以下时，自身耐性 + 15%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char90',value: 'info', title: '情报', text: '来自曾存在于“沙尘的王国”世界中的某个村落。在大饥荒中失去了朋友和熟人，为此督促自己成为守护他人的利剑。' },
                { id: 'char90',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【450能量】',
                                content: '沙漠弯刀',
                                texts: ['以祈求和平的意志赋予自身攻击力提升效果 / 赋予己方贯穿效果','自身攻击力UP150%持续15秒','贯穿效果10秒'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '队长技',
                                content: '共同生存',
                                texts: ['角色攻击 + 15% / 贯穿效果期间，角色攻击 + 40%'],
                                type: 'active' 
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身攻击提升效果持续时间 + 30%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['自身攻击降低效果无效&攻击提升效果持续时间 + 20%'],
                                        
                                    },
                                    {
                                        title: '3',content: '',lid:'leader',
                                        texts: ['<main>每PF5次时，获得2.5秒贯穿效果'],
                                        
                                    },
                                    {
                                        title: '4',content: '',
                                        texts: ['自身攻击力 + 15%'],
                                        
                                    },
                                    {
                                        title: '5',content: '',
                                        texts: ['贯穿效果时间 + 10%'],
                                        
                                    },
                                    {
                                        title: '6',content: '',
                                        texts: ['贯穿效果期间，自身攻击力 + 25%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char91',value: 'info', title: '情报', text: '突然出现在摇曳的迷宫中，将挑战的冒险者一个接一个地变成金钱的头颅魔物。因为有履带，所以不需要腿脚这种装饰性的东西。' },
                { id: 'char92',value: 'info', title: '情报', text: '曾守护沙尘的王国遗迹的机械人偶。现在全部由王族负责管理，但偶尔会在深埋的废墟中发现不受管理的个体。' },
                { id: 'char92',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【520能量】',
                                content: '尘土之息',
                                texts: ['高速向前方突进，对撞击到的敌人造成范围伤害 / 赋予己方贯穿效果','攻击段数1，伤害倍率21，赋予队伍中角色及协力球「贯通」状态(持续时间6秒)'],
                                type: 'leader'          // 自定义类型
                            },
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['战斗开始时，60秒内自身攻击力 + 20%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['自身代替队长承受伤害 / 自身抗性 + 30%&PF伤害 + 10%'],
                                        
                                    }
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char93',value: 'info', title: '情报', text: '一旦被打倒便会迅速气化消失的神秘生物。因其能够散发热量而被认为是受到了火之精灵的影响。' },
                { id: 'char93',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【240能量】',
                                content: '软乎乎气息',
                                texts: ['一定时间内向上方移动，对触碰到的敌人及其周围的敌人造成伤害','击段数1，伤害倍率15'],
                                type: 'leader'          // 自定义类型
                            },                            
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身是角色时，战斗开始时，自身技能槽 + 100%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['PF伤害 + 15%'],
                                        
                                    }                                
                                ],
                                type: 'active'
                            }
                        ]
                    }
                },
                { id: 'char94',value: 'info', title: '情报', text: '一旦被打倒便会迅速气化消失的神秘生物。受到水之精灵的恩惠，摸起来水润且有弹性。' },
                { id: 'char94',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '必杀技能【240能量】',
                                content: '软乎乎气息',
                                texts: ['一定时间内向下方移动，对触碰到的敌人及其周围的敌人造成伤害','击段数1，伤害倍率15'],
                                type: 'leader'          // 自定义类型
                            },                            
                            {
                                title: '能力', content: '',texts: [''],
                                subsections: [
                                    {
                                        title: '1',content: '',
                                        texts: ['自身是角色时，战斗开始时，自身技能槽 + 100%'],
                                        // 子标题也可有类型
                                    },
                                    {
                                        title: '2',content: '',
                                        texts: ['角色生命值高于80%期间，该角色攻击力 + 25%'],
                                        
                                    }                                
                                ],
                                type: 'active'
                            }
                        ]
                    }
                }
        ],
        weaponInfo: [
            { id: 'weapon1',value: 'info',  text: ['解锁精灵的乐园的世界弹射器后获得的奇异宝石。','(宝珠)不死之翁以隐藏的黑暗为戒，转而温柔地对待孩子们。就像是要偿还过去的罪孽一般。']  },
            { id: 'weapon1',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['队伍全体生命值+10%'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
            },
            { id: 'weapon2',value: 'info', text: ['解锁大和之都的世界弹射器后获得的奇异宝石。','(宝珠)由于灵脉发生变化，将军为了镇压各地的妖魔，命令阴阳连的水善编组特别部队。部队的人员交给水善委任。'] },
            { id: 'weapon2',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['队伍全体对弱体效果中的敌人造成伤害+10%'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon3',value: 'info', text: ['摇曳的迷宫中出土的异界绝品。剑身带着光热，只要接触就会被灼伤的神奇长剑。'] },
             { id: 'weapon3',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['自身发动技能时角色技能伤害+20%[最大+100%]','每弹射15次时，自身技能槽+10%(上限10次)'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon4',value: 'info', text: ['在利比尔德乐园发现的绝品。能在不破坏细胞的情况下斩断敌人的剑'] },
             { id: 'weapon4',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['自身是角色时，贯穿效果期间，PF伤害 + 40%','角色发动技能时，自身攻击力 + 12.5% [最大 + 75%]'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon5',value: 'info', text: ['从海底打捞出的绝品。模仿深海生物的棘刺制作的弯刀。'] },
             { id: 'weapon5',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['每当队伍中编入一名角色，使角色对中毒中敌人的攻击力+25%[最大+150%]','角色对中毒中敌人的直接攻击伤害+150%'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon6',value: 'info', text: ['与青之女王战斗后获得的绝品。能够射出高压水流的刀剑型兵器，甚至能切断超硬合金。其斩击的轨迹宛如一道水幕'] },
             { id: 'weapon6',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['队伍中编入 6 名角色时，PF伤害 + 80%','队伍中编入 6 名角色时，进入Fever模式时，PF伤害 + 30% [最大 + 90%]','队伍中编入 6 名角色时，进入Fever模式时，获得 20 秒PF伤害 + 60%'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon7',value: 'info', text: ['和之国传来的绝品。某个心血来潮的画师为了掌握如何描绘雷雷而委托雷神打造的太刀'] },
             { id: 'weapon7',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['自身是角色时，每当达成 15 Combo时，自身攻击力 + 18% [最大 + 180%]'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon8',value: 'info', text: ['与黑雷荒龙战斗后获得的绝品。每次挥动都会发出雷鸣声的破邪之剑。'] },
             { id: 'weapon8',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['角色发动技能时，自身攻击+12%[最大+120%]','战斗开始时，自身技能槽+30% & 疲惫效果无效'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon9',value: 'info', text: ['在世界树深处发现的绝品。为了平息众多纷争而挥舞的巨斧。'] },
             { id: 'weapon9',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['队伍中编入1名角色时，浮游效果持续时间+10%[最大+60%]','浮游效果期间，角色直接攻击伤害+120% & 自身抗性+20%'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon10',value: 'info', text: ['模仿异界少女的决胜鞋制作的绝品。寄宿了一心追求领头景色的律己之心的鞋子。'] },
             { id: 'weapon10',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['当自身属性为时，自身发动技能时，赋予自身「攻击力上升」效果(攻击力+100%，持续时间5秒)','当自身属性为时，每当自身进行1次直接攻击，自身攻击力+1.5%(最大150%)'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon11',value: 'info', text: ['摇曳的迷宫中出土的异界绝品。挥舞七彩剑身就能驱散黑暗的神奇长剑。'] },
             { id: 'weapon11',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['自身回复生命值时，角色攻击+5%[最大+50%]','生命值低于70%时，回复自身最大生命值的20%(仅1次)'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon12',value: 'info', text: ['提取了机人管理者留下的数据制作出的绝品。为了处罚与那位神像为敌的人们而存在的断罪之剑。'] },
             { id: 'weapon12',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['队伍有6个光属性图标.png角色以上时，Fever中角色直接攻击伤害+200%','Fever模式时间+20%'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon13',value: 'info', text: ['激战中发现的绝品。用牛头怪物的尾巴加工而成的诅咒之鞭。'] },
             { id: 'weapon13',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['每当角色直接攻击30次时，角色直接攻击伤害+12%[最大+120%]'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon14',value: 'info', text: ['与灼炎荒龙战斗后获得的珍品。内含荒龙的热源，宛如烈火一般的拳具。'] },
             { id: 'weapon14',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['自身是角色时，PF伤害+ 25%','自身攻击力UP中时，PF+ 35%','自身毒效果无效'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon15',value: 'info', text: ['使用领主币兑换的珍品。送给海之勇者的剑，剑刃用珊瑚制作而成。'] },
             { id: 'weapon15',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['自身生命值高于60%期间，角色攻击力+35%'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon16',value: 'info', text: ['与黑雷荒龙战斗后获得的珍品。用荒龙的刺加工制作而成的长枪。'] },
             { id: 'weapon16',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['角色发动技能时，自身攻击+8%[最大+80%]','战斗开始时，自身技能槽+20% & 疲惫效果无效'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon17',value: 'info', text: ['使用领主币兑换的珍品。不死王还是人类时使用过的剑。'] },
             { id: 'weapon17',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['浮游效果期间，角色攻击力+40%'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon18',value: 'info', text: ['感质之城中售卖的珍品。将光子收束成刃状热源的军用剑。'] },
             { id: 'weapon18',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['自身是角色时，Fever模式中，角色直接攻击伤害+150%'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon19',value: 'info', text: ['使用领主币兑换的珍品。在和之国，似乎有地区用这把吸收了八岐大蛇妖气的刀来平息水灾。'] },
             { id: 'weapon19',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['贯穿效果期间，队伍全体攻击+35%'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },

            { id: 'weapon20',value: 'info', text: ['摇曳的迷宫中出土的异界名品。带有装饰的盾，或许属于某个贵族。'] },
             { id: 'weapon20',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['角色全属性抗性+14%',],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon21',value: 'info', text: ['旅行途中发现的物品。来自另一个世界的老旧短剑。'] },
             { id: 'weapon21',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['攻击提升效果期间，自身攻击+35%'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon22',value: 'info', text: ['摇曳的迷宫中出土的异界名品。能将切割面碳化的剑'] },
             { id: 'weapon22',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['角色技能充能速度+10%','自身技能伤害+35%'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon23',value: 'info', text: ['摇旅行途中发现的物品。来自另一个世界的坚固长剑。'] },
             { id: 'weapon23',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['每击败5个敌人时，自身攻击+8%[最大+40%]'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },

            { id: 'weapon24',value: 'info', text: ['摇曳的迷宫中出土的异界名品。挂有水晶的耳坠，其颜色会随湿度而变化'] },
             { id: 'weapon24',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['当自身属性为时，自身生命值的剩余量每有1%，自身技能伤害+1.3%(最大130%)','当自身属性为时，战斗开始时，赋予自身最大生命值5%的护盾'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon25',value: 'info', text: ['摇曳的迷宫中出土的异界名品。以对话形式讨论生物的快乐的书籍。'] },
             { id: 'weapon25',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['战斗开始时，角色技能槽+45%','自身生命值+12%'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon26',value: 'info', text: ['摇曳的迷宫中出土的异界名品。缠绕着雷光的标枪，似乎只要按下把手就能改变颜色。'] },
             { id: 'weapon26',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['角色技能充能速度+10%'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },
            { id: 'weapon27',value: 'info', text: ['摇曳的迷宫中出土的异界名品。该指虎恐怖的设计样式备受小混混们喜爱。'] },
             { id: 'weapon27',value: 'info',title: '能力效果',
                    data: {
                        sections: [
                            {
                                title: '最大效果',
                                content: '',
                                texts: ['自身是角色时，2次击败敌人时，自身直接攻击伤害+13%[最大+130%]','自身攻击力+20％'],
                                type: 'leader'          // 自定义类型
                            },
                        ]
                    }
                },

        ],
        worldInfo: [
            { id: 'world1',value: 'info', text: ['勇者莱特与伙伴们将魔王逼至了绝境，但却在最后功亏一篑败给魔王。被魔王变成小动物的莱特在一股不可思议的力量的帮助下逃了出来。他从某个神秘装置中飞出，邂逅了阿尔克与史黛拉。“世界已经被连接在了一起。”三人心怀着不同的思绪，一起推开了通向新世界的大门。']},
            { id: 'world2',value: 'info', text: ['放眼望去尽是苍绿森林的世界。一行人为了获得莱特世界的坐标，决定前去寻找世界弹射器。', '这片森林的中心耸立着一棵从任何角度都能看到的巨树“世界树”。到处都是充满朝气的精灵与魔物，然而，却看不见一个活人。一行人让失控的世界守护人瑞西塔尔恢复理智后，打开了向下一个世界进发的大门。']},
            { id: 'world3',value: 'info', text: ['这里是被无尽沙尘覆盖的沙漠世界，抬头便能看到一轮刺眼的烈日。而面对这样严酷的环境，一行人并没有空停下发呆。他们必须立刻启程寻找人类的踪迹。','支配着这个荒凉的沙漠世界的是一个因阶级制度与奴隶制而繁荣的王国。虽然掩埋在砂砾中的古代遗迹表明了这里曾经存在过某个高度发达的文明，但这个世界仍在缓缓走向衰落。在迎来了新的同伴、孤独的兽人白后，一行人打开了通向崭新世界的大门。'] },
            { id: 'world4',value: 'info', text: ['这里是放眼望去看不到一丝陆地的大海世界，所有土地都已经沉到了海底。降落在海盗船上的一行人被错当成了偷渡者，无奈之下他们只得与海盗们展开战斗。','这里曾经有过广阔的陆地与先进的文明。但在原因不明且突然的海平面上升后，大部分陆地与文明都没入了水中。现在，人们将船舶连接在一起，创造出了名为浮舟城的海面城镇，坚强地生活在海面之上。在邂逅了海盗玛丽娜与人鱼亚美莉亚之后，一行人找到了世界弹射器，打开了通向下一个世界的大门。','由于自然环境的变化与魔物们的存在，其实浮舟城一直都面临着许多危险。其中被称为“噬星兽”的存在更是为浮舟城笼上了一层不安的阴影。现今许多浮舟城的人口逐渐流失，陆地联邦却只顾着明哲保身逃避责任，至今仍未出台有效的对应措施。'] },
            { id: 'world5',value: 'info', text: ['这里是任由风呼啸着卷起干燥尘土的荒野世界。尘埃中混杂的野兽气味让白感到十分焦躁，但他不得不继续向前迈出脚步。','这是个只有兽人的世界。那么，这里会是白的故乡吗？除了为数众多的犬族与猫族之外，这里还存在着鸟族、兔族等少数部族。在帮助黑与阿尔伯特实行了他们的计划，终结了犬族与猫族之间的战争后，一行人与白一同打开了通向崭新世界的大门。'] },
            { id: 'world6',value: 'info', text: ['这个世界不存在任何有机生命体。遍布这里的只有以人类为模板创造的机人与没有心的机器人。但机人们恐怕会作为这里的新人类，不断为这个星球编织新的历史吧。在打倒了最后的人类·管理者后，一行人怀着自责打开了通向崭新世界的大门。','在身为造物主的管理者死后，两大机人派系得以兴起。其一是继承了造物主思想，厌恶进步与变革的体制派“违约者”。其二是为了改变社会一直进行着激进运动的革命派“革新者”。现在，这两大派系之间的争斗正愈发激烈。'] },
            { id: 'world7',value: 'info', text: ['这里是青砖瓦房连接成片的大和世界。在狐耳少女与阴阳师少年两相对峙之时，一行人不偏不巧地降落在了他们之间。','由于五年前的大地震，和之国与部分异世界产生了融合。现在，东国、西国与妖怪的世界同时存在于此。而在水善亲自解开封印后，世界恐怕还会加剧融合吧。在阻止了面具术士的阴谋后，一行人打开了通向崭新世界的大门。'], },
            { id: 'world8',value: 'info', text: '斯特拉托斯王室统治着这个世界。曾经这里十分富饶，勇者的传说一代又一代流传至今。然而，在50年前勇者莱特消失后，这个世界开始了与众多世界的反复融合。经历了暴风雪的摧残与魔界的侵蚀后，这个世界已然濒临崩坏。从魔王手中艰难逃脱后，一行人一跃进入了另一个崭新的世界。', },
            { id: 'world9',value: 'info', text: ['黑暗翻涌的不毛之地。被至高者抛弃的流放之地。这里便是魔界。受伤的阿尔克在魔界醒来，为了寻找与他们失散的史黛拉等人，一行人决定与艾迪凯斯一同行动。','魔界中存在与异界完美相通的门——“深渊”。连上位者都害怕深渊的存在，因此，他们抛弃了魔界并将它与其他世界隔绝。而勇者的世界正是上位者为了监视并压制魔界而创造的盖板。一行人击退了从上位者的领域撕裂天空而来的歼灭者们之后，怀着新的决意回到了星见镇。'] },
            { id: 'world10',value: 'info', text: '这里是有着摇曳的迷宫，受到深渊影响与遥远世界相连的摇曳的世界。为了得到星之女神与上位者的情报，一行人向着荷羊人的居住地进发。', },
            { id: 'world11',value: 'info', text: '这里是与世隔绝的涩谷。是距今一万多年以前从世界之中被剜去的地方。是仅仅依靠超能力者们的认知维持着存在的孤岛。然而从梦中醒来的人们意识到现实早已崩坏。于是，一切都开始溶解，逐渐消失在狭缝中。就在此时，史黛拉掷出星之逆枪贯穿了世界，将涩谷融合进了帕尔佩布拉的世界。', },
            { id: 'world12',value: 'info', text: '歼灭者们终于出现并开始了歼灭。为了阻止伤亡扩大，诺瓦提出前往“星之宫”直接讨伐上位者。正当一行人面临抉择之时，一封从迷宫中寄出的邀请函被送到了他们面前。', },
            { id: 'world13',value: 'info', text: '大战结束了。停止的时间再度开始流逝，诀别之时也已然成为过去。在终于夺回的平凡的日子里，他们会再次相遇、再度离别。而终有一日，一切都将消逝。不过，在那一天来临之前——请与我们同在。', }
        ],
        characterst: [
            { id: 'char1', value: 'story', sections: [
                { title: '阿尔克与史黛拉', content: '失去记忆并被召唤到星见镇的阿尔克，遇到了自称管理者的少女史黛拉。阿尔克烹饪的果实十分美味，让史黛拉很是吃惊。就这样，二人开始了共同生活。' },
                { title: '向着星空彼方', content: '史黛拉一直望着天空，向往着外面的世界，于是阿尔克提出要一起离开星见镇。离开小镇、去到了新的森林世界后，他们开心地听莱特讲起了他的勇者冒险故事。' }],
            },
            { id: 'char2', value: 'story', sections: [
                { title: '专搞破坏的炼金术士', content: '误闯摇曳的迷宫的克拉莉丝使用炼金术逃到了帕尔佩布拉。对异世界感到混乱的她遇到了史黛拉，并被史黛拉带到了星见镇。她发誓要回到自己原本的世界。' },
                { title: '见证情谊的发饰', content: '克拉莉丝认为史黛拉应该打扮得可爱一点，于是送了她一个发饰。原本担心自己是不是强人所难了，但史黛拉却向她表示了感谢。二人约定下次再一起去购物。' }],
            },
            { id: 'char3', value: 'story', sections: [
                { title: '在邂逅前夜化妆', content: '玛丽安从女仆同事那里接受了保护重要人物的委托，其内容是让她在舞会中扮演陪同的女伴。玛丽安一听到要化妆就逃跑了，但当天还是精心打扮过后跟阿尔克他们一起来到了酒馆。委托人是个粗人，他听了玛丽安的提议后，决定动员女仆酒馆的员工，开始为舞会做准备。而在最后，玛丽安拜托委托人练习跳舞。' },
                { title: '在背叛之夜下定决心', content: '阿尔克和史黛拉注视着努力陪委托人练习跳舞的玛丽安。因为过于警惕而无法投入的委托人并不愿意听玛丽安的忠告。但玛丽安还是一再强调要他相信自己。此时，一位拿着果汁的佣人出现了，玛丽安识破了佣人的刺客身份，并抓住了他。然而委托人却因此而变得更加钻牛角尖了。玛丽安把那样的委托人和过去的自己重叠在一起，更加尽心尽力。' }],
            },
            { id: 'char6', value: 'story', sections: [
                { title: '未知的梦', content: '“保安队”的首席塞拉被机人部队追捕，来到了藏有世界弹射器的秘密房间。她在那里失去了意识，梦见了某个图书馆。塞拉在星见镇醒来后立刻准备维持治安，但在理解了状况以后告诉众人自己正在寻找某个人，并向安慰她的莱特敬礼。' },
                { title: '任务完成', content: '塞拉随一行人前往帕尔佩布拉采购。她在看到花店外的蓝色花朵以后，做了一个关于花语的梦。塞拉察觉到自己可能被清除过记忆并感到困惑，此时雷克·雷吉斯塔出现在她的面前。雷吉斯的话让她认准了自己该走的路。一行人与塞拉汇合后，鼓励了她并送给她蓝色的花朵。' }],
            },
            { id: 'char7', value: 'story', sections: [
                { title: '烟花师的牡丹', content: '在一行人战斗时帮助了他们的和之国烟花师牡丹，向众人诉说了自己关于素材的烦恼，于是阿尔克将自己的石头送给了她。牡丹做出了试作品，并对烟花美丽的颜色感到惊讶，恳求一行人带她一起旅行。' },
                { title: '横跨天际的重要赛事', content: '牡丹即将和自己的父亲在相隔很远的山中进行烟花比试。牡丹用顶级素材制作了“正三尺八卦兰”，却还是没能赢过父亲。她承认了自己的失败后发泄了一通对父亲的不满，然后笑着说明年一定会赢。' }],
            },
            { id: 'char14', value: 'story', sections: [
                { title: '来自大海的魔女', content: '阿尔克等人护卫的商船遇上了海盗的袭击。正当他们陷入枪林弹雨的危机时，冰之魔女赛法出现并冻结了船。此举却连商船的路也封了，赛法带着史黛拉逃跑，在确认阿尔克等人是朱之刃的成员后，表示“对异世界很感兴趣”，并加入了他们。' },
                { title: '两人的时间', content: '莱特和白在暴风雪吹袭的星见镇被冻僵了。史黛拉和阿尔克看到赛法因为解除魔法的研究而陷入萎靡，于是告知镇上的天气十分恶劣。问过赛法后，她表示“虽然已经使出最强大的魔法了，却还是无法控制”，因而自信全失。阿尔克他们提出了一个建议，将蕾连人带冰一起搬过来就可以了。赛法和蕾玩闹着，恢复了精神。' }],
            },
            { id: 'char15', value: 'story', sections: [
                { title: '雷拉斯老师的圣诞节', content: '为圣诞派对定做了新西装的雷拉斯找到阿尔克等人拜托他们帮忙收集触媒。认识赛法以后，雷拉斯打破了固有的观念，并且领悟到魔眼并不只是能用来伤害他人的东西。在工作结束之后，雷拉斯邀请白一同前去他珍藏的店享用美酒。' },
                { title: '新手圣诞老人奋斗中', content: '雷拉斯成功为被冰冻的人实施了解咒，但他却不知道应该送什么圣诞礼物给仍然被冰封的弟弟，于是找到芬等人商量。入夜后，雷拉斯碰见了小偷，并在追赶小偷的路上遇见了迷宫魔术师。在与魔术师交手之后，雷拉斯来到了被冰封的弟弟面前，不断咀嚼着魔术师的话并露出了苦笑。' }],
            },
            { id: 'char16', value: 'story', sections: [
                { title: '是剑还是骑士', content: '听说发生了政变，犬族英雄罗尔夫潜入王城，阿尔伯特请他帮忙维持和平，但他说自己是染血的王剑，于是坚决拒绝了。罗尔夫在与白的决斗中想要实现武人的夙愿，却被白看透了真心。' },
                { title: '是代罪者还是骑士', content: '罗尔夫和白一起来到的猫族村。无视见到犬族英雄后受到冲击的黑，猫族的孩子们立刻喜欢上了罗尔夫，但大人和老人却朝曾经的敌人扔石头。罗尔夫说“他们需要一个可以报仇雪恨的稻草人”，接受了大家投来的石子。' }],
            },
            { id: 'char20', value: 'story', sections: [
                { title: '摇曳的生还者', content: '迷宫的地面突然崩落，掉到深层地下的阿尔克一行人遇到了前来调查摇曳现象的传奇冒险者雷恩。' },
                { title: '偷袭也要谨慎', content: '接受雷恩训练的阿尔克被传授了一套非常慎重的战术，那是有过惨痛经历的人才知道的战术。' }],
            },
            { id: 'char21', value: 'story', sections: [
                { title: '精灵的神谕', content: '从上空突然出现的、扇动着巨大双翼的少女自称自己是西微。她说自己受到精灵的神谕，前来迎接自己被指定的结婚对象阿尔克。阿尔克说服她说不到18岁的男人不能结婚，西微接受了这个说法，决定暂时在附近观察一下情况' },
                { title: '玛朱雷尔的药草', content: '在公会里购物的阿尔克和西微，遇到了一个拼命寻找药草的男人。男人说为了治好女儿的热病，他需要悬崖上的药草。西微载着阿尔克，立刻开始寻找药草。顺利采到了想找的药草之后，两人全速回到了小镇。' }],
            },
            { id: 'char25', value: 'story', sections: [
                { title: '九尾狐妖姬迷人的姿态', content: '阿尔克和史黛拉虽然发现了独自一人形迹可疑地喝着咖啡的稻穗，但他们决定无视她。不过，当然还是被叫住了。稻穗说她要实践在杂志上学的受欢迎的方法，为新的恋情而努力。然而时间流逝，到了夜晚也依旧无果，稻穗仍在喝着咖啡。阿尔克跟她搭话，告诉了她关于圣诞老人的事。稻穗突发奇想，变成圣诞老人，飞向了远方。' },
                { title: '妖怪山太黑主百鬼夜行', content: '一贫如洗的醉汉偶然遇到了百鬼夜行。在害怕的男人面前出现的是扮成圣诞老人的稻穗。她将圣诞礼物送给男人之后，飞上了和之国的天空。奉将军之命解决这场骚乱的水善一脸生气地想要阻止稻穗，却不得其法。她甩开水善，飞向了天空。' }],
            },
            { id: 'char26', value: 'story', sections: [
                { title: '麻烦射手', content: '塔吉斯误将白错认成从研究所里逃跑的巨大白老虎，向一行人发起攻击。当他发现是认错人以后向众人道歉，然后以惊人的速度离开了。阿尔克发现了塔吉斯要找的怪物，大声呼唤塔吉斯。塔吉斯如约迅速赶到，用等离子斩马刀一击便击倒了怪物，但这却让街区停雷了。塔吉斯为了逃避赔偿强行随一行人来到了星见镇。' },
                { title: '世界狂热', content: '塔吉斯带阿尔克来游玩城里最受欢迎的娱乐项目“狂热世界”。这款能肆意打怪的VR游戏正是通过塔吉斯出售的记忆制作的。阿尔克追问他是否出售了星见镇的记忆，塔吉斯则说要让阿尔克看看他大度的一面。塔吉斯骑着摩托载阿尔克兜风，却不慎撞上了DAN的大厦。见状塔吉斯再次央求阿尔克将他藏在星见镇。' }],
            },
            { id: 'char30', value: 'story', sections: [
                { title: '嬉笑的少女', content: '阿尔克和白接到委托击退不断出现的毛骨悚然的蛇群，而屋顶上有一道可疑的身影正眺望他们。阿尔克发现黑影追了上去，对方却摆出反抗的姿态然后倒下了，原来黑影的真实身份是少女卡菈和黑蛇科布。阿尔克将二人带回星见镇后得知他们间存在契约关系。史黛拉欢迎卡菈的到来，并希望她能找到自己的愿望。' },
                { title: '明天的约定', content: '科布找阿尔克等人商量，希望他们能让卡菈知晓活着的喜悦。卡菈表示想吃史黛拉做的饭，还在去买衣服的途中任性地解除变装大闹了一场。一行人回到星见镇，阿尔克等人累得不行，卡菈却嘲笑他们没用。说到一半卡菈突然想起了过去，说下次还要一起玩然后离开。科布闻言欣喜地表示卡菈此前从未提过未来。' }],
            },
            { id: 'char31', value: 'story', sections: [
                { title: '彼方的来访者', content: '奥莉维尔追逐着白色救赎者穿越次元来到摇曳的迷宫，在经过一番激斗后被白色救赎者夺走了部分魔力，导致被对方逃跑。奥莉维尔想要继续追赶，却注意到了迷宫外的骚动。她帮助了与白色救赎者的手下战斗的阿尔克，向阿尔克道歉后再次展开了追逐。' },
                { title: '承诺', content: '奥莉维尔帮助了为了保护少女而战斗的阿尔克等人，并讲述了有关白色救済者的事情。她本打算一个人来做个了断，但因为被阿尔克强烈的意愿所触动，于是便答应了并肩作战。少女向奥莉维尔道谢，奥莉维尔则答应一定会拯救少女的父母。' }],
            },
            { id: 'char35', value: 'story', sections: [
                { title: '邂逅', content: '迷失在六道辻的阿尔克一行人遇到了阿须桐丸。见阿尔克他们没有被自己的角吓到，阿须桐丸对他们产生了兴趣，追在他们身后想要打探鬼的线索。' },
                { title: '鬼之子阿须桐丸', content: '阿须桐丸潜入星见镇却被阿尔克发现。阿须桐丸向阿尔克倾诉对母亲的依恋和对父亲的憎恨，并决定与没有双亲记忆的阿尔克一起接受公会的委托。' }],
            },
            { id: 'char39', value: 'story', sections: [
                { title: '回不了家的淑女', content: '爱丽丝做了与父母走散的噩梦，误把莱特称为妈妈。察觉自己叫错人加上被莱特他们当成孩子对待，这一切让爱丽丝恼怒不已。但是被称作能够独当一面的淑女之后，爱丽丝心满意足原谅了他们。' },
                { title: '离家出走的爱丽丝', content: '爱丽丝离家出走，白却轻易就找到了她。在小巷里，爱丽丝被流氓纠缠，于是她与白联手打倒了流氓，踏上了回家的路。' }],
            },
            { id: 'char40', value: 'story', sections: [
                { title: '战斗职员', content: '接受了护卫委托的阿尔克和莱特来到了边境公会。护卫对象是公会职员夏农。夏农声称“要先去打扫森林”，然而她一路击杀魔兽群的英姿让阿尔克和莱特怀疑护卫的必要性。告别村民后，阿尔克他们朝本部出发。普·莉莉艾出来迎接，夏农随口爆出莉莉艾是走门路进公会的。由于没有事先安排住处，阿尔克将夏农带回了星见镇。' },
                { title: '暗中操劳的专家', content: '夏农早上总是睡眼惺忪，但她只要一上班就拼命工作。史黛拉发现夏农总是处理文件到深夜。夏农说自己曾经是冒险者，后来遇到挫折，发现后勤才是自己的天职。史黛拉也决定学习后勤辅助工作。第二天早晨，两人睡眼惺忪地迎来了朝阳。' }],
            },
            { id: 'char44', value: 'story', sections: [
                { title: '精灵战士', content: '艾琳诺儿受到指引来到星见镇。她为这小镇跟精灵的太古之诗中出现的城镇同名而惊讶。为了讨伐魔族，回到原来的世界，她决定与莱特等人共同旅行。' },
                { title: '未知的诗', content: '艾琳诺儿想要和史黛拉搞好关系，但苦于无法挑起话题。史黛拉说想听听精灵传颂的诗歌，于是她决定要为了史黛拉而吟唱诗歌。' }],
            },
            { id: 'char45', value: 'story', sections: [
                { title: '老翁难捉摸', content: '阿尔克和白来到了重获和平的猫族村落，突然被神秘的老猫——杰缠上了。大家一起去饭店吃完饭，仍然不知道飘忽的杰到底是什么人。白十分焦躁，正想将其赶走时，杰却表明他过去曾与白的父亲有过交流。就这样，杰不明不白地成为了他们的同伴。' },
                { title: '自称·贤者', content: '白陪同杰去跟人鱼的村长交换藏书。他们知道了人鱼村长的色情爱好，而杰想要的书则是《人类诞生之谜》。史黛拉对杰说想了解他的事，让他终于悟到人不能只想着过去，而是应该看向未来。' }],
            },
            { id: 'char49', value: 'story', sections: [
                { title: '与牵牛宗士郎的重逢', content: '宗士郎使用世界弹射器来到了星见镇。他对星见镇和天空中无数的世界产生了兴趣，便对阿尔克等人提出想留下来。大家对宗士郎表示欢迎。' },
                { title: '星见学馆', content: '为了让肩负未来的人们加深对世界的了解，宗士郎决定在星见镇开办学馆。在即将带来改变的学馆中，宗士郎开始上课。' }],
            },
            { id: 'char50', value: 'story', sections: [
                { title: '直至萌芽之日', content: '梅露希儿在星见镇种下灵树的种子，并且邀请史黛拉等它长成大树后一起爬树，但考虑到人类寿命很短暂，最后与史黛拉约定将会和她的子孙一起爬树。' },
                { title: '不论多少次', content: '梅露希儿在画星见镇，并告诉史黛拉，有精灵会花两百多年画画。听到史黛拉说喜欢自己的画，梅露希儿很高兴。' }],
            },
            { id: 'char54', value: 'story', sections: [
                { title: '暗之魔法师', content: '阿尔克他们在迷宫遇到了里昂。一方面彼此利害一致，一方面考虑到潜藏在迷宫内的不安因素，阿尔克他们接纳里昂、与他同行。' },
                { title: '暗之花', content: '里昂对魔法的探求进展不顺。在与阿尔克和史黛拉交流的过程中意外发现了突破口。' }],
            },
            { id: 'char55', value: 'story', sections: [
                { title: '新的誓言', content: '尤维尔对阿尔克的年糕汤燃起了对抗意识，决定尝试自己煮年糕汤。但是他的手艺极具毁灭性，他自己和史黛拉吃了之后都晕倒了。醒过来的尤维尔受到莱特的鼓励，与他约好了要赌上自己的骄傲，煮出好吃的年糕汤。' },
                { title: '雪耻的飞燕骑士', content: '虽然白劝尤维尔直接让阿尔克教他料理，但他却执意不肯。此时，他的老朋友威尔出现并问他要不要回故乡，他告诉威尔，自己在外面的世界也发现了属于自己的使命。与此同时，他想起自己曾受到过同伴们的帮助，终于决定向阿尔克请教料理的做法。' }],
            },
            { id: 'char59', value: 'story', sections: [
                { title: '光裁骑士', content: '酒馆发生了诅咒器具交易案件，阿尔克和莱特被卷入其中，还出手击飞了想用粗暴手段逮捕他们的公会骑士。最后芬出手抓住了二人。但当芬得知二人遭受了不正当逮捕，便将他们释放并真诚道歉。但芬仍然表示他自己怀疑阿尔克他们是可疑团体。莱特邀请芬到星见镇。芬对阿尔克他们表示理解，但同时表示由于他们仍有进行不正当行为的可能性，他会继续监视他们。' },
                { title: '潜入帕尔佩布拉', content: '芬对玛·露露夏进行问话。芬认为最大的问题是“冒险者留下的弃婴增多”，但目前还是专注于追查“诅咒器具的地下交易”。根据对玛·露露夏问话得到的线索，阿尔克和芬一起对据点进行调查，得到了重要的证据。' }],
            },
            { id: 'char60', value: 'story', sections: [
                { title: '帕尔佩布拉的骑士', content: '受到少女胁迫的史黛拉无法理解强盗的概念。俩人进行着鸡同鸭讲的对话。这时绮拉赶到。绮拉说少女出身于孤儿院，自己对其进行了多次管教。史黛拉对孤儿院表示出兴趣，绮拉带她去调查现状。在史黛拉的协助下，孤儿院进行了对抗魔物的安全演练教学。史黛拉没有事先通知就把绮拉带回了星见镇。绮拉一时不知所措，不过还是机灵地表示要与他们“缔结友好关系”。' },
                { title: '愤怒的闪剑', content: '史黛拉去找强盗少女亚吉，耿直的质问让亚吉心虚。绮拉为了让亚吉说出真相，把她带到了公会。问出在背后操控亚吉的盗贼团的据点后，绮拉独自消灭了盗贼团。' }],
            },
            { id: 'char64', value: 'story', sections: [
                { title: '遗迹探索者', content: '哈修带着阿尔克他们去找沙漠遗迹内的另一台世界弹射器。熟悉这个世界的哈修加入了他们。在白表示了欢迎后，哈修轻轻点头致意。' },
                { title: '充满回忆的狩猎', content: '阿尔克和莱特在公会遇到哈修。哈修邀请他们一起去狩猎，并让莱特充当诱饵。哈修从容地抓住猎物，将难得的美味分给了阿尔克。' }],
            },
            { id: 'char65', value: 'story', sections: [
                { title: '仁医生现身', content: '仁因为无证行医而被陆地联邦军人追捕，厌倦了这个小世界的仁提议并成功作为医生兼圣职者与阿尔克等人同行。' },
                { title: '仁医生的工作信条', content: '仁为莱特治疗感冒，他是个很出色的医生，却没有拿到执照。史黛拉问起个中缘由，仁告知史黛拉，治病救人就是他的信条，其他的都不重要。' }],
            },
            { id: 'char69', value: 'story', sections: [
                { title: '危险的护士', content: '艾尔莎成为了星见镇的新护士。在她与阿尔克等人前往帕尔佩布拉采购医疗用品时，史黛拉的钱被小偷偷走了。艾尔莎发现了这件事，并痛揍了对方一顿。' },
                { title: '她的战场', content: '艾尔莎在工作的时候收到了史黛拉的报告，得知有魔物来袭。她马上赶往了现场，陆续将死去的人复活了。艾尔莎对史黛拉说，护士也有属于护士的战斗。' }],
            },
            { id: 'char70', value: 'story', sections: [
                { title: '彷徨的獠牙', content: '正在听喜讯的阿尔克等人遇到了杀意腾腾的克劳斯。克劳斯受到白的攻击晕了过去，随后在星见镇上醒了过来。' },
                { title: '牙之锋芒', content: '克劳斯接到委托，前去叫醒午睡中的白。白告诉克劳斯，自己的事情要自己决定。于是克劳斯一边思考着自己究竟能做什么，一边前去帮阿尔克训练。' }],
            },
            { id: 'char74', value: 'story', sections: [
                { title: '与油嘴滑舌之人的重逢', content: '本应成为长老的黑突然来到了星见镇。面对阿尔克等人的惊讶，黑说自己想增长见闻。在史黛拉的带领下，黑来到了图书馆，得知了世上有可以燃烧的水。造访了海洋世界，亲眼见到内燃机关的黑确信只要能得到这种技术，就能复兴犬与猫之国的经济。' },
                { title: '巧舌如簧计划', content: '黑正在与众人进行着采掘可燃烧的水的计划。但是其中也有猫族的人反对犬族人的加入。黑以没有犬族的帮助就无法实现计划为由说服了猫族。被打动的猫族年轻人决定前来帮忙。黑的计划才刚刚开始。' }],
            },
            { id: 'char75', value: 'story', sections: [
                { title: '友人的骄傲', content: '阿尔克和史黛拉带阿尔伯特来到星见镇的图书馆，他看到如此丰富的藏书量显得十分惊喜。众人表示他这一点与黑很像。阿尔伯特说出了自己和黑的初次相遇，向阿尔克等人表示了感谢。' },
                { title: '新的小镇', content: '白与阿尔伯特偶遇了被流氓纠缠的孩子，阿尔伯特因黑被流氓侮辱而情绪激动，上前抓住了对方。事后他反省说自己还不够成熟。' }],
            },
            { id: 'char79', value: 'story', sections: [
                { title: '胜负师', content: '阿尔克等人遇到了在广场打牌的奈丝卡。与出老千的胜负师的对弈结束后，奈丝卡邀请阿尔克等人一起喝一杯，奈丝卡决定遵循命运的指引，并加入了他们。' },
                { title: '黑吃黑', content: '由于世界弹射器在海里，出行十分不便，于是奈丝卡提议买一艘船。海盗们因为赢不了奈丝卡，转而想靠武力解决问题。奈丝卡则使了计谋包围住海盗，夺走了他门的船。' }],
            },
            { id: 'char80', value: 'story', sections: [
                { title: '至少要像猫一样', content: '缪很在意自己虽然是兽人，却毛发稀少，于是找白商量怎么样才能看起来强一点。白说可以教缪怎么战斗，让缪进行突袭。白指出缪说话句尾不能带“喵”这个词，但她已经形成习惯，无法改过来，使得她非常慌张。看到这样的她，白也无可奈何。' },
                { title: '祝猫耳好运', content: '缪因为在城市玩闹得太厉害而累倒了。正在酒馆休息时，被路过的冒险者搭讪了。缪因为被夸可爱而缠着他们，结果意外地让那群冒险者退却了。缪发誓要当一个兼具性感帅气和可爱猫耳于一身的兽人。' }],
            },
            { id: 'char84', value: 'story', sections: [
                { title: '年幼又高大的快递员', content: '乘坐着巨大动物的少年弄丢了被委托去配送的便当。作为归还失物的谢礼，名叫欧雷欧的少年说可以为阿尔克等人免费提供送货服务。不计得失地进行帮忙的欧雷欧成功成为了阿尔克等人的同伴。' },
                { title: '世上最棒的搭档', content: '欧雷欧为开辟新迷宫而兴奋，结果在睡眠不足的情况下参加了探索……在探索完不熟悉的阶层后，他与搭档贝路伦一起陷入了沉睡。' }],
            },
            { id: 'char85', value: 'story', sections: [
                { title: '为了做出招牌菜', content: '阿尔克接下了海盗的委托，将物品送到了劳尔手上后在店里歇脚。这时一位渔夫客人将带有强烈气味的珍品——鱼酱交给了劳尔。阿尔克听说为了完成这道菜，还缺少某种香草，便想办法找来了香草。鱼酱完成后香味扑鼻，劳尔使用鱼酱做出招牌菜招待大家。阿尔克吃得津津有味，非常高兴。劳尔为表谢意，告诉阿尔克遇到麻烦可以随时找他帮忙。' }],
            },
            { id: 'char86', value: 'story', sections: [
                { title: '残留的念想', content: '法露伽在夜晚的星见镇整理着遗物。她告诉阿尔克，自己能从遗物中看到逝者的念想，并将这份念想传达给被留下来的家人，这是她为之骄傲的事业。' },
                { title: '赴死的准备', content: '法露伽问起白有没有做好赴死的准备，并表示想让白将自己的遗言转达给家人。但白跟她约好了要一起活下去。' }],
            },
            { id: 'char90', value: 'story', sections: [
                { title: '孤独的守护者', content: '在某个贫穷的村落，阿尔克等人接到了一项奇妙的委托。内容是向救了这个村庄的阿迪尔转交食物并转达赎罪的话语——' },
                { title: '家畜窃贼与誓约的黎明', content: '在某个贫穷的村落，有个盗窃家畜的少年。少年对这个村子恨之入骨，因为他们对自己家乡见死不救。阿迪尔对这名少年心有所感，然而……' }],
            }
        ],
        weaponst: [
        ],
        worldst: [
            { id: 'world1', value: 'story', sections: [
                { title: '与同伴汇合', content: '勇者莱特为了完成王的命令而踏上了旅程。他在决战之地·魔王城跟同伴们汇合。' },
                { title: '勇者败北', content: '穷途末路的魔王释放了力量。勇者变成了毫无力量的野兽，在千钧一发之际被光芒包围，消失在了天空之中。' }],
            },
            { id: 'world2', value: 'story', sections: [
                { title: '降落于世界', content: '开始了冒险的阿尔克一行人最先来到的是一个森林繁茂的世界。莱特看着眼前高耸的大树，意识到了这不是自己原来的世界。就在这时，草丛中出现了怪物并朝他们逼近。' },
                { title: '旅途的开始', content: '虽然迷路了，但只要找到世界弹射器就能解决问题。据史黛拉所说，每个世界里都存在世界弹射器。正当阿尔克一行准备开始探索时，史黛拉却追着蘑菇怪冲了出去。' }],
            },
            { id: 'world3', value: 'story', sections: [
                { title: '前往沙海', content: '三人降落在了漫漫沙漠中。但他们并没有发呆的空闲。在被晒干之前，得赶快找到这个世界的居民。' },
                { title: '兽人与少年', content: '阿尔克一行人看到虎族兽人在袭击少年。为了救下倒地的少年，他们挡在了粗暴的兽人面前。' }],
            },
            { id: 'world4', value: 'story', sections: [
                { title: '从天空与大海之间而来', content: '一艘海盗船正航行在某个世界的大海上。而阿尔克一行人正好出现在船的上空，被迫降落在甲板上。海盗误以为他们是偷渡者，向他们发起了攻击。' },
                { title: '船不能白坐', content: '海盗们叫嚣着要打倒偷渡者，根本不听他们解释。多亏了突然从天而降的女船长，双方终于能沟通了。莱特他们被指责坐船逃票，只好帮女船长玛丽娜干活。' }],
            },
            { id: 'world5', value: 'story', sections: [
                { title: '延伸的地平线', content: '阿尔克等人造访的新世界和海洋完全相反，是一个被岩石沙土覆盖的荒野世界。阿尔克惊讶于能看到地平线的广阔荒野，白却因嗅到了混杂在尘土中的野兽气味而提高了警戒。' },
                { title: '新的兽人', content: '一群暗影偷偷接近击退了野兽的阿尔克一行人。白凭借敏锐的嗅觉发现了暗藏其中的杀机。现身的是犬族兽人，他们称呼白为白虎，并发起了攻击。' }],
            },
            { id: 'world6', value: 'story', sections: [
                { title: '来自星空的访客', content: '机人少女仰望着虚假的天空，一边祈祷着能降下雨水一边叹息。就在这时，突然落下了一颗流星，紧急警报响彻小镇。另一边，降落在机械世界的阿尔克等人被这高度文明所震惊。此时，坏掉的打扫机器人聚集起来，狂乱地向众人发起了袭击。' },
                { title: '钢铁歌姬', content: '阿尔克等人与观战的机人少女蒂芭·美迪亚相遇了。为了摆脱想要逮捕入侵者的机器人们，蒂亚将他们带到了自己家里。' }],
            },
            { id: 'world7', value: 'story', sections: [
                { title: '前有妖怪，后有式神', content: '飞奔在夜晚城镇中的狐耳少女，以及追逐她的阴阳师少年。两者的距离逐渐拉近，战斗一触即发。就在这时，阿尔克等人十分不巧地降落在了两人的正中间。狐耳少女驱使妖怪，而阴阳师少年则驱使式神冲了过来。' },
                { title: '与阴阳师的邂逅', content: '少年阴阳师说自己名叫水善。他似乎看穿了阿尔克等人是来自异世界的人，并提出要带他们一起前往这个世界的世界弹射器的所在地。' }],
            },
            { id: 'world8', value: 'story', sections: [
                { title: '白雪', content: '一行人抵达了新的世界。从无法看见外面世界的洞窟里出来时，触目所及是一片银装素裹的世界。莱特为这样的世界感到惊叹。' },
                { title: '去王都', content: '一行人前往过去曾与魔王对峙的地方。但此处已然面目全非，只剩下一座荒废的塔。这里找不到曾共同战斗的同伴的身影，继续留在这里也没有意义，于是一行人决定翻山而行。在山的另一边，是莱特曾效力的王都艾克赛里奥。' }],
            },
            { id: 'world9', value: 'story', sections: [
                { title: '离别', content: '受伤的阿尔克在魔界醒来。他从莱特口中得知了夏可缇的死讯，并为了和失散的史黛拉等人汇合，和艾迪凯斯一同前往光柱所在。与此同时，接到军令正在进行搜索的魔族梅莉发现了两个昏倒在地的人类。' },
                { title: '魔族女子', content: '梅莉在史黛拉和莉莉丝身上看到了自己女儿们的影子，并将她们藏了起来。另一边，向荒野前进的阿尔克等人正扎营休整。阿尔克询问艾迪凯斯讨伐魔王的理由。莱特从艾迪凯斯的回答中意识到这场战争与犬猫间的战争有着本质的不同。' }],
            },
            { id: 'world10', value: 'story', sections: [
                { title: '为了知晓', content: '从史黛拉口中得知了深渊的存在与上位者赋予她的使命后，一行人在露露夏的带领下向荷羊人的居住地进发。' },
                { title: '荷羊人', content: '阿尔克问及荷羊人这个称谓的由来，于是露露夏向一行人讲述了荷羊人的传说。她一边追着小羊一边告诉众人这事还是直接问长老最快。' }],
            },
            { id: 'world11', value: 'story', sections: [
                { title: '黑暗中的声音', content: '穿过连接着狭缝的门来到狭缝另一侧的阿尔克发现自己只身一人身处黑暗之中。他循着微光走去，竟抵达了某个他曾见过的世界。' },
                { title: '陌生的再会', content: '阿尔克来到了已化作废墟的涩谷站中，挡在袭击少年少女的超能力者面前，迎战不断涌现的影龙。' }],
            },
            { id: 'world12', value: 'story', sections: [
                { title: '来自深渊的邀请函', content: '涩谷出现在帕尔佩布拉近郊不久之后，莉莉丝等人的世界终于临近崩溃，歼灭者们也接连现身。在众人商议对策时，诺瓦提议在歼灭降临之前前往至高者所在的位面消灭至高者，而就在此时，泽赫尔带着一封署名为“格拉姆·沃伦塔斯”的邀请函来到了众人面前。' },
                { title: '魔术师们', content: '阿尔克等人跟随邀请函的指示来到了迷宫中，并见到了寄出这封信的被称为迷宫魔术师的男人，格拉姆·沃伦塔斯。在涩谷融合进入这个世界后，不断增强的摇曳让格拉姆头疼不已。于是，一行人决定向他伸出援手，并在此时见到了沃伦塔斯魔法学院的院长“尼尔娅娜·沃伦塔斯”。' }],
            },

        ]
    },
        abilitytxticon: {
    Attributeicon: [
        { value: '火', left: CDN_BASE + '/img/sarch/txticon/attributeicon/火.png', right: CDN_BASE + '/img/sarch/txticon/attributeicon/火耐down.png' },
        { value: '水', left: CDN_BASE + '/img/sarch/txticon/attributeicon/水.png', right: CDN_BASE + '/img/sarch/txticon/attributeicon/水耐down.png' },
        { value: '风', left: CDN_BASE + '/img/sarch/txticon/attributeicon/风.png', right: CDN_BASE + '/img/sarch/txticon/attributeicon/风耐down.png' },
        { value: '雷', left: CDN_BASE + '/img/sarch/txticon/attributeicon/雷.png', right: CDN_BASE + '/img/sarch/txticon/attributeicon/雷耐down.png' },
        { value: '光', left: CDN_BASE + '/img/sarch/txticon/attributeicon/光.png', right: CDN_BASE + '/img/sarch/txticon/attributeicon/光耐down.png' },
        { value: '暗', left: CDN_BASE + '/img/sarch/txticon/attributeicon/暗.png', right: CDN_BASE + '/img/sarch/txticon/attributeicon/暗耐down.png' }
    ],
    general: [
        // 通用效果图标保持不变
        { image: CDN_BASE + '/img/sarch/txticon/general/主属性图标.png', label: '', value: '', txt: '' },
        { image: CDN_BASE + '/img/sarch/txticon/general/副属性图标.png', label: '', value: '', txt: '' },
        { image: CDN_BASE + '/img/sarch/txticon/general/迟缓.png', label: '迟缓', value: '迟缓', txt: '迟缓' },
        { image: CDN_BASE + '/img/sarch/txticon/general/贯穿.png', label: '贯穿', value: '贯穿', txt: '贯穿' },
        { image: CDN_BASE + '/img/sarch/txticon/general/攻击力提升.png', label: '攻击力提升', value: '攻击力提升', txt: '攻击力提升' },
        { image: CDN_BASE + '/img/sarch/txticon/general/攻击力down.png', label: '攻击力降低', value: '攻击力降低', txt: '攻击力降低' }
    ]
},
            
    
        // ==================== 全局按钮组与文本图标数据（供右侧使用） ====================
        evenButtonGroups: [
            {   // 星级
                buttons: [
                    { image: CDN_BASE + '/img/sarch/sarch/star/5.png', label: '5星', value: '5' },
                    { image: CDN_BASE + '/img/sarch/sarch/star/4.png', label: '4星', value: '4' },
                    { image: CDN_BASE + '/img/sarch/sarch/star/3.png', label: '3星', value: '3' },
                    { image: CDN_BASE + '/img/sarch/sarch/star/2.png', label: '2星', value: '2' },
                    { image: CDN_BASE + '/img/sarch/sarch/star/1.png', label: '1星', value: '1' }
                ]
            },
            {   // 属性
                buttons: [
                    { image: CDN_BASE + '/img/sarch/sarch/attribute/火.png', label: '火', value: '火' },
                    { image: CDN_BASE + '/img/sarch/sarch/attribute/水.png', label: '水', value: '水' },
                    { image: CDN_BASE + '/img/sarch/sarch/attribute/风.png', label: '风', value: '风' },
                    { image: CDN_BASE + '/img/sarch/sarch/attribute/雷.png', label: '雷', value: '雷' },
                    { image: CDN_BASE + '/img/sarch/sarch/attribute/光.png', label: '光', value: '光' },
                    { image: CDN_BASE + '/img/sarch/sarch/attribute/暗.png', label: '暗', value: '暗' },
                    { image: CDN_BASE + '/img/sarch/sarch/attribute/全属性.png', label: '全属性', value: '全属性' },
                ],
                
            },
            {   // 性别
                buttons: [
                    { image: '', label: '男', value: '男' },
                    { image: '', label: '女', value: '女' },
                    { image: '', label: '其他', value: '其他' }
                ]
            },
            {   // 种族
                buttons: [
                    { image: CDN_BASE + '/img/sarch/sarch/race/人.png', label: '人', value: '人',image2:CDN_BASE + '/img/sarch/sarch/race/白/人.png'},
                    { image: CDN_BASE + '/img/sarch/sarch/race/精灵.png', label: '精灵', value: '精灵' ,image2:CDN_BASE + '/img/sarch/sarch/race/白/精灵.png'},
                    { image: CDN_BASE + '/img/sarch/sarch/race/魔.png', label: '魔', value: '魔' ,image2:CDN_BASE + '/img/sarch/sarch/race/白/魔.png'},
                    { image: CDN_BASE + '/img/sarch/sarch/race/兽.png', label: '兽', value: '兽' ,image2:CDN_BASE + '/img/sarch/sarch/race/白/兽.png'},
                    { image: CDN_BASE + '/img/sarch/sarch/race/机械.png', label: '机械', value: '机械' ,image2:CDN_BASE + '/img/sarch/sarch/race/白/机械.png'},
                    { image: CDN_BASE + '/img/sarch/sarch/race/妖.png', label: '妖', value: '妖' ,image2:CDN_BASE + '/img/sarch/sarch/race/白/妖.png'},
                    { image: CDN_BASE + '/img/sarch/sarch/race/龙.png', label: '龙', value: '龙' ,image2:CDN_BASE + '/img/sarch/sarch/race/白/龙.png'},
                    { image: CDN_BASE + '/img/sarch/sarch/race/不死.png', label: '不死', value: '不死' ,image2:CDN_BASE + '/img/sarch/sarch/race/白/不死.png'},
                    { image: CDN_BASE + '/img/sarch/sarch/race/水棲.png', label: '水棲', value: '水棲' ,image2:CDN_BASE + '/img/sarch/sarch/race/白/水棲.png'},
                    { image: CDN_BASE + '/img/sarch/sarch/race/植物.png', label: '植物', value: '植物',image2:CDN_BASE + '/img/sarch/sarch/race/白/植物.png'}
                ]
            },
            {   // 右侧按钮组
                buttons: [
                    { image: CDN_BASE + '/img/sarch/sarch/button/3.png', label: 'info', value: 'info' },
                    { image: CDN_BASE + '/img/sarch/sarch/button/4.png', label: 'story', value: 'story' }
                ]
            }
        ],

        // 标题数据（用于右侧 info/story 区域的标题）
        sarchtitle:  [
            { leftImg: CDN_BASE + '/img/sarch/sarch/general/1.png', title: '名称', rightImg: CDN_BASE + '/img/sarch/sarch/general/2.png' },
            { title: '星级' },
            { title: '属性' },
            { title: '性别' },
            { title: '种族' },
            //详情板大标题
            { value: 'info', title: '情报' },
            { value: 'info', title: '能力效果' }
        ],
        
    }