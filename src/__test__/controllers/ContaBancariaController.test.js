import ContaController from '../../controllers/ContaBancariaController.js';
import Conta from '../../models/ContaBancaria.js';
import Transacao from '../../models/Transacao.js';

Conta.findOne = jest.fn();
Conta.update = jest.fn();
Conta.create = jest.fn();

Transacao.findAll = jest.fn();

const mockReq = (overrides = {}) => ({
  params: {},
  body: {},
  userId: 1,
  ...overrides,
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json   = jest.fn().mockReturnValue(res);
  return res;
};

afterEach(() => jest.clearAllMocks());

describe('getSaldo', () => {
  it('retorna 200 com o saldo quando a conta existe', async () => {

    Conta.findOne.mockResolvedValue({ id: 1, balance: 500.00 });

    const req = mockReq({ params: { id: '1' } });
    const res = mockRes();

    await ContaController.getSaldo(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Seu saldo é 500',
    });
  });

  it('retorna 404 quando a conta não existe', async () => {
    Conta.findOne.mockResolvedValue(null);

    const req = mockReq({ params: { id: '99' } });
    const res = mockRes();

    await ContaController.getSaldo(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Conta não encontrada',
    });
  });

  it('retorna 500 se o model lançar um erro', async () => {
    Conta.findOne.mockRejectedValue(new Error('Conexão perdida'));

    const req = mockReq({ params: { id: '1' } });
    const res = mockRes();

    await ContaController.getSaldo(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Conexão perdida' });
  });
});

describe('getTransactions', () => {
  it('retorna 200 com as transações quando existem registros', async () => {
    const fakeTransacoes = [
      { id: 1, tipo: 'deposito', valor: 100 },
      { id: 2, tipo: 'saque',    valor: 50  },
    ];
    Transacao.findAll.mockResolvedValue(fakeTransacoes);

    const req = mockReq({ params: { contaId: '1' } });
    const res = mockRes();

    await ContaController.getTransactions(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: fakeTransacoes,
    });
  });

  it('retorna 404 quando não há transações', async () => {
    Transacao.findAll.mockResolvedValue([]);

    const req = mockReq({ params: { contaId: '1' } });
    const res = mockRes();

    await ContaController.getTransactions(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Nenhuma transação foi feita',
    });
  });

  it('retorna 500 se o model lançar erro', async () => {
    Transacao.findAll.mockRejectedValue(new Error('Timeout'));

    const req = mockReq({ params: { contaId: '1' } });
    const res = mockRes();

    await ContaController.getTransactions(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('saque', () => {
  it('retorna 400 se o valor for 0', async () => {
    const req = mockReq({ params: { id: '1' }, body: { valor: 0 } });
    const res = mockRes();

    await ContaController.saque(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Valor inválido para saque',
    });
    expect(Conta.findOne).not.toHaveBeenCalled();
  });

  it('retorna 400 se o valor for negativo', async () => {
    const req = mockReq({ params: { id: '1' }, body: { valor: -50 } });
    const res = mockRes();

    await ContaController.saque(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(Conta.findOne).not.toHaveBeenCalled();
  });

  it('retorna 404 se a conta não existir', async () => {
    Conta.findOne.mockResolvedValue(null);

    const req = mockReq({ params: { id: '99' }, body: { valor: 100 } });
    const res = mockRes();

    await ContaController.saque(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(Conta.update).not.toHaveBeenCalled();
  });

  it('retorna 400 se o saldo for insuficiente', async () => {
    Conta.findOne.mockResolvedValue({ id: 1, balance: 50.00 });

    const req = mockReq({ params: { id: '1' }, body: { valor: 200 } });
    const res = mockRes();

    await ContaController.saque(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Saldo insuficiente',
    });
    expect(Conta.update).not.toHaveBeenCalled();
  });

  it('realiza o saque e retorna 200 com o novo saldo', async () => {
    Conta.findOne.mockResolvedValue({ id: 1, balance: 500.00 });
    Conta.update.mockResolvedValue([1]);

    const req = mockReq({ params: { id: '1' }, body: { valor: 150 } });
    const res = mockRes();

    await ContaController.saque(req, res);

    expect(Conta.update).toHaveBeenCalledWith(
      { balance: 350 },
      { where: { id: '1' } }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Saque de R$ 150 realizado com sucesso!',
      novoSaldo: 350,
    });
  });
});

