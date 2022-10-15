import {ReactElement} from "react";
import './filterpopup.css'

export interface FilterPopupProps {
	children: ReactElement,
	visible: boolean,
	setVisible: {(visible: boolean): void},
	title: string
}
export function FilterPopup(props: FilterPopupProps) {
	return (
		<div className="popup" style={{display: props.visible ? 'grid' : 'none'}}>
			<div className="popup-shadow" onClick={() => props.setVisible(false)}/>
			<div className="popup-content">
				<div className="popup-header">
					<h2>{props.title}</h2>
					<a href="#" onClick={() => props.setVisible(false)}>Close</a>
				</div>
				{props.children}
			</div>
		</div>
	)
}