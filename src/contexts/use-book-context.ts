import { useContext } from "react";
import { Book, I_NodeGroup, NodeKey } from "../types/types";
import { BookContext, BookContextDispatch } from "./book-context";
import { Action } from "../custom-hooks/use-book-state";
import { I_TreeNode } from "types/types";

export default function useBookStateContext() {

	const book = useBookState()
	const bookDispatch = useBookStateDispatch()
	// const ctx: [Book, React.Dispatch<Action>] = [book, bookDispatch]
	// return ctx
	return [book, bookDispatch]
}

export function useBookState() {
	const book = useContext(BookContext)

	return book as Book
}


export function useBookStateDispatch() {
	const bookDispatch = useContext(BookContextDispatch)

	return bookDispatch
}


// helper functions

export const getGroupFromBook = (book: Book, nodeKey: NodeKey): I_NodeGroup => {
	return book.board.nodes[nodeKey]?.childrenGroup
}

export const getNodeFromBook = (book: Book, nodeKey: NodeKey): I_TreeNode => {
	return book.board.nodes[nodeKey]
}

export const getChildrenFromBook = <T>(book: Book, nodeKey: NodeKey): T[] => {
	let res: T[] = []

	if (nodeKey !== "" && book.board.nodes[nodeKey] !== undefined) {
		// @ts-ignore undefined is being contemplated
		res = book.board.nodes[nodeKey]?.childrenGroup.children.map(n => {
			return book.board.nodes[n]
		})
	}
	return res
}

