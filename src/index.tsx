import * as React from "react";
import * as ReactDOM from "react-dom";

import {Hello} from "./components/Hello"; //注意,禁止追加后缀名,可参考L1

ReactDOM.render(
    <Hello compiler="typeScript" framework="reactJS" />,
    document.getElementById("yourselfElementId"),  //QUE:为什么是 "example" ? 是否可以自定义?
                                                    //ANS: 另见 根目录 index.html
);
