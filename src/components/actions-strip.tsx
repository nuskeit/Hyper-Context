import { ReactNode } from "react";
import { I_Node } from "../types/types";

export default function ({ children }: { children: ReactNode }) {

	return <g className="action-strip">
		{/* <rect x="-20" y="0" rx="4" ry="4" width={300} height="70" fill="#37cd" /> */}
		{children}
	</g>
}