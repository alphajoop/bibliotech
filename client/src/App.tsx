import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddBook from './components/AddBook';
import AddUser from './components/AddUser';
import AdminLogin from './components/AdminLogin';
import BookList from './components/BookList';
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
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/login" element={<AdminLogin />} />
              <Route path="*" element={<NotFound />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/add-book" element={<AddBook />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/users" element={<UserList />} />
              </Route>
            </Routes>
          </Router>
        </BookProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
