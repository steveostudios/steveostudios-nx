import styled from "@emotion/styled";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getImage } from "@nx/firebase";
import { Colors } from "./Colors";
import { Button, ButtonColor } from "./Button";

interface ImageProps {
	bucket: string;
	width?: number;
	height?: number;
	alt: string;
	onChange: (value: File | string | null) => void;
	value?: File | string;
}

export const ImageInput: React.FC<ImageProps> = (props) => {
	const ref = React.useRef<HTMLInputElement>(null);
	const [src, setSrc] = useState<string | undefined>("");

	useEffect(() => {
		console.log(props.value);
		if (!props.value) return setSrc("");
		if (typeof props.value === "string" && props.value.startsWith("http")) {
			setSrc(props.value);
			return;
		}
		if (typeof props.value === "string") {
			getImage(props.bucket, props.value).then((result) => {
				setSrc(result);
			});
			return;
		}
		if (props.value instanceof File) {
			setSrc(URL.createObjectURL(props.value));
			return;
		}
	}, [props.value]);

	const onLocalFile = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (!e.currentTarget.files || !e.currentTarget.files.length) return;
		const file = e.currentTarget.files[0];
		if (!file) return;
		props.onChange(file);
	};

	return (
		<ImageContainer width={props.width} height={props.height}>
			{props.value && <img src={src} alt={props.alt} />}

			<OverlayOptions>
				<Input
					type="file"
					onChange={onLocalFile}
					ref={ref}
					disabled={!!props.value}
				/>
				<Button
					slug="upload"
					disabled={!!props.value}
					onClick={(e) => {
						if (ref.current) ref.current.click();
					}}
					color={ButtonColor.INFO}
					icon="upload"
				/>
				<Button
					slug="clear"
					disabled={!props.value}
					onClick={(e) => {
						if (ref.current) ref.current.value = "";
						props.onChange(null);
					}}
					color={ButtonColor.INFO}
					icon="times"
				/>
			</OverlayOptions>
		</ImageContainer>
	);
};

const ImageContainer = styled("div")(
	(props: { width?: number; height?: number }) => ({
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		minWidth: "4rem",
		minHeight: "4rem",
		width: props.width ? `${props.width}rem` : "4rem",
		height: props.height ? `${props.height}rem` : "4rem",
		backgroundColor: Colors.trim,
		borderRadius: "0.5rem",
		border: `1px solid ${Colors.trim}`,
		overflow: "hidden",
		position: "relative",
		img: {
			width: "100%",
			height: "100%",
			objectFit: "cover",
		},
	})
);

const Input = styled("input")({
	border: "none",
	boxSizing: "border-box",
	borderRadius: "0.5rem",
	backgroundColor: Colors.trim,
	padding: "1rem 2rem",
	textAlign: "end",
	display: "none",
});

const OverlayOptions = styled("div")({
	position: "absolute",
	bottom: 0,
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "center",
	gap: "1rem",
	marginBottom: "1rem",
});
