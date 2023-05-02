import React, { ReactElement } from "react";
import styled from "@emotion/styled";
import { Colors, Shadows } from "@nx/style";
import { ArrowContainer, Popover as ReactPopover } from "react-tiny-popover";

interface Props {
	active: boolean;
	setActive: (value: boolean) => void;
	popover: ReactElement;
	target: ReactElement;
	position?: "left" | "right";
	maxHeight?: number;
}

export const Popover: React.FC<Props> = (props) => {
	return (
		<ReactPopover
			isOpen={props.active}
			onClickOutside={() => props.setActive(!props.active)}
			positions={props.position ? [props.position] : ["left"]}
			align="start"
			content={({ position, childRect, popoverRect }) => (
				<ArrowContainer
					position={position}
					childRect={childRect}
					popoverRect={popoverRect}
					arrowColor={Colors.gray7}
					arrowSize={8}
				>
					<Wrapper maxHeight={props.maxHeight}>{props.popover}</Wrapper>
				</ArrowContainer>
			)}
		>
			<div>{props.target}</div>
		</ReactPopover>
	);
};

const Wrapper = styled("div")((props: { maxHeight?: number }) => ({
	display: "flex",
	boxShadow: Shadows.standard,
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: Colors.gray7,
	backgroundColor: Colors.gray9,
	borderRadius: "0.5rem",
	overflow: "scroll",
	padding: 0,
	color: Colors.white,
	maxHeight: props.maxHeight ? `${props.maxHeight}rem` : "unset",
	minWidth: "12rem",
	width: "max-content",
}));
