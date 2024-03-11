import { useEffect, useState } from "react"
import useBookStateContext from "../contexts/use-book-context"
import { I_Node, NodeKey, TreeNode } from "../types/types"

export default function useNodeChildren(nodeKey: NodeKey) {
	const [book, bookDispatch] = useBookStateContext()
	const [node, setNode] = useState<I_Node>(book.boardNode.nodes[nodeKey] as TreeNode)
	const [children, setChildren] = useState<I_Node[]>([])


	useEffect(() => {
		setNode(book.boardNode.nodes[nodeKey] as TreeNode)
		setChildren(getChildren(nodeKey))
	}, [nodeKey, book.boardNode.nodes[nodeKey], book])

	const getChildren = (nodeKey: NodeKey): TreeNode[] => {
		let res: I_Node[] = []
		if (nodeKey === "") {
			res = book.boardNode.nodes["root"] !== undefined
				? [book.boardNode.nodes["root"]]
				: []
		} else {
			res = book.boardNode.relationships.filter(n => {
				return n["source"] === nodeKey
			}).map(n => {
				return book.boardNode.nodes[n["target"]]
			})
		}

		return res as TreeNode[]
	}

	return [node, children] as const
}