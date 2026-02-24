import { Outlet, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Globe } from 'lucide-react';

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem('adminToken');

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    // Prevent accessing protected routes if not logged in
    if (!isAuthenticated && location.pathname !== '/admin/login') {
        return <Navigate to="/admin/login" replace />;
    }

    // Prevent accessing login if already logged in
    if (isAuthenticated && location.pathname === '/admin/login') {
        return <Navigate to="/admin" replace />;
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-dark-600 flex items-center justify-center font-sans">
                <Outlet />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark-600 flex font-sans text-dark-50">

            {/* Sidebar */}
            <aside className="w-[200px] bg-dark-500 flex flex-col h-screen sticky top-0 border-r border-dark-400">

                {/* Logo */}
                <div className="flex items-center gap-2 px-6 py-6 pt-8">
                    <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white font-bold text-xl leading-none">
                        P
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">Portfolio.</span>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-6 mt-4 custom-scrollbar">
                    {/* NAVIGATION */}
                    <div className="mb-6">
                        <p className="px-3 text-xs font-semibold text-dark-200 tracking-wider mb-2 uppercase">Menu</p>
                        <nav className="space-y-0.5">
                            <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-primary-500/10 rounded-lg text-primary-400 font-medium transition cursor-default">
                                <LayoutDashboard size={18} className="text-primary-500" />
                                Dashboard
                            </a>
                            <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 text-dark-100 hover:bg-dark-400 hover:text-white rounded-lg font-medium transition">
                                <Globe size={18} /> View Site
                            </a>
                        </nav>
                    </div>
                </div>

                {/* Bottom User Area */}
                <div className="p-4 border-t border-dark-400 shrink-0">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-between px-3 py-2 text-dark-100 hover:text-white hover:bg-dark-400 rounded-lg transition group"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-dark-400 border border-dark-300 text-white flex items-center justify-center text-sm font-bold shadow-sm group-hover:border-dark-200 transition">
                                A
                            </div>
                            <span className="font-semibold text-sm">Logout</span>
                        </div>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* Top Header */}
                <header className="h-20 px-8 flex items-center justify-between border-b border-dark-400 shrink-0 bg-dark-600">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Analytics</h1>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-4">
                    <Outlet />
                </main>
            </div>

        </div>
    );
}
