<template>
    <div class="cover_logue">
        <div class="header">
            <img class="theme" src="../../public/special_theme.png" alt="">
            <img class="theme_en" src="../../public/special_en.png" alt="">
            <input type="text" v-model="title" class="title" @blur="saveTitle">
            <div class="catalog">
                <span>目录</span>
            </div>
        </div>
        <div class="copy_right">
            Copyright © 2018 Geetest Inc. All Rights Reserved.
        </div>
        <quill-editor v-model="content"
                      @change="onEditorChange($event)"
                      :options="editorOption"
        >
        </quill-editor>
    </div>
</template>

<script>
	export default {
		name: "cover_logue",
		data(){
			return {
				title: '',
				content: this.$store.state.dataLog,
				editorOption: {
					// some quill options
				}
			}
		},
		methods: {
			onEditorChange: function ({editor, html, text}) {
				this.$store.dispatch('saveLogue', html);
			},
          saveTitle: function () {
            this.$store.dispatch('saveTitle',this.title);
          }
		},
		created: function () {
			if(this.ops){
				this.content = this.ops.content;
				this.editorOption = this.ops.editorOption;
			}
          this.title = this.$store.state.title;
		},
		props: ['ops']
	}
</script>

<style scoped lang="scss">
    .cover_logue {
        width: 595px;
        margin: 0 auto;
        border: 1px solid #ccc;
        height: 930px;
        position: relative;
        font-family: "Source Han Sans CN";
        .header {
            height: 160px;
            background: #3973FF;
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
            .title {
                border: none;
                text-align: left;
                color: #FFFFFF;
                font-size: 36px;
                margin-left: 20px;
                outline: transparent;
                background: none;
                font-weight: bold;
                //margin-top: -18px;
            }
            .catalog {
                position: absolute;
                top: 18px;
                right: 30px;
                font-size: 20px;
                font-weight: 500;
                color: #FFFFFF;
            }
        }
        .quill-editor {
            height: 682px;
            &.ql-editor {
                color: #000;
            }
        }
        .copy_right {
            position: absolute;
            bottom: 8px;
            left: 140px;
            font-size: 10px;
            color: #858AB4;
            z-index: 999;
        }
    }
</style>
