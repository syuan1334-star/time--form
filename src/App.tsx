import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ForumProvider } from '@/context/ForumContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import PostDetailPage from '@/pages/PostDetailPage';
import EditorPage from '@/pages/EditorPage';
import SearchPage from '@/pages/SearchPage';
import CategoryPage from '@/pages/CategoryPage';
import MyPostsPage from '@/pages/MyPostsPage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  return (
    <ForumProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-retro-bg">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
              <Route path="/editor" element={<EditorPage />} />
              <Route path="/editor/:id" element={<EditorPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/my-posts" element={<MyPostsPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ForumProvider>
  );
}

export default App;
