import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes/Router";
import ThemeProvider from "./theme";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router></Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
