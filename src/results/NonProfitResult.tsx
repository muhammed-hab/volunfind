import {NonProfit} from "./NonProfit";
import './NonProfitResult.css'
import {TimeTable} from "./timetable";
import {FilterPopup} from "../homescreen/filterpopup";
import {useState} from "react";

export function NonProfitResult(props: {nonprofit: NonProfit}) {
	const comp = props.nonprofit;
	const [mobilePopupVisible, setMobilePopupVisible] = useState(false);
	
	return (<>
		<div className="result result-widest">
			<div className="logo-and-url">
				<img src={comp.logoURL} alt={comp.name} />
				<a href={comp.url}>{comp.url}</a>
			</div>
			<div className="info-tbl">
				<div className="title-cat-volunteer">
					<h3>{comp.name}</h3>
					<h4>{comp.category}</h4>
					<a href="#" className="btn btn-green">Volunteer</a>
				</div>
				<TimeTable availability={comp.availability} />
			</div>
			<img className="sample-img" src={comp.imageURL} alt="Example volunteering image" />
			<p className="description">{comp.description}</p>
		</div>
		
		<div className="result result-wide">
			<div className="logo-url-img">
				<div className="logo-and-url">
					<img src={comp.logoURL} alt={comp.name} />
					<a href={comp.url}>{comp.url}</a>
				</div>
				<img className="sample-img" src={comp.imageURL} alt="Example volunteering image" />
			</div>
			<div className="info-tbl-desc">
				<div className="info-tbl">
					<div className="title-cat-volunteer">
						<h3>{comp.name}</h3>
						<h4>{comp.category}</h4>
						<a href="#" className="btn btn-green">Volunteer</a>
					</div>
					<TimeTable availability={comp.availability} />
				</div>
				<p className="description">{comp.description}</p>
			</div>
		</div>
		
		<div className="result result-mobile">
			<div className="details-and-img">
				<img src={comp.logoURL} alt={comp.name} />
				<h3>{comp.name}</h3>
				<h4>{comp.category}</h4>
				<a href={comp.url}>{comp.url}</a>
			</div>
			<TimeTable availability={comp.availability} />
			<div className="volunteer-btns">
				<a href="#" className="btn btn-dark-green" style={{marginRight: 'auto'}}
				   onClick={() => setMobilePopupVisible(true)}>Details</a>
				<a href="#" className="btn btn-green">Volunteer</a>
			</div>
			<FilterPopup visible={mobilePopupVisible} setVisible={setMobilePopupVisible} title={comp.name}>
				<div className="mobile-popup">
					<img className="sample-img" src={comp.imageURL} alt="Example volunteering image" />
					<p className="description">{comp.description}</p>
				</div>
			</FilterPopup>
		</div>
	</>);
}
