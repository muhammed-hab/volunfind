import {DBInterface} from "./DBInterface";

export interface Category {
	category: string, checked: boolean
}
export namespace Category {
	let categories: string[] | undefined;
	
	export async function getAllCategories(): Promise<string[]> {
		if (categories !== undefined) return categories;
		else {
			const db = await DBInterface.getDB();
			return (
				categories = DBInterface.convertRowsToObjects(
					db.exec(`SELECT category FROM categories;`)[0]
				)
                    .map(({category}) => category)
			);
		}
	}
	
	export function serialize(category: Category[]): string {
		return JSON.stringify(
			category.filter(cat => cat.checked).map(loc => loc.category)
		);
	}
}