import { useContext } from "react";
import { SystemModeContext, SystemModeContextSetter } from "./system-mode-context";

export default function useSystemModeContext() {
	const systemMode = useSystemModeGetter()
	const setSystemMode = useSystemModeSetter()

	return [systemMode, setSystemMode] as const
}

export function useSystemModeGetter() {
	const systemMode = useContext(SystemModeContext)

	return systemMode
}


export function useSystemModeSetter() {
	const setSystemMode = useContext(SystemModeContextSetter)

	return setSystemMode
}