import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
const Realm = require('realm');

export class App extends Component {

componentDidMount() {
  const CarSchema = {
    name: 'Car',
    properties: {
      make:  'string',
      model: 'string',
      miles: {type: 'int', default: 0},
    }
  };
  const PersonSchema = {
    name: 'Person',
    properties: {
      name:     'string',
      birthday: 'date',
      cars:     'Car[]', // a list of Cars
      picture:  'data?'  // optional property
    }
  };
  Realm.open({schema: [CarSchema, PersonSchema]})
    .then(realm => {
      // Create Realm objects and write to local storage
      realm.write(() => {
        const myCar = realm.create('Car', {
          make: 'Honda',
          model: 'Civic',
          miles: 1000,
        });
        // myCar.miles += 20; // Update a property value
      console.log("Mycar", {myCar: myCar.make})
      });

      // Query Realm for all cars with a high mileage
      const cars = realm.objects('Car').filtered('miles > 1000');

      // Will return a Results object with our 1 car
      cars.length // => 1

      // Add another car
      realm.write(() => {
        const myCar = realm.create('Car', {
          make: 'Ford',
          model: 'Focus',
          miles: 2000,
        });
      });

      // Query results are updated in realtime
      cars.length // => 2

      // Remember to close the realm when finished.
      realm.close();
    })
    .catch(error => {
      console.log(error);
    });
}

render(){
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
