import { useEffect, useState } from "react"
import useBookStateContext, { getChildrenFromBook } from "../contexts/use-book-context"
import { NodeKey } from "../types/types"

export default function <T>(nodeKey: NodeKey) {
	const [book, bookDispatch] = useBookStateContext()
	const [children, setChildren] = useState<T[]>([])

	useEffect(() => {
		setChildren(getChildrenFromBook<T>(book, nodeKey))
	}, [nodeKey, book])


	return [children, setChildren] as const
}