import MainLayout from './components/layout/MainLayout';
import { ConfigProvider } from 'antd';
function App() {
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#0A2369',
                    },
                    components: {
                        Layout: {
                            colorBgContainer: '#fff',
                        },
                    },
                }}
            >
                <MainLayout />
            </ConfigProvider>
        </>
    );
}

export default App;
