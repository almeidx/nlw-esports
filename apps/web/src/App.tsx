import "./styles/main.css";

import { MagnifyingGlassPlus } from "phosphor-react";
import logoImg from "./assets/logo-nlw-esports.svg";

function App() {
	return (
		<div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
			<img src={logoImg} alt="NLW ESports Logo" />

			<h1 className="text-6xl text-white font-black mt-20">
				Your <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> is here.
			</h1>

			<div className="grid grid-cols-6 gap-6 mt-16">
				<a href="" className="relative rounded-lg overflow-hidden">
					<img src="/game-1.png" alt="" />

					<div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
						<strong className="font-bold text-white block">League of Legends</strong>
						<strong className="text-zinc-300 text-sm block">4 Advertisements</strong>
					</div>
				</a>

				<a href="" className="relative rounded-lg overflow-hidden">
					<img src="/game-2.png" alt="" />

					<div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
						<strong className="font-bold text-white block">Dota 2</strong>
						<strong className="text-zinc-300 text-sm block">4 Advertisements</strong>
					</div>
				</a>

				<a href="" className="relative rounded-lg overflow-hidden">
					<img src="/game-3.png" alt="" />

					<div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
						<strong className="font-bold text-white block">Counter-Strike: Global Offensive</strong>
						<strong className="text-zinc-300 text-sm block">4 Advertisements</strong>
					</div>
				</a>

				<a href="" className="relative rounded-lg overflow-hidden">
					<img src="/game-4.png" alt="" />

					<div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
						<strong className="font-bold text-white block">Apex Legends</strong>
						<strong className="text-zinc-300 text-sm block">4 Advertisements</strong>
					</div>
				</a>

				<a href="" className="relative rounded-lg overflow-hidden">
					<img src="/game-5.png" alt="" />

					<div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
						<strong className="font-bold text-white block">Fortnite</strong>
						<strong className="text-zinc-300 text-sm block">4 Advertisements</strong>
					</div>
				</a>

				<a href="" className="relative rounded-lg overflow-hidden">
					<img src="/game-6.png" alt="" />

					<div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
						<strong className="font-bold text-white block">World of Warcraft</strong>
						<strong className="text-zinc-300 text-sm block">4 Advertisements</strong>
					</div>
				</a>
			</div>

			<div className="pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8 overflow-hidden">
				<div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
					<div>
						<strong className="text-2xl text-white font-black block">Couldn't find your duo?</strong>
						<span className="text-zinc-400 block">Publish an advertisement to find other players!</span>{" "}
					</div>

					<button
						className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3"
						type="submit"
					>
						<MagnifyingGlassPlus size={24} />
						Publish ad
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
