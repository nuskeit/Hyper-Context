import { ItemEditorContext, ItemEditorContextSetter } from "./item-editor-context";
import { useContext } from "react";

export default function useItemEditorContext() {
	const editingItem = useEditingItemGetter()
	const setEditingItem = useEditingItemSetter()

	return [editingItem, setEditingItem] as const
}

export function useEditingItemGetter() {
	const editingItem = useContext(ItemEditorContext)

	return editingItem
}


export function useEditingItemSetter() {
	const setEditingItem = useContext(ItemEditorContextSetter)

	return setEditingItem
}