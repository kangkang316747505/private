<?php
// +----------------------------------------------------------------------
// | activity 活动单页
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2022 http://baiyf.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: Zhengcs <731376890@qq.com>
// +----------------------------------------------------------------------
namespace app\index\model;
use think\Model;
use think\Db;

class XllFdModel extends Model
{
    //获取报名人信息
    public function getXllFdShow($telephone){

        return Db::table("sky_xll_fd")->where("telephone",$telephone)->find();
    }

    //将未签到人员 修改为 已签到人员
    public function setXllFdSave($telephone){
        $param['is_status']='1';
        return Db::table("sky_xll_fd")->where("telephone",$telephone)->update($param);
    }
    // 现场报名
    public function setXllFdAdd($param){

        return Db::table("sky_xll_fd")->insert($param);
    }

    //学乐乐用户列表页
    public function getXllList(){
        //获取已签到的用户列表
        $AlreadySign=Db::table("sky_xll_fd")->where("is_status",'1')->select();
        //签到并领取礼物的用户列表
        $AlreadyReceived=Db::table("sky_xll_fd")->where("is_status",'2')->select();
        //未报名的用户列表
        $NotEnrolment=Db::table("sky_xll_fd")->where("is_status",'3')->select();
        // 用户信息集合
        $result['AlreadySign']=$AlreadySign;
        $result['AlreadyReceived']=$AlreadyReceived;
        $result['NotEnrolment']=$NotEnrolment;
        return  $result;
    }

    //学乐乐 领取礼物确认
    public function setXllConfirm($xid){
        $param['is_status']='2';
        return Db::table("sky_xll_fd")->where("id",$xid)->update($param);
    }
}

