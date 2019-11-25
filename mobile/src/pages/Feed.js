import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';

import api from '../services/api';

import camera from '../assets/camera.png';
import send from '../assets/send.png';
import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedItem: {
    marginTop: 20,
  },
  feedItemHeader: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    color: '#000',
  },
  place: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15,
  },
  feedItemFooter: {
    paddingHorizontal: 15,
  },
  actions: {
    flexDirection: 'row',
  },
  action: {
    marginRight: 8,
  },
  likes: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    lineHeight: 18,
    color: '#000',
  },
  hashtags: {
    color: '#7159c1',
  },
});

function Feed({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('posts');
      setPosts(response.data);
    }
    loadData();
  }, []);

  function handleLike(id) {
    api.post(`/posts/${id}/like`);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={post => post._id}
        renderItem={({ item }) => (
          <View style={styles.feedItem}>
            <View style={styles.feedItemHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.name}>{item.author}</Text>
                <Text style={styles.place}>{item.place}</Text>
              </View>

              <Image source={more} />
            </View>

            <Image
              style={styles.feedImage}
              source={{ uri: `http://localhost:3333/files/${item.image}` }}
            />

            <View style={styles.feedItemFooter}>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.action}
                  onPress={() => handleLike(item._id)}
                >
                  <Image source={like} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={() => {}}>
                  <Image source={comment} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={() => {}}>
                  <Image source={send} />
                </TouchableOpacity>
              </View>

              <Text style={styles.likes}>{item.likes} curtidas</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.hashtags}>{item.hashtags}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

Feed.navigationOptions = ({ navigation }) => ({
  headerLeft: (
    <TouchableOpacity
      style={{ marginLeft: 20 }}
      onPress={() => navigation.navigate('New')}
    >
      <Image source={camera} />
    </TouchableOpacity>
  ),
  headerRight: (
    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => {}}>
      <Image source={send} />
    </TouchableOpacity>
  ),
});

export default Feed;
