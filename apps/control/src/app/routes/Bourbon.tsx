import {
	Bourbon,
	getSingleDoc,
	updateSingleDoc,
	uploadImageFromLocal,
} from "@nx/firebase";
import {
	Button,
	ButtonColor,
	CheckboxInput,
	Container,
	H2,
	ImageInput,
	NumberInput,
	Section,
	TextInput,
} from "@nx/ui";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const BourbonSingle: React.FC = () => {
	const docType = "bourbons";
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [doc, setDoc] = useState<Partial<Bourbon>>();
	const [docUpdate, setDocUpdate] = useState<Partial<Bourbon>>({});

	useEffect(() => {
		if (!id) {
			setDoc({ id: "new" });
			return;
		}
		getSingleDoc(docType, id, (data) => setDoc(data as Bourbon));
	}, []);

	const onUpdateProp = (prop: string, value: any) => {
		setDocUpdate({ ...docUpdate, [prop]: value });
	};

	const onSave = async () => {
		if (doc && doc.id) {
			if (docUpdate.image && typeof docUpdate.image !== "string") {
				const imageUrl = await uploadImageFromLocal(docType, docUpdate.image);
				docUpdate.image = imageUrl + ".jpg";
			}
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
				<H2>{docUpdate.name || doc.name || ""}</H2>

				<TextInput
					slug="name"
					label="Name"
					value={docUpdate.name || doc.name || ""}
					onChange={(value) => onUpdateProp("name", value)}
					visible
					showLabel
				/>
				<ImageInput
					bucket={docType}
					alt={docUpdate.name || doc.name || ""}
					slug="image"
					label="Image"
					value={docUpdate.image || doc.image || ""}
					onChange={(value) => onUpdateProp("image", value)}
					visible
					width={30}
					height={30}
					showLabel
				/>
				<NumberInput
					slug="volume"
					label="Volume"
					value={docUpdate.volume || doc.volume || 0}
					onChange={(value) => onUpdateProp("volume", value)}
					step={0.01}
					visible
					showLabel
				/>
				<NumberInput
					slug="proof"
					label="Proof"
					value={docUpdate.proof || doc.proof || 0}
					onChange={(value) => onUpdateProp("proof", value)}
					step={0.01}
					visible
					showLabel
				/>
				<CheckboxInput
					slug="opened"
					label="Opened"
					value={docUpdate.opened || doc.opened || false}
					onChange={(value) => onUpdateProp("opened", value)}
					visible
					showLabel
				/>
				<CheckboxInput
					slug="finished"
					label="Finished"
					value={docUpdate.finished || doc.finished || false}
					onChange={(value) => onUpdateProp("finished", value)}
					visible
					showLabel
				/>
				<CheckboxInput
					slug="bottleAndBond"
					label="Bottle and Bond"
					value={docUpdate.bottleAndBond || doc.bottleAndBond || false}
					onChange={(value) => onUpdateProp("bottleAndBond", value)}
					visible
					showLabel
				/>
				<CheckboxInput
					slug="singleBarrel"
					label="Single Barrel"
					value={docUpdate.singleBarrel || doc.singleBarrel || false}
					onChange={(value) => onUpdateProp("singleBarrel", value)}
					visible
					showLabel
				/>
				<CheckboxInput
					slug="rye"
					label="Rye"
					value={docUpdate.rye || doc.rye || false}
					onChange={(value) => onUpdateProp("rye", value)}
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

export default BourbonSingle;
