import React, { Component } from 'react';
import 'antd/dist/antd.css';


import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

import './App.css';


import { NumberFormatter } from './NumberFormatter';
import { NumericCellEditor, InputCellEditor } from './NumericEditor';
import { RangeFilter } from './RangeFilter';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {headerName: 'Make', field: 'make', editable:true, cellEditor: 'inputCellEditor' },
                {headerName: 'Model', field: 'model', editable:true,   cellEditor: 'inputCellEditor' },
                {
                    headerName: 'Price',
                    field: 'price',
                    editable: true,
                    cellRenderer: 'numberFormatter',
                    cellEditor: 'numericCellEditor',
                    filter: 'rangeFilter'
                }
            ],
            rowData: [],
        
            frameworkComponents: {
                'numberFormatter': NumberFormatter,
                'numericCellEditor': NumericCellEditor,
                'inputCellEditor': InputCellEditor,
                'rangeFilter': RangeFilter
            }
        }

    }

    gridReady(params){
        this.params = params;
    }

    onCellClicked($event){
        $event.api.startEditingCell({
          rowIndex: $event.rowIndex,
          colKey: $event.column.colId
        });
    }


    componentDidMount() {
        fetch('https://api.myjson.com/bins/15psn9')
            .then(result => result.json())
            .then(rowData => this.setState({rowData}))
            .then(()=>{
                
            });


        
    }

    render() {
        return (
            <div
                className="ag-theme-balham"
                style={{height: '400px', width: '900px'}}
            >
                <AgGridReact
                    enableSorting={true}
                    enableFilter={true}
                    pagination={true}
                    gridOptions={{
                        rowHeight:34
                    }}
                    editType="fullRow"
                    columnDefs={this.state.columnDefs}
                    frameworkComponents={this.state.frameworkComponents}
                    rowData={this.state.rowData} 
                    onGridReady={this.gridReady}
                    onCellClicked={this.onCellClicked}
                    >
                </AgGridReact>
            </div>
        );
    }
}

export default App;