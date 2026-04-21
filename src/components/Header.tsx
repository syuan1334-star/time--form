import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useForum } from '@/context/ForumContext';

export default function Header() {
  const { state, logout, searchPosts } = useForum();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchKeyword)}`);
      setSearchKeyword('');
    }
  };

  return (
    <header className="retro-header sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-3xl">🌊</span>
            <div>
              <h1 className="text-xl font-bold text-amber-600 tracking-wide">
                流水无涯
              </h1>
              <p className="text-xs text-amber-900">都市传说 · 灵异档案</p>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="搜索帖子、标签、用户..."
                className="w-full px-4 py-2 bg-black/30 border border-amber-900/50 rounded text-amber-100 placeholder-amber-900 focus:outline-none focus:border-amber-700"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-700 hover:text-amber-500 transition-colors"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* User Area */}
          <div className="flex items-center gap-3">
            {state.isAuthenticated ? (
              <>
                <Link
                  to="/editor"
                  className="retro-button px-3 py-2 text-sm font-medium rounded cursor-pointer hidden sm:block"
                >
                  ✏️ 发帖
                </Link>
                {/* 用户下拉菜单 */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 hover:bg-black/20 rounded transition-colors cursor-pointer"
                  >
                    <span className="text-2xl">{state.currentUser?.avatar}</span>
                    <div className="hidden md:block">
                      <p className="text-sm text-amber-100 font-medium">{state.currentUser?.nickname}</p>
                      <p className="text-xs text-amber-900">@{state.currentUser?.username}</p>
                    </div>
                    <ChevronDown size={16} className="text-amber-700 hidden md:block" />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 border border-amber-900/50 rounded-lg shadow-lg overflow-hidden z-50">
                      <Link
                        to="/my-posts"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-3 text-amber-100 hover:bg-amber-900/30 transition-colors cursor-pointer"
                      >
                        <User size={16} />
                        我的帖子
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-red-400 hover:bg-red-900/30 transition-colors cursor-pointer border-t border-amber-900/30"
                      >
                        <LogOut size={16} />
                        退出登录
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="retro-button px-4 py-2 text-sm font-medium rounded cursor-pointer"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="retro-button px-4 py-2 text-sm font-medium rounded cursor-pointer"
                >
                  注册
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-amber-100 cursor-pointer"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pb-4 border-t border-amber-900/30 pt-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="搜索..."
                  className="w-full px-4 py-2 bg-black/30 border border-amber-900/50 rounded text-amber-100 placeholder-amber-900 focus:outline-none focus:border-amber-700"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-700"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>
            {state.isAuthenticated && (
              <Link
                to="/editor"
                className="block retro-button px-4 py-2 text-center font-medium rounded cursor-pointer"
                onClick={() => setShowMobileMenu(false)}
              >
                ✏️ 发布新帖子
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Decorative border - red glow */}
      <div className="h-1 bg-gradient-to-r from-transparent via-red-900/50 to-transparent opacity-60" />
    </header>
  );
}
