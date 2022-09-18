import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { GameCard, type GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { styles } from "./styles";

export function Home() {
	const [games, setGames] = useState<GameCardProps[]>([]);

	const navigation = useNavigation();

	function handleOpenGaming({ id, title, bannerUrl }: GameCardProps) {
		navigation.navigate("game", { id, title, bannerUrl });
	}

	useEffect(() => {
		void fetch("http://192.168.0.100:3333/games")
			// eslint-disable-next-line promise/prefer-await-to-then
			.then(async (response) => response.json())
			// eslint-disable-next-line promise/prefer-await-to-then
			.then((data) => setGames(data));
	}, []);

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<Image source={logoImg} style={styles.logo} />

				<Heading title="Encontre seu duo!" subtitle="Selecione o game que deseja jogar..." />

				<FlatList
					data={games}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <GameCard data={item} onPress={() => handleOpenGaming(item)} />}
					showsHorizontalScrollIndicator={false}
					horizontal
					contentContainerStyle={styles.contentList}
				/>
			</SafeAreaView>
		</Background>
	);
}
