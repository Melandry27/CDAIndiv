import BurgerMenu from "@/components/BurgerMenu";
import CategoryScroll from "@/components/CategoryScroll";
import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import { Category, getAllCategories } from "@/services/categories";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [leftMenuVisible, setLeftMenuVisible] = useState(false);
  const [rightMenuVisible, setRightMenuVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategories();
        setCategories(result);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Header
        onMenuPress={() => setLeftMenuVisible(true)}
        onProfilePress={() => setRightMenuVisible(true)}
      />

      <BurgerMenu
        visible={leftMenuVisible}
        onClose={() => setLeftMenuVisible(false)}
        side="left"
      />

      <BurgerMenu
        visible={rightMenuVisible}
        onClose={() => setRightMenuVisible(false)}
        side="right"
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Quel est votre mood du jour ? PROD SOUTENANCE TEST
        </Text>

        {loadingCategories ? (
          <ActivityIndicator
            size="large"
            color="#256B5E"
            style={{ marginTop: 50 }}
          />
        ) : (
          <>
            <CategoryScroll
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <MainContent selectedCategory={selectedCategory} />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FBF4",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2128",
    marginBottom: 12,
  },
  categoryContainer: {
    height: 50,
    marginBottom: 12,
  },
  categoryScroll: {
    paddingHorizontal: 4,
    alignItems: "center",
  },
  categoryButton: {
    backgroundColor: "#E9F0E6",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryButtonActive: {
    backgroundColor: "#256B5E",
  },
  categoryText: {
    color: "#256B5E",
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "white",
  },
  categoryIcon: {
    marginRight: 6,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#256B5E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#62745B",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
