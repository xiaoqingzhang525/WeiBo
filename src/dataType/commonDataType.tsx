export interface CommentType {
  author: string,
  content: string
}

export interface ListItemType {
  id: string,
  title: string,
  content: string,
  createTime: string
  comments: CommentType[]
}

export interface StateType {
  list: ListItemType[]
}

export interface ActionType {
  type: string,
  listItem: ListItemType,
  id: string,
  parentId: string,
  comment: CommentType
};


