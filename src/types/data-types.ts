import { FullStory, I_Board, I_Card, I_CardItem, I_Hashtable, I_Identity, I_Layout, I_NodeGroup, I_Nodeoptions, I_Options, I_Relationship, I_Styled, I_Textblock, I_TextblockImage, I_TimedNode, I_Timeline, I_TreeNode, NodeKey, NodeType, ViewBox } from "./types"

export interface I_Book_dto {
	board: I_Board_dto,
	options: I_Options_dto
}


export interface I_TreeNode_dto extends I_TreeNode {}


export interface I_Background {
	"image": string,
	"video": string
	"play": boolean
}


export interface I_Board_dto extends I_Board { }

export interface I_Relationship_dto extends I_Relationship { }

export interface I_NodeGroup_dto extends I_NodeGroup { }

export interface I_Options_dto extends I_Options { }

// CARDS

export interface I_CardItem_dto extends I_CardItem { }

export interface I_Card_dto extends I_Card { }
