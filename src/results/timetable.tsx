import {Availability, Dates, DateType} from "../Availability";
import './timetable.css';
import fmtTime = Availability.fmtTime;

export function TimeTable(props: {availability: Availability}) {
	const days = Object.entries(props.availability).sort((a, b) => Dates.indexOf(a[0] as DateType) - Dates.indexOf(b[0] as DateType))
	
	return (
		<div className="timetable">
			{days.map(([day, {checked, from, to}]) => (
				<div key={day} className="timetable-day">
					<p className="timetable-day-lbl">{day.at(0)!.toUpperCase() + day.substring(1, 3)}</p>
					<div className="timetable-time">
						{checked && (<>
							<p className="time">{fmtTime(from).replaceAll(/m$/g, '')}</p>
							<p className="desktop-to">to</p>
							<p className="mobile-to time">-</p>
							<p className="time">{fmtTime(to).replaceAll(/m$/g, '')}</p>
						</>) || (<p className="time">Closed</p>)}
					</div>
				</div>
			))}
			<div className="timetable-day mobile-extra-day">
				<p className="timetable-day-lbl">&nbsp;</p>
			</div>
		</div>
	)
}