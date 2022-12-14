import './header.css';
import Logo from '../assets/logo.png';
import MenuButton from '../assets/menu.svg';
import {FilterPopup} from "../homescreen/filterpopup";
import {useState} from "react";

export function Header() {
	const [visible, setVisible] = useState(false);
	return (
		<>
			<FilterPopup {...{visible, setVisible}} title="About">
				<div style={{width: '90vw', height: '80vh', overflow: 'scroll', fontWeight: 400}}>
					<p style={{marginTop: 0}}>Over the summer, I began volunteering at a food bank. However, this specific food bank was the one that everyone volunteered at simply because it was difficult for us to find other opportunities to have an impact on our community. As a result, there was an abundance of volunteers at that specific food bank and we frequently had nothing to do.</p>
					<p>Eventually, through the recommendation of a friend’s mom, I found NORDC, a place where I helped people learn to canoe at no cost. I enjoyed volunteering there and the place could definitely use more volunteers. I spent many days volunteering there, but then school started again and I had less time to contribute.</p>
					<p>I began thinking about other ways I could have an impact on my community even with a shortage of time, and eventually, I realized that if I can encourage others to volunteer by helping them find enjoyable places to volunteer at, I could greatly multiply my impact. Afterall, on any day, I myself could only volunteer 8 hours, but if I lead to 10 people volunteering for 8 hours, my impact would be much greater and I would be helping causes which were having trouble finding volunteers due to lack of awareness.</p>

					<p>I first started programming when I was 9 and throughout the years, I learned programming languages, techniques, logical reasoning, and program architecture from books and by searching up what I didn’t know. Throughout this process I developed a love for programming and computer science.</p>
					<p>Naturally, I began looking for a technical solution to help people find volunteering opportunities, and I had an idea to create this website where I would list volunteer opportunities in an easy to use, mobile friendly, user friendly manner. While websites listing volunteer opportunities already existed, to me, they were somewhat difficult to use and to find opportunities that interested me.</p>
					<p>I set out to improve this experience. I created a design using Figma, showed it to others, improved it based on their feedback, and then I created the website using React with an SQL backend. For now, I’ve been manually inputting nonprofits from various sources, but I hope to also automate this and allow nonprofits to directly list themselves in the future. I also plan on expanding my database to other cities as well after this.</p>
					<p>Through this website, I hope that I can make a positive impact on my community and help others do the same and make a positive impact on their community.</p>
					
					<strong>- Muhammed Habibovic</strong>
				</div>
			</FilterPopup>
			<header>
				<a href="/" className="header-box" style={{height: 36}}>
					<img style={{height: '100%'}} src={Logo} alt="Nolateer" />
					<p className="header-text" style={{marginLeft: 4}}>Nolateer</p>
				</a>
				<div />
				<div id="menu" style={{height: 40}}>
					<div id="mobileMenu" className="header-box" style={{width: 40, height: 40}}>
						<img src={MenuButton} alt="Menu" />
					</div>
					<div id="menuItems" className="header-box" style={{height: 30}}>
						<a className="header-text" href="#" onClick={() => setVisible(true)}>About</a>
					</div>
				</div>
			</header>
		</>
	)
}