import { useMemo } from "react"
import { useGeneralEditorSpaceGetter } from "../../contexts/use-general-editor-space"
import { useSystemModeGetter } from "../../contexts/use-system-mode-context"
import { isEditMode } from "../../util/util"
import "./editors.scss"

export default function () {
	const editor = useGeneralEditorSpaceGetter()
	const systemMode = useSystemModeGetter()

	let autoStyle = "main-editor-wrapper--close"
	if (isEditMode(systemMode) && editor !== undefined)
		autoStyle = "main-editor-wrapper--open"

	let editorJSX = useMemo(
		() => {
			return editor
		}, [editor])

	return (
		<div className={`main-editor-wrapper ${autoStyle}`}>
			{editorJSX}
		</div>
	)
}
