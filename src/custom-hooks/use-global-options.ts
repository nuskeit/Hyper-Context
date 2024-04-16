import { useContext } from "react";
import { OptionsContext } from "../contexts/book-context";

export default function useGlobalOptions() {
	const globalOptions = useContext(OptionsContext)

	return globalOptions

}