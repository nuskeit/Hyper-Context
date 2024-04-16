import { useEffect, useState } from "react"
import useBookStateContext, { getNodeFromBook } from "../contexts/use-book-context"
import { I_TreeNode, NodeKey } from "../types/types"

export default function useNode(nodeKey: NodeKey) {
	const [book, bookDispatch] = useBookStateContext()
	const [node, setNode] = useState<I_TreeNode>()

	useEffect(() => {
		setNode((getNodeFromBook(book, nodeKey)))
	}, [nodeKey, book.board.nodes[nodeKey], book])


	return [node, setNode] as const
}