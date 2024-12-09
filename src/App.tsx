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
                        Table: {
                            headerBg: '#1854F9',
                            headerColor: '#fff',
                            headerBorderRadius: 0,
                            borderRadius: 0,
                            colorBgContainer: '#E7FBF2',
                            colorText: '#636363',
                            fontSize: 16,
                            rowSelectedBg: '#F0F4FF',
                            rowSelectedHoverBg: '#fff',
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
