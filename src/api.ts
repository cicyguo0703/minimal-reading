import type { Book, ReadingGoals, ChapterDeepNote, Mindmap } from "./types";

const BOOK_LIST: Book[] = [
	{
		id: "1",
		title: "深度工作",
		author: "Cal Newport",
		coverUrl: "https://picsum.photos/seed/deepwork/400/600",
		oneLiner: "用专注力创造高价值成果的可操作方法论。",
		summary:
			"本书提出在注意力分散的时代，通过刻意的深度专注工作获取竞争优势。作者阐述建立仪式、管理干扰、设计节律与衡量成果的方法，帮助读者系统提升认知产出与成就感。",
		chapters: [
			{ id: "c1", title: "深度工作的价值", core: "专注产出稀缺且高价值。" },
			{ id: "c2", title: "训练专注力", core: "将注意力当作肌肉刻意训练。" },
			{ id: "c3", title: "构建节律", core: "以 Rituals 与时间块固化习惯。" }
		]
	},
	{
		id: "2",
		title: "原则",
		author: "Ray Dalio",
		coverUrl: "https://picsum.photos/seed/principles/400/600",
		oneLiner: "用可复用原则应对决策与组织管理的复杂性。",
		summary:
			"作者通过生涯经验沉淀出一套做决定与协作的原则体系：极度求真、极度透明、系统化学习与复盘。通过可记录、可执行的原则库提升组织与个人的决策质量与效率。",
		chapters: [
			{ id: "c1", title: "极度求真", core: "直面现实，数据说话。" },
			{ id: "c2", title: "极度透明", core: "信息公开带来更优决策。" },
			{ id: "c3", title: "可复用原则", core: "原则化降低认知负担。" }
		]
	}
];

const DETAIL_MAP: Record<
	string,
	{
		goals: ReadingGoals;
		deepNotes: ChapterDeepNote[];
		mindmap: Mindmap;
	}
> = {
	"1": {
		goals: [
			"建立可持续的深度工作习惯",
			"减少外界干扰并提升专注时长",
			"为高价值任务设计时间块",
			"用可量化指标衡量认知产出"
		],
		deepNotes: [
			{
				id: "c1",
				title: "深度工作的价值",
				keyPoints: ["认知产出与专注度正相关", "注意力是稀缺资源"],
				evidence: ["科学研究：切换成本高", "案例：作家每日固定时段高产"],
				authorIntent: "重塑读者对“忙碌”与“产出”的认知关系",
				actionable: ["每日2小时不被打扰", "记录分心次数并持续降低"]
			},
			{
				id: "c2",
				title: "训练专注力",
				keyPoints: ["专注力可训练", "通过仪式建立情境依赖"],
				evidence: ["意志力非无限，需要设计环境", "番茄法、情境切换减少"],
				authorIntent: "给出可执行训练路径，降低开始门槛",
				actionable: ["固定入场仪式", "逐步拉长不打断区间"]
			}
		],
		mindmap: {
			lines: [
				"AI读书馆",
				"├─ 深度工作",
				"│  ├─ 价值 → 稀缺的专注带来高产出",
				"│  ├─ 训练 → 仪式化与刻意练习",
				"│  └─ 落地 → 时间块与衡量指标",
				"└─ 原则",
				"   ├─ 求真 → 数据与事实",
				"   ├─ 透明 → 组织协作",
				"   └─ 复用 → 决策效率"
			],
			qas: [
				{ q: "为什么要重视深度工作？", a: "高认知产出依赖长时专注，优势可复利。" },
				{ q: "如何减少干扰？", a: "批量处理通信、物理隔离、关闭通知。" },
				{ q: "如何衡量效果？", a: "以产出质量、完成度与时间块达成率衡量。" }
			]
		}
	},
	"2": {
		goals: [
			"理解可复用原则的设计思路",
			"搭建团队决策透明化流程",
			"复盘并沉淀个人决策原则库"
		],
		deepNotes: [
			{
				id: "c1",
				title: "极度求真",
				keyPoints: ["直面现实与数据", "以事实为共同语言"],
				evidence: ["桥水基金透明讨论文化", "数据驱动决策案例"],
				authorIntent: "强调以数据为底层，避免个人偏见",
				actionable: ["记录决策数据来源", "复盘偏差与改进"]
			},
			{
				id: "c2",
				title: "极度透明",
				keyPoints: ["信息透明带来信任", "公开讨论更容易达成一致"],
				evidence: ["桥水原则引入透明会议机制", "反馈环闭案例"],
				authorIntent: "构建可验证的团队协作环境",
				actionable: ["会议内容公开可回看", "建立双向反馈渠道"]
			}
		],
		mindmap: {
			lines: [
				"原则（Principles）",
				"├─ 个人原则",
				"│  ├─ 求真 → 以事实驱动判断",
				"│  └─ 梦想 + 现实 + 决心 = 成就",
				"└─ 工作原则",
				"   ├─ 极度透明",
				"   ├─ 人岗匹配",
				"   └─ 构建可复用原则系统"
			],
			qas: [
				{ q: "原则为何重要？", a: "可重复使用的判断逻辑能减少认知负担。" },
				{ q: "团队如何做到透明？", a: "通过会议记录、决策公开、反馈机制实现。" },
				{ q: "个人如何积累原则？", a: "记录复盘，提取共性，形成可复用清单。" }
			]
		}
	}
};

export async function fetchBooksFromAI(): Promise<Book[]> {
	await new Promise((r) => setTimeout(r, 200));
	return BOOK_LIST;
}

export async function fetchBookDetailFromAI(bookId: string): Promise<{
	goals: ReadingGoals;
	deepNotes: ChapterDeepNote[];
	mindmap: Mindmap;
}> {
	await new Promise((r) => setTimeout(r, 200));
	return DETAIL_MAP[bookId] ?? DETAIL_MAP["1"];
}


