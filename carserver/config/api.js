const API_BASE_URL = 'http://192.144.227.206:8080/aerospace/';
module.exports = {

  //用户登录 
  LoginUrl: API_BASE_URL+'/login.do',

  //新增一条数据信息
  InsertFormURL: API_BASE_URL + '/insertForm.do',

  //给管理员发一条新建审批提醒
  SelectEmailInfoByIdentityURL: API_BASE_URL + '/selectEmailInfoByIdentity.do',
  
  //根据订单id修改待用车-->用车中的状态  pass-->using
  UpStatusFormIdUrl: API_BASE_URL + '/upStatusFormById.do',
  
  //根据订单id修改待审批-->撤回的状态和时间 newinfo -->revocation backout_time   1
  ToRevocationUrl: API_BASE_URL + '/toRevocation.do',
  
  //根据订单id修改被退回-->待审批的状态和时间 sendback-->newinfo submit_time 2
  //根据订单id修改撤回-->待审批的状态和时间  revocation-->newinfo  submit_time    2
  ToNewInfoUrl: API_BASE_URL + '/toNewInfo.do',
  
  //根据订单id修改撤回-->取消申请(确认结束)的状态和时间 revocation -->finished end_time 3
  ToFinishedUrl: API_BASE_URL + '/toFinished.do',

  //根据订单id修改用车中-->结束用车的状态、消费和时间using-->finished end_time5
  UpCostsByIdUrl: API_BASE_URL + '/upCostsById.do',
  //根据订单id修改超时未确认-->结束用车的状态和时间 timeout -->finished end_time
  // 超时自动调用接口 6
  
  
  //根据订单id修改待用车-->撤销用车的状态和时间 pass -->undo  backout_time 4
  ToUndoUrl: API_BASE_URL + '/toUndo.do',

  //根据订单id修改待审批-->待用车的状态和时间 newinfo -->pass  approval_time 5
  //被退回
  ToPassUrl: API_BASE_URL + '/toPass.do',
  
  //根据订单id查询订单信息
  IdFormUrl: API_BASE_URL + '/findFormId.do', 
  
  //根据订单id修改订单信息
  UpdataFormByIdURL: API_BASE_URL+'/upDataFormById.do',

  //查询空闲车辆表的信息
  ProvelObjectsURL: API_BASE_URL +'/provelObjects.do',
  
  //审批通过的时候，对车辆状态发送请求，根据车辆名称改变车辆的状态为使用中
  ToUsingProvelByIdURL: API_BASE_URL + '/toUsingProvelById.do',
  
  //确认结束，对车辆状态发送请求，根据车辆名称改变车辆的状态为未使用
  //撤销用车
  ToUnsedProvelByIdURL: API_BASE_URL + '/toUnsedProvelById.do',
  
  //登录的时候根据账户查询个人信息
  UserInfoByphoneURL: API_BASE_URL +'/userInfoByphone.do',

 

  //(普通用户)

  //首页列表查询
  IndexUrl: API_BASE_URL+'/index.do',

  //待审批列表查询
  ListNewInfoURL: API_BASE_URL +'/listNewInfo.do',

  //待用车列表查询
  ListPassURL:API_BASE_URL + '/listPass.do',

  //用车中列表查询
  ListUsingURL: API_BASE_URL +'/listUsing.do',

  //已结束列表查询
  ListFinishedURL: API_BASE_URL +'/listFinished.do',

  //已撤销列表查询
  ListUndoURL: API_BASE_URL + '/listUndo.do',
  
//根据客户输入的邮箱账号查找邮箱账号是否存在
  FindEmailURL: API_BASE_URL + '/findEmail.do',
//根据邮箱号发送验证码，返回给前台验证码
  SendCodeByEmailURL: API_BASE_URL + '/sendCodeByEmail.do',
// 根据邮箱修改密码
  UpDataPasswdByEmail: API_BASE_URL + '/upDataPassByEmail.do',

//注册账户提醒员工登录账号和密码
  SendNewPersonEmail: API_BASE_URL + '/sendNewPersonEmail.do',


  //（管理员）
  //首页信息
  SelectAllFormURL: API_BASE_URL + '/selectAllForm.do',
  
  //待审批、待用车、用车中、已撤销、已结束列表查询
  SelectByStatusURL: API_BASE_URL + '/selectByStatus.do',

  //车辆新增
  InsertProvelURL: API_BASE_URL + '/insertProvel.do',

  //普通用户新增
  InsertUserURL: API_BASE_URL + '/insertUser.do',

  //根据用户id修改用户信息
  UpDeteByIdURL: API_BASE_URL + '/upDeteById.do',

  // 根据人员id查询人员的详细信息
  SelectUserInfoByIdURL: API_BASE_URL + '/selectUserInfoById.do',


  // 根据id删除个人信息
  DeleteUserByIdURL: API_BASE_URL + '/deleteUserById.do',

  //根据部门显示该部门下面的所有人员信息列表
  ListUserURL: API_BASE_URL + '/listUser.do',

  // 查询所有部门列表
  ListDepartmentURL: API_BASE_URL + '/listDepartment.do',

  //查询所有车辆列表
  ListProvelURL: API_BASE_URL + '/listProvel.do',

 //根据车辆id查询车辆信息
  FindProvelByIdURL: API_BASE_URL + '/findProvelById.do',

  //根据车辆id删除车辆信息
  DeleteProvelByIdURL: API_BASE_URL + '/deleteProvelById.do',

  //根据车辆id编辑车辆信息
  UpProvelByIdURL: API_BASE_URL + '/upProvelById.do',
  
//提醒员工订单已审批
  SendEmailByphoneURL: API_BASE_URL + '/sendEmailByphone.do',


//确认结束，给管理员发送提醒信息
  SendFinishedEmailByIdentityURL: API_BASE_URL +'/sendFinishedEmailByIdentity.do',
  
//流程撤销提醒，给管理员发送提醒消息
  SendUndoEmailByIdentityURL: API_BASE_URL + '/sendUndoEmailByIdentity.do',
  






};
