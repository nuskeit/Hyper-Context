import { PointerEventHandler, useRef } from "react"
import { I_NodeGroup, I_Positioned, I_TreeNode } from "../types/types"
import { wholeWordsMultilineText } from "../util/svg-text"
import GroupCpt from "./group.cpt"
import PlusSignCpt from "./icons/plus-sign.cpt"
import LoadingImg from "./image.cpt"
import FullStoryOpenCpt from "./node-actions/full-story-open.cpt"
import { getStylePropValue } from "../util/util"

export default function LayoutTreeNodeCpt(
	{ positionedNode,
		childrenNodes,
		group,
		showChildren,
		handleLocalClick,
		childrenJSX,
		connections,
		children
	}: {
		positionedNode: I_Positioned<I_TreeNode>
		childrenNodes: I_Positioned<I_TreeNode>[]
		group: I_NodeGroup
		showChildren: boolean
		handleLocalClick: PointerEventHandler<SVGGElement>
		childrenJSX: any //ReactElement<any, string | JSXElementConstructor<any>>[]
		connections: any //ReactElement<any, string | JSXElementConstructor<any>>[]
		children: any
	}
) {
	function activeFullStoryButton() {
		return positionedNode.element.card.fullStory != undefined
	}
	const actionStrip = activeFullStoryButton() && <FullStoryOpenCpt node={positionedNode.element as unknown as I_TreeNode} />

	const moreButton = () => {
		if (childrenNodes.length > 0 && !showChildren)
			return (
				<g transform={`translate(${positionedNode.width - positionedNode.width / 6}, ${positionedNode.height - positionedNode.height / 6})`}>
					<PlusSignCpt width={positionedNode.width / 4} height={positionedNode.height / 4} />
				</g>
			)
	}


	const count = useRef(0)
	return <>
		<GroupCpt fillColor="none" group={group} visible={showChildren} />

		<g className={"connections"}>
			{connections}
		</g>
		<g className="board-node " transform={`translate(${positionedNode.x}, ${positionedNode.y})`}>
			<g onPointerDown={handleLocalClick} className="generic-shadow">

				<rect className="board-node-base " x={0} y={0}
					width={positionedNode.width} height={positionedNode.height}
					style={positionedNode.element.card.background?.style} />

				<g style={positionedNode.element.card.thumbnail.style}>
					<LoadingImg url={positionedNode.element.card.thumbnail.value} 
					width={positionedNode.width} height={positionedNode.height} />
				</g>

				{moreButton()}
			</g>
			<text x={0} y={-55} className="elem-title" style={{ fontSize: "1.5rem", fill: "#ddd" }}>
				<tspan x="0" dy="0">
					re-render
				</tspan>
				<tspan x="0" dy="20">
					no. {++count.current}
				</tspan>
			</text>

			<text x={positionedNode.width / 2} y={0} className="elem-title" 
			style={{ ...positionedNode.element.card.name.style, textAnchor: "middle" }} >
				{positionedNode.element.card.name.value.toUpperCase()}
			</text>

			<text x={positionedNode.width / 2} y={20} className="elem-title" 
			style={{ ...positionedNode.element.card.title.style, textAnchor: "middle" }} >
				{positionedNode.element.card.title.value
					.split("\n").map((e, i) => (<tspan key={i} x={positionedNode.width / 2} 
					dy={getStylePropValue(positionedNode.element.card.title.style, "fontSize", "0") || 30}>{e}</tspan>))}
			</text>

			<g className="node-action-strip" transform={`translate(${positionedNode.width - 20}, -10) scale(.6,.6)`}>
				{actionStrip}
			</g>

			{children}
		</g>

		{childrenJSX}
	</>
}
