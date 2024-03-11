import { I_Node, I_TimedNode, NodeType } from "./types"

export function isBoardNode(t: any): boolean {
	return t["nodeType"] == NodeType.BOARD && isNode(t)
}

export function isTimelineNode(t: any): boolean {
	return t["nodeType"] == NodeType.TIMELINE && isNode(t)
}

export function isTimedNode(t: any): boolean {
	return t["nodeType"] == NodeType.TIMED && "start" in t && "end" in t && isNode(t)
}

export function isNode(t: any): boolean {
	return "key" in t && "nodeType" in t && "x" in t && "y" in t && "width" in t && "height" in t
}

