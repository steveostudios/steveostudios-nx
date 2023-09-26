import {
	Book,
	BookFormat,
	getSingleDoc,
	updateSingleDoc,
	uploadImageFromLocal,
	uploadImageFromUrl,
} from "@nx/firebase";
import {
	Button,
	ButtonColor,
	CheckboxInput,
	Container,
	DateInput,
	H2,
	ImageInput,
	NumberInput,
	ProgressInput,
	RowBreak,
	Section,
	SelectInput,
	StarsInput,
	TextAreaInput,
	TextInput,
} from "@nx/ui";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { titleCase } from "../helpers/titlecase";

export const BookSingle: React.FC = () => {
	const docType = "books";
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [doc, setDoc] = useState<Partial<Book>>();
	const [docUpdate, setDocUpdate] = useState<Partial<Book>>({});
	const [importIsbn, setImportIsbn] = useState<string>("");
	const [progress, setProgress] = useState<number>(0);

	useEffect(() => {
		if (!id) {
			setDoc({ id: "new" });
			return;
		}
		getSingleDoc(docType, id, (data) => setDoc(data as Book));
	}, []);

	useEffect(() => {
		const format = docUpdate?.format || doc?.format;
		if (format !== "AUDIO") {
			if (!docUpdate.pagesFinish && (!doc || !doc.pagesFinish)) {
				setProgress(0);
				return;
			}
			setProgress(
				((docUpdate.pagesFinish || doc?.pagesFinish || 0) /
					(docUpdate.pages || doc?.pages || 0)) *
					100
			);
		} else {
			if (!docUpdate.minutesFinish && (!doc || !doc.minutesFinish)) {
				setProgress(0);
				return;
			}
			setProgress(
				((docUpdate.minutesFinish || doc?.minutesFinish || 0) /
					(docUpdate.minutes || doc?.minutes || 0)) *
					100
			);
		}
	}, [doc, docUpdate]);

	const onUpdateProp = (prop: string, value: any) => {
		setDocUpdate({ ...docUpdate, [prop]: value });
	};

	const onSave = async () => {
		if (doc && doc.id) {
			// needs Upload
			if (docUpdate.cover && typeof docUpdate.cover !== "string") {
				const coverUrl = await uploadImageFromLocal(docType, docUpdate.cover);
				docUpdate.cover = coverUrl + ".jpg";
			}
			// needs Fetch
			if (docUpdate.cover && docUpdate.cover.startsWith("http")) {
				const extension: string = docUpdate.cover.split(".").pop() || "jpg";
				const coverUrl = await uploadImageFromUrl(
					docType,
					docUpdate.cover,
					extension
				);
				docUpdate.cover = coverUrl + "." + extension;
			}
			await updateSingleDoc(docType, doc.id, { ...doc, ...docUpdate });
		}
		await navigate(`/${docType}`);
	};

	const onReset = () => {
		setDocUpdate({});
	};

	const onImportIsbn = () => {
		fetch(
			`https://openlibrary.org/api/books?bibkeys=ISBN:${importIsbn}&jscmd=data&format=json`
		)
			.then((response) => response.json())
			.then((data) => {
				const book = data[`ISBN:${importIsbn}`];
				setDocUpdate({
					title: titleCase(book.title),
					subtitle: book?.subtitle ? titleCase(book.subtitle) : "",
					asin: book?.identifiers?.amazon ? book.identifiers.amazon : "",
					authors: book.authors.map((author: any) => author.name),
					isbn: importIsbn,
					publishers: book.publishers.map((publisher: any) => publisher.name),
					pages: book.number_of_pages,
					cover: book.cover?.large,
				});
			});
	};

	if (!doc) return <div>Loading...</div>;
	return (
		<Container>
			<Section>
				<H2>{docUpdate?.title || doc.title}</H2>
				{doc.id === "new" && (
					<RowBreak>
						<TextInput
							label="Import by ISBN"
							slug="importisbn"
							onChange={setImportIsbn}
							value={importIsbn}
							placeholder="ISBN"
							visible
							showLabel
							onEnter={onImportIsbn}
						/>
						<Button
							slug="importisbn"
							onClick={onImportIsbn}
							icon="file-download"
							disabled={!importIsbn && importIsbn.length !== 13}
						/>
					</RowBreak>
				)}
				<ImageInput
					bucket={docType}
					alt={doc.title || ""}
					height={25}
					width={16.25}
					value={
						("cover" in docUpdate ? docUpdate.cover : doc?.cover || "") as any
					}
					onChange={(value) => onUpdateProp("cover", value)}
				/>
				<TextInput
					slug="title"
					label="Title"
					value={docUpdate.title || doc.title || ""}
					onChange={(value) => onUpdateProp("title", value)}
					visible
					showLabel
				/>
				<TextInput
					slug="subtitle"
					label="Subtitle"
					value={docUpdate.subtitle || doc.subtitle || ""}
					onChange={(value) => onUpdateProp("subtitle", value)}
					visible
					showLabel
				/>
				<TextInput
					label="Authors"
					slug="authors"
					onChange={(value) => onUpdateProp("authors", value.split(", "))}
					value={
						docUpdate.authors?.join(", ") || doc?.authors?.join(", ") || ""
					}
					placeholder="Authors"
					visible
					showLabel
				/>
				<RowBreak>
					<TextInput
						label="ISBN"
						slug="isbn"
						onChange={(value) => onUpdateProp("isbn", value)}
						value={docUpdate.isbn || doc?.isbn || ""}
						placeholder="ISBN"
						visible
						showLabel
					/>
					<TextInput
						label="ASIN"
						slug="asin"
						onChange={(value) => onUpdateProp("asin", value)}
						value={docUpdate.asin || doc?.asin || ""}
						placeholder="ASIN"
						visible
						showLabel
					/>{" "}
				</RowBreak>

				<SelectInput
					slug="format"
					label="Format"
					onChange={(value) => onUpdateProp("format", value)}
					value={docUpdate.format || doc.format || undefined}
					options={Object.entries(BookFormat).map(([key, val]) => ({
						name: val,
						id: key,
					}))}
					visible
					showLabel
				/>
				<RowBreak>
					{((docUpdate.format && docUpdate.format !== "AUDIO") ||
						(!docUpdate.format && doc.format !== "AUDIO")) && (
						<>
							<NumberInput
								slug="pagesFinish"
								label="Pages Finish"
								onChange={(value) => onUpdateProp("pagesFinish", value)}
								value={docUpdate.pagesFinish || doc?.pagesFinish || 0}
								max={docUpdate.pages || doc?.pages || 0}
								visible
								showLabel
							/>
							<span>/</span>
							<NumberInput
								slug="pages"
								label="Pages"
								onChange={(value) => onUpdateProp("pages", value)}
								value={docUpdate.pages || doc?.pages || 0}
								visible
							/>
						</>
					)}
					{((docUpdate.format && docUpdate.format === "AUDIO") ||
						(!docUpdate.format && doc.format === "AUDIO")) && (
						<>
							<NumberInput
								slug="minutesFinish"
								label="Minutes Finish"
								onChange={(value) => onUpdateProp("minutesFinish", value)}
								value={docUpdate.minutesFinish || doc?.minutesFinish || 0}
								visible
								showLabel
							/>
							<span>/</span>
							<NumberInput
								slug="minutes"
								label="Minutes"
								onChange={(value) => onUpdateProp("minutes", value)}
								value={docUpdate.minutes || doc?.minutes || 0}
								visible
							/>
							<NumberInput
								slug="pages"
								label="Pages"
								onChange={(value) => onUpdateProp("pages", value)}
								value={docUpdate.pages || doc?.pages || 0}
								visible
								showLabel
							/>
						</>
					)}
					<ProgressInput
						slug="progress"
						label="Progress"
						value={progress}
						visible
						showLabel
					/>
				</RowBreak>
				<RowBreak>
					<DateInput
						slug="dateStart"
						label="Date Start"
						onChange={(value) =>
							onUpdateProp("dateStart", Timestamp.fromDate(new Date(value)))
						}
						value={
							(docUpdate.dateStart &&
								docUpdate.dateStart.toDate().toISOString().split("T")[0]) ||
							(doc?.dateStart &&
								doc.dateStart.toDate().toISOString().split("T")[0]) ||
							""
						}
						visible
						showLabel
					/>
					<DateInput
						slug="dateFinish"
						label="Date Finish"
						onChange={(value) =>
							onUpdateProp(
								"dateFinish",
								value ? Timestamp.fromDate(new Date(value)) : ""
							)
						}
						value={
							(docUpdate.dateFinish &&
								docUpdate.dateFinish.toDate().toISOString().split("T")[0]) ||
							(doc?.dateFinish &&
								doc.dateFinish.toDate().toISOString().split("T")[0]) ||
							""
						}
						visible
						showLabel
					/>
					<NumberInput
						slug="yearFinish"
						label="Year Finish"
						onChange={() => false}
						value={
							(docUpdate.dateFinish &&
								docUpdate.dateFinish.toDate().getFullYear()) ||
							(doc.dateFinish && doc.dateFinish.toDate().getFullYear()) ||
							0
						}
						readonly
					/>
				</RowBreak>

				<StarsInput
					slug="stars"
					label="Stars"
					onChange={(value) => onUpdateProp("stars", value)}
					value={docUpdate.stars || doc?.stars || 0}
					visible
					showLabel
				/>
				<CheckboxInput
					slug="fiction"
					label="Fiction"
					onChange={(value) => onUpdateProp("fiction", value)}
					value={docUpdate.fiction || doc?.fiction || false}
					visible
					showLabel
				/>
				<CheckboxInput
					slug="own"
					label="Own"
					value={docUpdate.own || doc.own || false}
					onChange={(value) => onUpdateProp("own", value)}
					visible
					showLabel
				/>
				<TextInput
					slug="url"
					label="URL"
					onChange={(value) => onUpdateProp("url", value)}
					value={docUpdate.url || doc?.url || ""}
					placeholder="URL"
					visible
					showLabel
				/>
				<TextAreaInput
					slug="review"
					label="Review"
					value={docUpdate.review || doc.review || ""}
					onChange={(value) => onUpdateProp("review", value)}
					visible
					showLabel
				/>
				<TextInput
					slug="publishers"
					label="Publishers"
					onChange={(value) => onUpdateProp("publishers", value)}
					value={docUpdate.publishers || doc?.publishers || ""}
					placeholder="Publishers"
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

export default BookSingle;
