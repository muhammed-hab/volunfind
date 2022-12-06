export const Dates =
	['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
export type DateType = typeof Dates[number];

export interface DayAvailability {from: number, to: number, checked: boolean}
export type Availability = {[key in DateType]: DayAvailability};

export namespace Availability {
	export const DefaultAvailability: {(): Availability} = () => ({
		friday: {checked: false, from: 10, to: 14},
		monday: {checked: false, from: 10, to: 14},
		saturday: {checked: false, from: 10, to: 14},
		sunday: {checked: false, from: 10, to: 14},
		thursday: {checked: false, from: 10, to: 14},
		tuesday: {checked: false, from: 10, to: 14},
		wednesday: {checked: false, from: 10, to: 14}
	});
	
	export function serialize(availability: Availability): string {
		return JSON.stringify(
			Object.entries(availability)
			      .filter(day => day[1].checked)
			      .map(day => [day[0], day[1].from, day[1].to])
		);
	}
	
	export function deserialize(availSerialized: string): Availability {
		return {
			...DefaultAvailability(),
			...Object.fromEntries(JSON.parse(availSerialized)
			                          .map((day: [string, number, number]) => [day[0],
				                          {checked: true, from: day[1], to: day[2]}]
			                          ))
		}
	}
	
	export function fmtTime(time: number) {
		if (time === 0) return 'Midnight'
		else if (time === 0.5) return '12:30am'
		else if (time === 12) return 'Noon'
		else if (time === 12.5) return '12:30pm'
		else return Math.floor(time % 12) + ((time % 1 === 0) ? ':00' : ':30')
		            + (time > 12 ? 'pm' : 'am');
	}
}
