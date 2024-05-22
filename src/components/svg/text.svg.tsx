import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { I_Rect, I_Style } from "../../types/types";
import { getStylePropValue } from "../../util/util";
import { createRect } from "../../types/factory-from-data";

export default function TextSvg({
	text,
	style,
	updateBBox
}: {
	text: string,
	style: I_Style,
	updateBBox: any //(newBBox: I_Rect) => void
}) {
	const [isLoading, setIsLoading] = useState(true)
	const rrr = useRef<SVGAElement>(null)

	const [rows, setRows] = useState<any>([])

	useEffect(() => {

		const textRows = text.split("\n")
		const letterHeight = getStylePropValue<number>(style, "fontSize", 10)
		const rowHeight = getStylePropValue<number>(style, "lineHeight", letterHeight, [""]) //500

		// setRows(textRows.map((e, i) => (<tspan key={i} x="0" dy={i === 0 ? 0 : rowHeight}>{e}&nbsp;</tspan>)))
		setRows(textRows.map((e, i) => (<tspan key={i} x="0" dy={i === 0 ? 0 : rowHeight}>&#8239;{e}&#8239;</tspan>)))
		// setRows(textRows.map((e, i) => (<tspan key={i} x="0" dy={i === 0 ? 0 : rowHeight}>{e}&#8288;</tspan>)))


	}, [text, style])

	// useLayoutEffect(() => {
	// 	const f = () => {
	// 		if (rrr.current !== undefined && rrr.current !== null) {
	// 			const newBBox: I_Rect = rrr.current.getBBox()
	// 			const newBBox2: I_Rect = {
	// 				x: Math.round(newBBox.x),
	// 				y: Math.round(newBBox.y),
	// 				width: Math.round(newBBox.width),
	// 				height: Math.round(newBBox.height)
	// 			}
	// 			updateBBox(newBBox2)
	// 		}
	// 	}
	// 	//setTimeout(f, 500)
	// 	setIsLoading(false)
	// }, [rows]);
	const f = (): I_Rect => {
		if (rrr.current !== undefined && rrr.current !== null) {
			const newBBox: I_Rect = rrr.current.getBBox()
			const newBBox2: I_Rect = {
				x: Math.round(newBBox.x),
				y: Math.round(newBBox.y),
				width: Math.round(newBBox.width),
				height: Math.round(newBBox.height)
			}
			return newBBox2
		}
		return createRect()
	}

	useLayoutEffect(() => {
		setTimeout(() => updateBBox(f()), 50)
		// return ()=>updateBBox(f())
	}, [rows])


	// if (isLoading) return <></>
	return (
		<text x="0" y="0"
			style={{ textAnchor: "middle", ...style, transform: "" }}
			//@ts-ignore
			ref={rrr}
			baselineShift={0}
			dominantBaseline={"text-bottom | alphabetic | ideographic | middle | central | mathematical | hanging | text-top".split(" | ")[6]}
		// dominantBaseline="hanging"
		>
			{rows}
		</text>
	)
}
