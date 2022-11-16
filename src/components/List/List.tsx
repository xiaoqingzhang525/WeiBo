import { List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {store} from '../../redux/store'
import {ListItemType} from '../../dataType/commonDataType'

const ListForm: React.FC = (props) => {
  const navigate = useNavigate();
  const [list, setList] = useState<ListItemType[]>([]);
  
  useEffect(() => {
    setList(store.getState().list)
  },[list]);

  store.subscribe(() => {
    setList(store.getState().list);
  })

  const listHandleClick = (item: ListItemType) => {
    navigate('/detail', {state: {itemId:item.id}})
  }

  const deleteItem = (id: string) => {
    store.dispatch({
      type:'deleteArticle',
      id,
    });
  }

  return (
    <div id='listForm'>
      <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={item => (
        <List.Item
          actions={[<a key="list-loadmore-edit" onClick={() => listHandleClick(item)}>edit</a>, <a onClick={() => {deleteItem(item.id)}}>delete</a>]}
        >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.title + '(' + new Date(Date.now()).toLocaleString().split(',')[0] + ')'}</a>}
                description={item.content}/>   
            </Skeleton>
            <Skeleton avatar title={false} loading={false} active>
            <div>
                <span>评论数：{item.comments?.length}</span>
             </div>  
            </Skeleton>
        </List.Item>
      )}
    />
    </div>
  );
};

export default ListForm;