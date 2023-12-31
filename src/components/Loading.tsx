import { ActivityIndicator, View, StyleSheet } from "react-native";

export default function Loading() {
    return(
        <View style={styles.container}>
            <ActivityIndicator color="#7C3AED" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:"#252525",
    },
  });