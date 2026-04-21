import { Link } from 'react-router-dom';
import { useForum } from '@/context/ForumContext';

export default function CategoryList() {
  const { state } = useForum();

  return (
    <aside className="retro-card p-4">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-200">
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
                  <p className="font-medium text-sm text-amber-100">{category.name}</p>
                  <p className="text-xs text-amber-700">{category.description}</p>
                </div>
              </div>
              <span className="text-xs text-amber-600 bg-red-900/30 px-2 py-1 rounded border border-red-900/50">
                {category.postCount}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
