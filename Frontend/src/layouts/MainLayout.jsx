import React from "react";
import "../styles/MainLayout.css";

function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <main className="main-content">{children}</main>
    </div>
  );
}

export default MainLayout;
