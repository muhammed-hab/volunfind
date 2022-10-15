import {Header} from "../header/header";
import './homescreen.css';
import {useEffect, useState} from "react";
import {Category} from "../Category";
import {CategoryFilter, CategoryFilterProps} from "./categoryFilter";
import {FilterSelector} from "./filterselector";
import {FilterPopup} from "./filterpopup";
import {Availability} from "../Availability";
import {AvailabilityFilter, AvailabilityFilterProps} from "./availabilityfilter";

function numberWithCommas(x: number) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

interface FiltersProps extends AvailabilityFilterProps, CategoryFilterProps {}

export function MobileFilters(props: FiltersProps) {
	const [visibleFilter, setVisibleFilter] = useState<'category' | 'availability' | undefined>();
	
	return (<section className="hide-mobile">
		<FilterSelector onFilterSelected={setVisibleFilter} />
		<FilterPopup visible={visibleFilter === 'category'} title={'Location'}
		             setVisible={visible => setVisibleFilter(visible ? 'category' : undefined)}>
			<CategoryFilter {...props} />
		</FilterPopup>
		<FilterPopup visible={visibleFilter === 'availability'} title={'Availability'}
		             setVisible={visible => setVisibleFilter(visible ? 'availability' : undefined)}>
			<AvailabilityFilter {...props} />
		</FilterPopup>
	</section>)
}

export function WebFilters(props: FiltersProps) {
	return (
		<section className="filters-web hide-web">
			<div className="filters-web-filter">
				<h2>Locations</h2>
				<div style={{paddingBottom: 0}}>
					<CategoryFilter {...props} />
				</div>
			</div>
			<div className="filters-web-filter">
				<h2>Availability</h2>
				<div>
					<AvailabilityFilter {...props} />
				</div>
			</div>
		</section>
	)
}

export function Homescreen(props: {categories?: string[], availability?: Availability}) {
	
	const [usage, setUsage] = useState({ people: 123, hours: 13034 });
	const [categories, setCategories] = useState([{category: 'Loading...', checked: false}]);
	
	useEffect(() => {
		Category.getAllCategories().then(allCats => {
			const selectedCats = new Set(props.categories || allCats);
			setCategories(
				allCats.map(category => ({category, checked: selectedCats.has(category)}))
			);
		});
	}, []);
	
	const [availability, setAvailability] =
		useState(props.availability || Availability.DefaultAvailability);
	
	function redirectToResults() {
		const categoriesMin = encodeURIComponent(Category.serialize(categories));
		const availMin = encodeURIComponent(Availability.serialize(availability));
		window.location.assign(`?categories=${categoriesMin}&availability=${availMin}&page=results`);
	}
	
	return (
		<div className="main-content">
			<Header />
			<div className="home-screen">
				<h1>Find Volunteer Opportunities that match your interests and schedule!</h1>
				<section className="volunteer-counter">
					<span>{numberWithCommas(usage.people)}</span> people
					have contributed <span>{numberWithCommas(usage.hours)}</span> hours!
				</section>
				<MobileFilters {...{categories, setCategories, availability, setAvailability}} />
				<WebFilters {...{categories, setCategories, availability, setAvailability}} />
				<a href="#" className="search-btn" onClick={redirectToResults}>Search</a>
			</div>
		</div>
	)
	
}