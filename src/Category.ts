import {DBInterface} from "./DBInterface";

export interface Category {
	category: string, checked: boolean
}
export namespace Category {
	export async function getAllCategories(): Promise<string[]> {
		const db = await DBInterface.getDB();
		const categories = DBInterface.convertRowsToObjects(
			db.exec(`SELECT category FROM categories;`)[0]
		);
		return categories.map(({category}) => category);
	}
	
	export function serialize(category: Category[]): string {
		return JSON.stringify(
			category.filter(cat => cat.checked).map(loc => loc.category)
		);
	}
}