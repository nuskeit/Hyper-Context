import { getImgUrl } from "../custom-hooks/use-images"
import { right } from "../util/text"
import { cssJsonToJs, generateNewKey } from "../util/util"
import { I_TreeNode_dto } from "./data-types"
import { createStyled } from "./factory"
import { Book, CardItemType, EditionType, FullStory, I_Background, I_Board, I_Card, I_CardItem, I_ConnectionOptions, I_Editable, I_Hashtable, I_Layout, I_Margin, I_NodeGroup, I_Nodeoptions, I_Position, I_Positioned, I_Styled, I_Textblock, I_TextblockImage, I_TimedNode, I_Timeline, I_TreeNode, NodeType, SetterDelegate, ViewBox } from "./types"




function getRandomImage() {
	return getImgUrl(`nodes/cartoon${right("000" + (Math.random() * 12).toFixed(0).toString(), 3)}.png`)
}

export function createNode(n: I_TreeNode_dto) {
	// if (n.nodeType === NodeType.BOARD)
	// 	return createboard(n)
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
	if (localStorage.getItem("viewBox") === null)
		localStorage.setItem("viewBox", "-2000,0,4000,5000")
	const vbox = localStorage.getItem("viewBox")?.split(",")
	return {
		viewBox: withDefaultValue(data, "viewBox", vbox),
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

export const createTreeNode = (data?: any): I_TreeNode => {
	let safeData: any = {}
	if (data !== undefined) safeData = data

	if (safeData["nodeLayout"] === undefined)
		safeData["nodeLayout"] = createLayout()
	const styledLayout = createStyledFromData<I_Layout>(safeData["nodeLayout"])
	const newNode: I_TreeNode = {
		key: withDefaultValue(safeData, "key", generateNewKey()),
		name: withDefaultValue(safeData, "name", ""),
		nodeType: withDefaultValue(safeData, "nodeType", NodeType.NODE),
		nodeLayout: styledLayout,
		options: withDefaultValue(safeData, "options", undefined),
		card: withDefaultValue(safeData, "card", {}, createCard),
		childrenGroup: withDefaultValue(safeData, "childrenGroup", {}, createNodeGroup)
	}
	return newNode
}

export const createCard = (data: any): I_Card => {
	if (data === undefined) return { cardItems: [] }
	const newCard: I_Card = {
		cardItems: withDefaultValue(data, "cardItems", "", createCardItems),
		fullStory: withDefaultValue(data, "fullStory", undefined, createStyledFullStory)
	}
	return newCard
}

function createCardItems(data: any[]): I_CardItem[] {
	if (data === undefined) return []
	return data.map(e => createCardItem(e))

}

export const createCardItem = (data?: any): I_CardItem => {
	if (data === undefined)
		return {
			key: generateNewKey(),
			cardItemType: CardItemType.TEXT,
			cardItemContent: createCardItemContent(),
			cardItemLayout: createLayout()
		}
	const newCardItem: I_CardItem = {
		key: withDefaultValue(data, "key", generateNewKey()),
		cardItemType: withDefaultValue(data, "cardItemType", CardItemType.TEXT),
		cardItemContent: withDefaultValue(data, "cardItemContent", createStyled<string>("", {}), createCardItemContent),
		cardItemLayout: withDefaultValue(data, "cardItemLayout", createLayout(undefined), createLayout),
	}
	return newCardItem
}

function createCardItemContent(data?: any) {
	if (data === undefined) return createStyled<string>("", {})
	return {
		value: withDefaultValue(data, "value", ""),
		style: withDefaultValue(data, "style", {}, cssJsonToJs),
	}
}

function createLayout(data?: any): I_Styled<I_Layout> {
	if (data === undefined) return {
		value: {
			x: 0, y: 0, width: 0, height: 0,
			padding: { left: 0, right: 0, top: 0, bottom: 0 },
			margin: { left: 0, right: 0, top: 0, bottom: 0 }
		}, style: {}
	}
	return {
		value: {
			x: withDefaultValue(data.value, "x", "0"),
			y: withDefaultValue(data.value, "y", "0"),
			width: withDefaultValue(data.value, "width", "0"),
			height: withDefaultValue(data.value, "height", "0"),
			padding: withDefaultValue(data.value, "padding", undefined, createMargin),
			margin: withDefaultValue(data.value, "margin", undefined, createMargin)
		},
		style: withDefaultValue(data, "style", {}, cssJsonToJs)
	}
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
		style: Object.hasOwn(data, "style") ? cssJsonToJs(data.style) : {}
	}
}

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
export function withDefaultValue(data: any, field: string, defaultValue: any, factoryFunction: Function | undefined = undefined): any {
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

export function createNodeGroup(data?: any): I_NodeGroup {
	return {
		parent: withDefaultValue(data, "parent", undefined),
		children: withDefaultValue(data, "children", []),
		groupLayout: withDefaultValue(data, "groupLayout", undefined, createLayout)
	}
}

export function createMargin(data?: any): I_Margin {
	if (data === undefined) return { left: 0, right: 0, top: 0, bottom: 0 }
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
	if (data === undefined) throw Error("createStyledFromData - data is undefined")
	//		return { style: {}, value:  }
	return {
		style: withDefaultValue(data, "style", data["style"], cssJsonToJs),
		value: withDefaultValue(data, "value", data["value"], undefined)
	}
}


export function createStyledFullStory(data: any): I_Styled<FullStory> | undefined {
	if (data === undefined) return undefined

	const styled = createStyledFromData<FullStory>(data)

	styled.value.key = withDefaultValue(styled.value, "key", generateNewKey())
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
		key: withDefaultValue(data, "key", generateNewKey()),
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


export function createNodeList(data: I_TreeNode_dto[]): I_Hashtable<I_TreeNode> {
	const result: I_Hashtable<I_TreeNode> = {}

	if (data === undefined)
		return result

	data.forEach(n => {
		result[n.key] = createNode(n)
	})

	return result
}

export function createboard(data: any): I_Board {
	if (data === undefined) {
		return {
			...createTreeNode(undefined),
			viewBox: [0, 0, 0, 0] as [number, number, number, number],
			nodeType: NodeType.BOARD,
			nodes: {} as I_Hashtable<I_TreeNode>
		}
	}

	return {
		...createTreeNode(data),
		viewBox: withDefaultValue(data, "viewBox", [0, 0, 0, 0]),
		nodeType: NodeType.BOARD,
		nodes: withDefaultValue(data, "nodes", {}, createNodeList)
	}
}

export function createBook(data?: any): Book {
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
		board: withDefaultValue(data, "board", createboard(data), createboard)
	}
	return res
}

// Tighter typed

export function createEditableNode<T extends I_TreeNode>(node: T, editionType: EditionType, setterDelegate?: SetterDelegate<T>): I_Editable<T> {
	const cb: SetterDelegate<T> = setterDelegate !== undefined ? setterDelegate : (o: T): void => { }
	return createEditable<T>(node, editionType, cb)
}

export function createEditable<T>(target: T, editionType: EditionType, setterDelegate?: SetterDelegate<T>): I_Editable<T> {
	const cb: SetterDelegate<T> = setterDelegate !== undefined ? setterDelegate : (o: T): void => { }
	return {
		target,
		editionType,
		setterDelegate: cb
	}
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

export function createRect(data?: {}) {
	if (data === undefined)
		return { x: 0, y: 0, width: 0, height: 0 }
	else
		return {
			x: withDefaultValue(data, "x", 0),
			y: withDefaultValue(data, "y", 0),
			width: withDefaultValue(data, "width", 100),
			height: withDefaultValue(data, "height", 100)
		}
}