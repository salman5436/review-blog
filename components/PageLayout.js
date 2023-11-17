import Header from "./Header";

const PageLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gray-100">
    <Header />
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </main>
    <footer className="bg-white shadow mt-8 p-4 text-center text-sm text-gray-600">
      © {new Date().getFullYear()} My Application. All rights reserved.
    </footer>
  </div>
);

export default PageLayout;
