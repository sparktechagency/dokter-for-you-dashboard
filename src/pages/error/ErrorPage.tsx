import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;

const ErrorPage = () => {
    return (
        <Layout>
            <Content>
                <div className="min-h-screen flex flex-col justify-center items-center space-y-3">
                    <h1 className="text-7xl font-bold text-red-500">404</h1>
                    <h2 className="text-3xl font-medium text-gray-800">Page Not Found</h2>
                    <p className="text-lg text-gray-600">
                        We can't find the page you're looking for. Please check the URL or go back to{' '}
                        <Link to="/" className="text-primary hover:underline">
                            Home
                        </Link>
                    </p>
                </div>
            </Content>
        </Layout>
    );
};

export default ErrorPage;
