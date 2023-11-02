import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function FavScreen() {
  let array = ["Experiment 1", "Experiment 2", "Experiment 3", "Experiment 4", "Experiment 5"];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourites</Text>
      <View style={styles.separator} lightColor="#8AC83F" darkColor="#8AC83F" />
			<View></View>
      {array.map((item) => {
        return <Button mode='contained' key={item} style={styles.buttons} buttonColor="#8AC83F">{item}</Button>
      })}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
	buttons: {
		marginBottom: 10,
		width: '80%',
		borderColor: 'white',
		
	},
});
