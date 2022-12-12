import {Availability, DateType} from "../Availability";
import {DBInterface} from "../DBInterface";

export interface NonProfit {
	logoURL: string,
	url: string,
	name: string,
	category: string,
	availability: Availability,
	description: string,
	imageURL: string
}

export namespace NonProfit {
	export async function getNonProfits(availability: Availability,
	                                    categories: string[]): Promise<NonProfit[]> {
		const db = await DBInterface.getDB();
		
		const availabilitySQLParams = Object.entries(availability).filter(([_, {checked}]) => checked)
			.map(([day, {from, to}]) => [day, from, to]).flat();
		
		const matches = DBInterface.convertRowsToObjects(db.exec(`
			SELECT * FROM nonprofits WHERE id in (
			  SELECT DISTINCT(times.nonprofitid) FROM
			    (SELECT * FROM times WHERE times.nonprofitid IN
			      (SELECT id FROM nonprofits WHERE nonprofits.category IN
			        (VALUES ${Array(categories.length).fill('(?)').join(',')}))
			  ) times JOIN
			    (WITH avail(day, start, end) AS
			    	(VALUES ${Array(availabilitySQLParams.length).fill('(?, ?, ?)').join(',')})
		        SELECT * from avail) avail
			      ON times.day=avail.day AND (avail.start <= times.end AND avail.end >= times.start)
			  ORDER BY
			  	MIN(avail.end, times.end) - MAX(avail.start, times.start) DESC,
			    times.start - avail.start DESC
			);
  		`, [categories, availabilitySQLParams].flat())[0]);
		
		const nonprofits = new Map<number, NonProfit>(
			matches.map(row => [row.id, {
				logoURL: row.logo_url,
				availability: Availability.DefaultAvailability(),
				category: row.category,
				description: row.description,
				url: row.home_url,
				name: row.name,
				imageURL: row.image_url
			}])
		);
		
		const times = DBInterface.convertRowsToObjects(
			db.exec(`SELECT * FROM times WHERE nonprofitid in
							(VALUES ${Array(matches.length).fill('(?)').join(',')});`,
					matches.map(row => row.id)
			)[0]
		);
		
		times.forEach(row => {
            nonprofits.get(row.nonprofitid)!.availability[row.day as DateType] =
	            {checked: true, from: row.start, to: row.end}
			}
		);
		return [...nonprofits.entries()].map(([, nonprofit]) => nonprofit);
	}
}
