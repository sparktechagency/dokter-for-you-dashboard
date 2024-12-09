import { ConfigProvider, Layout, Menu } from 'antd';
import { sidebarItemsGenerator } from '../../utils/generateSidebarItems';
import sidebarItems from '../../utils/sidebarItems';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const Sidebar = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#F0F4FF',
                    // colorBgContainer: '#DAA520',
                    colorText: '#414446',
                },
                components: {
                    Menu: {
                        itemSelectedColor: '#0A2369',
                        itemBorderRadius: '0px' as any,
                        itemHeight: 45,
                        fontSize: 15,
                    },
                },
            }}
        >
            <Sider
                width={250}
                theme="light"
                breakpoint="lg"
                collapsedWidth="0"

                // onBreakpoint={(broken) => {
                //   // console.log(broken);
                // }}
                // onCollapse={(collapsed, type) => {
                //   console.log(collapsed, type);
                // }}
            >
                {/* logo of the website */}
                <Link to="/">
                    <div
                        style={{
                            margin: '0 20px',
                            padding: '20px 0',
                        }}
                    >
                        <h1 className="text-2xl text-center">LOGO</h1>
                    </div>
                </Link>

                <Menu
                    style={
                        {
                            // color: '#DAA520',
                            // width: 250,
                        }
                    }
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['dashboard']}
                    items={sidebarItemsGenerator(sidebarItems)}
                />
            </Sider>
        </ConfigProvider>
    );
};

export default Sidebar;
