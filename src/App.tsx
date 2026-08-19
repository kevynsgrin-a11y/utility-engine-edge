import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { MenuPage } from "@/pages/MenuPage";
import { PrivateDiningPage } from "@/pages/PrivateDiningPage";
import { StoryPage } from "@/pages/StoryPage";
import { VisitPage } from "@/pages/VisitPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/private-dining" element={<PrivateDiningPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/visit" element={<VisitPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
