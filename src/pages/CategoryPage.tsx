import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();

  // 显示"系统繁忙"
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="retro-card p-12 text-center max-w-md mx-4">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold text-red-400 mb-4">系统繁忙</h2>
        <p className="text-amber-100/70 mb-6">
          请稍后再试...
        </p>
        <div className="text-xs text-amber-700/50 mb-4 font-mono">
          ERROR_CODE: 0x7F3A2
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-retro-blue hover:text-amber-400 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          返回首页
        </Link>
      </div>
    </div>
  );
}
