import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import HeaderDashboard from './HeaderDashboard';
import Sidebar from './Sidebar';

const { Content } = Layout;

const MainLayout: React.FC = () => {
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sidebar />
            <Layout>
                {/* header */}

                <HeaderDashboard />
                <Content>
                    <div
                        style={{
                            minHeight: '50vh',
                            width: '100%',

                            padding: 16,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
