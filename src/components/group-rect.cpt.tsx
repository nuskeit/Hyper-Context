import { I_NodeGroup } from "types/types";

export default function ({
	group,
	visible,
	children
}: {
	group: I_NodeGroup
	visible: boolean
	children: any
}) {

	const g = {
		x: group.groupLayout.value.x,
		y: group.groupLayout.value.y,
	}

	const rect = {
		x: group.groupLayout.value.x - group.groupLayout.value.width / 2,
		y: group.groupLayout.value.y - group.groupLayout.value.height / 2,
		w: group.groupLayout.value.width,
		h: group.groupLayout.value.height,
	}

	const rectREN = visible && (
		<rect
			x={rect.x}
			y={rect.y}
			width={rect.w}
			height={rect.h}
			className="level-group simple-shadow"
			stroke={"#f004"}
			fill={"#fa01"}
		/>)

	return <>
		<g transform={`translate(${g.x} ${g.y})`}>
			{rectREN}
			{children}
		</g>
	</>

}