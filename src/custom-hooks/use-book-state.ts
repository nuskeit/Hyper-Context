import { useEffect, useReducer } from "react"
import { createBook } from "../types/factory"
import { Book } from "../types/types"
import axios from "axios"
 /*
CREATES A NEW BOOK STATE
*/
export const ActionType = {
	NEW_BOOK: "NEW_BOOK",
	UPDATE_NODE: "UPDATE_NODE",
	NEW_NODE: "NEW_NODE",
	DELETE_NODE: "DELETE_NODE",
} as const
export type ActionType = typeof ActionType[keyof typeof ActionType]

export type Action = {
	type: ActionType
	payload: any
}

export default function () {

	const data: Book = createBook(undefined)

	const [state, dispatch] = useReducer(reducer, data)

	function reducer(state: Book, action: Action): Book {
		switch (action.type) {
			case ActionType.UPDATE_NODE:
				const mutableData = { ...state }
				try {
					console.log("TREENODE", action.payload);

					if (!action.payload["treeNode"])
						throw ("No treeNode present in payload")
					mutableData.boardNode.nodes[action.payload["treeNode"]["key"]] = action.payload["treeNode"]
				} catch (error) {
					handleError(error)
				}
				return mutableData
			case ActionType.NEW_BOOK:
				const tmp = { ...state }
				console.log('NEW BOOK');
				tmp.boardNode = action.payload.boardNode
				tmp.options = action.payload.options
				return tmp
			// return { ...action.payload }
			// return createBook(action.payload )
			default:
				return state
		}
	}

	function handleError(error: any) {
		alert(error)
	}

	// useEffect(() => {
	// 	const viewBox: [number, number, number, number] = [-1500, 0, 3000, 5000]
	// 	const f = async () => {
	// 		const g = async () => {
	// 			const response = await axios.get("http://localhost:4000/board/a1")
	// 			// const newData = JSON.parse(response.data)
	// 			const data = await response.data
	// 			const newData = data
	// 			const newState = createBook(newData)
	// 			newState.boardNode.viewBox = viewBox
	// 			dispatch({ type: ActionType.NEW_BOOK, payload: newState })

	// 		}
	// 		await g()
	// 	}
	// 	setTimeout(f,2000)

	// }, [])


	return [state, dispatch] as const
}

