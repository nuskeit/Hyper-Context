import { NodeType } from "./types"

export function isboard(t: any): boolean {
	return t["nodeType"] == NodeType.BOARD && isNode(t)
}

export function isTimelineNode(t: any): boolean {
	return t["nodeType"] == NodeType.TIMELINE && isNode(t)
}

export function isTimedNode(t: any): boolean {
	return t["nodeType"] == NodeType.TIMED && "start" in t && "end" in t && isNode(t)
}

export function isNode(t: any): boolean {
	const tn=t.nodeLayout.value
	return "key" in t && "nodeType" in t && "x" in tn && "y" in tn && "width" in tn && "height" in tn
}

