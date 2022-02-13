export class Const {
    // 本番環境
    static BASE_URL = "https://nh8oknhn04.execute-api.ap-northeast-1.amazonaws.com";
    static STAGE = "dev";

    // 開発環境
    // static BASE_URL = "https://w5yzvhezxg.execute-api.ap-northeast-1.amazonaws.com";
    // static STAGE = "to";

    static BASE_PATH = [this.BASE_URL, this.STAGE].join("/");
    static TWITTER_SHARE_URL = "https://twitter.com/share?ref_src=twsrc%5Etfw";
    static TWITTER_WIDGETS_URL = "https://platform.twitter.com/widgets.js";
}