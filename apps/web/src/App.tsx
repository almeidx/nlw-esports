import "./styles/main.css";

import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { useEffect, useState } from "react";
import logoImg from "./assets/logo-nlw-esports.svg";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";
import { Input } from "./components/form/Input.js";

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

				<Dialog.Portal>
					<Dialog.Overlay className="fixed inset-0 bg-black/60" />

					<Dialog.Content className="fixed top-1/2 left-1/2 w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#2A2634] py-8 px-10 text-white shadow-lg shadow-black/25">
						<Dialog.Title className="text-3xl font-black">Publish an advertisement</Dialog.Title>

						<Dialog.Description>
							<form className="mt-8 flex flex-col gap-4">
								<div className="flex flex-col gap-2">
									<label htmlFor="game" className="font-semibold">
										Game name
									</label>

									<Input id="game" placeholder="Select the game you wish to play" />
								</div>

								<div className="flex flex-col gap-2">
									<label htmlFor="name">Your nickname</label>
									<Input id="name" placeholder="What's your in-game nickname?" />
								</div>

								<div className="grid grid-cols-2 gap-6">
									<div className="flex flex-col gap-2">
										<label htmlFor="yearsPlaying">Years playing</label>
										<Input id="yearsPlaying" placeholder="Amount of years you've played the game" type="number" />
									</div>

									<div className="flex flex-col gap-2">
										<label htmlFor="discord">Your Discord</label>
										<Input id="discord" placeholder="Username#0000" />
									</div>
								</div>

								<div className="flex gap-6">
									<div className="flex flex-col gap-2">
										<label htmlFor="weekDays">Week days of playtime</label>

										<div className="grid grid-cols-4 gap-2">
											<button title="Sunday" type="button" className="h-8 w-8 rounded-sm bg-zinc-900 ">
												S
											</button>
											<button title="Monday" type="button" className="h-8 w-8 rounded-sm bg-zinc-900 ">
												M
											</button>
											<button title="Tuesday" type="button" className="h-8 w-8 rounded-sm bg-zinc-900 ">
												T
											</button>
											<button title="Wednesday" type="button" className="h-8 w-8 rounded-sm bg-zinc-900 ">
												W
											</button>
											<button title="Thursday" type="button" className="h-8 w-8 rounded-sm bg-zinc-900 ">
												T
											</button>
											<button title="Friday" type="button" className="h-8 w-8 rounded-sm bg-zinc-900 ">
												F
											</button>
											<button title="Saturday" type="button" className="h-8 w-8 rounded-sm bg-zinc-900 ">
												S
											</button>
										</div>
									</div>

									<div className="flex flex-1 flex-col gap-2">
										<label htmlFor="weekDays">Time of the day</label>

										<div className="grid grid-cols-2 gap-2">
											<Input id="hoursStart" placeholder="From" type="time" />
											<Input id="hoursEnd" placeholder="To" type="time" />
										</div>
									</div>
								</div>

								<div className="mt-2 flex gap-2 text-sm">
									<Input id="useVoiceChat" type="checkbox" />I usually use voice chat
								</div>

								<footer className="mt-4 flex justify-end gap-4">
									<Dialog.Close
										className="h-12 rounded-md bg-zinc-500 px-5 font-semibold hover:bg-zinc-600"
										type="button"
									>
										Cancel
									</Dialog.Close>

									<button
										className="flex h-12 items-center gap-3 rounded-md bg-violet-500 px-5 font-semibold hover:bg-violet-600"
										type="submit"
									>
										<GameController className="h-6 w-6" />
										Publish
									</button>
								</footer>
							</form>
						</Dialog.Description>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}

export default App;

interface Game {
	_count: {
		ads: number;
	};
	bannerUrl: string;
	id: string;
	title: string;
}
