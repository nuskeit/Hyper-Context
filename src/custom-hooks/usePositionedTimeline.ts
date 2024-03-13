import { useEffect, useState } from "react"
import { createNodeGroup, createPositionedElement } from "../types/factory"
import { I_Hashtable, I_NodeGroup, I_Positioned, TimedNode, Timeline } from "../types/types"
import useGlobalOptions from "./useGlobalOptions"

export default function usePositionedTimeline(timeline: Timeline, timedChildren: TimedNode[], group: I_NodeGroup, position: { x: number, y: number, height: number, width: number }) {

	const globalOptions = useGlobalOptions()

	const [positionedTimeline, setPositionedTimeline] = useState<I_Positioned<Timeline>>(createPositionedElement<Timeline>(timeline))
	const [timelineGroup, setTimelineGroup] = useState(createNodeGroup(undefined))
	const [positionedChildren, setPositionedChildren] = useState<I_Positioned<TimedNode>[]>([])

	useEffect(() => {

		const tlWithStartAndEnd = { ...positionedTimeline.element }
		timelineWithStartAndEnd(tlWithStartAndEnd, timedChildren)
		const [positionedChildren, childrensGroup] = positionItemsInsideTimeline(tlWithStartAndEnd, timedChildren, group, position, tlWithStartAndEnd.width)
		setPositionedChildren(positionedChildren)
		const tabsHeightReservedSpace = 100

		setPositionedTimeline({ ...positionedTimeline, height: childrensGroup.height })

		setTimelineGroup(createNodeGroup({
			width: childrensGroup.width,
			height: childrensGroup.height,
			x: childrensGroup.x,
			y: group.y,
			margin: { bottom: tabsHeightReservedSpace }
		}))



	}, [timeline, timedChildren, group])

	return [timelineGroup, positionedTimeline, positionedChildren] as const
}





function timelineWithStartAndEnd(timeline: Timeline, timedChildren: TimedNode[]) {
	timedChildren.forEach(n => { //This garantees that the size of the timeline, is given by the proper nodes
		timeline.start = Math.min(timeline.start == 0 ? n.start : timeline.start, n.start)
		timeline.end = Math.max(timeline.end, n.end)
	})
}

const positionItemsInsideTimeline = (timeline: Timeline, timedChildren: TimedNode[], gru: I_NodeGroup,
	position: { x: number, y: number, height: number, width: number }, fixedWidth = 0): [I_Positioned<TimedNode>[], I_NodeGroup] => {
	const timeInterval = timeline.end - timeline.start
	const timeToGraphFactor = fixedWidth / timeInterval;

	const orderedTimedChildren = orderTimedNodes(timedChildren)
	const newPositionedTimedChildren = []

	let groupWidth = 0
	let groupHeight = 0

	const rowsTrueYPisition = getRowsPositionY(orderedTimedChildren)

	for (let i = 0; i < orderedTimedChildren.length; ++i) {
		const timedNode = orderedTimedChildren[i]
		const x = (timedNode.start - timeline.start) * timeToGraphFactor
		const y = rowsTrueYPisition[timedNode.row]
		const width = (timedNode.end - timedNode.start) * timeToGraphFactor
		const height = timedNode.height

		const newPos = {
			x: position.x + timeline.x + x,
			y: timeline.y + y + gru.y,
			width,
			height
		}

		groupWidth = Math.max(groupWidth, x + width)
		groupHeight = Math.max(groupHeight, y + height)

		newPositionedTimedChildren.push(createPositionedElement(timedNode, newPos))
	}

	const childrensGroup: I_NodeGroup = createNodeGroup({
		x: position.x,
		y: 0,
		width: groupWidth,
		height: groupHeight
	})

	return [newPositionedTimedChildren, childrensGroup]
}

// Gets the true row height, to work with uneven timed-nodes' heights
function getRowsPositionY(oc: TimedNode[]): I_Hashtable<number> {
	let rowsTrueHeight: I_Hashtable<number> = {}
	let _y: I_Hashtable<number> = {}
	_y[0] = 0
	oc.forEach(e => {
		if (rowsTrueHeight[e.row] == undefined)
			rowsTrueHeight[e.row] = e.height
		else
			rowsTrueHeight[e.row] = Math.max(rowsTrueHeight[e.row], e.height)

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


function orderTimedNodes(timedNodes: TimedNode[]): TimedNode[] {
	const originalNodes: TimedNode[] = [...timedNodes]
	const orderedNodes: TimedNode[] = []

	function nextTimedNode(nodes: TimedNode[], oNodes: TimedNode[], row = 0) {
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

function findNextNonOverlappingTimedNode(timedNodes: TimedNode[], sinceDate: number): [number, number, number] {
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



