import { GeneralEditorSpaceContext, EditorContextSetterContext } from "./general-editor-space-context";
import { useContext } from "react";

export default function useGeneralEditorSpace() {
	const editorSpace = useGeneralEditorSpaceGetter()
	const setEditorSpace = useGeneralEditorSpaceSetter()

	return [editorSpace, setEditorSpace] as const
}

export function useGeneralEditorSpaceGetter() {
	const editorSpace = useContext(GeneralEditorSpaceContext)

	return editorSpace
}


export function useGeneralEditorSpaceSetter() {
	const setEditorSpace = useContext(EditorContextSetterContext)

	return setEditorSpace
}