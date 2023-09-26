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
import { Book, updateSingleDoc, uploadImageFromUrl } from "@nx/firebase";
import { Timestamp } from "firebase/firestore";

export const BooksBulk: React.FC = (props) => {
	const docType = "books";
	const [selected, setSelected] = useState<string[]>([]);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [docs, setDocs] = useState<Book[] | undefined>([]);

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
			const fixedResult: Book[] = result
				.map((doc) => ({
					...doc,
					id: doc.isbn,
					asin: doc.ASIN,
					pages: parseInt(doc.pages),
					pagesFinish: doc.dateFinish
						? parseInt(doc.pages)
						: parseInt(doc.pagesFinish),
					stars: parseInt(doc.stars),
					progress: doc.progress * 100,
					minutes: parseInt(doc.minutes),
					minutesFinish: parseInt(doc.minutesFinish),
					authors: doc.authors_name.split(", "),
					format: doc.format.toUpperCase(),
					// cover: doc.cover ? doc.cover.split(" ")[1].slice(1, -1) : "",
					dateStart: doc.dateStart
						? Timestamp.fromDate(new Date(doc.dateStart))
						: undefined,
					dateFinish: doc.dateFinish
						? Timestamp.fromDate(new Date(doc.dateFinish))
						: undefined,
					fiction: doc.fiction === "checked",
					own: doc.own === "checked",
					yearFinish: doc.dateFinish
						? parseInt(new Date(doc.dateFinish).getFullYear().toString())
						: undefined,
				}))
				.map((doc) => {
					if (!doc.dateFinish) delete doc.dateFinish;
					if (!doc.dateStart) delete doc.dateStart;
					if (!doc.yearFinish) delete doc.yearFinish;
					console.log(typeof doc.yearFinish);
					delete doc.moved;
					delete doc.authors_name;
					delete doc.authors_id;
					delete doc.ASIN;
					delete doc.review_attachments;
					delete doc["Goals"];
					if (!doc.url) delete doc.url;
					if (!doc.subtitle) delete doc.subtitle;
					if (!doc.post) delete doc.post;
					if (!doc.review) delete doc.review;
					if (!doc.url) delete doc.url;
					if (!doc.minutes) delete doc.minutes;
					if (!doc.minutesFinish) delete doc.minutesFinish;
					if (!doc.pages) delete doc.pages;
					if (!doc.pagesFinish) delete doc.pagesFinish;

					delete doc["Recommended By"];
					return doc;
				});

			setDocs(fixedResult);
			console.log(fixedResult);
		};
		reader.readAsText(file);
	};

	const onAdd = async (id: string) => {
		if (docs) {
			const doc = docs.find((doc) => doc.id === id);
			if (doc && doc.id) {
				if (doc.cover) {
					const parts = doc.cover.split(" ");
					// [1].slice(1, -1);

					console.log(doc.cover);
					const extension: string = parts[0].split(".").pop() || "jpg";
					const coverUrl = await uploadImageFromUrl(
						docType,
						parts[1].slice(1, -1),
						extension
					);
					doc.cover = coverUrl + "." + extension;
				}
				const { id, ...rest } = doc;
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
				<Heading title="Import Books CSV" />
				<FileInput slug="upload" value={selectedFile} onChange={onSelectFile} />
				<List
					docType={docType}
					items={
						(docs &&
							docs
								.sort((a, b) => {
									return (b.dateFinish || 0) > (a.dateFinish || 0) ? 1 : -1;
								})
								.map((doc) => {
									return {
										...doc,
										cover: `${docType}/${doc.cover}`,
									};
								})) ||
						[]
					}
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
							name: "title",
							label: "Title",
							order: 2,
							flex: 1,
						},
						{ name: "yearFinish", label: "Year Finish", order: 3 },
					]}
					selected={selected}
					setSelected={setSelected}
					onRemoveSelected={onRemoveSelected}
				/>
			</Section>
		</Container>
	);
};

export default BooksBulk;
