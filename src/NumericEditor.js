import React, { Component } from 'react';
import { InputNumber, Input } from 'antd';

export class NumericCellEditor extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    onKeyPress(event) {
        if (!isNumeric(event.nativeEvent)) {
            event.preventDefault();
        }

        function isNumeric(event) {
            return /\d/.test(event.key);
        }
    }

    onKeyDown(event) {
        if (event.keyCode === 39 || event.keyCode === 37) {
            event.stopPropagation();
        }
    }

    afterGuiAttached() {
      //  if (this.textInput) this.textInput.current.focus();
    };

    getValue() {
        return this.textInput.current.inputNumberRef.state.inputValue;
    };

    componentDidMount() {
        this.textInput.current.inputNumberRef.onKeyDown = this.onKeyDown;  //addEventListener('keydown', this.onKeyDown);
    }

    render() {
        return (
            <InputNumber onKeyPress={this.onKeyPress} ref={this.textInput}  defaultValue={this.props.value} />
        );
    }
}


export class InputCellEditor extends Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    onKeyDown(event) {
        if (event.keyCode === 39 || event.keyCode === 37) {
            event.stopPropagation();
        }
    }

    afterGuiAttached() {
       //git if (this.textInput) this.textInput.current.focus();
    };

    getValue() {
        return this.textInput.current.state.value;
    };

    componentDidMount() {
      
    }

    render() {
        return (
            <Input ref={this.textInput}  defaultValue={this.props.value} />
        );
    }
}