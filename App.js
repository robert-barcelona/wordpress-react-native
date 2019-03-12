import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {onError} from 'apollo-link-error'

import {ApolloProvider} from "react-apollo"
import {ApolloClient} from "apollo-client"
import {ApolloLink} from 'apollo-boost'

import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';



import Posts from './components/Posts'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const errorLink = onError(({graphQLErrors}) => {
  if (graphQLErrors) graphQLErrors.map(({message}) => console.log(message))
})


const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache()
})


 componentDidMount = async() => {
  await Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  });
}

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Posts/>
        </View>
      </ApolloProvider>
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
