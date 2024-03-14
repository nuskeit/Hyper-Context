import { createContext, ReactNode, useState } from "react";
import { createEditableNode, createTreeNode } from "../types/factory";
import { Editable, EditionType, I_TreeNode } from "../types/types";

export const NodeEditorContext = createContext<Editable<I_TreeNode>>(createEditableNode(createTreeNode(undefined), EditionType.MODIFY_NODE))
export const NodeEditorContextSetter = createContext((e: Editable<I_TreeNode> | undefined) => { })

export default function (props: { children: ReactNode }) {
	const [editingNode, setEditingNode] = useState<Editable<I_TreeNode> | undefined>()

	const setterFn = (e: Editable<I_TreeNode> | undefined) => {
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
