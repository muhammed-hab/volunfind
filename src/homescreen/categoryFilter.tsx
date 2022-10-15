import {useState} from "react";
import './categoryfilter.css';
import {Category} from "../Category";

export interface CategoryFilterProps {
	categories: Category[];
	setCategories: {(categories: Category[]): void}
}

export function CategoryFilter(props: CategoryFilterProps) {
	const {categories, setCategories} = props;
	
	const [catSearch, setCatSearch] = useState('');
	const validCategories = categories.filter(
		({category}) => category.toLowerCase().indexOf(catSearch.toLowerCase()) !== -1
	);
	function onCategoryChanged(index: number, checked: boolean) {
		const newCategories = [...categories];
		newCategories[index] = { ...categories[index], checked };
		setCategories(newCategories);
	}
	
	return (
		<section className="filter cat-filter">
			<div className="search-container">
				<input className="search" type="text" placeholder="Type to search..."
				       value={catSearch} onChange={ev => setCatSearch(ev.target.value)} />
			</div>
			
			<div style={{overflowY: 'auto'}}>
				{validCategories.map(({category, checked}, idx) => (
					<label key={category} className="category-item">
						<input type="checkbox" checked={checked}
						       onChange={ev => onCategoryChanged(idx, ev.target.checked)} />
						<div />
						
						<p>{category}</p>
					</label>
				))}
			</div>
		</section>
	)
}