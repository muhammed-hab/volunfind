export interface Category {
	category: string, checked: boolean
}
export namespace Category {
	export async function getAllCategories(): Promise<string[]> {
		return ['Animal Shelters', 'Food Banks',
		        'Hospitals', 'Recreational Centers',
		        'Sports Teams', 'Senior Centers',
		        'Item 2', 'Item 3'];
	}
	
	export function serialize(category: Category[]): string {
		return JSON.stringify(
			category.filter(cat => cat.checked).map(loc => loc.category)
		);
	}
}