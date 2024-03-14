import axios from "axios"
import useBookStateContext from "../contexts/use-book-context"
import { createBook, createCard } from "../types/factory"
import { ActionType } from "./use-book-state"

export default function() {

	const [book, dispatch] = useBookStateContext()

	function saveBook() { }

	async function getBook(key: string) {
		const viewBox: [number, number, number, number] = [-1500, 0, 3000, 5000]
		const response = await axios.get(`http://localhost:4000/board/${key}`)
		const newData = await response.data
		// Object.keys( newData.boardNode.nodes) .forEach(key => {
		// 	newData.boardNode.nodes[key]["card"]=createCard(newData.boardNode.nodes[key])
		// 	delete newData.boardNode.nodes[key].name
		// 	delete newData.boardNode.nodes[key].title
		// 	delete newData.boardNode.nodes[key].shortText
		// 	delete newData.boardNode.nodes[key].fullStory
		// 	delete newData.boardNode.nodes[key].thumbnail
		// 	delete newData.boardNode.nodes[key].tech
		// 	delete newData.boardNode.nodes[key].images
	
		// });
		// console.log('DONE', JSON.stringify( newData));


		const newState = createBook(newData)
		newState.boardNode.viewBox = viewBox


		dispatch({ type: ActionType.NEW_BOOK, payload: newState })
		
		

	}

	return [getBook, saveBook] as const
}

