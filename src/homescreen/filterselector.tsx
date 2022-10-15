import './filterselector.css';

export interface FilterSelectorProps {
	onFilterSelected(filter: 'category' | 'availability'): void;
}

export function FilterSelector(props: FilterSelectorProps) {
	return (
		<div>
			<h2 className="filter-selector-label">Click to select</h2>
			<div className="filter-selector">
				<a onClick={() => props.onFilterSelected('category')}>Locations</a>
				<a onClick={() => props.onFilterSelected('availability')}>Availability</a>
			</div>
		</div>
	)
}