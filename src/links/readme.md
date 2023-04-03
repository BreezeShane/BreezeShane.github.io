---
home: false
blog: false
title: 友人帳
icon: /contact.svg
article: false
comment: false
sidebar: false
---
<script>
export default {
  mounted () {
    (function AutoJump() {
        var arr = new Array(
            "/links/links/",
            "/YuuJinChou/"
        );
        window.location.href=arr[Math.floor(Math.random() * arr.length)];
    })();
  }
}
</script>