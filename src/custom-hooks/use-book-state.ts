import { useEffect, useReducer } from "react"
import { createBook } from "../types/factory-from-data"
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

	return [state, dispatch] as const
}

