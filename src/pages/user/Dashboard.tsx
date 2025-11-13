import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { TrendingUp, Lock, CheckCircle2, Home, Wallet, User, BarChart3 } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const Dashboard = () => {
  const [chartData, setChartData] = useState([
    { day: "S", profit: 120 },
    { day: "T", profit: 140 },
    { day: "Q", profit: 130 },
    { day: "Q", profit: 150 },
    { day: "S", profit: 170 },
    { day: "S", profit: 190 },
    { day: "H", profit: 210 },
  ]);

  const [user, setUser] = useState("Mário Estima");

  useEffect(() => {
    // Exemplo: futuramente carregar dados reais da API
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-zinc-950 text-white">
      {/* Topbar */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-zinc-900/80 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div
            className="size-10 rounded-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://avatars.githubusercontent.com/u/76881310?v=4')",
            }}
          />
          <h2 className="text-lg font-semibold">Bem-vindo, {user}</h2>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 px-4 py-4">
        {/* Resumo principal */}
        <div className="rounded-xl bg-zinc-900 p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Total Investido</p>
              <p className="text-2xl font-bold">25.480,50 Kz</p>
            </div>
            <div className="h-10 w-px bg-zinc-800"></div>
            <div className="text-right">
              <p className="text-sm text-zinc-400">Lucro Total</p>
              <p className="text-2xl font-bold text-green-400">3.120,75 Kz</p>
            </div>
          </div>
        </div>

        {/* Lucro diário + gráfico */}
        <section className="mt-6 rounded-xl bg-zinc-900 p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-base text-zinc-400">Lucro Diário</p>
            <span className="flex items-center gap-1 text-green-400 text-sm">
              <TrendingUp size={16} />
              +2.5%
            </span>
          </div>
          <p className="mt-1 text-3xl font-bold">150,30 Kz</p>

          {/* Gráfico */}
          <div className="mt-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <defs>
                  <linearGradient id="profitColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#25f436" stopOpacity={0.3} />
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

        {/* Badges de status */}
        <div className="mt-6 flex gap-4">
          <Badge label="Planos Ativos" value="5" color="green" icon={<CheckCircle2 size={16} />} />
          <Badge label="Planos Fechados" value="12" color="red" icon={<Lock size={16} />} />
        </div>
      </main>

      {/* Rodapé fixo com navegação */}
      <FooterNav />
    </div>
  );
};

/* ------------------- COMPONENTES ------------------- */

const Badge = ({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: string;
  icon?: React.ReactNode;
}) => (
  <div
    className={`flex flex-1 items-center justify-between rounded-xl bg-zinc-900 px-4 py-3 shadow-md border-l-4 ${color === "green"
      ? "border-green-500 text-green-400"
      : "border-red-500 text-red-400"
      }`}
  >
    <div className="flex items-center gap-2 text-sm font-medium">
      {icon}
      {label}
    </div>
    <span className="text-lg font-bold">{value}</span>
  </div>
);

const FooterNav = () => {
  const location = useLocation();

  const navItems = [
    { label: "Início", to: "/dashboard", icon: <Home size={20} /> },
    { label: "Planos", to: "/plans", icon: <BarChart3 size={20} /> },
    { label: "Carteira", to: "/wallet", icon: <Wallet size={20} /> },
    { label: "Perfil", to: "/profile", icon: <User size={20} /> },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-md px-4 py-3">
      <div className="mx-auto grid max-w-md grid-cols-4 items-center justify-items-center">
        {navItems.map(({ label, to, icon }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center justify-center gap-1 transition ${isActive ? "text-green-400" : "text-zinc-400 hover:text-zinc-200"
                }`}
            >
              {icon}
              <span className="text-[11px] font-semibold">{label}</span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
};

export default Dashboard;
