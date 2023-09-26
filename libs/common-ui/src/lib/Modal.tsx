import React, { useState, useEffect, FunctionComponent } from "react";
import styled from "@emotion/styled";
import { Button } from "./Button";
import { Colors, Shadows } from "./Colors";

export interface ModalProps {
	component: FunctionComponent<any>;
	title: string;
	close?: () => void;
	onCancel?: () => void;
	onConfirm?: (data: any) => void;
	onClickOutside?: () => void;
	onLiveUpdate?: (data: any) => void;
	initialData?: any;
	data?: any;
	destructive?: boolean;
}

export const Modal: React.FC<ModalProps> = (props) => {
	const [data, setData] = useState({});

	const onClose = () => {
		if (props.close) props.close();
	};

	const onClickOutside = () => {
		if (props.onClickOutside) props.onClickOutside();
		onClose();
	};

	const onConfirm = () => {
		if (props.onConfirm) props.onConfirm(data);
		onClose();
	};

	const onCancel = () => {
		if (props.onCancel) props.onCancel();
		onClose();
	};

	useEffect(() => {
		if (!props.onLiveUpdate) return;
		console.log(data);
		props.onLiveUpdate(data);
	}, [props, data]);

	const Component = props.component;

	return (
		<Wrapper onClick={onClickOutside}>
			<Container onClick={(e) => e.stopPropagation()}>
				<Header>
					<span>{props.title}</span>
					<Button slug="close" icon="times" onClick={onClose} />
				</Header>
				<Body>
					<Component
						data={data}
						setData={setData}
						initialData={props.initialData}
					/>
				</Body>
				{(typeof props.onConfirm === "function" ||
					typeof props.onCancel === "function") && (
					<Footer>
						{typeof props.onConfirm === "function" && (
							<Button slug="confirm" name="Yes" onClick={onConfirm} />
						)}
						{typeof props.onCancel === "function" && (
							<Button slug="cancel" name="No" onClick={onCancel} />
						)}
					</Footer>
				)}
			</Container>
		</Wrapper>
	);
};

const Wrapper = styled("div")({
	position: "fixed",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	top: 0,
	height: "100%",
	left: 0,
	width: "100%",
	zIndex: 100,
	backgroundColor: Colors.darkOverlay,
});

const Container = styled("div")({
	backgroundColor: Colors.white,
	display: "flex",
	flexDirection: "column",
	minWidth: "48rem",
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: Colors.trim,
	borderRadius: "1rem",
	boxShadow: Shadows.standard,
});

const Header = styled("div")({
	padding: "1rem",
	paddingLeft: "2rem",
	fontWeight: "bold",
	height: "4rem",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	borderBottomWidth: "1px",
	borderBottomStyle: "solid",
	borderBottomColor: Colors.trim,
});

const Body = styled("div")({
	textAlign: "left",
	padding: "2rem",
	minHeight: "4rem",
});

const Footer = styled("div")({
	padding: " 0 2rem 2rem 2rem",
	display: "flex",
	gap: "1rem",
	justifyContent: "flex-end",
	alignItems: "center",
	height: "6rem",
	"& button": {
		padding: "1rem 3rem",
	},
});
