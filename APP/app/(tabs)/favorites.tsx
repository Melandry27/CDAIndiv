import FavoriteCard from "@/components/FavoriteCard";
import { API_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
} from "react-native";

export default function FavoritesScreen() {
	const { user } = useAuth();
	const [favorites, setFavorites] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useFocusEffect(
		useCallback(() => {
			const fetchFavorites = async () => {
				try {
					setLoading(true);
					const res = await axios.get(
						`${API_URL}/favorites/user/${user?.userId}`,
					);
					setFavorites(res.data);
				} catch (err) {
					console.error("Erreur chargement favoris", err);
				} finally {
					setLoading(false);
				}
			};

			fetchFavorites();
		}, [user?.userId]),
	);

	if (loading) {
		return (
			<SafeAreaView style={styles.center}>
				<ActivityIndicator size="large" color="#256B5E" />
				<Text style={styles.loadingText}>Chargement des favoris...</Text>
			</SafeAreaView>
		);
	}

	if (!favorites.length) {
		return (
			<SafeAreaView style={styles.center}>
				<Text style={styles.emptyText}>
					Vous n&apos;avez pas encore de favoris.
				</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Mes Favoris</Text>
			<FlatList
				data={favorites}
				keyExtractor={(item) => item.exercise.id}
				renderItem={({ item }) => <FavoriteCard item={item.exercise} />}
				contentContainerStyle={styles.list}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8FBF4",
		padding: 32,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#256B5E",
		marginBottom: 16,
		textAlign: "center",
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F8FBF4",
	},
	loadingText: {
		marginTop: 12,
		fontSize: 16,
		color: "#256B5E",
	},
	emptyText: {
		fontSize: 16,
		color: "#62745B",
		textAlign: "center",
		paddingHorizontal: 20,
	},
	list: {
		padding: 24,
	},
});
