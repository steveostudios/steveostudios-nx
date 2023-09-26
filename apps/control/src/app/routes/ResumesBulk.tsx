import {
	Container,
	Section,
	List,
	Heading,
	ButtonColor,
	FileInput,
} from "@nx/ui";
import { useState } from "react";
import csvToJson from "csvtojson";
import { Resume, updateSingleDoc, uploadImageFromUrl } from "@nx/firebase";
import { uuidv4 } from "@firebase/util";

export const ResumesBulk: React.FC = () => {
	const docType = "resumes";
	const [selected, setSelected] = useState<string[]>([]);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [docs, setDocs] = useState<Resume[] | undefined>([]);

	const onSelectFile = (file: File | null) => {
		if (!file) {
			setSelectedFile(null);
			setDocs([]);
			return;
		}
		setSelectedFile(file);

		const reader = new FileReader();
		reader.onload = async (e) => {
			const text: string = e.target?.result as any as string;
			const result = await csvToJson().fromString(text);
			const fixedResult: Resume[] = result.map((doc, i) => ({
				...doc,
				id: uuidv4(),
			}));
			setDocs(fixedResult);
			console.log(fixedResult);
		};
		reader.readAsText(file);
	};

	const onAdd = async (id: string) => {
		if (docs) {
			console.log(docs);
			const doc = docs.find((doc) => doc.id === id);

			if (doc && doc.id) {
				console.log(doc.id);
				if (doc.logo) {
					const logo = doc.logo;
					const url = doc.logo.split(" ")[1].slice(1, -1);
					const extension = "png";
					const logoUrl = await uploadImageFromUrl(docType, url, extension);
					doc.logo = logoUrl + "." + extension;
					console.log({ logo, url, extension });
				}
				const { id, ...rest } = doc;
				console.log({ id, rest });
				updateSingleDoc(docType, "new", rest);
				setDocs(docs.filter((doc) => doc.id !== id));
			}
		}
	};

	const onRemove = async (id: string) => {
		if (docs) {
			const updatedDocs = docs.filter((doc) => doc.id !== id);
			setDocs(updatedDocs);
		}
	};

	const onRemoveSelected = () => {
		if (docs) {
			const updatedDocs = docs.filter((doc) => !selected.includes(doc.id));
			setDocs(updatedDocs);
		}
	};

	return (
		<Container>
			<Section>
				<Heading title="Import Resumes CSV" />
				<FileInput slug="upload" value={selectedFile} onChange={onSelectFile} />
				<List
					docType={docType}
					items={docs || []}
					rowOptions={[
						{
							slug: "add",
							icon: "plus",
							onClick: onAdd,
							color: ButtonColor.SUCCESS,
						},
						{
							slug: "remove",
							icon: "trash",
							onClick: onRemove,
							color: ButtonColor.DANGER,
						},
					]}
					columns={[
						{
							name: "name",
							label: "Name",
							order: 2,
							flex: 1,
						},
					]}
					selected={selected}
					setSelected={setSelected}
					onRemoveSelected={onRemoveSelected}
				/>
			</Section>
		</Container>
	);
};
