import React, { useState, useEffect } from 'react';

function Example() {
    // 声明一个新的叫做‘count’的state变量
    const [count, setCount] = useState(0);

    useEffect(() => {
        // 可以在这里执行数据获取或调用其他命令式的API

        // 这种是不需要清除的
        document.title = `You clicked ${count} times`;

        // 外部订阅数据源，是需要清除的
        // function handleStatusChange(status) {
        //     setIsOnline(status.isOnline);
        // }
        // ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        //     return function cleanup() {
        // ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        // };
    }, [count]);
    // 仅在count更改时更新

    // 自定义hook是一个函数，其名称以“use”开头，函数内部可以调用其他的hook

    return <div>
        <p>{count}</p>
        <div onClick={() => setCount(count + 1)}>click me</div>
    </div>
}