import { DemoSelection, StreamerText } from "@/models";

export const demoInput: Record<DemoSelection["key"], StreamerText> = {
    apple: "朝、みんながりんごになる夢を見た。目が覚めたら、昨日食べきれなかったりんごが机の上に置きっぱなしで、真夏だから変な匂いがしている。夏はそんなものだね。アラームの曲は穏やかで、聴いても眠気が取れない。眠くて、眠くて、りんごになってしまった。全く困ったものだ。",
    book: "友達のSNSで制作展EXTRAが宣伝されていた。「なにいう展」というツッコミ口調のタイトル、なんかおもしろそう。幸い今日は予定がなかったので東大まで足を伸ばしてみた。個性豊かな作品たちを見て楽しんでいると、prismatic diaryが目についた。たくさんのモニターに囲まれて不思議な気分。一体どんな文章を書こうか。キーボードに手を伸ばしてみる。",
    brush: "山路を登りながら、こう考えた。智に働けば角が立つ。情に棹させば流される。意地を通せば窮屈だ。とかくに人の世は住みにくい。住みにくさが高じると、安い所へ引越したくなる。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る",
    pencil: "午前中は家でオンラインを授業受けながら、今日の午後にある研究室の勉強会の論文精読用のスライドを作成した。その後は大学に行って生協でお弁当を買って、お弁当を食べながら画像処理の授業を受けた。背景差分を用いてユーザとインタラクションできるものを作らないといけないんだけど、全然いいアイデアが思い浮かばなくて苦戦してる。来週までにどうにかしないと。その後は研究室に戻って勉強会で論文精読の発表をした。選んだ論文はあんまりみんなに面白いと思ってもらえないかなと思ったけど、自分が思ってたよりは良かったかも知れない。",
} as const;
