import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { useForum } from '@/context/ForumContext';
import PostCard from '@/components/PostCard';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const { searchPosts } = useForum();
  const [results, setResults] = useState<ReturnType<typeof searchPosts>>([]);
  const keyword = searchParams.get('q') || '';

  useEffect(() => {
    if (keyword) {
      setResults(searchPosts(keyword));
    }
  }, [keyword, searchPosts]);

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
          <Search size={28} className="text-retro-blue" />
          <div>
            <h1 className="text-2xl font-bold text-retro-dark">搜索结果</h1>
            <p className="text-gray-500">
              关键词：<span className="font-medium text-retro-blue">"{keyword}"</span>
              <span className="ml-2">找到 {results.length} 条结果</span>
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-4">
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((post) => (
              <PostCard key={post.id} post={post} showHidden={true} />
            ))}
          </div>
        ) : (
          <div className="retro-card p-12 text-center">
            <span className="text-6xl mb-4 block">🔍</span>
            <h2 className="text-xl font-bold text-retro-dark mb-2">没有找到相关帖子</h2>
            <p className="text-gray-500 mb-6">
              尝试更换关键词，或浏览其他内容
            </p>
            <Link
              to="/"
              className="inline-block retro-button px-6 py-2 rounded font-medium text-retro-dark cursor-pointer"
            >
              返回首页
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
