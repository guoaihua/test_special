<template>
    <div class="cover_titles" ref="container">
        <div class="header">
            <textarea type="text" v-model="title" class="title" style="resize: none" @blur="saveContent"></textarea>
            <input type="text" v-model="author" class="author" placeholder="文/作者" @blur="saveContent">
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
		name: "titles",
		data(){
			return {
				title: '文章标题',
                author: '文/作者',
				content: "",
				editorOption: {
					// some quill options
				}
			}
		},
        watch: {
	        '$route'(to, old){
              this.getContent();
            }
        },
		methods: {
          onEditorChange: function ({editor, html, text}) {
                this.setHeight();
				this.$store.dispatch('savePage', { id: this.$route.params.pageId, page: {
				    title: this.title,
                    author: this.author,
                    content: html
                  }
                });
			},
          saveContent: function () {
            this.$store.dispatch('savePage', { id: this.$route.params.pageId, page: {
                title: this.title || '',
                author: this.author || '',
                content: this.content || ''
              }
            });
          },
          setHeight: function () {
            var ele = this.$refs.container;
            var width = this.$refs.container.getBoundingClientRect().height - 90;
            ele.style.minHeight = Math.ceil(width /842)*842 + 'px';
          },
          getContent: function () {
            this.title = "文章标题";
            this.author = "文/作者";
            this.content = "";

            if(this.$store.state.pages[this.$route.params.pageId]){
              var data = this.$store.state.pages[this.$route.params.pageId];
              this.title = data.title;
              this.author = data.author;
              this.content = data.content;
            }
          }
		},
		created: function () {
			if(this.ops){
				this.editorOption = this.ops.editorOption;
			};
          this.$nextTick(function () {
            this.setHeight();
          });
			if(this.cont){
              this.title = this.cont.title;
              this.author = this.cont.author;
              this.content = this.cont.content;
              return;
            }
			// 设置默认值,根据id去拿存储的值
          this.getContent();

          // 计算并设置footer

		},
		props: ['ops','cont']
	}
</script>

<style scoped lang="scss">
    .cover_titles {
        width: 595px;
        margin: 0 auto;
        border: 1px solid #ccc;
        min-height: 930px;
        font-family: "Source Han Sans CN";
        position: relative;
        .header {
            height: 160px;
            background: #3973FF;
        .title {
            border: none;
            text-align: left;
            color: #FFFFFF;
            font-size: 40px;
            background: none;
            outline: transparent;
            margin: 24px 0 0 30px;
            font-weight: bold;
        }
        .author {
            border: none;
            margin-left: 38px;
            background: none;
            color: #FFFFFF;
            outline: transparent;
        }
         }

    }
</style>
