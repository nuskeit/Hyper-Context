import { useEffect, useMemo, useRef, useState } from "react"
import { left } from "../../../util/text"
import "./color.ctl.scss"
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
				valColor = ""
				valAlpha = "00"
			}
		} else {
			valColor = "#000000"
			valAlpha = "00"
		}
		setLocalColor(valColor)
		setLocalOpacity(valAlpha)
	}

	useEffect(() => {
		fixColor(value)
	}, [value]);

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


