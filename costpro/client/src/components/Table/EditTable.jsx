import React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
// Third party components
import SweetAlert from "react-bootstrap-sweetalert";
// core components
import BaseTable from "src/components/Table/BaseTable.jsx";
import CustomButton from "src/components/CustomButton.jsx";
// @material-ui/icons
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import Save from "@material-ui/icons/Save";
import Edit from "@material-ui/icons/Edit";
import DeleteForever from "@material-ui/icons/DeleteForever";
// jss assets
import editTableStyle from "src/assets/jss/components/editTableStyle.jsx";
// css
import 'react-table/react-table.css';



/***
  1. EditTable do all filter, sort, change page job.
  2. EditTable do all CURD jobs.
***/

class EditTable extends React.Component {

  constructor(props) {
    super(props);

    this.basicAlert = this.basicAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.onFetchData = this.onFetchData.bind(this);
    this.renderActionCell = this.renderActionCell.bind(this);
    this.renderEditableCell = this.renderEditableCell.bind(this);
    this.editableCellOnChange = this.editableCellOnChange.bind(this);
    this.onAdd = this.onAdd.bind(this);

    this.state = {
      alert: null,
      columns: this.props.tableConfig.columns,
      loading: true,
      editingIndex: -1
    };
  }

  onFetchData(state, instance) {
    this.setState({
      loading: true
    });

    let queryParams = {
      page: state.page + 1,
      pageSize: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered
    }

    let url = this.props.url;
    let params = {
      params: {
        value: btoa(JSON.stringify(queryParams))
      }
    }

    axios.get(url, params).then((res) => {
      this.setState({
        data: res.data.rows,
        pages: res.data.total_pages,
        loading: false,
        editingIndex: -1
      });
    }).catch((err) => {
      throw "Load server-side data failed!"
    });
  }

  basicAlert() {
    this.setState({
      alert: (
        <SweetAlert
          type="warning"
          title="Please save the current editing row first!"
          onConfirm={this.hideAlert}
          focusConfirmBtn={false}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.warning
          }
        />
      )
    });
  }

  hideAlert() {
    this.setState({
      alert: null
    });
  }

  renderActionCell(cellProps) {
    let classes = this.props.classes;
    return (
      <React.Fragment>
        <CustomButton color='info' className={classes.actionButton} onClick={this.onSave.bind(this, cellProps.index)}>
          <Save className={classes.icon} />
        </CustomButton>
        <CustomButton color='success' className={classes.actionButton} onClick={this.onEdit.bind(this, cellProps.index)}>
          <Edit className={classes.icon} />
        </CustomButton>
        <CustomButton color='danger' className={classes.actionButton} onClick={this.onDelete.bind(this, cellProps.index)}>
          <DeleteForever className={classes.icon} />
        </CustomButton>
      </React.Fragment>
    )
  }

  renderEditableCell(cellProps) {
    let { editingIndex } = this.state;
    let defaultValue = cellProps.value === null ? '' : cellProps.value;

    if(editingIndex == cellProps.index) {
      return (
        <TextField
          label={cellProps.column.Header}
          margin="none"
          variant="filled"
          required
          onChange={this.editableCellOnChange}
          name={cellProps.column.id}
          defaultValue={defaultValue}
          style={{ height: 50, width: '100%' }}
        />
      )
    } else {
      return defaultValue;
    }
  }

  editableCellOnChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  reload(e) {
    let state = this.tableRef.current.state;
    let instance = this.tableRef.current;
    this.tableRef.current.props.onFetchData(state, instance);
  }

  onAdd(e) {
    if(this.state.editingIndex > -1) {
      this.basicAlert();
      return;
    }
    this.setState((state) => {
      let newData = state.data.map((value) => {
        return value;
      });
      newData.unshift({
        id: null,
        name: null,
        desc: null
      });
      return {
        data: newData,
        editingIndex: 0
      }
    });
  }

  onSave(index, e) {
    let editingIndex = this.state.editingIndex;
  }

  onEdit(index, e) {
    if(this.state.editingIndex > - 1) {
      // throw warning card
      return;
    }
    this.setState({
      editingIndex: index
    });
  }

  onDelete(rowIndex, e) {
    let editingIndex = this.state.editingIndex;
    if(rowIndex != editingIndex && editingIndex > -1) {
      //throw warning card, should finish editing first
      return;
    }

    if(rowIndex == editingIndex) {
      this.setState((state) => {
        let newData = [];
        for(let i = 0; i < state.data.length; i++) {
          if(i != rowIndex) {
            newData.push(state.data[i]);
          } 
        }
        return {
          data: newData,
          editingIndex: -1
        }
      });
    }

    if(rowIndex != editingIndex) {
      // backend delete
    }
  }

  render() {
    let { data, pages, loading } = this.state;
    let { tableConfig, onFetchData } = this.props;

    let toolbarButtons = (
      <CustomButton color="github" justIcon round onClick={this.onAdd}>
        <AddShoppingCart />
      </CustomButton>
    );

    return (
      <React.Fragment>
        {this.state.alert}
        <BaseTable
          tableConfig={tableConfig}
          data={data}
          pages={pages}
          loading={loading}
          onFetchData={this.onFetchData}
          renderActionCell={this.renderActionCell}
          renderEditableCell={this.renderEditableCell}
          toolbarButtons={toolbarButtons}
          reload={this.reload}
        />
      </React.Fragment>
    )
  }
}

export default withStyles(editTableStyle)(EditTable);