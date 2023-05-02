import styled from "@emotion/styled";
import { TabGroup } from "@nx/ui";
import { useState } from "react";

enum ListViewTypes {
	ALL_FILES = "allFiles",
	FAVORITES = "favorites",
	SEARCH = "search",
}
const SidebarListHeader = () => {
	const [listView, setListView] = useState(ListViewTypes.ALL_FILES);

	return (
		<Container>
			<TabGroup
				tabs={[
					{
						slug: "allFiles",
						icon: "list",
						label: "All Files",
						onClick: () => setListView(ListViewTypes.ALL_FILES),
						selected: listView === ListViewTypes.ALL_FILES,
					},
					{
						slug: "favorites",
						icon: "star",
						label: "Favorites",
						onClick: () => setListView(ListViewTypes.FAVORITES),
						selected: listView === ListViewTypes.FAVORITES,
					},
					{
						slug: "search",
						icon: "search",
						label: "Search",
						onClick: () => setListView(ListViewTypes.SEARCH),
						selected: listView === ListViewTypes.SEARCH,
					},
				]}
			/>
		</Container>
	);
};

export default SidebarListHeader;

const Container = styled("div")({});
