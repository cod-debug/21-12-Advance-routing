import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation.js';

export default function MainLayout(){

    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    )
}