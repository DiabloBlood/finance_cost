import { connect } from 'react-redux';
import EditTable from "src/components/Table/EditTable/EditTable.jsx";
import {
  onBeforeLoad,
  onLoadSuccess,
  setAlert,
  onAddRow,
  onCellChange,
  onEditRow,
  onCancelRow,
  onSaveSuccess,
  onDeleteSuccess,
} from "src/components/Table/EditTable/actions.jsx";



const mapStateToProps = state => {
  return {
    data: state.data,
    pages: state.pages,
    loading: state.loading,
    alert: state.alert,
    alertMsg: state.alertMsg,
    editingIndex: state.editingIndex,
    isNew: state.isNew,
    editingRow: state.editingRow
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  let { trackingKeys } = ownProps.tableConfig;
  return {
    onBeforeLoad: () => dispatch(onBeforeLoad()),
    onLoadSuccess: res => dispatch(onLoadSuccess(res)),
    setAlert: (alert, msg) => dispatch(setAlert(alert, msg)),
    onAddRow: () => dispatch(onAddRow(trackingKeys)),
    onCellChange: (name, value) => dispatch(onCellChange(name, value)),
    onEditRow: (data, index) => dispatch(onEditRow(trackingKeys, data, index)),
    onCancelRow: () => dispatch(onCancelRow()),
    onSaveSuccess: res => dispatch(onSaveSuccess(res)),
    onDeleteSuccess: index => dispatch(onDeleteSuccess(index))
  }
}

const EditTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTable);

export default EditTableContainer;