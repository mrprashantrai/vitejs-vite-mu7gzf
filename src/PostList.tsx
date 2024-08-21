import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, PostCard, PostTitle, PostBody, UserInfo, Loading } from './Posts.styled';

interface Post {
  id: number;
  title: string;
  userId: number;
  body: string;
  views: number;
  tags: [];
  reactions: Reaction[];
}

interface Reaction {
  likes: number;
  dislikes: number;
}

interface User {
  firstName: string;
  lastName: string;
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Map<number, User>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/posts');
        setPosts(response.data.posts.slice(0, 10));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const getUsers = async (userIds: number[]) => {
      try {
        const userPromises = userIds.map((userId) =>
          axios.get(`https://dummyjson.com/users/${userId}`).then(res => res.data)
        );
        const userResponses = await Promise.all(userPromises);
        const userMap = new Map<number, User>();
        userResponses.forEach((user: any) => {
          userMap.set(user.id, { firstName: user.firstName, lastName: user.lastName });
        });
        setUsers(userMap);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getPosts().then(() => {
      const userIds = [...new Set(posts.map(post => post.userId))];
      getUsers(userIds).finally(() => setLoading(false));
    });
  }, [posts]);

  return (
    <Container>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        posts.map((singlePost) => {
          const user = users.get(singlePost.userId);
          return (
            <PostCard key={singlePost.id}>
              <PostTitle>{singlePost.title}</PostTitle>
              <PostBody>{singlePost.body}</PostBody>
              {user && (
                <UserInfo>
                  <p>{user.firstName} {user.lastName}</p>
                </UserInfo>
              )}
            </PostCard>
          );
        })
      )}
    </Container>
  );
}

export default PostList;
