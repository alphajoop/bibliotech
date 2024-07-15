import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import AddBook from './components/AddBook';
import AddUser from './components/AddUser';
import AdminLogin from './components/AdminLogin';
import BookList from './components/BookList';
import Breadcrumbs from './components/Breadcrumbs';
import NotFound from './components/layout/404';
import Header from './components/layout/Header';
import ProtectedRoute from './components/layout/ProtectedRoute';
import UserList from './components/UserList';
import { AuthProvider } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BookProvider>
          <Router>
            <Header />
            <Breadcrumbs />
            <Routes>
              <Route path="/login" element={<AdminLogin />} />
              <Route path="*" element={<NotFound />} />
              <Route element={<ProtectedRoute />}>
                <Route index element={<Navigate replace to="book-list" />} />
                <Route path="/book-list" element={<BookList />} />
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/user-list" element={<UserList />} />
              </Route>
            </Routes>
          </Router>
        </BookProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
