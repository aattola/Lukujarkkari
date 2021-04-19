import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';
import Logo from '../../assets/Logo4.png';

const Header = () => (
	<header class={style.header} style={{display: "grid", alignItems: "center", background: "white", borderBottom: "1px solid #00000055"}}>
    <img onClick={() => window.location = "https://jeffe.co"} src={Logo} style={{width: "38px", margin: "0px 20px", cursor: "pointer"}} alt="Logo" />
		{/* <nav>
			<Link activeClassName={style.active} href="/">Home</Link>
			<Link activeClassName={style.active} href="/profile">Me</Link>
			<Link activeClassName={style.active} href="/profile/john">John</Link>
		</nav> */}
	</header>
);

export default Header;
