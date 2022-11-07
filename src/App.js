import './App.scss';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
	return (
		<div className="App">
			<Header />
			<Navbar />
			<main>
				{/* Routes here */}
				<Forside />
			</main>
			<Footer />
		</div>
	);
}

export default App;


const Forside = () => {
	return <div style={{ height: "600px", backgroundColor: "grey" }}>

	</div>
}