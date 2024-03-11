import BoardCpt from "../components/board.cpt"
import BookContextProvider from "../contexts/book-context"
import BookMainToolbar from "../components/toolbars/book-main-toolbar"
import NodeEditorContext from "../contexts/node-editor-context"
import SystemModeContext from "../contexts/system-mode-context"
import MainEditor from "../components/editors/main-editor"
import './app-main.scss'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"

export default function () {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route >
				<Route path=":key" element={<BookMainToolbar />} />
				<Route path="*" element={<h3>CREATE NEW?</h3>} />
			</Route >
		)
	)

	return (
		<div className="main">
			{/* <TopBar boardNode={(book as Book).boardNode} /> */}
			<SystemModeContext> {/* essencially to set EDIT mode*/}
				<BookContextProvider> {/* To access the book we're working on */}
					<NodeEditorContext> { /* Provides access to the node selected for editing */}

						<div className="main-title">HyperContext v0.2</div>

						<div className="main-content" >
							<div className="main-top-menu">
								<RouterProvider router={router} /> { /* To get, save and share books from the remote repo */}
							</div>
							<div className="main-board" >
								<BoardCpt />
							</div>
							<div className="main-editor" >
								<MainEditor />
							</div>
						</div>

					</NodeEditorContext>
				</BookContextProvider>
			</SystemModeContext>
		</div>
	)
}

