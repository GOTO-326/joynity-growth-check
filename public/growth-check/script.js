// ===== 編集ポイント 1: 評価項目・判定文言 =====
// 評価項目や3/2/1の表示語を変更したい場合は、主に assessmentGroups と criteriaBank を編集します。
const SCORE_LABELS = {
  3: "土台良好",
  2: "要チェック",
  1: "個別サポート推奨"
};

const SCORE_DESCRIPTIONS = {
  3: "今の練習を支える身体の土台は安定しています。現在の良い状態を維持しながら、成長期の変化に合わせて定期的に確認していきましょう。",
  2: "成長期の変化に合わせて、今のうちに確認・調整しておきたい項目です。痛みが出る前に見直すことで、ケガ予防や動きやすさにつながります。",
  1: "痛みや負担につながる可能性があるため、個別に確認しながら進めたい項目です。必要に応じて医師評価やJoynityでの個別サポートにつなげましょう。"
};

const assessmentGroups = {
  injury: {
    title: "障害予防コンディション",
    shortTitle: "障害予防",
    cautionLabel: SCORE_LABELS[2],
    alertLabel: SCORE_LABELS[1],
    items: [
      "練習量と休養バランス",
      "既往歴",
      "片脚スクワット",
      "ジャンプ着地",
      "切り返し動作"
    ],
    judgement(score) {
      if (score >= 2.5) return { text: "安定", tone: "good", parentText: "練習を支える身体の土台は比較的安定しています。" };
      if (score >= 1.8) return { text: SCORE_LABELS[2], tone: "caution", parentText: "一部に確認・調整しておきたいポイントがあります。" };
      return { text: "要サポート", tone: "alert", parentText: "優先して確認したい項目があります。" };
    }
  },
  movement: {
    title: "身体の使い方",
    shortTitle: "身体の使い方",
    cautionLabel: SCORE_LABELS[2],
    alertLabel: SCORE_LABELS[1],
    items: [
      "足関節可動性",
      "股関節柔軟性",
      "体幹安定性",
      "姿勢左右バランス",
      "呼吸パターン"
    ],
    judgement(score) {
      if (score >= 2.5) return { text: "土台良好", tone: "good", parentText: "動きの土台は良い状態です。" };
      if (score >= 1.8) return { text: SCORE_LABELS[2], tone: "caution", parentText: "成長期に向けて確認したい動きがあります。" };
      return { text: SCORE_LABELS[1], tone: "alert", parentText: "動作面の個別サポートを優先したい状態です。" };
    }
  },
  nutrition: {
    title: "行動習慣コンディション",
    shortTitle: "栄養・生活",
    cautionLabel: SCORE_LABELS[2],
    alertLabel: SCORE_LABELS[1],
    items: [
      "朝食習慣",
      "練習後の補食",
      "水分摂取",
      "睡眠時間",
      "疲労回復感"
    ],
    judgement(score) {
      if (score >= 2.5) return { text: "継続できている", tone: "good", parentText: "回復を支える生活習慣は継続できています。" };
      if (score >= 1.8) return { text: SCORE_LABELS[2], tone: "caution", parentText: "睡眠・補食・水分などで確認したい点があります。" };
      return { text: SCORE_LABELS[1], tone: "alert", parentText: "回復習慣を優先して見直したい状態です。" };
    }
  }
};

const criteriaBank = {
  "練習量と休養バランス": {
    good: "週1〜2日の休養があり、痛みや強い疲労を翌日に持ち越しにくい。練習量の急増が少ない。",
    caution: "休養日が少ない週がある。疲労感や軽い痛みが残ることがあり、練習量の変動が大きい。",
    alert: "連日の高負荷が続く。痛みがあっても練習継続し、睡眠や食欲にも影響が出ている。"
  },
  "既往歴": {
    good: "過去3ヶ月以内のスポーツ障害・外傷がなく、復帰後の違和感もない。",
    caution: "過去に同部位の痛みや軽い外傷がある。現在は競技可能だが再発への配慮が必要。",
    alert: "同部位の痛みを繰り返す、または現在も痛みで練習内容を制限している。"
  },
  "片脚スクワット": {
    good: "膝のブレが少なく、骨盤が安定し、左右とも10回を安定して実施できる。",
    caution: "軽度の膝内側変位や骨盤の傾きがあり、後半に少しふらつく。",
    alert: "明らかな膝内側変位、骨盤の大きな崩れ、またはバランス保持が困難。"
  },
  "ジャンプ着地": {
    good: "左右均等に着地し、膝・股関節で衝撃を吸収できる。音や反動が過度に大きくない。",
    caution: "やや左右差があり、膝が軽度に内側へ入る。着地音がやや大きい。",
    alert: "左右差が大きい、膝内側変位が強い、着地で姿勢が崩れる。"
  },
  "切り返し動作": {
    good: "減速から方向転換まで体幹が安定し、膝とつま先の向きがそろう。",
    caution: "減速時に上体が流れる、または膝が軽度に内側へ入る。",
    alert: "切り返しで大きく姿勢が崩れる。膝・足首に負担が集中し、痛みや不安感がある。"
  },
  "足関節可動性": {
    good: "左右差が少なく、踵を浮かせずに膝を前へ出せる。しゃがみ動作で代償が少ない。",
    caution: "片側の硬さや軽い左右差があり、深いしゃがみで踵が浮きやすい。",
    alert: "可動域制限が明らかで、しゃがみ・着地・走行時に膝や足部の代償が目立つ。"
  },
  "股関節柔軟性": {
    good: "股関節の屈曲・伸展・回旋に大きな左右差がなく、骨盤の代償が少ない。",
    caution: "片側の硬さ、開脚や回旋の左右差があり、動作中に骨盤が逃げやすい。",
    alert: "柔軟性低下が明らかで、腰・膝に負担が出る代償動作や痛みを伴う。"
  },
  "体幹安定性": {
    good: "プランクや片脚支持で体幹が安定し、呼吸を止めずに姿勢保持できる。",
    caution: "姿勢保持中に腰が反る、骨盤が揺れる、呼吸が止まりやすい。",
    alert: "短時間でも姿勢が崩れる。腰部への負担感や痛みがあり、基本姿勢の保持が困難。"
  },
  "姿勢左右バランス": {
    good: "立位・スクワット・片脚支持で肩、骨盤、膝の左右差が少ない。",
    caution: "肩や骨盤の高さ、荷重の偏りが軽度に見られる。",
    alert: "左右差が明らかで、片側荷重や体幹の傾きが強く、動作にも影響している。"
  },
  "呼吸パターン": {
    good: "胸郭と腹部が自然に動き、運動中も過度な肩上げや息止めが少ない。",
    caution: "胸式優位、肩のすくみ、息止めが時々見られる。",
    alert: "浅い呼吸や息止めが強く、姿勢保持や回復の妨げになっている。"
  },
  "朝食習慣": {
    good: "ほぼ毎日、主食・たんぱく質・水分を含む朝食を摂れている。",
    caution: "欠食する日が週1〜2回ある、または主食のみなど内容が偏りやすい。",
    alert: "朝食を抜くことが多い。午前中の集中力低下や練習前のエネルギー不足が懸念される。"
  },
  "練習後の補食": {
    good: "練習後30〜60分以内に、糖質とたんぱく質を含む補食を概ね摂れている。",
    caution: "補食はあるが量や内容が不安定。帰宅後の食事まで時間が空く日がある。",
    alert: "練習後にほとんど補給できない。疲労回復や成長に必要なエネルギーが不足しやすい。"
  },
  "水分摂取": {
    good: "練習前・中・後でこまめに飲めており、暑熱時は量を調整できている。",
    caution: "飲むタイミングが遅い、または練習後の水分補給が少ない。",
    alert: "のどの渇きが強い、尿色が濃い、頭痛やだるさが出やすいなど不足サインがある。"
  },
  "睡眠時間": {
    good: "年齢相応の睡眠時間を概ね確保し、就寝・起床時刻が安定している。",
    caution: "睡眠時間が日によってばらつく。就寝が遅い日や寝起きの悪さがある。",
    alert: "睡眠不足が続き、日中の眠気、疲労残り、集中力低下が見られる。"
  },
  "疲労回復感": {
    good: "翌朝には疲労が軽くなり、練習への意欲と食欲が保たれている。",
    caution: "疲労が翌日まで残ることがある。筋肉痛やだるさが続く週がある。",
    alert: "疲労が抜けにくく、痛み・食欲低下・睡眠の乱れ・意欲低下が重なっている。"
  }
};

const recommendationBank = {
  "練習量と休養バランス": "週単位で練習量と休養日を見える化し、痛みや疲労が残る日は負荷を調整しましょう。",
  "既往歴": "過去に痛めた部位は再発予防の観点で、ウォームアップとセルフケアを継続しましょう。",
  "片脚スクワット": "片脚で支える動作を安定させ、膝や足首が内側へ入りすぎないフォームを練習しましょう。",
  "ジャンプ着地": "着地時の膝・股関節・足首の連動を整え、衝撃をやわらかく受け止める練習を行いましょう。",
  "切り返し動作": "方向転換時の体幹と骨盤のコントロールを高め、急な負荷が一部に集中しないようにしましょう。",
  "足関節可動性": "足首の可動域を保つストレッチとしゃがみ動作を取り入れ、着地や走りの土台を整えましょう。",
  "股関節柔軟性": "股関節まわりの柔軟性を高め、腰・膝への代償負担を減らしましょう。",
  "体幹安定性": "体幹を安定させる基本エクササイズで、走る・跳ぶ・止まる動作の軸を作りましょう。",
  "姿勢左右バランス": "左右差が出やすい動作を確認し、片側だけに負担が偏らない身体の使い方を練習しましょう。",
  "呼吸パターン": "胸郭と腹部を使った呼吸を整え、姿勢や回復力につながる土台を作りましょう。",
  "朝食習慣": "朝食で主食・たんぱく質・水分を確保し、学校生活と練習に必要なエネルギーを補いましょう。",
  "練習後の補食": "練習後30分以内を目安に、補食でエネルギーとたんぱく質を補給しましょう。",
  "水分摂取": "練習前後の体重変化や尿の色を目安に、水分補給のタイミングを決めましょう。",
  "睡眠時間": "成長と回復のために就寝時刻を整え、睡眠時間を安定させましょう。",
  "疲労回復感": "疲労が抜けにくい時は、練習強度・睡眠・食事量を合わせて見直しましょう。"
};

// ===== 編集ポイント 2: 課題メニューテンプレート =====
// 評価項目ごとの自動メニューを変える場合は、ここを編集してください。
const menuTemplateBank = {
  "練習量と休養バランス": { name: "練習量・休養チェック", purpose: "疲労や痛みをため込まず、成長期の負担を調整する", frequency: "週1回", duration: "5分", target: "本人・保護者" },
  "既往歴": { name: "既往部位セルフケア", purpose: "過去に痛めた部位の再発リスクを減らす", frequency: "練習日", duration: "5分", target: "本人" },
  "片脚スクワット": { name: "片脚支持トレーニング", purpose: "片脚で支える力を高め、切り返しや着地の安定性を高める", frequency: "週3回", duration: "5分", target: "本人" },
  "ジャンプ着地": { name: "ジャンプ着地トレーニング", purpose: "膝・股関節・足首で衝撃をやわらかく受け止める", frequency: "練習前", duration: "5分", target: "本人・指導者" },
  "切り返し動作": { name: "減速・切り返しフォーム確認", purpose: "方向転換時の膝や腰への負担を減らす", frequency: "週3回", duration: "5分", target: "本人・指導者" },
  "足関節可動性": { name: "足首モビリティ", purpose: "しゃがみ込み・着地時の膝や腰への負担を減らす", frequency: "練習前または毎日", duration: "3分", target: "本人" },
  "股関節柔軟性": { name: "股関節ストレッチ", purpose: "骨盤と股関節を動かしやすくし、腰や膝の代償を減らす", frequency: "毎日", duration: "4分", target: "本人" },
  "体幹安定性": { name: "体幹安定エクササイズ", purpose: "走る・跳ぶ・止まる動作の軸を安定させる", frequency: "週3回", duration: "5分", target: "本人" },
  "姿勢左右バランス": { name: "左右バランス確認", purpose: "片側だけに負担が偏らない身体の使い方を身につける", frequency: "練習前", duration: "3分", target: "本人・指導者" },
  "呼吸パターン": { name: "呼吸リセット", purpose: "姿勢保持と回復を支える呼吸リズムを整える", frequency: "毎日", duration: "3分", target: "本人" },
  "朝食習慣": { name: "朝食チェック", purpose: "学校生活と練習に必要なエネルギーを朝から確保する", frequency: "毎日", duration: "朝食時", target: "本人・保護者" },
  "練習後の補食": { name: "練習後補食ルール", purpose: "練習後の回復と成長に必要な栄養を補う", frequency: "練習日", duration: "30〜60分以内", target: "本人・保護者" },
  "水分摂取": { name: "水分摂取チェック", purpose: "脱水や疲労蓄積を防ぎ、練習中の集中力を保つ", frequency: "毎日・練習日", duration: "起床後、練習前、練習中、練習後", target: "本人・保護者" },
  "睡眠時間": { name: "睡眠リズム改善", purpose: "成長・疲労回復・集中力を支える", frequency: "毎日", duration: "就寝前", target: "本人・保護者" },
  "疲労回復感": { name: "クールダウン習慣", purpose: "疲労を翌日に残しにくくし、練習継続を支える", frequency: "練習後", duration: "5分", target: "本人" }
};

// ===== 編集ポイント 3: 成長ステージ別の栄養指導 =====
// 栄養指導のテーマや本文を変える場合は、ここを編集してください。
const nutritionStageAdvice = {
  "成長前期": {
    theme: "食べる土台づくり",
    why: "成長と練習を支えるために、まずは毎日食べるリズムを作る時期です。",
    nutrients: ["炭水化物", "たんぱく質", "カルシウム"],
    meals: ["ご飯＋卵焼き＋味噌汁", "しらすご飯", "鮭おにぎり", "納豆ご飯", "チーズトースト"],
    convenience: ["おにぎり", "ゆで卵", "牛乳", "ヨーグルト", "バナナ"],
    beforeAfter: "練習前はおにぎりやバナナなど軽く食べやすいもの、練習後は牛乳やヨーグルトを足しましょう。",
    easyPlan: "朝に食べきれない日は、バナナ＋牛乳だけでもOKです。",
    parentNote: "まずは“毎日食べる習慣”を優先しましょう。"
  },
  "成長加速期": {
    theme: "エネルギー不足を防ぐ",
    why: "身長が伸び始める時期は、練習分に加えて成長にもエネルギーを使います。",
    nutrients: ["炭水化物", "鉄", "たんぱく質"],
    meals: ["豚丼", "親子丼", "カレーライス", "うどん＋卵", "牛丼"],
    convenience: ["おにぎり＋サラダチキン", "バナナ＋飲むヨーグルト", "カステラ＋牛乳"],
    beforeAfter: "練習後はおにぎり、バナナ、プロテイン牛乳、ヨーグルトなどを30分以内に入れましょう。",
    easyPlan: "食が細い日は、1回量を増やすより補食の回数を増やしましょう。",
    parentNote: "この時期は“食が細い＝栄養不足”になりやすいため、量より回数を増やしましょう。"
  },
  "成長ピーク前": {
    theme: "骨・筋肉・腱の材料を増やす",
    why: "これから身体が急に変わる前に、骨・筋肉・腱の材料を不足させないことが大切です。",
    nutrients: ["カルシウム", "ビタミンD", "たんぱく質", "鉄"],
    meals: ["鮭定食", "鶏肉と卵料理", "豆腐ハンバーグ", "しらす丼", "鍋料理"],
    convenience: ["鮭おにぎり＋牛乳", "ゆで卵＋ヨーグルト", "納豆巻き＋飲むヨーグルト", "小魚アーモンド"],
    beforeAfter: "練習後は糖質とたんぱく質をセットにし、睡眠までを回復時間として整えましょう。",
    easyPlan: "魚・卵・牛乳・納豆・豆腐・小魚を、1日どこかで1つ足しましょう。",
    parentNote: "骨が伸びる時期は、筋肉や腱への負担も増えるため、“食べて回復する”ことが重要です。"
  },
  "成長ピーク期": {
    theme: "回復力を落とさない",
    why: "身長や体重の変化が大きく、身体への負担も増えやすいため、補食と回復が特に重要です。",
    nutrients: ["炭水化物", "たんぱく質", "水分", "鉄", "マグネシウム"],
    meals: ["丼もの", "パスタ", "肉料理＋ご飯", "鍋＋うどん", "焼き魚定食"],
    convenience: ["おにぎり", "バナナ", "ゼリー飲料", "牛乳", "プロテイン"],
    beforeAfter: "練習後30分以内に、おにぎり・バナナ・ゼリー飲料・牛乳・プロテインなどを補給しましょう。",
    easyPlan: "練習バッグに補食を1つ固定で入れておくと継続しやすくなります。",
    parentNote: "この時期は“食べても追いつかない”ことがあるため、補食が重要です。"
  },
  "成長ピーク後": {
    theme: "筋力と動きの質を高める",
    why: "身体が大きくなった分、筋力や動作の質を高めるための材料と回復が必要です。",
    nutrients: ["たんぱく質", "炭水化物", "抗酸化栄養素"],
    meals: ["肉＋ご飯", "魚定食", "卵料理", "鶏むね肉料理", "野菜スープ"],
    convenience: ["おにぎり＋サラダチキン", "卵サンド＋牛乳", "焼き魚弁当", "ヨーグルト＋バナナ"],
    beforeAfter: "練習後は主食とたんぱく質をセットにして、翌日に疲れを残しにくくしましょう。",
    easyPlan: "夕食に肉・魚・卵・大豆製品のどれかを必ず1品入れましょう。",
    parentNote: "身体が大きくなった分、疲労回復も重要になります。"
  },
  "成熟安定期": {
    theme: "コンディション維持",
    why: "競技力を安定して発揮するために、食事・水分・睡眠のリズムを崩さないことが大切です。",
    nutrients: ["たんぱく質", "水分", "鉄", "ビタミン"],
    meals: ["魚定食", "肉野菜炒め＋ご飯", "卵料理", "具だくさん味噌汁", "鶏肉と野菜の丼"],
    convenience: ["おにぎり＋ゆで卵", "サラダチキン＋パン", "牛乳", "ヨーグルト", "野菜スープ"],
    beforeAfter: "練習量が多い日は主食を減らしすぎず、練習後に水分とたんぱく質を補いましょう。",
    easyPlan: "忙しい日は、主食＋たんぱく質＋水分の3点だけでもそろえましょう。",
    parentNote: "食事・睡眠・水分を安定させることが、競技パフォーマンス維持につながります。"
  }
};

// ===== 編集ポイント 2: 動画リンク =====
// url に YouTube URL または local mp4 パスを入れると、動画カードから開けます。
// PDFではリンク文字列とQR風コードを表示します。ローカルMP4を使う場合は videos/xxx.mp4 のように配置してください。
const videoLibrary = {
  "足関節可動性": { title: "足関節モビリティ", category: "選手向け", duration: "4:00", level: "かんたん", url: "videos/ankle-mobility.mp4" },
  "ジャンプ着地": { title: "ジャンプ着地トレーニング", category: "選手向け", duration: "5:30", level: "ふつう", url: "videos/landing-training.mp4" },
  "呼吸パターン": { title: "DNS呼吸エクササイズ", category: "選手向け", duration: "3:20", level: "かんたん", url: "videos/breathing.mp4" },
  "睡眠時間": { title: "成長期の睡眠ポイント", category: "保護者向け", duration: "4:30", level: "かんたん", url: "videos/sleep-point.mp4" },
  "水分摂取": { title: "水分補給セルフチェック", category: "選手向け", duration: "3:40", level: "かんたん", url: "videos/hydration-check.mp4" },
  "疲労回復感": { title: "クールダウン方法", category: "指導者向け", duration: "6:00", level: "ふつう", url: "videos/cooldown.mp4" },
  "股関節柔軟性": { title: "股関節ストレッチ", category: "選手向け", duration: "4:20", level: "かんたん", url: "videos/hip-stretch.mp4" },
  "片脚スクワット": { title: "片脚支持の安定トレーニング", category: "選手向け", duration: "5:00", level: "ふつう", url: "videos/single-leg.mp4" }
};

const stageSteps = ["成長前期", "成長加速期", "成長ピーク前", "成長ピーク期", "成長ピーク後", "成熟安定期"];

const form = document.getElementById("growthForm");
const inputTab = document.getElementById("inputTab");
const reportTab = document.getElementById("reportTab");
const inputScreen = document.getElementById("inputScreen");
const reportScreen = document.getElementById("reportScreen");
const emptyReport = document.getElementById("emptyReport");
const reportContent = document.getElementById("reportContent");
const csvUpload = document.getElementById("csvUpload");
const csvStatus = document.getElementById("csvStatus");
const emailText = document.getElementById("emailText");
const emailStatus = document.getElementById("emailStatus");

const groupKeys = ["injury", "movement", "nutrition"];
const allRatingItems = groupKeys.flatMap(groupKey => assessmentGroups[groupKey].items);
let importedCsvRows = [];
let currentReportRecord = null;
let currentReportSnapshot = null;
let currentChallengeMenus = [];
let editableAutoValues = {};
let editableOriginalValues = {};

function escapeText(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function todayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function criteriaMarkup(item, group) {
  const criteria = criteriaBank[item];
  return `
    <div class="help-wrap">
      <button type="button" class="help-button" aria-label="${item}の評価基準を見る" aria-expanded="false">?</button>
      <div class="criteria-popover" hidden>
        <h4>${item}</h4>
        <dl>
          <dt>3点：${SCORE_LABELS[3]}</dt>
          <dd>${criteria.good}</dd>
          <dt>2点：${SCORE_LABELS[2]}</dt>
          <dd>${criteria.caution}</dd>
          <dt>1点：${SCORE_LABELS[1]}</dt>
          <dd>${criteria.alert}</dd>
        </dl>
      </div>
    </div>
  `;
}

function createRatings() {
  Object.entries(assessmentGroups).forEach(([groupKey, group]) => {
    const root = document.querySelector(`[data-group="${groupKey}"]`);
    root.innerHTML = group.items.map((item, index) => {
      const name = `${groupKey}_${index}`;
      return `
        <div class="rating-row">
          <div class="rating-heading">
            <div class="rating-name">${item}</div>
            ${criteriaMarkup(item, group)}
          </div>
          <div class="rating-options" role="radiogroup" aria-label="${item}">
            <label>
              <input type="radio" name="${name}" value="3" data-item="${item}" data-label="${SCORE_LABELS[3]}" checked>
              <span>3 ${SCORE_LABELS[3]}</span>
            </label>
            <label>
              <input type="radio" name="${name}" value="2" data-item="${item}" data-label="${SCORE_LABELS[2]}">
              <span>2 ${SCORE_LABELS[2]}</span>
            </label>
            <label>
              <input type="radio" name="${name}" value="1" data-item="${item}" data-label="${SCORE_LABELS[1]}">
              <span>1 ${SCORE_LABELS[1]}</span>
            </label>
          </div>
        </div>
      `;
    }).join("");
  });
}

function showScreen(screen) {
  const isReport = screen === "report";
  inputScreen.classList.toggle("active", !isReport);
  reportScreen.classList.toggle("active", isReport);
  inputTab.classList.toggle("active", !isReport);
  reportTab.classList.toggle("active", isReport);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getFormValue(name, fallback = "未入力") {
  const value = new FormData(form).get(name);
  return value && String(value).trim() ? String(value).trim() : fallback;
}

function collectGroupResult(groupKey) {
  const group = assessmentGroups[groupKey];
  const values = group.items.map((item, index) => {
    const checked = form.querySelector(`input[name="${groupKey}_${index}"]:checked`);
    return {
      item,
      score: Number(checked.value),
      label: checked.dataset.label,
      groupTitle: group.title
    };
  });
  const average = values.reduce((sum, item) => sum + item.score, 0) / values.length;
  return {
    ...group.judgement(average),
    title: group.title,
    average,
    values
  };
}

function schoolCategory() {
  const grade = getFormValue("grade", "");
  const age = toNumber(getFormValue("age", "0"));
  if (grade.includes("小") || age <= 12) return "elementary";
  if (grade.includes("中") || age <= 15) return "junior";
  return "high";
}

function sleepThresholds() {
  const category = schoolCategory();
  if (category === "elementary") return { good: 9, caution: 8, alert: 7, label: "小学生" };
  if (category === "junior") return { good: 8, caution: 7, alert: 6, label: "中学生" };
  return { good: 7.5, caution: 6.5, alert: 6, label: "高校生" };
}

function assessSleep() {
  const hours = toNumber(getFormValue("averageSleepHours", "0"));
  const onset = getFormValue("sleepOnset", "スムーズ");
  const waking = getFormValue("nightWaking", "ほぼなし");
  const fatigue = getFormValue("morningFatigue", "すっきり");
  const thresholds = sleepThresholds();
  let score = 3;

  if (!hours) score = 2;
  else if (hours >= thresholds.good) score = 3;
  else if (hours >= thresholds.alert) score = 2;
  else score = 1;

  const qualityFlags = [onset === "かなり時間がかかる", waking === "多い", fatigue === "強く残る"].filter(Boolean).length;
  const mildFlags = [onset === "時間がかかる", waking === "時々", fatigue === "少し残る"].filter(Boolean).length;
  if (qualityFlags >= 1) score = Math.min(score, 2);
  if (qualityFlags >= 2 || (score === 2 && mildFlags >= 2)) score = 1;

  const label = SCORE_LABELS[score];
  const hourText = hours ? `${hours}時間` : "未入力";
  const shortageText = score <= 2
    ? "成長期の回復・集中力・ケガ予防のため、まずは睡眠時間の確保を優先しましょう。"
    : "年齢に応じた睡眠時間を確保できており、成長と回復を支える良い土台です。";

  return {
    item: "睡眠時間",
    score,
    label,
    tone: score === 3 ? "good" : score === 2 ? "caution" : "alert",
    hours,
    hourText,
    thresholdLabel: thresholds.label,
    bedtime: getFormValue("bedtime", "未入力"),
    wakeTime: getFormValue("wakeTime", "未入力"),
    onset,
    waking,
    fatigue,
    insufficient: score <= 2,
    summary: `${thresholds.label}の目安では、現在の平均睡眠時間は${hourText}で「${label}」です。${shortageText}`
  };
}

function assessHydration() {
  const weight = toNumber(getFormValue("weight", "0"));
  const daily = toNumber(getFormValue("dailyWaterMl", "0"));
  const practice = toNumber(getFormValue("practiceWaterMl", "0"));
  const post = toNumber(getFormValue("postPracticeWaterMl", "0"));
  const hydrationSense = getFormValue("hydrationSense", "十分");
  const practiceHydration = getFormValue("practiceHydration", "できている");
  const urineColor = getFormValue("urineColor", "薄い");
  const heatPractice = getFormValue("heatPractice", "なし");
  const minTarget = Math.round(weight * 30);
  const maxTarget = Math.round(weight * 40);
  const practiceTotal = practice + post;
  let score = 3;

  if (hydrationSense === "かなり少ない" || practiceHydration === "不足しやすい") score = 1;
  else if (hydrationSense === "少ない" || practiceHydration === "時々不足") score = 2;
  else if (daily) {
    if (daily < minTarget || practiceTotal < 500 || urineColor === "濃い") score = 1;
    else if (daily < maxTarget || practiceTotal < 700 || urineColor === "やや濃い" || heatPractice === "あり") score = 2;
  }

  const heatNote = heatPractice === "あり" ? "暑熱環境では、発汗量に応じてさらに追加補給を検討しましょう。" : "";
  return {
    item: "水分摂取",
    score,
    label: SCORE_LABELS[score],
    tone: score === 3 ? "good" : score === 2 ? "caution" : "alert",
    daily,
    practice,
    post,
    minTarget,
    maxTarget,
    hydrationSense,
    practiceHydration,
    urineColor,
    heatPractice,
    insufficient: score <= 2,
    summary: weight
      ? `現在の体重から見ると、1日の水分目安は約${minTarget}〜${maxTarget}mlです。練習がある日は、これに加えて500〜1000mlを目安に補給しましょう。${heatNote}`.trim()
      : "体重を入力すると、1日の水分目安を自動表示できます。"
  };
}

function heightChangeSummary() {
  const six = getFormValue("heightChange6m", "");
  const twelve = getFormValue("heightChange12m", "");
  if (six && twelve) return `6ヶ月 +${six}cm / 1年 +${twelve}cm`;
  if (six) return `6ヶ月 +${six}cm`;
  if (twelve) return `1年 +${twelve}cm`;
  return "未入力";
}

function normalizeGrowthStage(growthPhase, peakEstimate) {
  if (growthPhase === "成長前期" || peakEstimate === "3年以上") return "成長前期";
  if (growthPhase === "伸び始め" || peakEstimate === "約2年") return "成長加速期";
  if (peakEstimate === "約1年") return "成長ピーク前";
  if (growthPhase === "急成長期" || peakEstimate === "ピーク中") return "成長ピーク期";
  if (growthPhase === "成長後期") return "成長ピーク後";
  return "成熟安定期";
}

function stagePlainMessage(stage) {
  const messages = {
    "成長前期": "今は基本動作と生活リズムをつくる時期です。",
    "成長加速期": "これから身体が大きく変わり始める準備期です。",
    "成長ピーク前": "身長変化が大きくなる前に、動き方と回復習慣を整えたい時期です。",
    "成長ピーク期": "身体の変化が大きく、痛みや疲れのサインを見逃したくない時期です。",
    "成長ピーク後": "身体づくりを競技動作へつなげやすい時期です。",
    "成熟安定期": "強度の高い練習に向け、良い状態を維持・強化する時期です。"
  };
  return messages[stage] || messages["成長加速期"];
}

function conditionSummary(results) {
  const injury = results[0];
  const behaviorAverage = (results[1].average + results[2].average) / 2;
  let behavior;
  if (behaviorAverage >= 2.5) behavior = { text: "継続できている", tone: "good" };
  else if (behaviorAverage >= 1.8) behavior = { text: SCORE_LABELS[2], tone: "caution" };
  else behavior = { text: SCORE_LABELS[1], tone: "alert" };
  return { injury, behavior };
}

function priorityItems(results, limit = 3, extraItems = []) {
  return [...results.flatMap(result => result.values), ...extraItems]
    .filter(item => item.score <= 2)
    .sort((a, b) => a.score - b.score)
    .slice(0, limit);
}

function priorityThemes(results, extraItems = []) {
  const labels = priorityItems(results, 3, extraItems).map(item => item.item);
  if (labels.length > 0) return labels.join("・");
  return "良い状態の維持・成長記録・回復習慣";
}

function stageMessage(peakEstimate, growthPhase) {
  const messages = {
    "3年以上": "成長ピークまで3年以上。今は基本動作と生活リズムの土台づくりが大切な時期です。",
    "約2年": "成長ピークまで約2年。これから身体が大きく変わる時期です。",
    "約1年": "成長ピークまで約1年。急な身長変化に合わせて、動作と回復を丁寧に整えたい時期です。",
    "ピーク中": "現在は成長ピーク中。身体の変化が大きく、痛みや疲労のサインを見逃さないことが重要です。",
    "成長後": "成長ピークを越えた段階です。競技力につながる身体づくりへ移行しやすい時期です。"
  };
  return messages[peakEstimate] || `${growthPhase}です。成長段階に合わせた負荷調整と身体づくりを進めましょう。`;
}

function conclusionComment(results, stage, nextCheck, extraItems = []) {
  const priorities = priorityThemes(results, extraItems);
  const injury = results[0];
  if (injury.tone === "good") {
    return `今は大きな問題は少なく、${stage}に合わせて良い土台を保つ時期です。優先テーマは「${priorities}」。次回は${nextCheck}を目安に変化を確認しましょう。`;
  }
  if (injury.tone === "alert") {
    return `今は優先して確認したい項目があります。${stage}の身体変化に合わせて「${priorities}」を整え、安心して競技を続けられる状態を作りましょう。`;
  }
  return `今は大きな問題に進む前の要チェック段階です。${stage}に向けて「${priorities}」を今日から少しずつ確認することが、次の成長を支えます。`;
}

function buildFeatures(results) {
  const allItems = results.flatMap(result => result.values);
  const priority = allItems
    .filter(item => item.score <= 2)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  if (priority.length === 0) {
    return ["大きな注意項目は少なく、今の良い状態を続けることが今回のポイントです。"];
  }

  return priority.map(item => `「${item.item}」は${item.label}です。痛みが出る前に整えると、成長期の負担を減らしやすくなります。`);
}

function buildStrengths(results) {
  const strongItems = results
    .flatMap(result => result.values)
    .filter(item => item.score === 3)
    .slice(0, 3);

  if (strongItems.length === 0) {
    return ["今の評価は伸びしろの確認が中心です。整えるポイントが明確になったこと自体が大きな収穫です。"];
  }

  return strongItems.map(item => `「${item.item}」は${SCORE_LABELS[3]}です。今後の成長を支える強みとして続けていきましょう。`);
}

function buildReasonText(results, growthPhase, peakEstimate) {
  const weakItems = results.flatMap(result => result.values).filter(item => item.score <= 2);
  const alertCount = weakItems.filter(item => item.score === 1).length;
  const mainWeak = weakItems[0];

  if (growthPhase === "急成長期" || peakEstimate === "ピーク中") {
    return "身長が伸びる時期は、身体のサイズに動き方が追いつきにくくなります。膝・踵・腰の違和感や疲れやすさを早めに見つけ、練習を続けやすい状態を作ることが大切です。";
  }

  if (alertCount >= 2) {
    return "個別サポート推奨の項目が複数あります。練習量、痛み、身体の使い方を整理し、家庭と現場で同じポイントを見ていくことが安心につながります。";
  }

  if (mainWeak) {
    return `今回の評価では「${mainWeak.item}」が要チェックです。小さな崩れの段階で確認すると、成長期の痛みを防ぎながら競技を続けやすくなります。`;
  }

  return "現時点では大きな注意項目は少ない状態です。ただし成長期は数ヶ月で身体のサイズや感覚が変わるため、良い状態を保つ目的で定期的に確認していくことが安心につながります。";
}

function buildActions(features, results, growthPhase, extraItems = []) {
  const weakItems = [...results.flatMap(result => result.values), ...extraItems]
    .filter(item => item.score <= 2)
    .sort((a, b) => a.score - b.score);
  const actions = [];

  weakItems.forEach(item => {
    if (actions.length < 3 && recommendationBank[item.item]) {
      actions.push(recommendationBank[item.item]);
    }
  });

  if (actions.length < 3 && (growthPhase === "急成長期" || growthPhase === "伸び始め")) {
    actions.push("身長変化が大きい時期は、痛みが出る前の違和感や疲労感を家庭でも共有しましょう。");
  }

  const defaults = [
    "良い評価の項目も、練習前後のウォームアップとクールダウンで維持しましょう。",
    "月ごとの身長・体重・痛みの有無を記録し、成長変化を見える化しましょう。",
    "練習・食事・睡眠のリズムを大きく崩さず、継続しやすい習慣に整えましょう。"
  ];

  defaults.forEach(item => {
    if (actions.length < 3) actions.push(item);
  });

  return actions.slice(0, 3);
}

function staffGuide(results, growthPhase) {
  const lowest = [...results].sort((a, b) => a.average - b.average)[0];
  const alertCount = results.flatMap(result => result.values).filter(item => item.score === 1).length;
  const firstLine = `${growthPhase}の身体変化と、今回いちばん優先したい${lowest.title}を結びつけて説明してください。`;
  const secondLine = alertCount > 0
    ? "不安をあおらず、「今なら確認できるサイン」として個別サポート推奨項目を伝えてください。"
    : "良い土台を認めたうえで、継続確認の価値を伝えてください。";
  const thirdLine = "最後は家庭でできる1つの行動と、次回チェック時期を具体的に案内してください。";
  return `${firstLine}\n${secondLine}\n${thirdLine}`;
}

function parentComment(results, growthPhase, peakEstimate, sleep = null, hydration = null) {
  const alertCount = results.flatMap(result => result.values).filter(item => item.score === 1).length;
  const cautionCount = results.flatMap(result => result.values).filter(item => item.score === 2).length;
  const extraNotes = [];
  if (sleep?.insufficient) {
    extraNotes.push("成長期の回復・集中力・ケガ予防のため、まずは睡眠時間の確保を優先しましょう。");
  }
  if (hydration?.insufficient) {
    extraNotes.push("水分は疲労感や集中力にも関わるため、起床後・練習前・練習中・練習後に分けて確認しましょう。");
  }
  const suffix = extraNotes.length ? ` ${extraNotes.join(" ")}` : "";

  if (alertCount >= 3 || growthPhase === "急成長期") {
    return `今は身体が変わりやすく、普段できていた動きでも負担が増えることがあります。今回見つかったポイントは、早めに整えれば競技を続ける力につながるサインです。痛みや疲れの変化を家庭でも見ながら、無理なく続けられる環境を一緒に作っていきましょう。${suffix}`;
  }

  if (cautionCount > 0 || peakEstimate === "約1年" || peakEstimate === "ピーク中") {
    return `大きな問題は少ない一方で、今のうちに整えておきたいポイントがあります。成長に合わせて身体の使い方や回復習慣を整えることで、痛みの予防だけでなく競技で力を出しやすい状態につながります。まずは今日からできる小さな行動を続けていきましょう。${suffix}`;
  }

  return `現在は比較的安定した評価です。成長期の身体はこれからも変化するため、良い状態を保ちながら、身長・体重・痛み・疲れの変化を定期的に確認していきましょう。今の土台を大事にすることが、次の成長段階の安心につながります。${suffix}`;
}

function nextCheckTiming(results, growthPhase, extraItems = []) {
  const managedCount = results.flatMap(result => result.values).filter(item => item.score === 1).length;
  const extraAlert = extraItems.filter(item => item.score === 1).length;
  if (growthPhase === "急成長期" || managedCount + extraAlert >= 3) {
    return "2〜3ヶ月後の再チェックをおすすめします。";
  }
  return "通常は3〜4ヶ月後の再チェックをおすすめします。";
}

function joynityComment(results, sleep = null, hydration = null) {
  const lowest = [...results].sort((a, b) => a.average - b.average)[0];
  const best = [...results].sort((a, b) => b.average - a.average)[0];
  const extra = [sleep, hydration].filter(item => item && item.score <= 2).map(item => item.item);

  if (lowest.tone === "good") {
    return `障害予防・身体の使い方・栄養回復の3領域は全体として安定しています。${extra.length ? `一方で、${extra.join("と")}は今整えると良いポイントです。` : ""}今後は成長段階の変化に合わせて、現在の良い習慣を維持しながら競技動作の質を高めていきましょう。`;
  }

  return `今回の評価では、特に${lowest.title}の領域を優先して整えることがポイントです。${extra.length ? `${extra.join("と")}も次回までに確認したい回復習慣です。` : ""}一方で${best.title}には良い土台も見られます。Joynityでは、医師評価で確認した成長ステージを踏まえながら、障害予防・身体機能・栄養回復をつなげてサポートしていきます。`;
}

function generateDoctorCommentText(results, sleep, hydration) {
  const maturityType = getFormValue("maturityType", "未入力");
  const growthPhase = getFormValue("growthPhase", "未入力");
  const peakEstimate = getFormValue("peakEstimate", "未入力");
  const echo = getFormValue("doctorComment", "");
  const pain = getFormValue("painArea", "なし");
  const historyScore = results[0].values.find(item => item.item === "既往歴")?.score || 3;
  const doctorCaution = getFormValue("doctorCaution", "");
  const painText = pain && pain !== "なし" && pain !== "未入力"
    ? `現在は「${pain}」の痛みがあるため、練習量や痛みの変化を継続して確認してください。`
    : "現在大きな痛みがない場合でも、練習量・睡眠・栄養・身体の使い方を定期的に確認していくことが大切です。";
  const historyText = historyScore <= 2 ? "既往歴の評価から、過去に痛めた部位の再発予防にも配慮が必要です。" : "";
  const cautionText = doctorCaution && doctorCaution !== "未入力" ? `医師からの注意点として「${doctorCaution}」を共有します。` : "";
  const echoText = echo && echo !== "未入力" ? `骨端線エコー所見では「${echo}」と確認されています。` : "骨端線エコー評価では、現在の成長段階を踏まえた経過確認が必要です。";
  return `${echoText} 成熟タイプは${maturityType}、成長フェーズは${growthPhase}、成長ピーク目安は${peakEstimate}です。今後、身長の伸びや身体のサイズ変化に伴い、関節や筋肉への負担が変化しやすい時期です。${painText}${historyText ? ` ${historyText}` : ""}${cautionText ? ` ${cautionText}` : ""}`;
}

function generateJoynityCommentText(results, sleep, hydration) {
  const priority = priorityItems(results, 5, [sleep, hydration]).map(item => item.item);
  const alert = priorityItems(results, 5, [sleep, hydration]).filter(item => item.score === 1).map(item => item.item);
  const pain = getFormValue("painArea", "なし");
  const base = joynityComment(results, sleep, hydration);
  const painText = pain && pain !== "なし" && pain !== "未入力"
    ? `痛みがある部位（${pain}）は、練習前後で変化を確認しながら進めましょう。`
    : "現時点で強い痛みがない場合も、違和感を早めに共有することが安心につながります。";
  const priorityText = priority.length
    ? `今整えると良いポイントは、${priority.join("、")}です。${alert.length ? `特に${alert.join("、")}は優先してサポートします。` : ""}`
    : "現在は大きな注意項目が少なく、良い状態の維持がテーマです。";
  return `${base} ${priorityText} 成長期は身体のサイズや重心位置が変化しやすいため、着地・片脚支持・回復習慣を整えておくことで、ケガ予防とパフォーマンス向上につながります。${painText}`;
}

function overallVerdict(results) {
  const allScores = results.flatMap(result => result.values).map(item => item.score);
  const average = results.reduce((sum, result) => sum + result.average, 0) / results.length;
  const alertCount = allScores.filter(score => score === 1).length;

  if (average >= 2.65 && alertCount === 0) {
    return {
      text: "非常に良好",
      tone: "good",
      lead: "成長期の身体変化に対して、障害予防・動作・回復の土台がよく整っています。現状維持だけでなく、次の成長段階に向けた競技力づくりへ進める状態です。"
    };
  }

  if (average < 1.8 || alertCount >= 3) {
    return {
      text: SCORE_LABELS[1],
      tone: "alert",
      lead: "成長による身体変化と競技負荷が重なり、痛みや疲労につながりやすいサインがあります。練習を続けるためにも、優先順位を決めて早めに整えることが大切です。"
    };
  }

  return {
      text: SCORE_LABELS[2],
    tone: "caution",
      lead: "大きな問題に進む前に確認・調整しておきたい項目が見られます。今の段階で身体の使い方・休養・栄養を見直すことで、成長期の障害予防とパフォーマンス向上につなげられます。"
  };
}

function growthBodyComment(growthPhase, peakEstimate, maturityType) {
  if (growthPhase === "急成長期" || peakEstimate === "ピーク中") {
    return `現在は身長変化が大きく、骨の伸びに筋肉・腱・動作感覚が追いつきにくい時期です。${maturityType}タイプの特徴も踏まえ、膝・踵・腰など成長期に負担が集まりやすい部位を定期的に確認する必要があります。`;
  }

  if (growthPhase === "伸び始め" || peakEstimate === "約1年" || peakEstimate === "約2年") {
    return `これから身体のサイズと重心位置が変わり始める時期です。今のうちに片脚支持、着地、切り返し、睡眠・補食の土台を整えることで、急成長期に入った時の負担を抑えやすくなります。`;
  }

  if (growthPhase === "成長後" || peakEstimate === "成長後") {
    return "成長ピークを越え、身体づくりを競技動作へ反映しやすい時期です。可動域・体幹・栄養回復の安定を確認しながら、強度の高い練習に耐えられる準備を進めます。";
  }

  return "成長期前半として、基本動作と生活リズムを整える価値が高い段階です。大きな負荷を急に増やすより、良い姿勢・柔軟性・回復習慣を積み上げることが将来の障害予防につながります。";
}

function domainReview(result) {
  const weak = result.values.filter(item => item.score <= 2).map(item => item.item).slice(0, 2);
  if (result.tone === "good") {
    return `${result.shortTitle || result.title}は土台良好です。現在は大きな注意項目は少なく、練習を支える身体の土台は比較的安定しています。今後は成長に伴う身体の変化に合わせて、良い状態を維持していくことが大切です。`;
  }

  if (result.tone === "alert") {
    return `${result.shortTitle || result.title}は${SCORE_LABELS[1]}です。現在、優先して確認したい項目があります。${weak.join("、") || "複数項目"}を中心に、練習量・痛み・身体の使い方を整理し、必要に応じて医師評価やJoynityでの個別サポートにつなげます。`;
  }

  return `${result.shortTitle || result.title}は${SCORE_LABELS[2]}です。一部に確認・調整しておきたいポイントがあります。${weak.join("、") || "一部項目"}を今の段階で見直すことで、成長期の負担を減らしやすくなります。`;
}

function domainMeaning(result) {
  const title = result.shortTitle || result.title;
  const weak = result.values.filter(item => item.score <= 2).map(item => item.item).slice(0, 3);
  const joinedWeak = weak.join("、") || "現在の良い状態";
  const byDomain = {
    "障害予防": {
      good: ["痛みを防ぐ土台は安定しています。", "練習量や成長による身体の変化に対して、今は大きな負担サインは少ない状態です。", "状態確認を空けすぎると、成長や練習量の変化に気づきにくくなることがあります。", "今のケアを続け、痛み・疲労・練習量の変化を定期的に確認しましょう。"],
      caution: ["痛みが出る前に、負担がかかりやすい動きを確認したい状態です。", "練習量や成長による身体の変化に対して、一部確認しておきたい項目があります。", "膝・かかと・腰などに疲労や違和感が出やすくなる可能性があります。", "片脚動作・着地・切り返し動作を確認し、練習前後のケアを整えましょう。"],
      alert: ["個別に確認しながら、安心して競技を続ける準備をしたい状態です。", `${joinedWeak}を中心に、痛みや負担につながる可能性を丁寧に見たい状態です。`, "練習を続ける中で痛みが長引いたり、同じ部位に負担が集まりやすくなることがあります。", "練習量・痛みの出方・動作を整理し、必要に応じて医師評価や個別サポートにつなげましょう。"]
    },
    "身体の使い方": {
      good: ["動きの土台は安定しています。", "走る・跳ぶ・止まる動作を支える基本機能は良い状態です。", "成長によって重心や手足の長さが変わると、今の動きが少し崩れることがあります。", "足首・股関節・体幹の準備運動を続け、良い動きを維持しましょう。"],
      caution: ["成長期に合わせて、動き方を確認したい状態です。", `${joinedWeak}に確認しておきたいポイントがあります。`, "着地や切り返しで一部に負担が集まり、違和感につながることがあります。", "練習前に足首・股関節・片脚支持を短時間で確認しましょう。"],
      alert: ["個別に動きを見ながらサポートしたい状態です。", `${joinedWeak}を優先して確認したい状態です。`, "フォームの崩れが続くと、膝・腰・足首に負担が集まりやすくなります。", "基本動作から見直し、できる範囲のメニューで安定性を高めましょう。"]
    },
    "栄養・生活": {
      good: ["回復を支える生活習慣は継続できています。", "食事・水分・睡眠の土台が比較的安定しています。", "練習量や成長量が増えると、必要な食事量や睡眠時間も変わります。", "今の良い習慣を続けながら、身長・体重・疲労感を確認しましょう。"],
      caution: ["成長と練習を支える生活習慣を確認したい状態です。", `${joinedWeak}に見直したいポイントがあります。`, "エネルギー不足や回復不足が続くと、疲労感や集中力低下につながりやすくなります。", "朝食・補食・水分・睡眠のうち、続けやすい1つから整えましょう。"],
      alert: ["回復習慣を個別にサポートしたい状態です。", `${joinedWeak}を優先して見直したい状態です。`, "疲労が抜けにくくなり、練習の質やケガ予防に影響する可能性があります。", "家庭でできる食事・補食・睡眠のルールを一緒に決めましょう。"]
    }
  };
  const lines = byDomain[title]?.[result.tone] || byDomain["栄養・生活"][result.tone];
  return {
    label: result.text,
    oneLine: lines[0],
    state: lines[1],
    risk: lines[2],
    next: lines[3],
    description: SCORE_DESCRIPTIONS[result.tone === "good" ? 3 : result.tone === "caution" ? 2 : 1]
  };
}

function proposalContent(results, actions) {
  const lowest = [...results].sort((a, b) => a.average - b.average)[0];
  return `次回までの重点テーマは「${lowest.title}」です。${actions[0]} そのうえで、評価基準に沿って動作・疲労・栄養の変化を3〜4ヶ月単位で確認し、医師評価とJoynity評価をつなげて改善計画を更新します。`;
}

function nutritionAdvice(stage, results, sleep, hydration) {
  const base = nutritionStageAdvice[stage] || nutritionStageAdvice["成長加速期"];
  const nutrition = results[2];
  const findScore = itemName => nutrition.values.find(item => item.item === itemName)?.score || 3;
  const additions = [];
  const support = [];
  if (findScore("朝食習慣") <= 2) {
    additions.push("朝食は、バナナ＋牛乳だけでもOKです。まずは“ゼロにしない”ことから始めましょう。");
    support.push("朝食で主食を食べる", "牛乳・ヨーグルトを追加");
  }
  if (findScore("練習後の補食") <= 2) {
    additions.push("練習後は、おにぎり・牛乳・ヨーグルトなど“すぐ食べられるもの”を準備しておくと継続しやすくなります。");
    support.push("練習後におにぎりを追加", "練習後30分以内に補食");
  }
  if (findScore("水分摂取") <= 2 || hydration.score <= 2) {
    additions.push("水筒の量を固定し、“何本飲めたか”を見える化すると習慣化しやすくなります。");
    support.push("水筒を1本増やす");
  }
  if (findScore("睡眠時間") <= 2 || sleep.score <= 2) {
    additions.push("夕食後のスマホ時間を15分減らすだけでも、睡眠時間改善につながります。");
    support.push("寝る30分前にスマホをやめる");
  }
  if (findScore("疲労回復感") <= 2) {
    additions.push("疲労感が強い時は、“食べる・寝る・休む”を優先しましょう。");
  }

  const weakFood = nutrition.values.filter(item => item.score <= 2).map(item => item.item);
  const supportList = [...new Set([...support, "牛乳・ヨーグルトを追加", "練習後30分以内に補食"])].slice(0, 6);
  return {
    theme: base.theme,
    comment: `${base.why}${additions.length ? ` ${additions.join(" ")}` : ""}`,
    nutrients: base.nutrients,
    meals: base.meals,
    convenience: base.convenience,
    timing: base.beforeAfter,
    scoreLabel: `${nutrition.text}（平均 ${nutrition.average.toFixed(1)}）`,
    priorityFoodHabit: weakFood.includes("朝食習慣") ? "朝食はバナナ＋牛乳だけでもOK。まずはゼロにしないことから始めましょう。" : weakFood[0] ? `${weakFood[0]}を、買いやすい食品から1つ足しましょう。` : base.easyPlan,
    snack: weakFood.includes("練習後の補食") ? "おにぎり、牛乳、ヨーグルト、バナナなど、持ち運びやすい補食から始めましょう。" : "練習後30〜60分以内に糖質とたんぱく質を補えると理想的です。",
    hydration: hydration.minTarget ? `1日 ${hydration.minTarget}〜${hydration.maxTarget}ml + 練習日は500〜1000mlを目安にしましょう。` : "体重を入力すると水分目安を表示できます。",
    sleep: sleep.hours ? `${sleep.thresholdLabel}の目安では現在${sleep.hourText}です。${sleep.score <= 2 ? "就寝時間を15〜30分早めることから始めましょう。" : "現在の睡眠リズムを維持しましょう。"}` : "平均睡眠時間を入力すると睡眠目安を表示できます。",
    parentNote: base.parentNote,
    supportList
  };
}

function listMarkup(items) {
  return items.map(item => `<li>${escapeText(item)}</li>`).join("");
}

function renderFoodSupportChecklist(items) {
  return items.map(item => `<div class="support-check-item"><span>□</span><p>${escapeText(item)}</p></div>`).join("");
}

function renderQrLinks(videos) {
  const firstVideo = videos[0]?.video?.url || "videos/ankle-mobility.mp4";
  const links = [
    ["改善動画", firstVideo],
    ["LINE相談", "https://line.me/R/ti/p/@joynity"],
    ["次回予約", "https://joynity.jp/reserve"],
    ["Instagram", "https://www.instagram.com/joynity/"]
  ];
  return links.map(([label, url]) => `
    <div class="qr-link-card">
      <div class="qr-box" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <strong>${escapeText(label)}</strong>
      <span>${escapeText(url)}</span>
    </div>
  `).join("");
}

function getMissionInputs(actions) {
  return [1, 2, 3].map((number, index) => {
    const text = getFormValue(`mission${number}`, actions[index] || "");
    return {
      text,
      freq: getFormValue(`mission${number}Freq`, number === 3 ? "月1回" : "練習日"),
      level: getFormValue(`mission${number}Level`, index === 1 ? "ふつう" : "かんたん"),
      target: getFormValue(`mission${number}Target`, number === 3 ? "保護者" : "本人")
    };
  }).filter(mission => mission.text);
}

function routineAdvice(results, missions) {
  const weak = priorityItems(results, 3).map(item => item.item);
  return {
    before: weak.some(item => ["足関節可動性", "股関節柔軟性", "ジャンプ着地", "片脚スクワット"].includes(item))
      ? "足首・股関節を動かしてから、片脚でまっすぐ立つ確認を行いましょう。"
      : "軽いジョグと動的ストレッチで、身体を温めてから練習に入りましょう。",
    after: weak.some(item => ["疲労回復感", "睡眠時間", "練習後の補食"].includes(item))
      ? "補食・水分・クールダウンをセットにして、疲れを翌日に残しにくくしましょう。"
      : "練習後はふくらはぎ・太ももを軽くケアし、痛みの有無を確認しましょう。",
    home: "身長・体重・痛み・疲れやすさを短く記録し、いつもと違う変化がないか見てください。",
    next: missions.map(mission => mission.text).slice(0, 2).join(" / ") || "身長・体重・痛みの有無を月1回確認しましょう。"
  };
}

function renderStageTimeline(stage) {
  return stageSteps.map(step => `
    <div class="timeline-step ${step === stage ? "active" : ""}">
      <span>${step}</span>
      ${step === stage ? "<strong>今はここです</strong>" : ""}
    </div>
  `).join("");
}

function renderMissionCards(missions) {
  return missions.map((mission, index) => `
    <div class="mission-card">
      <span>ミッション${index + 1}</span>
      <h4>${escapeText(mission.text)}</h4>
      <div class="mission-tags">
        <em>${escapeText(mission.freq)}</em>
        <em>${escapeText(mission.level)}</em>
        <em>${escapeText(mission.target)}</em>
      </div>
    </div>
  `).join("");
}

function menuFromItem(item) {
  const template = menuTemplateBank[item.item] || {
    name: `${item.item}サポート`,
    purpose: recommendationBank[item.item] || "次回までに状態を整える",
    frequency: "週3回",
    duration: "5分",
    target: "本人"
  };
  return {
    sourceItem: item.item,
    score: item.score,
    name: template.name,
    purpose: template.purpose,
    frequency: template.frequency,
    duration: template.duration,
    target: template.target,
    videoUrl: videoLibrary[item.item]?.url || ""
  };
}

function buildChallengeMenus(results, sleep, hydration) {
  const pain = getFormValue("painArea", "なし");
  const extraItems = [sleep, hydration].filter(Boolean);
  const sourceItems = priorityItems(results, 5, extraItems);
  const menus = sourceItems.map(menuFromItem);

  if (pain && pain !== "なし" && pain !== "未入力" && menus.length < 5) {
    menus.push({
      sourceItem: "現在の痛み",
      score: 1,
      name: "痛みチェック記録",
      purpose: "痛みの部位・強さ・出るタイミングを共有し、練習負荷を調整しやすくする",
      frequency: "練習日",
      duration: "1分",
      target: "本人・保護者",
      videoUrl: ""
    });
  }

  if (menus.length === 0) {
    menus.push({
      sourceItem: "良い状態の維持",
      score: 3,
      name: "月1回の成長記録",
      purpose: "身長・体重・痛みの有無を確認し、成長に合わせた変化を見える化する",
      frequency: "月1回",
      duration: "3分",
      target: "本人・保護者",
      videoUrl: ""
    });
  }

  return menus.slice(0, 5);
}

function renderChallengeMenuEditor(menus) {
  const list = document.getElementById("challengeMenuList");
  list.innerHTML = menus.map((menu, index) => `
    <article class="challenge-menu-card" data-index="${index}">
      <div class="challenge-card-head">
        <span>メニュー${index + 1}</span>
        <button type="button" class="delete-menu-button" data-delete-menu="${index}">削除</button>
      </div>
      <label>メニュー名<input data-menu-field="name" value="${escapeText(menu.name)}"></label>
      <label>目的<textarea data-menu-field="purpose" rows="3">${escapeText(menu.purpose)}</textarea></label>
      <div class="mini-selects">
        <label>頻度<input data-menu-field="frequency" value="${escapeText(menu.frequency)}"></label>
        <label>所要時間<input data-menu-field="duration" value="${escapeText(menu.duration)}"></label>
        <label>対象者<input data-menu-field="target" value="${escapeText(menu.target)}"></label>
      </div>
      <label>動画リンク<input data-menu-field="videoUrl" value="${escapeText(menu.videoUrl)}" placeholder="YouTube URL または videos/xxx.mp4"></label>
      <p class="menu-source">${escapeText(menu.sourceItem || "手動追加")} / ${escapeText(SCORE_LABELS[menu.score] || "スタッフ設定")}</p>
    </article>
  `).join("");
}

function readEditableElement(element) {
  if (!element) return "";
  if (element.tagName === "UL" || element.tagName === "OL") {
    return [...element.children].map(child => child.textContent.trim()).filter(Boolean).join("\n");
  }
  return element.textContent.trim();
}

function writeEditableElement(element, text) {
  if (!element) return;
  const lines = String(text || "").split("\n").map(line => line.trim()).filter(Boolean);
  if (element.tagName === "UL") {
    element.innerHTML = lines.map(line => `<li>${escapeText(line)}</li>`).join("");
    return;
  }
  if (element.tagName === "OL") {
    element.innerHTML = lines.map(line => `<li>${escapeText(line)}</li>`).join("");
    return;
  }
  element.textContent = text;
}

function editableDefinitions() {
  return [
    { key: "conclusion", label: "今回の結論", selector: "#stageMessage" },
    { key: "growthFeature", label: "Growth Feature", selector: "#growthBodyComment" },
    { key: "reason", label: "今注意すべき理由", selector: "#reasonText" },
    { key: "strengths", label: "現在の強み", selector: "#strengthList" },
    { key: "overallLead", label: "総合判定コメント", selector: "#overallLead" },
    { key: "parentComment", label: "保護者向けコメント", selector: "#parentComment" },
    { key: "actions", label: "今やるべき3つ", selector: "#actionList" },
    { key: "proposal", label: "次回チェック提案", selector: "#proposalContent" },
    { key: "nutritionAdvice", label: "栄養指導コメント", selector: "#nutritionAdviceComment" }
  ];
}

function closestEditableCard(element) {
  return element.closest(".report-section, .report-block, .focus-card, .summary-box, .report-hero, .hero-verdict");
}

function enterEditMode(definition) {
  const element = document.querySelector(definition.selector);
  const card = closestEditableCard(element);
  if (!element || !card || card.classList.contains("editing-card")) return;
  const currentText = readEditableElement(element);
  editableOriginalValues[definition.key] = currentText;
  card.classList.add("editing-card");
  element.hidden = true;
  const editor = document.createElement("textarea");
  editor.className = "inline-edit-textarea";
  editor.dataset.editEditor = definition.key;
  editor.value = currentText;
  element.after(editor);
  card.querySelector(`[data-edit-start="${definition.key}"]`).hidden = true;
  card.querySelector(`[data-edit-save="${definition.key}"]`).hidden = false;
  card.querySelector(`[data-edit-cancel="${definition.key}"]`).hidden = false;
}

function saveEditMode(definition) {
  const element = document.querySelector(definition.selector);
  const card = closestEditableCard(element);
  const editor = card?.querySelector(`[data-edit-editor="${definition.key}"]`);
  if (!element || !card || !editor) return;
  writeEditableElement(element, editor.value);
  editor.remove();
  element.hidden = false;
  card.classList.remove("editing-card");
  card.querySelector(`[data-edit-start="${definition.key}"]`).hidden = false;
  card.querySelector(`[data-edit-save="${definition.key}"]`).hidden = true;
  card.querySelector(`[data-edit-cancel="${definition.key}"]`).hidden = true;
  syncGeneratedReportEdits();
}

function cancelEditMode(definition) {
  const element = document.querySelector(definition.selector);
  const card = closestEditableCard(element);
  const editor = card?.querySelector(`[data-edit-editor="${definition.key}"]`);
  if (!element || !card || !editor) return;
  writeEditableElement(element, editableOriginalValues[definition.key] || "");
  editor.remove();
  element.hidden = false;
  card.classList.remove("editing-card");
  card.querySelector(`[data-edit-start="${definition.key}"]`).hidden = false;
  card.querySelector(`[data-edit-save="${definition.key}"]`).hidden = true;
  card.querySelector(`[data-edit-cancel="${definition.key}"]`).hidden = true;
}

function resetEditableToAuto(definition) {
  if (!window.confirm("自動生成された内容に戻しますか？現在の編集内容は上書きされます。")) return;
  const element = document.querySelector(definition.selector);
  writeEditableElement(element, editableAutoValues[definition.key] || "");
  syncGeneratedReportEdits();
}

function setupInlineEditors() {
  editableDefinitions().forEach(definition => {
    const element = document.querySelector(definition.selector);
    const card = closestEditableCard(element);
    if (!element || !card || card.querySelector(`[data-edit-card="${definition.key}"]`)) return;
    card.classList.add("editable-card");
    const actions = document.createElement("div");
    actions.className = "edit-card-actions";
    actions.dataset.editCard = definition.key;
    actions.innerHTML = `
      <button type="button" data-edit-start="${definition.key}">編集</button>
      <button type="button" data-edit-save="${definition.key}" hidden>保存</button>
      <button type="button" data-edit-cancel="${definition.key}" hidden>キャンセル</button>
      <button type="button" data-edit-reset="${definition.key}">自動生成に戻す</button>
    `;
    card.prepend(actions);
  });
}

function syncChallengeMenusFromDom() {
  currentChallengeMenus = [...document.querySelectorAll(".challenge-menu-card")].map(card => {
    const index = Number(card.dataset.index);
    const original = currentChallengeMenus[index] || {};
    const field = name => card.querySelector(`[data-menu-field="${name}"]`)?.value.trim() || "";
    return {
      ...original,
      name: field("name"),
      purpose: field("purpose"),
      frequency: field("frequency"),
      duration: field("duration"),
      target: field("target"),
      videoUrl: field("videoUrl")
    };
  });
}

function selectedVideos(results, extraItems = []) {
  const targets = priorityItems(results, 4, extraItems).map(item => item.item);
  const fallback = ["足関節可動性", "ジャンプ着地", "呼吸パターン", "睡眠時間"];
  return [...new Set([...targets, ...fallback])]
    .map(item => ({ item, video: videoLibrary[item] }))
    .filter(entry => entry.video)
    .slice(0, 4);
}

function renderVideoCards(results, extraItems = []) {
  return selectedVideos(results, extraItems).map(({ item, video }) => `
    <article class="video-card">
      <div class="video-thumb">▶</div>
      <div>
        <h4>${escapeText(video.title)}</h4>
        <p>${escapeText(item)}に関連する改善動画です。</p>
        <div class="mission-tags">
          <em>${escapeText(video.category)}</em>
          <em>${escapeText(video.duration)}</em>
          <em>${escapeText(video.level)}</em>
        </div>
        <a href="${escapeText(video.url)}" target="_blank" rel="noopener">動画を開く</a>
        <div class="print-qr" aria-hidden="true"><i></i><i></i><i></i><span>${escapeText(video.url)}</span></div>
      </div>
    </article>
  `).join("");
}

function renderStaffDetails(results, nextItems, parentSummary) {
  const rows = results.flatMap(result => result.values.map(item => `
    <tr>
      <td>${escapeText(result.shortTitle || result.title)}</td>
      <td>${escapeText(item.item)}</td>
      <td>${item.score}点</td>
      <td>${escapeText(item.label)}</td>
      <td>${escapeText(criteriaBank[item.item]?.[item.score === 3 ? "good" : item.score === 2 ? "caution" : "alert"] || "")}</td>
    </tr>
  `)).join("");

  document.getElementById("staffScoreTable").innerHTML = `
    <div class="table-wrap">
      <table class="progress-table staff-score-table">
        <thead><tr><th>領域</th><th>項目</th><th>点数</th><th>判定</th><th>点数の根拠</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
  document.getElementById("parentSummaryForStaff").textContent = parentSummary;
  document.getElementById("nextStaffItems").innerHTML = nextItems.map(item => `<li>${escapeText(item.item)}を再評価</li>`).join("");
  document.getElementById("staffDoctorComment").textContent = currentReportSnapshot.doctorGeneratedComment || getFormValue("doctorComment", "医師コメントは未入力です。");
  document.getElementById("staffJoynityComment").textContent = currentReportSnapshot.joynityGeneratedComment || currentReportSnapshot.joynityComment;
  const internalMemos = [
    ["MSI詳細", getFormValue("msiDetail", "")],
    ["DNS詳細", getFormValue("dnsDetail", "")],
    ["医師内部メモ", getFormValue("doctorInternalMemo", "")],
    ["スタッフ所見", getFormValue("staffObservation", "")],
    ["介入・動画管理", getFormValue("videoManagement", "")],
    ["再評価項目", getFormValue("recheckItemsMemo", "")]
  ].filter(([, value]) => value && value !== "未入力");
  document.getElementById("staffInternalMemo").innerHTML = internalMemos.length
    ? internalMemos.map(([label, value]) => `<p><strong>${escapeText(label)}:</strong> ${escapeText(value)}</p>`).join("")
    : "<p>スタッフ詳細メモは未入力です。</p>";
}

function makeCurrentRecord(results, sleep, hydration) {
  const record = {
    "評価日": todayString(),
    "選手ID": getFormValue("playerId", ""),
    "年齢": getFormValue("age", ""),
    "学年": getFormValue("grade", ""),
    "競技": getFormValue("sport", ""),
    "身長": getFormValue("height", ""),
    "体重": getFormValue("weight", ""),
    "身長変化6ヶ月": getFormValue("heightChange6m", ""),
    "身長変化1年": getFormValue("heightChange12m", ""),
    "現在痛みがある部位": getFormValue("painArea", "なし"),
    "成熟タイプ": getFormValue("maturityType", ""),
    "成長フェーズ": getFormValue("growthPhase", ""),
    "成長ピーク目安": getFormValue("peakEstimate", ""),
    "利き足": getFormValue("dominantFoot", ""),
    "利き手": getFormValue("dominantHand", ""),
    "障害予防平均点": results[0].average.toFixed(1),
    "障害予防判定": results[0].text,
    "身体の使い方平均点": results[1].average.toFixed(1),
    "身体の使い方判定": results[1].text,
    "栄養回復平均点": results[2].average.toFixed(1),
    "栄養回復判定": results[2].text,
    "平均睡眠時間": sleep.hourText,
    "睡眠判定": sleep.label,
    "1日の水分摂取量ml": hydration.daily ? String(hydration.daily) : "",
    "水分判定": hydration.label,
    "水分目安ml": hydration.minTarget && hydration.maxTarget ? `${hydration.minTarget}〜${hydration.maxTarget}` : ""
  };

  results.flatMap(result => result.values).forEach(item => {
    record[`${item.item}点数`] = String(item.score);
  });

  return record;
}

function makeReportSnapshot(results, features, strengths, actions, growthPhase, peakEstimate, sleep, hydration) {
  return {
    results,
    features,
    strengths,
    actions,
    sleep,
    hydration,
    growthPhase,
    peakEstimate,
    stage: stageMessage(peakEstimate, growthPhase),
    parentComment: parentComment(results, growthPhase, peakEstimate, sleep, hydration),
    nextCheck: nextCheckTiming(results, growthPhase, [sleep, hydration]),
    joynityComment: joynityComment(results, sleep, hydration),
    progress: currentReportRecord ? progressComment(buildProgressRecords(currentReportRecord)) : ""
  };
}

function csvHeaders() {
  return [
    "評価日",
    "選手ID",
    "年齢",
    "学年",
    "競技",
    "身長",
    "体重",
    "身長変化6ヶ月",
    "身長変化1年",
    "現在痛みがある部位",
    "成熟タイプ",
    "成長フェーズ",
    "成長ピーク目安",
    "利き足",
    "利き手",
    "障害予防平均点",
    "障害予防判定",
    "身体の使い方平均点",
    "身体の使い方判定",
    "栄養回復平均点",
    "栄養回復判定",
    "平均睡眠時間",
    "睡眠判定",
    "1日の水分摂取量ml",
    "水分判定",
    "水分目安ml",
    ...allRatingItems.map(item => `${item}点数`)
  ];
}

function csvEscape(value) {
  const text = value == null ? "" : String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function buildCsv(records) {
  const headers = csvHeaders();
  const lines = [
    headers.map(csvEscape).join(","),
    ...records.map(record => headers.map(header => csvEscape(record[header])).join(","))
  ];
  return `\uFEFF${lines.join("\n")}`;
}

function parseCsv(text) {
  const cleanText = text.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < cleanText.length; index += 1) {
    const char = cleanText[index];
    const nextChar = cleanText[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") index += 1;
      row.push(field);
      if (row.some(value => value.trim() !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  row.push(field);
  if (row.some(value => value.trim() !== "")) rows.push(row);

  if (rows.length < 2) return [];
  const headers = rows[0].map(header => header.trim());
  return rows.slice(1).map(values => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = values[index] || "";
    });
    return record;
  });
}

function downloadCurrentCsv() {
  if (!currentReportRecord) return;
  const csv = buildCsv([currentReportRecord]);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const playerId = currentReportRecord["選手ID"] || "unknown";
  link.href = url;
  link.download = `joynity-growth-check_${playerId}_${currentReportRecord["評価日"]}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function samePlayerRows(playerId) {
  if (!playerId) return [];
  return importedCsvRows.filter(row => row["選手ID"] === playerId);
}

function recordDateValue(record) {
  const date = new Date(record["評価日"]);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
}

function buildProgressRecords(currentRecord) {
  const rows = [...samePlayerRows(currentRecord["選手ID"]), currentRecord];
  const unique = new Map();
  rows.forEach(row => {
    const key = `${row["選手ID"]}-${row["評価日"]}-${row["障害予防平均点"]}-${row["身体の使い方平均点"]}-${row["栄養回復平均点"]}`;
    unique.set(key, row);
  });
  return [...unique.values()].sort((a, b) => recordDateValue(a) - recordDateValue(b));
}

function trendFor(current, previous) {
  if (!previous) return { text: "初回", className: "trend-flat" };
  const diff = toNumber(current) - toNumber(previous);
  if (diff >= 0.15) return { text: "↑改善", className: "trend-up" };
  if (diff <= -0.15) return { text: "↓要確認", className: "trend-down" };
  return { text: "→維持", className: "trend-flat" };
}

function metricCell(record, previous, averageKey, judgementKey) {
  const trend = trendFor(record[averageKey], previous ? previous[averageKey] : null);
  return `
    <span class="metric-main">${escapeText(record[judgementKey] || "未判定")}</span>
    <span class="metric-sub">平均 ${escapeText(record[averageKey] || "-")}</span>
    <span class="${trend.className}">${trend.text}</span>
  `;
}

function renderProgressTable(records) {
  document.getElementById("progressTableBody").innerHTML = records.map((record, index) => {
    const previous = index > 0 ? records[index - 1] : null;
    return `
      <tr>
        <td><span class="metric-main">${escapeText(record["評価日"] || "-")}</span></td>
        <td><span class="metric-main">${escapeText(record["身長"] || "-")} cm</span></td>
        <td><span class="metric-main">${escapeText(record["体重"] || "-")} kg</span></td>
        <td>${metricCell(record, previous, "障害予防平均点", "障害予防判定")}</td>
        <td>${metricCell(record, previous, "身体の使い方平均点", "身体の使い方判定")}</td>
        <td>${metricCell(record, previous, "栄養回復平均点", "栄養回復判定")}</td>
      </tr>
    `;
  }).join("");
}

function radarPoint(center, radius, index, total, value) {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / total;
  const scale = Math.max(0, Math.min(3, toNumber(value))) / 3;
  const distance = radius * scale;
  return {
    x: center + Math.cos(angle) * distance,
    y: center + Math.sin(angle) * distance
  };
}

function renderRadarChart(firstRecord, currentRecord) {
  const labels = ["障害予防", "身体の使い方", "栄養回復"];
  const keys = ["障害予防平均点", "身体の使い方平均点", "栄養回復平均点"];
  const center = 130;
  const radius = 88;
  const gridLevels = [1, 2, 3].map(level => {
    const points = keys.map((key, index) => radarPoint(center, radius, index, keys.length, level)).map(point => `${point.x},${point.y}`).join(" ");
    return `<polygon points="${points}" fill="none" stroke="#d8eeee" stroke-width="1" />`;
  }).join("");
  const axis = keys.map((key, index) => {
    const end = radarPoint(center, radius, index, keys.length, 3);
    const label = radarPoint(center, radius + 24, index, keys.length, 3);
    return `
      <line x1="${center}" y1="${center}" x2="${end.x}" y2="${end.y}" stroke="#c8e3e1" />
      <text x="${label.x}" y="${label.y}" text-anchor="middle" dominant-baseline="middle" fill="#35575c" font-size="12" font-weight="700">${labels[index]}</text>
    `;
  }).join("");
  const firstPoints = keys.map((key, index) => radarPoint(center, radius, index, keys.length, firstRecord[key])).map(point => `${point.x},${point.y}`).join(" ");
  const currentPoints = keys.map((key, index) => radarPoint(center, radius, index, keys.length, currentRecord[key])).map(point => `${point.x},${point.y}`).join(" ");

  document.getElementById("radarChart").innerHTML = `
    <svg viewBox="0 0 260 260" role="img" aria-label="初回と今回の3領域平均点比較">
      ${gridLevels}
      ${axis}
      <polygon points="${firstPoints}" fill="rgba(127, 148, 154, 0.18)" stroke="#7f949a" stroke-width="3" />
      <polygon points="${currentPoints}" fill="rgba(26, 174, 177, 0.24)" stroke="#1aaeb1" stroke-width="3" />
      <circle cx="${center}" cy="${center}" r="3" fill="#087b86" />
    </svg>
  `;
}

function renderCurrentConditionRadar(results) {
  const labels = ["障害予防", "動作機能", "回復状態"];
  const values = [results[0].average, results[1].average, results[2].average];
  const center = 120;
  const radius = 78;
  const pointFor = (index, value) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / values.length;
    const distance = radius * (Math.max(0, Math.min(3, value)) / 3);
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance
    };
  };
  const grid = [1, 2, 3].map(level => {
    const points = values.map((_, index) => pointFor(index, level)).map(point => `${point.x},${point.y}`).join(" ");
    return `<polygon points="${points}" fill="none" stroke="#d8eeee" stroke-width="1" />`;
  }).join("");
  const axes = values.map((_, index) => {
    const end = pointFor(index, 3);
    const label = (() => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / values.length;
      return {
        x: center + Math.cos(angle) * (radius + 26),
        y: center + Math.sin(angle) * (radius + 26)
      };
    })();
    return `
      <line x1="${center}" y1="${center}" x2="${end.x}" y2="${end.y}" stroke="#c8e3e1" />
      <text x="${label.x}" y="${label.y}" text-anchor="middle" dominant-baseline="middle" fill="#35575c" font-size="12" font-weight="800">${labels[index]}</text>
    `;
  }).join("");
  const points = values.map((value, index) => pointFor(index, value)).map(point => `${point.x},${point.y}`).join(" ");
  document.getElementById("conditionRadarChart").innerHTML = `
    <svg viewBox="0 0 240 240" role="img" aria-label="3領域のコンディションバランス">
      ${grid}
      ${axes}
      <polygon points="${points}" fill="rgba(26, 174, 177, 0.24)" stroke="#1aaeb1" stroke-width="3" />
      ${values.map((value, index) => {
        const point = pointFor(index, value);
        return `<circle cx="${point.x}" cy="${point.y}" r="4" fill="#087b86" />`;
      }).join("")}
    </svg>
  `;
}

function conditionOverviewText(results) {
  const best = [...results].sort((a, b) => b.average - a.average)[0];
  const lowest = [...results].sort((a, b) => a.average - b.average)[0];
  if (lowest.tone === "good") {
    return "全体として大きな崩れは少なく、今の良い状態を保ちながら成長変化を定期的に確認したい状態です。";
  }
  return `強みは「${best.shortTitle || best.title}」、次に確認したいのは「${lowest.shortTitle || lowest.title}」です。まずは今やるべき3つに絞って取り組みましょう。`;
}

function progressComment(records) {
  if (records.length < 2) {
    return "過去CSVを読み込むと、初回・前回・今回の変化をここに表示します。";
  }

  const previous = records[records.length - 2];
  const current = records[records.length - 1];
  const areas = [
    ["障害予防", "障害予防平均点", "練習量や動作負荷の管理"],
    ["身体の使い方", "身体の使い方平均点", "片脚動作や着地の安定性"],
    ["栄養回復", "栄養回復平均点", "食事・睡眠・疲労回復の習慣"]
  ];
  const improved = areas.filter(([, key]) => toNumber(current[key]) - toNumber(previous[key]) >= 0.15);
  const down = areas.filter(([, key]) => toNumber(current[key]) - toNumber(previous[key]) <= -0.15);

  if (improved.length > 0) {
    const [area, , detail] = improved[0];
    return `前回と比べて、${area}の評価が改善しています。特に${detail}が整ってきている可能性があります。今後も成長期の変化に合わせて、3〜4ヶ月ごとに確認していきましょう。`;
  }

  if (down.length > 0) {
    const [area] = down[0];
    return `前回と比べて、${area}に少し変化が見られます。これは成長期の身体変化や練習負荷の影響を受けることがあり、今後の伸びしろを見つける大切なサインです。焦らず、優先項目を絞って整えていきましょう。`;
  }

  return "前回から大きな低下はなく、全体として状態を維持できています。成長期は数ヶ月で身体の使い方が変わるため、現在の良い土台を保ちながら定期的に確認していきましょう。";
}

function renderProgressSection(currentRecord) {
  const section = document.getElementById("progressSection");
  const records = buildProgressRecords(currentRecord);
  const displayRecords = records.length > 1 ? records : demoProgressRecords(currentRecord);
  document.getElementById("progressCount").textContent = records.length > 1 ? `${records.length}件の評価` : "見本表示";
  document.getElementById("progressComment").textContent = records.length > 1
    ? progressComment(records)
    : "過去CSVを読み込むと、初回・3ヶ月後・6ヶ月後の変化を同じ形式で表示できます。現在は事業説明用の見本として、前回比較が入る想定の表を表示しています。";
  document.getElementById("progressInsights").innerHTML = progressInsights(displayRecords);
  renderProgressTable(displayRecords);
  renderRadarChart(displayRecords[0], displayRecords[displayRecords.length - 1]);
  section.hidden = false;
}

function progressInsights(records) {
  const previous = records.length > 1 ? records[records.length - 2] : null;
  const current = records[records.length - 1];
  const metrics = [
    ["障害予防", "障害予防平均点"],
    ["身体の使い方", "身体の使い方平均点"],
    ["栄養回復", "栄養回復平均点"]
  ];
  const improved = [];
  const flat = [];
  const down = [];
  metrics.forEach(([label, key]) => {
    const diff = previous ? toNumber(current[key]) - toNumber(previous[key]) : 0;
    if (diff >= 0.15) improved.push(label);
    else if (diff <= -0.15) down.push(label);
    else flat.push(label);
  });
  const heightDiff = previous ? (toNumber(current["身長"]) - toNumber(previous["身長"])).toFixed(1) : "0.0";
  const weightDiff = previous ? (toNumber(current["体重"]) - toNumber(previous["体重"])).toFixed(1) : "0.0";
  return [
    ["前回より良くなった項目", improved.join("、") || "大きな変化なし"],
    ["変化なしの項目", flat.join("、") || "なし"],
    ["注意が増えた項目", down.join("、") || "なし"],
    ["身長・体重の変化", `身長 ${heightDiff}cm / 体重 ${weightDiff}kg`],
    ["痛みの有無の変化", "CSVの痛み欄を使うと次回比較できます"],
    ["成長ステージの変化", `${current["成長フェーズ"] || "-"} / ${current["成長ピーク目安"] || "-"}`],
    ["ミッション達成状況", "次回チェック時に聞き取りで確認"]
  ].map(([title, text]) => `<div><span>${title}</span><p>${text}</p></div>`).join("");
}

function demoProgressRecords(currentRecord) {
  const keys = ["障害予防平均点", "身体の使い方平均点", "栄養回復平均点"];
  const labels = {
    "障害予防平均点": "障害予防判定",
    "身体の使い方平均点": "身体の使い方判定",
    "栄養回復平均点": "栄養回復判定"
  };
  const dates = ["初回見本", "3ヶ月後見本", currentRecord["評価日"]];

  return dates.map((date, index) => {
    const record = { ...currentRecord, "評価日": date };
    keys.forEach(key => {
      const base = toNumber(currentRecord[key]);
      const value = Math.max(1, Math.min(3, base - (2 - index) * 0.25));
      record[key] = value.toFixed(1);
      record[labels[key]] = value >= 2.5 ? "安定" : value >= 1.8 ? SCORE_LABELS[2] : SCORE_LABELS[1];
      if (key === "栄養回復平均点") record[labels[key]] = value >= 2.5 ? "継続できている" : value >= 1.8 ? SCORE_LABELS[2] : SCORE_LABELS[1];
    });
    return record;
  });
}

function renderReport() {
  const growthPhase = getFormValue("growthPhase", "成長フェーズ未入力");
  const peakEstimate = getFormValue("peakEstimate", "未入力");
  const results = groupKeys.map(collectGroupResult);
  const sleep = assessSleep();
  const hydration = assessHydration();
  const extraItems = [sleep, hydration];
  const features = buildFeatures(results);
  extraItems
    .filter(item => item.score <= 2)
    .forEach(item => {
      if (features.length < 3) features.push(`「${item.item}」は${item.label}です。回復と集中力を支える習慣として次回までに整えましょう。`);
    });
  const strengths = buildStrengths(results);
  const actions = buildActions(features, results, growthPhase, extraItems);
  const missions = getMissionInputs(actions);
  const stage = normalizeGrowthStage(growthPhase, peakEstimate);
  const nextTiming = getFormValue("nextCheckManual", "") || nextCheckTiming(results, growthPhase, extraItems);
  const conditions = conditionSummary(results);
  const verdict = overallVerdict(results);
  const nutrition = nutritionAdvice(stage, results, sleep, hydration);
  currentReportRecord = makeCurrentRecord(results, sleep, hydration);
  currentReportSnapshot = makeReportSnapshot(results, features, strengths, actions, growthPhase, peakEstimate, sleep, hydration);
  currentReportSnapshot.stage = `${stage}。${stagePlainMessage(stage)}`;
  currentReportSnapshot.nextCheck = nextTiming;
  currentReportSnapshot.missions = missions;
  currentReportSnapshot.doctorGeneratedComment = generateDoctorCommentText(results, sleep, hydration);
  currentReportSnapshot.joynityGeneratedComment = generateJoynityCommentText(results, sleep, hydration);
  currentChallengeMenus = buildChallengeMenus(results, sleep, hydration);
  currentReportSnapshot.challengeMenus = currentChallengeMenus;
  currentReportSnapshot.nutritionAdvice = nutrition;

  document.getElementById("stageChip").textContent = `成長ピークまで: ${peakEstimate}`;
  document.getElementById("stageMessage").textContent = conclusionComment(results, stage, nextTiming, extraItems);
  document.getElementById("conclusionGrid").innerHTML = [
    ["成長ピークまで", peakEstimate],
    ["現在の状態", stage],
    ["優先テーマ", priorityThemes(results, extraItems)],
    ["次回チェック", nextTiming]
  ].map(([label, value]) => `<div><span>${label}</span><strong>${escapeText(value)}</strong></div>`).join("");
  document.getElementById("overallVerdict").textContent = verdict.text;
  document.getElementById("overallVerdict").className = `verdict-${verdict.tone}`;
  document.getElementById("overallLead").textContent = verdict.lead;
  renderCurrentConditionRadar(results);
  document.getElementById("conditionOverviewText").textContent = conditionOverviewText(results);
  document.getElementById("playerSummary").innerHTML = [
    ["選手ID", getFormValue("playerId")],
    ["名前・イニシャル", getFormValue("playerInitial", "未入力")],
    ["年齢・学年", `${getFormValue("age")}歳 / ${getFormValue("grade")}`],
    ["競技・ポジション", `${getFormValue("sport")} / ${getFormValue("position")}`],
    ["身長・体重", `${getFormValue("height")}cm / ${getFormValue("weight")}kg`],
    ["身長変化", heightChangeSummary()],
    ["利き足・利き手", `${getFormValue("dominantFoot", "未入力")} / ${getFormValue("dominantHand", "未入力")}`],
    ["成熟タイプ", getFormValue("maturityType")],
    ["現在の痛み", getFormValue("painArea", "なし")]
  ].map(([label, value]) => `<div class="summary-row"><span>${escapeText(label)}</span><strong>${escapeText(value)}</strong></div>`).join("");

  document.getElementById("judgementCards").innerHTML = results.map(result => {
    const meaning = domainMeaning(result);
    return `
    <div class="judgement-card">
      <div class="judgement-label">${result.shortTitle || result.title}</div>
      <div class="judgement-result">${result.text}</div>
      <span class="score-chip tone-${result.tone}">平均 ${result.average.toFixed(1)}</span>
      <dl class="judgement-story">
        <dt>一言でいうと</dt><dd>${escapeText(meaning.oneLine)}</dd>
        <dt>今の状態</dt><dd>${escapeText(meaning.state)}</dd>
        <dt>放置すると起こりやすいこと</dt><dd>${escapeText(meaning.risk)}</dd>
        <dt>次にやること</dt><dd>${escapeText(meaning.next)}</dd>
      </dl>
    </div>
  `; }).join("") + `
    <div class="judgement-card">
      <div class="judgement-label">成長ステージ</div>
      <div class="judgement-result">${stage}</div>
      <span class="score-chip tone-good">今はここ</span>
    </div>
    <div class="judgement-card">
      <div class="judgement-label">行動習慣</div>
      <div class="judgement-result">${conditions.behavior.text}</div>
      <span class="score-chip tone-${conditions.behavior.tone}">生活・回復</span>
    </div>
  `;
  document.getElementById("stageTimeline").innerHTML = renderStageTimeline(stage);

  document.getElementById("reasonText").textContent = buildReasonText(results, growthPhase, peakEstimate);
  document.getElementById("doctorEchoSummary").textContent = getFormValue("doctorComment", "医師による骨端線エコー所見コメントは未入力です。事業説明時は、ここに成熟度・骨端線所見・運動負荷の注意点が表示されます。");
  document.getElementById("growthBodyComment").textContent = growthBodyComment(growthPhase, peakEstimate, getFormValue("maturityType"));
  document.getElementById("injuryReview").textContent = domainReview(results[0]);
  document.getElementById("movementReview").textContent = domainReview(results[1]);
  document.getElementById("nutritionReview").textContent = domainReview(results[2]);
  document.getElementById("nutritionTheme").textContent = nutrition.theme;
  document.getElementById("nutritionScoreLabel").textContent = nutrition.scoreLabel;
  document.getElementById("nutritionAdviceComment").textContent = nutrition.comment;
  document.getElementById("nutritionNutrients").innerHTML = listMarkup(nutrition.nutrients);
  document.getElementById("nutritionMeals").innerHTML = listMarkup(nutrition.meals);
  document.getElementById("nutritionConvenience").innerHTML = listMarkup(nutrition.convenience);
  document.getElementById("nutritionTiming").textContent = nutrition.timing;
  document.getElementById("priorityFoodHabit").textContent = nutrition.priorityFoodHabit;
  document.getElementById("postPracticeSnack").textContent = nutrition.snack;
  document.getElementById("hydrationAdviceShort").textContent = nutrition.hydration;
  document.getElementById("sleepAdviceShort").textContent = nutrition.sleep;
  document.getElementById("nutritionParentNote").textContent = nutrition.parentNote;
  document.getElementById("foodSupportChecklist").innerHTML = renderFoodSupportChecklist(nutrition.supportList);
  document.getElementById("sleepJudgement").textContent = sleep.label;
  document.getElementById("sleepJudgement").className = `tone-${sleep.tone}`;
  document.getElementById("sleepSummaryText").textContent = `${sleep.summary} 就寝 ${sleep.bedtime} / 起床 ${sleep.wakeTime} / 寝つき ${sleep.onset} / 途中覚醒 ${sleep.waking} / 起床時 ${sleep.fatigue}`;
  document.getElementById("hydrationJudgement").textContent = hydration.label;
  document.getElementById("hydrationJudgement").className = `tone-${hydration.tone}`;
  document.getElementById("hydrationSummaryText").textContent = `${hydration.summary} 現在入力: 水分感覚 ${hydration.hydrationSense} / 練習中補給 ${hydration.practiceHydration}`;
  document.getElementById("strengthList").innerHTML = strengths.map(item => `<li>${item}</li>`).join("");
  document.getElementById("featureList").innerHTML = features.map(item => `<li>${item}</li>`).join("");
  document.getElementById("actionList").innerHTML = actions.map(item => `<li>${item}</li>`).join("");
  const routine = routineAdvice(results, missions);
  document.getElementById("beforePractice").textContent = routine.before;
  document.getElementById("afterPractice").textContent = routine.after;
  document.getElementById("homeCheck").textContent = routine.home;
  document.getElementById("nextCheckItems").textContent = routine.next;
  document.getElementById("missionCards").innerHTML = renderMissionCards(missions);
  const selectedVideoItems = selectedVideos(results, extraItems);
  document.getElementById("videoCards").innerHTML = renderVideoCards(results, extraItems);
  document.getElementById("qrLinkGrid").innerHTML = renderQrLinks(selectedVideoItems);
  document.getElementById("doctorGeneratedComment").value = currentReportSnapshot.doctorGeneratedComment;
  document.getElementById("joynityGeneratedComment").value = currentReportSnapshot.joynityGeneratedComment;
  renderChallengeMenuEditor(currentChallengeMenus);
  document.getElementById("parentComment").textContent = currentReportSnapshot.parentComment;
  document.getElementById("nextCheck").textContent = currentReportSnapshot.nextCheck;
  document.getElementById("doctorCommentReport").textContent = currentReportSnapshot.doctorGeneratedComment;
  document.getElementById("joynityComment").textContent = currentReportSnapshot.joynityGeneratedComment;
  document.getElementById("proposalTiming").textContent = currentReportSnapshot.nextCheck;
  document.getElementById("proposalContent").textContent = proposalContent(results, actions);
  document.getElementById("staffGuide").textContent = staffGuide(results, growthPhase);
  renderStaffDetails(results, priorityItems(results, 5, extraItems), currentReportSnapshot.parentComment);
  renderProgressSection(currentReportRecord);
  editableAutoValues = {
    conclusion: document.getElementById("stageMessage").textContent,
    growthFeature: document.getElementById("growthBodyComment").textContent,
    reason: document.getElementById("reasonText").textContent,
    strengths: readEditableElement(document.getElementById("strengthList")),
    overallLead: document.getElementById("overallLead").textContent,
    parentComment: document.getElementById("parentComment").textContent,
    actions: readEditableElement(document.getElementById("actionList")),
    proposal: document.getElementById("proposalContent").textContent,
    nutritionAdvice: document.getElementById("nutritionAdviceComment").textContent
  };
  setupInlineEditors();
  syncGeneratedReportEdits();

  emptyReport.hidden = true;
  reportContent.hidden = false;
  showScreen("report");
}

function syncGeneratedReportEdits() {
  if (!currentReportSnapshot) return;
  syncChallengeMenusFromDom();
  currentReportSnapshot.doctorGeneratedComment = document.getElementById("doctorGeneratedComment")?.value.trim() || "";
  currentReportSnapshot.joynityGeneratedComment = document.getElementById("joynityGeneratedComment")?.value.trim() || "";
  currentReportSnapshot.challengeMenus = currentChallengeMenus;
  editableDefinitions().forEach(definition => {
    const element = document.querySelector(definition.selector);
    currentReportSnapshot.editedTexts = currentReportSnapshot.editedTexts || {};
    currentReportSnapshot.editedTexts[definition.key] = readEditableElement(element);
  });
  currentReportSnapshot.parentComment = currentReportSnapshot.editedTexts.parentComment || currentReportSnapshot.parentComment;
  currentReportSnapshot.actions = (currentReportSnapshot.editedTexts.actions || "").split("\n").filter(Boolean);
  currentReportSnapshot.strengths = (currentReportSnapshot.editedTexts.strengths || "").split("\n").filter(Boolean);
  document.getElementById("doctorCommentReport").textContent = currentReportSnapshot.doctorGeneratedComment || "医師コメントは未入力です。";
  document.getElementById("joynityComment").textContent = currentReportSnapshot.joynityGeneratedComment || currentReportSnapshot.joynityComment;
  document.getElementById("staffDoctorComment").textContent = currentReportSnapshot.doctorGeneratedComment || "医師コメントは未入力です。";
  document.getElementById("staffJoynityComment").textContent = currentReportSnapshot.joynityGeneratedComment || currentReportSnapshot.joynityComment;
}

function regenerateComment(kind) {
  if (!currentReportSnapshot) return;
  const textarea = document.getElementById(kind === "doctor" ? "doctorGeneratedComment" : "joynityGeneratedComment");
  const nextText = kind === "doctor"
    ? generateDoctorCommentText(currentReportSnapshot.results, currentReportSnapshot.sleep, currentReportSnapshot.hydration)
    : generateJoynityCommentText(currentReportSnapshot.results, currentReportSnapshot.sleep, currentReportSnapshot.hydration);
  const hasEditedText = textarea.value.trim() && textarea.value.trim() !== nextText;
  if (hasEditedText && !window.confirm("編集済みのコメントを自動生成文で上書きしますか？")) return;
  textarea.value = nextText;
  syncGeneratedReportEdits();
}

function regenerateChallengeMenus() {
  if (!currentReportSnapshot) return;
  if (currentChallengeMenus.length > 0 && !window.confirm("現在の課題メニューを自動生成内容で上書きしますか？")) return;
  currentChallengeMenus = buildChallengeMenus(currentReportSnapshot.results, currentReportSnapshot.sleep, currentReportSnapshot.hydration);
  renderChallengeMenuEditor(currentChallengeMenus);
  syncGeneratedReportEdits();
}

function addBlankChallengeMenu() {
  syncChallengeMenusFromDom();
  currentChallengeMenus.push({
    sourceItem: "手動追加",
    score: 2,
    name: "追加メニュー",
    purpose: "次回までに整えたいポイントをサポートする",
    frequency: "週3回",
    duration: "5分",
    target: "本人",
    videoUrl: ""
  });
  renderChallengeMenuEditor(currentChallengeMenus);
  syncGeneratedReportEdits();
}

function beginCommentEdit(id) {
  const textarea = document.getElementById(id);
  textarea.dataset.original = textarea.value;
  textarea.focus();
}

function saveCommentEdit(id) {
  const textarea = document.getElementById(id);
  textarea.dataset.original = textarea.value;
  syncGeneratedReportEdits();
}

function cancelCommentEdit(id) {
  const textarea = document.getElementById(id);
  if (textarea.dataset.original != null) textarea.value = textarea.dataset.original;
  syncGeneratedReportEdits();
}

function reorderChallengeMenus() {
  syncChallengeMenusFromDom();
  currentChallengeMenus = currentChallengeMenus
    .sort((a, b) => (a.score || 3) - (b.score || 3));
  renderChallengeMenuEditor(currentChallengeMenus);
  syncGeneratedReportEdits();
}

function validateEmailPreparation() {
  const email = getFormValue("parentEmail", "");
  const reportConsent = form.elements.reportSendConsent.checked;
  const privacyConsent = form.elements.privacyConsent.checked;

  if (!currentReportRecord || !currentReportSnapshot) {
    return "先にレポートを作成してください。";
  }

  if (!email) {
    return "保護者メールアドレスを入力してください。";
  }

  if (!form.elements.parentEmail.checkValidity()) {
    return "メールアドレスの形式を確認してください。";
  }

  if (!reportConsent || !privacyConsent) {
    return "レポート送信同意と個人情報取り扱い同意の両方にチェックしてください。";
  }

  return "";
}

function buildEmailText() {
  syncGeneratedReportEdits();
  const playerId = currentReportRecord["選手ID"] || "未入力";
  const sport = currentReportRecord["競技"] || "競技";
  const missionText = (currentReportSnapshot.missions || [])
    .map((mission, index) => `${index + 1}. ${mission.text}（${mission.freq}・${mission.target}）`)
    .join("\n");
  const menuText = (currentReportSnapshot.challengeMenus || [])
    .map((menu, index) => `${index + 1}. ${menu.name}（${menu.frequency}・${menu.duration}・${menu.target}）\n目的: ${menu.purpose}`)
    .join("\n");
  const summaries = currentReportSnapshot.results
    .map(result => `・${result.title}: ${result.text}（平均 ${result.average.toFixed(1)}）`)
    .join("\n");
  const actions = currentReportSnapshot.actions.map((item, index) => `${index + 1}. ${item}`).join("\n");
  const strengths = currentReportSnapshot.strengths.map(item => `・${item}`).join("\n");
  const features = currentReportSnapshot.features.map(item => `・${item}`).join("\n");
  const progress = currentReportSnapshot.progress ? `\n【経過コメント】\n${currentReportSnapshot.progress}\n` : "";
  const nutritionText = currentReportSnapshot.editedTexts?.nutritionAdvice || currentReportSnapshot.nutritionAdvice?.comment || "";
  const nutrition = currentReportSnapshot.nutritionAdvice || {};
  const nutritionDetails = [
    nutrition.nutrients?.length ? `おすすめ栄養素: ${nutrition.nutrients.join("、")}` : "",
    nutrition.meals?.length ? `料理例: ${nutrition.meals.join("、")}` : "",
    nutrition.convenience?.length ? `コンビニ例: ${nutrition.convenience.join("、")}` : "",
    nutrition.timing ? `練習前後: ${nutrition.timing}` : "",
    nutrition.hydration ? `水分目安: ${nutrition.hydration}` : "",
    nutrition.sleep ? `睡眠目安: ${nutrition.sleep}` : ""
  ].filter(Boolean).join("\n");
  const proposalText = currentReportSnapshot.editedTexts?.proposal || currentReportSnapshot.nextCheck;

  return `保護者様

Joynity Conditioning Studioです。
本日は Joynity Growth Check を受けていただき、ありがとうございました。
本日のチェック結果の概要をお送りします。

【選手ID】
${playerId}

【競技】
${sport}

【今回の成長ステージ】
${currentReportSnapshot.stage}

【大きな問題の有無】
${summaries}

【今後気をつけたいポイント】
${features}

【次回までのミッション】
${missionText || actions}

【次回までの課題メニュー】
${menuText || "次回までの状態に合わせてスタッフが個別にご案内します。"}

【医師コメント】
${currentReportSnapshot.doctorGeneratedComment}

【Joynityコメント】
${currentReportSnapshot.joynityGeneratedComment}

【栄養・回復アドバイス】
${nutritionText}
${nutritionDetails}

【保護者向けコメント】
${currentReportSnapshot.parentComment}
${progress}
【次回チェック推奨時期】
${proposalText}

成長期の身体は短期間でも変化します。不安な痛みや疲れが続く場合は、いつでもJoynityスタッフへご相談ください。

Joynity Conditioning Studio`;
}

function createEmailCopyText() {
  const error = validateEmailPreparation();
  if (error) {
    emailStatus.textContent = error;
    emailText.hidden = true;
    emailText.value = "";
    return;
  }

  emailText.value = buildEmailText();
  emailText.hidden = false;
  emailStatus.textContent = `送信用コピー文を作成しました。宛先: ${getFormValue("parentEmail", "")}`;
  emailText.focus();
  emailText.select();
}

createRatings();

document.addEventListener("click", event => {
  const helpButton = event.target.closest(".help-button");
  document.querySelectorAll(".criteria-popover").forEach(popover => {
    const ownerButton = popover.previousElementSibling;
    if (!helpButton || ownerButton !== helpButton) {
      popover.hidden = true;
      ownerButton.classList.remove("active");
      ownerButton.setAttribute("aria-expanded", "false");
    }
  });

  if (helpButton) {
    const popover = helpButton.nextElementSibling;
    const shouldOpen = popover.hidden;
    popover.hidden = !shouldOpen;
    helpButton.classList.toggle("active", shouldOpen);
    helpButton.setAttribute("aria-expanded", String(shouldOpen));
  }
});

form.addEventListener("submit", event => {
  event.preventDefault();
  renderReport();
});

form.addEventListener("reset", () => {
  setTimeout(() => {
    emptyReport.hidden = false;
    reportContent.hidden = true;
    currentReportRecord = null;
    currentReportSnapshot = null;
    currentChallengeMenus = [];
    reportContent.classList.remove("detail-mode");
    document.getElementById("progressSection").hidden = true;
    emailText.hidden = true;
    emailText.value = "";
    emailStatus.textContent = "";
  }, 0);
});

inputTab.addEventListener("click", () => showScreen("input"));
reportTab.addEventListener("click", () => showScreen("report"));
document.getElementById("backToInput").addEventListener("click", () => showScreen("input"));
document.getElementById("editAgain").addEventListener("click", () => showScreen("input"));
document.getElementById("printReport").addEventListener("click", () => {
  syncGeneratedReportEdits();
  window.print();
});
document.getElementById("downloadCsv").addEventListener("click", () => {
  syncGeneratedReportEdits();
  downloadCurrentCsv();
});
document.getElementById("createEmailText").addEventListener("click", createEmailCopyText);
document.getElementById("generateDoctorComment").addEventListener("click", () => regenerateComment("doctor"));
document.getElementById("editDoctorComment").addEventListener("click", () => beginCommentEdit("doctorGeneratedComment"));
document.getElementById("saveDoctorComment").addEventListener("click", () => saveCommentEdit("doctorGeneratedComment"));
document.getElementById("cancelDoctorComment").addEventListener("click", () => cancelCommentEdit("doctorGeneratedComment"));
document.getElementById("generateJoynityComment").addEventListener("click", () => regenerateComment("joynity"));
document.getElementById("editJoynityComment").addEventListener("click", () => beginCommentEdit("joynityGeneratedComment"));
document.getElementById("saveJoynityComment").addEventListener("click", () => saveCommentEdit("joynityGeneratedComment"));
document.getElementById("cancelJoynityComment").addEventListener("click", () => cancelCommentEdit("joynityGeneratedComment"));
document.getElementById("generateChallengeMenu").addEventListener("click", regenerateChallengeMenus);
document.getElementById("addChallengeMenu").addEventListener("click", addBlankChallengeMenu);
document.getElementById("reorderChallengeMenu").addEventListener("click", reorderChallengeMenus);
document.getElementById("challengeMenuList").addEventListener("input", syncGeneratedReportEdits);
document.getElementById("challengeMenuList").addEventListener("click", event => {
  const deleteButton = event.target.closest("[data-delete-menu]");
  if (!deleteButton) return;
  syncChallengeMenusFromDom();
  currentChallengeMenus.splice(Number(deleteButton.dataset.deleteMenu), 1);
  renderChallengeMenuEditor(currentChallengeMenus);
  syncGeneratedReportEdits();
});
document.getElementById("doctorGeneratedComment").addEventListener("input", syncGeneratedReportEdits);
document.getElementById("joynityGeneratedComment").addEventListener("input", syncGeneratedReportEdits);

document.addEventListener("click", event => {
  const definition = editableDefinitions().find(item =>
    event.target.matches(`[data-edit-start="${item.key}"], [data-edit-save="${item.key}"], [data-edit-cancel="${item.key}"], [data-edit-reset="${item.key}"]`)
  );
  if (!definition) return;
  if (event.target.matches(`[data-edit-start="${definition.key}"]`)) enterEditMode(definition);
  if (event.target.matches(`[data-edit-save="${definition.key}"]`)) saveEditMode(definition);
  if (event.target.matches(`[data-edit-cancel="${definition.key}"]`)) cancelEditMode(definition);
  if (event.target.matches(`[data-edit-reset="${definition.key}"]`)) resetEditableToAuto(definition);
});

document.getElementById("csvUploadButton").addEventListener("click", () => {
  csvUpload.click();
});

csvUpload.addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      importedCsvRows = parseCsv(String(reader.result || ""));
      csvStatus.textContent = `${importedCsvRows.length}件のCSVデータを読み込みました`;
      if (currentReportRecord) renderProgressSection(currentReportRecord);
    } catch (error) {
      importedCsvRows = [];
      csvStatus.textContent = "CSVを読み込めませんでした。形式を確認してください。";
    }
  });
  reader.readAsText(file, "utf-8");
});

document.getElementById("staffGuideToggle").addEventListener("click", event => {
  const guideBody = document.getElementById("staffGuideBody");
  const shouldOpen = guideBody.hidden;
  guideBody.hidden = !shouldOpen;
  event.currentTarget.setAttribute("aria-expanded", String(shouldOpen));
  event.currentTarget.textContent = shouldOpen ? "スタッフ用説明ポイントを隠す" : "スタッフ用説明ポイントを表示";
});

document.getElementById("staffDetailToggle").addEventListener("click", event => {
  const detailBody = document.getElementById("staffDetailBody");
  const shouldOpen = detailBody.hidden;
  detailBody.hidden = !shouldOpen;
  reportContent.classList.toggle("detail-mode", shouldOpen);
  event.currentTarget.setAttribute("aria-expanded", String(shouldOpen));
  event.currentTarget.textContent = shouldOpen ? "詳細モードを隠す" : "詳細モードを表示";
});
