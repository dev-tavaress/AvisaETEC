import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f7f7f5] text-slate-900 text-center">
      <div className="p-4 bg-red-50 text-red-800 rounded-xl mb-4">
        <AlertTriangle className="w-12 h-12" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Página não encontrada</h1>
      <p className="text-sm text-slate-500 max-w-sm mb-6">
        A rota que você tentou acessar não existe no AvisaETEC.
      </p>
      <Link
        to="/"
        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-red-800 hover:bg-red-900 text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar aos avisos</span>
      </Link>
    </div>
  );
}
