import React from "react";
import { TouchableOpacity, Image } from "react-native";

import styles from "./screenheader.style";

const ScreenHeaderBtn = ({
  iconUrl,
  dimension = "100%",
  onPress,
  style = {},
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.btnContainer,
        ...style,
      }}
      onPress={onPress}
    >
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
