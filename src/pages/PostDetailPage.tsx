import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Eye, Trash2, Edit } from 'lucide-react';
import { useForum } from '@/context/ForumContext';

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, getPostById, addReply, likePost, deletePost, incrementViews } = useForum();
  const [replyContent, setReplyContent] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const post = getPostById(id || '');
  const isOwner = state.currentUser?.id === post?.authorId;

  useEffect(() => {
    if (id && post && isOwner) {
      incrementViews(id);
    }
  }, [id, post?.id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="retro-card p-8 text-center">
          <p className="text-gray-500">帖子不存在或已被删除</p>
          <Link to="/" className="text-retro-blue hover:underline mt-4 inline-block">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  // 非作者访问隐藏帖子：跳转到404
  if (post.isHidden && !isOwner) {
    navigate('/404');
    return null;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    if (!state.isAuthenticated) {
      navigate('/login');
      return;
    }
    addReply(post.id, replyContent);
    setReplyContent('');
  };

  const handleDelete = () => {
    if (state.currentUser?.id === post.authorId || state.currentUser?.role === 'admin') {
      deletePost(post.id);
      navigate('/');
    }
  };

  const handleLike = () => {
    if (!state.isAuthenticated) {
      navigate('/login');
      return;
    }
    likePost(post.id);
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-retro-dark transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
          返回
        </button>
      </div>

      {/* Post Content */}
      <article className="max-w-4xl mx-auto px-4 pt-4">
        <div className="retro-card p-6 mb-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="inline-block px-3 py-1 bg-retro-blue/10 text-retro-blue text-sm rounded mb-2">
                {post.category}
              </span>
              <h1 className="text-2xl font-bold text-retro-dark">{post.title}</h1>
            </div>
            {/* Actions */}
            {(state.currentUser?.id === post.authorId || state.currentUser?.role === 'admin') && (
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  to={`/editor/${post.id}`}
                  className="p-2 text-gray-500 hover:text-retro-blue transition-colors cursor-pointer"
                  title="编辑"
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                  title="删除"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-amber-800 mb-6 pb-4 border-b border-amber-900/30">
            <span className="font-medium text-amber-100">{post.authorName}</span>
            <span className="text-amber-700">{formatDate(post.createdAt)}</span>
            <span className="flex items-center gap-1">
              <Eye size={14} className="text-amber-700" />
              <span className="text-amber-700">{post.views} 浏览</span>
            </span>
            <span className="flex items-center gap-1">
              <Heart size={14} className="text-red-700" />
              <span className="text-red-600">{post.likes} 点赞</span>
            </span>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-red-900/30 text-red-300 text-sm rounded border border-red-900/50"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="prose prose-retro max-w-none">
            <div className="whitespace-pre-wrap text-amber-100/90 leading-relaxed">
              {post.isHidden && state.currentUser?.id !== post.authorId ? (
                <div className="bg-black/50 border border-red-900/50 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">🔒</div>
                  <p className="text-amber-200 mb-2">此内容已被下架</p>
                  <p className="text-amber-700 text-sm">如需查看完整内容，请联系发帖人或管理员</p>
                </div>
              ) : (
                (post.isHidden ? post.hiddenContent : post.content)?.split(/!\[.*?\]\(.*?\)/).map((part, i, arr) => {
                  const content = post.isHidden ? post.hiddenContent : post.content;
                  const match = content?.match(/!\[.*?\]\((.*?)\)/);
                  if (match && i < arr.length - 1) {
                    const imgSrc = match[1];
                    return (
                      <>
                        {part}
                        <div className="my-6 p-4 bg-black/40 rounded-lg border border-red-900/50 shadow-lg">
                          <img
                            src={imgSrc}
                            alt="帖子图片"
                            className="max-w-full mx-auto rounded"
                            style={{ maxHeight: '500px', objectFit: 'contain' }}
                          />
                        </div>
                      </>
                    );
                  }
                  return part;
                })
              )}
            </div>
          </div>

          {/* Like Button */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-4 py-2 retro-button rounded cursor-pointer"
            >
              <Heart size={18} className={state.isAuthenticated ? 'text-retro-red' : ''} />
              点赞 {post.likes}
            </button>
          </div>
        </div>

        {/* Replies */}
        <div className="retro-card p-6 mb-6">
          <h2 className="text-lg font-bold text-amber-100 mb-4">
            💬 回复 ({post.replies.length})
          </h2>

          {post.replies.length > 0 ? (
            <div className="space-y-4">
              {post.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="p-4 bg-black/30 rounded border border-amber-900/30"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-amber-200">{reply.authorName}</span>
                    <span className="text-xs text-amber-700">{formatDate(reply.createdAt)}</span>
                  </div>
                  <p className="text-amber-100/80 whitespace-pre-wrap">{reply.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-amber-700 text-center py-4">暂无回复</p>
          )}
        </div>

        {/* Reply Form */}
        <div className="retro-card p-6">
          <h2 className="text-lg font-bold text-amber-100 mb-4">发表评论</h2>

          {state.isAuthenticated ? (
            <form onSubmit={handleReply}>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="retro-input w-full p-4 rounded min-h-[120px] resize-y"
                placeholder="请输入您的回复..."
              />
              <button
                type="submit"
                className="retro-button px-6 py-2 rounded font-medium mt-4 cursor-pointer"
              >
                发布回复
              </button>
            </form>
          ) : (
            <div className="text-center py-6">
              <p className="text-amber-700 mb-4">登录后才能发表评论</p>
              <Link
                to="/login"
                className="inline-block retro-button px-6 py-2 rounded font-medium cursor-pointer"
              >
                登录
              </Link>
            </div>
          )}
        </div>
      </article>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="retro-card p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-retro-dark mb-4">确认删除</h3>
            <p className="text-gray-600 mb-6">确定要删除这篇帖子吗？此操作不可撤销。</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="retro-button px-4 py-2 rounded cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
