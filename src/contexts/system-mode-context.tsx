import { createContext, ReactNode, useState } from "react";
import { SystemMode } from "../types/types";



export const SystemModeContext = createContext<SystemMode>(SystemMode.EDIT)
export const SystemModeContextSetter = createContext((m: SystemMode) => { })

export default function (props: { children: ReactNode }) {
	const [systemMode, setSystemMode] = useState<SystemMode>(SystemMode.EDIT)

	const setterFn = (m: SystemMode) => {
		setSystemMode(m)
	}

	return (
		<SystemModeContext.Provider value={systemMode}>
			<SystemModeContextSetter.Provider value={setterFn}>
				{props.children}
			</SystemModeContextSetter.Provider>
		</SystemModeContext.Provider>
	)
}
