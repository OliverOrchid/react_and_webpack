
import * as React from "react";
export interface HelloProps {
    compiler: string;
    framework: string;
}

export const  Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}! </h1>;


// /////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////


// // 注意上面的 代码示例 使用了react语法中的 "函数式组件"(其优点是减少代码量,便于维护) ，实际上我们可以让它更像一点儿_类_。

// // import * as React from "react";

// // export interface HelloProps { compiler: string; framework: string; }

// // // 'HelloProps' describes the shape of props.
// // // State is never set so we use the '{}' type.
// // export class Hello extends React.Component<HelloProps, {}> {  //注意 "extends" 关键字
// //     render() {
// //         return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
// //     }
// // }


// /////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////

// import * as React from "react";

// export interface HelloProps { compiler: string; framework: string; }

// export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;