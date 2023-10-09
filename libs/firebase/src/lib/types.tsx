import { Timestamp } from "firebase/firestore";

export enum DocType {
	RESUME = "RESUME",
	POST = "POST",
	PROJECT = "PROJECT",
	BOURBON = "BOURBON",
	BOOK = "BOOK",
}

interface Attachment {
	name: string;
	filename: string;
}

export interface Book {
	id: string;
	title: string;
	authors: string[];
	pages: number;
	pagesFinish: number;
	format: string;
	isbn: string;
	subtitle: string;
	publishers: string;
	dateFinish: Timestamp;
	dateStart: Timestamp;
	cover: string;
	fiction: boolean;
	stars: number;
	asin: string;
	yearFinish: number;
	own: boolean;
	progress: number;
	minutes: number;
	minutesFinish: number;
	url: string;
	review: string;
	docType: "BOOK";
}

export interface Resume {
	id: string;
	name: string;
	bio: string;
	visible: boolean;
	logo: string;
	docType: "RESUME";
}

export interface Post {
	id: string;
	title: string;
	content: string;
	date: Timestamp;
	logo: string;
	tags: string[];
	attachments: Attachment[];
	published: boolean;
	docType: "POST";
}

export interface Project {
	id: string;
	name: string;
	frontend: string[];
	backend: string[];
	host: string[];
	repo: string;
	hiddenRepo: boolean;
	url: string;
	client: string;
	content: string;
	apis: string[];
	date: Timestamp;
	docType: "PROJECT";
}

export interface Bourbon {
	id: string;
	name: string;
	bottleAndBond: boolean;
	opened: boolean;
	finished: boolean;
	proof: number;
	rye: boolean;
	singleBarrel: boolean;
	volume: number;
	image: string;
	docType: "BOURBON";
}

export enum BookFormat {
	PAPERBACK = "Paperback",
	HARDCOVER = "Hardcover",
	EBOOK = "Ebook",
	AUDIO = "Audio",
}

export type AnyDoc = Resume | Post | Project | Bourbon | Book;
