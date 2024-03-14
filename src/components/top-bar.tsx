import { I_BoardNode } from "../types/types";

export default function ({ boardNode }: { boardNode: I_BoardNode }) {

	return (
		<div className="main-title">
			<div>PROFILER for : {boardNode.card.title}</div>
			<div>scscsds</div>
		</div>
	)

}