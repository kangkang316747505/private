<?php
namespace app\index\controller;
use think\Controller;
use \think\View;
use app\index\model\XllFdModel;
/*
 * author:郑昌顺
 * function: 学乐乐樊登场-张佳负责活动执行
 * ctime:2018/6/29 星期五下午
 * */
class Xllfd extends Controller
{
    //报名签到页面
    public function index()
    {
        return $this->fetch('Xllfd/sign');
    }
    //签到验证
    public function actionSignVerify(){
        $telephone=input("post.telephone");
        if(empty($telephone)){
            $data['number']="参数有误";
            echo $this->returnApp($data,401);exit;
        }
        $Model = new XllFdModel(); //加载Model
        $User=$Model->getXllFdShow($telephone);
        //验证该手机号是否已报名
        if($User){
            //验证该手机号是否已经报名
            if($User['is_status'] !="0"){
                $data['number']="请不要重复签到";
                echo $this->returnApp($data,402);exit;
            }
            //开始报名签到
            $info=$Model->setXllFdSave($telephone);
            if($info){
                $data['number']="签到成功";
                echo $this->returnApp($data,200);exit;
            }else{
                $data['number']="签到失败";
                echo $this->returnApp($data,202);exit;
            }
        }else{
            $param['telephone']=$telephone;
            $param['truename']="匿名";
            $param['source']="现场报名";
            $param['count']=1;
            $param['is_type']=3;
            $param['is_status']=3;
            $param['ctime']=date("Y-m-d H:i:s",time());
            $Model->setXllFdAdd($param);
            $data['number']="现场报名成功";
            echo $this->returnApp($data,403);exit;
        }

    }
    //后台列表页
    public function actionXllList(){
        $Model = new XllFdModel(); //加载Model
        $XllList=$Model->getXllList();
        if($XllList){
            $data['result']=$XllList;
            echo $this->returnApp($data,200);exit;
        }else{
            $data['result']=$XllList;
            echo $this->returnApp($data,202);exit;
        }
    }
    //确认礼物领取
    public function aactionConfirmSign(){
        $xid=input("post.xid");
        if(empty($xid)){
            $data['number']="参数有误";
            echo $this->returnApp($data,401);exit;
        }
        $Model = new XllFdModel(); //加载Model
        $XllConfirm=$Model->setXllConfirm($xid);
        if($XllConfirm){
            echo $this->returnApp("确认成功",200);exit;
        }else{
            echo $this->returnApp("确认失败",202);exit;
        }
    }
}
