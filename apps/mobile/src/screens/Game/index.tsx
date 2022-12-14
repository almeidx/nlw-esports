import { Entypo } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { GameParams } from "../../../navigation";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { DuoCard, type DuoCardProps } from "../../components/DuoCard";
import { Heading } from "../../components/Heading";
import { THEME } from "../../theme";
import { styles } from "./styles";

export function Game() {
	const [duos, setDuos] = useState<DuoCardProps[]>([]);

	const navigation = useNavigation();
	const router = useRoute();
	const game = router.params as GameParams;

	function handleGoBack() {
		navigation.goBack();
	}

	useEffect(() => {
		void fetch(`http://192.168.0.100:3333/games/${game.id}/ads`)
			// eslint-disable-next-line promise/prefer-await-to-then
			.then(async (response) => response.json())
			// eslint-disable-next-line promise/prefer-await-to-then
			.then((data) => setDuos(data));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleGoBack}>
						<Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={24} />
					</TouchableOpacity>

					<Image source={logoImg} style={styles.logo} />

					<View style={styles.right} />
				</View>

				<Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />

				<Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

				<FlatList
					data={duos}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <DuoCard data={item} onConnect={() => {}} />}
					horizontal
					style={styles.containerList}
					contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
					showsHorizontalScrollIndicator
					ListEmptyComponent={<Text style={styles.emptyListText}>N??o h?? an??ncios publicados ainda.</Text>}
				/>
			</SafeAreaView>
		</Background>
	);
}
