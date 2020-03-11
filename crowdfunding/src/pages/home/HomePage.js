import React from 'react';
import {Card, Image, Label, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import "./HomePage.css"
export default class HomePage extends React.Component {
//获取变量
    constructor(props){
        super(props);
        this.state={
            manager:'',
            playerCount:0,
            balance:0,
            supportMoney:0,
            goalMoney:0,
            projectName:" ",
            loading:false,
            showButton:'none',
            day:0,
            hour:0,
            minute:0,
            second:0,
            transCount:0,
            dbContract:[],
        }
    }
    componentDidMount(){
        this.getContracts();
    }
    getContracts =()=>{
        fetch('http://localhost:4000/contract/search')
            .then(response => response.json())
            .then(response => (this.setState({dbContract:response.data})))
            .catch(err => console.error(err));
    };

    //主页面显示
    render() {
        return (
            <div>
                {/*-----------------cards & database----------------------*/}
                {this.state.dbContract.map(dbContract =>
                    <div className="cardBox" key={dbContract.id}>
                        <Card>
                            <Image src={dbContract.imagePath} wrapped ui={false}/>
                            <Card.Content>
                                <Card.Header>{dbContract.projectName}</Card.Header>
                                {/*---------------database----------------*/}
                                <Card.Meta>
                                    <span className='date'>项目地址：</span>
                                    <Label size={'mini'}>{dbContract.addrContract}</Label>
                                    <br/>
                                    <span className='date'>发起人地址信息：</span>
                                    <Label size={'mini'}>{dbContract.addrManager}</Label>
                                </Card.Meta>
                                <Card.Description>
                                    单次投资金额：{dbContract.supportMoney}wei<br/>
                                    总筹资金额：{dbContract.totalMoney}wei
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Icon name='align justify'/>
                                {dbContract.desContract}
                                <Link style={{float:'right'}} to={{
                                    pathname:'/detail',
                                    state:{
                                        addr:dbContract.addrContract,
                                        imagePath:dbContract.imagePath
                                    }
                                }}>详情</Link>
                            </Card.Content>
                        </Card>
                    </div>)}
            </div>
        );

    }
}