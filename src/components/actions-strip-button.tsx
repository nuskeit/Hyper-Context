import { MouseEvent } from "react"
import "./actions-strip-button.scss"

export default function ({ action, image, toolTip = "" }: { action: Function, image: string, toolTip: string }) {

	const handleClick = (e: MouseEvent<SVGElement>) => {
		e.preventDefault()
		e.stopPropagation()
		action()
	}

	return <g className="actions-strip-button" onPointerDown={handleClick}>
		{/* <rect className="actionstrip-button-shape"
			x="0" y="0" width="50" height="50" rx="8" ry="8" fill="#fff3" /> */}
		<image className="actionstrip-button-image" href={image} x="4" y="4" width="40" />
		{/* <text className="actionstrip-button-tag" x="55" y="35" width="40">{toolTip}</text> */}
		<text className="actionstrip-button-tag" x="105" y="-15" width="40">{toolTip}</text>
	</g>
}