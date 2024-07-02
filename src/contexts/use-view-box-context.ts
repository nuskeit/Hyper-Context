import { useContext } from "react";
import { WindowServicesContext, WindowServicesContextSetter } from "./view-box-context";

export default function () {
	const windowServices = useWindowServicesGetter()
	const setWindowServices = useWindowServicesSetter()

	return [windowServices, setWindowServices] as const
}

export function useWindowServicesGetter() {
	const windowServices = useContext(WindowServicesContext)

	return windowServices
}

export function useWindowServicesSetter() {
	const setviewBox = useContext(WindowServicesContextSetter)

	return setviewBox
}
