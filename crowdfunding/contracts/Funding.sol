pragma solidity ^0.4.17;

//使用智能合约部署智能合约
contract FundingFactory{
    //存储已经部署的智能合约的地址
    uint public numFundings = 0;
    mapping(uint => address) addrfundings;
    function deploy(string _projectName, uint _supporMoney, uint _goalMoney)public{
        addrfundings[numFundings] = new Funding(_projectName, _supporMoney, _goalMoney, msg.sender);
        numFundings++;
    }
    function getAddr()public view returns(address){
        return addrfundings[numFundings - 1];
    }
}
contract Funding{
    address public manager;
    string public projectName;
    uint public supportMoney;
    uint public endTime;
    uint public goalMoney;
    uint public requestID = 0;//作为唯一标识request
    address[] public supporters;
    //本合约生成项目的投资者映射
    mapping(address=>bool) supportersMap;
    //标记众筹是否成功
    bool flag = false;
    //付款请求申请数组，由发起人申请
    struct Request{
        uint id;//标识付款请求
        string description;//付款请求描述
        uint money;//需要多少钱
        address shopAddress;
        bool complete;//付款请求是否结束
        mapping(address=>bool) votedMap;//已投票的地址
        uint voteCount;//记录赞同票的计数器
    }
    mapping(uint=>Request) requestMap;

    //创建付款请求
    function createRequest(string _description, uint _money, address _shopaddress)public{
        //众筹成功&&onlyManager
        require(msg.sender == manager);
        Request memory request = Request({
            id:requestID++,
            description:_description,
            money:_money,
            shopAddress: _shopaddress,
            complete:false,
            voteCount:0
            });
        requestMap[request.id] = request;
    }

    //出借方批准贷款（index为数组下标）
    function approveRequest(uint index)public{
        Request storage request = requestMap[index];
        //1.检查某个人是否在列表内
        require(supportersMap[msg.sender]);
        //2.一人一票
        require(!requestMap[index].votedMap[msg.sender]);
        request.voteCount++;
        requestMap[index].votedMap[msg.sender] = true;
    }

    //发起人调用，完成付款
    function finalizeRequest(uint index)public onlyManager{
        Request storage request = requestMap[index];
        //付款未处理
        require(!request.complete);
        //超过半数
        require(request.voteCount * 2 > supporters.length);
        //转账
        require(this.balance >= request.money);
        request.shopAddress.transfer(request.money);
        request.complete = true;
    }

    //构造函数
    function Funding(string _projectName, uint _supporMoney, uint _goalMoney, address _address) public{
        manager = _address;
        projectName = _projectName;
        supportMoney = _supporMoney;
        goalMoney = _goalMoney;
        endTime = now + 4 weeks;
    }
    //参与人出资众筹
    function support() public payable{
        require(msg.value == supportMoney);
        supporters.push(msg.sender);
        //设置Mapping集合
        supportersMap[msg.sender] = true;
    }
    function getPlayersCount() public view returns(uint){
        return supporters.length;
    }
    function getPlayersAddress()public view returns(address[]){
        return supporters;
    }
    function getTotalBalance()public view returns(uint){
        return this.balance;
    }
    //***两个***
    function getManager()public view returns(address){
        return manager;
    }
    function getSupportMoney()public view returns(uint){
        return supportMoney;
    }
    function getProjectName()public view returns(string){
        return projectName;
    }
    //返回剩余天数
    function getDayTime()public view returns(uint){
        return (endTime - now)/24/60/60;
    }
    //返回剩余秒数修改
    function getSecTime()public view returns(uint){
        return (endTime - now);//返回的是秒为单位
    }
    //****做除法求百分比*************
    function getGoalMoney()public view returns(uint){
        return goalMoney;
    }
    //************返回struct**********
    function getStructByID(uint index) public view returns(uint, string, uint, address, bool, uint){
        Request memory temp = requestMap[index];
        return(temp.id, temp.description, temp.money, temp.shopAddress, temp.complete, temp.voteCount);
    }
    function getRequestID()public view returns(uint){
        return requestID - 1;
    }
    function getCurStruct() public view returns(uint, string, uint, address, bool, uint){
        Request memory temp = requestMap[requestID - 1];
        return(temp.id, temp.description, temp.money, temp.shopAddress, temp.complete, temp.voteCount);
    }
    //判断众筹是否成功，之后函数的执行要在成功的基础上 require(flag)
    // function checkStatus() public{
    //     require(!flag);//此时未成功
    //     require(now > endTime);//超过一个月
    //     require(this.balance > goalMoney);
    //     flag = true;
    // }

    modifier onlyManager(){
        require(msg.sender == manager);
        _;
    }


}