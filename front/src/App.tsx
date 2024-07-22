import React, { createContext, useReducer, ReactNode, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import  BalancePage  from "./container/BalancePage";
import  NotificationsPage  from "./container/NotificationsPage";
import  RecivePage  from "./container/RecivePage";
import  RecoveryConfirmPage  from "./container/RecoveryConfirmPage";
import  RecoveryPage  from "./container/RecoveryPage";
import  SendPage  from "./container/SendPage";
import  SettingsPage  from "./container/SettingsPage";
import  SigninPage  from "./container/SigninPage";
import  SignupConfirmPage  from "./container/SignupConfirmPage";
import  SignupPage  from "./container/SignupPage";
import  TransactionPage  from "./container/TransactionPage";
import WellcomePage from "./container/WellcomePage";
import Error from "./container/Error";

interface AuthState {
  token: string | null;
  user: Record<string, any> | null;
}

type AuthAction =
  | { type: 'LOGIN'; payload: { token: string; user: Record<string, any> } }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  token: null,
  user: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<any>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { state } = authContext;

  return state.token ? <Navigate to="/balance" /> : <>{children}</>;
};

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  const { state } = authContext;

  return state.token ? <>{children}</> : <Navigate to="/signin" />;
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const authContextData = {
    state,
    dispatch,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <AuthRoute>
                <WellcomePage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element={
              <PrivateRoute>
                <SignupConfirmPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SigninPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <RecoveryPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm"
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
              </AuthRoute>
            }
          />
          <Route
            path="/balance"
            element={
              <PrivateRoute>
                <BalancePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/recive"
            element={
              <PrivateRoute>
                <RecivePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/transaction/:transactionId"
            element={
              <PrivateRoute>
                <TransactionPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
