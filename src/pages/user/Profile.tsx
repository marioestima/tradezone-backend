import { Link } from "react-router-dom";
import {
  Bell,
  Edit2,
  Settings,
  LogOut,
  ChevronRight,
  Home,
  Wallet,
  Repeat,
  User,
  Copy,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

// Função para mascarar qualquer valor deixando apenas os 4 últimos dígitos
const mask = (value: string) => value.replace(/.(?=.{4})/g, "*");

const Profile = () => {
  const [showAccount, setShowAccount] = useState(false);
  const [showIBAN, setShowIBAN] = useState(false);

  const accountNumber = "0001 1234 5678 1234";
  const ibanNumber = "AO06 0040 0000 1234 5678 1234";

  const copyToClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value);
  };

  return (
    <div className="bg-neutral-900 text-white min-h-screen pb-24">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-neutral-900/80 backdrop-blur-sm px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Perfil</h1>
          <button className="flex size-10 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-700/50">
            <Bell size={24} />
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="px-4 py-6">
        {/* FOTO + NOME */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              alt="Foto do usuário"
              className="h-24 w-24 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuByEEx7CMBOEvrXaJIwJCb5xTCoVJhSfRVmIg42-siArrPevgimllY8MOl9-iF-cDD_z_UdHIPdqTDxFg18UyPyFUs_2zs_EiZPL-GoKwvSmkUDOkPggHKdJ9t4XYVfw6PJoBUjwl-A-zACu_4-QoxmBUy8-sW1K63fnQKtlyhE5rArBGYsILeBBGsBP2MIomWVIy5JSASNHVVLvyqR728jvkYjRc2d1i2LoRk050OraRL2Rtm6UJSa4n0SEKs4gzjQ58W_zFkAEee-"
            />
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-900 bg-green-500 text-neutral-900">
              <Edit2 size={16} />
            </button>
          </div>

          <h2 className="mt-4 text-2xl font-bold">Mario Jose</h2>
          <p className="text-sm text-neutral-400">amelia.vunge@email.com</p>
        </div>

        {/* INFORMAÇÕES PESSOAIS */}
        <div className="mt-8 space-y-6">
          <section>
            <h3 className="mb-3 text-sm font-medium text-neutral-400">
              Informações Pessoais
            </h3>

            <div className="rounded-xl bg-neutral-800">
              <div className="flex items-center justify-between p-4 border-b border-neutral-700">
                <span className="text-neutral-400">Nome Completo</span>
                <span className="font-medium">Amelia Vunge</span>
              </div>

              <div className="flex items-center justify-between p-4">
                <span className="text-neutral-400">Telefone</span>
                <span className="font-medium">+244 9XX XXX XXX</span>
              </div>
            </div>
          </section>

          {/* DADOS DA CONTA */}
          <section>
            <h3 className="mb-3 text-sm font-medium text-neutral-400">
              Dados da Conta
            </h3>

            <div className="rounded-xl bg-neutral-800">

              {/* BANCO */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-700">
                <span className="text-neutral-400">Banco</span>
                <span className="font-medium">Banco Bic</span>
              </div>

              {/* NUMERO DE CONTA */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-700">
                <span className="text-neutral-400">Nº da Conta</span>

                <div className="flex items-center gap-3">
                  <span className="font-medium">
                    {showAccount ? accountNumber : mask(accountNumber)}
                  </span>

                  <button
                    onClick={() => setShowAccount(!showAccount)}
                    className="text-neutral-400 hover:text-white transition"
                  >
                    {showAccount ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                  {showAccount && (
                    <button
                      onClick={() => copyToClipboard(accountNumber)}
                      className="text-neutral-400 hover:text-white"
                    >
                      <Copy size={18} />
                    </button>
                  )}
                </div>
              </div>

              {/* IBAN */}
              <div className="flex items-center justify-between p-4">
                <span className="text-neutral-400">IBAN</span>

                <div className="flex items-center gap-3">
                  <span className="font-medium">
                    {showIBAN ? ibanNumber : mask(ibanNumber)}
                  </span>

                  <button
                    onClick={() => setShowIBAN(!showIBAN)}
                    className="text-neutral-400 hover:text-white transition"
                  >
                    {showIBAN ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>

                  {showIBAN && (
                    <button
                      onClick={() => copyToClipboard(ibanNumber)}
                      className="text-neutral-400 hover:text-white"
                    >
                      <Copy size={18} />
                    </button>
                  )}
                </div>
              </div>

            </div>
          </section>

          {/* LINKS */}
          <section>
            <div className="rounded-xl bg-neutral-800">
              <Link
                to="/settings"
                className="flex items-center justify-between p-4 border-b border-neutral-700 hover:bg-neutral-700/50 transition"
              >
                <div className="flex items-center gap-4">
                  <Settings size={20} className="text-neutral-400" />
                  <span className="font-medium">Configurações</span>
                </div>
                <ChevronRight size={20} className="text-neutral-400" />
              </Link>

              <button className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-700/50 transition">
                <div className="flex items-center gap-4 text-red-500">
                  <LogOut size={20} />
                  <span className="font-medium">Sair</span>
                </div>
                <ChevronRight size={20} className="text-neutral-400" />
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-neutral-900/80 backdrop-blur-sm border-t border-neutral-700">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
          <Link
            to="/dashboard"
            className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white transition"
          >
            <Home size={22} />
            <span className="text-xs">Início</span>
          </Link>

          <Link
            to="/wallet"
            className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white transition"
          >
            <Wallet size={22} />
            <span className="text-xs">Carteira</span>
          </Link>

          <Link
            to="/transactions"
            className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white transition"
          >
            <Repeat size={22} />
            <span className="text-xs">Transações</span>
          </Link>

          <Link to="/profile" className="flex flex-col items-center gap-1 text-green-500">
            <User size={22} />
            <span className="text-xs font-bold">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Profile;
