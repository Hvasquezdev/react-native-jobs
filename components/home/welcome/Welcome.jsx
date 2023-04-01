import { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const JOB_TYPES = ["Full-time", "Part-time", "Contractor"];

const Welcome = ({ searchTerm = "", setSearchTerm, onSearch }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState(JOB_TYPES[0]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Hector!</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            placeholder="What are you looking for?"
            onChangeText={(text) => setSearchTerm?.(text)}
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => onSearch?.()}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={JOB_TYPES}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => setActiveJobType(item)}
            >
              <Text>{item}s</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
