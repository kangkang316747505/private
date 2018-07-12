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

        return $this->fetch('Headline/index');
    }
}
