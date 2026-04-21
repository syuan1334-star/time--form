import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="retro-card p-12 text-center">
        <div className="text-8xl mb-6">404</div>
        <h1 className="text-2xl font-bold text-retro-dark mb-4">页面不存在</h1>
        <p className="text-gray-500 mb-8">您访问的页面可能已被删除或不存在</p>
        <Link
          to="/"
          className="inline-block retro-button px-6 py-3 rounded font-medium cursor-pointer"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
