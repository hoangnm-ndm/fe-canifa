import { Category } from "./Category";

export interface Product {
	_id?: string;
	title: string;
	price: number;
	category?: Category | string;
	description?: string;
	thumbnail?: string;
	images?: string[];
	stock?: number;
	rate?: number;
	isHidden?: boolean;
}
