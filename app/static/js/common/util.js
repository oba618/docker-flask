const alertDangerText = document.getElementById("alertDangerText");

export class Util {

    /**
     * アラートを表示する
     * @param {object or string} obj 
     */
    static showAlertDanger(obj) {
        alertDangerText.innerHTML = this.createTextError(obj);
        $("#alertDanger").fadeIn();
    }

    /**
     * エラーメッセージ作成
     * @param {object or string} obj 
     * @returns {string} エラーメッセージ
     */
    static createTextError(obj) {
        let textError = "";

        // XHR.responseの場合
        if(typeof obj === "object") {
            textError= [
                obj.errorCode,
                obj.phrase,
                obj.message
            ].join("<br>");
        }

        // stringの場合
        else {
            textError = obj;
        }

        return textError;
    }
}
