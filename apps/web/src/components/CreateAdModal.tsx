/* eslint-disable no-alert */
/* eslint-disable unicorn/consistent-function-scoping */

import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import { useEffect, useState, type FormEvent } from "react";
import type { Game } from "../App";
import { Input } from "./form/Input";

export function CreateAdModal() {
	const [games, setGames] = useState<Game[]>([]);
	const [weekDays, setWeekDays] = useState<string[]>([]);
	const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		fetch("http://localhost:3333/games")
			// eslint-disable-next-line promise/prefer-await-to-then
			.then(async (games) => games.json() as Promise<Game[]>)
			// eslint-disable-next-line promise/prefer-await-to-then
			.then((games) => setGames(games));
	}, []);

	async function handleCreateAd(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData.entries());

		// TODO: Validate data
		if (!data.name || !data.game) {
			return;
		}

		try {
			await fetch(`http://localhost:3333/games/${data.game}/ads`, {
				body: JSON.stringify({
					name: data.name,
					yearsPlaying: Number(data.yearsPlaying),
					discord: data.discord,
					weekDays: weekDays.map(Number),
					hoursStart: data.hoursStart,
					hoursEnd: data.hoursEnd,
					useVoiceChannel,
				}),
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
			});

			alert("Ad created successfully!");
		} catch (error) {
			console.error(error);

			alert("Error creating ad!");
		}
	}

	return (
		<Dialog.Portal>
			<Dialog.Overlay className="fixed inset-0 bg-black/60" />

			<Dialog.Content className="fixed top-1/2 left-1/2 w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#2A2634] py-8 px-10 text-white shadow-lg shadow-black/25">
				<Dialog.Title className="text-3xl font-black">Publish an advertisement</Dialog.Title>

				<Dialog.Description>
					<form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<label htmlFor="game" className="font-semibold">
								Game name
							</label>

							<select
								id="game"
								name="game"
								className="appearance-none rounded bg-zinc-900 py-3 px-4 text-sm placeholder:text-zinc-500"
								defaultValue=""
							>
								<option disabled value="">
									Select the game you wish to play
								</option>

								{games.map((game) => (
									<option key={game.id} value={game.id}>
										{game.title}
									</option>
								))}
							</select>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="name">Your nickname</label>
							<Input id="name" name="name" placeholder="What's your in-game nickname?" />
						</div>

						<div className="grid grid-cols-2 gap-6">
							<div className="flex flex-col gap-2">
								<label htmlFor="yearsPlaying">Years playing</label>
								<Input
									id="yearsPlaying"
									name="yearsPlaying"
									placeholder="Amount of years you've played the game"
									type="number"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label htmlFor="discord">Your Discord</label>
								<Input id="discord" name="discord" placeholder="Username#0000" />
							</div>
						</div>

						<div className="flex gap-6">
							<div className="flex flex-col gap-2">
								<label htmlFor="weekDays">Week days of playtime</label>

								<ToggleGroup.Root
									type="multiple"
									value={weekDays}
									onValueChange={setWeekDays}
									className="grid grid-cols-4 gap-2"
								>
									<ToggleGroup.Item
										title="Sunday"
										value="0"
										className={`h-8 w-8 rounded-sm ${weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"}`}
									>
										S
									</ToggleGroup.Item>
									<ToggleGroup.Item
										title="Monday"
										value="1"
										className={`h-8 w-8 rounded-sm ${weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"}`}
									>
										M
									</ToggleGroup.Item>
									<ToggleGroup.Item
										title="Tuesday"
										value="2"
										className={`h-8 w-8 rounded-sm ${weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"}`}
									>
										T
									</ToggleGroup.Item>
									<ToggleGroup.Item
										title="Wednesday"
										value="3"
										className={`h-8 w-8 rounded-sm ${weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"}`}
									>
										W
									</ToggleGroup.Item>
									<ToggleGroup.Item
										title="Thursday"
										value="4"
										className={`h-8 w-8 rounded-sm ${weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"}`}
									>
										T
									</ToggleGroup.Item>
									<ToggleGroup.Item
										title="Friday"
										value="5"
										className={`h-8 w-8 rounded-sm ${weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"}`}
									>
										F
									</ToggleGroup.Item>
									<ToggleGroup.Item
										title="Saturday"
										value="6"
										className={`h-8 w-8 rounded-sm ${weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"}`}
									>
										S
									</ToggleGroup.Item>
								</ToggleGroup.Root>
							</div>

							<div className="flex flex-1 flex-col gap-2">
								<label htmlFor="weekDays">Time of the day</label>

								<div className="grid grid-cols-2 gap-2">
									<Input id="hoursStart" name="hoursStart" placeholder="From" type="time" />
									<Input id="hoursEnd" name="hoursEnd" placeholder="To" type="time" />
								</div>
							</div>
						</div>

						<label className="mt-2 flex items-center gap-2 text-sm">
							<Checkbox.Root
								onCheckedChange={(state) => setUseVoiceChannel(state === true)}
								checked
								className="h-6 w-6 rounded bg-zinc-900 p-1"
							>
								<Checkbox.Indicator>
									<Check className="h-4 w-4 text-emerald-400" />
								</Checkbox.Indicator>
							</Checkbox.Root>
							I usually connect to voice chats
						</label>

						<footer className="mt-4 flex justify-end gap-4">
							<Dialog.Close className="h-12 rounded-md bg-zinc-500 px-5 font-semibold hover:bg-zinc-600" type="button">
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
	);
}
