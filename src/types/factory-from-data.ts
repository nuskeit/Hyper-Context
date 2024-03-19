import { getImgUrl } from "../custom-hooks/use-images"
import { right } from "../util/text"
import { Book, Editable, EditionType, FullStory, I_Background, I_BoardNode, I_Card, I_ConnectionOptions, I_Hashtable, I_Margin, I_NodeGroup, I_Nodeoptions, I_Position, I_Positioned, I_Styled, I_Textblock, I_TextblockImage, I_TimedNode, I_Timeline, I_TreeNode, NodeType, ViewBox } from "./types"


function generateRandomKey() {
	return Math.random() * new Date().getTime()
}


function getRandomImage() {
	return getImgUrl(`nodes/cartoon${right("000" + (Math.random() * 12).toFixed(0).toString(), 3)}.png`)
}

export function createNode(n: I_TreeNode) {
	// if (n.nodeType === NodeType.BOARD)
	// 	return createBoardNode(n)
	if (n.nodeType === NodeType.TIMELINE)
		return createTimelineNode(n)
	if (n.nodeType === NodeType.TIMED)
		return createTimedNode(n)
	if (n.nodeType === NodeType.NODE)
		return createTreeNode(n)
	else {
		return createTreeNode(n)
	}
}


export function createWindowServices(data?: { viewBox: ViewBox, zoomLevel?: number, scrollPos?: number }) {
	return {
		viewBox: withDefaultValue(data, "viewBox", [-1500, 0, 3000, 5000]),
		zoomLevel: withDefaultValue(data, "zoomLevel", 1),
		scrollPos: withDefaultValue(data, "scrollPos", 0),
	}
}

export function createTimedNode(data: any): I_TimedNode {
	return {
		...createTreeNode(data),
		nodeType: NodeType.TIMED,
		start: withDefaultValue(data, "start", 0),
		end: withDefaultValue(data, "end", 0),
		row: withDefaultValue(data, "row", 1),
	} as I_TimedNode
}

export const createTreeNode = (data: any): I_TreeNode => {
	const newChild: I_TreeNode = {
		key: withDefaultValue(data, "key", generateRandomKey()),
		x: withDefaultValue(data, "x", 0),
		y: withDefaultValue(data, "y", 0),
		width: withDefaultValue(data, "width", 200),
		height: withDefaultValue(data, "height", 200),
		nodeType: withDefaultValue(data, "nodeType", NodeType.NODE),
		options: withDefaultValue(data, "options", undefined),
		group: withDefaultValue(data, "group", undefined, createNodeGroup),
		card: withDefaultValue(data, "card", {}, createCard)
	}
	return newChild
}

export const createCard = (data: any): I_Card => {
	const newCard: I_Card = {
		name: withDefaultValue(data, "name", ""),
		title: withDefaultValue(data, "title", ""),
		background: withDefaultValue(data, "background", undefined, createBackground),
		shortText: withDefaultValue(data, "shortText", ""),
		fullStory: withDefaultValue(data, "fullStory", undefined, createStyledFullStory),
		thumbnail: withDefaultValue(data, "thumbnail", "")
	}
	return newCard
}

function createBackground(data: any): I_Styled<I_Background> | undefined {
	if (data === undefined ||
		data["value"] === undefined ||
		data["style"] === undefined) return undefined
	return {
		value: {
			image: withDefaultValue(data["value"], "image", undefined),
			video: withDefaultValue(data["value"], "video", undefined),
			play: withDefaultValue(data["value"], "play", false)
		},
		style: Object.hasOwn(data, "style") ? data.style : {}
	}
}

// export const createCard = (data: any): I_Card => {
// 	const fullStory = data === undefined ? undefined : createFullStory(withDefaultValue(data, "fullStory", undefined))
// 	let styledFullStory: I_Styled<FullStory> | undefined
// 	if (fullStory != undefined)
// 		styledFullStory = createStyled<FullStory>(fullStory)

// 		console.log('styledFullStory',data);

// 		const newCard: I_Card = {
// 		name: withDefaultValue(data, "name", ""),
// 		title: withDefaultValue(data, "title", ""),
// 		shortText: withDefaultValue(data, "shortText", ""),
// 		fullStory: styledFullStory,
// 		thumbnail: withDefaultValue(data, "thumbnail", "")
// 	}
// 	return newCard
// }

export function createTimelineNode(data: any): I_Timeline {
	const treeNode = createTreeNode(data)
	return {
		...treeNode,
		start: withDefaultValue(data, "start", 0),
		end: withDefaultValue(data, "end", 100),
		nodeType: NodeType.TIMELINE
	}
}


/**
 * factoryFunction must include a case for undefined as parameter. 
 * If included, this function is the ultimate decisor to establish 
 * a default value for the entire object.
 */
function withDefaultValue(data: any, field: string, defaultValue: any, factoryFunction: Function | undefined = undefined): any {
	if (data !== undefined && typeof data === "object" && field in data) {
		if (factoryFunction != undefined) {
			return factoryFunction(data[field])
		} else {
			return data[field]
		}
	} else if (factoryFunction != undefined) {
		return factoryFunction(undefined)
	}
	return defaultValue
}

function isMandatoryValue(data: any, field: string, func: Function | undefined = undefined): any {
	if (data !== undefined && typeof data === "object" && field in data) {
		if (func != undefined) {
			return func(data[field])
		} else {
			return data[field]
		}
	}
	throw new Error(`Mandatory Value Exception. The field "${field}" is missing.`)
}

export function createNodeGroup(data: any): I_NodeGroup {
	return {
		parent: withDefaultValue(data, "parent", undefined),
		children: withDefaultValue(data, "children", []),
		x: withDefaultValue(data, "x", 0),
		y: withDefaultValue(data, "y", 0),
		width: withDefaultValue(data, "width", 0),
		height: withDefaultValue(data, "height", 0),
		margin: withDefaultValue(data, "margin", createMargin({}), createMargin)
	}
}

export function createMargin(data: any): I_Margin {
	return {
		left: withDefaultValue(data, "left", 0),
		right: withDefaultValue(data, "right", 0),
		top: withDefaultValue(data, "top", 0),
		bottom: withDefaultValue(data, "bottom", 0),
	}
}

export function createoptions(data: any): I_Nodeoptions {
	return data
}

export function createConnection(data: any): I_ConnectionOptions {
	return {
		offsetStart: withDefaultValue(data, "offsetStart", undefined),
		offsetEnd: withDefaultValue(data, "offsetEnd", undefined),
		curveDistributionCoeficient: withDefaultValue(data, "curveDistributionCoeficient", undefined),
		fixedStart: withDefaultValue(data, "fixedStart", undefined),
		fixedEnd: withDefaultValue(data, "fixedEnd", undefined),
		connectionShape: withDefaultValue(data, "connectionShape", undefined)
		}
}


export function createStyledFromData<T extends object>(data: any): I_Styled<T> {
	return {
		style: Object.hasOwn(data, "style") ? data["style"] : {},
		value: Object.hasOwn(data, "value") ? data["value"] : data
	}
}


export function createStyledFullStory(data: any): I_Styled<FullStory> | undefined {
	if (data === undefined) return undefined

	const styled = createStyledFromData<FullStory>(data)

	styled.value.key = withDefaultValue(styled.value, "key", generateRandomKey())
	styled.value.textBlocks = withDefaultValue(styled.value, "textBlocks", [], createTextblocks)

	return styled

}

export function createTextblocks(data: any[]): I_Textblock[] | undefined {
	if (data === undefined)
		return undefined

	return data.map((e: any) => createTextblock(e))
}


export function createTextblock(data: any): I_Textblock {
	return {
		key: withDefaultValue(data, "key", generateRandomKey()),
		images: withDefaultValue(data, "images", []).map((e: any) => createTextblockImage(e)),
		title: withDefaultValue(data, "title", ""),
		text: withDefaultValue(data, "text", ""),
	}
}

export function createTextblockImage(data: any): I_TextblockImage {
	return {
		image: withDefaultValue(data, "image", ""),
		width: withDefaultValue(data, "width", 20),
		float: withDefaultValue(data, "float", "auto"),
		caption: withDefaultValue(data, "caption", ""),
	}
}


export function createNodeList(data: I_TreeNode[]): I_Hashtable<I_TreeNode> {
	const result: I_Hashtable<I_TreeNode> = {}

	if (data === undefined)
		return result

	data.forEach(n => {
		result[n.key] = createNode(n)
	})

	return result
}

export function createBoardNode(data: any): I_BoardNode {
	return {
		...createTreeNode(data),
		viewBox: withDefaultValue(data, "viewBox", [0, 0, 0, 0]),
		nodeType: NodeType.BOARD,
		nodes: withDefaultValue(data, "nodes", {}, createNodeList)
	}
}

export function createBook(data: any): Book {
	const defaultOptions = {
		group: {
			spacingY: 200,
		},
		node: {
			spacingX: 200,
		},
		connection: {
			offsetStart: 50,
			offsetEnd: 50,
			curveDistributionCoeficient: .5,
			fixedStart: 0
		}
	}
	const res = {
		options: withDefaultValue(data, "options", defaultOptions),
		boardNode: withDefaultValue(data, "boardNode", createBoardNode({}), createBoardNode)
		//  const res = {
		// 	options: {
		// 		group: {
		// 			spacingY: 200,
		// 		},
		// 		node: {
		// 			spacingX: 200,
		// 			connection: {
		// 				offsetStart: 50,
		// 				offsetEnd: 50,
		// 				curveDistributionCoeficient: .5,
		// 				fixedStart: 0
		// 			}
		// 		}
		// 	},
		// 	boardNode: withDefaultValue(data, "boardNode", createBoardNode({}), createBoardNode)
	}
	return res
}

// Tighter typed

export function createEditableNode<T extends I_TreeNode>(node: T, editionType: EditionType): Editable<T> {
	return new Editable<T>(node, editionType)
}



// General Purpose

export function createPosition(data?: any): I_Position {
	return {
		x: withDefaultValue(data, "x", 0),
		y: withDefaultValue(data, "y", 0),
		width: withDefaultValue(data, "width", 100),
		height: withDefaultValue(data, "height", 100),
		margin: withDefaultValue(data, "margin", { left: 0, right: 0, top: 0, bottom: 0 }, createMargin)
	}

}

export function createPositionedElement<T>(element: T, data?: any): I_Positioned<T> {
	return {
		element,
		x: withDefaultValue(data, "x", 0),
		y: withDefaultValue(data, "y", 0),
		width: withDefaultValue(data, "width", 100),
		height: withDefaultValue(data, "height", 100),
		margin: withDefaultValue(data, "margin", { left: 0, right: 0, top: 0, bottom: 0 }, createMargin)
	}
}
