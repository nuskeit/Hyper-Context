import { createContext, ReactNode, useState } from "react";

export const GeneralEditorSpaceContext = createContext<JSX.Element | undefined>(undefined)
export const EditorContextSetterContext = createContext((e: JSX.Element | undefined) => { })

export default function (props: { children: ReactNode }) {
	const [editingItem, setEditingItem] = useState<JSX.Element | undefined>()

	const setterFn = (e: JSX.Element | undefined) => {
		setEditingItem(e)
	}

	return (
		<GeneralEditorSpaceContext.Provider value={editingItem as any}>
			<EditorContextSetterContext.Provider value={setterFn}>
				{props.children}
			</EditorContextSetterContext.Provider>
		</GeneralEditorSpaceContext.Provider>
	)
}
