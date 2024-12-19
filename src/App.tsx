import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SelectedPage } from "@/shared/types";
import NavBar from "@/scenes/navbar";
import Home from "@/scenes/home";
import Benefits from "@/scenes/benefits";
import OurClasses from "@/scenes/ourClasses";
import Footer from "@/scenes/footer";
import AuthForm from "@/scenes/auth";

function App() {
	const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
	const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY === 0) {
				setIsTopOfPage(true);
				setSelectedPage(SelectedPage.Home);
			} else {
				setIsTopOfPage(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="flex flex-col min-h-screen">
			<Router>
				<NavBar
					isTopOfPage={isTopOfPage}
					selectedPage={selectedPage}
					setSelectedPage={setSelectedPage}
				/>

				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<Home setSelectedPage={setSelectedPage} />} />
						<Route path="/benefits" element={<Benefits setSelectedPage={setSelectedPage} />} />
						<Route path="/our-classes" element={<OurClasses setSelectedPage={setSelectedPage} />} />
						<Route path="/auth" element={<AuthForm />} />
					</Routes>
				</main>

				<Footer />
			</Router>
		</div>
	);
}

export default App;
