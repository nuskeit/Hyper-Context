import { generateNewKey } from "../util/util";
import { createTreeNode } from "./factory-from-data";
import { I_TreeNode, NodeType } from "./types";

export function createNodeTemplate(): I_TreeNode {
	const newKey = generateNewKey()
	return createTreeNode({
		key: newKey,
		name: `Name for ${newKey}`,
		nodeType: NodeType.NODE,
		nodeLayout: {
			value: {
				x: 0,
				y: 0,
				width: 600,
				height: 550
			},
			style: {
				rx: 50,
				ry: 50,
				fill: "#0003",
				stroke: "#000",
				strokeWidth: 4,
			}
		},
		card: {
			cardItems: [
				{
					cardItemType: "TEXT",
					cardItemContent: {
						value: "NEW NODE",
						style: {
							fill: "#000",
							fontSize: 100
						}
					},
					cardItemLayout: {
						x: 0,
						y: 0,
						value: {},
						style: {
							rx: 30,
							ry: 30,
										fill: "orange"
						}
					}
				}
			],
			"style": {}
		}
	})

}
