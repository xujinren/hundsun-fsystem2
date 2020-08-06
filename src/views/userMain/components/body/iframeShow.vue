<!--
  预览文件
-->
<template>
  <div class="filePreview">
    <div class="filePreview_center">
      <div class="center_header">
        <div class="header_left">文件预览</div>
        <div class="header_right" @click="filePreviewCancel">关闭</div>
      </div>
      <div class="center_center">
        <iframe :src="path" frameborder="0" style="width: 100%; height: 100%">
			正在努力加载中，请稍候......
		</iframe>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
	props:["path"],
  data() {
    return {
		
    }
  },
  methods: {
    filePreviewCancel(){
		console.info(this.path);
      this.$emit('filePreviewCancel','');
    }
  }
}
</script>
 
<style lang="scss" scoped>
.filePreview{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba($color: #000000, $alpha: 0.4);
  min-height: 500px;
  overflow: auto;
  .filePreview_center{
    width: 90%;
    height: 100%;
    left: 5%;
    background: white;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    position: relative;
    transform: translateY(-50% -50%);
    padding: 16px;
    .center_header{
      padding-bottom: 10px;
      border-bottom: 1px solid #dee2ed;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 3px;
      .header_left{
        font-weight: bold;
      }
      .header_right{
        cursor: pointer;
        color: #99a1ad;
      }
    }
	
    .center_center{
      border-radius: 3px;
      width: 100%;
      height: 94%;
    }
  }
}
</style>