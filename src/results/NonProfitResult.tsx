import {NonProfit} from "./NonProfit";
import './NonProfitResult.css'
import {TimeTable} from "./timetable";
import {FilterPopup} from "../homescreen/filterpopup";
import {useState} from "react";

const WIDE_TITLE_MAX_WIDTH = 460, NARROW_TITLE_MAX_WIDTH = 270,
	DESKTOP_NAME_SIZE = 30, DESKTOP_CAT_SIZE = 25;
const sizer = document.createElement('canvas').getContext('2d')!;

const MAX_ITERATIONS = 10;

export function NonProfitResult(props: {nonprofit: NonProfit}) {
	const comp = props.nonprofit;
	const [mobilePopupVisible, setMobilePopupVisible] = useState(false);
	
	
	function getTitleWidth(scale: number) {
		sizer.font = `550 ${DESKTOP_NAME_SIZE * scale}px Outfit`;
		const nameWidth = sizer.measureText(comp.name).width;
		sizer.font = `400 ${DESKTOP_CAT_SIZE * scale}px Outfit`;
		const catWidth = sizer.measureText(comp.category).width;
		return nameWidth + catWidth;
	}
	let wideTitleScale = 1;
	if (getTitleWidth(1) > WIDE_TITLE_MAX_WIDTH) {
		let lower = 0, upper = 1, iterations = 0;
		
		while (Math.abs(getTitleWidth(wideTitleScale) - WIDE_TITLE_MAX_WIDTH) > 20 &&
		       iterations++ < MAX_ITERATIONS) {
			wideTitleScale = (lower + upper) / 2;
			
			if (getTitleWidth(wideTitleScale) > WIDE_TITLE_MAX_WIDTH) upper = wideTitleScale;
			else lower = wideTitleScale;
		}
	}
	let narrowTitleScale = 1;
	if (getTitleWidth(1) > NARROW_TITLE_MAX_WIDTH) {
		let lower = 0, upper = 1, iterations = 0;
		
		while (Math.abs(getTitleWidth(narrowTitleScale) - NARROW_TITLE_MAX_WIDTH) > 20
					&& iterations++ < MAX_ITERATIONS) {
			narrowTitleScale = (lower + upper) / 2;
			
			if (getTitleWidth(narrowTitleScale) > NARROW_TITLE_MAX_WIDTH) upper = narrowTitleScale;
			else lower = narrowTitleScale;
		}
	}
	
	return (<>
		<div className="result result-widest">
			<div className="logo-and-url">
				<img src={comp.logoURL} alt={comp.name} />
				<a href={comp.url}>{comp.url}</a>
			</div>
			<div className="info-tbl">
				<div className="title-cat-volunteer">
					<h3 style={{fontSize: DESKTOP_NAME_SIZE * wideTitleScale,
						lineHeight: DESKTOP_NAME_SIZE * wideTitleScale + 'px'}}>{comp.name}</h3>
					<h4 style={{fontSize: DESKTOP_CAT_SIZE * wideTitleScale,
						lineHeight: DESKTOP_CAT_SIZE * wideTitleScale + 'px'}}>{comp.category}</h4>
					<a href="#" className="btn btn-green">Volunteer</a>
				</div>
				<TimeTable availability={comp.availability} />
			</div>
			{comp.imageURL ?
			 (<img className="sample-img" src={comp.imageURL} alt="Example volunteering image" />) :
			 (<div className="sample-img" />)
			}
			<p className="description">{comp.description.substring(0, 350)}
									   {comp.description.length > 350 && '...'}</p>
		</div>
		
		<div className="result result-wide">
			<div className="logo-url-img">
				<div className="logo-and-url">
					<img src={comp.logoURL} alt={comp.name} />
					<a href={comp.url}>{comp.url}</a>
				</div>
				{comp.imageURL ?
				 (<img className="sample-img" src={comp.imageURL} alt="Example volunteering image" />) :
				 (<div className="sample-img" />)
				}
			</div>
			<div className="info-tbl-desc">
				<div className="info-tbl">
					<div className="title-cat-volunteer">
						<h3 style={{fontSize: DESKTOP_NAME_SIZE * narrowTitleScale,
							lineHeight: DESKTOP_NAME_SIZE * narrowTitleScale + 'px'}}>{comp.name}</h3>
						<h4 style={{fontSize: DESKTOP_CAT_SIZE * narrowTitleScale,
							lineHeight: DESKTOP_CAT_SIZE * narrowTitleScale + 'px'}}>{comp.category}</h4>
						<a href="#" className="btn btn-green">Volunteer</a>
					</div>
					<TimeTable availability={comp.availability} />
				</div>
				<p className="description">{comp.description.substring(0, 400)}
					{comp.description.length > 400 && '...'}</p>
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
					{comp.imageURL &&
					 (<img className="sample-img" src={comp.imageURL} alt="Example volunteering image" />)}
					<p className="description">{comp.description}</p>
				</div>
			</FilterPopup>
		</div>
	</>);
}
