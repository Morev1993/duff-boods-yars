import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addItem, removeItem } from 'actions/todo';
import styles from './Todo.css';
import Input from 'components/Input';
import List from 'components/List';

class Todo extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this._onInputChange = this._onInputChange.bind(this);
    this._onInputEnter = this._onInputEnter.bind(this);
    this._onRemoveItem = this._onRemoveItem.bind(this);
    this.state = {
      inputValue: '',
    };
  }

  _onInputChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  _onInputEnter(event) {
    const item = event.target.value.trim();

    if (event.which === 13 && item) {
      this.props.dispatch(addItem(item));
      this.setState({ inputValue: '' });
    }
  }

  _onRemoveItem(item) {
    this.props.dispatch(removeItem(item));
  }

  render() {
    const { todo: { items } } = this.props;

    let count = items.length || null;
    if (count) {
      count = `${count} ${count > 1 ? 'items' : 'item'}`;
    }

    return (
      <div className={styles.base}>
        <div className={styles.inputContainer}>
          <Input
            className={styles.input}
            placeholder="Enter new item"
            onChange={this._onInputChange}
            onKeyDown={this._onInputEnter}
            value={this.state.inputValue}
          />
        </div>
        <List
          items={items}
          onRemove={this._onRemoveItem}
        />
        <p>{count}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todo: state.todo,
  };
}

export default connect(mapStateToProps)(Todo);
