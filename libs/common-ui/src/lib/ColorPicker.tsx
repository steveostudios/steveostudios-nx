import React, { useState } from "react";
import styled from "@emotion/styled";
import { Label } from "./Label";
import { ChromePicker } from "react-color";
import { Colors, Shadows } from "@nx/style";
import { Popover } from "./Popover";
import { css } from "@emotion/react";

interface Props {
	slug: string;
	label?: string;
	inline?: boolean;
	onChange: (value: string) => void;
	disabled?: boolean;
	value: string;
}

export const ColorPicker: React.FC<Props> = (props) => {
	const [active, setActive] = useState(false);
	const [color, setColor] = useState(props.value);

	return (
		<Container inline={props.inline} label={props.label}>
			<Label slug={props.slug} label={props.label} />
			<Popover
				active={active}
				setActive={(value) => setActive(value)}
				target={<Swatch color={color} onClick={() => setActive(!active)} />}
				popover={
					<Picker>
						<ChromePicker
							disableAlpha
							color={color}
							onChange={(color) => setColor(color.hex)}
							onChangeComplete={(color) => props.onChange(color.hex)}
						/>
					</Picker>
				}
			/>
		</Container>
	);
};

const Container = styled("div")(
	{
		height: "4rem",
		width: "4rem",
		position: "relative",
	},
	(props: { inline?: boolean; label?: string }) => {
		if (!props.inline && !!props.label) {
			return {
				height: "initial",
				gap: "1rem",
				label: {
					height: "4rem",
				},
			};
		}
		return {};
	}
);

const Swatch = styled("div")((props: { color: string }) => ({
	width: "4rem",
	height: "4rem",
	display: "flex",
	borderRadius: "0.5rem",
	backgroundColor: props.color,
}));

const Picker = styled("div")({
	padding: 1,
	maxHeight: "20.5rem",
	".chrome-picker": {
		backgroundColor: `${Colors.gray10} !important`,
		boxShadow: "none !important",
		outline: "none !important",
		svg: { background: "transparent !important" },
		input: {
			border: `1px solid ${Colors.gray7} !important`,
			borderRadius: "0.5rem",
			boxShadow: "none !important",
			boxSizing: "border-box",
			color: `${Colors.white} !important`,
			backgroundColor: `${Colors.gray10} !important`,
			":focus-visible": {
				outline: "none",
				border: `1px solid ${Colors.gray7} !important`,
			},
		},
	},
});
