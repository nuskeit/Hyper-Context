import { useEffect, useState } from "react"
import useBookStateContext, { getGroupFromBook } from "../contexts/use-book-context"
import { I_NodeGroup, I_TreeNode, NodeKey } from "../types/types"

export default function (nodeKey: NodeKey) {
	const [book, bookDispatch] = useBookStateContext()
	const [group, setGroup] = useState<I_NodeGroup>()

	useEffect(() => {

		setGroup(getGroupFromBook(book, nodeKey))
	}, [nodeKey, book])


	return [group, setGroup] as const
}