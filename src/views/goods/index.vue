<template>
  <div class="goods">
    <!--搜索框-->
    <div class="goods-search">
      <el-form style="margin-top: 40px" :inline="true" :model="params" class="demo-form-inline">
        <el-form-item label="商品">
          <el-input v-model="params.key" placeholder="请输入商品名称"/>
        </el-form-item>
        <el-form-item label="类别">
          <el-select clearable v-model="params.goodsType" placeholder="请选择商品类别">
            <el-option v-for="type in typeList" :key="type.goodsTypeId"
                       :label="type.goodsTypeName"
                       :value="type.goodsTypeName"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="dialogVisibleAdd = true">新增</el-button>
        </el-form-item>
      </el-form>

      <!--新增表单-->
      <div class="add-goods">
        <el-dialog
            title="新增商品"
            :visible.sync="dialogVisibleAdd"
            width="45%">
          <el-form label-position="left"
                   label-width="80px" :inline="true" :model="form" ref="form" :rules="rules">
            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model="form.goodsName" placeholder="请输入商品名称" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品类别" prop="goodsType">
              <el-select v-model="form.goodsType" placeholder="请选择商品类别">
                <el-option v-for="type in typeList" :key="type.goodsTypeId"
                           :label="type.goodsTypeName"
                           :value="type.goodsTypeName"/>
              </el-select>
            </el-form-item>
            <el-form-item label="商品价格" prop="goodsPrice">
              <el-input v-model="form.goodsPrice" placeholder="请输入商品价格（元）" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goodsNum">
              <el-input v-model="form.goodsNum" placeholder="请输入商品数量" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="供应商" prop="goodsSupplier">
              <el-input v-model="form.goodsSupplier" placeholder="请输入供应商" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addSubmit('form')">确认</el-button>
            <el-button @click="dialogVisibleAdd = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div class="update">
      <!--更新商品-->
      <el-dialog
          title="编辑商品"
          :visible.sync="dialogVisibleUpdate"
          width="45%">
        <el-form label-position="left"
                 label-width="80px" :inline="true" :model="oldGoods" ref="oldGoods" :rules="rules">
          <el-form-item label="商品名称" prop="goodsName">
            <el-input v-model="oldGoods.goodsName" placeholder="请输入商品名称" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品类别" prop="goodsType">
            <el-select v-model="oldGoods.goodsType" placeholder="请选择商品类别">
              <el-option v-for="type in typeList" :key="type.goodsTypeId"
                         :label="type.goodsTypeName"
                         :value="type.goodsTypeName"/>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" prop="goodsPrice">
            <el-input v-model="oldGoods.goodsPrice" placeholder="请输入商品价格（元）" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goodsNum">
            <el-input v-model="oldGoods.goodsNum" placeholder="请输入商品数量" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="供应商" prop="goodsSupplier">
            <el-input v-model="oldGoods.goodsSupplier" placeholder="请输入供应商" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updateSubmit('oldGoods')">确认</el-button>
            <el-button @click="dialogVisibleUpdate = false">取 消</el-button>
          </span>
      </el-dialog>
    </div>
    <div class="goods-table" style="margin-top: 20px">
      <!--数据展示表格-->
      <el-table height="360" border :cell-style="{ textAlign: 'center' }" :data="goodsPageList">
        <el-table-column header-align="center" v-for="(key,val) in goodsLabel"
                         :key="key"
                         :prop="val"
                         :label="key">
        </el-table-column>
        <el-table-column
            align="center"
            label="操作">
          <template slot-scope="scope">
            <div class="update-delete">
              <el-button
                  size="mini"
                  @click="dialogVisibleUpdate = true;handleEdit(scope.$index, scope.row)">编辑
              </el-button>

              <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--分页栏-->
      <div class="goods-page" style="margin-top: 40px">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.goodsPageListObject['pageNum']"
            :page-sizes="[10,20,30]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.goodsPageListObject['totalCount']">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {getGoodsType, updateGoods} from "@/api/goodsApi";
import {getGoodsPageList} from "@/api/goodsApi";
import {addGoods} from "@/api/goodsApi";
import {deleteGoods} from "@/api/goodsApi";


export default {
  name: 'goods',
  data() {
    return {
      typeList: null,
      params: {
        key: "",
        goodsType: "",
        pageNum: 1,
        pageSize: 10
      },
      goodsPageList: null,
      goodsPageListObject: null,
      goodsLabel: {
        goodsName: "商品名称",
        goodsType: "商品类别",
        goodsPrice: "商品价格(元)",
        goodsNum: "商品存货",
        goodsSupplier: "商品供应商"
      },
      dialogVisibleAdd: false,
      dialogVisibleUpdate: false,
      oldGoods: {
        goodsName: "",
        goodsType: "",
        goodsPrice: "",
        goodsNum: "",
        goodsSupplier: ""
      },
      form: {
        goodsName: "",
        goodsType: "",
        goodsPrice: "",
        goodsNum: "",
        goodsSupplier: ""
      },
      rules: {
        goodsName: {required: true, message: '请输入商品名称', trigger: 'blur'},
        goodsPrice: {required: true, message: '请输入商品价格（元）', trigger: 'blur'},
        goodsType: {required: true, message: '请选择商品类别', trigger: 'change'},
        goodsNum: {required: true, message: '请输入商品数量', trigger: 'blur'},
        goodsSupplier: {required: true, message: '请输入供应商', trigger: 'blur'}
      }
    }
  },
  async mounted() {
    this.typeList = await getGoodsType()
    this.typeList = this.typeList['data']['data']
    console.log(this.typeList)

    this.goodsPageListObject = await getGoodsPageList(this.params)
    this.goodsPageListObject = this.goodsPageListObject['data']['data']
    this.goodsPageList = this.goodsPageListObject['list']
    console.log(this.goodsPageList)
  },
  methods: {
    // 每页行数改变
    async handleSizeChange(val) {
      this.params.pageSize = val
      this.goodsPageListObject = await getGoodsPageList(this.params)
      this.goodsPageListObject = this.goodsPageListObject['data']['data']
      this.goodsPageList = this.goodsPageListObject['list']
    },

    //  每页码数改变
    async handleCurrentChange(val) {
      this.params.pageNum = val
      this.goodsPageListObject = await getGoodsPageList(this.params)
      this.goodsPageListObject = this.goodsPageListObject['data']['data']
      this.goodsPageList = this.goodsPageListObject['list']
    },

    // 提交查询
    async onSubmit() {
      this.goodsPageListObject = await getGoodsPageList(this.params)
      console.log(this.goodsPageListObject)
      this.goodsPageListObject = this.goodsPageListObject['data']['data']
      this.goodsPageList = this.goodsPageListObject['list']

      console.log(this.goodsPageList)
    },

    // 新增表单提交
    addSubmit(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          console.log(this.form)
          const res = await addGoods(this.form);
          if (res['data']['code'] === 0) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.dialogVisibleAdd = false
            this.form = {}
          } else {
            this.$message.error("添加失败，请仔细检查数据或稍后重试！")
            this.dialogVisibleAdd = false
          }
        } else {
          return false
        }
      });
    },

    // 更新表单
    handleEdit(index, row) {
      console.log(row)
      this.oldGoods = row
      console.log(this.oldGoods)
    },

    // 删除商品
    async handleDelete(index, row) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const params = {
          goodsId: row['goodsId']
        }
        const res = await deleteGoods(params)
        console.log(res)
        if (res['data']['code'] === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.dialogVisibleAdd = false
          this.form = {}
        } else {
          this.$message.error("删除失败，请稍后重试！")
        }
      })
    },

    // 编辑表单
    updateSubmit(oldGoods) {
      this.$refs[oldGoods].validate(async (valid) => {
        if (valid) {
          console.log(this.oldGoods)
          const res = await updateGoods(this.oldGoods);
          if (res['data']['code'] === 0) {
            this.$message({
              type: 'success',
              message: '更新成功!'
            })
            this.dialogVisibleUpdate = false
            this.form = {}
          } else {
            this.$message.error("更新失败，请仔细检查数据或稍后重试！")
            this.dialogVisibleUpdate = false
          }
        } else {
          return false
        }
      });
    },

  }
}
</script>


