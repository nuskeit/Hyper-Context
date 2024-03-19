import { Editable, I_TreeNode } from "types/types";
import "./style-editor.scss"

export default function (
	{
		editingStyle,
		styleChange
	}: {
		editingStyle: any,
		styleChange: Function
	}
) {

	const handleChange = (field: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		console.log("HANDLE CHANGE", field);
		const newStyle = { ...editingStyle }
		newStyle[field] = e.target.value
		styleChange(newStyle)
	}


	return (
		<div className="style-editor-wrapper">
			<div className="title">Style Editor</div>
			<div className="form-grid">
				<div className="input-group">
					<div>fill:</div><div><input type="text" value={editingStyle["fill"]} onChange={(e) => handleChange("fill", e)} /></div>
				</div>
				<div className="input-group">
					<div>sds</div>
					<div>sssss</div>
				</div>
			</div>
			{/* <div className="form-controls">
				<button onClick={handleClick}>SAVE</button>
			</div> */}
		</div>
	)
}
