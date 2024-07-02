import { NodeEditorContext, NodeEditorContextSetter } from "./node-editor-context";
import { useContext } from "react";

export default function useNodeEditorContext() {
	const editingNode = useNodeEditorGetter()
	const setEditingNode = useNodeEditorSetter()

	return [editingNode, setEditingNode] as const
}

export function useNodeEditorGetter() {
	const editingNode = useContext(NodeEditorContext)

	return editingNode
}

export function useNodeEditorSetter() {
	const setEditingNode = useContext(NodeEditorContextSetter)

	return setEditingNode
}