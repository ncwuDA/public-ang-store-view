<template>
  <div>
    <el-row class="home">
      <el-col :span="10" style="margin-top: 20px;margin-left: 40px" :gutter="20">
        <el-card style="height: 223.9px">
          <div class="user">
            <img
                :src="userImg"
                style="width: 90px; height: 90px; border-radius: 50%"
            />
            <div class="userInfo" style="margin-left: 20px">
              <p class="name"><b>Admin</b></p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <HR/>
          <div class="login-info" style="margin-top: 20px;font-size: 15px">
            <p>上次登陆时间：<span>2022-08-27</span></p>
            <p>上次登陆地点：<span>开封</span></p>
          </div>
        </el-card>

        <el-card style="margin-top: 50px">
          <el-table :data="tableData">
            <el-table-column v-for="(key,val) in tableLabel"
                             :key="key"
                             :prop="val"
                             :label="key">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span="10" style="margin-left: 100px">
        <div class="num">
          <el-card class="num-card" v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0}">
            <div class="icon-background" :style="{background:item.color}">
              <i class="icon" :class="`el-icon-${item.icon}`" ></i>
            </div>
            <div class="detail">
              <p class="num-price">￥{{item.value}}</p>
              <p class="txt">{{item.name}}</p>
            </div>
          </el-card>
        </div>

        <el-card class="lastGoods" style="margin-top: 50px">
          <el-table :data="lastGoods">
            <el-table-column v-for="(key,val) in lastGoodsLabel"
                             :key="key"
                             :prop="val"
                             :label="key">
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>

import {getGoodsPageList} from '@/api/goodsApi'
export default {
  name: "Home",
  data() {
    return {
      userImg: require("../../assets/images/user.jpg"),
      tableData: [
        {
          name: '华为',
          todayBuy: 100,
          monthBuy: 400,
          totalBuy: 1000
        },
        {
          name: '小米',
          todayBuy: 100,
          monthBuy: 400,
          totalBuy: 1000
        },
        {
          name: '苹果',
          todayBuy: 100,
          monthBuy: 400,
          totalBuy: 1000
        },
        {
          name: '乐视',
          todayBuy: 100,
          monthBuy: 400,
          totalBuy: 1000
        }
      ],
      tableLabel: {
        name: '商品',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: "总购买"
      },
      countData: [
        {
          name: '今日支付订单',
          value: '1234',
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          value: '1234',
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: '1234',
          icon: 's-release',
          color: '#5ab1ef'
        }
      ],
      countDataMonth:[
        {
          name: '本月支付订单',
          value: '1234',
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          value: '1234',
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: '1234',
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      lastGoods:[
        {
          name:"OPPO",
          number:"1000",
          supplier:"oppo营业厅"
        },
        {
          name:"ViVO",
          number:"1000",
          supplier:"ViVO营业厅"
        },
        {
          name:"华为",
          number:"1000",
          supplier:"华为营业厅"
        },
        {
          name:"小米",
          number:"1000",
          supplier:"小米营业厅"
        }
      ],
      lastGoodsLabel: {
        name:"新增商品",
        number:"商品数量",
        supplier:"供应商"
      }
    };
  },
  mounted() {
    this.goodPageList()
  },
  methods:{
    goodPageList() {
      let params = {
        pageSize: 5,
        pageNum: 1
      };
      let promise = getGoodsPageList(params);
      promise.then(res=>{
        console.log('res:',res);
      }).catch(err=>{
        console.log('err:',err);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
}
.num-card{
  height: 60px;
  margin-top: 20px;
}
.icon-background{
  width: 80px;
  height: 80px;
}
.icon{
  color: white;
  width: 80px;
  height: 80px;
  font-size: 24px;
  text-align:center;
  margin-top: 20px;
}
.detail{
margin-left: 150px;
}
.num-price{
  font-size: 18px;
  margin: 5px;
}
.txt{
  font-size: 10px;
  margin-left: 8px;
}
</style>
