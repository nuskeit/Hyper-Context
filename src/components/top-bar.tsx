import { BoardNode } from "../types/types";

export default function ({ boardNode }: { boardNode: BoardNode }) {

	return (
		<div className="main-title">
			<div>PROFILER for : {boardNode.title}</div>
			<div>scscsds</div>
		</div>
	)

}