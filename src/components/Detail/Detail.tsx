import './Detail.css';
import {store} from '../../redux/store'
import { Layout,Button } from 'antd';
import React, {useState,useEffect} from 'react';
import Comments from '../Comments/Comments'
import {ListItemType } from '../../dataType/commonDataType'
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Footer, Content } = Layout;
interface LocationState {
  itemId: string;
}

const App: React.FC = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const { itemId } =  state as LocationState;
  const [listItem, setListItem] = useState<ListItemType>({} as ListItemType);

  useEffect(() => {
    setListItem(store.getState().list.filter(item=>item.id===itemId)[0])
  },[listItem,itemId]);

  store.subscribe(() => {
    setListItem(store.getState().list.filter(item=>item.id===itemId)[0])
  })

  return (
    <div className="detailClass">
    <div style={{textAlign:'left'}}>
    <Button type='primary' onClick={() => { navigate('/home')}}>返回</Button>
    </div>
    <Layout>
  
    <Header>{listItem.title}</Header>
    <Content>{listItem.content}</Content>
    <Footer>
      <Comments commentsDetail={listItem.comments} parentId={listItem.id}/>
    </Footer>
  </Layout>
  </div>
  )
};

export default App;