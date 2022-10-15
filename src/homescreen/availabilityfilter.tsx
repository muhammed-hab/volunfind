import './availabilityfilter.css';
import {DetailedHTMLProps, SelectHTMLAttributes} from "react";
import {Availability, Dates, DateType, DayAvailability} from "../Availability";
import fmtTime = Availability.fmtTime;

function StyledSelect(
	props: DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
) {
	return (
		<div className="styled-select">
			<select {...props}>{props.children}</select>
		</div>
	)
}

export interface AvailabilityFilterProps {
	availability: Availability,
	setAvailability: {(availability: Availability): void};
}

export function AvailabilityFilter(props: AvailabilityFilterProps) {
	function updateDay(day: DateType, newProps: Partial<DayAvailability>) {
		const replacementDay = {...props.availability[day], ...newProps};
		props.setAvailability({...props.availability, [day]: replacementDay});
	}
	
	const times = [...Array(48).keys()].map(t => t / 2);
	function timeOptions() {
		return times.map(time => (
			<option key={time} value={time}>{fmtTime(time)}</option>
		));
	}
	
	return (
		<section className="filter avail-filter">
			{Dates.map(day => (
				<label key={day} className="day-filter">
					<input type="checkbox" checked={props.availability[day].checked}
					       onChange={ev => updateDay(day, {checked: ev.target.checked})}/>
					<div />
					
					<div className={props.availability[day].checked ? "" : "avail-day-unchecked"}>
						<p className="filter-row-text">
							{day.substr(0, 1).toUpperCase() + day.substr(1)}
						</p>
						<div className="time-filter">
							<StyledSelect value={props.availability[day].from} onChange={ev => updateDay(day, {from: +ev.target.value, checked: true, to: Math.max(props.availability[day].to, +ev.target.value + 1)})}><>{timeOptions().slice(0, -2)}</></StyledSelect>
							<p className="filter-row-text">to</p>
							<StyledSelect value={props.availability[day].to} onChange={ev => updateDay(day, {to: +ev.target.value, checked: true, from: Math.min(props.availability[day].from, +ev.target.value - 1)})}><>{timeOptions().slice(2)}</></StyledSelect>
						</div>
					</div>
				</label>
			))}
		</section>
	)
}