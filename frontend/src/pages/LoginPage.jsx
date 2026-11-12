import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, Shield, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/common/ThemeToggle';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState('');

  async function handleLogin(emailSubmit, senhaSubmit) {
    setErro('');
    setIsLoading(true);

    const res = await login(emailSubmit || email, senhaSubmit || senha);

    if (res.success) {
      navigate('/');
    } else {
      setErro(res.error || 'Credenciais inválidas.');
    }
    setIsLoading(false);
  }

  function handleQuickDemo(emailDemo, senhaDemo) {
    setEmail(emailDemo);
    setSenha(senhaDemo);
    handleLogin(emailDemo, senhaDemo);
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Faixa Superior Institucional */}
      <div className="w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3 px-4 sm:px-8 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-red-800 rounded-full" />
          <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 tracking-wider">
            CENTRO PAULA SOUZA · GOVERNO DO ESTADO DE SÃO PAULO
          </span>
        </div>
        <ThemeToggle />
      </div>

      {/* Bloco Central de Autenticação */}
      <div className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-md space-y-6">
          {/* Cabeçalho */}
          <div className="space-y-1.5 text-center">
            <div className="inline-flex w-12 h-12 rounded-xl bg-red-700 items-center justify-center text-white font-bold text-xl mb-3 shadow-lg shadow-red-700/20">
              A
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Avisa<span className="text-red-800">ETEC</span>
            </h1>
            <p className="text-sm text-slate-500 tracking-tight">
              Portal de comunicação escolar
            </p>
          </div>

          {/* Card de Login com Linhas Arquiteturais */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            {erro && (
              <div role="alert" className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-xs text-red-800 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{erro}</span>
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-3.5">
              <div>
                <label htmlFor="login-email-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  E-mail Institucional
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2]" />
                  <input
                    id="login-email-input"
                    type="email"
                    required
                    placeholder="nome.sobrenome@etec.sp.gov.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Senha de Acesso
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2]" />
                  <input
                    id="login-password-input"
                    type={mostrarSenha ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                  />
                  <button
                    type="button"
                    aria-label={mostrarSenha ? 'Ocultar senha' : 'Exibir senha'}
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  >
                    {mostrarSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 min-h-[42px] py-2.5 px-5 rounded-xl text-sm font-bold bg-red-700 hover:bg-red-800 text-white shadow-lg shadow-red-700/20 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <span>{isLoading ? 'Autenticando...' : 'Acessar o Sistema'}</span>
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </form>

            {/* Painel de Credenciais de Demonstração (TCC) */}
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
              <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
                Acessos de demonstração
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('professor@etec.sp.gov.br', 'senha123')}
                  className="p-3 text-left rounded border border-slate-200 dark:border-slate-700 hover:border-red-300 hover:bg-red-50/40 bg-slate-50 dark:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center space-x-1.5 font-bold text-slate-800 dark:text-slate-200">
                    <Shield className="w-3.5 h-3.5 text-red-700 flex-shrink-0" />
                    <span className="truncate">Prof. Carlos</span>
                  </div>
                  <span className="block text-[10px] text-slate-500 mt-0.5">Docente</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('coordenadora@etec.sp.gov.br', 'senha123')}
                  className="p-3 text-left rounded border border-slate-200 dark:border-slate-700 hover:border-red-300 hover:bg-red-50/40 bg-slate-50 dark:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center space-x-1.5 font-bold text-slate-800 dark:text-slate-200">
                    <Shield className="w-3.5 h-3.5 text-red-700 flex-shrink-0" />
                    <span className="truncate">Coord. Maria</span>
                  </div>
                  <span className="block text-[10px] text-slate-500 mt-0.5">Coordenação</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('lucas@aluno.etec.sp.gov.br', 'senha123')}
                  className="p-3 text-left rounded border border-slate-200 dark:border-slate-700 hover:border-red-300 hover:bg-red-50/40 bg-slate-50 dark:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center space-x-1.5 font-bold text-slate-800 dark:text-slate-200">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                    <span className="truncate">Aluno Lucas</span>
                  </div>
                  <span className="block text-[10px] text-slate-500 mt-0.5">1º módulo DS</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('rodrigo@aluno.etec.sp.gov.br', 'senha123')}
                  className="p-3 text-left rounded border border-slate-200 dark:border-slate-700 hover:border-red-300 hover:bg-red-50/40 bg-slate-50 dark:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center space-x-1.5 font-bold text-slate-800 dark:text-slate-200">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                    <span className="truncate">Aluno Rodrigo</span>
                  </div>
                  <span className="block text-[10px] text-slate-500 mt-0.5">2º módulo DS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé Legal */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 py-3 text-center text-[11px] text-slate-500">
        AvisaETEC · Trabalho de Conclusão de Curso · Uso educacional
      </footer>
    </div>
  );
}
