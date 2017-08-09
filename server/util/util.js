/**
 * 统一json返回格式
 */

exports.unifyRes = (data) => {
    return {
        code: data.code || 0,
        result: data.result,
        ts: new Date(),
        ms: data.ms || ''
    };
};