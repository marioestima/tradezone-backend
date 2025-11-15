 import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Copy, Check } from "lucide-react";
import { useState } from "react";

const DepositPay = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { currency, method } = location.state || {};
  const [copied, setCopied] = useState(false);

  const accountNumber = "987654321000";   
  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] text-white pb-24 antialiased">

      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-[#0A0A0A]/80 backdrop-blur-sm px-4 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex size-10 items-center justify-center rounded-full text-gray-300 hover:bg-white/5"
          >
            <ArrowLeft size={22} />
          </button>

          <h1 className="text-xl font-bold flex-1 text-center -ml-10">
            Depósito
          </h1>

          <button className="flex size-10 items-center justify-center rounded-full text-gray-300 hover:bg-white/5">
            <Bell size={22} />
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="px-4 py-4 space-y-6">

        {/* INFORMAÇÕES DO DEPÓSITO */}
        <div className="rounded-xl bg-[#111] p-4 border border-white/10">
          <p className="text-sm text-gray-400">Moeda selecionada</p>
          <p className="text-lg font-bold">{currency || "—"}</p>

          <div className="h-px w-full bg-white/10 my-3" />

          <p className="text-sm text-gray-400">Método escolhido</p>
          <p className="text-lg font-bold">{method || "—"}</p>
        </div>

        {/* VALOR E INSTRUÇÕES */}
        <div className="rounded-xl bg-[#111] p-4 border border-white/10 space-y-4">
          <h2 className="text-lg font-bold">Instruções</h2>
          <p className="text-sm text-gray-400">
            Envie o valor desejado para a conta abaixo. Após o pagamento,
            clique em <span className="text-blue-400 font-semibold">“Confirmar envio”</span>.
          </p>

          {/* Exemplo de conta bancária */}
          <div className="rounded-lg bg-[#1A1A1A] p-4 border border-white/10">
            <p className="text-gray-400 text-sm">Número da conta</p>

            <div className="flex items-center justify-between mt-1">
              <p className="font-bold text-lg tracking-wide">{accountNumber}</p>

              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-blue-400 hover:text-blue-500 transition"
              >
                {copied ? (
                  <>
                    <Check size={18} /> Copiado
                  </>
                ) : (
                  <>
                    <Copy size={18} /> Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR CODE Opcional */}
          <div className="rounded-lg bg-[#1A1A1A] p-4 border border-white/10 text-center">
            <p className="text-sm text-gray-400 mb-2">QR Code de pagamento</p>
            <div className="h-40 w-40 bg-white rounded-md mx-auto" />
            <p className="text-[11px] text-gray-400 mt-2">
              (QR Code ilustrativo — substituir depois)
            </p>
          </div>
        </div>

        {/* BOTÃO CONFIRMAR */}
        <button
          onClick={() =>
            navigate("/deposit/confirm", {
              state: { currency, method },
            })
          }
          className="w-full py-3 mt-4 rounded-xl bg-blue-600 font-bold text-white text-center hover:bg-blue-700 transition"
        >
          Confirmar envio
        </button>
      </main>
    </div>
  );
};

export default DepositPay;
