import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DepositSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] text-white px-6">

      {/* Check animado */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          type: "spring",
        }}
        className="mb-6"
      >
        <CheckCircle size={110} className="text-green-500" />
      </motion.div>

      {/* Texto */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl font-bold text-center"
      >
        Comprovativo Enviado!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="text-gray-400 text-center mt-2 max-w-sm"
      >
        Seu depósito está sendo analisado pela nossa equipe.  
        Você será notificado assim que for aprovado.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onClick={() => navigate("/dashboard")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 transition text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2"
      >
        Ir para Dashboard <ArrowRight size={18} />
      </motion.button>
    </div>
  );
};

export default DepositSuccess;
