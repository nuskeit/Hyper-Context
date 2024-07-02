import { PointerEventHandler, useEffect, useMemo, useRef, useState } from "react"
import PlusSignCpt from "../../components/icons/plus-sign.cpt"
import { I_CardItem, I_TreeNode } from "../../types/types"
import CardItemCpt from "./card-item.cpt"

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

	const [cardItems, setCardItems] = useState<I_CardItem[]>(node.card.cardItems)

	useEffect(() => {
		setCardItems(node.card.cardItems)
	}, [node]);

	const hasChildrenNodes = () => node.childrenGroup.children.length > 0

	const moreButton = () => {
		if (hasChildrenNodes())
			return (
				<g transform={`translate(${node.nodeLayout.value.width - node.nodeLayout.value.width / 6}, 
				${node.nodeLayout.value.height - node.nodeLayout.value.height / 6})`}>
					<PlusSignCpt width={node.nodeLayout.value.width / 4} height={node.nodeLayout.value.height / 4} />
				</g>
			)
		return <></>
	}

	const layoutCardItems = useMemo(() => {
		return cardItems.map((item, index) => (
			<CardItemCpt cardItem={cardItems[index]} key={index} />
		))
	}, [cardItems])




	const count = useRef(0)
	if (node === undefined || node.nodeLayout === undefined) return <></>


	return <>

		<g className={`board-node`}
			transform={`translate(${node.nodeLayout.value.x}, ${node.nodeLayout.value.y + node.nodeLayout.value.height / 2})`}>
			<g onPointerDown={handleLocalClick} className="enter">
				<rect
					style={{ fill: "none", ...node.nodeLayout.style }}
					x={-node.nodeLayout.value.width / 2}
					y={-node.nodeLayout.value.height / 2}
					width={node.nodeLayout.value.width}
					height={node.nodeLayout.value.height} />
				{layoutCardItems}

			</g>

			{moreButton()}
		</g>
		{children}
	</>
}

export default LayoutTreeNodeCpt
