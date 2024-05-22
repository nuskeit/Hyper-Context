import { createContext, ReactNode, useState } from "react";
import { I_Editable, EditionType, I_TreeNode } from "../types/types";
import { createEditableNode, createTreeNode } from "../types/factory-from-data";

//export const NodeEditorContext = createContext<I_Editable<I_TreeNode>>(createEditableNode(createTreeNode(), EditionType.MODIFY_NODE))
export const NodeEditorContext = createContext<I_Editable<I_TreeNode> | undefined>(undefined)
export const NodeEditorContextSetter = createContext((e: I_Editable<I_TreeNode> | undefined) => { })

export default function (props: { children: ReactNode }) {
	const [editingNode, setEditingNode] = useState<I_Editable<I_TreeNode> | undefined>()

	const setterFn = (e: I_Editable<I_TreeNode> | undefined) => {
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
