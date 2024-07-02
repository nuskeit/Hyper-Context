import { useEffect, useState } from "react"
import { createMargin, createNodeGroup, createTimedNode } from "../../types/factory-from-data"
import { I_Hashtable, I_Margin, I_NodeGroup, I_Rect, I_TimedNode, I_Timeline } from "../../types/types"
import { ifExists } from "../../util/util"
import useChildren from "../use-children"
import useGlobalOptions from "../use-global-options"
import useGroup from "../use-group"

export default function usePositionedTimeline(timeline: I_Timeline) {

	const globalOptions = useGlobalOptions()

	const [timedChildren, setTimedChildren] = useChildren<I_TimedNode>(timeline.key)
	const [timedGroup, setTimedGroup] = useGroup(timeline.key)

	const [positionedGroup, setPositionedGroup] = useState(createNodeGroup())
	const [positionedTimeline, setPositionedTimeline] = useState<I_Timeline>(timeline)
	const [positionedChildren, setPositionedChildren] = useState<I_TimedNode[]>([])


	useEffect(() => {
		const nodeMargin = ifExists<I_Margin>(ifExists<any>(globalOptions, "timeline", undefined), "margin", createMargin())

		// Get first and last dates from the children nodes
		const [start, end] = getTimelineStartAndEnd(timedChildren)

		const newTimeline = { ...timeline, start, end }

		// Arranges the timed nodes related to the timeline
		const timelinePosition = { ...timeline.nodeLayout.value, x: -timeline.nodeLayout.value.width / 2 }
		const [positionedChildren, childrensGroup] =
			positionItemsInsideTimeline(newTimeline,
				timedChildren,
				timelinePosition,
				newTimeline.nodeLayout.value.width);

		setPositionedChildren(positionedChildren)
		const tabsHeightReservedSpace = 100

		newTimeline.nodeLayout.value.height = childrensGroup.groupLayout.value.height + 500 // FIXED DISTANCE TO TIMELINE TAGS (?)
		setPositionedTimeline(newTimeline)

		setPositionedGroup(createNodeGroup({
			groupLayout: {
				value: {
					width: childrensGroup.groupLayout.value.width + nodeMargin.left + nodeMargin.right,
					height: childrensGroup.groupLayout.value.height + nodeMargin.top + nodeMargin.bottom,
					x: childrensGroup.groupLayout.value.x - nodeMargin.left,
					y: childrensGroup.groupLayout.value.y - nodeMargin.top,
					margin: { bottom: tabsHeightReservedSpace }
				}
			}
		}))

	}, [timeline, timedGroup])



	return [
		positionedGroup,
		positionedTimeline,
		positionedChildren
	] as const
}

// -----------------------------------------------------------------------------------------------




function getTimelineStartAndEnd(timedChildren: I_TimedNode[]): [number, number] {
	let start = 0
	let end = 0
	timedChildren.forEach(n => { //This garantees that the size of the timeline, is given by the proper nodes
		start = Math.min(start == 0 ? n.start : start, n.start)
		end = Math.max(end, n.end)
	})
	return [start, end]
}

const positionItemsInsideTimeline = (timeline: I_Timeline, timedChildren: I_TimedNode[],
	position: I_Rect, fixedWidth = 0): [I_TimedNode[], I_NodeGroup] => {

	if (timedChildren.length === 0) return [[], createNodeGroup()]


	const tLine = timeline.nodeLayout.value

	const timeInterval = timeline.end - timeline.start
	const timeToGraphFactor = fixedWidth / timeInterval;

	const orderedTimedChildren = orderTimedNodes(timedChildren)
	const newPositionedTimedChildren: I_TimedNode[] = []

	let groupWidth = 0
	let groupHeight = 0
	let groupX = 0
	let minGroupX = Number.MAX_SAFE_INTEGER
	let maxGroupX = -Number.MAX_SAFE_INTEGER
	let minGroupY = Number.MAX_SAFE_INTEGER
	let maxGroupY = -Number.MAX_SAFE_INTEGER

	const rowsTrueYPisition = getRowsPositionY(orderedTimedChildren)

	for (let i = 0; i < orderedTimedChildren.length; ++i) {
		const timedNode = orderedTimedChildren[i]
		const x = (timedNode.start - timeline.start) * timeToGraphFactor + position.x + tLine.x
		const y = rowsTrueYPisition[timedNode.row] + tLine.y
		const width = (timedNode.end - timedNode.start) * timeToGraphFactor
		const height = timedNode.nodeLayout.value.height

		const newPos = {
			x,
			y,
			width,
			height
		}

		minGroupX = Math.min(minGroupX, newPos.x)
		maxGroupX = Math.max(maxGroupX, newPos.x + newPos.width)
		minGroupY = Math.min(minGroupY, newPos.y)
		maxGroupY = Math.max(maxGroupY, newPos.y + newPos.height)

		const newPch: I_TimedNode = createTimedNode({ ...timedNode, nodeLayout: { ...timedNode.nodeLayout, value: { ...timedNode.nodeLayout.value, ...newPos } } })
		newPositionedTimedChildren.push(newPch)
	}

	groupX = minGroupX
	groupWidth = maxGroupX - minGroupX
	groupHeight = maxGroupY - minGroupY

	const childrensGroup: I_NodeGroup = createNodeGroup({
		groupLayout: {
			value: {
				x: groupX,
				y: position.y,
				width: groupWidth,
				height: groupHeight
			}
		}
	})

	return [newPositionedTimedChildren, childrensGroup]
}



// Gets the true row height, to work with uneven timed-nodes' heights
function getRowsPositionY(oc: I_TimedNode[]): I_Hashtable<number> {
	let rowsTrueHeight: I_Hashtable<number> = {}
	let _y: I_Hashtable<number> = {}
	_y[0] = 0
	oc.forEach(e => {
		if (rowsTrueHeight[e.row] == undefined)
			rowsTrueHeight[e.row] = e.nodeLayout.value.height
		else
			rowsTrueHeight[e.row] = Math.max(rowsTrueHeight[e.row], e.nodeLayout.value.height)

		if (e.row > 0) {
			if (_y[e.row] == undefined) {
				_y[e.row] = _y[e.row - 1] + rowsTrueHeight[e.row - 1]
			} else {
				_y[e.row] = Math.max(_y[e.row], _y[e.row - 1] + rowsTrueHeight[e.row - 1])
			}
		}
	})

	return _y
}


function orderTimedNodes(timedNodes: I_TimedNode[]): I_TimedNode[] {
	const originalNodes: I_TimedNode[] = [...timedNodes]
	const orderedNodes: I_TimedNode[] = []

	function nextTimedNode(nodes: I_TimedNode[], oNodes: I_TimedNode[], row = 0) {
		const sinceDate = oNodes.length > 0 ? oNodes[oNodes.length - 1].end : 0
		let rowsToAdd = 0
		let [nodeIndex] = findNextNonOverlappingTimedNode(nodes, sinceDate)
		if (nodeIndex == -1) {
			nodeIndex = findNextNonOverlappingTimedNode(nodes, 0)[0]
			rowsToAdd = 1
		}

		if (nodeIndex > -1) {
			oNodes.push({ ...nodes[nodeIndex], row: row + rowsToAdd })
			nodes.splice(nodeIndex, 1)
			nextTimedNode(nodes, oNodes, row + rowsToAdd)
		}
	}

	nextTimedNode(originalNodes, orderedNodes)

	return orderedNodes
}

function findNextNonOverlappingTimedNode(timedNodes: I_TimedNode[], sinceDate: number): [number, number, number] {
	if (timedNodes.length == 0) return [-1, -1, -1]
	let firstIndex = -1
	let start = Number.MAX_SAFE_INTEGER
	let end = 0
	let found = false
	for (let i = 0; i < timedNodes.length; ++i) {
		if (start > timedNodes[i].start && timedNodes[i].start > sinceDate) {
			firstIndex = i
			start = timedNodes[i].start
			end = timedNodes[i].end
			found = true
		}
	}
	if (found)
		return [firstIndex, start, end]
	return [-1, -1, -1]
}



