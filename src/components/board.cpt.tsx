import { useCallback, useEffect, useRef, useState } from "react";
import useActiveFullStoryContext from "../custom-hooks/use-active-full-story-context";
import useWindowResize from "../custom-hooks/use-window-resize";
import usePositionedNode from "../custom-hooks/usePositionedNode";
import { createNodeGroup } from "../types/factory";
import { isTimelineNode } from "../types/type-safety";
import { TreeNode } from "../types/types";
import './board.scss';
import EditModeButton from "./buttons/edit-mode-button.cpt";
import useBookStateContext from "../contexts/use-book-context";
import FullStoryCpt from "./full-story.cpt";
import AllSeingEyeCpt from "./icons/all-seing-eye.cpt";
import NodeCpt from "./node.cpt";

export default function () {
	const [book, bookDispatch] = useBookStateContext()
	const [activeFullStory, setActiveFullStory] = useActiveFullStoryContext()

	const storyUnselectHandler = () => {
		setActiveFullStory(undefined)
	}

	const svgRef = useRef(null)
	const [viewBox, viewBoxTuple, changeOriginXYWH, scrollVertical, zoom, setZoomLevel] = useWindowResize(() => svgRef.current)

	const [firstNodeGroup, setFirstNodeGroup] = useState(createNodeGroup(undefined))
	const [node, positionedGroup, positionedChildren] = usePositionedNode("", firstNodeGroup)

	// useEffect(() => {
	// 	svgRef.current.addEventListener("wheel", handleScrolling)
	// 	return () => svgRef.current.removeEventListener("wheel", handleScrolling)
	// }, [])


	useEffect(() => {
		requestAnimationFrame(() => {
			changeOriginXYWH(...book.boardNode.viewBox)
			// /* DEBUG : Shows full story automatically*/ 
			// /* DEBUG */ activeFullStoryContext.setFullStory(book.boardNode.tree.children[0])
		})
	}, [book.boardNode.viewBox])

	const fullStory = (n?: TreeNode) =>
		n === undefined ? <></> :
			<FullStoryCpt node={n} onExit={storyUnselectHandler} />


	const clickHandler = (n: TreeNode) => {
		//changeOrigin(n)
	}


	function fullStoryRead() {
		if (activeFullStory.fullStoryNode === undefined)
			return fullStory(undefined)
		return fullStory(activeFullStory.fullStoryNode as TreeNode)
	}

	function handleScrolling(event: WheelEvent) {
		// event.preventDefault()
		event.stopPropagation()
		if (event.altKey)
			zoom(-event.deltaY)
		else
			scrollVertical(event.deltaY)
	}

	const scrollPosY = useCallback(() => {
		return viewBoxTuple[1]
	}, [viewBoxTuple[1], viewBoxTuple])

	// const boardStyle = useMemo(() => {
	// 	return { backgroundPosition: `$0px ${scrollPosY()}px` }
	// }, [viewBoxTuple[1], viewBoxTuple])

	let maxWidth = 0
	const enlargeViewBox = async (newWidth: number) => {
		if (newWidth > maxWidth) {
			maxWidth = newWidth
			setZoomLevel(2600 / newWidth)
		}

		const z = async () => { }

		// if (newWidth > maxWidth) {
		// 	maxWidth = newWidth
		// 	changeOriginXYWH(book.boardNode.viewBox[0],
		// 		book.boardNode.viewBox[1],
		// 		newWidth,
		// 		book.boardNode.viewBox[3])
		// }
	}


	const childrenJSX = () => {
		return positionedChildren.map((positionedNode, i) => {

			if (isTimelineNode(positionedNode.element)) {
				return <></>
				// return <TimelineCpt group={{ ...positionedGroup, y: positionedGroup.y + offsetY }} timeline={positionedNode as Timeline} onClick={childrenClickHandler} key={i} />
			}
			else {
				return <NodeCpt
					group={positionedGroup}
					nodeKey={positionedNode.element.key} onClick={clickHandler}
					position={positionedNode}
					showChildren={true} key={i}
					changeViewBoxDelegate={enlargeViewBox}
				/>
			}

		})
	}




	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		const fn1 = async () => {
			const fn2 = async () => {
				requestAnimationFrame(() => setIsLoading(false))
				// setTimeout(() => setIsLoading(false), 0)
			}
			await fn2()
		}
		fn1()
	}, [])

	if (isLoading) {
		return <></>
	}
	return (
		<>
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="board" ref={svgRef}
				viewBox={viewBox} style={{ backgroundPosition: `0px ${scrollPosY()}px` }}
				preserveAspectRatio="xMinYMin slice"
				onWheel={(handleScrolling as any)}
			>
				{childrenJSX()}

				{/* <AllSeingEyeCpt x={-100} y={0} open={true} blink={true} /> */}
			</svg>
			<EditModeButton />
			{fullStoryRead()}
		</>
	)
}