import { SystemMode } from "../../types/types"
import useSystemModeContext from "../../contexts/use-system-mode-context"
import './edit-mode-button.scss'
// import { useEditingNode } from "../contexts/use-node-editing-context"

export default function EditModeButton() {
	const [systemMode, setSystemMode] = useSystemModeContext()

	function handleClick() {
		if (systemMode === SystemMode.DEFAULT)
			setSystemMode(SystemMode.EDIT)
		else
			setSystemMode(SystemMode.DEFAULT)
	}

	return <>
		<div>
			<div className={`edit-mode-button ${systemMode==SystemMode.EDIT ? "selected" : ""}`} onClick={handleClick}>
			</div>
		</div>
	</>
}


