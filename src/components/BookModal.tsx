import { useEffect, useState } from "react";
import type { Book } from "../types";

type TabKey = "goals" | "notes" | "map";

export function BookModal({
	open,
	book,
	onClose,
	onGoToDetail
}: {
	open: boolean;
	book: Book | null;
	onClose: () => void;
	onGoToDetail: (bookId: string, tab?: TabKey) => void;
}) {
	const [activeTab, setActiveTab] = useState<TabKey>("goals");
	useEffect(() => {
		if (open) setActiveTab("goals");
	}, [open]);
	if (!open || !book) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" aria-modal="true" role="dialog">
			<div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] opacity-100 animate-fadeIn" onClick={onClose} />
			<div className="relative z-10 w-full sm:max-w-3xl max-h-[90vh] overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white shadow-xl animate-slideUp">
				<div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
					<div className="min-w-0">
						<h3 className="text-slate-900 text-lg font-semibold truncate">{book.title}</h3>
						<p className="text-slate-500 text-sm mt-0.5">{book.author}</p>
					</div>
					<button onClick={onClose} className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-slate-100" aria-label="Close">
						<svg className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414
								1.414L11.414 10l4.293 4.293a1 1 0 01-1.414
								1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586
								10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
				<div className="px-5 pt-4">
					<div className="flex gap-4">
						<div className="w-24 h-32 overflow-hidden rounded-lg bg-slate-100 shrink-0">
							<img src={book.coverUrl} alt={book.title} className="h-full w-full object-cover" />
						</div>
						<p className="text-slate-700 text-sm leading-relaxed">{book.summary}</p>
					</div>
					<div className="mt-4">
						<h4 className="text-slate-900 font-medium text-sm mb-2">章节概览</h4>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
							{book.chapters.map((c) => (
								<div key={c.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
									<p className="text-slate-900 text-sm font-semibold line-clamp-1">{c.title}</p>
									<p className="text-slate-600 text-xs mt-1 line-clamp-2">{c.core}</p>
								</div>
							))}
						</div>
					</div>
					<div className="mt-5 flex items-center gap-2">
						<TabButton label="阅读目标" active={activeTab === "goals"} onClick={() => setActiveTab("goals")} />
						<TabButton label="章节笔记" active={activeTab === "notes"} onClick={() => setActiveTab("notes")} />
						<TabButton label="思维导图" active={activeTab === "map"} onClick={() => setActiveTab("map")} />
					</div>
					<div className="mt-4">
						{activeTab === "goals" && <div className="text-sm text-slate-600"><p>查看细节与完整目标 →</p></div>}
						{activeTab === "notes" && <div className="text-sm text-slate-600"><p>查看每章结构化精读笔记 →</p></div>}
						{activeTab === "map" && <div className="text-sm text-slate-600"><p>查看文本思维导图与理解性问答 →</p></div>}
					</div>
				</div>
				<div className="px-5 py-4 border-t border-slate-200 flex flex-col sm:flex-row gap-2 sm:justify-end">
					<button onClick={() => onGoToDetail(book.id, "goals")} className="inline-flex justify-center rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors">
						阅读目标
					</button>
					<button onClick={() => onGoToDetail(book.id, "notes")} className="inline-flex justify-center rounded-lg bg-white text-slate-900 px-4 py-2 text-sm font-medium border border-slate-200 hover:bg-slate-50">
						章节笔记
					</button>
					<button onClick={() => onGoToDetail(book.id, "map")} className="inline-flex justify-center rounded-lg bg-emerald-600 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-700 transition-colors">
						思维导图
					</button>
				</div>
			</div>
		</div>
	);
}

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
	return (
		<button
			onClick={onClick}
			className={["px-3 py-1.5 rounded-full text-sm transition-colors", active ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"].join(" ")}
		>
			{label}
		</button>
	);
}


