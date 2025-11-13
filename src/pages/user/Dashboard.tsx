import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TrendingUp, Lock, CheckCircle2, Home, Wallet, User, BarChart3 } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const Dashboard = () => {
  const location = useLocation();

  const [chartData] = useState([
    { day: "S", profit: 120 },
    { day: "T", profit: 140 },
    { day: "Q", profit: 130 },
    { day: "Q", profit: 150 },
    { day: "S", profit: 170 },
    { day: "S", profit: 190 },
    { day: "H", profit: 210 },
  ]);

  const [user] = useState("Mário Estima");

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-white font-display">
      {/* Topbar */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background-dark/80 p-4 pb-2 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-800">
            <User size={28} />
          </div>
          <h2 className="flex-1 text-lg font-bold tracking-tight text-zinc-100">
            Olá, {user}
          </h2>
        </div>
        <div className="flex w-12 items-center justify-end">
          <span className="material-symbols-outlined text-2xl text-zinc-100">
            notifications
          </span>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 px-4 py-2">
        {/* Resumo principal */}
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

        {/* Lucro diário + gráfico */}
        <section className="mt-6 flex flex-col gap-2 rounded-xl bg-zinc-900 p-4">
          <div className="flex items-center justify-between">
            <p className="text-base font-medium text-zinc-400">Lucro Diário</p>
            <div className="flex items-center gap-1 text-primary text-sm">
              <TrendingUp size={16} />
              +2.5%
            </div>
          </div>
          <p className="text-[32px] font-bold text-white">150,30 Kz</p>

          <div className="mt-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="profitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#25f436" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#25f436" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#25f436"
                  strokeWidth={3}
                  dot={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "none",
                    color: "#25f436",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Badges */}
        <div className="mt-6 flex flex-wrap gap-4">
          <Badge label="Planos Ativos" value="5" color="green" icon={<CheckCircle2 size={16} />} />
          <Badge label="Planos Fechados" value="12" color="red" icon={<Lock size={16} />} />
        </div>
      </main>

      {/* Rodapé fixo */}
      <FooterNav location={location} />
    </div>
  );
};

/* ------------------- COMPONENTES ------------------- */
const Badge = ({ label, value, color, icon }: { label: string; value: string; color: string; icon?: React.ReactNode }) => (
  <div className={`flex flex-1 items-center justify-between rounded-xl bg-zinc-900 p-4 shadow-md border-l-4 ${color === "green" ? "border-green-500 text-green-400" : "border-red-500 text-red-400"}`}>
    <div className="flex items-center gap-2 text-sm font-medium">{icon}{label}</div>
    <span className="text-lg font-bold">{value}</span>
  </div>
);

const FooterNav = ({ location }: { location: any }) => {
  const navItems = [
    { label: "Início", to: "/dashboard", icon: <Home size={20} /> },
    { label: "Planos", to: "/plans", icon: <BarChart3 size={20} /> },
    { label: "Carteira", to: "/wallet", icon: <Wallet size={20} /> },
    { label: "Perfil", to: "/profile", icon: <User size={20} /> },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-zinc-800 bg-background-dark/80 px-4 pt-3 pb-6 backdrop-blur-sm">
      <div className="mx-auto grid max-w-md grid-cols-4 items-center justify-items-center gap-2">
        {navItems.map(({ label, to, icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center justify-center gap-1 ${isActive ? "text-primary" : "text-zinc-400 hover:text-zinc-100"}`}
            >
              {icon}
              <span className="text-[11px] font-bold">{label}</span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Dashboard;
