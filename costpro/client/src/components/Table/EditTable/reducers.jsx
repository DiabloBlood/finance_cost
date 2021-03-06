import {
  ON_BEFORE_LOAD,
  ON_LOAD_SUCCESS,
  SET_ALERT,
  ON_ADD_ROW,
  ON_CELL_CHANGE,
  ON_EDIT_ROW,
  ON_CANCEL_ROW,
  ON_SAVE_SUCCESS,
  ON_DELETE_SUCCESS
} from "src/components/Table/EditTable/actions.jsx";



const defaultState = {
  data: [],
  pages: 0,
  loading: true,
  alert: false,
  alertMsg: null,
  editingIndex: -1,
  isNew: false,
  editingRow: {}
}


const editTableReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ON_BEFORE_LOAD:
      return { ...state, loading: true };
    case ON_LOAD_SUCCESS:
      return {
        data: action.res.data.rows,
        pages: action.res.data.total_pages,
        loading: false,
        editingIndex: -1,
        isNew: false,
        editingRow: null
      };
    case SET_ALERT:
      return {
        ...state,
        alert: action.alert,
        alertMsg: action.msg
      }
    case ON_ADD_ROW:
      return {
        ...state,
        data: [ action.editingRow, ...state.data ],
        editingIndex: 0,
        isNew: true,
        editingRow: action.editingRow
      };
    case ON_CELL_CHANGE:
      return {
        ...state,
        editingRow: {
          ...state.editingRow,
          [action.name]: action.value
        }
      }
    case ON_EDIT_ROW:
      return {
        ...state,
        editingIndex: action.index,
        isNew: false,
        editingRow: action.editingRow
      }
    case ON_CANCEL_ROW:
      return {
        ...state,
        data: state.editingIndex == 0 && state.isNew ? state.data.slice(1) : state.data,
        editingIndex: -1,
        isNew: false,
        editingRow: {}
      };
    case ON_SAVE_SUCCESS:
      let newData = state.data.map((row, index) => {
        return index == state.editingIndex ? action.res.data.row : row;
      });
      return {
        ...state,
        data: newData,
        editingIndex: -1,
        isNew: false,
        editingRow: {}
      };
    case ON_DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.slice(0, action.index).concat(state.data.slice(action.index + 1)),
        editingIndex: -1,
        isNew: false,
        editingRow: {}
      };
    default:
      return state;
  }
}


export default editTableReducer;