// ============================================================
// NotFound.tsx - SHOWN FOR ANY URL THAT DOES NOT MATCH A ROUTE (404)
// ============================================================

import { Link } from "react-router";

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] text-center px-5">
      <h1 className="text-6xl md:text-9xl font-bold text-[#974FD0]">404</h1>
      <p className="text-2xl md:text-4xl mt-4">Oops! Page not found.</p>
      <Link to="/" className="mt-8 bg-[#974FD0] text-white px-6 py-3 rounded-lg text-xl">
        Go Home
      </Link>
    </main>
  );
};

export default NotFound;
