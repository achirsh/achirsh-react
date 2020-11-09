export function queryString(query: string) {
    let result = null;
    const params = window.location.search.substr(1).split("&");
    params.forEach(param => {
        const [ name, value ] = param.split("=");
        if (query === name) {
            result = value;
        }
    });
    return result;
}

// 加法运算 避免精度丢失
export function add(num1: number, num2: number) {
    let baseNum;
    let baseNum1;
    let baseNum2;
    try { baseNum1 = (num1.toString().split(".")[1] || "").length; } catch (e) { baseNum1 = 0; }
    try { baseNum2 = (num2.toString().split(".")[1] || "").length; } catch (e) { baseNum2 = 0; }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    return (mul(num1, baseNum) + mul(num2, baseNum)) / baseNum;
}

// 减法运算
export function sub(num1: number, num2: number) {
    let baseNum;
    let baseNum1;
    let baseNum2;
    let precision;
    num1 = Number(num1) || 0;
    num2 = Number(num2) || 0;
    try { baseNum1 = (num1.toString().split(".")[1] || "").length; } catch (e) { baseNum1 = 0; }
    try { baseNum2 = (num2.toString().split(".")[1] || "").length; } catch (e) { baseNum2 = 0; }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
    return ((mul(num1, baseNum) - mul(num2, baseNum)) / baseNum).toFixed(precision);
}

// 乘法运算
export function mul(num1: number, num2: number) {
    let baseNum = 0;
    try { baseNum += (num1.toString().split(".")[1] || "").length; } catch (e) { console.warn(e); }
    try { baseNum += (num2.toString().split(".")[1] || "").length; } catch (e) { console.warn(e); }
    return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
}

// 除法运算
export function div(num1: number, num2: number) {
    let baseNum1 = 0;
    let baseNum2 = 0;
    let baseNum3;
    let baseNum4;
    try { baseNum1 = (num1.toString().split(".")[1] || "").length; } catch (e) { baseNum1 = 0; }
    try { baseNum2 = (num2.toString().split(".")[1] || "").length; } catch (e) { baseNum2 = 0; }
    baseNum3 = Number(num1.toString().replace(".", ""));
    baseNum4 = Number(num2.toString().replace(".", ""));
    return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1);
}