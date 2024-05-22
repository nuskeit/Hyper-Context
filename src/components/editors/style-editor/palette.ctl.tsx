import { ReactComponentElement, useEffect, useMemo, useRef, useState } from "react"
import "./palette.ctl.scss"
import { left } from "../../../util/text"
// import colorPickerBg from "../../../assets/bg/color-picker-bg.png"
export function PaletteCtl({
	cols,
	rows,
	editColor,
	editOpacity,
	onChange,
	onClose
}: {
	cols: number
	rows: number
	editColor: string
	editOpacity: string
	onChange: (color: string, opacity: string) => void
	onClose: () => void
}) {
	const [localColor, setLocalColor] = useState<string>("#777777")
	const [localOpacity, setLocalOpacity] = useState<string>("ff")
	// const [mouseDown, setMouseDown] = useState<boolean>(false)

	// const fixColor = (color: string) => {
	// 	let valColor = color
	// 	let valAlpha = "ff"
	// 	if (valColor.indexOf("#") > -1) {
	// 		if (color.length === 4)
	// 			valColor = color[0] + color[1].repeat(2) + color[2].repeat(2) + color[3].repeat(2)
	// 		else if (color.length === 5) {
	// 			valColor = color[0] + color[1].repeat(2) + color[2].repeat(2) + color[3].repeat(2)
	// 			valAlpha = color[4]
	// 		} else if (color.length === 7) {
	// 			valColor = color
	// 		} else if (color.length > 7) {
	// 			valColor = left(color, 7)
	// 			valAlpha = color.substring(7)
	// 		}
	// 		setLocalColor(valColor)
	// 		setLocalOpacity(valAlpha)
	// 	}
	// }

	useEffect(() => {
		console.log('PALETTE ENTER EFFECT',editColor,editOpacity);
		setLocalColor(editColor)
		setLocalOpacity(editOpacity)
	}, []);

	// useEffect(() => {
	// 	onChange(localColor, localOpacity)
	// }, [localColor, localOpacity]);

	// useEffect(() => {
	// 	let val = localColor
	// 	if (localColor.length < 4)
	// 		val = localColor.padEnd(4, "0")
	// 	else if (localColor.length === 4)
	// 		val = localColor[0] + localColor[1] + localColor[1] + localColor[2] + localColor[2] + localColor[3] + localColor[3]
	// 	else if (localColor.length > 4)
	// 		val = localColor.padEnd(7, "0")
	// 	onChange(val, localOpacity.padStart(2, "0"));
	// 	// onChange(val, (localOpacity === "ff" ? "" : localOpacity).padStart(2,"0"));
	// }, [localColor, localOpacity]);


	let colorSelStart = 0, colorSelEnd = 0
	const colorTextKeyDownHandler = (e: any) => {
		colorSelStart = e.target.selectionStart
		colorSelEnd = e.target.selectionEnd
	}

	const changeColorHandler = (e: any) => {
		console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
		if (localColor.length - (colorSelEnd - colorSelStart) < 7
			|| e.nativeEvent.data === null
			|| e.target.selectionStart !== e.target.selectionEnd) {
			console.log('OK');
			if ((e.nativeEvent.data === null
				|| "0123456789abcdef".indexOf(e.nativeEvent.data.toLowerCase()) >= 0)
				&& "#" === left(e.target.value, 1)
			) {
				let val = e.target.value
				setLocalColor(val)
				onChange(val, localOpacity)
			}
		}
	}

	let alphaSelStart = 0, alphaSelEnd = 0
	const alphaTextKeyDownHandler = (e: any) => {
		alphaSelStart = e.target.selectionStart
		alphaSelEnd = e.target.selectionEnd
	}
	const changeOpacityTextHandler = (e: any) => {
		changeOpacity(e.target.value, e.nativeEvent.data)
	}

	const changeOpacityRangeHandler = (e: any) => {
		let val = Number(e.target.value).toString(16).padStart(2, "0")
		changeOpacity(val, null)
	}

	const changeOpacity = (value: string, data: string | null) => {
		if (localOpacity.length - (alphaSelEnd - alphaSelStart) < 2 || data === null)
			if (data === null || "0123456789abcdef".indexOf(data.toLowerCase()) >= 0) {
				setLocalOpacity(value)
				onChange(localColor, value)
			}
	}


	let mouseDown = useRef(false)
	const mouseDownHandler = (color: string) => {
		console.log('click MOOO DOWN');
		// setMouseDown(true)
		mouseDown.current = true
		setLocalColor(color);
		onChange(color, localOpacity)
	}

	const mouseUpHandler = (e: Event) => {
		e.stopPropagation()
		console.log('MOOOO UPP');
		// setMouseDown(false)
		mouseDown.current = false
	}

	const mouseMoveHandler = (e: Event) => {
		e.stopPropagation()
		if (mouseDown.current)
			console.log('MOUSE DOWN', mouseDown.current)
		else
			console.log('MOUSE UP', mouseDown.current)
	}

	const colorBitTemplate = (c: string, key: string | number) => {
		return <div key={key} title={c} className="color-box"
			onMouseDown={() => mouseDownHandler(c)}
			// onMouseUp={mouseUpHandler}
			// onMouseEnter={mouseMoveHandler}
			style={{ backgroundColor: c }}>&#x200B;</div>
	}

	const rowTemplate = (row: any, key: string | number) => {
		return <div key={key} className="palette-row"
		// onMouseLeave={mouseUpHandler}
		>{row}</div>
	}

	function validCols(c: number): number {
		if (c > 255) {
			return 255
		} else if (c === 0)
			return 9
		else if (c % 3 === 0)
			return c
		else {
			if (c >= 255 / 3)
				return 255
			return Math.ceil(c / 3) * 3
		}
	}




	const getColorStrip = (cols: number) => {
		const palette: any[] = []
		let paleteSize = { width: cols, height: 1 }
		for (let j = 0; j < paleteSize.height; ++j) {
			const row: any[] = []
			for (let i = 0; i < paleteSize.width; ++i) {
				const r = getSignal(i + paleteSize.width / 3, j, paleteSize.width, paleteSize.height).toString(16)
				const g = getSignal(i, j, paleteSize.width, paleteSize.height).toString(16)
				const b = getSignal(i + paleteSize.width / 1.5, j, paleteSize.width, paleteSize.height).toString(16)

				const color = `#${pad(r)}${pad(g)}${pad(b)}`

				row.push(colorBitTemplate(color, i))
			}

			// Grayscale
			const color = ["#ffffff", "#000000"]
			color.forEach((c, i) => {
				row.push(colorBitTemplate(c, -(i + 1)))
			})

			palette.push(rowTemplate(row, j))
		}

		return (
			<>
				{palette}
			</>
		)
	}

	const getColorPalette = (cols: number, rows: number) => {
		const palette: any[] = []
		let paleteSize = { width: cols, height: rows }
		for (let j = 0; j < paleteSize.height; ++j) {
			const row: any[] = []
			for (let i = 0; i < paleteSize.width; ++i) {
				const r = getSignal(i + paleteSize.width / 3, j, paleteSize.width, paleteSize.height).toString(16)
				const g = getSignal(i, j, paleteSize.width, paleteSize.height).toString(16)
				const b = getSignal(i + paleteSize.width / 1.5, j, paleteSize.width, paleteSize.height).toString(16)

				const color = `#${pad(r)}${pad(g)}${pad(b)}`

				row.push(colorBitTemplate(color, i + 1))
			}

			// Grayscale
			const r = getSignal(0, j - 1, 1, (paleteSize.height - 1) * 2).toString(16)
			const g = getSignal(0, j - 1, 1, (paleteSize.height - 1) * 2).toString(16)
			const b = getSignal(0, j - 1, 1, (paleteSize.height - 1) * 2).toString(16)

			const color = `#${pad(r)}${pad(g)}${pad(b)}`

			row.push(colorBitTemplate(color, -(j + 1)))

			palette.push(rowTemplate(row, j + 1))
			//palette.push(<div key={j} className="palette-row" onMouseLeave={mouseUpHandler}>{row}</div>)
		}

		return (
			<div className="palette simple-box-shadow">
				{palette}
			</div>
		)
	}

	function getSignal(
		// v1.4
		posH: number,
		posV: number,
		numberOfHorizontalDivisions: number,
		numberOfVerticalDivisions: number): number {

		// if (numberOfVerticalDivisions < 2) throw Error("numberOfVerticalDivisions cannot be less than 2");

		const aHalf = numberOfHorizontalDivisions / 2

		const stage = Math.floor(posH / aHalf) + 1
		let signal = 0

		signal = (posH % aHalf) / (numberOfHorizontalDivisions / 6)
		if (stage % 2 === 0) {
			signal = 1 - signal
		}

		let min = 0 //Math.round((255/numberOfVerticalDivisions)*posV)
		let max = 255

		if (posV < Math.floor(numberOfVerticalDivisions / 2)) {
			let invPosV = (numberOfVerticalDivisions / 2) - posV - 1
			min = Math.round((255 / (numberOfVerticalDivisions / 2)) * invPosV)
		}

		if (posV > Math.floor(numberOfVerticalDivisions / 2)) {
			let altPosV = posV - (numberOfVerticalDivisions / 2)
			max = 255 - Math.round((255 / (numberOfVerticalDivisions / 2)) * altPosV)
		}

		const colorComponent = bounds(Math.round(signal * (max - min)) + min, min, max)
		return colorComponent
	}

	const closeHandler = () => {
		onClose()
	}

	const selectPalette = useMemo<JSX.Element>(() => {
		const _cols = validCols(cols)
		const _rows = rows
		if (rows == 1)
			return getColorStrip(_cols)
		return getColorPalette(_cols, _rows)
	}, [])

	return (
		<div className="palette-ctl">
			<div className="palette-base">
				<div className="palette-controls">
					<div className="alpha-slide">
						<input type="range" className="control" min={0} max={255} step={1} value={parseInt(localOpacity || "0", 16)} onChange={changeOpacityRangeHandler} />
					</div>
					<div className="palette-color-band" >
						<input type="text" className="control" readOnly style={{ backgroundColor: localColor + localOpacity }} />
					</div>
					<div className="color">
						<input type="text" className="control" value={localColor}
							onChange={changeColorHandler}
							onKeyDown={colorTextKeyDownHandler}
						/>
					</div>
					<div className="alpha">
						<input type="text" className="control" value={localOpacity}
							onChange={changeOpacityTextHandler}
							onKeyDown={alphaTextKeyDownHandler}
						/>
					</div>
				</div>

				{selectPalette}

				<div className="palette-control-ok">
					<button onMouseDown={closeHandler} className="simple-box-shadow">Close</button>
				</div>
			</div>
		</div>
	)
}


function bounds(number: number, min: number, max: number): number {
	return Math.max(Math.min(number, max), min)
	// if (number < min)
	// 	return min
	// if (number > max)
	// 	return max
	// return number
}

function right(text: string, len: number): string {
	return text.substring(Math.max(text.length - len, 0))
}

function padL(text: string, len: number, char: string = "0"): string {
	return right(char.repeat(len) + text, len)
}

function pad(text: string): string {
	return text.padStart(2, "0")
	// return padL(text, 2, "0")
}

