export interface User {
	id?: number | string;
	email: string;
	password: string;
	confirmPass?: string;
	username: string;
}
