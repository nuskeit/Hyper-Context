import { createContext, ReactNode, useState } from "react";
import { createEditableNode, createTreeNode } from "../types/factory";
import { Editable, EditionType, TreeNode } from "../types/types";

export const NodeEditorContext = createContext<Editable<TreeNode>>(createEditableNode(createTreeNode(undefined), EditionType.UPDATE))
export const NodeEditorContextSetter = createContext((e: Editable<TreeNode> | undefined) => { })

export default function (props: { children: ReactNode }) {
	const [editingNode, setEditingNode] = useState<Editable<TreeNode> | undefined>()

	const setterFn = (e: Editable<TreeNode> | undefined) => {
		setEditingNode(e)
	}

	return (
		<NodeEditorContext.Provider value={editingNode as any}>
			<NodeEditorContextSetter.Provider value={setterFn}>
				{props.children}
			</NodeEditorContextSetter.Provider>
		</NodeEditorContext.Provider>
	)
}
