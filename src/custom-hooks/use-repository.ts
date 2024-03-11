import axios from "axios"
import useBookStateContext from "../contexts/use-book-context"
import { createBook } from "../types/factory"
import { ActionType } from "./use-book-state"

export default function() {

	const [book, dispatch] = useBookStateContext()

	function saveBook() { }

	async function getBook(key: string) {
		const viewBox: [number, number, number, number] = [-1500, 0, 3000, 5000]
		const response = await axios.get(`http://localhost:4000/board/${key}`)
		const data = await response.data
		const newData = data
		const newState = createBook(newData)
		newState.boardNode.viewBox = viewBox
		dispatch({ type: ActionType.NEW_BOOK, payload: newState })
		console.log('DONE', newData);
	}

	return [getBook, saveBook] as const
}

