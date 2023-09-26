import { Project, getSingleDoc, updateSingleDoc } from "@nx/firebase";
import {
	Button,
	ButtonColor,
	CheckboxInput,
	Container,
	DateInput,
	H2,
	Section,
	TextAreaInput,
	TextInput,
} from "@nx/ui";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ProjectSingle: React.FC = () => {
	const docType = "projects";
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [doc, setDoc] = useState<Partial<Project>>();
	const [docUpdate, setDocUpdate] = useState<Partial<Project>>({});

	useEffect(() => {
		if (!id) {
			setDoc({ id: "new" });
			return;
		}
		getSingleDoc(docType, id, (data) => setDoc(data as Project));
	}, []);

	const onUpdateProp = (prop: string, value: any) => {
		setDocUpdate({ ...docUpdate, [prop]: value });
	};

	const onSave = () => {
		if (doc && doc.id) {
			updateSingleDoc(docType, doc.id, { ...doc, ...docUpdate });
		}
		navigate(`/${docType}`);
	};

	const onReset = () => {
		setDocUpdate({});
	};

	if (!doc) return <div>Loading...</div>;
	return (
		<Container>
			<Section>
				<H2>{doc.name}</H2>
				<TextInput
					slug="name"
					label="Name"
					value={docUpdate.name || doc.name || ""}
					onChange={(value) => onUpdateProp("name", value)}
					visible
					showLabel
				/>
				<TextAreaInput
					slug="content"
					label="Content"
					value={docUpdate.content || doc.content || ""}
					onChange={(value) => onUpdateProp("content", value)}
					visible
					showLabel
				/>
				<TextInput
					label="Frontend"
					slug="frontend"
					onChange={(value) => onUpdateProp("frontend", value.split(", "))}
					value={
						docUpdate.frontend?.join(", ") || doc?.frontend?.join(", ") || ""
					}
					placeholder="Frontend"
					visible
					showLabel
				/>
				<TextInput
					label="Backend"
					slug="backend"
					onChange={(value) => onUpdateProp("backend", value.split(", "))}
					value={
						docUpdate.backend?.join(", ") || doc?.backend?.join(", ") || ""
					}
					placeholder="Backend"
					visible
					showLabel
				/>
				<TextInput
					label="Host"
					slug="host"
					onChange={(value) => onUpdateProp("host", value.split(", "))}
					value={docUpdate.host?.join(", ") || doc?.host?.join(", ") || ""}
					placeholder="Host"
					visible
					showLabel
				/>
				<TextInput
					label="APIs"
					slug="apis"
					onChange={(value) => onUpdateProp("apis", value.split(", "))}
					value={docUpdate.apis?.join(", ") || doc?.apis?.join(", ") || ""}
					placeholder="APIs"
					visible
					showLabel
				/>
				<DateInput
					slug="date"
					label="Date"
					onChange={(value) =>
						onUpdateProp("dateStart", Timestamp.fromDate(new Date(value)))
					}
					value={
						(docUpdate.date &&
							docUpdate.date.toDate().toISOString().split("T")[0]) ||
						(doc?.date && doc.date.toDate().toISOString().split("T")[0]) ||
						""
					}
					visible
					showLabel
				/>
				<TextInput
					slug="url"
					label="Url"
					value={docUpdate.url || doc.url || ""}
					onChange={(value) => onUpdateProp("url", value)}
					visible
					showLabel
				/>
				<TextInput
					slug="client"
					label="Client"
					value={docUpdate.client || doc.client || ""}
					onChange={(value) => onUpdateProp("client", value)}
					visible
					showLabel
				/>
				<TextInput
					slug="repo"
					label="Content"
					value={docUpdate.repo || doc.repo || ""}
					onChange={(value) => onUpdateProp("repo", value)}
					visible
					showLabel
				/>
				<CheckboxInput
					slug="hiddenRepo"
					label="Hidden Repo"
					value={docUpdate.hiddenRepo || doc.hiddenRepo || false}
					onChange={(value) => onUpdateProp("own", value)}
					visible
					showLabel
				/>
				<Button
					slug="save"
					name="Save"
					onClick={onSave}
					color={ButtonColor.SUCCESS}
					disabled={Object.keys(docUpdate).length === 0}
				/>
				<Button
					slug="reset"
					name="Reset"
					onClick={onReset}
					disabled={Object.keys(docUpdate).length === 0}
				/>
			</Section>
		</Container>
	);
};

export default ProjectSingle;
