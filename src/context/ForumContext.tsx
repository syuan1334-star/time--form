import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, Post, Category, ForumState } from '@/types';
import { defaultUsers, defaultPosts, defaultCategories, getStoredData, saveData } from '@/data/mockData';

// Action types
type Action =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER'; payload: User }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'UPDATE_POST'; payload: Post }
  | { type: 'DELETE_POST'; payload: string }
  | { type: 'ADD_REPLY'; payload: { postId: string; reply: Post['replies'][0] } }
  | { type: 'LIKE_POST'; payload: string }
  | { type: 'INCREMENT_VIEWS'; payload: string }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'INIT_DATA'; payload: { users: User[]; posts: Post[] } };

// 合并默认用户和存储的用户，确保新用户始终存在
const mergeUsers = (storedUsers: User[]): User[] => {
  // 强制使用默认用户数据，确保密码等信息最新
  const defaultUsernames = defaultUsers.map(u => u.username);
  const mergedUsers: User[] = [...defaultUsers]; // 先复制所有默认用户

  // 添加存储中独有的用户
  storedUsers.forEach(storedUser => {
    if (!defaultUsernames.includes(storedUser.username)) {
      mergedUsers.push(storedUser);
    }
  });
  
  return mergedUsers;
};

// Initial state
const initialState: ForumState = {
  currentUser: null,
  isAuthenticated: false,
  posts: [],
  categories: defaultCategories,
  users: [],
};

// Reducer
function forumReducer(state: ForumState, action: Action): ForumState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, currentUser: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, currentUser: null, isAuthenticated: false };
    case 'REGISTER':
      return {
        ...state,
        users: [...state.users, action.payload],
        currentUser: action.payload,
        isAuthenticated: true,
      };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.payload),
      };
    case 'ADD_REPLY':
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.payload.postId
            ? { ...p, replies: [...p.replies, action.payload.reply] }
            : p
        ),
      };
    case 'LIKE_POST':
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.payload ? { ...p, likes: p.likes + 1 } : p
        ),
      };
    case 'INCREMENT_VIEWS':
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id === action.payload ? { ...p, views: p.views + 1 } : p
        ),
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.payload.id ? action.payload : u)),
        currentUser: state.currentUser?.id === action.payload.id ? action.payload : state.currentUser,
      };
    case 'INIT_DATA':
      return {
        ...state,
        users: action.payload.users,
        posts: action.payload.posts,
      };
    default:
      return state;
  }
}

// Context
interface ForumContextType {
  state: ForumState;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string, nickname: string) => boolean;
  addPost: (title: string, content: string, category: string, tags: string[]) => void;
  updatePost: (post: Post) => void;
  deletePost: (postId: string) => void;
  addReply: (postId: string, content: string) => void;
  likePost: (postId: string) => void;
  incrementViews: (postId: string) => void;
  updateUser: (user: User) => void;
  searchPosts: (keyword: string) => Post[];
  getPostById: (id: string) => Post | undefined;
}

const ForumContext = createContext<ForumContextType | undefined>(undefined);

// Provider
export function ForumProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(forumReducer, initialState);

  // 初始化加载数据，合并默认用户确保新用户存在
  useEffect(() => {
    const { users } = getStoredData();
    const mergedUsers = mergeUsers(users);
    // 强制使用默认帖子数据，重置所有旧帖子
    const posts = defaultPosts;
    saveData(mergedUsers, posts);
    dispatch({ type: 'INIT_DATA', payload: { users: mergedUsers, posts } });
  }, []);

  // 保存数据到本地存储
  useEffect(() => {
    if (state.users.length > 0) {
      saveData(state.users, state.posts.length > 0 ? state.posts : defaultPosts);
    }
  }, [state.users, state.posts]);

  // 登录
  const login = (username: string, password: string): boolean => {
    const user = state.users.find((u) => u.username === username && u.password === password);
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
      return true;
    }
    return false;
  };

  // 注册
  const register = (username: string, password: string, nickname: string): boolean => {
    if (state.users.find((u) => u.username === username)) {
      return false;
    }
    const newUser: User = {
      id: Date.now().toString(),
      username,
      password,
      nickname,
      avatar: '👤',
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'REGISTER', payload: newUser });
    return true;
  };

  // 登出
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // 添加帖子
  const addPost = (title: string, content: string, category: string, tags: string[]) => {
    if (!state.currentUser) return;
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      authorId: state.currentUser.id,
      authorName: state.currentUser.nickname,
      category,
      tags,
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      replies: [],
    };
    dispatch({ type: 'ADD_POST', payload: newPost });
  };

  // 更新帖子
  const updatePost = (post: Post) => {
    dispatch({ type: 'UPDATE_POST', payload: { ...post, updatedAt: new Date().toISOString() } });
  };

  // 删除帖子
  const deletePost = (postId: string) => {
    dispatch({ type: 'DELETE_POST', payload: postId });
  };

  // 添加回复
  const addReply = (postId: string, content: string) => {
    if (!state.currentUser) return;
    const reply: Post['replies'][0] = {
      id: Date.now().toString(),
      postId,
      content,
      authorId: state.currentUser.id,
      authorName: state.currentUser.nickname,
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    dispatch({ type: 'ADD_REPLY', payload: { postId, reply } });
  };

  // 点赞帖子
  const likePost = (postId: string) => {
    dispatch({ type: 'LIKE_POST', payload: postId });
  };

  // 增加浏览量
  const incrementViews = (postId: string) => {
    dispatch({ type: 'INCREMENT_VIEWS', payload: postId });
  };

  // 更新用户
  const updateUser = (user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  // 搜索帖子
  const searchPosts = (keyword: string): Post[] => {
    if (!keyword.trim()) return state.posts;
    const lowerKeyword = keyword.toLowerCase();
    return state.posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerKeyword) ||
        post.content.toLowerCase().includes(lowerKeyword) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword)) ||
        post.authorName.toLowerCase().includes(lowerKeyword)
    );
  };

  // 获取帖子详情
  const getPostById = (id: string): Post | undefined => {
    return state.posts.find((post) => post.id === id);
  };

  return (
    <ForumContext.Provider
      value={{
        state,
        login,
        logout,
        register,
        addPost,
        updatePost,
        deletePost,
        addReply,
        likePost,
        incrementViews,
        updateUser,
        searchPosts,
        getPostById,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
}

// Hook
export function useForum() {
  const context = useContext(ForumContext);
  if (!context) {
    throw new Error('useForum must be used within a ForumProvider');
  }
  return context;
}
