import { Post, getSingleDoc, updateSingleDoc } from "@nx/firebase";
import {
	Button,
	ButtonColor,
	CheckboxInput,
	Container,
	DateInput,
	H2,
	ImageInput,
	RowBreak,
	Section,
	TextAreaInput,
	TextInput,
} from "@nx/ui";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const PostSingle: React.FC = () => {
	const docType = "posts";
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [doc, setDoc] = useState<Partial<Post>>();
	const [docUpdate, setDocUpdate] = useState<Partial<Post>>({});

	useEffect(() => {
		if (!id) {
			setDoc({ id: "new" });
			return;
		}
		getSingleDoc(docType, id, (data) => setDoc(data as Post));
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
				<H2>{docUpdate.title || doc.title}</H2>
				<TextInput
					slug="title"
					label="Title"
					value={docUpdate.title || doc.title || ""}
					onChange={(value) => onUpdateProp("title", value)}
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
				<RowBreak>
					{doc.attachments &&
						doc.attachments.map((attachment) => (
							<ImageInput
								bucket={docType}
								value={attachment.filename}
								alt={attachment.name}
								height={8}
								width={50}
								onChange={(value) =>
									onUpdateProp(
										"attachments",
										docUpdate.attachments?.map((a) =>
											a.name === attachment.name ? { ...a, url: value } : a
										)
									)
								}
							/>
						))}
				</RowBreak>
				<TextInput
					label="Tags"
					slug="tags"
					onChange={(value) => onUpdateProp("tags", value.split(", "))}
					value={docUpdate.tags?.join(", ") || doc?.tags?.join(", ") || ""}
					placeholder="Tags"
					visible
					showLabel
				/>
				<DateInput
					slug="date"
					label="Date"
					onChange={(value) =>
						onUpdateProp("date", Timestamp.fromDate(new Date(value)))
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
				<CheckboxInput
					slug="published"
					label="Published"
					value={docUpdate.published || doc.published || false}
					onChange={(value) => onUpdateProp("published", value)}
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

export default PostSingle;
