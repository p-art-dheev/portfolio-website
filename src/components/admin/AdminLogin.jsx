import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            const data = await res.json();

            if (data.success && data.token) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin');
            } else {
                setError(data.message || 'Invalid password');
            }
        } catch (err) {
            setError('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] w-full relative">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary-500/10 blur-[120px] rounded-full" />
                <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-secondary-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-md p-8 rounded-3xl bg-dark-500/80 border border-white/5 backdrop-blur-2xl shadow-2xl relative z-10">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary-500 blur-xl opacity-20 rounded-full" />
                        <div className="relative p-4 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-white/10 text-primary-400">
                            <ShieldCheck size={36} strokeWidth={1.5} />
                        </div>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center mb-2 text-white tracking-tight">Admin Access</h2>
                <p className="text-center text-dark-200 mb-8 font-medium">Enter your credentials to view analytics</p>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dark-200 group-focus-within:text-primary-400 transition-colors">
                            <Lock size={18} />
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-dark-600/50 border border-dark-400 text-white placeholder-dark-200 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/50 transition-all font-medium"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <p className="text-red-400 text-sm text-center font-medium">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-400 hover:to-secondary-500 text-white font-semibold shadow-lg shadow-primary-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                        {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>
            </div>
        </div>
    );
}
