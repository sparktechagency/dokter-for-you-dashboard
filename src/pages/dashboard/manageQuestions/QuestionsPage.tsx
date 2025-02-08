import { useParams } from 'react-router-dom';
import {
  useCreateQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionBySubCategoryQuery,
  useUpdateQuestionMutation,
} from '../../../redux/apiSlices/questionsSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from 'antd';
import { MdAdd } from 'react-icons/md';
import { useState } from 'react';
import { Modal, Input } from 'antd';
import toast from 'react-hot-toast';

const QuestionsPage = () => {
  const { id } = useParams();

  const { data: getQuestionBySubCategory, isFetching } = useGetQuestionBySubCategoryQuery(id);
  const [createQuestion] = useCreateQuestionMutation();
  const [updateQuestion] = useUpdateQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({ question: '', _id: null });

  if (isFetching) return <div>Loading...</div>;
  const subCategory = getQuestionBySubCategory?.data;
  // console.log(subCategory);

  const showModal = (question = { question: '', _id: null }) => {
    setCurrentQuestion(question);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const questionData = {
      question: currentQuestion.question,
      subCategory: id,
    };

    try {
      if (currentQuestion._id) {
        const response = await updateQuestion({ data: questionData, id: currentQuestion._id });
        if (response?.data?.success) {
          toast.success('Question updated successfully!');
          setIsModalVisible(false);
        }
      } else {
        const response = await createQuestion({ data: questionData });
        // console.log(response);
        if (response?.data?.success) {
          toast.success('Question added successfully!');
          setIsModalVisible(false);
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    try {
      const response = await deleteQuestion(id);
      if (response?.data?.success) {
        toast.success('Question deleted successfully!');
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Questions for {subCategory[0]?.subCategory?.name}.</h1>
      <div className="my-10">
        <div className="bg-white p-8 rounded-2xl">
          <div>
            <h2 className="text-2xl mb-5 font-bold">Basic Question:</h2>
            <p className="text-xl font-bold">
              1. What is your Height? <span className="text-sm text-slate-400">Yes/No Question</span>
            </p>
            <p className="text-xl font-bold">
              2. What is your Weight? <span className="text-sm text-slate-400">Yes/No Question</span>
            </p>
            <p className="text-xl font-bold">
              3. Do you have one or more conditions? <span className="text-sm text-slate-400">Yes/No Question</span>
            </p>
            <p className="text-xl font-bold">
              4. Did you had a surgery before? <span className="text-sm text-slate-400">Yes/No Question</span>
            </p>
            <p className="text-xl font-bold">
              5. Do you take other medications? <span className="text-sm text-slate-400">Yes/No Question</span>
            </p>
            <p className="text-xl font-bold">
              6. Have you ever experienced any adverse reactions to medications?{' '}
              <span className="text-sm text-slate-400">Yes/No Question</span>
            </p>
            <p className="text-xl font-bold">
              7. Do you have allergies? <span className="text-sm text-slate-400">Yes/No Question</span>
            </p>
            <p className="text-xl font-bold">
              8. Do you smoke or have smoked? <span className="text-sm text-slate-400">Yes/No Question</span>
            </p>
            <p className="text-xl font-bold">
              9. Do you drink alcohol? <span className="text-sm text-slate-400">Yes/No Question</span>
            </p>
            <p className="text-xl font-bold">
              10. Do you have close family with a hereditary condition?{' '}
              <span className="text-sm text-slate-400">Yes/No Question</span>
            </p>
            <p className="text-xl font-bold">
              11. Do you use drugs? <span className="text-sm text-slate-400">Yes/No Question</span>
            </p>
            <p className="text-xl font-bold">
              12. Is your blood pressure lower than 90/60hg or higher than 140/90hg?{' '}
              <span className="text-sm text-slate-400">Yes/No Question</span>
            </p>
            <p className="text-xl font-bold">
              13. Would you like to add more information?{' '}
              <span className="text-sm text-slate-400">Yes/No Question</span>
            </p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl mt-5">
          <div className="flex justify-between items-center">
            <h1 className=" text-2xl font-bold">Questions for {subCategory[0]?.subCategory?.name}.</h1>
            <Button className="py-5 text-white bg-[#2461CB]" onClick={() => showModal()}>
              <MdAdd size={20} /> Add Question
            </Button>
          </div>
          <div>
            {subCategory.map((question: any, index: number) => (
              <div key={question._id} className="my-4">
                <div className="flex justify-between space-y-5 items-center border-b-2 border-slate-400">
                  <div className=" flex gap-5 items-center ">
                    <h2 className="text-lg font-bold">
                      {index + 1}. {question.question}
                    </h2>
                    <p className="text-slate-400">Yes/No Question</p>
                  </div>
                  <div className="flex gap-3">
                    <FaEdit className="text-2xl cursor-pointer text-[#2461CB]" onClick={() => showModal(question)} />
                    <FaTrash
                      onClick={() => handleDeleteQuestion(question._id)}
                      className="text-2xl cursor-pointer text-red-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        title={currentQuestion._id ? 'Edit Question' : 'Add Question'}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={currentQuestion.question}
          onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
          placeholder="Enter your question"
        />
      </Modal>
    </div>
  );
};

export default QuestionsPage;
