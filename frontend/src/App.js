import "./App.css";
import "./styles/ComponentStyles.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Layout from "./pages/Layout";
import PageNotFound from "./pages/page_not_found/PageNotFound";
import SignUpPage from "./pages/sign_up_page/SignUpPage";
import LoginPage from "./pages/login_page/LoginPage";
import HomePage from "./pages/home_page/HomePage";
import VerifyEmailPage from "./pages/verify_email_page/VerifyEmailPage";
import WatingForAuthPage from "./pages/waiting_for_auth_page/WaitingForAuthPage";
import DashboardPage from "./pages/dashboard_page/DashboardPage";
import FriendRoom from "./pages/friend_room/FriendRoom";
import FriendChatRoom from "./pages/friend_chat_room.jsx/FriendChatRoom";
import TextChannelChatRoom from "./pages/text_channel_chat_room/TextChannelChatRoom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route
              path="verify-email/:uid/:token"
              element={<VerifyEmailPage />}
            />
            <Route
              path="waiting-for-email-verification"
              element={<WatingForAuthPage />}
            />
            <Route path="/channel/" element={<DashboardPage />}>
              <Route path="@me" element={<FriendRoom />} />
              <Route path="@me/:room_id" element={<FriendChatRoom />} />
              <Route
                path=":server_id/:channel_id"
                element={<TextChannelChatRoom />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
