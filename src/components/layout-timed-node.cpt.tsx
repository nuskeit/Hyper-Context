import { PointerEventHandler } from "react"
import { I_NodeGroup, I_Position, I_Positioned, I_Vector2, TimedNode, Timeline, TreeNode } from "../types/types"
import GroupCpt from "./group.cpt"
import PlusSignCpt from "./icons/plus-sign.cpt"
import FullStoryOpenCpt from "./node-actions/full-story-open.cpt"

export default function LayoutTimedNodeCpt(
	{ positionedNode,
		children,
		group,
		showChildren,
		handleLocalClick,
		childrenJSX,
		connections
	}: {
		positionedNode: I_Positioned<Timeline>
		children: I_Positioned<TimedNode>[]
		group: I_NodeGroup
		showChildren: boolean
		handleLocalClick: PointerEventHandler<SVGGElement>
		childrenJSX: any //ReactElement<any, string | JSXElementConstructor<any>>[]
		connections: any //ReactElement<any, string | JSXElementConstructor<any>>[]
	}
) {
	function activeFullStoryButton() {
		return children.length > 0 && positionedNode.element.fullStory != undefined
	}

	const actionStrip = activeFullStoryButton() && <FullStoryOpenCpt node={positionedNode.element as unknown as TreeNode} />

	const moreButton = () => {
		if (children.length > 0 && !showChildren)
			return (
				<g transform={`translate(${positionedNode.width - 35}, ${positionedNode.height - 35})`}>
					<PlusSignCpt width={positionedNode.height} height={positionedNode.height} />
				</g>
			)
	}

	return <>
		<GroupCpt group={group} visible={showChildren} />
		<g className="timed-node"
			transform={`translate(${positionedNode.x}, ${positionedNode.y})`}
			onPointerDown={handleLocalClick}
		>
			<pattern id={positionedNode.element.key + "-color"} x="0" y="0" patternUnits="userSpaceOnUse" height={positionedNode.height} width="1">
				<image href={positionedNode.element.thumbnail} height={positionedNode.height} />
			</pattern>
			<pattern id={positionedNode.element.key} x="0" y="0" patternUnits="userSpaceOnUse" height={positionedNode.height} width="270">
				<g transform="translate(0,18) rotate(-5)">
					<image x="50" href={positionedNode.element.thumbnail} height={positionedNode.height} width="270" />
				</g>
			</pattern>

			<rect className="timed-node-base" rx="0" ry="0" x={0} y={0} width={positionedNode.width} height={positionedNode.height} strokeWidth="3"
				fill={`url(#${positionedNode.element.key}-color)`}
			/>
			<rect className="timed-node-base" rx="0" ry="0" x={0} y={0} width={positionedNode.width} height={positionedNode.height} strokeWidth="3"
				fill={`url(#${positionedNode.element.key})`}
			/>
			<g className="timed-node-base hover">
				<rect className="timed-node-base" rx="0" ry="0" x={0} y={0} width={positionedNode.width} height={positionedNode.height} strokeWidth="3"
					fill="#000"
				/>
				{/* <image href={positionedNode.thumbnail} x={2} y={2} height={positionedNode.height-4} /> */}

				<text x="5" y={positionedNode.height / 1.3} className="timed-node-title">
					{positionedNode.element.name}
				</text>
			</g>
			{/* <g transform={`translate(${positionedNode.width - 28}, 0) scale(${positionedNode.width / 260},  ${positionedNode.height / 260})`}> */}
			<g className="timed-action-strip" transform={`translate(${positionedNode.width - 20}, -10) scale(.6,.6)`}>
				{actionStrip}
			</g>
			{moreButton()}


		</g>

		{childrenJSX}

		<g className={"connections"}>
			{connections}
		</g>

	</>
}
