import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto bg-retro-dark border-t-4 border-retro-border">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-retro-gold mb-4">🌊 关于流水无涯</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              流水无涯，一个充满情怀的 BBS 风格论坛，如流水般自由，如天涯般无界。
              在这里，你可以分享技术、交流生活、结识志同道合的朋友。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-retro-gold mb-4">🔗 快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  登录
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-white transition-colors">
                  注册
                </Link>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-lg font-bold text-retro-gold mb-4">📊 论坛统计</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>🕐 运行时间：2024年1月1日</li>
              <li>👥 会员数：128 人</li>
              <li>📝 帖子数：552 篇</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-500">
            © 2024 流水无涯 Flowing Water · 用 ❤️ 构建
          </p>
          <p className="text-xs text-gray-600 mt-2">
            怀旧版界面 · 现代技术驱动
          </p>
        </div>
      </div>
    </footer>
  );
}
