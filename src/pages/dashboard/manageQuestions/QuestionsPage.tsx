import { useParams } from 'react-router-dom';
import {
  useCreateBasicQuestionMutation,
  useCreateQuestionMutation,
  useDeleteBasicQuestionMutation,
  useDeleteQuestionMutation,
  useGetBasicQuestionBySubCategoryQuery,
  useGetQuestionBySubCategoryQuery,
  useUpdateBasicQuestionMutation,
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

  // Fetch additional questions
  const { data: getQuestionBySubCategory, isFetching } = useGetQuestionBySubCategoryQuery(id);
  // Fetch basic questions
  const { data: getBasicQuestionBySubCategory, isFetching: isBasicFetching } =
    useGetBasicQuestionBySubCategoryQuery(id);

  const [createQuestion] = useCreateQuestionMutation();
  const [createBasicQuestion] = useCreateBasicQuestionMutation();

  const [updateQuestion] = useUpdateQuestionMutation();
  const [updateBasicQuestion] = useUpdateBasicQuestionMutation();

  const [deleteQuestion] = useDeleteQuestionMutation();
  const [deleteBasicQuestion] = useDeleteBasicQuestionMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    _id: null,
    isBasic: false, // To distinguish between basic and additional questions
  });

  if (isFetching || isBasicFetching) return <div>Loading...</div>;

  const additionalQuestions = getQuestionBySubCategory?.data || [];
  const basicQuestions = getBasicQuestionBySubCategory?.data || [];

  const subCategoryName =
    additionalQuestions[0]?.subCategory?.name || basicQuestions[0]?.subCategory?.name || 'Unknown Subcategory';

  const showModal = (question = { question: '', _id: null }, isBasic = false) => {
    setCurrentQuestion({ ...question, isBasic });
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const questionData = {
      question: currentQuestion.question,
      subCategory: id,
    };

    try {
      if (currentQuestion._id) {
        // Update existing question
        const response = currentQuestion.isBasic
          ? await updateBasicQuestion({ data: questionData, id: currentQuestion._id })
          : await updateQuestion({ data: questionData, id: currentQuestion._id });

        if (response?.data?.success) {
          toast.success('Question updated successfully!');
          setIsModalVisible(false);
        }
      } else {
        // Create new question
        const response = currentQuestion.isBasic
          ? await createBasicQuestion({ data: questionData })
          : await createQuestion({ data: questionData });

        if (response?.data?.success) {
          toast.success('Question added successfully!');
          setIsModalVisible(false);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  const handleDeleteQuestion = async (id: string, isBasic: boolean) => {
    try {
      const response = isBasic ? await deleteBasicQuestion(id) : await deleteQuestion(id);

      if (response?.data?.success) {
        toast.success('Question deleted successfully!');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while deleting');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Questions for {subCategoryName}.</h1>
      <div className="my-10">
        {/* Europe basic questions */}
        <div className="bg-white p-8 rounded-2xl mt-5">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              Basic Questions for {subCategoryName}. <span className="text-sm text-slate-400">(for europe)</span>
            </h1>
            <Button
              className="py-5 text-white bg-[#2461CB]"
              onClick={() => showModal({ question: '', _id: null }, true)}
            >
              <MdAdd size={20} /> Add Basic Question
            </Button>
          </div>
          <div>
            {basicQuestions.map((question: any, index: number) => (
              <div key={question._id} className="my-4">
                <div className="flex justify-between space-y-5 items-center border-b-2 border-slate-400">
                  <div className="flex gap-5 items-center">
                    <h2 className="text-lg font-bold">
                      {index + 1}. {question.question}
                    </h2>
                    <p className="text-slate-400">Yes/No Question</p>
                  </div>
                  <div className="flex gap-3">
                    <FaEdit
                      className="text-2xl cursor-pointer text-[#2461CB]"
                      onClick={() => showModal(question, true)}
                    />
                    <FaTrash
                      onClick={() => handleDeleteQuestion(question._id, true)}
                      className="text-2xl cursor-pointer text-red-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional questions */}
        <div className="bg-white p-8 rounded-2xl mt-5">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Additional Questions for {subCategoryName}.</h1>
            <Button
              className="py-5 text-white bg-[#2461CB]"
              onClick={() => showModal({ question: '', _id: null }, false)}
            >
              <MdAdd size={20} /> Add Additional Question
            </Button>
          </div>
          <div>
            {additionalQuestions.map((question: any, index: number) => (
              <div key={question._id} className="my-4">
                <div className="flex justify-between space-y-5 items-center border-b-2 border-slate-400">
                  <div className="flex gap-5 items-center">
                    <h2 className="text-lg font-bold">
                      {index + 1}. {question.question}
                    </h2>
                    <p className="text-slate-400">Yes/No Question</p>
                  </div>
                  <div className="flex gap-3">
                    <FaEdit
                      className="text-2xl cursor-pointer text-[#2461CB]"
                      onClick={() => showModal(question, false)}
                    />
                    <FaTrash
                      onClick={() => handleDeleteQuestion(question._id, false)}
                      className="text-2xl cursor-pointer text-red-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Static Netherlands basic questions */}
      <div className="bg-white p-8 rounded-2xl">
        <div>
          <h2 className="text-2xl mb-5 font-bold">
            Basic Question: <span className="text-sm text-slate-500">(for netherland)</span>
          </h2>
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
            13. Would you like to add more information? <span className="text-sm text-slate-400">Yes/No Question</span>
          </p>
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
