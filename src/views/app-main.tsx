import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import BoardCpt from "../components/group/board.cpt"
import MainEditor from "../components/editors/main-editor"
import FullStoryProjectorCpt from "../components/full-story-projector.cpt"
import BookMainToolbar from "../components/toolbars/book-main-toolbar"
import BookContextProvider from "../contexts/book-context"
import NodeEditorContext from "../contexts/node-editor-context"
import SystemModeContext from "../contexts/system-mode-context"
import ViewBoxContext from "../contexts/view-box-context"
import './app-main.scss'
import FullStoryCpt from "../components/full-story.cpt"

export default function () {

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route >
				<Route path="hypercontext/:key" element={<BookMainToolbar />} />
				<Route path="*" element={<h3>CREATE NEW?</h3>} />
			</Route >
		)
	)

	return (
		<div className="main">
			<SystemModeContext> {/* essencially to set EDIT mode*/}
				<BookContextProvider> {/* To access the book we're working on */}
					<NodeEditorContext> { /* Provides access to the node selected for editing */}
						<ViewBoxContext> { /* Zoom and Scroll */}

							<div className="main-title">HyperContext v0.2</div>

							<div className="main-content" >
								
								<div className="main-top-menu">
									<RouterProvider router={router} /> { /* To get, save and share books from the remote repo */}
								</div>

								<div className="main-board" >
									<BoardCpt />
								</div>

								{/* <div className="main-editor" > */}
								<MainEditor />
								{/* </div> */}

								<FullStoryCpt />

								{/* <FullStoryProjectorCpt /> */}
							</div>

						</ViewBoxContext>
					</NodeEditorContext>
				</BookContextProvider>
			</SystemModeContext>
		</div>
	)
}

