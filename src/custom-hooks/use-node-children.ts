import { useEffect, useState } from "react"
import useBookStateContext from "../contexts/use-book-context"
import { I_TreeNode, NodeKey } from "../types/types"

export default function useNodeChildren(nodeKey: NodeKey) {
	const [book, bookDispatch] = useBookStateContext()
	const [node, setNode] = useState<I_TreeNode>(book.boardNode.nodes[nodeKey] )
	const [children, setChildren] = useState<I_TreeNode[]>([])


	useEffect(() => {
		setNode(book.boardNode.nodes[nodeKey] )
		setChildren(getChildren(nodeKey))
	}, [nodeKey, book.boardNode.nodes[nodeKey], book])

	const getChildren = (nodeKey: NodeKey): I_TreeNode[] => {
		let res: I_TreeNode[] = []
		if (nodeKey === "") {
			res = book.boardNode.nodes["root"] !== undefined
				? [book.boardNode.nodes["root"]]
				: []
		} else if (book.boardNode.nodes[nodeKey].group != undefined) {
			// @ts-ignore undefined is being contemplated
			res = book.boardNode.nodes[nodeKey].group?.children.map(n => {
				return book.boardNode.nodes[n]
			})
		} else
			res = []

		return res
	}

	return [node, children] as const
}