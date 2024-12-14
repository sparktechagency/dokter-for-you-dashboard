import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { faqData } from '../../const';
import { CiEdit } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { BsTrash } from 'react-icons/bs';
import TextArea from 'antd/es/input/TextArea';
import { AiOutlinePlus } from 'react-icons/ai';
import Modal from '../../components/shared/Modal';
import { useEffect, useState } from 'react';

const FAQ = () => {
    const [form] = Form.useForm();
    const [openModal, setOpenModal] = useState(false);
    const [editFaqData, setEditFaqData] = useState<any>(null);

    const onFinish = (values: any) => {
        console.log('Form values:', values);
    };

    useEffect(() => {
        if (editFaqData) {
            form.setFieldsValue({
                question: editFaqData.question,
                answer: editFaqData.answer,
            });
        } else {
            form.resetFields();
        }
    }, [editFaqData, form]);
    const faqForm = (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
                label="Question"
                name="question"
                rules={[{ required: true, message: 'Please enter a question' }]}
            >
                <Input placeholder="Your faq question" />
            </Form.Item>

            <Form.Item label="Answer" name="answer" rules={[{ required: true, message: 'Please enter a answer' }]}>
                <TextArea
                    style={{
                        width: '100%',
                        resize: 'none',
                        borderRadius: 6,
                        backgroundColor: '#F9F9F9',
                    }}
                    rows={3}
                    placeholder="Your faq answer"
                />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item className="flex justify-end">
                <Button
                    icon={<AiOutlinePlus />}
                    htmlType="submit"
                    style={{
                        height: 40,
                    }}
                    type="primary"
                >
                    Add FAQ
                </Button>
            </Form.Item>
        </Form>
    );

    return (
        <div>
            <Flex vertical={false} gap={10} align="center" justify="space-between">
                <div>
                    <h1 className="text-3xl text-primary font-semibold">FAQs</h1>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        style={{
                            height: 40,
                        }}
                        type="text"
                    >
                        <BsTrash size={20} />
                    </Button>
                    <Button
                        onClick={() => setOpenModal(true)}
                        style={{
                            height: 40,
                        }}
                        type="primary"
                    >
                        Add FAQs
                    </Button>
                </div>
            </Flex>

            <div className="space-y-6 my-5">
                <div className="bg-white py-6 px-4 rounded-md">
                    {faqData.map((item, index) => (
                        <div key={index} className="flex justify-between items-start gap-4 ">
                            <div className="mt-3">
                                <Checkbox />
                            </div>
                            <div className="w-full ">
                                <p className="text-base font-medium border-b rounded-xl py-2 px-4 flex items-center gap-8 bg-slate-50">
                                    <span className=" flex-1 "> {item?.question}</span>
                                </p>
                                <div className="flex justify-start items-start gap-2 border-b  py-2 px-4  rounded-xl my-4 bg-slate-50">
                                    <p className="text-[#919191] leading-[24px] mb-6 ">{item?.answer}</p>
                                </div>
                            </div>
                            <div className="w-[5%] flex justify-start flex-col items-start gap-2">
                                <CiEdit
                                    onClick={() => {
                                        setEditFaqData(item);
                                        setOpenModal(true);
                                    }}
                                    size={24}
                                    className="text-2xl cursor-pointer text-[#DBB162]"
                                />
                                <RxCross2 onClick={() => {}} className="text-2xl cursor-pointer text-red-600" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                key={'add-faq'}
                title={editFaqData ? 'Edit FAQs' : 'Add FAQs'}
                open={openModal}
                setOpen={setOpenModal}
                body={faqForm}
                width={600}
            />
        </div>
    );
};

export default FAQ;
