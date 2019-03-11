import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native';
import HTML from 'react-native-render-html';

class Post extends Component {




  render() {
    const { post } = this.props

    return <View>

      <Text>{post.content.rendered}</Text>
    </View>

  }

}


export default Post
