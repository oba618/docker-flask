export class Const {
    static BASE_URL = "https://nh8oknhn04.execute-api.ap-northeast-1.amazonaws.com";
    static STAGE = "dev";
    static BASE_PATH = [this.BASE_URL, this.STAGE].join("/");
    static TWITTER_SHARE_URL = "https://twitter.com/share?ref_src=twsrc%5Etfw";
    static TWITTER_WIDGETS_URL = "https://platform.twitter.com/widgets.js";
}