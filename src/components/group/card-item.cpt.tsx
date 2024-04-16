import { useState } from "react"
import { I_CardItem, I_Rect, I_Vector2 } from "../../types/types"
import { getStylePropValue } from "../../util/util"
import TextSvg from "../svg/text.svg"
import { createRect } from "../../types/factory-from-data"

export default function CardItemCpt({
	cardItem
}: {
	cardItem: I_CardItem
}) {

	const [rectangle, setRectangle] = useState<I_Rect>(createRect())
	const [textBBox, setTextBBox] = useState<I_Rect>(createRect())
	const [textPos, setTextPos] = useState<I_Vector2>(createRect())

	const originalLocation = cardItem.cardItemLayout.value

	function handleUpdateBBox(newBBox: I_Rect) {

		let w = cardItem.cardItemLayout.value.width
		if (w == 0)
			w = newBBox.width + 50

		let h = cardItem.cardItemLayout.value.height
		if (h == 0)
			h = newBBox.height

		const r = {
			x: originalLocation.x - w / 2,
			y: originalLocation.y - h / 2,
			width: w,
			height: h
		}

		const t = {
			x: getTextAnchorShift(w),
			y: (r.height / 2 - newBBox.height / 2) - newBBox.y,
		}

		setTextBBox(newBBox)
		setRectangle(r)
		setTextPos(t)

	}

	const getTextAnchorShift = (textWidth: number): number => {
		const textAnchor = getStylePropValue<string>(cardItem.cardItemContent.style, "textAnchor", "middle")
		if (textAnchor === "start")
			return 0
		if (textAnchor === "end")
			return textWidth
		else
			return textWidth / 2
	}

	return (
		<g transform={`translate(${rectangle.x}, ${rectangle.y})`} >
			<g style={{ transformOrigin: `${rectangle.width / 2}px ${rectangle.height / 2}px`, transform: `${getStylePropValue<string>(cardItem.cardItemLayout.style, "transform", "")}` }}>
				<rect className=""
					x={0}
					y={0}
					width={rectangle.width}
					height={rectangle.height}
					style={{ ...cardItem.cardItemLayout.style, transform: "" }}
				/>


				<g transform={`translate(${textPos.x}, ${textPos.y})`} >
					<rect x={textBBox.x}
						y={textBBox.y}
						width={`${textBBox.width}`}
						height={`${textBBox.height}`}
						style={{ transform: "", fill: "#00f0", stroke: "#f0f", strokeWidth: "3", strokeDasharray: "15 10" }}
						fill="#00f0"
					/>
					<TextSvg updateBBox={handleUpdateBBox}
						text={cardItem.cardItemContent.value}
						style={cardItem.cardItemContent.style}
					/>
				</g>
			</g>
		</g>
	)
}
