---
title: 简单的网页前后端搭建过程
date: 2021-08-15 15:02:00
author: Breeze Shane
toc: true
mathjax: false
category: 
 - Web
 - Front-end
 - Back-end
tag: 
 - Web
 - Front-end
 - Back-end
---

## 前端(HTML + CSS + JavaScript)

### HTML

**HTML设置字体：**

```html
<font size="6" color="snow"><strong>......</strong></font>
```

这类写法已经过时，如今已被丢弃，但大多浏览器仍能支持显示。现今的写法应为如下CSS类写法：

```html
<span style="font-size: 25px; color: snow; font-weight: bolder; ">......</span>
```

**HTML设置上传控件：**

```html
<form id="test" enctype="multipart/form-data" style="text-align: center; ">
    <input type="button" id="upload" value="上传图片" style="font-size: 25px; font-weight: bold; "><br>
    <input type="file" id="files" name="upload_files" style="visibility: hidden" multiple="multiple">
</form>
```

这样就可以显示一个button，点击后即可打开文件对话框选择多个文件，另外应该注意的是你选择好文件并确认之后，上传的数据是会暂时存到这个form标签里的，而这也是为了后续的传输方便。

### CSS

HTML的head标签内可以写入`<style>`标签，在`<style>`内定义CSS样式；另外也可直接在其他标签内编写属性`style="xxxxxx"`。

CSS选择器：

```css
.Image {} /*这里是表示使用类选择器，选中类名为Image的所有标签*/
body {} /*这里表示直接选中body标签*/
#main {} /*这里是表示使用ID选择器，选中Id名为main的标签*/
```

CSS实现背景图片自动缩放大小：

```css
background-image: url("Path/to/your/background/image");
background-position: center center;
background-attachment: fixed;
background-size: cover;
margin: 0;
position: relative;
```

CSS实现某标签垂直水平居中：

```css
position: fixed;
top: 50%;
left: 50%;
-webkit-transform: translate(-50%, -50%);
-moz-transform: translate(-50%, -50%);
transform: translate(-50%, -50%);
```

CSS设置标签可视与否：`visibility: hidden;`

CSS实现水平居中间隔排列：`text-align: center;  display: flex;justify-content: space-around; `

CSS设置图片透明度：`opacity: 0.75; filter: alpha(opacity=75); `带上这两语句就可以支持绝大多数浏览器。

### JavaScript

JS代码将写在`<script>`标签内：

```javascript
    var formData = new FormData(); 
    var file_num = 0;
    var d, D;
    var index = 0;
	//因为要在多个函数使用该实例，因此直接在全局内声明较为方便，可以避开过多传参。

    $("#upload").on("click", file_open);
	//这两行分别为upload按钮和start按钮绑定了file_open和start_predict两个事件。

    $('#files').on("change", function () { 
        //当files标签内数据发生变动时，将发生以下事件。
        var fileList = this.files
        for (var i = 0; i < fileList.length; i++) {
            formData.append('file', fileList[i]);
            //选取的多个文件需要依次遍历并加入到formData实例中。
        }
        file_num = fileList.length
        if (file_num === 0) {
            alert("请选择文件！")
        } else {
            if (file_num > 1) {
                $(".change").attr('style', 'height: 50px;width: 100px;font-size: 25px; visibility: visible;')
            }
            // 以下定义了前端传输的相关信息。
            $.ajax({
                url: "/upload_files", //定义当前路由，这里需要和后端内路由的定义保持一致。
                type: "POST", //定义传输的类型。
                data: formData, // 定义传输的内容
                processData: false, 
                // 取消ajax对数据的预处理，因为传输的数据是图片，如果不设为false的话ajax会将数据转化为字符串类型，就会导致图片二进制流被误处理，因此必须要设置为false。
                contentType: false,
                // 表示不使用发送至服务器的内容编码类型，因为已经试过直接设置为'multipart/form-data'，但依旧会报错，只有在设置为false的时候才会正常处理。
                success: function (data) {
                    // 表示发送数据成功时执行的事件。由于AJAX传输数据会将其转化为JSON，因此需要用JSON包的parse方法来解析数据。
                    // 另外应该注意的是，读代码的顺序应该是在读这个函数之前先读后端对数据的处理，然后再回来读这个success function。因为是后端接受到数据并处理之后会有一个return来返回要显示的数据，这个数据就会输入到函数的data参数内。
                    d = JSON.parse(data)
                    $('#Before').attr('src', d.file_url[0]);
                    $('#Before').attr('style', '');
                    //后续的两行代码则是修改相应控件的数据。
                },
                error: function () {
                    // 表示发送数据失败时将执行的事件，这里只是简单地弹出对话框提示错误。
                    alert("上传失败");
                }
            })
        }
    });

    function file_open() {
        $("#files").click()
        // 直接触发选择文件的点击事件。
    }
```



## 后端(Flask + Flask_uploads)

使用后端flask之前需要先做好配置：

```python
from flask import Flask, render_template, request
from flask_uploads import UploadSet, IMAGES, configure_uploads, patch_request_class

app = Flask(__name__, template_folder='front-end', static_folder='front-end/Static_Files')
```

其中`template_folder`参数是设定你的前端主页所在目录，而`static_folder`参数是用来设定你的前端静态资源所在目录，包括图片、视频、音乐、外部脚本文件以及外部CSS文件等等。

```python
@app.route('/', methods=["GET"])
def index():
    return render_template('index.html')
```

这段代码表示的就是后端在接受到'/'的路由请求时要做的反应，具体内容是由这里的函数定义。

> 值得一提的是`app.config['UPLOADED_PHOTOS_DEST']`表示的是图片资源存放的目录。

调用flask_uploads包后要做如下的配置：

```python
images = UploadSet('photos', IMAGES)
configure_uploads(app, images)
patch_request_class(app)
```

这样就可以设置好你上传图片的前期配置准备了。

上面三段代码其实在各项目内是相对固定的，而接下来将要个性化一些了：

```python
@app.route('/upload_files', methods=['GET', 'POST'])
# 定义路由upload_files，并声明使用的方法是GET和POST方法。
def upload():
    # 定义函数内具体需要做的数据处理之类的事情，下面的例子是动态加载接收到的图片集。
    file_urls = []
    file_list = request.files.getlist('file')
    for file in file_list:
        filename = images.save(file)
        fileList.append(filename)
        file_urls.append(images.url(filename))
    data = {'file_url': sorted(file_urls)}
    data = json.dumps(data) # 在这里将字典data转化为json数据传输过去。
    return data # 读到这里就要回到前端ajax的success function内继续读了。
```

>  「注」：以上所有代码都是项目的主要部分。

最后将整个前后端写好之后，就可以正常执行了！
