<template>
    <div class="paper">
        <div class="header">
           <el-row>
               <el-button type="primary">
                   <router-link :to="{ name: 'home'}">返回首页</router-link>
               </el-button>
               <el-button type="primary">
                   <router-link :to="{ name: 'cover'}">封面模版</router-link>
               </el-button>
               <el-button type="primary">
                   <router-link :to="{ name: 'catalogue'}">目录模版</router-link>
               </el-button >
               <el-button v-for="(list, index) in titles" :key="list.id" type=primary>
                   <router-link :to="{ name: 'titles', params:{ pageId: index}}">内容模版{{index+1}}</router-link>
               </el-button>
               <el-button type="primary">
                   <router-link :to="{ name: 'end'}">篇尾模版</router-link>
               </el-button>
               <el-button type="primary">
                   <router-link :to="{ name: 'preview'}">预览生成</router-link>
               </el-button>
               <el-button type="success" @click="addTitles">
                   <a href="#">添加内容</a>
               </el-button>
               <el-button type="danger" @click="removeTitles">
                   <a href="#">删除内容</a>
               </el-button>
           </el-row>
        </div>
        <router-view ></router-view>
    </div>
</template>

<script>

	export default {
		name: 'paper',
        data(){
		  return {
		    titles: [0]
          }
        },
        methods: {
          addTitles: function () {
                this.titles.push(1)
          },
          removeTitles: function () {
                this.titles.pop();
          }
        },
      created: function () {
      }
	}
</script>
<style lang="scss" scoped>
    .paper {
        .header {
            margin-bottom: 10px;
            text-align: center;
            .el-button {
                padding: 0px;
                a {
                    display: block;
                    height: 40px;
                    width: 100px;
                    line-height: 40px;
                }
            }
        }
    }
</style>
