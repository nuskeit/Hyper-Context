import { ReactNode, useMemo } from "react"
import { I_NodeGroup, I_TimedNode, I_TreeNode } from "../types/types"
import { getDateString } from "../util/util"

export default function TimelineRuler({
	positionedNode,
	children,
	group
}: {
	positionedNode: I_TreeNode,
	children: I_TimedNode[],
	group: I_NodeGroup
}) {

	const marks = useMemo(() => {
		const dates = new Set<number>()
		const marksData = new Set<{
			date: number
			x: number
			y: number
		}>()

		children.forEach((e: I_TimedNode, i) => {
			const dStart = {
				date: e.start,
				x: e.nodeLayout.value.x,
				y: e.nodeLayout.value.y + e.nodeLayout.value.height
			}

			if (!dates.has(dStart.date)) {
				dates.add(dStart.date)
				marksData.add(dStart)
			}

			const dEnd = {
				date: e.end,
				x: e.nodeLayout.value.x + e.nodeLayout.value.width,
				y: e.nodeLayout.value.y + e.nodeLayout.value.height
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
						<line className="timeline-node-ruler-mark simple-shadow" x1={0} y1={e.y} x2={0} y2={group.groupLayout.value.y + positionedNode.nodeLayout.value.height + tagSeparation - 20 + 20 * (i % 2)} />

						<g transform={`translate(0 ${group.groupLayout.value.y + positionedNode.nodeLayout.value.height + tagSeparation + 50 * (i % 2)})`}>
							<g className="timeline-node-ruler-tag" transform="rotate(-15)">
								<text y="8" className="timeline-node-ruler-tag-text">{positionedNode.nodeLayout.value.height}-{dateTagEnd()}</text>
							</g>
						</g>

					</g>
				)
			}) as ReactNode[]
	}, [children, group])

	return <g className="timeline-ruler" >
		{marks}
	</g>
}