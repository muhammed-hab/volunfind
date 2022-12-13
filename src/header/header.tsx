import './header.css';
import Logo from '../assets/logo.png';
import MenuButton from '../assets/menu.svg';

export function Header() {
	return (
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
					<a className="header-text" href="#">List&nbsp;a&nbsp;Nonprofit</a>
				</div>
			</div>
		</header>
	)
}