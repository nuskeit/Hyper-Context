import { PointerEventHandler, useCallback, useRef } from "react"
import { I_TreeNode, SystemMode } from "../../types/types"
import CardItemCpt from "./card-item.cpt"
import useSystemModeContext from "../../contexts/use-system-mode-context"
import { useEditingNode } from "../../contexts/use-node-editor-context"

function LayoutTreeNodeCpt(
	{ node,
		handleLocalClick,
		children,
	}: {
		node: I_TreeNode
		handleLocalClick: PointerEventHandler<SVGGElement>
		children: any
	}
) {
	const [systemMode] = useSystemModeContext()
	const editingNode = useEditingNode()

	// function activeFullStoryButton() {
	// 	return positionedNode.element.card.fullStory != undefined
	// }
	// const actionStrip = activeFullStoryButton() && <FullStoryOpenCpt node={positionedNode.element as unknown as I_TreeNode} />

	const moreButton = () => {
		return <></>
		// if (node.group !== undefined && childrenNodes.length > 0 && !showChildren)
		// 	return (
		// 		<g transform={`translate(${node.nodeLayout.value.width - node.nodeLayout.value.width / 6}, 
		// 		${node.nodeLayout.value.height - node.nodeLayout.value.height / 6})`}>
		// 			<PlusSignCpt width={node.nodeLayout.value.width / 4} height={node.nodeLayout.value.height / 4} />
		// 		</g>
		// 	)
	}

	const layoutCardItems = useCallback(() => {
		return node.card.cardItems.map((item, index) => (
			<CardItemCpt cardItem={item} key={index} />
		))
	}, [node])

	const editMode = systemMode === SystemMode.EDIT
		&& editingNode?.target.key === node.key
		&& (
			<g transform={`translate(${0}, ${0})`}>
				<text fontSize={50} x={-node.nodeLayout.value.width / 2} y={-node.nodeLayout.value.height / 2 - 50}>
					{node.name}
				</text>
			</g>
		)


	const count = useRef(0)
	if (node === undefined || node.nodeLayout === undefined) return <></>

	return <>

		<g transform={`translate(${node.nodeLayout.value.x}, ${node.nodeLayout.value.y + node.nodeLayout.value.height / 2})`}>
			<g onPointerDown={handleLocalClick}>
				<rect
					fill="#0001" stroke="#000" strokeDasharray="25" strokeWidth={4}
					x={-node.nodeLayout.value.width / 2}
					y={-node.nodeLayout.value.height / 2}
					width={node.nodeLayout.value.width}
					height={node.nodeLayout.value.height} />
				{/* <text fontSize={100}> {conta.current++}</text> */}
				{layoutCardItems()}

			</g>


			{/* SHOW ONLY ON EDIT MODE */}
			{editMode}

			{/* 
			<g onPointerDown={handleLocalClick} className="simple-shadow">

				<rect className="board-node-base " x={0} y={0}
					width={positionedNode.width} height={positionedNode.height}
					style={positionedNode.element.card.background?.style} />

				<g style={positionedNode.element.card.thumbnail.style}>
					<LoadingImg url={positionedNode.element.card.thumbnail.value} 
					width={positionedNode.width} height={positionedNode.height} />
				</g>
	*/}
			{moreButton()}
			{/*		</g>
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
					dy={getStylePropValue(positionedNode.element.card.title.style, "line-height", 
					getStylePropValue(positionedNode.element.card.title.style, "font-size", "0")) || 30}>{e}</tspan>))}
			</text>

			<g className="node-action-strip" transform={`translate(${positionedNode.width - 20}, -10) scale(.6,.6)`}>
				{actionStrip}
			</g> */}

		</g>
		{children}
	</>
}

export default LayoutTreeNodeCpt
