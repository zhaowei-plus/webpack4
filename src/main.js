import './css/index.css';
import './css/indexless.less';
import './css/indessass.scss';

const func = (params) => {
  alert(params);

  fetch('/api/v2/info?id=111')
    .then((data)=>{
    return data.json()
  }).then((json)=>{
    console.log(json)
  });

  fetch('/api/v1/topics')
    .then((data)=>{
      return data.json()
    }).then((json)=>{
    console.log(json)
  })

  fetch('/apd/v1/topics')
    .then((data)=>{
      return data.json()
    }).then((json)=>{
    console.log(json)
  })
}

func('2222');
//
// // 开启HMR
// if (module.hot) {
//   module.hot.accept()
// }
