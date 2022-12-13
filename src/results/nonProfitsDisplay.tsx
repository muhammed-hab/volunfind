import {Availability} from "../Availability";
import {Header} from "../header/header";
import {useEffect, useState} from "react";
import {NonProfit} from "./NonProfit";
import './nonProfitsDisplay.css';
import {NonProfitResult} from "./NonProfitResult";

export function NonProfitsDisplay(props: {availability: Availability, categories: string[]}) {
	const [nonProfits, setNonProfits] = useState<NonProfit[] | undefined>();
	
	useEffect(() => {
		NonProfit.getNonProfits(props.availability, props.categories).then(nonprofits => {
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
