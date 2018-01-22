
import React from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {Feather} from '@expo/vector-icons';


export default class CurrentCarCallout extends React.Component {
  render() {
    const { name="My Car" } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.name}>
          <Text>{name}</Text>
          <Feather style={styles.editSymbol} name="edit-2" size={19} color="green" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  editSymbol: {
    marginLeft: 5
  },
  name: {
    alignItems: 'center',
    flexDirection: "row"
  }
})
