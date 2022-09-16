import "./styles/main.css";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import logoImg from "./assets/logo-nlw-esports.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { CreateAdModal } from "./components/CreateAdModal.js";
import { GameBanner } from "./components/GameBanner";

function App() {
	const [games, setGames] = useState<Game[]>([]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fetch("http://localhost:3333/games")
			// eslint-disable-next-line promise/prefer-await-to-then
			.then(async (games) => games.json() as Promise<Game[]>)
			// eslint-disable-next-line promise/prefer-await-to-then
			.then((games) => setGames(games));
	}, []);

	return (
		<div className="mx-auto my-20 flex max-w-[1344px] flex-col items-center">
			<img src={logoImg} alt="NLW ESports Logo" />

			<h1 className="mt-20 text-6xl font-black text-white">
				Your <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> is here.
			</h1>

			<div className="mt-16 grid grid-cols-6 gap-6">
				{games.map((game) => (
					<GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adCount={game._count.ads} />
				))}
			</div>

			<Dialog.Root>
				<CreateAdBanner />

				<CreateAdModal />
			</Dialog.Root>
		</div>
	);
}

export default App;

export interface Game {
	_count: {
		ads: number;
	};
	bannerUrl: string;
	id: string;
	title: string;
}
