import React ,{Component} from 'react';

class Test_component extends Component{

    constructor(props){
        super(props);
        this.state={name:"nutan"}
    }
    render() {
        return <h1>Hello, {this.props.name}</h1>;
      }

}

export default Test_component;