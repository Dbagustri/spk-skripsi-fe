import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import api from "../../api/axios";

export default function Questionnaire() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);

  const [answers, setAnswers] = useState({});

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  // load questions
  useEffect(() => {
    let mounted = true;

    const fetchQuestions = async () => {
      try {
        const response = await api.get("/questionnaire/questions");

        if (mounted) {
          setQuestions(response.data.data || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();

    return () => {
      mounted = false;
    };
  }, []);

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: Number(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (Object.keys(answers).length !== questions.length) {
      alert("Semua pertanyaan wajib diisi");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        answers: questions.map((question) => ({
          question_id: question.id,

          answer_value: answers[question.id],
        })),
      };

      const response = await api.post("/questionnaire", payload);

      console.log(response.data);

      // simpan hasil
      localStorage.setItem(
        "recommendation",
        JSON.stringify(response.data.recommendation),
      );

      alert("Kuesioner berhasil disimpan");

      navigate("/result");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Gagal submit questionnaire");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-20">Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Kuesioner Minat & Skill</h1>

          <p className="text-gray-500 mt-2">
            Isi seluruh pertanyaan untuk mendapatkan rekomendasi topik skripsi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="bg-white border rounded-2xl p-6 shadow-sm"
            >
              <div className="mb-4">
                <p className="text-sm text-blue-600 font-medium">
                  {question?.criteria?.nama}
                </p>

                <h2 className="text-lg font-semibold mt-1">
                  {index + 1}. {question.pertanyaan}
                </h2>
              </div>

              <div className="flex justify-between gap-2 flex-wrap">
                {[1, 2, 3, 4, 5].map((score) => (
                  <label
                    key={score}
                    className={`flex flex-col items-center justify-center border rounded-xl p-4 cursor-pointer transition w-24

                        ${
                          answers[question.id] === score
                            ? "bg-blue-600 text-white border-blue-600"
                            : "hover:border-blue-500"
                        }
                      `}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={score}
                      className="hidden"
                      onChange={(e) =>
                        handleAnswer(question.id, e.target.value)
                      }
                    />

                    <span className="font-bold text-xl">{score}</span>

                    <span className="text-xs mt-1 text-center">
                      {score === 1 && "Sangat Tidak Setuju"}

                      {score === 2 && "Tidak Setuju"}

                      {score === 3 && "Netral"}

                      {score === 4 && "Setuju"}

                      {score === 5 && "Sangat Setuju"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold text-lg"
          >
            {submitting ? "Menyimpan..." : "Submit Kuesioner"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
