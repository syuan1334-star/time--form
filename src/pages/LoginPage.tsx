import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForum } from '@/context/ForumContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useForum();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('请输入用户名和密码');
      return;
    }
    
    if (login(username, password)) {
      navigate('/');
    } else {
      setError('用户名或密码错误');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="retro-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl">🔐</span>
          <h1 className="text-2xl font-bold text-retro-dark mt-4">用户登录</h1>
          <p className="text-gray-500 mt-2">欢迎回来！请登录您的账号</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              用户名
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="retro-input w-full px-4 py-2 rounded"
              placeholder="请输入用户名"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="retro-input w-full px-4 py-2 rounded"
              placeholder="请输入密码"
            />
          </div>

          <button
            type="submit"
            className="retro-button w-full py-2 rounded font-medium text-retro-dark cursor-pointer"
          >
            登录
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500">
            还没有账号？{' '}
            <Link to="/register" className="text-retro-blue hover:underline">
              立即注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
