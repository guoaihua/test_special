<template>
    <div class="cover_end">
        <div class="header">
            <img class="theme" src="../../public/special_theme.png" alt="">
            <img class="theme_en" src="../../public/special_en.png" alt="">
        </div>
        <quill-editor v-model="content"
                      @change="onEditorChange($event)"
                      :options="editorOption"
        >
        </quill-editor>
        <div class="footer">
            <div class="qr-code">
                <img src="../../public/qr-code.png" alt="">
            </div>
            <div class="text">
                <p>扫一扫，关注极验官方公众号</p>
                <p>合作请添加微信：geetest1024</p>
            </div>
            <div class="logo">
                <img class="logo_gee" src="../../public/logo.png" alt="">
                <img class="logo_search" src="../../public/address.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>


	export default {
		name: "end",
		data(){
			return {
				title: '',
				content: this.$store.state.dataEnd,
				editorOption: {
					// some quill options
				}
			}
		},
		methods: {
			onEditorChange: function ({editor, html, text}) {
				this.$store.dispatch('saveEnd', html);
			}
		},
		created: function () {
			if(this.ops){
				this.content = this.ops.content;
				this.editorOption = this.ops.editorOption;
			}
		},
		props: ['ops']
	}
</script>

<style lang="scss" scoped>
    .cover_end {
        width: 595px;
        margin: 0 auto;
        border: 1px solid #ccc;
        background: url("../../public/background.png");
        background-size: 100% 91%;
        .header {
            height: 100px;
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
        }
        .quill-editor {
            height: 672px;
        }
        .footer {
            height: 160px;
            background: #3973FF;
            .qr-code {
                display: inline-block;
               padding: 28px;
                img {
                    width: 100px;
                    height: 100px;
                }
            }
            .text {
                display: inline-block;
                p {
                    color: #FFFFFF;
                    font-family: "Source Han Sans CN";
                    font-size: 14px;
                }
            }
            .logo {
                display: inline-block;
                width: 150px;
                padding: 42px 12px 7px 64px;
                .logo_gee {
                    width: 90px;
                    height: 28px;
                }
                .logo_search {
                    width: 140px;
                    height: 54px;
                }
            }
        }
    }
</style>
