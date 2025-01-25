'use client';

import Link from "next/link";

interface LayoutProps {
 children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
 return (
   <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
     <div className="flex">
       {/* Sidebar */}
       <aside className="hidden w-64 bg-white dark:bg-gray-800 lg:block">
         <nav className="p-4">
           <Link href="/">Dashboard</Link>
           {/* Add nav items */}
         </nav>
       </aside>

       {/* Main Content */}
       <main className="flex-1">
         {/* Header */}
         <header className="bg-white dark:bg-gray-800 shadow">
           <div className="p-4">
             <h1>Dashboard</h1>
           </div>
         </header>

         {/* Content */}
         <div className="p-6">
           {children}
         </div>

         {/* Footer */} 
         <footer className="bg-white dark:bg-gray-800 p-4">
           <p>© 2025 Company</p>
         </footer>
       </main>
     </div>
   </div>
 );
};

export default Layout;