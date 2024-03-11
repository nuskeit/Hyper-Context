import { ReactNode, useMemo } from "react"
import { I_Node, I_NodeGroup, I_Positioned, TimedNode } from "../types/types"
import { getDateString } from "../util/util"

export default function TimelineRuler({
	positionedNode,
	children,
	group
}: {
	positionedNode: I_Positioned<I_Node>,
	children: I_Positioned<TimedNode>[],
	group: I_NodeGroup
}) {

	const marks = useMemo(() => {
		const dates = new Set<number>()
		const marksData = new Set<{
			date: number
			x: number
			y: number
		}>()

		children.forEach((e:I_Positioned<TimedNode>, i) => {
			const dStart = {
				date: e.element.start,
				x: e.x,
				y: e.y + e.height
			}

			if (!dates.has(dStart.date)) {
				dates.add(dStart.date)
				marksData.add(dStart)
			}

			const dEnd = {
				date: e.element.end,
				x: e.x + e.width,
				y: e.y + e.height
			}

			if (!dates.has(dEnd.date)) {
				dates.add(dEnd.date)
				marksData.add(dEnd)
			}
		})
		const tagSeparation = 80
		return [...marksData]
			.sort((a, b) => a.date - b.date)
			.map((e, i) => {
				const dateTagEnd = () => getDateString(e.date)
				return (
					<g transform={`translate(${e.x})`} key={i + .5}>
						<defs>
							<linearGradient id="tag-background-gradient">
								<stop offset="5%" stopColor="#3333" />
								<stop offset="40%" stopColor="#3336" />
								<stop offset="60%" stopColor="#3336" />
								<stop offset="95%" stopColor="#3333" />
							</linearGradient>
						</defs>
						{/* <line className="timeline-node-ruler-mark" x1={0} y1={e.y} x2={0} y2={positionedNode.height + 60 + 20 * (i % 2)} /> */}
						<line className="timeline-node-ruler-mark" x1={0} y1={e.y} x2={0} y2={group.y + positionedNode.height + tagSeparation - 20 + 20 * (i % 2)} />

						<g transform={`translate(0 ${group.y + positionedNode.height + tagSeparation + 50 * (i % 2)})`}>
							{/* <g transform={`translate(0 ${e.y - 25})`}> */}
							<g className="timeline-node-ruler-tag" transform="rotate(-15)">
								{/* <rect className="timeline-node-ruler-tag-background" x="-110" y="-15" width="220" height="30" /> */}
								<text y="8" className="timeline-node-ruler-tag-text">{dateTagEnd()}</text>
							</g>
						</g>
						{/* <text className="timeline-node-ruler-tag" y={positionedNode.height + 80 + 20} transform="rotate(-90, 10, 310)">{dateTagEnd()}</text> */}

					</g>
				)
			}) as ReactNode[]
	}, [children, group])

	return <g className="timeline-ruler" >
		{marks}
	</g>
}