import { Input,Button } from 'antd';
import React, {useEffect, useState} from 'react';
import { store } from '../../redux/store';
import { v4 as uuid } from 'uuid';
import moment from 'moment'
const { TextArea } = Input;

const ContentInput: React.FC = () => {

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.target.value)
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(e.target.value)
    };

  const handleClick = () => {
    store.dispatch({
      type:'addArticle',
      listItem: {
        id: uuid(),
        title,
        content,
        createTime: moment().locale('zh-cn').format('YYYY-MM-DD'),
        comments: []
      },
    });
  }

  const handleCancel = () => {
    setTitle('');
    setContent('');
  }

  return (
    <div id="contentInput">
      <Input placeholder="Please input the title" onChange={onChangeTitle} value={title}/>
      <br />
      <br />
      <TextArea placeholder="What do you want to write......" onChange={onChangeContent}  value={content} autoSize = {{ minRows: 20, maxRows: 100 }}/>
      <br />
      <br />
      <Button onClick={handleCancel}>Cancel</Button>      <Button disabled={!(!!title&&!!content)} type="primary" onClick={handleClick}>confirm</Button>      
  </div>
  )
};

export default ContentInput;