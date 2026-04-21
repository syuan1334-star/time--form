import { Link } from 'react-router-dom';
import { useForum } from '@/context/ForumContext';
import PostCard from '@/components/PostCard';

export default function HomePage() {
  const { state } = useForum();

  // 隐藏的帖子ID（不在主页显示，但可通过搜索找到）
  const hiddenPostIds = ['4', '5', '6', '7', '8', '9'];
  
  // 过滤掉隐藏帖子后的帖子列表
  const visiblePosts = state.posts.filter(post => !hiddenPostIds.includes(post.id));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="retro-card m-4 p-8 text-center">
        <h1 className="text-3xl font-bold text-amber-200 mb-4">
          🌊 欢迎来到流水无涯
        </h1>
        <p className="text-amber-100/70 mb-6 max-w-2xl mx-auto leading-relaxed">
          世间奇闻，皆藏于市井巷陌；都市传说，尽显于灯火阑珊。
          <br />
          这里记录着被遗忘的故事，那些发生在你我身边的诡异与神秘。
        </p>
        {!state.isAuthenticated && (
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/login"
              className="retro-button px-6 py-2 rounded font-medium cursor-pointer"
            >
              登录
            </Link>
            <Link
              to="/register"
              className="retro-button px-6 py-2 rounded font-medium cursor-pointer"
            >
              注册
            </Link>
          </div>
        )}
      </section>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Posts List */}
          <main className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-amber-200 flex items-center gap-2">
                📝 最新帖子
              </h2>
              {state.isAuthenticated && (
                <Link
                  to="/editor"
                  className="retro-button px-4 py-2 rounded text-sm font-medium cursor-pointer"
                >
                  ✏️ 发布帖子
                </Link>
              )}
            </div>

            {visiblePosts.length > 0 ? (
              visiblePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="retro-card p-8 text-center">
                <p className="text-amber-700">暂无帖子，成为第一个发帖的人吧！</p>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Category List */}
            <div className="retro-card p-4">
              <h3 className="text-lg font-bold text-amber-200 mb-4 flex items-center gap-2">
                📁 版块分类
              </h3>
              <ul className="space-y-2">
                {state.categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/category/${category.id}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-black/40 transition-all cursor-pointer border border-transparent hover:border-red-900/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category.icon}</span>
                        <div>
                          <span className="text-sm font-medium text-amber-100">
                            {category.name}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-amber-600 bg-red-900/30 px-2 py-1 rounded border border-red-900/50">
                        {category.postCount}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hot Topics */}
            <div className="retro-card p-4">
              <h3 className="text-lg font-bold text-amber-200 mb-4 flex items-center gap-2">
                🔥 热门帖子
              </h3>
              <ul className="space-y-3">
                {[...visiblePosts]
                  .sort((a, b) => b.likes - a.likes)
                  .slice(0, 5)
                  .map((post, index) => (
                    <li key={post.id}>
                      <Link
                        to={`/post/${post.id}`}
                        className="flex items-start gap-2 group"
                      >
                        <span
                          className={`shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                            index < 3
                              ? 'bg-red-900/50 text-red-300 border border-red-700'
                              : 'bg-amber-900/30 text-amber-500 border border-amber-800'
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span className="text-sm text-amber-100/80 group-hover:text-amber-400 transition-colors line-clamp-2">
                          {post.title}
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
