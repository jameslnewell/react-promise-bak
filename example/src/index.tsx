import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {UsageExample} from './UsageExample';
import {UsePromiseExample} from './UsePromiseExample';
import {UseInvokablePromiseExample} from './UseInvokablePromiseExample';

const App = () => {
  return (
    <div>
      <UsageExample id="1" />
      <UsePromiseExample />
      <UseInvokablePromiseExample />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
