import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { getImage } from "@nx/firebase";
import { Colors } from "./Colors";

interface ImageProps {
	bucket: string;
	width?: number;
	height?: number;
	alt: string;
	value: string;
}

export const Image: React.FC<ImageProps> = (props) => {
	const [src, setSrc] = useState<string | undefined>("");

	useEffect(() => {
		if (!props.value) return;
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
	}, [props.value]);

	return (
		<ImageContainer width={props.width} height={props.height}>
			{props.value && <img src={src} alt={props.alt} />}
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
		img: {
			maxWidth: "100%",
			maxHeight: "100%",
		},
	})
);
