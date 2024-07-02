import useNodeEditorContext, { useNodeEditorSetter } from "../../contexts/use-node-editor-context"
import useSystemModeContext from "../../contexts/use-system-mode-context"
import { SystemMode } from "../../types/types"
import { isEditMode } from "../../util/util"
import './edit-mode-button.scss'

export default function EditModeButton() {
	const [systemMode, setSystemMode] = useSystemModeContext()
	const  setEditingNode = useNodeEditorSetter()

	function handleClick() {
		if (systemMode === SystemMode.DEFAULT)
			setSystemMode(SystemMode.EDIT)
		else {
			setEditingNode(undefined)
			setSystemMode(SystemMode.DEFAULT)
		}
	}

	return <>
		<div>
			<div className={`edit-mode-button ${isEditMode(systemMode) ? "selected" : ""}`} onClick={handleClick}>
			</div>
		</div>
	</>
}


