import { useContext } from "react";
import { WindowServicesContext, WindowServicesContextSetter } from "./view-box-context";

export default function () {
	const windowServices = useWindowServices()
	const setWindowServices = useSetWindowServices()

	return [windowServices, setWindowServices] as const
}

export function useWindowServices() {
	const windowServices = useContext(WindowServicesContext)

	return windowServices
}

export function useSetWindowServices() {
	const setviewBox = useContext(WindowServicesContextSetter)

	return setviewBox
}
