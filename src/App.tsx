
import { FC } from 'react';
import './App.css';
import Home from '../src/components/Home/Home'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Detail from '../src/components/Detail/Detail'
import { Provider } from 'react-redux';
import {store} from './redux/store'


const App: FC = () => (
  <Provider store={store}>
      <BrowserRouter>
        <Routes>
            <Route path="" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/detail" element={<Detail />}></Route>
        </Routes>
      </BrowserRouter>
  </Provider>
);


export default App;