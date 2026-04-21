import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { useForum } from '@/context/ForumContext';

export default function EditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, addPost, updatePost, getPostById } = useForum();
  
  const existingPost = id ? getPostById(id) : undefined;
  
  const [title, setTitle] = useState(existingPost?.title || '');
  const [content, setContent] = useState(existingPost?.content || '');
  const [category, setCategory] = useState(existingPost?.category || state.categories[0]?.name || '');
  const [tags, setTags] = useState(existingPost?.tags.join(', ') || '');
  const [error, setError] = useState('');

  const isEditing = !!existingPost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('请输入标题');
      return;
    }
    
    if (!content.trim()) {
      setError('请输入内容');
      return;
    }
    
    if (!state.isAuthenticated) {
      navigate('/login');
      return;
    }

    const tagList = tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t);

    if (isEditing && existingPost) {
      updatePost({
        ...existingPost,
        title,
        content,
        category,
        tags: tagList,
      });
    } else {
      addPost(title, content, category, tagList);
    }
    
    navigate('/');
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

      {/* Editor Form */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <div className="retro-card p-6">
          <h1 className="text-2xl font-bold text-retro-dark mb-6">
            {isEditing ? '✏️ 编辑帖子' : '✏️ 发布新帖子'}
          </h1>

          {!state.isAuthenticated ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">登录后才能发布帖子</p>
              <Link
                to="/login"
                className="inline-block retro-button px-6 py-2 rounded font-medium text-retro-dark cursor-pointer"
              >
                登录
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                  {error}
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  标题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="retro-input w-full px-4 py-2 rounded"
                  placeholder="请输入帖子标题"
                  maxLength={100}
                />
                <p className="text-xs text-gray-400 mt-1">{title.length}/100</p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  分类 <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="retro-input w-full px-4 py-2 rounded"
                >
                  {state.categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  标签
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="retro-input w-full px-4 py-2 rounded"
                  placeholder="多个标签用逗号分隔，如：React, 前端, 教程"
                />
                <p className="text-xs text-gray-400 mt-1">
                  多个标签用英文逗号分隔
                </p>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="retro-input w-full p-4 rounded min-h-[300px] resize-y font-mono text-sm"
                  placeholder="请输入帖子内容...

支持 Markdown 格式：
- **粗体**
- *斜体*
- `代码`
- 换行段落"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="retro-button px-6 py-2 rounded cursor-pointer"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 retro-button px-6 py-2 rounded cursor-pointer"
                >
                  <Send size={18} />
                  {isEditing ? '保存修改' : '发布帖子'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
