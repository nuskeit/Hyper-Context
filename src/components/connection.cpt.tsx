import { memo, useRef } from "react";
import useGlobalOptions from "../custom-hooks/useGlobalOptions";
import { I_Node, I_Position, I_Positioned } from "../types/types";

export default memo(function (
	{ el1, el2 }: { el1: I_Position, el2: I_Positioned<I_Node> }
) {
	const globalOptions = useGlobalOptions()
	const mergedOptions = {
		...globalOptions.connection,
		...el2.element.options?.connection,
	}

	const pathRef = useRef(null)

	const sourceY = el1.y + el1.height + mergedOptions.offsetStart

	const targetY = el2.y - mergedOptions.offsetEnd

	const middleX = (el: I_Position) => {
		return el.x + (el.width) / 2
	}

	let points = [['', 0, 0]]

	const path = () => {
		const source = { x: middleX(el1), y: sourceY }
		const target = { x: middleX(el2), y: targetY }
		const totalDistance = {
			horizontal: Math.max(target.x - source.x, source.x - target.x),
			vertical: Math.max(target.y - source.y, source.y - target.y)
		}

		let _curveDistributionCoeficient = rangeLimit(mergedOptions.curveDistributionCoeficient, 0, 1)
		if (mergedOptions.fixedStart > 0 && mergedOptions.fixedStart < totalDistance.vertical)
			_curveDistributionCoeficient = Math.max(mergedOptions.curveDistributionCoeficient, mergedOptions.fixedStart / totalDistance.vertical)

		const dir = {
			h: source.x > target.x ? -1 : 1,
			v: source.y > target.y ? -1 : 1,
		}

		const curve = Math.min(totalDistance.horizontal * _curveDistributionCoeficient, totalDistance.vertical * (1 - _curveDistributionCoeficient)) * 0.7

		function rangeLimit(num: number, lo: number, hi: number): number {
			return Math.max(Math.min(num, hi), lo)
		}

		const curveDistri = (n: number, d: number): number => n * rangeLimit(d, 0, 1)
		const minLegLength = curve
		const maxLegLength = totalDistance.vertical - curve

		const firstLeg = Math.min(Math.max(curveDistri(totalDistance.vertical, _curveDistributionCoeficient), minLegLength), maxLegLength)
		const lastLeg = totalDistance.vertical - firstLeg

		const curve1 = Math.min(totalDistance.horizontal * _curveDistributionCoeficient, totalDistance.vertical * _curveDistributionCoeficient)/2
		const curve2 = Math.min(totalDistance.horizontal * (1 - _curveDistributionCoeficient), totalDistance.vertical * (1 - _curveDistributionCoeficient))/2

		points = [
			['M', source.x, source.y],
			['L', source.x, source.y + firstLeg - curve1],
			['Q', source.x, source.y + firstLeg],
			['', source.x + dir.h * curve1, source.y + firstLeg],
			['L', target.x - dir.h * curve2, target.y - lastLeg],
			['Q', target.x, source.y + firstLeg],
			['', target.x, target.y - lastLeg + curve2],
			['L', target.x, target.y],
		]

		const pathSequence = points.map((e) =>
			`${e[0].toString()}${e[1].toString()} ${e[2].toString()} `
		).reduce((r, e) => r += e)
		return pathSequence
	}

	// const debugPoints = () => {
	// 	return points.map((e, i) => <circle cx={e[1]} cy={e[2]} r="5" key={i} stroke="#0f0" fill="#f00" />)
	// }

	// const endPoint = () => {
	// 	const e = points[points.length - 1]
	// 	return <circle cx={e[1]} cy={e[2]} r="6" strokeWidth={4} stroke="none" fill="#888" />
	// }

	// const startPoint = () => {
	// 	const e = points[0]
	// 	return <circle cx={e[1]} cy={e[2]} r="6" strokeWidth={4} stroke="none" fill="#888" />
	// }

	return (
		<>

			<defs>
				<marker id="end-cap" viewBox="0 0 12 12" refX="6" refY="6" markerUnits="userSpaceOnUse"
					markerWidth="12" markerHeight="12" orient="auto">
					<circle cx="6" cy="6" r="6" strokeWidth="4" stroke="none" fill="#eee" />
				</marker>

			</defs>

			<path className="path" style={{ strokeDashoffset: 0 }} d={path()} stroke="#aaa" strokeWidth={4} fill="none"
				markerStart="url(#end-cap)" markerEnd="url(#end-cap)" ref={pathRef} />
			{/* {startPoint()}
			{endPoint()} 
			 {debugPoints()} */}
		</>
	)
})

