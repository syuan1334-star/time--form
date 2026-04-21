import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useForum } from '@/context/ForumContext';
import PostCard from '@/components/PostCard';

export default function MyPostsPage() {
  const { state } = useForum();

  // 获取当前用户的帖子（包括隐藏帖子）
  const myPosts = state.posts.filter((p) => p.authorId === state.currentUser?.id);

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <div className="retro-card m-4 p-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-retro-dark transition-colors mb-4 cursor-pointer"
        >
          <ArrowLeft size={20} />
          返回首页
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-4xl">{state.currentUser?.avatar}</span>
          <div>
            <h1 className="text-2xl font-bold text-retro-dark">我的帖子</h1>
            <p className="text-gray-500">
              共 {myPosts.length} 篇帖子
            </p>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto px-4">
        {myPosts.length > 0 ? (
          <div className="space-y-4">
            {myPosts.map((post) => (
              <PostCard key={post.id} post={post} showHidden={true} />
            ))}
          </div>
        ) : (
          <div className="retro-card p-12 text-center">
            <span className="text-6xl mb-4 block">📝</span>
            <h2 className="text-xl font-bold text-retro-dark mb-2">暂无帖子</h2>
            <p className="text-gray-500 mb-6">
              你还没有发布过帖子
            </p>
            <Link
              to="/editor"
              className="inline-block retro-button px-6 py-2 rounded font-medium text-retro-dark cursor-pointer"
            >
              ✏️ 发布帖子
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
