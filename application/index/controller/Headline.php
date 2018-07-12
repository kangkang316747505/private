<?php
namespace app\index\controller;
use think\Controller;
use \think\View;
/*
 * author:郑昌顺
 * function: 今日头条
 * ctime:2018/6/29 星期五下午
 * */
class Headline extends Controller
{
    //今日头条
    public function index(){
        $jssdk = new JSSDK("wx0abee52f55a84fe6", "015cc171ba6585226b5d495a4eb5f371");  // 分享

        $signPackage = $jssdk->GetSignPackage();
        $this->assign('signPackage',$signPackage);
        return $this->fetch('Headline/index');
    }

    public function demo(){
        $str = file_get_contents('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx0abee52f55a84fe6&secret=015cc171ba6585226b5d495a4eb5f371');
        $arr = json_decode($str, true);
        var_dump($arr);exit;
    }
}
