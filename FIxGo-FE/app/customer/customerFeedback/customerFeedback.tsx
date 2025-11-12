import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CustomerFeedback() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Feedback</Text>
      <Text style={styles.subtitle}>Share your experience</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
});
