import { useContext } from "react";
import { Book } from "../types/types";
import { BookContext, BookContextDispatch } from "./book-context";
import { Action } from "../custom-hooks/use-book-state";

export default function useBookStateContext() {
	
	const book = useBookState()
	const bookDispatch = useBookStateDispatch()
	const ctx: [Book, React.Dispatch<Action>] = [book, bookDispatch]
	return ctx
}

export function useBookState() {
	const book = useContext(BookContext)

	return book
}


export function useBookStateDispatch() {
	const bookDispatch = useContext(BookContextDispatch)

	return bookDispatch
}