import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";

export function CreateAdBanner() {
	return (
		<div className="bg-nlw-gradient mt-8 self-stretch overflow-hidden rounded-lg pt-1">
			<div className="flex items-center justify-between bg-[#2A2634] px-8 py-6">
				<div>
					<strong className="block text-2xl font-black text-white">Couldn't find your duo?</strong>
					<span className="block text-zinc-400">Publish an advertisement to find other players!</span>{" "}
				</div>

				<Dialog.Trigger className="flex items-center gap-3 rounded bg-violet-500 py-3 px-4 text-white hover:bg-violet-600">
					<MagnifyingGlassPlus size={24} />
					Publish ad
				</Dialog.Trigger>
			</div>
		</div>
	);
}
