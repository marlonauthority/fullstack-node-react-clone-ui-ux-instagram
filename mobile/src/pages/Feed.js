import React, { useState, useEffect, useCallback } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import io from 'socket.io-client';
import LazyImage from '../components/LazyImage';

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
  loading: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  imageUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfoText: {
    flexDirection: 'column',
    marginLeft: 10,
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
    marginTop: 15,
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
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    setLoading(true);

    const limit = 5;
    const { data } = await api.get('posts', {
      params: {
        page,
        limit,
      },
    });

    const totalItems = data.total;
    const newData = data.docs;

    setTotal(Math.floor(totalItems / limit));

    setFeed(shouldRefresh ? data.docs : [...feed, ...newData]);
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function registerToSocket() {
      const socket = io('http://localhost:3333');

      socket.on('post', newPost => {
        setFeed([newPost, ...feed]);
      });

      socket.on('like', likedPost => {
        setFeed(
          feed.map(post => (post._id === likedPost._id ? likedPost : post))
        );
      });
    }
    registerToSocket();
  }, [feed]);

  function handleLike(id) {
    api.post(`/posts/${id}/like`);
  }

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item._id));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={feed}
        keyExtractor={post => String(post._id)}
        // onEndReached={() => loadPage()}
        // onEndReachedThreshold={0.5}
        onViewableItemsChanged={handleViewableChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
        ListFooterComponent={
          loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="small" color="#000" />
            </View>
          )
        }
        onRefresh={refreshList}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <View style={styles.feedItem}>
            <View style={styles.feedItemHeader}>
              <View style={styles.userInfo}>
                <Image
                  style={styles.imageUserAvatar}
                  source={{
                    uri:
                      'https://api.adorable.io/avatars/50/abott@adorable.png',
                  }}
                />
                <View style={styles.userInfoText}>
                  <Text style={styles.name}>{item.author}</Text>
                  <Text style={styles.place}>{item.place}</Text>
                </View>
              </View>

              <Image source={more} />
            </View>

            <LazyImage
              shouldLoad={viewable.includes(item._id)}
              aspectRatio={item.aspectratio}
              smallSource={{
                uri: `http://localhost:3333/files/${item.imagesmall}`,
              }}
              source={{ uri: `http://localhost:3333/files/${item.image}` }}
            />

            {/* <Image
              style={styles.feedImage}
              source={{ uri: `http://localhost:3333/files/${item.image}` }}
            /> */}

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
