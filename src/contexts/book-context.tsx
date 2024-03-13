import { createContext, ReactNode, useState } from "react";
import useBookState from "../custom-hooks/use-book-state";
import { createBook } from '../types/factory';
import { I_Options, Book, TreeNode } from "../types/types";


export const BookContext = createContext(createBook(undefined))
export const BookContextDispatch = createContext((() => { }) as any)
export const ActiveFullStoryContext = createContext<{ fullStoryNode: TreeNode | undefined }>({ fullStoryNode: undefined })
export const ActiveFullStoryContextSetter = createContext<Function>(() => { })
export const OptionsContext = createContext<I_Options>({} as I_Options)

export default function (props: { children: ReactNode }) {
	const [book, dispatch] = useBookState()
	const [fullStory, setFullStoryNode] = useState<TreeNode | undefined>()

	return (
		<BookContext.Provider value={book}>
			<BookContextDispatch.Provider value={dispatch}>
				<ActiveFullStoryContext.Provider value={{ fullStoryNode: fullStory }}>
					<ActiveFullStoryContextSetter.Provider value={setFullStoryNode}>
						<OptionsContext.Provider value={(book as Book).options}>
							{props.children}
						</OptionsContext.Provider>
					</ActiveFullStoryContextSetter.Provider>
				</ActiveFullStoryContext.Provider>
			</BookContextDispatch.Provider>
		</BookContext.Provider>
	)
}

