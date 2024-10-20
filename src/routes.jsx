import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Container from './widgets/layout/Container';
import Products from './pages/products';
import { MultiLevelSidebar } from './widgets/layout/MultiLevelSidebar';
import Ingredients from './pages/products/Ingredients';
import Category from './pages/products/category';
import Auth from './pages/auth';
import AuthProvider from './components/context/auth'; // Corrigido o nome da importação
import EditProducts from './pages/products/editProducts';
import Profile from './pages/profile/profile';

export default function RouteApp() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex">
          <MultiLevelSidebar />
          <Container>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/category" element={<Category />} />
              <Route path="products/editproduct/:id" element={<EditProducts />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Container>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
