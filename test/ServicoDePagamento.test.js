import assert from 'node:assert';
import ServicoDePagamento from '../src/ServicoDePagamento.js';

describe('ServicoDePagamento', () => {
  describe('pagar()', () => {
    it('deve registrar pagamento com categoria "cara" quando valor > 100', () => {
      const servico = new ServicoDePagamento();

      servico.pagar('0987-7656-3475', 'Samar', 156.87);

      const resultado = servico.consultarUltimoPagamento();
      assert.strictEqual(resultado.categoria, 'cara');
    });

    it('deve registrar pagamento com categoria "padrão" quando valor <= 100', () => {
      const servico = new ServicoDePagamento();

      servico.pagar('1234-5678-9012', 'Copel', 89.9);

      const resultado = servico.consultarUltimoPagamento();
      assert.strictEqual(resultado.categoria, 'padrão');
    });

    it('deve salvar código de barras, empresa e valor', () => {
      const servico = new ServicoDePagamento();

      servico.pagar('0987-7656-3475', 'Samar', 156.87);
      const pagamento = servico.consultarUltimoPagamento();

      assert.strictEqual(pagamento.codigoBarras, '0987-7656-3475');
      assert.strictEqual(pagamento.empresa, 'Samar');
      assert.strictEqual(pagamento.valor, 156.87);
    });
  });

  describe('consultarUltimoPagamento()', () => {
    it('deve retornar undefined quando não houver pagamentos', () => {
      const servico = new ServicoDePagamento();

      assert.strictEqual(servico.consultarUltimoPagamento(), undefined);
    });

    it('deve retornar apenas o último pagamento quando houver vários', () => {
      const servico = new ServicoDePagamento();

      servico.pagar('1111-1111-1111', 'Empresa A', 50.0);
      servico.pagar('2222-2222-2222', 'Empresa B', 200.0);
      servico.pagar('3333-3333-3333', 'Empresa C', 30.0);

      const resultado = servico.consultarUltimoPagamento();
      assert.strictEqual(resultado.empresa, 'Empresa C');
    });
  });
});
