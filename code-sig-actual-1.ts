interface Account {
  balance: string;
  totalValueOfTransactions: string;
}

interface Accounts {
  [key: string]: Account;
}

interface Transfer {
  sourceAccount: string;
  targetAccount: string;
  value: string;
  expires: string;
}

interface Transfers {
  [key: string]: Transfer;
}

function solution(queries: string[][]): string[] {
  const result: string[] = [];
  const accounts: Accounts = {};
  const transfers: Transfers = {};
  let transferCounter = 0;
  for (const query of queries) {
    const command = query[0];
    if (command === 'CREATE_ACCOUNT') {
      const [_, timestamp, account] = query;
      if (accounts[account]) {
        result.push('false');
        continue;
      }
      accounts[account] = {balance: '0', totalValueOfTransactions: '0'};
      result.push('true');
    } else if (command === 'DEPOSIT') {
      const [_, timestamp, account, value] = query;
      console.log(accounts);
      if (accounts[account]) {
        const balance =
          parseInt(accounts[account]['balance']) + parseInt(value);
        accounts[account]['balance'] = balance.toString();
        accounts[account]['totalValueOfTransactions'] = (
          parseInt(accounts[account]['totalValueOfTransactions'] || '0') +
          parseInt(value)
        ).toString();
        result.push(balance.toString());
      } else {
        result.push('');
      }
    } else if (command === 'PAY') {
      const [_, timestamp, account, value] = query;
      if (accounts[account]) {
        const balance =
          parseInt(accounts[account]['balance']) - parseInt(value);
        if (balance < 0) {
          result.push('');
          continue;
        }
        accounts[account]['balance'] = balance.toString();
        accounts[account]['totalValueOfTransactions'] = (
          parseInt(accounts[account]['totalValueOfTransactions'] || '0') +
          parseInt(value)
        ).toString();
        result.push(balance.toString());
      } else {
        result.push('');
      }
    } else if (command === 'TOP_ACTIVITY') {
      const [_, timestamp, qty] = query;
      const topAccounts = Object.entries(accounts)
        .sort((a, b) => {
          if (
            a[1]['totalValueOfTransactions'] ===
            b[1]['totalValueOfTransactions']
          ) {
            return a[0].localeCompare(b[0]);
          }
          return (
            parseInt(b[1]['totalValueOfTransactions']) -
            parseInt(a[1]['totalValueOfTransactions'])
          );
        })
        .slice(0, parseInt(qty));
      result.push(
        topAccounts
          .map(
            account =>
              `${account[0]}(${account[1]['totalValueOfTransactions']})`
          )
          .join(', ')
      );
    } else if (command === 'TRANSFER') {
      const [_, timestamp, sourceAccount, targetAccount, value] = query;
      if (
        accounts[sourceAccount] &&
        accounts[targetAccount] &&
        sourceAccount !== targetAccount
      ) {
        const balance =
          parseInt(accounts[sourceAccount]['balance']) - parseInt(value);
        if (balance < 0) {
          result.push('');
          continue;
        }
        accounts[sourceAccount]['balance'] = balance.toString();
        transferCounter++;
        const transferName = `transfer${transferCounter}`;
        console.log(transferName);
        transfers[transferName] = {
          sourceAccount,
          targetAccount,
          value,
          expires: (parseInt(timestamp) + 86400000).toString(),
        };
        result.push(transferName);
      } else {
        result.push('');
      }
    } else if (command === 'ACCEPT_TRANSFER') {
      const [_, timestamp, account, transferName] = query;
      if (
        accounts[account] &&
        transfers[transferName] &&
        transfers[transferName]['targetAccount'] === account
      ) {
        if (transfers[transferName]['expires'] < timestamp) {
          accounts[transfers[transferName]['sourceAccount']]['balance'] = (
            parseInt(
              accounts[transfers[transferName]['sourceAccount']]['balance']
            ) + parseInt(transfers[transferName]['value'])
          ).toString();
          result.push('false');
          continue;
        }
        const balance =
          parseInt(accounts[account]['balance']) +
          parseInt(transfers[transferName]['value']);
        accounts[account]['balance'] = balance.toString();
        accounts[account]['totalValueOfTransactions'] = (
          parseInt(accounts[account]['totalValueOfTransactions'] || '0') +
          parseInt(transfers[transferName]['value'])
        ).toString();
        accounts[transfers[transferName]['sourceAccount']][
          'totalValueOfTransactions'
        ] = (
          parseInt(
            accounts[transfers[transferName]['sourceAccount']][
              'totalValueOfTransactions'
            ] || '0'
          ) + parseInt(transfers[transferName]['value'])
        ).toString();
        delete transfers[transferName];
        result.push('true');
      } else {
        result.push('false');
      }
    }
  }
  return result;
}

// ["true",
//  "true",
//  "2000",
//  "transfer1",
//  "transfer2",
//  "false",
//  "false",
//  "true",
//  "false",
//  "false",
//  "1100",
//  "1100"]

const queries = [
  ['CREATE_ACCOUNT', '1', 'acc1'],
  ['CREATE_ACCOUNT', '2', 'acc2'],
  ['CREATE_ACCOUNT', '3', 'acc3'],
  ['CREATE_ACCOUNT', '4', 'acc4'],
  ['CREATE_ACCOUNT', '5', 'acc5'],
  ['DEPOSIT', '6', 'acc0', '1000'],
  ['DEPOSIT', '7', 'acc1', '2000'],
  ['DEPOSIT', '8', 'acc2', '3000'],
  ['DEPOSIT', '9', 'acc3', '2000'],
  ['DEPOSIT', '10', 'acc4', '3000'],
  ['DEPOSIT', '11', 'acc5', '2000'],
  ['PAY', '12', 'acc3', '900'],
  ['PAY', '13', 'acc4', '700'],
  ['PAY', '14', 'acc2', '300'],
  ['PAY', '15', 'acc2', '800'],
  ['TRANSFER', '16', 'acc1', 'acc3', '600'],
  ['TRANSFER', '17', 'acc5', 'acc3', '200'],
  ['TRANSFER', '18', 'acc2', 'acc1', '500'],
  ['TRANSFER', '19', 'acc5', 'acc5', '900'],
  ['DEPOSIT', '20', 'acc0', '400'],
  ['DEPOSIT', '21', 'acc1', '500'],
  ['DEPOSIT', '22', 'acc2', '700'],
  ['DEPOSIT', '23', 'acc3', '800'],
  ['DEPOSIT', '24', 'acc4', '400'],
  ['DEPOSIT', '25', 'acc5', '500'],
  ['TOP_ACTIVITY', '26', '5'],
  ['ACCEPT_TRANSFER', '42', 'acc3', 'transfer1'],
  ['ACCEPT_TRANSFER', '43', 'acc3', 'transfer2'],
  ['ACCEPT_TRANSFER', '44', 'acc1', 'transfer3'],
  ['ACCEPT_TRANSFER', '45', 'acc5', 'transfer4'],
  ['TOP_ACTIVITY', '46', '10'],
  ['TRANSFER', '47', 'acc5', 'acc1', '200'],
  ['TRANSFER', '48', 'acc3', 'acc1', '900'],
  ['TRANSFER', '49', 'acc4', 'acc1', '200'],
  ['TOP_ACTIVITY', '50', '10'],
  ['ACCEPT_TRANSFER', '51', 'acc1', 'transfer6'],
  ['ACCEPT_TRANSFER', '52', 'acc1', 'transfer5'],
  ['ACCEPT_TRANSFER', '53', 'acc1', 'transfer4'],
  ['TOP_ACTIVITY', '54', '5'],
];

console.log(solution(queries));
