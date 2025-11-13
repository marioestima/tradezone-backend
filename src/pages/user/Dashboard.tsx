import { Home, BarChart2, Wallet, User, ArrowUp } from "lucide-react";

const Dashboard = () => {
  const planos = [
    { id: 1, valor: 12000, retorno: 1800, lucro: 15 },
    { id: 2, valor: 25000, retorno: 3750, lucro: 15 },
    { id: 3, valor: 50000, retorno: 7500, lucro: 15 },
    { id: 4, valor: 100000, retorno: 15000, lucro: 15 },
    { id: 5, valor: 250000, retorno: 37500, lucro: 15 },
    { id: 6, valor: 500000, retorno: 75000, lucro: 15 },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light bg-[#0A0A0A] font-display">

      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-betweenbg-[#0A0A0A]/80 p-4 pb-2 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center">
            <div className="aspect-square w-10 rounded-full bg-cover bg-center"
              style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDaua3ZJo-aK_ROmAmJ9xUv94ROudmtfQqzK1IqipBDvD8AWn9KQ1mI-WTgUha-SMzEOM9w4Vhm9B89QUrNTCfMpBCvhpPsbiYo75rFFb4jl7w7bM0LiF2DK0TXjpBoerjl1KaAfXmcgQfKEfjaAcfHTHnkEvekGS47B5sNJ5EDXOafynRja0WIcfx6n0MLIFVLuUdsUwFS7QCgaUwA-3m_zpiEuLLH_viRjjCbwVDWOlwva7Y-LkHYmIE1DH19_G3dBOyk2dCCzk6p)' }} />
          </div>
          <h2 className="flex-1 text-lg font-bold text-zinc-100">Olá, Marcos</h2>
        </div>
        <div className="flex w-12 items-center justify-end">
          <a href="/screens/dashboard/notifications/notification.html" className="flex items-center justify-center h-12 w-12 rounded-lg text-zinc-100 bg-transparent">
            <ArrowUp size={24} />
          </a>
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 px-4 py-2">

        {/* Totais */}
        <div className="mt-4 flex flex-col gap-4 rounded-xl bg-zinc-900 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-400">Valor Total Investido</p>
              <p className="text-2xl font-bold text-white">25.480,50 Kz</p>
            </div>
            <div className="h-10 w-px bg-zinc-700"></div>
            <div className="text-right">
              <p className="text-sm font-medium text-zinc-400">Lucro Total</p>
              <p className="text-2xl font-bold text-primary">3.120,75 Kz</p>
            </div>
          </div>
        </div>

        {/* Lucro Diário */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex min-w-72 flex-1 flex-col gap-2">
            <p className="text-base font-medium text-zinc-400">Lucro Diário</p>
            <p className="truncate text-2xl font-bold text-white">150,30 Kz</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-zinc-500">Últimos 7 dias</p>
              <div className="flex items-center gap-1">
                <ArrowUp size={14} className="text-primary" />
                <p className="text-sm font-medium text-primary">+2.5%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Planos */}
        <div className="mt-6 flex flex-col gap-4">
          {planos.map((plano) => (
            <div key={plano.id} className="flex flex-col gap-4 rounded-xl bg-zinc-900 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Plano {plano.id}</h3>
                <div className="flex items-center gap-2">
                  <ArrowUp size={16} className="text-primary" />
                  <span className="px-2 py-1 text-xs font-bold text-white bg-primary rounded-full">{plano.lucro}%</span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Valor Aplicado</p>
                  <p className="text-base font-medium text-white">{plano.valor.toLocaleString()} Kz</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400">Retorno Atual</p>
                  <p className="text-base font-medium text-primary">{plano.retorno.toLocaleString()} Kz</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Rodapé */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-zinc-800 bg-background-dark/80 px-4 pt-3 pb-6 backdrop-blur-sm">
        <div className="mx-auto grid max-w-md grid-cols-4 items-center justify-items-center gap-2">
          <a className="flex flex-col items-center justify-center gap-1 text-primary" href="#">
            <Home size={20} />
            <span className="text-[11px] font-bold text-primary">Início</span>
          </a>
          <a className="flex flex-col items-center justify-center gap-1 text-zinc-400" href="/screens/dashboard/plans.html">
            <BarChart2 size={20} />
            <span className="text-[11px] font-bold">Planos</span>
          </a>
          <a className="flex flex-col items-center justify-center gap-1 text-zinc-400" href="/screens/dashboard/wallet.html">
            <Wallet size={20} />
            <span className="text-[11px] font-bold">Carteira</span>
          </a>
          <a className="flex flex-col items-center justify-center gap-1 text-zinc-400" href="/screens/dashboard/profile.html">
            <User size={20} />
            <span className="text-[11px] font-bold">Perfil</span>
          </a>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
