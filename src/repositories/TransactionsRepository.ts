/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateRepositoryDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance | null {


    const income = this.transactions.reduce((acc, cur) => {
      if (cur.type === 'income') {
        acc += cur.value;
      }
      return acc;
    }, 0);

    const outcome = this.transactions.reduce((acc, cur) => {
      if (cur.type === 'outcome') {
        acc += cur.value;
      }
      return acc;
    }, 0);

    const total = income - outcome;
    if (total >= 0 ) {
    }
    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
    // throw Error('Balanço negativo')




  }

  public create({ title , type , value} :CreateRepositoryDTO): Transaction {

    const balance = this.getBalance();
    const saldo = balance?.total || 0;

    if(type === 'outcome' && ((-value + saldo) < 0 )) {
      throw Error('Balanço negativo')
    } else {
      const appointments = new Transaction({title , type , value});
      this.transactions.push(appointments);
      return appointments;
    }



  }
}

export default TransactionsRepository;
