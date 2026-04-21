// 用户类型
export interface User {
  id: string;
  username: string;
  password: string;
  nickname: string;
  avatar: string;
  role: 'admin' | 'user';
  createdAt: string;
}

// 帖子类型
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  replies: Reply[];
  isHidden?: boolean;
  hiddenContent?: string;
}

// 回复类型
export interface Reply {
  id: string;
  postId: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  likes: number;
}

// 分类类型
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  postCount: number;
}

// 搜索结果类型
export interface SearchResult {
  posts: Post[];
  total: number;
}

// 登录表单
export interface LoginForm {
  username: string;
  password: string;
}

// 注册表单
export interface RegisterForm {
  username: string;
  password: string;
  nickname: string;
}

// 帖子表单
export interface PostForm {
  title: string;
  content: string;
  category: string;
  tags: string;
}

// 状态类型
export interface ForumState {
  currentUser: User | null;
  isAuthenticated: boolean;
  posts: Post[];
  categories: Category[];
  users: User[];
}
