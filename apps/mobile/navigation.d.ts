export interface GameParams {
	bannerUrl: string;
	id: string;
	title: string;
}

export declare global {
	namespace ReactNavigation {
		interface RootParamList {
			game: GameParams;
			home: undefined;
		}
	}
}
