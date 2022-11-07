import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<Navbar />
				<main>
					<Routes>
						<Route path='' element={<Forside />} />
					</Routes>
				</main>
				<Footer />
			</Router>
		</div>
	);
}

export default App;


const Forside = () => {
	return <div style={{ height: "600px", backgroundColor: "grey" }}>

	</div>
}