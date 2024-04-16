import { useCallback, useEffect, useRef, useState } from "react";
import useSystemModeContext from "../../contexts/use-system-mode-context";
import { isTimedNode } from "../../types/type-safety";
import { I_Timeline, I_TreeNode, SystemMode } from "../../types/types";
import NodeToolstripCpt from "../node-toolstrip.cpt";
import GroupCpt from "./group.cpt";
import LayoutTimedNodeCpt from "./layout-timed-node.cpt";
import LayoutTreeNodeCpt from "./layout-tree-node.cpt";

function NodeCpt({
	minY,
	node,
	showChildrenHandler,
	showChildren
}: {
	minY: number,
	node: I_TreeNode
	showChildrenHandler: Function
	showChildren: boolean
}) {
	const [systemMode, setSystemMode] = useSystemModeContext()
	const [isLoading, setIsLoading] = useState(true)

	const conta = useRef(0)

	const groupJSX = node !== undefined && showChildren && (
		<GroupCpt
			groupParentKey={node.key}
			minY={minY}
			parentNode={node}
		/>
	)

	const handleLocalClick = (e: any) => {
		console.log('NODE - handleClick: ', node.key);
		e.stopPropagation()
		if (node.childrenGroup.children.length > 0) // To avoid showing children when there´s nothing to show
			showChildrenHandler(node.key)
	}

	useEffect(() => {
		const fn1 = async () => {
			const fn2 = async () => {
				requestAnimationFrame(() => setIsLoading(false))
			}
			await fn2()
		}
		fn1()
	}, [])

	const editorStrip = useCallback(() => {
		if (node !== undefined && systemMode === SystemMode.EDIT) {
			return (
				<NodeToolstripCpt node={node} />
			)
		} else
			return <></>
	}, [systemMode])


	// return useMemo(() => {
	if (isLoading || node === undefined) return <></>
	else if (isTimedNode(node)) {
		return <>
			<LayoutTimedNodeCpt
				node={node as I_Timeline}
				handleLocalClick={handleLocalClick} >
				<g transform={`translate(0 ${-300})`} >
					{editorStrip()}
				</g>
				{groupJSX}
			</LayoutTimedNodeCpt>
		</>
	} else {
		return <>
			<LayoutTreeNodeCpt
				node={node}
				handleLocalClick={handleLocalClick}
			>
				{/* <rect width={node.width} height={node.height/4} fill="yellow" />
				<text x={node.x} y={node.height/5.5} fontSize={100} fill="black" >x:</text> */}
				{editorStrip()}
				{/* {childrenJSX} */}
				{groupJSX}
			</LayoutTreeNodeCpt>
			<text fontSize={150}>{conta.current++}</text>
			{/* <rect width={200} height={200} fill="#f00a" onMouseDown={handleArrange} stroke="#000" strokeWidth={10} /> */}
		</>
	}
	// }, [node, positionedChildren, isLoading])

}

export default NodeCpt
