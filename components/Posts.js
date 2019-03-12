import React, {Component} from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import {Container, Content, Icon, Left, Right, Body, Switch, List, ListItem, Text} from 'native-base';


import Post from './Post'


class Posts extends Component {
  POSTS_QUERY = gql`
      {
          posts {
              id
              title {
                  rendered
              }
          }
      }
  `


  styles = {
    container: {
      marginTop: '10%',
      backgroundColor: "white",
      width: '100%'
    },
    text: {
      alignSelf: "center",
      marginBottom: 7
    },
    mb: {
      marginBottom: 15
    }
  };

  state = {
    postID: null,
  }

  onPostClick = id => {
    this.setState({postID: id})
    console.log(id)
  }



  render() {

    const {POSTS_QUERY, styles, renderPostHTML, state: { postID}} = this


    return (<Query query={POSTS_QUERY}>
      {({loading, error, data}) => {
        if (loading) return <Text>Fetching</Text>
        if (error) return <Text>{error.toString()}</Text>


        const postsToRender = data.posts
        return (<Container style={styles.container}>
          <Content>
            <List
              dataArray={postsToRender}
              renderRow={post =>
                <ListItem button={true}
                          onPress={(e) => {
                            this.onPostClick(post.id)
                          }}
                >
                  <Left>
                    <Text>
                      {post.title.rendered}
                    </Text>
                  </Left>

                </ListItem>}
            />
            {postID && <Post id={postID}/>}
          </Content>
        </Container>)
      }}
    </Query>)


  }
}

export default Posts
