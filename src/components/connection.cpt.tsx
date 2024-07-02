import { useRef } from "react";
import useGlobalOptions from "../custom-hooks/use-global-options";
import { I_Position, I_TreeNode } from "../types/types";

export default function (
	{
		el1,
		el2
	}: {
		el1: I_Position,
		el2: I_TreeNode
	}
) {
	const globalOptions = useGlobalOptions()
	const mergedOptions = {
		...globalOptions.connection,
		...el2.options?.connection,
	}

	const pathRef = useRef(null)

	const sourceY = el1.y + el1.height + mergedOptions.offsetStart

	const targetY = el2.nodeLayout.value.y - mergedOptions.offsetEnd

	const middleX = (el: I_Position) => {
		return el.x + (el.width) / 2
	}

	let points = [['', 0, 0]]

	const path = () => {
		const source = { x: el1.x, y: sourceY }
		const target = { x: el2.nodeLayout.value.x, y: targetY }
		const totalDistance = {
			horizontal: Math.abs(target.x - source.x),
			vertical: Math.abs(target.y - source.y)
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


		let curve1 = Math.min(totalDistance.horizontal * _curveDistributionCoeficient, totalDistance.vertical * _curveDistributionCoeficient) / 2
		let curve2 = Math.min(totalDistance.horizontal * (1 - _curveDistributionCoeficient), totalDistance.vertical * (1 - _curveDistributionCoeficient)) / 2


		let connectionShape = mergedOptions.connectionShape || 1
		// If the Y offset between the two conected nodes is too short, just use a better curve
		if (connectionShape === 1 && Math.abs(source.x - target.x) < 200) connectionShape = 2

		switch (connectionShape) {
			case 1:
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
				break;

			case 2:

				points = [
					['M', source.x, source.y],
					['Q', source.x, source.y + (firstLeg + lastLeg) / 2.8],
					['', (source.x + target.x) / 2 + dir.h, source.y + (firstLeg + lastLeg) / 2],
					['Q', target.x, source.y + (firstLeg + lastLeg) / 1.6],
					['', target.x, target.y],
				]

				break;

			case 3:

				points = [
					['M', source.x, source.y],
					['L', source.x, source.y],

					['', source.x, source.y],
					['', source.x + dir.h * curve1, source.y + firstLeg],

					['', target.x - dir.h * curve2, target.y - lastLeg],

					['', target.x, target.y - lastLeg + curve2],

					['', target.x, target.y],
				]

				break;

			case 4:

				points = [
					['M', source.x, source.y],

					['L', source.x, source.y + (firstLeg + lastLeg) / 2.8],

					['Q', target.x - dir.h * curve2, target.y - lastLeg],

					['', target.x, target.y - lastLeg + curve2],

					['', target.x, target.y],
					['', target.x, target.y],
				]

				break;

			case 5:

				points = [
					['M', source.x, source.y],
					['L', source.x, source.y],

					['', source.x, source.y + (firstLeg + lastLeg) / 2.8],


					['', target.x, target.y - lastLeg + curve2],

					['', target.x, target.y],
					['', target.x, target.y],
				]

				break;

			case 6:

				points = [
					['M', source.x, source.y],
					['', target.x, target.y],
				]

				break;

			case 7:

				points = [
					['M', source.x, source.y],

					['L', source.x, source.y + (firstLeg + lastLeg) / 2.8],

					['', target.x - dir.h * curve2, target.y - lastLeg],

					['', target.x, target.y - lastLeg + curve2],

					['', target.x, target.y],
				]

				break;


			default:
				break;
		}


		const pathSequence = points.map((e) =>
			`${e[0].toString()}${e[1].toString()} ${e[2].toString()} `
		).reduce((r, e) => r += e)
		return pathSequence
	}

	// DEBUG:
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
				<marker id="end-cap" viewBox="-6 -6 24 24" refX="6" refY="6" markerUnits="userSpaceOnUse"
					markerWidth="24" markerHeight="24" orient="auto">
					<circle cx="6" cy="6" r="12" strokeWidth="4" stroke="none" fill="#eee" />
				</marker>

			</defs>

			<path className="path" style={{ strokeDashoffset: 0 }} d={path()} stroke="#000" strokeWidth={10} fill="none"
				markerStart="url(#end-cap)" markerEnd="url(#end-cap)" ref={pathRef} />
			{/* {startPoint()}
			{endPoint()}
			{debugPoints()} */}
		</>
	)
}

