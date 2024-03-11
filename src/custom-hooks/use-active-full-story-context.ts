import { useContext } from "react";
import { ActiveFullStoryContext, ActiveFullStoryContextSetter } from "../contexts/book-context";

export default function useActiveFullStoryContext() {
	const fullStoryNode = useActiveFullStory()
	const setFullStoryNode= useSetActiveFullStory()

	return [fullStoryNode, setFullStoryNode] as const
}

export function useActiveFullStory() {
	const fullStoryNode = useContext(ActiveFullStoryContext)

	return fullStoryNode
}

export function useSetActiveFullStory() {
	const setFullStoryNode= useContext(ActiveFullStoryContextSetter)

	return setFullStoryNode
}