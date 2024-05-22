import { createContext, ReactNode, useState } from "react";
import { I_Editable, I_CardItem } from "../types/types";

export const ItemEditorContext = createContext<I_Editable<I_CardItem> | undefined>(undefined)
export const ItemEditorContextSetter = createContext((e: I_Editable<I_CardItem> | undefined) => { })

export default function (props: { children: ReactNode }) {
	const [editingItem, setEditingItem] = useState<I_Editable<I_CardItem> | undefined>()

	const setterFn = (e: I_Editable<I_CardItem> | undefined) => {
		setEditingItem(e)
	}

	return (
		<ItemEditorContext.Provider value={editingItem as any}>
			<ItemEditorContextSetter.Provider value={setterFn}>
				{props.children}
			</ItemEditorContextSetter.Provider>
		</ItemEditorContext.Provider>
	)
}
