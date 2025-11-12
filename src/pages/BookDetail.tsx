import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { fetchBooksFromAI, fetchBookDetailFromAI } from "../api";
import type { ChapterDeepNote } from "../types";

type TabKey = "goals" | "notes" | "map";

export default function BookDetail() {
	const { id } = useParams<{ id: string }>();
	const location = useLocation();
	const tabQuery = new URLSearchParams(location.search).get("tab") as TabKey | null;

	const [loading, setLoading] = useState(true);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [cover, setCover] = useState("");
	const [goals, setGoals] = useState<string[]>([]);
	const [deepNotes, setDeepNotes] = useState<ChapterDeepNote[]>([]);
	const [mindLines, setMindLines] = useState<string[]>([]);
	const [qas, setQas] = useState<{ q: string; a: string }[]>([]);
	const [activeTab, setActiveTab] = useState<TabKey>(tabQuery ?? "goals");
	const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

	useEffect(() => {
		if (tabQuery) setActiveTab(tabQuery);
	}, [tabQuery]);

	useEffect(() => {
		let mounted = true;
		(async () => {
			if (!id) return;
			setLoading(true);
			const all = await fetchBooksFromAI();
			const found = all.find((b) => b.id === id);
			if (found && mounted) {
				setTitle(found.title);
				setAuthor(found.author);
				setCover(found.coverUrl);
			}
			const detail = await fetchBookDetailFromAI(id);
			if (mounted) {
				setGoals(detail.goals);
				setDeepNotes(detail.deepNotes);
				setMindLines(detail.mindmap.lines);
				setQas(detail.mindmap.qas);
				setLoading(false);
			}
		})();
		return () => {
			mounted = false;
		};
	}, [id]);

	const toggle = (cid: string) => {
		setOpenIds((prev) => ({ ...prev, [cid]: !prev[cid] }));
	};

	const tabs: { key: TabKey; label: string }[] = useMemo(
		() => [
			{ key: "goals", label: "阅读目标" },
			{ key: "notes", label: "章节精读笔记" },
			{ key: "map", label: "思维导图" }
		],
		[]
	);

	return (
		<div className="min-h-screen bg-white">
			<header className="border-b border-slate-200">
				<div className="container mx-auto px-4 py-5 flex items-center gap-4">
					<Link to="/" className="text-slate-500 hover:text-slate-900 text-sm">← 返回</Link>
					<h1 className="text-2xl font-semibold tracking-tight text-slate-900">AI读书馆</h1>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				{loading ? (
					<p className="text-slate-500">加载中…</p>
				) : (
					<div className="space-y-8">
						<section className="flex items-start gap-4">
							<div className="w-24 h-32 rounded-lg overflow-hidden bg-slate-100 shrink-0">
								<img src={cover} alt={title} className="h-full w-full object-cover" />
							</div>
							<div>
								<h2 className="text-slate-900 text-xl font-semibold">{title}</h2>
								<p className="text-slate-500 mt-1">{author}</p>
							</div>
						</section>

						<nav className="flex gap-2">
							{tabs.map((t) => (
								<button
									key={t.key}
									onClick={() => setActiveTab(t.key)}
									className={[
										"px-4 py-2 rounded-full text-sm transition-colors border",
										activeTab === t.key ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-800 border-slate-200 hover:bg-slate-50"
									].join(" ")}
								>
									{t.label}
								</button>
							))}
						</nav>

						{activeTab === "goals" && (
							<section className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 animate-fadeIn">
								<h3 className="text-slate-900 font-medium mb-3">阅读目标（AI）</h3>
								<ul className="space-y-2">
									{goals.map((g, idx) => (
										<li key={idx} className="flex items-start gap-2">
											<span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
											<p className="text-slate-700 text-sm leading-relaxed">{g}</p>
										</li>
									))}
								</ul>
							</section>
						)}

						{activeTab === "notes" && (
							<section className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 animate-fadeIn">
								<h3 className="text-slate-900 font-medium mb-3">章节精读笔记（AI）</h3>
								<div className="space-y-3">
									{deepNotes.map((c) => {
										const open = !!openIds[c.id];
										return (
											<div key={c.id} className="rounded-lg border border-slate-200">
												<button onClick={() => toggle(c.id)} className="w-full flex items-center justify-between p-4 text-left">
													<div className="min-w-0">
														<p className="text-slate-900 font-medium">{c.title}</p>
													</div>
													<svg className={["h-5 w-5 text-slate-500 transition-transform", open ? "rotate-180" : ""].join(" ")} viewBox="0 0 20 20" fill="currentColor">
														<path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 011.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
													</svg>
												</button>
												{open && (
													<div className="px-4 pb-4 text-sm text-slate-700 space-y-3 animate-slideDown">
														<div>
															<p className="text-slate-900 font-medium">核心论点</p>
															<ul className="mt-1 list-disc pl-6 space-y-1">
																{c.keyPoints.map((p, i) => <li key={i}>{p}</li>)}
															</ul>
														</div>
														<div>
															<p className="text-slate-900 font-medium">支撑论据 / 案例</p>
															<ul className="mt-1 list-disc pl-6 space-y-1">
																{c.evidence.map((e, i) => <li key={i}>{e}</li>)}
															</ul>
														</div>
														<div>
															<p className="text-slate-900 font-medium">作者意图与逻辑</p>
															<p className="mt-1 leading-relaxed">{c.authorIntent}</p>
														</div>
														<div>
															<p className="text-slate-900 font-medium">可实践建议</p>
															<ul className="mt-1 list-disc pl-6 space-y-1">
																{c.actionable.map((a, i) => <li key={i}>{a}</li>)}
															</ul>
														</div>
													</div>
												)}
											</div>
										);
									})}
								</div>
							</section>
						)}

						{activeTab === "map" && (
							<section className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 animate-fadeIn">
								<h3 className="text-slate-900 font-medium mb-3">交叉验证与思维导图（AI）</h3>
								<pre className="text-sm text-slate-800 bg-slate-50 rounded-lg p-4 overflow-x-auto leading-6">{mindLines.join("\n")}</pre>
								<div className="mt-4">
									<p className="text-slate-900 font-medium mb-2">理解性问答</p>
									<dl className="space-y-3">
										{qas.map((qa, i) => (
											<div key={i} className="rounded-lg border border-slate-200 p-3 bg-white">
												<dt className="text-slate-900 text-sm font-semibold">Q: {qa.q}</dt>
												<dd className="text-slate-700 text-sm mt-1">A: {qa.a}</dd>
											</div>
										))}
									</dl>
								</div>
							</section>
						)}
					</div>
				)}
			</main>
		</div>
	);
}


