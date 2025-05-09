import { Category } from "@/services/categories";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CategoryScrollProps = {
  categories: Category[];
  selectedCategory: string | null;
  onSelect: (categoryId: string | null) => void;
};

export default function CategoryScroll({
  categories,
  selectedCategory,
  onSelect,
}: CategoryScrollProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() =>
              onSelect(selectedCategory === category.id ? null : category.id)
            }
            style={[
              styles.button,
              selectedCategory === category.id && styles.buttonActive,
            ]}
          >
            <MaterialCommunityIcons
              name={category.icon as any}
              size={20}
              color={selectedCategory === category.id ? "white" : "#256B5E"}
              style={styles.icon}
            />
            <Text
              style={[
                styles.text,
                selectedCategory === category.id && styles.textActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 4,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#E9F0E6",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#256B5E",
  },
  text: {
    color: "#256B5E",
    fontWeight: "500",
  },
  textActive: {
    color: "white",
  },
  icon: {
    marginRight: 6,
  },
});
