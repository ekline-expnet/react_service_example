import { Component, useState } from 'react';
import { getCache, setCache, subscribeToCache } from './cache_service';
import { useCache } from './cache_hook';
class ClassMonitor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cacheValue: getCache("cache", '')
    };
  }
  componentDidMount() {
    this.unsub = subscribeToCache("cache", (v)=>{
      this.setState({
        cacheValue: v
      })
    });
  }
  componentWillUnmount() {
    this.unsub();
  }
  render() {
    return <div style={{
      backgroundColor: "white",
      border: "1px solid green"
    }}>
      Component Monitor: {this.state.cacheValue}
    </div>
  }
}

function FunctionMonitor(props) {
  const cacheValue = useCache("cache", "");
  return <div style={{
    backgroundColor: "white",
    border: "1px solid red"
  }}>
    Function Monitor: {cacheValue}
  </div>
}

function CacheSetter(props) {
  const [value, setValue] = useState(getCache("cache", ""));
  return <div>
    Set cache value
    <input type="text" value={value} onChange={(evt)=>{
      const v = evt.target.value;
      setValue(v);
      setCache("cache", v);
    }} />
  </div>
}

function App() {
  return (
    <div className="App">
      <ClassMonitor />
      <FunctionMonitor />
      <CacheSetter />
    </div>
  );
}

export default App;
