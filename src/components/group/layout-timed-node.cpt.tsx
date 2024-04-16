import { PointerEventHandler } from "react"
import { I_NodeGroup, I_Positioned, I_TimedNode, I_Timeline, I_TreeNode } from "../../types/types"
import GroupRectCpt from "../group-rect.cpt"
import PlusSignCpt from "../icons/plus-sign.cpt"
import FullStoryOpenCpt from "../node-actions/full-story-open.cpt"

export default function LayoutTimedNodeCpt(
	{ node,
		handleLocalClick,
		children
	}: {
		node: I_Timeline
		handleLocalClick: PointerEventHandler<SVGGElement>
		children: any
	}
) {

	function activeFullStoryButton() {
		return node.card.fullStory != undefined
	}
	const actionStrip = activeFullStoryButton() && <FullStoryOpenCpt node={node as unknown as I_TreeNode} />

	// const moreButton = () => {
	// 	if (childrenNodes.length > 0 && !showChildren)
	// 		return (
	// 			<g transform={`translate(${node.nodeLayout.value.width - 35}, ${node.nodeLayout.value.height - 35})`}>
	// 				<PlusSignCpt width={node.nodeLayout.value.height} height={node.nodeLayout.value.height} />
	// 			</g>
	// 		)
	// }

	return <>
		<g className="timed-node"
			transform={`translate(${node.nodeLayout.value.x}, ${node.nodeLayout.value.y})`}
			onPointerDown={handleLocalClick}
		>
			{/* <pattern id={node.key + "-color"} x="0" y="0" patternUnits="userSpaceOnUse" height={positionedNode.height} width="1">
				<image href={node.card.cardItems[0].thumbnail.value} height={positionedNode.height} />
			</pattern>
			<pattern id={node.key} x="0" y="0" patternUnits="userSpaceOnUse" height={positionedNode.height} width="270">
				<g transform="translate(0,18) rotate(-5)">
					<image x="50" href={node.timelineCard.thumbnail.value} height={positionedNode.height} width="270" />
				</g>
			</pattern>
			
 */}
			<rect className="timed-node-base" rx="0" ry="0" x={0} y={0} width={node.nodeLayout.value.width} height={node.nodeLayout.value.height} strokeWidth="3"
				fill={`red`}
			/>
			{/* <rect className="timed-node-base" rx="0" ry="0" x={0} y={0} width={node.nodeLayout.value.width} height={node.nodeLayout.value.height} strokeWidth="3"
				fill={`url(#${node.key})`}
			/> */}
			<g className="timed-node-base hover">
				<rect className="timed-node-base" rx="0" ry="0" x={0} y={0}
					width={node.nodeLayout.value.width}
					height={node.nodeLayout.value.height} strokeWidth="3"
					fill="#000"
				/>
				{/* <image href={positionedNode.thumbnail} x={2} y={2} height={positionedNode.height-4} /> */}

				<text x="5" y={node.nodeLayout.value.height / 1.3} className="timed-node-title">
					{node.card.cardItems[0].cardItemContent.value}
				</text>
			</g>
			{/* <g transform={`translate(${node.nodeLayout.value.width - 28}, 0) scale(${node.nodeLayout.value.width / 260},  ${node.nodeLayout.value.height / 260})`}> */}
			<g className="timed-action-strip" transform={`translate(${node.nodeLayout.value.width - 20}, -10) scale(.6,.6)`}>
				{actionStrip}
			</g>
			{/* {moreButton()} */}


		</g>

		{/* {childrenJSX} */}
		{children}


	</>
}
