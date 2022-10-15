import {Availability} from "../Availability";

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
	export async function getNonProfits(availability: Availability, categories: string[]): Promise<NonProfit[]> {
		return [
			{
				logoURL: 'https://nordc.org/getattachment/About/Media-and-Marketing/NORD-Commission-text-Logo_v1KR.png/',
				availability: {
					saturday: {checked: true, from: 10, to: 14},
					sunday: {checked: true, from: 10, to: 14},
					monday: {checked: false, from: 0, to: 0},
					tuesday: {checked: false, from: 0, to: 0},
					wednesday: {checked: false, from: 0, to: 0},
					thursday: {checked: false, from: 0, to: 0},
					friday: {checked: false, from: 0, to: 0}
				},
				category: 'Recreational Center',
				description: "The New Orleans Recreation Development Commission offers recreation activities, classes, programs and special events for all ages at recreation centers, pools and playgrounds across New Orleans.",
				url: 'https://nordc.org/home/',
				name: 'NORDC',
				imageURL: 'https://nordc.org/getattachment/Activities/Outdoors/Canoeing-2.jpg/?lang=en-US&width=400&height=300'
			},
			{
				logoURL: 'https://1000logos.net/wp-content/uploads/2020/09/ASPCA-logo.png',
				description: 'Learn more about the ASPCA\'s work to rescue animals from abuse, pass humane laws and share resources with shelters nationwide. Join our fight today!',
				category: 'Animal Shelter',
				url: 'https://www.aspca.org/',
				name: 'ASPCA',
				availability: {
					saturday: {checked: true, from: 10, to: 14},
					sunday: {checked: true, from: 10, to: 14},
					monday: {checked: false, from: 0, to: 0},
					tuesday: {checked: true, from: 18, to: 21},
					wednesday: {checked: true, from: 18, to: 21},
					thursday: {checked: true, from: 17.5, to: 20.5},
					friday: {checked: false, from: 0, to: 0}
				},
				imageURL: 'https://www.dogtime.com/assets/uploads/2017/08/aspca-nyc-dogs-2-1280x720.jpg'
			}
		]
	}
}
