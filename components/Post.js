import React, {Component} from 'react'
import HTML from 'react-native-render-html';
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import {Card, CardItem, Text} from 'native-base';
import {Dimensions} from 'react-native';


class Post extends Component {



  POST_QUERY = gql`
     query ($id: ID!){
          post(id:$id) {
              date
              content {
                  rendered
              }
          }
      }
  `


  render() {
    const {id} = this.props
    return (<Query query={this.POST_QUERY} variables={{id}}>

      {({loading, error, data}) => {
        if (loading) return <Text>Loading...</Text>
        if (error) return <Text>{error.message}</Text>
        return <Card>
          <CardItem>
            <HTML html={data.post.content.rendered} imagesMaxWidth={Dimensions.get('window').width}/>
          </CardItem>
        </Card>
      }}
    </Query>)
  }

}


export default Post
