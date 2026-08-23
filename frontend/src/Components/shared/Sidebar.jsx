import React from 'react'
import { FaTachometerAlt } from 'react-icons/fa';
import { useLocation, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getDashboardNavigation } from '../../utils/Index';

const Sidebar = () => {
    const pathName = useLocation().pathname;
    const { user } = useSelector((state) => state.auth);
    const sideBarLayout = getDashboardNavigation(user?.roles);

    return (
        <aside className="min-h-screen w-full max-w-xs bg-slate-900 text-slate-100 shadow-xl">
            <div className="border-b border-slate-800 px-6 py-5">
                <div className="flex items-center gap-3">
                    <FaTachometerAlt className="h-5 w-5 text-cyan-400" />
                    <h1 className="text-lg font-semibold">Admin Panel</h1>
                </div>
            </div>

            <nav className="px-2 py-4">
                <ul role="list" className="space-y-2">
                    {sideBarLayout.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.href}
                                className={classNames(
                                    'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                                    {
                                        'bg-slate-700 text-white shadow': pathName === item.href,
                                        'text-slate-300 hover:bg-slate-800 hover:text-white': pathName !== item.href,
                                    }
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar
