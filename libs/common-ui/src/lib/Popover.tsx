import React, { ReactElement } from "react";
import styled from "@emotion/styled";
import { Colors, Shadows } from "@nx/style";
import { ArrowContainer, Popover as ReactPopover } from "react-tiny-popover";

interface Props {
	active: boolean;
	setActive: (value: boolean) => void;
	popover: ReactElement;
	target: ReactElement;
}

export const Popover: React.FC<Props> = (props) => {
	return (
		<ReactPopover
			isOpen={props.active}
			onClickOutside={() => props.setActive(!props.active)}
			positions={["left"]}
			align="start"
			content={({ position, childRect, popoverRect }) => (
				<ArrowContainer
					position={position}
					childRect={childRect}
					popoverRect={popoverRect}
					arrowColor={Colors.gray7}
					arrowSize={8}
				>
					<Wrapper>{props.popover}</Wrapper>
				</ArrowContainer>
			)}
		>
			{props.target}
		</ReactPopover>
	);
};

const Wrapper = styled("div")({
	display: "flex",
	flexDirection: "column",
	boxShadow: Shadows.standard,
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: Colors.gray7,
	backgroundColor: Colors.gray9,
	borderRadius: "0.5rem",
	overflow: "scroll",
	padding: 0,
	color: Colors.white,
	maxHeight: "22rem",
	minWidth: "12rem",
	width: "max-content",
});
