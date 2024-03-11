import { useMemo } from "react";
import { TreeNode } from "types/types";
import { useSetActiveFullStory } from "../../custom-hooks/use-active-full-story-context";
import { getImgUrl } from "../../custom-hooks/use-images";
import ActionsStripButton from "../actions-strip-button";

export default function ({ node }: { node: TreeNode }) {

	const setActiveFullStory = useSetActiveFullStory()

	const image = useMemo(() => getImgUrl("actions/full-story-open.png"), [])

	function action() {
		setActiveFullStory(node)
	}

	return <ActionsStripButton image={image} action={action} toolTip="Show Full Story" />

}
