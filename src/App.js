import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';
import './Fonts.scss';

//Components
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

//Pages
import Forside from './components/pages/Forside';
import OmOs from './components/pages/OmOs';
import Services from './components/pages/Services';
import Faq from './components/pages/Faq';
import Nyheder from './components/pages/Nyheder';
import Kontakt from './components/pages/Kontakt';
import ScrollToTop from './components/ScrollToTop';
import UdvalgtNyhed from './components/pages/UdvalgtNyhed';

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<Navbar />
				<main>
					<Routes>
						<Route path='/' element={<Forside />} />
						<Route path='/om-os' element={<OmOs />} />
						<Route path='/services' element={<Services />} />
						<Route path='/faq' element={<Faq />} />
						<Route path='/nyheder' element={<Nyheder />} />
						<Route path='/nyhed-:nyhedId' element={<UdvalgtNyhed />} />
						<Route path='/kontakt' element={<Kontakt />} />
					</Routes>
				</main>
				<Footer />
				<ScrollToTop />
			</Router>
		</div>
	);
}

export default App;