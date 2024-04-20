import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
import IndexPage from './page/indexpage';
import LoginPage from './page/loginpage';
import Register from './page/registerpage';
import { UserContextProvider } from './userContext';
import CreatePost from './page/createpost';
import PostPage from './page/postpage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/create'} element={<CreatePost />} />
          <Route path={'post/:id'} element={<PostPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
