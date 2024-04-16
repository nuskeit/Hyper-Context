import axios from "axios"
import useBookStateContext from "../contexts/use-book-context"
import { createBook, createCard } from "../types/factory-from-data"
import { ActionType } from "./use-book-state"
import { Book } from "types/types"

export default function () {

	const [book, dispatch] = useBookStateContext()

	async function getBook(key: string) {

		// const viewBox: [number, number, number, number] = [-1500, 0, 3000, 5000]
		const response = await axios.get(`http://localhost:4000/board/${key}`)
		const newData = await response.data

		//		updateDataVersion002_003(newData)

		const newState = createBook(newData)
		// newState.board.viewBox = viewBox

		dispatch({ type: ActionType.NEW_BOOK, payload: newState })

	}

	async function saveBook(key: string, book:Book){

		try {
			const response = await axios.post(`http://localhost:4000/board/save/${key}`, book)
		} catch (error) {
			console.log("HUBO UN ERROR", error)
		} 

	}


	return [getBook, saveBook] as const
}




function updateDataVersion001_002(newData: any) {
	if (newData["version"] != "0.001") throw Error(`Wrong version (ver ${newData["version"]})`)
	Object.keys(newData.board.nodes).forEach(key => {
		Object.keys(newData.board.nodes[key].card).forEach(field => {
			newData.board.nodes[key]["card"][field] = { value: newData.board.nodes[key]["card"][field], style: {} }
		});
	});
	console.log('DONE', JSON.stringify(newData));
	return newData

}

function updateDataVersion000_001(newData: any) {
	Object.keys(newData.board.nodes).forEach(key => {
		newData.board.nodes[key]["card"] = createCard(newData.board.nodes[key])
		delete newData.board.nodes[key].name
		delete newData.board.nodes[key].title
		delete newData.board.nodes[key].shortText
		delete newData.board.nodes[key].fullStory
		delete newData.board.nodes[key].thumbnail
		delete newData.board.nodes[key].tech
		delete newData.board.nodes[key].images

	});
	console.log('DONE', JSON.stringify(newData));
	return newData

}