import { Layout } from 'components';
import React from 'react';

export const MainTabsLayout = ({ children }) => {
    return (
        <Layout isScroll={true} paddingB-100>
            {children}
        </Layout>
    );
};
