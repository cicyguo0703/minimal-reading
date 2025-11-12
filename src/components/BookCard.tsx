import React from "react";
import type { Book } from "../types";

export function BookCard({ book, onOpen }: { book: Book; onOpen: (b: Book) => void }) {
	return (
		<button
			onClick={() => onOpen(book)}
			className="group text-left w-full rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
		>
			<div className="aspect-[3/4] w-full overflow-hidden rounded-t-xl bg-slate-100">
				<img src={book.coverUrl} alt={book.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
			</div>
			<div className="p-4">
				<h3 className="text-slate-900 text-base font-semibold line-clamp-1">{book.title}</h3>
				<p className="text-slate-500 text-sm mt-1">{book.author}</p>
				<p className="text-slate-600 text-sm mt-2 line-clamp-2">{book.oneLiner}</p>
				<div className="mt-3">
					<span className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
						查看详情
						<svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
							<path d="M10.75 3.75a.75.75 0 011.5 0v9.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3.75z" />
						</svg>
					</span>
				</div>
			</div>
		</button>
	);
}


