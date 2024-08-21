import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 16px;
`;

export const PostCard = styled.div`
  background: #90EE90;
  border-radius: 4px;
  padding: 10px;
`;

export const PostTitle = styled.h2`
  font-size: 14px;
  margin: 0 0 8px;
`;

export const PostBody = styled.p`
  font-size: 12px;
  margin: 0;
`;

export const UserInfo = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 8px;
`;

export const Loading = styled.div`
  grid-column: span 4;
  text-align: center;
  font-size: 18px;
  color: #888;
`;
