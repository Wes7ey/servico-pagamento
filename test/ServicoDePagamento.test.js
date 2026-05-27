const assert = require('node:assert');
const ServicoDePagamento = require('../src/ServicoDePagamento');

describe('ServicoDePagamento', () => {
  describe('pagar()', () => {
    it('deve registrar um pagamento com categoria "cara" quando valor > 100', () => {
      const servico = new ServicoDePagamento();

      servico.pagar('0987-7656-3475', 'Samar', 156.87);

      const resultado = servico.consultarUltimoPagamento();
      assert.strictEqual(resultado.categoria, 'cara');
    });

    it('deve registrar um pagamento com categoria "padrão" quando valor <= 100', () => {
      const servico = new ServicoDePagamento();

      servico.pagar('1234-5678-9012', 'Copel', 89.9);

      const resultado = servico.consultarUltimoPagamento();
      assert.strictEqual(resultado.categoria, 'padrão');
    });

    it('deve salvar corretamente as propriedades do pagamento', () => {
      const servico = new ServicoDePagamento();

      servico.pagar('0987-7656-3475', 'Samar', 156.87);
      const resultado = servico.consultarUltimoPagamento();

      assert.strictEqual(resultado.codigoBarras, '0987-7656-3475');
      assert.strictEqual(resultado.empresa, 'Samar');
      assert.strictEqual(resultado.valor, 156.87);
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
