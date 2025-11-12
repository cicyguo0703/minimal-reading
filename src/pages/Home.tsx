import { useEffect, useState } from "react";
import type { Book } from "../types";
import { fetchBooksFromAI } from "../api";
import { BookCard } from "../components/BookCard";
import { BookModal } from "../components/BookModal";
import { useNavigate } from "react-router-dom";

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [books, setBooks] = useState<Book[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [activeBook, setActiveBook] = useState<Book | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		let mounted = true;
		(async () => {
			const data = await fetchBooksFromAI();
			if (mounted) {
				setBooks(data);
				setLoading(false);
			}
		})();
		return () => {
			mounted = false;
		};
	}, []);

	const openModal = (book: Book) => {
		setActiveBook(book);
		setModalOpen(true);
	};
	const closeModal = () => {
		setModalOpen(false);
		setActiveBook(null);
	};
	const goToDetail = (bookId: string, tab?: "goals" | "notes" | "map") => {
		closeModal();
		const tabQuery = tab ? `?tab=${tab}` : "";
		navigate(`/books/${bookId}${tabQuery}`);
	};

	return (
		<div className="min-h-screen bg-white">
			<header className="border-b border-slate-200">
				<div className="container mx-auto px-4 py-5">
					<h1 className="text-2xl font-semibold tracking-tight text-slate-900">AI读书馆</h1>
				</div>
			</header>
			<main className="container mx-auto px-4 py-8">
				{loading ? (
					<p className="text-slate-500">加载中…</p>
				) : (
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
						{books.map((book) => (
							<BookCard key={book.id} book={book} onOpen={openModal} />
						))}
					</div>
				)}
			</main>
			<BookModal open={modalOpen} book={activeBook} onClose={closeModal} onGoToDetail={goToDetail} />
		</div>
	);
}


