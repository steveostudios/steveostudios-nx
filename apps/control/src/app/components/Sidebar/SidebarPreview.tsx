import styled from "@emotion/styled";
import { Button, ButtonStyle } from "@nx/ui";

interface Props {
	userId: string;
}

const SidebarPreview: React.FC<Props> = (props) => {
	const onOpen = () => {
		window.open(
			`${process.env.NX_DISPLAY_HOST}${props.userId}`,
			"_blank",
			"noreferrer"
		);
	};

	return (
		<Container>
			<IFrame
				src={`${process.env.NX_DISPLAY_HOST}${props.userId}`}
				title="preview"
				width={256}
				height={144}
			/>
			<ButtonWrapper>
				<Button
					slug="pullout"
					icon="expand"
					skin={ButtonStyle.CLEAR}
					onClick={onOpen}
				/>
			</ButtonWrapper>
		</Container>
	);
};

export default SidebarPreview;

const Container = styled("div")({
	width: "32rem",
	height: "18rem",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	overflow: "hidden",
	position: "relative",
	":hover > div": {
		opacity: 1,
	},
});

const IFrame = styled("iframe")({
	overflow: "hidden",
	border: "none",
});

const ButtonWrapper = styled("div")({
	opacity: 0,
	position: "absolute",
	top: "1rem",
	right: "1rem",
	transition: "opacity 0.125s ease-in-out",
});
