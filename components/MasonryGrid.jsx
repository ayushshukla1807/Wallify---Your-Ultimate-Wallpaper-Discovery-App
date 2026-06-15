import React from "react";
import { Platform, ScrollView, View, StyleSheet } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";

export default function MasonryGrid(props) {
  if (Platform.OS === "web") {
    const { data = [], renderItem, keyExtractor, ListEmptyComponent } = props;
    if (data.length === 0 && ListEmptyComponent) {
      return <View style={styles.emptyWrapper}>{ListEmptyComponent}</View>;
    }

    const col1 = [];
    const col2 = [];
    data.forEach((item, index) => {
      if (index % 2 === 0) {
        col1.push(item);
      } else {
        col2.push(item);
      }
    });

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.webContainer}
      >
        <View style={styles.webColumn}>
          {col1.map((item, idx) => (
            <View key={keyExtractor ? keyExtractor(item) : idx}>
              {renderItem({ item, i: idx * 2 })}
            </View>
          ))}
        </View>
        <View style={styles.webColumn}>
          {col2.map((item, idx) => (
            <View key={keyExtractor ? keyExtractor(item) : idx}>
              {renderItem({ item, i: idx * 2 + 1 })}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  return <MasonryList {...props} />;
}

const styles = StyleSheet.create({
  webContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingBottom: 20,
    width: "100%",
  },
  webColumn: {
    flex: 1,
    flexDirection: "column",
  },
  emptyWrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
