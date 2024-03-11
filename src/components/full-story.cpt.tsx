import parse from "html-react-parser";
import { useCallback, useEffect, useState } from "react";
import { lorem } from "../const";
import { TreeNode } from "../types/types";
import "./full-story.scss";
export default function ({ node, onExit }: { node: TreeNode, onExit: Function }) {

	const [content, setContent] = useState<string | JSX.Element | JSX.Element[]>("")

	useEffect(() => {
		const parsedHtml = parse(lorem)
		setContent(parsedHtml)
	}, [])


	const textWithImages = useCallback(() => {
		const loreme = `aaaa bbbb cccc`
		const result = []
		for (const textBlock of node.fullStory?.textBlocks || []) {
			const textLEngth = textBlock.text.length
			const fragments = textBlock.images.length

			var float = 'left' || 'right' || 'none' || 'inline-start' || 'inline-end'
			const parts: (JSX.Element[] | JSX.Element | string)[] = []
			for (let i = 0; i < fragments; i++) {
				const nodeImage = textBlock.images[i]
				const startPos = textLEngth / fragments * i
				const endPos = startPos + textLEngth / fragments
				const textFragment = textBlock.text.substring(startPos, endPos)
				float = floatAuto(nodeImage.float, float)
				const width = nodeImage.width
				const caption = nodeImage.caption != "" ? <figcaption>{nodeImage.caption}</figcaption> : undefined
				const style: any = { display: 'block', float, width: `calc(${width}% - ${width > 90 ? "1" : "0"}rem)` }
				parts.push(
					<figure className="full-story-text-block" style={style} key={"i" + i.toString()}>
						<img src={nodeImage.image} />
						{caption}
					</figure>
				)
				parts.push(parse(textFragment))
			}
			result.push(
				<div key={textBlock.key} style={{ overflow: "hidden", margin: ".3rem", borderBottom: "solid .1rem #0005" }}>
					<div style={{ background: "#0002" }}>{textBlock.title}</div>
					{parts}
				</div>
			)
		}

		return result
	}, [])

	function floatAuto(float: string, prevFloat: string): string {
		var f = prevFloat != "left" ? 'left' : 'right'
		f = float == "auto" ? f : float
		return f
	}


	function findPreviousChar(t: string, char: string, start: number, end: number): number {
		const _start = Math.min(start, end)
		const _end = Math.max(start, end)
		if (t.length > _start) {
			const foundPos = t.lastIndexOf(char, _end)
			if (foundPos > _start)
				return foundPos
		}
		return -1
	}


	return (
		<div className="full-story" onClick={() => { onExit() }}>
			<div className="full-story-border">
				<div className="full-story-body" onClick={e => e.stopPropagation()}>
					<div className="full-story-title">{node.name}</div>
					<div className="full-story-text">
						{/* <img src={node.images[0]} /> */}
						{/* {content} */}
						{textWithImages()}
					</div>
				</div>
			</div>
		</div>
	)
}
