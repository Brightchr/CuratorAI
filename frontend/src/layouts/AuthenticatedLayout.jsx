// src/layouts/AuthenticatedLayout.jsx
const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      {/* Add other private-only layout elements here if needed */}
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
