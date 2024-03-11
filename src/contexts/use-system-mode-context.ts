import { useContext } from "react";
import { SystemModeContext, SystemModeContextSetter } from "./system-mode-context";

export default function useSystemModeContext() {
	const systemMode = useSystemMode()
	const setSystemMode = useSetSystemMode()

	return [systemMode, setSystemMode] as const
}

export function useSystemMode() {
	const systemMode = useContext(SystemModeContext)

	return systemMode
}


export function useSetSystemMode() {
	const setSystemMode = useContext(SystemModeContextSetter)

	return setSystemMode
}