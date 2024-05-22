// import { Component, createRef, useEffect, useLayoutEffect } from "react";
// import { I_Rect, I_Style } from "../../types/types";
// import { getStylePropValue } from "../../util/util";

// export class TextSvg extends Component {

// 	constructor(props: {
// 		text: string,
// 		style: I_Style,
// 		updateBBox: Function
// 	}) {
// 		super(props)
// 		const {
// 			text,
// 			style,
// 			updateBBox
// 		} = props

// 		this.state = {
// 			isLoading: true,
// 			rows: []
// 		}

		
		
// 	}
	
// 	private rrr = createRef()


// 	render() {

// 		useEffect(() => {

// 			const textRows = text.split("\n")
// 			const letterHeight = getStylePropValue<number>(style, "fontSize", 10)
// 			const rowHeight = getStylePropValue<number>(style, "lineHeight", letterHeight, [""]) //500

// 			// setRows(textRows.map((e, i) => (<tspan key={i} x="0" dy={i === 0 ? 0 : rowHeight}>{e}&nbsp;</tspan>)))
// 			setRows(textRows.map((e, i) => (<tspan key={i} x="0" dy={i === 0 ? 0 : rowHeight}>&#8239;{e}&#8239;</tspan>)))
// 			// setRows(textRows.map((e, i) => (<tspan key={i} x="0" dy={i === 0 ? 0 : rowHeight}>{e}&#8288;</tspan>)))


// 		}, [text, style])

// 		// useLayoutEffect(() => {
// 		// 	const f = () => {
// 		// 		if (rrr.current !== undefined && rrr.current !== null) {
// 		// 			const newBBox: I_Rect = rrr.current.getBBox()
// 		// 			const newBBox2: I_Rect = {
// 		// 				x: Math.round(newBBox.x),
// 		// 				y: Math.round(newBBox.y),
// 		// 				width: Math.round(newBBox.width),
// 		// 				height: Math.round(newBBox.height)
// 		// 			}
// 		// 			updateBBox(newBBox2)
// 		// 		}
// 		// 	}
// 		// 	//setTimeout(f, 500)
// 		// 	setIsLoading(false)
// 		// }, [rows]);
// 		const f = () => {
// 			if (rrr.current !== undefined && rrr.current !== null) {
// 				const newBBox: I_Rect = rrr.current.getBBox()
// 				const newBBox2: I_Rect = {
// 					x: Math.round(newBBox.x),
// 					y: Math.round(newBBox.y),
// 					width: Math.round(newBBox.width),
// 					height: Math.round(newBBox.height)
// 				}
// 				return newBBox2
// 			}
// 		}

// 		useLayoutEffect(() => {
// 			setTimeout(() => updateBBox(f()), 50)
// 			// return ()=>updateBBox(f())
// 		}, [rows])


// 		// if (isLoading) return <></>
// 		return (
// 			<text x="0" y="0"
// 				style={{ textAnchor: "middle", ...style, transform: "" }}
// 				//@ts-ignore
// 				ref={rrr}
// 				baselineShift={0}
// 				dominantBaseline={"text-bottom | alphabetic | ideographic | middle | central | mathematical | hanging | text-top".split(" | ")[6]}
// 			// dominantBaseline="hanging"
// 			>
// 				{rows}
// 			</text>
// 		)
// 	}
// }
