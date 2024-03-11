// import { useEffect, useReducer } from "react"
// import testData from "../data/test-3.json"
// import { createBook, createNode } from "../types/factory"
// import { BoardNode, I_Identity, I_Node, Book } from "../types/types"

// export const ActionType = {
// 	NEW_BOOK: "NEW_BOOK",
// 	UPDATE_NODE: "UPDATE_NODE",
// 	NEW_NODE: "NEW_NODE",
// 	DELETE_NODE: "DELETE_NODE",
// } as const
// export type ActionType = typeof ActionType[keyof typeof ActionType]

// export type Action = {
// 	type: ActionType
// 	payload: any
// }

// export default function useBookState() {

// 	const data: Book = createBook(undefined)

// 	const [state, dispatch] = useReducer(reducer, data)

// 	function reducer(state: Book, action: Action): Book {
// 		switch (action.type) {
// 			case ActionType.UPDATE_NODE:
// 				const mutableData = { ...state }
// 				try {
// 					console.log("TREENODE", action.payload);
					
// 					if (!action.payload["treeNode"])
// 						throw ("No treeNode present in payload")
// 					mutableData.boardNode.nodes[action.payload["treeNode"]["key"]] = action.payload["treeNode"]
// 				} catch (error) {
// 					handleError(error)
// 				}
// 				return mutableData
// 			case ActionType.NEW_BOOK:
// 				return { ...action.payload }
// 			default:
// 				return state
// 		}
// 	}

// 	function handleError(error: any) {
// 		alert(error)
// 	}

// 	useEffect(() => {
// 		const viewBox = [-1500, 0, 3000, 5000]
// 		// const newState = createBook({ ...testData, boardNode: { ...testData.boardNode, viewBox } })
// 		testData.boardNode["viewBox"] = viewBox
// 		const newState = createBook(testData)
// 		dispatch({ type: ActionType.NEW_BOOK, payload: newState })
// 	}, [])


// 	return [state, dispatch] as const
// }

