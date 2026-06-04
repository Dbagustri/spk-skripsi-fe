import { useEffect, useState } from "react";

import axios from "axios";
import { ArrowLeft, Printer, Star } from "lucide-react";

import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

export default function StudentResult() {
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:8000/api/recommendation/latest",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setResult(response.data);
      } catch (error) {
        console.error("Recommendation Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-teal-700 border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    );
  }

  const recommendation = result?.data?.recommendation;

  const ranking = result?.data?.ranking?.slice(1) || [];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Recommendation Results
            </h1>

            <p className="text-gray-500 mt-2">
              Berdasarkan performa akademik dan profil kemampuanmu.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:w-[280px]">
            <button className="bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition">
              <Printer size={18} />
              Cetak / Simpan PDF
            </button>

            <button
              onClick={() => navigate("../dashboard")}
              className="border border-teal-700 text-teal-700 hover:bg-teal-50 py-3 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <ArrowLeft size={18} />
              Kembali ke Dashboard
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* TOP MATCH */}
            <div className="bg-white border rounded-3xl p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-50 rounded-full -translate-y-10 translate-x-10" />

              <div className="flex justify-between items-start gap-6 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                      Top Match
                    </span>

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star size={12} />
                      Best Fit
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold text-slate-900">
                    {recommendation?.nama_topik}
                  </h2>

                  <p className="text-teal-700 font-medium mt-2">
                    {recommendation?.kompetensi_lulusan}
                  </p>

                  <p className="text-gray-500 leading-relaxed mt-5 max-w-2xl">
                    {recommendation?.insight}
                  </p>
                </div>

                {/* SCORE */}
                <div className="bg-teal-700 text-white rounded-2xl p-6 text-center min-w-[150px] shadow-md">
                  <p className="text-sm opacity-80">Q1 SCORE</p>

                  <h2 className="text-4xl font-bold mt-2">
                    {Number(recommendation?.score).toFixed(3)}
                  </h2>

                  <p className="text-xs opacity-80 mt-2">High Relevance</p>
                </div>
              </div>
            </div>

            {/* RANKING */}
            <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b">
                <h2 className="font-semibold text-lg">PERINGKAT LAINNYA</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-6 py-4">Rank</th>

                      <th className="text-left px-6 py-4">Kode</th>

                      <th className="text-left px-6 py-4">Nama Bidang</th>

                      <th className="text-left px-6 py-4">Confidence</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ranking.map((item) => (
                      <tr
                        key={item.rank}
                        className="border-t hover:bg-slate-50"
                      >
                        <td className="px-6 py-5 font-medium">
                          {String(item.rank).padStart(2, "0")}
                        </td>

                        <td className="px-6 py-5 text-teal-700 font-semibold">
                          {item.kode}
                        </td>

                        <td className="px-6 py-5">{item.nama_topik}</td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-teal-700 rounded-full"
                                style={{
                                  width: `${item.score * 100}%`,
                                }}
                              />
                            </div>

                            <span className="font-medium">
                              {Number(item.score).toFixed(3)}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* STATISTIC */}
            <div className="bg-white border rounded-3xl p-6 shadow-sm">
              <h3 className="font-semibold mb-6">Detail Perhitungan</h3>

              <button
                onClick={() => navigate("/student/result/detail")}
                className="border border-slate-300 hover:bg-slate-50 py-3 rounded-xl transition"
              >
                Lihat Detail Perhitungan
              </button>
            </div>

            {/* INFO */}
            <div className="bg-teal-50 border border-teal-100 rounded-3xl p-6">
              <h3 className="font-semibold text-teal-800 mb-3">
                INFORMASI METODE
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                Rekomendasi dihitung menggunakan metode WASPAS dengan
                menggabungkan pendekatan Weighted Sum Model dan Weighted Product
                Model.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
