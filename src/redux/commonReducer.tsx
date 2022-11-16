import {ListItemType, StateType, ActionType} from '../dataType/commonDataType'
import { v4 as uuid } from 'uuid';

const initialState:StateType = {
  list: [
    {
      id: uuid(),
      title:'title1',
      content: 'title1 -- content1',
      createTime: '2022-8-22',
      comments: [
        {
          author: '未命名',
          content: '11111'
        }
      ]
    }
  ],
}

export const commonReducer = (state = initialState, action: ActionType) => {

const {type} = action;

  switch(type) {
    case 'addArticle':
      return {
        ...state,
        list: [ action.listItem, ...state.list]
      }
    case 'deleteArticle':
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.id)
      }
    case 'addComment':
      const listCopy = JSON.parse(JSON.stringify(state.list))
      listCopy.forEach((item:ListItemType)  => {
        if(item.id === action.parentId){
          item.comments = [...item.comments, action.comment]
        }
        return item
      })
      return {
        ...state,
        list: listCopy
      }
  }
  return state
}
