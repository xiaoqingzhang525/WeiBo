import './Comments.css'
import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import {CommentType} from '../../dataType/commonDataType';
import React, { useState, useEffect } from 'react';
import { store } from '../../redux/store';

const { TextArea } = Input;

interface PropsType {
  commentsDetail: CommentType[],
  parentId: string
}

const Comments: React.FC<PropsType> = (props: PropsType) => {
  
  const [value, setValue] = useState('');
  const {commentsDetail, parentId} = props;
  const [comments, setComment] = useState<CommentType[]>([])


  useEffect(() => {
    setComment(commentsDetail);
  },[commentsDetail]);

  store.subscribe(() => {
    setComment(store.getState().list.filter(item=>item.id===parentId)[0]?.comments)
  })

  const handleSubmit = (parentId: string) => {
    if (!value) return;
      setValue('');
      store.dispatch({
        type: 'addComment',
        comment: {name: '未命名', content: value},
        parentId,
      })
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      {comments?.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar src="" alt="Han Solo" />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={()=>handleSubmit(parentId)}
            value={value}
          />
        }
      />
    </>
  );
};

const CommentList = ({ comments }: { comments: CommentType[] }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  value: string;
}

const Editor = ({ onChange, onSubmit, value }: EditorProps) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        点击添加评论
      </Button>
    </Form.Item>
  </>
);

export default Comments;