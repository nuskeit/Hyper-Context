import { I_NodeGroup } from "types/types";

export default function ({ group, visible, fillColor = "#0000", strokeColor = "#0000" }: { group: I_NodeGroup, visible: boolean, fillColor?: string, strokeColor?: string }) {

	if (!visible)
		return <></>
	return (
		<rect
			x={group.x - 50}
			y={group.y - 50}
			width={group.width + 100}
			height={group.height + 100}
			className="level-group"
			stroke={strokeColor}
			fill={fillColor}
		/>
	)
}