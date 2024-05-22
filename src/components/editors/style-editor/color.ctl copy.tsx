// import { ReactComponentElement, useEffect, useMemo, useRef, useState } from "react"
// import "./color.ctl.scss"
// import { left } from "../../../util/text"
// export function ColorCtl_OLD({
// 	value,
// 	setValue
// }: {
// 	value: any,
// 	setValue: (e: any) => {}
// }) {
// 	const [expand, setExpand] = useState<boolean>(false)
// 	const [localColor, setLocalColor] = useState<string>(value)
// 	const [localOpacity, setLocalOpacity] = useState<string>("ff")
// 	// const [mouseDown, setMouseDown] = useState<boolean>(false)

// 	useEffect(() => {
// 		let val = localColor
// 		if (localColor.length !== 4)
// 			val = localColor.padEnd(7, "0")
// 		setValue(val + localOpacity);
// 	}, [localColor, localOpacity]);


// 	const changeColorHandler = (e: any) => {
// 		if (localColor.length < 7 || e.nativeEvent.data === null)
// 			if ((e.nativeEvent.data === null
// 				|| "0123456789abcdef".indexOf(e.nativeEvent.data.toLowerCase()) >= 0)
// 				&& "#" === left(e.target.value, 1)
// 			) {
// 				let val = e.target.value
// 				setLocalColor(val)
// 			}
// 	}

// 	const changeOpacityTextHandler = (e: any) => {
// 		changeOpacity(e.target.value, e.nativeEvent.data)
// 	}

// 	const changeOpacityRangeHandler = (e: any) => {
// 		let val = Number(e.target.value).toString(16).padStart(2, "0")
// 		changeOpacity(val, null)
// 	}

// 	const changeOpacity = (value: string, data: string | null) => {
// 		if (localOpacity.length < 2 || data === null)
// 			if (data === null || "0123456789abcdef".indexOf(data.toLowerCase()) >= 0) {
// 				setLocalOpacity(value)
// 			}
// 	}


// 	let mouseDown = useRef(false)
// 	const mouseDownHandler = (color: string) => {
// 		console.log('click MOOO DOWN');
// 		// setMouseDown(true)
// 		mouseDown.current = true
// 		setLocalColor(color);
// 	}

// 	const mouseUpHandler = (e: Event) => {
// 		e.stopPropagation()
// 		console.log('MOOOO UPP');
// 		// setMouseDown(false)
// 		mouseDown.current = false
// 	}

// 	const mouseMoveHandler = (e: Event) => {
// 		e.stopPropagation()
// 		if (mouseDown.current)
// 			console.log('MOUSE DOWN', mouseDown.current)
// 		else
// 			console.log('MOUSE UP', mouseDown.current)
// 	}


// 	// const changeOpacityHandler = (val: number) => {
// 	// 	setLocalOpacity(val)
// 	// 	const valHex=Number(val).toString(16)
// 	// 	console.log('val', val, valHex);
// 	// 	if (localColor.length === 4)
// 	// 		setValue(localColor + valHex)
// 	// 	else if (localColor.length > 4 && localColor.length < 6)
// 	// 		setValue(left(localColor, 4) + valHex)
// 	// 	else
// 	// 		setValue(left(localColor, 7) + valHex)
// 	// }

// 	const colorBitTemplate = (c: string, key: string | number) => {
// 		return <div key={key} title={c} className="color-box"
// 			onMouseDown={() => mouseDownHandler(c)}
// 			onMouseUp={mouseUpHandler}
// 			onMouseEnter={mouseMoveHandler}
// 			style={{ backgroundColor: c }}>&#x200B;</div>
// 	}

// 	const rowTemplate = (row: any, key: string | number) => {
// 		return <div key={key} className="palette-row"
// 			onMouseLeave={mouseUpHandler}>{row}</div>
// 	}

// 	const colorStrip = useMemo(() => {
// 		const palette: any[] = []
// 		let paleteSize = { width: 18, height: 1 }
// 		for (let j = 0; j < paleteSize.height; ++j) {
// 			const row: any[] = []
// 			for (let i = 0; i < paleteSize.width; ++i) {
// 				const r = getSignal(i + paleteSize.width / 3, j, paleteSize.width, paleteSize.height).toString(16)
// 				const g = getSignal(i, j, paleteSize.width, paleteSize.height).toString(16)
// 				const b = getSignal(i + paleteSize.width / 1.5, j, paleteSize.width, paleteSize.height).toString(16)

// 				const color = `#${pad(r)}${pad(g)}${pad(b)}`

// 				row.push(colorBitTemplate(color, i))
// 			}

// 			// Grayscale
// 			const color = ["#ffffff", "#000000"]
// 			color.forEach((c, i) => {
// 				row.push(colorBitTemplate(c, -(i + 1)))
// 			})

// 			palette.push(rowTemplate(row, j))
// 		}

// 		return (
// 			<div className="color-strip">
// 				{palette}
// 			</div>
// 		)
// 	}, [])

// 	const colorSelector = useMemo(() => {
// 		const palette: any[] = []
// 		let paleteSize = { width: 18, height: 19 }
// 		for (let j = 0; j < paleteSize.height; ++j) {
// 			const row: any[] = []
// 			for (let i = 0; i < paleteSize.width; ++i) {
// 				const r = getSignal(i + paleteSize.width / 3, j, paleteSize.width, paleteSize.height).toString(16)
// 				const g = getSignal(i, j, paleteSize.width, paleteSize.height).toString(16)
// 				const b = getSignal(i + paleteSize.width / 1.5, j, paleteSize.width, paleteSize.height).toString(16)

// 				const color = `#${pad(r)}${pad(g)}${pad(b)}`

// 				row.push(colorBitTemplate(color, i + 1))
// 			}

// 			// Grayscale
// 			const r = getSignal(0, j - 1, 1, (paleteSize.height - 1) * 2).toString(16)
// 			const g = getSignal(0, j - 1, 1, (paleteSize.height - 1) * 2).toString(16)
// 			const b = getSignal(0, j - 1, 1, (paleteSize.height - 1) * 2).toString(16)

// 			const color = `#${pad(r)}${pad(g)}${pad(b)}`

// 			row.push(colorBitTemplate(color, -(j + 1)))

// 			palette.push(rowTemplate(row, j + 1))
// 			//palette.push(<div key={j} className="palette-row" onMouseLeave={mouseUpHandler}>{row}</div>)
// 		}

// 		return (
// 			<div className="palette">
// 				{palette}
// 			</div>
// 		)
// 	}, [])

// 	function getSignal(
// 		// v1.4
// 		posH: number,
// 		posV: number,
// 		numberOfHorizontalDivisions: number,
// 		numberOfVerticalDivisions: number): number {

// 		// if (numberOfVerticalDivisions < 2) throw Error("numberOfVerticalDivisions cannot be less than 2");

// 		const aHalf = numberOfHorizontalDivisions / 2

// 		const stage = Math.floor(posH / aHalf) + 1
// 		let signal = 0

// 		signal = (posH % aHalf) / (numberOfHorizontalDivisions / 6)
// 		if (stage % 2 === 0) {
// 			signal = 1 - signal
// 		}

// 		let min = 0 //Math.round((255/numberOfVerticalDivisions)*posV)
// 		let max = 255

// 		if (posV < Math.floor(numberOfVerticalDivisions / 2)) {
// 			let invPosV = (numberOfVerticalDivisions / 2) - posV - 1
// 			min = Math.round((255 / (numberOfVerticalDivisions / 2)) * invPosV)
// 		}

// 		if (posV > Math.floor(numberOfVerticalDivisions / 2)) {
// 			let altPosV = posV - (numberOfVerticalDivisions / 2)
// 			max = 255 - Math.round((255 / (numberOfVerticalDivisions / 2)) * altPosV)
// 		}

// 		const colorComponent = bounds(Math.round(signal * (max - min)) + min, min, max)
// 		return colorComponent
// 	}

// 	const showPalette = () => {
// 		if (expand) return "palette-base-visible"
// 	}

// 	const expandHandler = () => {
// 		setExpand(!expand)
// 	}

// 	return (
// 		<div className="color-ctl">
// 			<div className="color-band" style={{ backgroundColor: localColor + localOpacity }}>&nbsp;</div>
// 			<div className="color-editable">
// 				<div className="color">
// 					<input type="text" className="color-input" value={localColor} onChange={changeColorHandler} />
// 				</div>
// 				<div className="alpha">
// 					<input type="text" className="alpha-input" value={localOpacity} onChange={changeOpacityTextHandler} />
// 				</div>
// 			</div>
// 			<div className="range">
// 				<input type="range" min={0} max={255} step={1} className="color-range" value={parseInt(localOpacity || "0", 16)} onChange={changeOpacityRangeHandler} />
// 			</div>
// 			<div className={`color-strip-base`}>
// 				{colorStrip}
// 			</div>
// 			<div>
// 				<button style={{ width: "100%" }} onMouseDown={expandHandler}>{expand ? "CLOSE" : "OPEN"}</button>
// 			</div>


// 			<div className={`palette-base ${showPalette()}`}>
// 				<div className="palette-control-range">
// 					<input type="range" min={0} max={255} step={1} className="color-range" value={parseInt(localOpacity || "0", 16)} onChange={changeOpacityRangeHandler} />
// 				</div>
// 				{colorSelector}
// 				<div className="palette-control-ok">
// 					<button >Close</button>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }


// function bounds(number: number, min: number, max: number): number {
// 	return Math.max(Math.min(number, max), min)
// 	// if (number < min)
// 	// 	return min
// 	// if (number > max)
// 	// 	return max
// 	// return number
// }

// function right(text: string, len: number): string {
// 	return text.substring(Math.max(text.length - len, 0))
// }

// function padL(text: string, len: number, char: string = "0"): string {
// 	return right(char.repeat(len) + text, len)
// }

// function pad(text: string): string {
// 	return text.padStart(2, "0")
// 	// return padL(text, 2, "0")
// }

