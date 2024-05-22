/* Generic */
export interface I_Hashtable<T> {
	[key: string]: T
}

export interface I_Position extends I_Vector2, I_Size2 {
	margin: I_Margin
}

export interface I_Positioned<T> extends I_Position {
	element: T
}

/*export class Style {
	styleOrDefault(styleJSName: string, defaultValue: string = ""): string {
		if (Object.hasOwn(this, styleJSName))
			// @ts-ignore
			return this[styleJSName]
		return defaultValue
	}
}
*/

export interface I_Style { }

export interface I_Styled<T> {
	value: T
	style: I_Hashtable<string>
}

export type ViewBox = [number, number, number, number]

export class WindowServices {
	viewBox: ViewBox
	zoomLevel: number
	scrollPos: number

	constructor(viewBox: ViewBox, zoomLevel = 0, scrollPos = 0) {
		this.viewBox = viewBox
		this.zoomLevel = zoomLevel
		this.scrollPos = scrollPos
	}
}

export type NodeKey = string


export interface I_Identity {
	key: string
}



/* Entities */

export type Book = {
	board: I_Board,
	options: I_Options
}

export interface I_TreeNode extends I_Identity {
	nodeType: NodeType
	name: string
	nodeLayout: I_Styled<I_Layout>
	options?: I_Nodeoptions | undefined
	card: I_Card
	childrenGroup: I_NodeGroup
}


export interface I_Background {
	"image": string,
	"video": string
	"play": boolean
}


export interface I_Board extends I_TreeNode {
	viewBox: [number, number, number, number]
	nodes: I_Hashtable<I_TreeNode>
	nodeType: NodeType
}

export interface I_Relationship {
	source: NodeKey
	target: NodeKey[]
}

export interface I_NodeGroup {
	parent: NodeKey
	children: Array<NodeKey>
	groupLayout: I_Styled<I_Layout>
}

export interface I_Margin {
	left: number
	right: number
	top: number
	bottom: number
}

export interface I_Options {
	group: I_GroupOptions
	node: I_Nodeoptions
	connection: I_ConnectionOptions
}


export interface I_GroupOptions {
	spacingY: number
}

export interface I_Nodeoptions {
	spacingX: number
	connection: I_ConnectionOptions
}

export interface I_ConnectionOptions {
	offsetStart: any
	offsetEnd: any
	curveDistributionCoeficient: number
	fixedStart: number
	fixedEnd: number
	connectionShape: number
}

export interface I_TimedNode extends I_TreeNode {
	start: number
	end: number
	row: number
}

// export class TimedNode implements I_TimedNode, I_Card {
// 	readonly key: string
// 	name: string = ""
// 	nodeType: NodeType = NodeType.TIMED
// 	title: string = ""
// 	shortText: string = ""
// 	fullStory?: FullStory
// 	thumbnail: string = ""
// 	width: number = 100
// 	height: number = 100 //REVISAR SI POSICION Y TAMAÑO DEBEN MOVERSE!
// 	row: number = 1
// 	x: number = 0
// 	y: number = 0
// 	start: number = 0
// 	end: number = 0
// 	group: I_NodeGroup | undefined
// 	options?: I_Nodeoptions = {
// 		spacingX: 0,
// 		connection: {
// 			offsetStart: 0,
// 			offsetEnd: 0,
// 			curveDistributionCoeficient: .5,
// 			fixedStart: 0
// 		}
// 	}
// 	constructor(key: string) {
// 		this.key = key
// 	}
// }


export const config = {
	offsetX: 100,
	offsetY: 100
}

export const NodeType = {
	BOARD: 'BOARD',
	NODE: 'NODE',
	FULL_STORY: 'FULL_STORY',
	TIMELINE: 'TIMELINE',
	TIMED: 'TIMED'
} as const
export type NodeType = typeof NodeType[keyof typeof NodeType]


export interface I_Timeline extends I_TreeNode {
	start: number
	end: number
}

export class FullStory {
	key: string = ""
	textBlocks: I_Textblock[] = []
}


export interface I_Textblock {
	key: string
	images: I_TextblockImage[]
	title: string
	text: string
}

export interface I_TextblockImage {
	image: string
	width: number
	float: string
	caption: string
}



// STYLES

// export class nodeStyle {
// 	title: { fontFamily: string, fontSize: string } = { fontFamily: "", fontSize: "" }
// 	shortText: { fontFamily: string, fontSize: string } = { fontFamily: "", fontSize: "" }

// 	shape: {
// 		rx: string
// 		ry: string
// 		backgroundColor: string
// 	} = {
// 			rx: "",
// 			ry: "",
// 			backgroundColor: "",
// 		}
// }

export interface I_Vector2 {
	x: number
	y: number
}

export interface I_Size2 {
	width: number
	height: number
}

export interface I_Rect extends I_Vector2, I_Size2 { }

export const SystemMode = {
	DEFAULT: "DEFAULT",
	EDIT: "EDIT"
} as const
export type SystemMode = typeof SystemMode[keyof typeof SystemMode]


export const EditionType = {
	CREATE_NODE: "CREATE_NODE",
	MODIFY_NODE: "MODIFY_NODE",
	MODIFY_NODE_STYLE: "MODIFY_NODE_STYLE",
	MODIFY_FULL_STORY: "MODIFY_FULL_STORY",
	DELETE_NODE: "DELETE_NODE",
	MODIFY_STYLE: "MODIFY_STYLE",
	NEW: "NEW",
	MODIFY: "MODIFY",
	DELETE: "DELETE",
} as const
export type EditionType = typeof EditionType[keyof typeof EditionType]

// export class Editable<T> {
// 	editionType: EditionType
// 	target: T
// 	constructor(target: T, editionType: EditionType) {
// 		this.target = target
// 		this.editionType = editionType
// 	}
// }

export interface I_Editable<T> {
	editionType: EditionType
	target: T
	setterDelegate: SetterDelegate<T>
}

export type SetterDelegate<T> = (o: T) => void



// CARDS
export const CardItemType = {
	TEXT: "TEXT",
	IMAGE: "IMAGE"
} as const
export type CardItemType = typeof CardItemType[keyof typeof CardItemType]

export interface I_Layout extends I_Vector2, I_Size2 {
	padding: I_Margin
	margin: I_Margin
}

export interface I_CardItem {
	key: string
	cardItemType: CardItemType
	cardItemContent: I_Styled<any>
	cardItemLayout: I_Styled<I_Layout>
}

export interface I_Card {
	cardItems: I_CardItem[]
	fullStory?: I_Styled<FullStory>
}
