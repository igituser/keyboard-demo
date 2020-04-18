//1 初始化必要数据
var hash = init()['hash'];
var keys = init()['keys'];

//2 生成键盘
//遍历keys 生成kbd标签
generateKeyboard(keys, hash);

//3 监听用户动作
listenToUser(hash);

/** 代码组织结构，从线性转变成树状，这样结构更清晰，debug的时候只需关注树状某一层就行，就像排序我只
 * 关注比我大的或者比我小的那一部分就行
 *  **/


function init(){
    //26个字母
    var keys = {
        '0':{0:'q', 1:'w', 2:'e', 3:'r', 4:'t', 5:'y', 6:'u', 7:'i', 8:'o', 9:'p', 'length':10},
        '1':{0:'a', 1:'s', 2:'d', 3:'f', 4:'g', 5:'h', 6:'j', 7:'k', 8:'l', 'length':9},
        '2':{0:'z', 1:'x', 2:'c', 3:'v', 4:'b', 5:'n', 6:'m', 'length':7},
        'length':3
    }

    //键盘字母对应的网址
    var hash = {
        'a':'apple.com.cn',
        'b':'bilibili.com',
        'c':'',
        'd':'',
        'e':'eaby.com',
        'f':'qq.com',
        'g':'github.com',
        'h':'huawei.com',
        'i':'',
        'j':'juejin.im',
        'k':'kingsoft.com',
        'l':'lagou.com',
        'm':'microsoft.com',
        'n':'nintendoswitch.com.cn/',
        'o':'oppo.com',
        'p':'',
        'q':'',
        'r':'redhat.com',
        's':'smzdm.com',
        't':'tencent.com',
        'u':'',
        'v':'v2ex.com',
        'w':'weibo.com',
        'x':'',
        'y':'',
        'z':'zol.com.cn'
    }

    //取出localStorage
    var hashInLocalStorage = getFromLocalStorage('zzz');
    if(hashInLocalStorage){
        hash = hashInLocalStorage;
    }

    return {
        "hash": hash,
        "keys": keys
    }

}

//获取localStorage
function getFromLocalStorage(name){
    return JSON.parse(localStorage.getItem(name) || null)
}

//生成标签元素
function tag(tagName, attributes){
    var element = document.createElement(tagName);

    if(attributes){
        for( var key in attributes){
            element[kay] = attributes[kay]
        }
    }

    return element;
}

function createSpan(textContent){
    var span = tag('span');
    span.textContent = textContent;
    span.className = 'text';
    return span;
}

function createButton(id){
    var button = tag('button');
    button.textContent = '编辑';
    button.id = id;

    //注意闭包  原来用的是target事件对象，我自己用闭包解决的
    button.onclick = (function(){
        return function(){
            x = window.prompt('给我个网址');
            var key = this['id'];
            hash[key] = x

            var img2 = this.previousSibling;
            img2.src = "https://"  + x + '/favicon.ico';
            img2.onerror = function(xxx){
                xxx.target.src = "./img/point.png";
            }

            //localStorage 必须存储的是序列化的值
            localStorage.setItem('zzz', JSON.stringify(hash));
        }
    })()

    return button;
}

function createImg(domain){
    var img = tag('img');
    if(domain){
        img.src = 'https://www.' + domain + '/favicon.ico';
    }else{
        img.src = './img/point.png';
        console.log(domain)
    }

    img.onerror = function(e){
        e.target.src = './img/point.png';
    }

    return img;
    
}

function generateKeyboard(keys, hash){
    for(var index = 0; index < keys['length']; index = index + 1){
        var div = tag('div');
        main.appendChild(div);
        var row = keys[index];

        for(var index2 = 0; index2 < row['length']; index2 = index2 + 1){
            var kbd    = tag('kbd');
            var button = createButton(row[index2]);
            var img    = createImg(hash[row[index2]]);
            var span   = createSpan(row[index2]);

            kbd.textContent = row[index2];
            kbd.className = 'key';

            
            div.appendChild(kbd);
            kbd.appendChild(img);
            kbd.appendChild(button);
            kbd.appendChild(span);
        }
    }
}

function listenToUser(hash){
    document.onkeypress = function(keyboardEvent){
        console.log(hash[keyboardEvent.key])
        website = 'http://' + hash[keyboardEvent.key]
        // location.href = website;
        /* 如何在标签打开新网站 */
        window.open(website, "_blank")
    }
}