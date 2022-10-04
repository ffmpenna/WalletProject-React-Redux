import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  createTable = (expenses) => {
    if (expenses.length === 0) {
      return null;
    }
    return expenses.map((e) => (
      <tr key={ e.id }>
        <td>{e.description}</td>
        <td>{e.tag}</td>
        <td>{e.method}</td>
        <td>{Number(e.value).toFixed(2)}</td>
        <td>{e.exchangeRates[e.currency].name}</td>
        <td>{Number(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
        <td>
          {(e.value * Number(e.exchangeRates[e.currency].ask)).toFixed(2)}
        </td>
        <td>Real</td>
      </tr>
    ));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <caption>Despesas</caption>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>{this.createTable(expenses)}</tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape([]),
}.isRequired;

function mapStateToProps(state) {
  return {
    ...state.wallet,
  };
}

export default connect(mapStateToProps)(Table);
