import { Link } from 'react-router-dom';
import { Eye, Heart, MessageCircle, Tag, Lock, AlertTriangle } from 'lucide-react';
import { Post } from '@/types';
import { useForum } from '@/context/ForumContext';

interface PostCardProps {
  post: Post;
  showHidden?: boolean; // 搜索页面设为true以显示隐藏帖子
}

export default function PostCard({ post, showHidden = false }: PostCardProps) {
  const { state } = useForum();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const previewContent = post.content.slice(0, 150) + (post.content.length > 150 ? '...' : '');

  const isOwner = state.currentUser?.id === post.authorId;

  // 如果是隐藏帖子
  if (post.isHidden) {
    // 作者本人可以查看
    if (isOwner) {
      return (
        <article className="retro-card p-4 hover:scale-[1.01] transition-transform cursor-pointer border-2 border-amber-500/30">
          <Link to={`/post/${post.id}`} className="block">
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <h2 className="text-lg font-bold hover:text-amber-400 transition-colors line-clamp-2 text-amber-50 flex items-center gap-2">
                <Lock size={16} className="text-amber-500 shrink-0" />
                {post.title}
              </h2>
              <span className="shrink-0 px-2 py-1 bg-red-900/30 text-red-300 text-xs rounded border border-red-900/50">
                {post.category}
              </span>
            </div>

            {/* Content Preview */}
            <p className="text-amber-100/80 text-sm mb-3 line-clamp-3 leading-relaxed">
              {previewContent}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <Tag size={12} className="text-amber-700" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-amber-900/30 text-amber-300 text-xs rounded border border-amber-900/50 hover:bg-amber-800/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-amber-700 pt-3 border-t border-amber-900/30">
              <div className="flex items-center gap-3">
                <span className="font-medium text-amber-200">{post.authorName}</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Eye size={14} className="text-amber-700" />
                  <span className="text-amber-600">{post.views}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={14} className="text-red-600" />
                  <span className="text-red-500">{post.likes}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={14} className="text-amber-700" />
                  <span className="text-amber-600">{post.replies.length}</span>
                </span>
              </div>
            </div>
          </Link>
        </article>
      );
    }

    // 非作者：完全不显示
    return null;
  }

  // 正常帖子（非隐藏）
  return (
    <article className="retro-card p-4 hover:scale-[1.01] transition-transform cursor-pointer">
      <Link to={`/post/${post.id}`} className="block">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h2 className="text-lg font-bold hover:text-amber-400 transition-colors line-clamp-2 text-amber-50">
            {post.title}
          </h2>
          <span className="shrink-0 px-2 py-1 bg-red-900/30 text-red-300 text-xs rounded border border-red-900/50">
            {post.category}
          </span>
        </div>

        {/* Content Preview */}
        <p className="text-amber-100/80 text-sm mb-3 line-clamp-3 leading-relaxed">
          {previewContent}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Tag size={12} className="text-amber-700" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-amber-900/30 text-amber-300 text-xs rounded border border-amber-900/50 hover:bg-amber-800/40 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-amber-700 pt-3 border-t border-amber-900/30">
          <div className="flex items-center gap-3">
            <span className="font-medium text-amber-200">{post.authorName}</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye size={14} className="text-amber-700" />
              <span className="text-amber-600">{post.views}</span>
            </span>
            <span className="flex items-center gap-1">
              <Heart size={14} className="text-red-600" />
              <span className="text-red-500">{post.likes}</span>
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle size={14} className="text-amber-700" />
              <span className="text-amber-600">{post.replies.length}</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
