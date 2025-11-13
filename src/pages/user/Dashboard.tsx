// App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home, BarChart2, Wallet, User } from "lucide-react";

// Tipagem dos planos
interface Plan {
  id: number;
  name: string;
  invested: number;
  profit: number;
  dailyProfitPercent: number;
}

interface UserData {
  name: string;
  totalInvested: number;
  totalProfit: number;
  dailyProfit: number;
  dailyProfitPercent: number;
  plans: Plan[];
}

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  // Simula chamada à API
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((res) => setTimeout(res, 500));

      const data: UserData = {
        name: "Marcos",
        totalInvested: 1032480.5,
        totalProfit: 206620.25,
        dailyProfit: 150.3,
        dailyProfitPercent: 2.5,
        plans: [
          { id: 1, name: "Plano 1️⃣", invested: 12000, profit: 1800, dailyProfitPercent: 15 },
          { id: 2, name: "Plano 2️⃣", invested: 25000, profit: 3750, dailyProfitPercent: 15 },
          { id: 3, name: "Plano 3️⃣", invested: 50000, profit: 7500, dailyProfitPercent: 15 },
          { id: 4, name: "Plano 4️⃣", invested: 100000, profit: 15000, dailyProfitPercent: 15 },
          { id: 5, name: "Plano 5️⃣", invested: 250000, profit: 37500, dailyProfitPercent: 15 },
          { id: 6, name: "Plano 6️⃣", invested: 500000, profit: 75000, dailyProfitPercent: 15 },
        ],
      };

      setUserData(data);
    };

    fetchData();
  }, []);

  if (!userData) return <div className="text-white p-4">Carregando...</div>;

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex flex-col text-white p-4">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background-dark/80 p-4 pb-2 backdrop-blur-sm mb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center">
            <div
              className="aspect-square size-10 rounded-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDaua3ZJo-aK_ROmAmJ9xUv94ROudmtfQqzK1IqipBDvD8AWn9KQ1mI-WTgUha-SMzEOM9w4Vhm9B89QUrNTCfMpBCvhpPsbiYo75rFFb4jl7w7bM0LiF2DK0TXjpBoerjl1KaAfXmcgQfKEfjaAcfHTHnkEvekGS47B5sNJ5EDXOafynRja0WIcfx6n0MLIFVLuUdsUwFS7QCgaUwA-3m_zpiEuLLH_viRjjCbwVDWOlwva7Y-LkHYmIE1DH19_G3dBOyk2dCCzk6p")',
              }}
            ></div>
          </div>
          <h2 className="flex-1 text-lg font-bold leading-tight tracking-[-0.015em]">
            Olá, {userData.name}
          </h2>
        </div>
      </div>

      {/* Total Investido e Lucro */}
      <div className="mt-2 flex flex-col gap-4 rounded-xl bg-zinc-900 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-400">Valor Total Investido</p>
            <p className="text-2xl font-bold">{userData.totalInvested.toLocaleString("pt-BR")} Kz</p>
          </div>
          <div className="h-10 w-px bg-zinc-700"></div>
          <div className="text-right">
            <p className="text-sm font-medium text-zinc-400">Lucro Total</p>
            <p className="text-2xl font-bold text-primary">{userData.totalProfit.toLocaleString("pt-BR")} Kz</p>
          </div>
        </div>
      </div>

      {/* Lucro Diário */}
      <div className="mt-6 flex flex-wrap gap-4">
        <div className="flex min-w-72 flex-1 flex-col gap-2">
          <p className="text-base font-medium text-zinc-400">Lucro Diário</p>
          <p className="truncate text-[32px] font-bold">{userData.dailyProfit.toLocaleString("pt-BR")} Kz</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-normal text-zinc-500">Últimos 7 dias</p>
            <div className="flex items-center gap-1">
              <span className="text-sm text-primary">⬆️</span>
              <p className="text-sm font-medium text-primary">+{userData.dailyProfitPercent}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Planos */}
      <div className="mt-6 flex flex-col gap-4">
        {userData.plans.map((plan) => (
          <div key={plan.id} className="flex flex-col gap-4 rounded-xl bg-zinc-900 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold">{plan.name}</h3>
              <div className="flex items-center gap-1">
                <span className="text-base text-primary">⬆️</span>
                <p className="text-base font-bold text-primary">+{plan.dailyProfitPercent}%</p>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-zinc-400">Valor Aplicado</p>
                <p className="text-base font-medium">{plan.invested.toLocaleString("pt-BR")} Kz</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-zinc-400">Retorno Atual</p>
                <p className="text-base font-medium text-primary">{plan.profit.toLocaleString("pt-BR")} Kz</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-zinc-800 bg-background-dark/80 px-4 pt-3 pb-6 backdrop-blur-sm">
        <div className="mx-auto grid max-w-md grid-cols-4 items-center justify-items-center gap-2">
          <Link to="/home" className="flex flex-col items-center justify-center gap-1 text-primary">
            <Home size={20} />
            <span className="text-[11px] font-bold">Início</span>
          </Link>
          <Link to="/planos" className="flex flex-col items-center justify-center gap-1 text-zinc-400">
            <BarChart2 size={20} />
            <span className="text-[11px] font-bold">Planos</span>
          </Link>
          <Link to="/carteira" className="flex flex-col items-center justify-center gap-1 text-zinc-400">
            <Wallet size={20} />
            <span className="text-[11px] font-bold">Carteira</span>
          </Link>
          <Link to="/perfil" className="flex flex-col items-center justify-center gap-1 text-zinc-400">
            <User size={20} />
            <span className="text-[11px] font-bold">Perfil</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Router principal
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
