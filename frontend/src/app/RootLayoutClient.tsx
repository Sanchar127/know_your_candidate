"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const HEADER_HEIGHT = 80;

  return (
    <Provider store={store}>
      <Header />
      <main className="flex-1" style={{ paddingTop: `${HEADER_HEIGHT}px` }}>
        {children}
      </main>
      <Footer />
    </Provider>
  );
}
