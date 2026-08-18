import { Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export function NotFoundPage() {
  const { pathname } = useLocation();
  if (pathname === "/index.html") {
    return <Navigate to="/" replace />;
  }

  return (
    <main id="main" className="flex min-h-[80vh] items-center pt-28">
      <div className="container-narrow py-24">
        <p className="eyebrow">404</p>
        <h1 className="display-title mt-4 text-5xl">This table is empty.</h1>
        <p className="mt-5 text-ink/75">
          The page you asked for is not on the floor plan. Return to the dining
          room, or open the menu.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button to="/">Home</Button>
          <Button to="/menu" variant="ghost">
            Menu
          </Button>
        </div>
      </div>
    </main>
  );
}
