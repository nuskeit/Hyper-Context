import { PointerEventHandler, useRef } from "react"
import { I_NodeGroup, I_Positioned, I_TreeNode } from "../types/types"
import { wholeWordsMultilineText } from "../util/svg-text"
import GroupCpt from "./group.cpt"
import PlusSignCpt from "./icons/plus-sign.cpt"
import LoadingImg from "./image.cpt"
import FullStoryOpenCpt from "./node-actions/full-story-open.cpt"

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
				<rect className="board-node-base " rx="10" ry="10" x={0} y={0} width={positionedNode.width} height={positionedNode.height} strokeWidth="3" />
				<g transform="translate(0, 0)">
					{/* <image href={positionedNode.thumbnail} width={positionedNode.width} height={positionedNode.height} /> */}
					<LoadingImg url={positionedNode.element.card.thumbnail} width={positionedNode.width} height={positionedNode.height} />
				</g>

				{moreButton()}
			</g>
			<text x={0} y={-5} className="elem-title">
				<tspan y="0"> {++count.current} -
					{positionedNode.element.card.name.toUpperCase().substring(0, positionedNode.width / 22)}
				</tspan>
				<tspan fontSize={20}>
					{positionedNode.element.card.name.length > positionedNode.width / 22 ? "..." : ""}
				</tspan>
			</text>

			{/* <text x={positionedNode.width / 2} y={positionedNode.height} dy="20" className="elem-short-text"> */}
			<text x={0} y={positionedNode.height} dy="20" className="elem-short-text">
				{wholeWordsMultilineText(positionedNode.element.card.shortText.substring(0, 98) + "...", 21).map((t, key) => <tspan x={0} dy="25" key={key}>{t}</tspan>)}
				{/* {positionedNode.shortText} */}
			</text>


			<g className="node-action-strip" transform={`translate(${positionedNode.width - 20}, -10) scale(.6,.6)`}>
				{actionStrip}
			</g>

			{children}
		</g>

		{childrenJSX}
	</>
}
