<template>
    <div class="preview">
        <div class="geetest_title">
            <el-row>
                <span>请先预览，修改完毕点击右侧按钮生成pdf </span>
                <el-button type="success" @click="makePdf">生成下载pdf</el-button>
                <el-button type="success" @click="upload">上传pdf</el-button>
            </el-row>
        </div>
        <div class="container" ref="papers">
            <div class="list"  v-for="{ list, index } in lists"> {{list}}
            </div>
            <cover :ops="markOpsC"></cover>
            <logue :ops="markOpsL"></logue>
            <titles :ops="markOpsT" :cont="list" v-for="(list,index) in pages" :key="index"></titles>
            <end :ops="markOpsE"></end>
            <div class="gee_footer" v-for="(item,index) in count">
                <hr class="footer_line">
                <span class="footer_left">{{index+1}}/{{counts}}</span>
                <span class="footer_right">极验专栏</span>
            </div>
        </div>
    </div>
</template>

<script>
   // import cover from '../components/cover'
    import cover from '../components/cover'
   import logue from  '../components/catalogue'
   import titles from '../components/titles'
   import end from '../components/end'
    import html2canvas from 'html2canvas'
    import jspdf from 'jspdf'
	export default {
		name: "preview",
        data(){
			return {
				markOpsC:{},
				markOpsL:{},
				markOpsT:[],
				markOpsE:{},
				lists: [0],
                pages: [],
                count: [0],
                counts: ''
            }
        },
        components: {
			cover, logue, titles, end
        },
        created: function () {
			var editorOption = {
				modules: {
					toolbar: false
                }
            };

			// 计算文章的个数
            this.pages = this.$store.state.pages;

			this.markOpsC.editorOption = editorOption;
	        this.markOpsL.editorOption = editorOption;
	        this.markOpsT.editorOption = editorOption;
            this.markOpsE.editorOption = editorOption;

	        this.markOpsL.content = this.$store.state.dataLog;
	        this.markOpsT.content = this.$store.state.dataTitles;
            this.markOpsE.content = this.$store.state.dataEnd;
            var that = this;
            setTimeout(function () {
	            // 计算提示条数量
	            var dom = that.$refs.papers.getBoundingClientRect();
	            var height = dom.bottom - dom.top;
	            var count = 1;
	            while (height > 842){
		            that.lists.push(count);
		            height = height - 842;
		            count++;
	            }
	            that.count.length = count - 4;
	            that.$nextTick(function () {
		            var ele = document.getElementsByClassName("list");
		            var f_ele =  document.getElementsByClassName("gee_footer");

		            Array.from(ele).forEach(function (item, index) {
			            var cssText = "width:595px;height:1px;position:absolute;z-index:99999;background-color:red;top:" + 842*index+ "px";
			            item.style.cssText = cssText;
		            })

                  // 计算footer
                  that.counts = count - 4;
                  Array.from(f_ele).forEach(function (item, index) {
                    var cssText = "width: 580px;position:absolute;left:50%;margin-left: -290px;top:"+ (842*(index+2) + 790)+ 'px';
                    item.style.cssText = cssText;
                  })

	            });
            }, 400)
        },
        methods: {
	        makePdf: function () {
                    this.lists = [];
                    this.$nextTick(function () {
                      var dom = this.$refs.papers;
                      // 先将canvas放大2倍，再按比例缩小，提高清晰度，a4纸张大小为595*842
                      var c = document.createElement("canvas");
                      var opts = {
                        scale: 2,
                        canvas: c,
                        logging: true,
                        width: dom.width,
                        height: dom.height
                      };
                      c.width = dom.width * 2
                      c.height = dom.height * 2
                      c.getContext("2d").scale(2, 2);

                      html2canvas(dom, opts).then(function (canvas) {
                        console.log(canvas);
                        var contentWidth = canvas.width;
                        var contentHeight = canvas.height;

                        // 一页pdf生成图片的高度
                        var pageHeight = contentWidth/595* 842;

                        // html页面的高度
                        var leftHeight = contentHeight;

                        // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                        var position = 0;
                        var imgWidth = 595;

                        // canvas 高度
                        var imgHeight = 595 / contentWidth*contentHeight;

                        var pageData = canvas.toDataURL('image/jpeg',1.0);
                        var pdf = new jspdf('', 'pt', 'a4');
                        if(leftHeight < pageHeight){
                          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
                          footer();
                        }else  {
                          while(leftHeight > 0) {
                            pdf.addImage(pageData, 'JPEG',0, position, imgWidth, imgHeight);
                            leftHeight -= pageHeight;
                            position -= 842;
                            //避免添加空白页
                            if(leftHeight > 10) {
                              pdf.addPage();
                            }
                          }
                        }
                        pdf.save();
                      })
                    })
	        },
            upload: function () {
              this.$nextTick(function () {
                var dom = this.$refs.papers;
                // 先将canvas放大2倍，再按比例缩小，提高清晰度，a4纸张大小为595*842
                var c = document.createElement("canvas");
                var opts = {
                  scale: 2,
                  canvas: c,
                  logging: true,
                  width: dom.width,
                  height: dom.height
                };
                c.width = dom.width * 2
                c.height = dom.height * 2
                c.getContext("2d").scale(2, 2);

                html2canvas(dom, opts).then(function (canvas) {
                  document.body.appendChild(canvas);
                })
              })
            }
        }
	}
</script>

<style lang="scss" >
    .preview{
        width: 595px;
        margin: 0 auto;


        .geetest_title {
            margin-bottom: 10px;
        }
        .container {
            border: 1px solid #ccc;
            position: relative;
            .cover {
                height: 842px;
                border: none;
                overflow: hidden;
            }
            .cover_logue {
                border: none;
                height: 842px;
            }

            .cover_titles {
                border: none;
            }

            .cover_end {
                height: 842px;
                border: none;
                .quill-editor {
                    height: 582px;
                }
            }
/*            .cover_test {
                height: 842px;
            }
            .cover_logue {
                height: 842px;
            }
            .cover_end {
                height: 842px;
                .quill-editor {
                    height: 572px!important;
                }
            }*/
        }
        .gee_footer {
            width: 580px;
            position: absolute;
            left: 50%;
            margin-left: -290px;
            top: 2474px;
            .footer_line {
                border: 0.5px solid #ccc;
            }
            .footer_left {
                font-size: 10px;
            }
            .footer_right {
                position: absolute;
                right: 0px;
                color: #858AB4;
            }
        }
    }
</style>
