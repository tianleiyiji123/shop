/**
 * Created by wanglei on 2015/11/1.
 */

var Util = {
    /**
     * 判定数据类型
     * 返回bool
     * @param string
     */
    getType: function(obj){
        return Object.prototype.toString.call(obj).toLocaleLowerCase().replace(/\[|\]/g,"").split(" ")[1];
    }
};
