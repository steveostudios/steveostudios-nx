import { Resume, getSingleDoc, updateSingleDoc } from "@nx/firebase";
import {
	Button,
	ButtonColor,
	CheckboxInput,
	Container,
	H2,
	ImageInput,
	Section,
	TextAreaInput,
	TextInput,
} from "@nx/ui";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ResumeSingle: React.FC = () => {
	const docType = "resumes";
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [doc, setDoc] = useState<Partial<Resume>>();
	const [docUpdate, setDocUpdate] = useState<Partial<Resume>>({});

	useEffect(() => {
		if (!id) {
			setDoc({ id: "new" });
			return;
		}
		getSingleDoc(docType, id, (data) => setDoc(data as Resume));
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
				<H2>{docUpdate?.name || doc.name}</H2>
				<ImageInput
					bucket={docType}
					alt={doc.name || "Logo"}
					height={8}
					width={50}
					value={docUpdate.logo || doc.logo}
					onChange={(value) => onUpdateProp("logo", value)}
				/>
				<TextInput
					slug="name"
					label="Name"
					value={docUpdate.name || doc.name || ""}
					onChange={(value) => onUpdateProp("name", value)}
					visible
					showLabel
				/>
				<TextAreaInput
					slug="bio"
					label="Bio"
					value={docUpdate.bio || doc.bio || ""}
					onChange={(value) => onUpdateProp("bio", value)}
					visible
					showLabel
				/>
				<CheckboxInput
					slug="visible"
					label="Active"
					value={docUpdate.visible || doc.visible || false}
					onChange={(value) => onUpdateProp("visible", value)}
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

export default ResumeSingle;
