const pagamentos = [
  {
    codigoBarras: '1111-1111-1111',
    empresa: 'Empresa A',
    valor: 50.0,
    categoria: 'padrão',
  },
  {
    codigoBarras: '2222-2222-2222',
    empresa: 'Empresa B',
    valor: 200.0,
    categoria: 'cara',
  },
  {
    codigoBarras: '3333-3333-3333',
    empresa: 'Empresa C',
    valor: 30.0,
    categoria: 'padrão',
  },
];

function ServicoDePagamento() {
  const lista = [];

  this.pagar = function (codigoBarras, empresa, valor) {
    lista.push({
      codigoBarras,
      empresa,
      valor,
      categoria: valor > 100 ? 'cara' : 'padrão',
    });
  };

  this.consultarUltimoPagamento = function () {
    return lista[lista.length - 1];
  };
}

export default ServicoDePagamento;
