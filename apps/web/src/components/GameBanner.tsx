interface GameBannerProps {
	adCount: number;
	bannerUrl: string;
	title: string;
}

export function GameBanner({ adCount, bannerUrl, title }: GameBannerProps) {
	return (
		<a
			href={`https://twitch.tv/directory/game/${encodeURIComponent(title)}`}
			className="relative overflow-hidden rounded-lg"
		>
			<img src={bannerUrl} alt="" />

			<div className="bg-game-gradient absolute inset-x-0 bottom-0 w-full px-4 pt-16 pb-4">
				<strong className="block font-bold text-white">{title}</strong>
				<strong className="block text-sm text-zinc-300">{adCount} Advertisement(s)</strong>
			</div>
		</a>
	);
}
