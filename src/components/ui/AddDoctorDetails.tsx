import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react"; 
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
const data = [
    {
      key: '1',
      pharmacyName: 'City Pharmacy',
      pharmacyAddress: 'doctor@gmail.com',
      selectedArea: 'Downtown',
      shippingPrice: 5.99,
    },
    {
      key: '2',
      pharmacyName: 'Health Plus',
      pharmacyAddress: 'doctor@gmail.com',
      selectedArea: 'Suburbs',
      shippingPrice: 7.99,
    },
    {
      key: '3',
      pharmacyName: 'MediCare',
      pharmacyAddress: 'doctor@gmail.com',
      selectedArea: 'Rural',
      shippingPrice: 9.99,
    },
  ]; 

const AddDoctorDetails = ({open , setOpen , shippingProfile , setShippingProfile }:{open:boolean , setOpen:(open:boolean)=>void , setShippingProfile :any ,shippingProfile:any }) => {  
    const [form] = Form.useForm(); 
    useEffect(() => {
        if (shippingProfile) {
          form.setFieldsValue({
            pharmacyName: shippingProfile.pharmacyName,
            pharmacyAddress: shippingProfile.pharmacyAddress,
            selectedArea: shippingProfile.selectedArea,
            shippingPrice: shippingProfile.shippingPrice,
          });
        } else {
          form.resetFields();
        }
      }, [shippingProfile, form]); 


    const onFinish = async (values: any) => {
        console.log('Form Values:', values);
        setOpen(false);
        setShippingProfile(null);
      }; 

    return ( 
        <Modal
        maskClosable={false}
        centered
        title={<p className="text-[24px] text-[#333333]"> {shippingProfile ? 'Edit Doctor Profile' : 'Add Doctor Profile' }  </p>}
        footer={false}
        open={open}
        onCancel={()=>setOpen(false)}
        width={500}
    >   
        <div>
        <Form form={form} onFinish={onFinish} layout="vertical" requiredMark={false}> 
            
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter pharmacy address' }]}
      >
        <Input placeholder="Enter Name" />
      </Form.Item>  

      <Form.Item
        label="Doctor Type"
        name="type"
        rules={[{ required: true, message: 'Please enter Doctor Type' }]}
      >
        <Input placeholder="Enter Name doctor type" />
      </Form.Item> 

      <Form.Item
        label="Contact Number"
        name="contact"
        rules={[{ required: true, message: 'Please enter contact number' }]}
      >
        <Input placeholder="Enter Name" />
      </Form.Item> 

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please enter address' }]}
      >
        <Input placeholder="Enter Name" />
      </Form.Item>  

      <div className=" flex items-center w-full gap-2">  
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: 'Please select  gender' }]} 
      >
        <Select placeholder="Select Pharmacy Gender" style={{ 
            width:"100%"
        }}>
          {data.map((pharmacy) => (
            <Select.Option key={pharmacy.pharmacyName} value={pharmacy.pharmacyName}>
              {pharmacy.pharmacyName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item> 

      <Form.Item
        label="Date of Birth"
        name="dob"
        rules={[{ required: true, message: 'Please select  name' }]} 
        className=" w-full"
      >
 <Input placeholder="Enter Date of Birth"  className=" w-full"/>
      </Form.Item>
      </div>
  
  {
    shippingProfile ? " " : <div> 
            <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter email' }]}
      >
        <Input placeholder="Enter Email" />
      </Form.Item>    

      <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            placeholder="******"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            className="rounded-lg bg-gray-100"
                            size="large"
                        />
                    </Form.Item> 

    </div>
  }


      <div className="flex justify-end">
        <Form.Item>
          <Button htmlType="submit" type="primary" size="large">
            Save Changes
          </Button>
        </Form.Item>
      </div>
    </Form>
        </div> 
        </Modal>
    );
};

export default AddDoctorDetails;