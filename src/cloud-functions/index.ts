import cloudbase from "@cloudbase/js-sdk";

const app = cloudbase.init({
  env: "koki-5ghulbfed42032ec"
});

export default ()=>{
  // 1. 获取数据库引用
const db = app.database();

db.collection("page")
  .add({
    title: "Thinking in Java",
    description: '33',
  })
  .then((res) => {
    console.log(res);
  });

}

