<template>
    <div class="cover">
        <div class="header">
            <img class="theme" src="../../public/special_theme.png" alt="">
            <img class="theme_en" src="../../public/special_en.png" alt="">
            <div class="nop">
                <span class="nop_num">{{dataCover.count}}</span>
                <span class="nop_count">2000</span>
            </div>
            <input type="text" v-model="dataCover.title" class="title" @blur="saveTitle">
        </div>
        <img class="footer_logo" src="../../public/logo.png" alt="">
        <img class="footer_address" src="../../public/address.png" alt="">
        <quill-editor v-model="dataCover.content"
                      @change="onEditorChange($event)"
                      :options="editorOption">
        </quill-editor>

        <div class="tool">
            <input type="file" @change="setBg">
        </div>

    </div>
</template>

<script>


	export default {
		name: "cover",
		data(){
			return {
			    dataCover: {
                  title: '',
                  content: '',
                  count: ''
                },
                editorOption: {
					// some quill options
				}
			}
		},
		methods: {
             onEditorChange: function ({editor, html, text}) {
                this.dataCover.content = html;
                this.$store.dispatch('saveCover', this.dataCover);
			},
             saveTitle: function () {
                this.$store.dispatch('saveCover',this.dataCover);
          },
             setBg: function (e) {
                var self = this;

                var file =e.target.files[0];
                var reder = new FileReader();

                    reder.readAsDataURL(file);
                    reder.onloadend = function () {
                      var dataURL = reder.result;
                      var ele = document.querySelector('.quill-editor');

                      // 先存储，再替换
                      self.dataCover.bg = dataURL;
                      self.$store.dispatch('saveCover',self.dataCover);
                      ele.style.background = "url("+dataURL+") no-repeat 100%";
                    }
          }
		},
		created: function () {
            if(this.ops){
            	this.content = this.ops.content;
            	this.editorOption = this.ops.editorOption;
            }
            // 赋值
            var data = this.$store.state.dataCover;
            this.dataCover.title = data.title;
            this.dataCover.content = data.content;
            this.dataCover.count = data.count;
            if(data.bg){
              this.$nextTick(function () {
                var ele = document.querySelector('.quill-editor');
                ele.style.background = "url("+data.bg+") no-repeat 100%";
              });
            }
  		},
        props: ['ops']
	}
</script>

<style lang="scss" scoped>
    .cover{
        width: 595px;
        margin: 0 auto;
        border: 1px solid #ccc;
        height: 932px;
        position: relative;
        .header {
            height: 200px;
            .theme {
                width: 110px;
                height: 54px;
                margin: 23px 20px;
            }
            .theme_en {
                width: 100px;
                height: 40px;
                margin: 29px 20px;
            }
            .nop {
                display: inline-block;
                font-family: "Source Han Sans CN";
                font-size: 24px;
                font-weight: 900;
                width: 50px;
                height: 70px;
                background: url("../../public/nop.png");
                background-size: 100% 100%;
                position: absolute;
                top: 0px;
                right: 30px;
                color: #FFFFFF;
                text-align: center;
                span {
                    display: block;
                }

                .nop_num {

                }
                .nop_count {
                    font-size: 12px;
                    color:#B3B8E4;
                }
            }
            .title {
                border: none;
                text-align: left;
                color: #3973FF;
                font-size: 44px;
                margin-left: 20px;
                outline: transparent;
                font-weight: bold;
                width: 85%;
            }
        }
        .quill-editor {
           height: 732px;
            overflow: hidden;
            background-color: #ccc;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            &.ql-editor {
                color: #000;
            }
        }
        .footer_logo {
            position: absolute;
            bottom: 30px;
            left: 30px;
            width: 103px;
            height: 28px;
            z-index: 999;
        }
        .footer_address {
            position: absolute;
            bottom: 30px;
            right: 30px;
            width: 150px;
            height: 60px;
            z-index: 999;
        }
        .tool {
            margin: 20px 0 40px 0;
        }
    }
</style>
