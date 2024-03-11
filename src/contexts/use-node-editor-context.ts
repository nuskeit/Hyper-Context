import { NodeEditorContext, NodeEditorContextSetter } from "./node-editor-context";
import { useContext } from "react";

export default function useNodeEditorContext() {
	const editingNode = useEditingNode()
	const setEditingNode = useSetEditingNode()

	return [editingNode, setEditingNode] as const
}

export function useEditingNode() {
	const editingNode = useContext(NodeEditorContext)

	return editingNode
}


export function useSetEditingNode() {
	const setEditingNode = useContext(NodeEditorContextSetter)

	return setEditingNode
}