import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView } from 'react-native';
import Content from './Components/Content.js';
import Settings from './Components/Settings.js';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <Settings/>
      <Content/>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
});
