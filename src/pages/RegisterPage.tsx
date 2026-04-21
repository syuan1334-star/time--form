import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  const [showMaintenance, setShowMaintenance] = useState(true);

  if (showMaintenance) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="retro-card p-8 w-full max-w-md text-center">
          <span className="text-6xl mb-4 block">🔧</span>
          <h1 className="text-2xl font-bold text-retro-dark mt-4">功能维护中</h1>
          <p className="text-gray-500 mt-4">
            注册功能正在维修，请稍后再试！
          </p>
          <Link
            to="/login"
            className="inline-block retro-button px-6 py-2 rounded font-medium text-retro-dark mt-6 cursor-pointer"
          >
            返回登录
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
