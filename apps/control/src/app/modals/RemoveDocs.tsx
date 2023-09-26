import styled from "@emotion/styled";
import React from "react";

interface SimpleDoc {
	name: string;
	id: string;
}

export interface RemoveDocsModalData {
	docs: SimpleDoc[];
}

interface Props {
	// data: RemoveDocsModalData;
	initialData: RemoveDocsModalData;
}

const RemoveDocsModal: React.FunctionComponent<Props> = (props) => {
	if (!props.initialData.docs.length) {
		return (
			<Container>
				<p>Nothing to delete</p>
			</Container>
		);
	} else if (props.initialData.docs.length === 1) {
		return (
			<Container>
				Are you sure you want to delete "{props.initialData.docs[0].name}"? This
				action cannot be undone.
			</Container>
		);
	} else {
		return (
			<Container>
				<p>Are you sure you want to delete the following docs?</p>
				<ul>
					{props.initialData.docs.map((doc, index) => (
						<li key={index}>{doc.name}</li>
					))}
				</ul>
				<p>This action cannot be undone.</p>
			</Container>
		);
	}
};

export default RemoveDocsModal;

const Container = styled("div")({});
