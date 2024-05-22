import { ReactComponentElement, useCallback, useEffect, useMemo, useRef, useState } from "react"
import "./color.ctl.scss"
import { left } from "../../../util/text"
import { PaletteCtl } from "./palette.ctl"
export function ColorCtl({
	value,
	setValue
}: {
	value: any,
	setValue: (e: any) => {}
}) {
	const [showPalette, setShowPalette] = useState<boolean>(false)
	const [localColor, setLocalColor] = useState<string>("#000000")
	const [localOpacity, setLocalOpacity] = useState<string>("ff")
	// const [mouseDown, setMouseDown] = useState<boolean>(false)

	// const fixColor = (color: string) => {
	// 	let valColor = color
	// 	let valAlpha = "ff"
	// 	if (color.length < 4)
	// 		valColor = color.padEnd(4, "0")
	// 	else if (color.length === 4)
	// 		valColor = color[0] + color[1] + color[1] + color[2] + color[2] + color[3] + color[3]
	// 	else if (color.length === 5) {
	// 		valColor = color[0] + color[1] + color[1] + color[2] + color[2] + color[3] + color[3]
	// 		valAlpha = color[4]
	// 	} else if (color.length === 7) {
	// 		valColor = color
	// 	} else if (color.length > 7) {
	// 		valColor = left(color, 7)
	// 		valAlpha = color.substring(7)
	// 	}
	// 	setLocalColor(valColor)
	// 	setLocalOpacity(valAlpha)

	// }

	const fixColor = (color: string) => {
		let valColor = color
		let valAlpha = "ff"
		if (valColor.indexOf("#") > -1) {
			if (color.length === 4)
				valColor = color[0] + color[1].repeat(2) + color[2].repeat(2) + color[3].repeat(2)
			else if (color.length === 5) {
				valColor = color[0] + color[1].repeat(2) + color[2].repeat(2) + color[3].repeat(2)
				valAlpha = color[4].repeat(2)
			} else if (color.length === 7) {
				valColor = color
			} else if (color.length > 7) {
				valColor = left(color, 7)
				valAlpha = color.substring(7)
			} else {
				valColor = "#444444"
				valAlpha = "00"
			}
		} else {
			valColor = "#444444"
			valAlpha = "00"
		}
		setLocalColor(valColor)
		setLocalOpacity(valAlpha)
	}

	useEffect(() => {
		fixColor(value)
	}, [value]);


	// useEffect(() => {
	// 	let val = localColor
	// 	if (localColor.length !== 4)
	// 		val = localColor.padEnd(7, "0")
	// 	setValue(val + localOpacity);
	// }, [localColor, localOpacity]);


	const changeColorHandler = (e: any) => {
		if (localColor.length < 7 || e.nativeEvent.data === null)
			if ((e.nativeEvent.data === null
				|| "0123456789abcdef".indexOf(e.nativeEvent.data.toLowerCase()) >= 0)
				&& "#" === left(e.target.value, 1)
			) {
				let val = e.target.value
				setLocalColor(val)
			}
	}

	const selectColorHandler = (color: string, opacity: string) => {
		setLocalColor(color)
		setLocalOpacity(opacity)
		setValue(color + opacity)
	}

	const changeOpacityTextHandler = (e: any) => {
		changeOpacity(e.target.value, e.nativeEvent.data)
	}

	const changeOpacityRangeHandler = (e: any) => {
		let val = Number(e.target.value).toString(16).padStart(2, "0")
		changeOpacity(val, null)
	}

	const changeOpacity = (value: string, data: string | null) => {
		if (localOpacity.length < 2 || data === null)
			if (data === null || "0123456789abcdef".indexOf(data.toLowerCase()) >= 0) {
				setLocalOpacity(value)
			}
	}


	let mouseDown = useRef(false)
	const mouseDownHandler = (color: string) => {
		console.log('click MOOO DOWN');
		// setMouseDown(true)
		mouseDown.current = true
		setLocalColor(color);
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


	// const changeOpacityHandler = (val: number) => {
	// 	setLocalOpacity(val)
	// 	const valHex=Number(val).toString(16)
	// 	console.log('val', val, valHex);
	// 	if (localColor.length === 4)
	// 		setValue(localColor + valHex)
	// 	else if (localColor.length > 4 && localColor.length < 6)
	// 		setValue(left(localColor, 4) + valHex)
	// 	else
	// 		setValue(left(localColor, 7) + valHex)
	// }


	const expandHandler = () => {
		setShowPalette(!showPalette)
	}

	const palleteCloseHandler = () => {
		setShowPalette(false)
	}

	const paletteJsx = useMemo<JSX.Element>(() => {
		if (showPalette)
			return (
				<div className={`palette-control palette-control-visible`}>
					{/* <PaletteCtl cols={27} rows={19} selectedColor={localColor + localOpacity} onChange={selectColorHandler} onClose={palleteCloseHandler} /> */}
					<PaletteCtl cols={27} rows={19} editColor={localColor} editOpacity={localOpacity} onChange={selectColorHandler} onClose={palleteCloseHandler} />
				</div>)
		else
			return <></>
	}, [localColor, localOpacity, showPalette])

	return (
		<div className="color-ctl">
			<div className="color">
				<input type="text" value={localColor} onChange={changeColorHandler} />
			</div>
			<div className="alpha">
				<input type="text" value={localOpacity} onChange={changeOpacityTextHandler} />
			</div>
			<div className="color-band">
				<div className="color-band-button cursor-pointer" onMouseDown={expandHandler} style={{ backgroundColor: localColor + localOpacity }}></div>
			</div>
			{paletteJsx}
		</div>
	)
}


function bounds(number: number, min: number, max: number): number {
	return Math.max(Math.min(number, max), min)
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

