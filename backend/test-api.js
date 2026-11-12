import http from 'http';
import app from './src/app.js';
import { initSocket } from './src/sockets/socketManager.js';
import prisma from './src/config/prisma.js';

const server = http.createServer(app);
initSocket(server);

const PORT = 3099; // Porta isolada para testes automatizados

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const req = http.request(
      `http://localhost:${PORT}${path}`,
      {
        method: options.method || 'GET',
        headers: { ...defaultHeaders, ...(options.headers || {}) }
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(body) });
          } catch {
            resolve({ status: res.statusCode, data: body });
          }
        });
      }
    );
    req.on('error', reject);
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`🧪 Servidor de teste iniciado em http://localhost:${PORT}`);

  let passed = 0;
  let failed = 0;

  function assert(description, condition) {
    if (condition) {
      console.log(`  ✅ [PASS] ${description}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${description}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    const r1 = await request('/api/health');
    assert('Health check retorna status 200 e service "AvisaETEC Backend API"', r1.status === 200 && r1.data.status === 'online');

    // 2. Login de Professor
    const r2 = await request('/api/auth/login', {
      method: 'POST',
      body: { email: 'professor@etec.sp.gov.br', senha: 'senha123' }
    });
    assert('Login de Professor com sucesso (JWT retornado)', r2.status === 200 && !!r2.data.token && r2.data.user.tipo === 'FUNCIONARIO');
    const professorToken = r2.data.token;

    // 3. Login de Aluno
    const r3 = await request('/api/auth/login', {
      method: 'POST',
      body: { email: 'lucas@aluno.etec.sp.gov.br', senha: 'senha123' }
    });
    assert('Login de Aluno com sucesso (JWT retornado e id_modulo presente)', r3.status === 200 && !!r3.data.token && r3.data.user.tipo === 'ALUNO');
    const alunoToken = r3.data.token;

    // 4. Listar Módulos
    const r4 = await request('/api/modulos', {
      headers: { Authorization: `Bearer ${professorToken}` }
    });
    assert('Listagem de módulos para Funcionário', r4.status === 200 && Array.isArray(r4.data) && r4.data.length >= 2);
    const moduloId = r4.data[0].id_modulo;

    // 5. Teste de Segurança RN01: Aluno NÃO pode listar alunos ou enviar notificações
    const r5 = await request('/api/alunos', {
      headers: { Authorization: `Bearer ${alunoToken}` }
    });
    assert('RN01: Aluno é bloqueado com 403 Forbidden ao tentar rota de funcionários', r5.status === 403);

    // 6. Teste de Segurança RN02: Tentativa de envio com ambos destinos (turma e aluno)
    const r6 = await request('/api/notificacoes', {
      method: 'POST',
      headers: { Authorization: `Bearer ${professorToken}` },
      body: {
        titulo: 'Teste Invalido Duplo',
        mensagem: 'Violação RN02',
        id_modulo_destino: moduloId,
        id_aluno_destino: 1
      }
    });
    assert('RN02: Backend rejeita destino duplo (turma + aluno) com 400 Bad Request', r6.status === 400);

    // 7. Teste de Segurança RN02: Tentativa de envio sem nenhum destino
    const r7 = await request('/api/notificacoes', {
      method: 'POST',
      headers: { Authorization: `Bearer ${professorToken}` },
      body: {
        titulo: 'Teste Invalido Vazio',
        mensagem: 'Sem destino'
      }
    });
    assert('RN02: Backend rejeita envio sem nenhum destino com 400 Bad Request', r7.status === 400);

    // 8. Envio válido para a turma (RN02 cumprida)
    const r8 = await request('/api/notificacoes', {
      method: 'POST',
      headers: { Authorization: `Bearer ${professorToken}` },
      body: {
        titulo: 'Aula Extra de Revisão',
        mensagem: 'Revisão geral para o TCC na sexta-feira às 15h.',
        id_modulo_destino: moduloId
      }
    });
    assert('Criação de Notificação para Turma com Sucesso (201 Created)', r8.status === 201 && !!r8.data.notificacao.id_notificacao);
    const novaNotificacaoId = r8.data.notificacao.id_notificacao;

    // 9. Feed do Aluno
    const r9 = await request('/api/notificacoes', {
      headers: { Authorization: `Bearer ${alunoToken}` }
    });
    assert('Aluno recebe feed contendo avisos da sua turma', r9.status === 200 && r9.data.some((n) => n.id_notificacao === novaNotificacaoId));

    // 10. Atualização de status de leitura (RN04)
    const r10 = await request(`/api/notificacoes/${novaNotificacaoId}/status`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${alunoToken}` },
      body: { status: true }
    });
    assert('RN04: Atualização de status de leitura com sucesso', r10.status === 200 && r10.data.notificacao.status === true);

  } catch (err) {
    console.error('Erro durante os testes:', err);
    failed++;
  } finally {
    await prisma.$disconnect();
    server.close();
    console.log(`\n🏁 Resultado dos Testes Automatizados: ${passed} passaram, ${failed} falharam.`);
    process.exit(failed > 0 ? 1 : 0);
  }
}

runTests();
