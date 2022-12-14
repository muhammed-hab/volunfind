import {Availability} from "../Availability";
import {Header} from "../header/header";
import {useEffect, useState} from "react";
import {NonProfit} from "./NonProfit";
import './nonProfitsDisplay.css';
import {NonProfitResult} from "./NonProfitResult";
import {Category} from "../Category";

export function NonProfitsDisplay(props: {availability: Availability, categories: string[]}) {
	const [nonProfits, setNonProfits] = useState<NonProfit[] | undefined>();
	const [optionsExpanded, setOptionsExpanded] = useState(false);
	
	useEffect(() => {
		NonProfit.getNonProfits(props.availability, props.categories).then(async (nonprofits) => {
			if (nonprofits.length === 0) {
				setOptionsExpanded(true);
				
				const expandedAvailability = Object.fromEntries(
					Object.entries(props.availability)
					      .map(([day, avail]) =>
						           [day, avail.checked ? {checked: true, from: 0, to: 23.5} : avail])
				) as Availability;
				const expandedCategories = await Category.getAllCategories();
				nonprofits = await NonProfit.getNonProfits(expandedAvailability, expandedCategories);
			}
			// Not using sort method to avoid also messing with db sorting
			setNonProfits(nonprofits.filter(({imageURL}) => imageURL)
			                        .concat(nonprofits.filter(({imageURL}) => !imageURL)));
		});
	}, []);
	
	function editSearch() {
		const catsMin = encodeURIComponent(JSON.stringify(props.categories));
		const availMin = encodeURIComponent(Availability.serialize(props.availability));
		window.location.assign(`?categories=${catsMin}&availability=${availMin}&page=search`);
	}
	
	if (nonProfits === undefined) {
		return (
			<div className="main-content">
				<Header />
				<h2 className="nonprofits-loading">Loading Results...</h2>
			</div>
		);
	} else {
		return (
			<div className="main-content result-content">
				<Header />
				<div className="nonprofits-results">
					<div className="results-header">
						<h2 className="results-title">Results</h2>
						<a href="#" className="btn btn-blue" onClick={editSearch}>Edit Search</a>
					</div>
					{optionsExpanded && (<p className="error-msg" style={{fontSize: 14}}>
						There were no matches for your availability and interests,
						so the search criteria was expanded to all categories at any time on your
						selected days. You can also edit your search using the button above.
					</p>)}
					<div className="results-list">
						{nonProfits.map((nonprofit, idx) =>
							                <NonProfitResult nonprofit={nonprofit} key={idx} />
						)}
					</div>
				</div>
			</div>
		)
	}
}
