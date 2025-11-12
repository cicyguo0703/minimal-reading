export type ChapterSummary = {
	id: string;
	title: string;
	core: string;
};

export type Book = {
	id: string;
	title: string;
	author: string;
	coverUrl: string;
	oneLiner: string;
	summary: string;
	chapters: ChapterSummary[];
};

export type ReadingGoals = string[];

export type ChapterDeepNote = {
	id: string;
	title: string;
	keyPoints: string[];
	evidence: string[];
	authorIntent: string;
	actionable: string[];
};

export type QA = {
	q: string;
	a: string;
};

export type Mindmap = {
	lines: string[];
	qas: QA[];
};


