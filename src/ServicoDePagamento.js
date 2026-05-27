class ServicoDePagamento {
  constructor() {
    this.pagamentos = [];
  }

  pagar(codigoBarras, empresa, valor) {
    const categoria = valor > 100 ? 'cara' : 'padrao';

    const pagamento = {
      codigoBarras,
      empresa,
      valor,
      categoria,
    };

    this.pagamentos.push(pagamento);
  }

  consultarUltimoPagamento() {
    return this.pagamentos[this.pagamentos.length - 1];
  }
}

module.exports = ServicoDePagamento;
