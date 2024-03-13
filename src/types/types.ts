
export interface I_Hashtable<T> {
	[key: string]: T
}

export interface I_Position {
	x: number
	y: number
	width: number
	height: number
	margin: I_Margin
}

export interface I_Positioned<T> extends I_Position {
	element: T
}


export type NodeKey = string

export interface I_Identity {
	key: string
}

export type Book = {
	boardNode: BoardNode,
	options: I_Options
}

export class TreeNode implements I_Node, I_NodeData {
	readonly key: string
	name: string = ""
	nodeType: NodeType = NodeType.NODE
	title: string = ""
	shortText: string = ""
	fullStory?: FullStory
	thumbnail: string = ""
	width: number = 100
	height: number = 100
	x: number = 0
	y: number = 0
	group: I_NodeGroup | undefined
	options?: I_Nodeoptions = {
		spacingX: 0,
		connection: {
			offsetStart: 0,
			offsetEnd: 0,
			curveDistributionCoeficient: .5,
			fixedStart: 0
		}
	}

	constructor(key: string) {
		this.key = key
	}
}

export class BoardNode extends TreeNode implements I_Node {
	viewBox: [number, number, number, number] = [0, 0, 0, 0]
	nodes: I_Hashtable<I_Node> = {}
	nodeType: NodeType = NodeType.BOARD

	constructor(key: string) {
		super(key)
	}
}

export interface I_Relationship {
	source: NodeKey
	target: NodeKey[]
}

export interface I_NodeGroup extends I_Vector2, I_Size2 {
	parent: NodeKey
	children: Array<NodeKey>
	margin: I_Margin
}

export interface I_Margin {
	left: number
	right: number
	top: number
	bottom: number
}

export interface I_Node extends I_Identity {
	nodeType: NodeType
	width: number
	height: number
	x: number
	y: number
	group: I_NodeGroup | undefined
	options?: I_Nodeoptions | undefined
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
}

export interface I_NodeData {
	name: string
	shortText: string
	fullStory?: FullStory
	thumbnail: string
}

export interface I_TimedNode extends I_Node {
	start: number
	end: number
	row: number
}

export class TimedNode implements I_TimedNode, I_NodeData {
	readonly key: string
	name: string = ""
	nodeType: NodeType = NodeType.TIMED
	title: string = ""
	shortText: string = ""
	fullStory?: FullStory
	thumbnail: string = ""
	width: number = 100
	height: number = 100 //REVISAR SI POSICION Y TAMAÑO DEBEN MOVERSE!
	row: number = 1
	x: number = 0
	y: number = 0
	start: number = 0
	end: number = 0
	group: I_NodeGroup | undefined
	options?: I_Nodeoptions = {
		spacingX: 0,
		connection: {
			offsetStart: 0,
			offsetEnd: 0,
			curveDistributionCoeficient: .5,
			fixedStart: 0
		}
	}
	constructor(key: string) {
		this.key = key
	}
}


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


export class Timeline implements I_Node, I_NodeData {
	key: string
	nodeType: NodeType = NodeType.TIMELINE
	start: number = 0
	end: number = 0
	width: number = 100
	height: number = 100
	x: number = 0
	y: number = 0

	name: string = ""
	shortText: string = ""
	fullStory?: FullStory
	thumbnail: string = ""

	group: I_NodeGroup | undefined

	options?: I_Nodeoptions = {
		spacingX: 0,
		connection: {
			offsetStart: 0,
			offsetEnd: 0,
			curveDistributionCoeficient: .5,
			fixedStart: 0
		}
	}

	constructor(key: string) {
		this.key = key
	}

}

export class FullStory {
	key: string = ""
	textBlocks: I_Textblock[] | null = null
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

export class nodeStyle {
	title: { fontFamily: string, fontSize: string } = { fontFamily: "", fontSize: "" }
	shortText: { fontFamily: string, fontSize: string } = { fontFamily: "", fontSize: "" }

	shape: {
		rx: string
		ry: string
		backgroundColor: string
	} = {
			rx: "",
			ry: "",
			backgroundColor: "",
		}
}


export interface I_Vector2 {
	x: number
	y: number
}

export interface I_Size2 {
	width: number
	height: number
}

export const SystemMode = {
	DEFAULT: "DEFAULT",
	EDIT: "EDIT"
} as const
export type SystemMode = typeof SystemMode[keyof typeof SystemMode]


export const EditionType = {
	ADD: "ADD",
	UPDATE: "UPDATE",
	DELETE: "DELETE"
} as const
export type EditionType = typeof EditionType[keyof typeof EditionType]

export class Editable<T> {
	editionType: EditionType
	target: T
	constructor(target: T, editionType: EditionType) {
		this.target = target
		this.editionType = editionType
	}
}