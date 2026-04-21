import { useForum } from '@/context/ForumContext';

export default function HotTopics() {
  const { state } = useForum();

  // 获取点赞最多的帖子
  const hotPosts = [...state.posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <aside className="retro-card p-4">
      <h3 className="text-lg font-bold text-retro-dark mb-4 flex items-center gap-2">
        🔥 热门帖子
      </h3>
      <ul className="space-y-3">
        {hotPosts.map((post, index) => (
          <li key={post.id}>
            <a
              href={`/post/${post.id}`}
              className="flex items-start gap-2 group"
            >
              <span
                className={`shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${
                  index < 3
                    ? 'bg-retro-red text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </span>
              <span className="text-sm text-gray-700 group-hover:text-retro-blue transition-colors line-clamp-2">
                {post.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
