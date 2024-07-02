import { PointerEventHandler } from "react"
import { I_Timeline, I_TreeNode } from "../../types/types"
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

	const hasChildrenNodes = () => node.childrenGroup.children.length > 0

	const moreButton = () => {
		if (hasChildrenNodes()) {
			const h = Math.min(150, Math.max(50, node.nodeLayout.value.height))
			const w = h
			return (
				<g transform={`translate(${node.nodeLayout.value.width - w}, 
				${node.nodeLayout.value.height - h})`}>
					<PlusSignCpt width={w} height={h} />
				</g>
			)
		}
	}

	return <>
		<g className="timed-node"
			transform={`translate(${node.nodeLayout.value.x}, ${node.nodeLayout.value.y})`}
			onPointerDown={handleLocalClick}
		>
			<rect className="timed-node-base" rx="0" ry="0" x={0} y={0} width={node.nodeLayout.value.width} height={node.nodeLayout.value.height} strokeWidth="3"
				fill={`red`}
			/>
			<g className="timed-node-base hover">
				<rect className="timed-node-base" rx="0" ry="0" x={0} y={0}
					width={node.nodeLayout.value.width}
					height={node.nodeLayout.value.height} strokeWidth="3"
					fill="#000"
				/>

				<text x="5" y={node.nodeLayout.value.height / 1.3} className="timed-node-title">
					{node.card.cardItems[0].cardItemContent.value}
				</text>
			</g>
			<g className="timed-action-strip" transform={`translate(${node.nodeLayout.value.width - 20}, -10) scale(.6,.6)`}>
				{actionStrip}
			</g>
			{moreButton()}
		</g>
		{children}
	</>
}
