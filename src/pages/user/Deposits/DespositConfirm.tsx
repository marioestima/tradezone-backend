import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { useState } from "react";

const DepositConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { currency, method } = location.state || {};

  const [fileName, setFileName] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setFilePreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    navigate("/deposit/success");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pb-24">

      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-[#0A0A0A]/80 backdrop-blur-sm px-4 pt-4 pb-3">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex size-10 items-center justify-center rounded-full text-gray-300 hover:bg-white/5"
          >
            <ArrowLeft size={22} />
          </button>

          <h1 className="text-xl font-bold">Confirmar Envio</h1>
        </div>
      </header>

      {/* MAIN */}
      <main className="px-4 py-4 space-y-6">

        {/* Info */}
        <div className="rounded-xl bg-[#111] border border-white/10 p-4 space-y-2">
          <p className="text-sm text-gray-400">Moeda</p>
          <p className="text-lg font-bold">{currency || "—"}</p>

          <div className="h-1 w-full bg-white/10" />

          <p className="text-sm text-gray-400">Método</p>
          <p className="text-lg font-bold">{method || "—"}</p>
        </div>

        {/* Upload Comprovativo */}
        <div className="rounded-xl bg-[#111] border border-white/10 p-4">
          <p className="text-sm text-gray-400 mb-3">
            Envie o comprovativo do pagamento
          </p>

          <label className="w-full cursor-pointer">
            <div className="flex flex-col items-center justify-center border border-dashed border-gray-600 rounded-xl p-6 hover:bg-white/5 transition">
              {filePreview ? (
                <img
                  src={filePreview}
                  className="w-full rounded-lg object-cover"
                />
              ) : (
                <>
                  <UploadCloud size={36} className="text-gray-400 mb-3" />
                  <p className="text-gray-400 text-sm">
                    Clique para enviar imagem
                  </p>
                </>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {fileName && (
            <p className="mt-3 text-xs text-gray-400">📎 {fileName}</p>
          )}
        </div>

        {/* Botão */}
        <button
          onClick={handleSubmit}
          disabled={!filePreview}
          className={`w-full py-3 rounded-xl font-bold mt-4 transition ${filePreview
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-700 text-gray-500"
            }`}
        >
          Enviar Comprovativo
        </button>
      </main>
    </div>
  );
};

export default DepositConfirm;
