import styled from "@emotion/styled";
import { Colors } from "@nx/ui";

import { Link } from "react-router-dom";

export const Nav = () => {
	return (
		<NavContainer>
			<LeftSide>
				<Dropdown>
					<DropdownLink to="/">Home</DropdownLink>
				</Dropdown>
			</LeftSide>
			<RightSide>
				<Dropdown>
					<DropdownLink to="/projects">Projects</DropdownLink>
				</Dropdown>
				<Dropdown>
					<DropdownLink to="/posts">Posts</DropdownLink>
				</Dropdown>
				<Dropdown>
					<DropdownLink to="/bourbons">Bourbons</DropdownLink>
				</Dropdown>
				<Dropdown>
					<DropdownLink to="/resumes">Resumes</DropdownLink>
				</Dropdown>
				<Dropdown>
					<DropdownLink to="/books">Books</DropdownLink>
				</Dropdown>
				<Dropdown>
					<DropdownLink to="/books">Steve</DropdownLink>
					<DropdownItems className="dropdown">
						<NavLink to="/book/new">Logout</NavLink>
					</DropdownItems>
				</Dropdown>
			</RightSide>
		</NavContainer>
	);
};

const NavContainer = styled("div")({
	backgroundColor: Colors.darkerGrey,
	color: Colors.white,
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	fontSize: "1.5rem",
	height: "6rem",
	padding: "0 2rem",
});

const LeftSide = styled("div")({
	display: "flex",
	alignItems: "center",
});

const RightSide = styled("div")({
	display: "flex",
	alignItems: "center",
	textAlign: "end",
	alignContent: "flex-end",
	".dropdown": {
		right: 0,
	},
});

const DropdownLink = styled(Link)({
	backgroundColor: Colors.darkerGrey,
	color: Colors.white,
	textDecoration: "none",
	height: "6rem",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	minWidth: "10rem",
	"&:hover": {
		color: Colors.white,
		backgroundColor: Colors.darkGrey,
	},
});

const Dropdown = styled("div")({
	position: "relative",
	display: "flex",
	flexDirection: "column",
	".dropdown": {
		display: "none",
	},
	"&:hover": {
		".dropdown": {
			display: "flex",
		},
	},
});

const DropdownItems = styled("div")({
	zIndex: 1,
	position: "absolute",
	top: "6rem",
	display: "flex",
	flexDirection: "column",
});

const NavLink = styled(Link)({
	backgroundColor: Colors.darkerGrey,
	color: Colors.white,
	textDecoration: "none",
	padding: "1rem 2rem",
	// minWidth: "10rem",
	"&:hover": {
		color: Colors.white,
		backgroundColor: Colors.darkGrey,
	},
	whiteSpace: "nowrap",
});
