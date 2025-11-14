import { use } from 'react';
import type { ComponentType } from 'react'
import { Navigate } from 'react-router';

import AuthContext from '../context/AuthContext';

function PublicRoute({ component: Component }: { component: ComponentType }) {
    const { user } = use(AuthContext);
    if (user) {
        return <Navigate to="/" />;
    }
    return <Component />;
}

export default PublicRoute