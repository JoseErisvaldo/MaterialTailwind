import { createContext, useState } from "react";
import supabase from "../../lib/supabase";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function Login(email, password) {
     console.log({ email, password });
    setUser({ email });
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'http://localhost:5173/',
      },
    })

  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, Login }}>
      {children}
    </AuthContext.Provider>
  );
}
