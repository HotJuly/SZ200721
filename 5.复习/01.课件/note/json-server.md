## json-server是什么?
用来快速搭建Restful API的工具包

## 使用json-server

- 在线文档: 

https://github.com/typicode/json-server

- 下载: 

npm install -g json-server

- 目标根目录下创建数据库json文件: db.json

```json
{
  "posts": [
    {
      "id": 1,
      "title": "json-server",
      "author": "typicode"
    },
    {
      "id": 2,
      "title": "test",
      "author": "atguigu"
    }
  ],
  "comments": [
    {
      "id": 1,
      "body": "some comment",
      "postId": 1
    }
  ],
  "profile": {
    "name": "typicode"
  }
}
```



- 启动服务器

json-server --watch db.json



## 测试访问1: 使用浏览器

 http://localhost:3000/posts
 http://localhost:3000/posts/1



## 测试访问: 使用axios

```js
<div>
  <button onclick="testGet()">GET</button>
  <button onclick="testPost()">POST</button>
  <button onclick="testPut()">PUT</button>
  <button onclick="testDelete()">DELETE</button>
</div>

<script src="https://cdn.bootcss.com/axios/0.19.0/axios.js"></script>
<script>
  /* 1. GET请求: 从服务器端获取数据*/
  function testGet() {
    axios.get('http://localhost:3000/posts') // 获取所有posts的数组
    // axios.get('http://localhost:3000/posts/1') // 获取id为1的数组
    // axios.get('http://localhost:3000/posts?id=1&id=2') // 获取id为1或2的数组
    // axios.get('http://localhost:3000/posts?title=json-server&author=typicode')
  }

  /* 2. POST请求: 向服务器端添加新数据*/
  function testPost() {
    axios.post('http://localhost:3000/comments', {body: 'xxx', postId: 1}) // 保存数据
  }

  /* 3. PUT请求: 更新服务器端已经数据 */
  function testPut() {
    axios.put('http://localhost:3000/comments/4', {body: 'yyy', postId: 1})
  }

  /* 4. DELETE请求: 删除服务器端数据 */
  function testDelete() {
    axios.delete('http://localhost:3000/comments/4')
  }
</script>
```