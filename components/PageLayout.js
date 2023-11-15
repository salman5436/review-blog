// import Header from "./Header";

// const Layout = (props) => (
//   <div>
//     <Header />
//     <div className="layout">{props.children}</div>
//     <style jsx global>{`
//       html {
//         box-sizing: border-box;
//       }

//       *,
//       *:before,
//       *:after {
//         box-sizing: inherit;
//       }

//       body {
//         margin: 0;
//         padding: 0;
//         font-size: 16px;
//         font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
//           Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
//           "Segoe UI Symbol";
//         background: rgba(0, 0, 0, 0.05);
//       }

//       input,
//       textarea {
//         font-size: 16px;
//       }

//       button {
//         cursor: pointer;
//       }
//     `}</style>
//     <style jsx>{`
//       .layout {
//         padding: 0 2rem;
//       }
//     `}</style>
//   </div>
// );

// export default Layout;

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
