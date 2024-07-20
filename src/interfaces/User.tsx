export interface User {
	_id?: number | string;
	email: string;
	password: string;
	confirmPass?: string;
	username?: string;
	role: string;
}
