export default function AlternativeCard({
  alternative,
  formData,
  handleChange,
}) {
  const values = formData[alternative.id] || {};

  return (
    <div className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="font-semibold text-teal-700 text-lg">
            {alternative.kode} - {alternative.nama_topik}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {alternative.kompetensi_lulusan}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* C2 */}
        <div>
          <label className="font-medium text-sm block mb-3">
            C2. Minat Mahasiswa
          </label>

          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => handleChange(alternative.id, "c2", n)}
                className={`w-10 h-10 rounded-full border transition font-medium
                  ${
                    values.c2 === n
                      ? "bg-teal-700 text-white border-teal-700"
                      : "hover:border-teal-700"
                  }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* C3 */}
        <div>
          <label className="font-medium text-sm block mb-3">
            C3. Pengalaman Proyek
          </label>

          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => handleChange(alternative.id, "c3", n)}
                className={`border rounded-xl py-2 transition font-medium
                  ${
                    values.c3 === n
                      ? "bg-teal-700 text-white border-teal-700"
                      : "hover:border-teal-700"
                  }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* C4 */}
        <div>
          <label className="font-medium text-sm block mb-2">
            C4. Penguasaan Skill
          </label>

          <input
            type="range"
            min="1"
            max="5"
            value={values.c4 || 3}
            onChange={(e) =>
              handleChange(alternative.id, "c4", Number(e.target.value))
            }
            className="w-full accent-teal-700"
          />

          <div className="text-right text-sm font-medium text-teal-700">
            {values.c4 || 3}/5
          </div>
        </div>

        {/* C9 */}
        <div>
          <label className="font-medium text-sm block mb-3">
            C9. Dataset / Objek Penelitian
          </label>

          <div className="grid grid-cols-5 gap-2">
            {["Sulit", "Cukup", "Netral", "Mudah", "Sangat Mudah"].map(
              (label, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleChange(alternative.id, "c9", i + 1)}
                  className={`border rounded-lg py-2 text-xs transition
                  ${
                    values.c9 === i + 1
                      ? "bg-teal-700 text-white border-teal-700"
                      : "hover:border-teal-700"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
