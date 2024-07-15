export interface Product {
	id?: number | string;
	title: string;
	price: number;
	description?: string;
	thumbnail?: string;
	images?: string[];
	stock?: number;
	rate?: number;
	isHidden?: boolean;
}
