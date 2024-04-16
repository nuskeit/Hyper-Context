import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { I_Rect, I_Style } from "../../types/types";
import { getStylePropValue } from "../../util/util";

export default function TextSvg({
	text,
	style,
	updateBBox
}: {
	text: string,
	style: I_Style,
	updateBBox: Function
}) {

	const rrr = useRef<SVGAElement>(null)

	const [rows, setRows] = useState<any>([])

	useEffect(() => {

		const textRows = text.split("\n")
		const letterHeight = getStylePropValue<number>(style, "fontSize", 10)
		const rowHeight = getStylePropValue<number>(style, "lineHeight", letterHeight) //500

		setRows(textRows.map((e, i) => (<tspan key={i} x="0" dy={i === 0 ? 0 : rowHeight}>{e}</tspan>)))



	}, [text, style])

	useLayoutEffect(() => {
		const f=()=>{
		if (rrr.current !== undefined && rrr.current !== null) {
			const newBBox: I_Rect = rrr.current.getBBox()
			const newBBox2: I_Rect = {
				x: Math.round(newBBox.x),
				y: Math.round(newBBox.y),
				width: Math.round(newBBox.width),
				height: Math.round(newBBox.height)
			}
			updateBBox(newBBox2)
		}
		}
		setTimeout(f,0)
	}, [rows]);

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