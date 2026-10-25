import { CONTROLS } from '../bazi/relations.js';
import { decade, type Branch, type Ganzhi, type Stem } from '../ganzhi.js';
import { palace, palaceOfBranch, type ByPalace } from './palaces.js';
import { relationOf } from './relation.js';
import type { Gate, Star } from './plates.js';
import type { ChartOptions } from '../types.js';

export type PatternId =
  | 'kongwang'
  | 'rumu'
  | 'menpo'
  // 宮迫, the gate controlling its palace, under `menpo: gongzhimen` alone.
  | 'gongpo'
  | 'sanqideshi'
  | 'jixing'
  | 'fuyin'
  | 'fanyin'
  | 'wubuyu'
  // 十干克應 — the stem of the heaven plate standing over the stem of the
  // earth plate. See `STEM_PAIRS`, and `docs/sources.md` for what each of
  // these was checked against.
  | 'qinglongfanshou'
  | 'feiniaodiexue'
  | 'taibairuying'
  | 'yingrutaibai'
  | 'dage'
  | 'xingge'
  | 'taibaitonggong'
  | 'shangge'
  | 'tengsheyaojiao'
  | 'zhuquetoujiang'
  | 'qinglongtaozou'
  | 'baihuchangkuang'
  | 'qinglongyaoming'
  | 'riqiruwu'
  // The rest of 《金函玉鏡》's table, which only `stemPairs: jinhan` lays. See
  // `JINHAN_PAIRS`.
  | 'qinglongheling'
  | 'guirenruyu'
  | 'zhifufeigong'
  | 'qinglongzhezu'
  | 'qinglongrutianlao'
  | 'qinglonghuagai'
  | 'liyinhaiyang'
  | 'riqifuyin'
  | 'qiyishunsui'
  | 'qiyixiangzuo'
  | 'riqibeixing'
  | 'riqirudi'
  | 'huagaifengxingguan'
  | 'riyuebingxing'
  | 'yueqibeishi'
  | 'yueqizhuque'
  | 'dabeiruxing'
  | 'moushijiucheng'
  | 'huorutianluo'
  | 'huagaibeishi'
  | 'qinglongzhuanguang'
  | 'rendunjige'
  | 'xingsuiyuezhuan'
  | 'qirutaiyin'
  | 'huorugouchen'
  | 'nianyuerishige'
  | 'zhuqueruyu'
  | 'wushenhuhe'
  | 'quanyuqinglong'
  | 'mushen'
  | 'huobeidihu'
  | 'zhuquerumu'
  | 'dihufenggui'
  | 'ligefanming'
  | 'youhunrumu'
  | 'diwanggaozhang'
  | 'dixingxuanwu'
  | 'taibaitianyifugong'
  | 'taibaipengxing'
  | 'tingtingzhige'
  | 'baihugange'
  | 'kunlongbeishang'
  | 'ganhebeishi'
  | 'yushendeqi'
  | 'ruyuzixing'
  | 'baihuchuli'
  | 'fuyintianting'
  | 'xiongsheruyu'
  | 'tianlaohuagai'
  | 'xiaoshehualong'
  | 'xiaosheriqi'
  | 'shuisheruhuo'
  | 'ganheshexing'
  | 'xiongsherumu'
  | 'taibaiqinshe'
  | 'tengshexiangchan'
  | 'sherudiluo'
  | 'younvjianyin'
  | 'tianyihuihe'
  | 'huagaifengxing'
  | 'huagaidihu'
  | 'taibairuwang'
  | 'wanggaitianlao'
  | 'fujiantengshe'
  | 'tianwangsizhang'
  // 《奇門仙機》's 干論, which only `stemPairs: xianji` lays, bar 青龍入雲格,
  // which the default lays too. See `XIANJI_PAIRS`.
  | 'qinglongruyunge'
  | 'qinglongdemingge'
  | 'qinglongrudi'
  | 'qinglongxianghe'
  | 'qinglongshishi'
  | 'qinglongxiangqin'
  | 'qinglongpoyu'
  | 'qizhongfuqige'
  | 'qidimingtang'
  | 'qizhuyunv'
  | 'rirudixiang'
  | 'qihetaibai'
  | 'qishenruyu'
  | 'qifengluowang'
  | 'yuezhaocanghai'
  | 'erfengheming'
  | 'xingyuehuiguang'
  | 'qifengchongsheng'
  | 'qirumingtang'
  | 'gengrutaibai'
  | 'qishenshengtai'
  | 'shenqiyouhai'
  | 'qifenghuagai'
  | 'qishenheming'
  | 'qishenxiangjiao'
  | 'yunvchenglong'
  | 'yunvshien'
  | 'yunvxingsha'
  | 'yunvfuhu'
  | 'yunvchenglongyouhai'
  | 'rirudihu'
  | 'dihuliguang'
  | 'mingtangtansheng'
  | 'mingtangconglu'
  | 'mingtangchongfeng'
  | 'mingtangfusha'
  | 'tiantingdeshi'
  | 'mingtangbeixing'
  | 'mingtanghehuagai'
  | 'taibaitanhe'
  | 'taibaiyouen'
  | 'taibaidaxing'
  | 'taibaichongxing'
  | 'taibaituiwei'
  | 'taibaixingrong'
  | 'tiantingdeming'
  | 'baihushoushang'
  | 'longhuzhengqiang'
  | 'huzuomingtang'
  | 'hufengtaibai'
  | 'tiantingzili'
  | 'tiantingfengyu'
  | 'hutouluowang'
  | 'tianlaofuqi'
  | 'taiyinpoyu'
  | 'qinglongruyu'
  | 'tiandixingchong'
  | 'tianlaoyishi'
  | 'baihufanyu'
  | 'tianlaozixing'
  | 'yinyangchongdi'
  | 'ruchenjiudi'
  | 'mingtangfanbei'
  | 'huagairumingtang'
  | 'huagaishouen'
  | 'tianwangchongfan'
  | 'tianwangyiyu'
  | 'tianwangchongzhang';

/**
 * The fortune a configuration is transmitted with (吉凶).
 *
 * This is **not** the engine changing its mind about interpreting. The line
 * it holds is between an attribute of the configuration and a reading of
 * somebody's situation, and the fortune is on the near side of it, for a
 * reason that is about the tradition rather than about the software: the
 * classical sources do not name an arrangement and then rate it in a second
 * step. 門迫 *is* 迫, oppression; 擊刑 *is* 刑, punishment. The name and the
 * fortune arrive in the same line of the same text, and a table that carried
 * one without the other would be reporting half of what it read.
 *
 * Which is why leaving it out never worked: it came in through the glosses
 * anyway — «gate oppressed» is not a neutral phrase — where it could not be
 * tested, sourced or contradicted. Here it can.
 *
 * What stays out is unchanged and is the whole of the doctrine that depends
 * on a question being asked: which palace is the 用神 for what somebody wants
 * to know, when the thing will happen, and what to do about it. Nothing in
 * this package ranks two charts, orders two hours, or advises.
 *
 * **How sure this is**: the third tier, the same as the configurations
 * themselves — Chinese-language sources with no runnable reference. Only
 * fortunes the manuals hand down alike are here; anything a school disputes
 * would be a parameter or an absence.
 */
export type ValenceId = 'ji' | 'xiong' | 'jixiong';

export interface Valence {
  id: ValenceId;
  hanzi: string;
  /** The fortune said aloud, e.g. `jí`. */
  pinyin: string;
}

export const VALENCE: Record<ValenceId, Valence> = {
  ji: { id: 'ji', hanzi: '吉', pinyin: 'jí' },
  xiong: { id: 'xiong', hanzi: '凶', pinyin: 'xiōng' },
  jixiong: { id: 'jixiong', hanzi: '吉凶', pinyin: 'jíxiōng' },
};

/**
 * Every configuration this engine recognises, with its name and its fortune.
 *
 * 空亡 is the one that takes 吉凶 rather than 凶, and it is not a hedge: the
 * void withholds whatever falls into it, which the sources state in both
 * directions in the same breath — what was wanted does not arrive, and
 * 凶格落空則凶不成, a baleful configuration fallen into the void does not
 * come off either. Two transmitted halves of one rule, not two schools.
 */
const CONFIGURATIONS: Record<PatternId, { hanzi: string; pinyin: string; valence?: ValenceId }> = {
  kongwang: { hanzi: '空亡', pinyin: 'kōngwáng', valence: 'jixiong' },
  rumu: { hanzi: '入墓', pinyin: 'rùmù', valence: 'xiong' },
  menpo: { hanzi: '門迫', pinyin: 'ménpò', valence: 'xiong' },
  // 《吉凶格解》's 宮迫制格, 「主百事不吉」.
  gongpo: { hanzi: '宮迫', pinyin: 'gōngpò', valence: 'xiong' },
  // 「三奇得使眾善皆臻」, the 統宗; 「此時最吉」, the 演義; under 釋吉格 in
  // 吉凶格解. Every text that names it calls it 吉, under either rule.
  sanqideshi: { hanzi: '三奇得使', pinyin: 'sānqídéshǐ', valence: 'ji' },
  jixing: { hanzi: '擊刑', pinyin: 'jīxíng', valence: 'xiong' },
  fuyin: { hanzi: '伏吟', pinyin: 'fúyín', valence: 'xiong' },
  fanyin: { hanzi: '反吟', pinyin: 'fǎnyín', valence: 'xiong' },
  wubuyu: { hanzi: '五不遇時', pinyin: 'wǔbùyùshí', valence: 'xiong' },
  qinglongfanshou: { hanzi: '青龍返首', pinyin: 'qīnglóngfǎnshǒu', valence: 'ji' },
  feiniaodiexue: { hanzi: '飛鳥跌穴', pinyin: 'fēiniǎodiēxué', valence: 'ji' },
  taibairuying: { hanzi: '太白入熒', pinyin: 'tàibáirùyíng', valence: 'xiong' },
  yingrutaibai: { hanzi: '熒入太白', pinyin: 'yíngrùtàibái', valence: 'xiong' },
  dage: { hanzi: '大格', pinyin: 'dàgé', valence: 'xiong' },
  xingge: { hanzi: '刑格', pinyin: 'xínggé', valence: 'xiong' },
  taibaitonggong: { hanzi: '太白同宮', pinyin: 'tàibáitónggōng', valence: 'xiong' },
  shangge: { hanzi: '上格', pinyin: 'shànggé', valence: 'xiong' },
  tengsheyaojiao: { hanzi: '螣蛇夭矯', pinyin: 'téngshéyāojiǎo', valence: 'xiong' },
  zhuquetoujiang: { hanzi: '朱雀投江', pinyin: 'zhūquètóujiāng', valence: 'xiong' },
  qinglongtaozou: { hanzi: '青龍逃走', pinyin: 'qīnglóngtáozǒu', valence: 'xiong' },
  baihuchangkuang: { hanzi: '白虎猖狂', pinyin: 'báihǔchāngkuáng', valence: 'xiong' },
  qinglongyaoming: { hanzi: '青龍耀明', pinyin: 'qīnglóngyàomíng', valence: 'ji' },
  riqiruwu: { hanzi: '日奇入霧', pinyin: 'rìqírùwù', valence: 'xiong' },
  // 《金函玉鏡》卷二 十干克應訣, as `stemPairs: jinhan` lays it. A fortune is
  // here only where that text gives one outright, without a condition on the
  // gate or on who asks — 「公私皆不利」, 「百事不可謀，為凶」, 「吉格」 — and
  // the rest carry none, as 杜 on a 太乙 board carries none.
  qinglongheling: { hanzi: '青龍合靈', pinyin: 'qīnglónghélíng' },
  guirenruyu: { hanzi: '貴人入獄', pinyin: 'guìrénrùyù', valence: 'xiong' },
  zhifufeigong: { hanzi: '值符飛宮', pinyin: 'zhífúfēigōng', valence: 'xiong' },
  qinglongzhezu: { hanzi: '青龍折足', pinyin: 'qīnglóngzhézú' },
  qinglongrutianlao: { hanzi: '青龍入天牢', pinyin: 'qīnglóngrùtiānláo', valence: 'xiong' },
  qinglonghuagai: { hanzi: '青龍華蓋', pinyin: 'qīnglónghuágài' },
  liyinhaiyang: { hanzi: '利陰害陽', pinyin: 'lìyīnhàiyáng' },
  riqifuyin: { hanzi: '日奇伏吟', pinyin: 'rìqífúyín' },
  qiyishunsui: { hanzi: '奇儀順遂', pinyin: 'qíyíshùnsuì' },
  qiyixiangzuo: { hanzi: '奇儀相佐', pinyin: 'qíyíxiāngzuǒ', valence: 'ji' },
  riqibeixing: { hanzi: '日奇被刑', pinyin: 'rìqíbèixíng' },
  riqirudi: { hanzi: '日奇入地', pinyin: 'rìqírùdì' },
  huagaifengxingguan: { hanzi: '華蓋逢星官', pinyin: 'huágàiféngxīngguān' },
  riyuebingxing: { hanzi: '日月並行', pinyin: 'rìyuèbìngxíng', valence: 'ji' },
  yueqibeishi: { hanzi: '月奇悖師', pinyin: 'yuèqíbèishī' },
  yueqizhuque: { hanzi: '月奇朱雀', pinyin: 'yuèqízhūquè' },
  dabeiruxing: { hanzi: '大悖入刑', pinyin: 'dàbèirùxíng' },
  moushijiucheng: { hanzi: '謀事就成', pinyin: 'móushìjiùchéng' },
  huorutianluo: { hanzi: '火入天羅', pinyin: 'huǒrùtiānluó' },
  huagaibeishi: { hanzi: '華蓋悖師', pinyin: 'huágàibèishī' },
  qinglongzhuanguang: { hanzi: '青龍轉光', pinyin: 'qīnglóngzhuǎnguāng' },
  rendunjige: { hanzi: '人遁吉格', pinyin: 'réndùnjígé', valence: 'ji' },
  xingsuiyuezhuan: { hanzi: '星隨月轉', pinyin: 'xīngsuíyuèzhuǎn' },
  qirutaiyin: { hanzi: '奇入太陰', pinyin: 'qírùtàiyīn' },
  huorugouchen: { hanzi: '火入勾陳', pinyin: 'huǒrùgōuchén' },
  nianyuerishige: { hanzi: '年月日時格', pinyin: 'niányuèrìshígé' },
  zhuqueruyu: { hanzi: '朱雀入獄', pinyin: 'zhūquèrùyù' },
  wushenhuhe: { hanzi: '五神互合', pinyin: 'wǔshénhùhé' },
  quanyuqinglong: { hanzi: '犬遇青龍', pinyin: 'quǎnyùqīnglóng' },
  mushen: { hanzi: '墓神', pinyin: 'mùshén' },
  huobeidihu: { hanzi: '火悖地戶', pinyin: 'huǒbèidìhù' },
  zhuquerumu: { hanzi: '朱雀入墓', pinyin: 'zhūquèrùmù' },
  dihufenggui: { hanzi: '地戶逢鬼', pinyin: 'dìhùféngguǐ' },
  ligefanming: { hanzi: '利格返名', pinyin: 'lìgéfǎnmíng' },
  youhunrumu: { hanzi: '遊魂入墓', pinyin: 'yóuhúnrùmù' },
  diwanggaozhang: { hanzi: '地網高張', pinyin: 'dìwǎnggāozhāng' },
  dixingxuanwu: { hanzi: '地刑玄武', pinyin: 'dìxíngxuánwǔ' },
  taibaitianyifugong: { hanzi: '太白天乙伏宮', pinyin: 'tàibáitiānyǐfúgōng', valence: 'xiong' },
  taibaipengxing: { hanzi: '太白蓬星', pinyin: 'tàibáipéngxīng' },
  tingtingzhige: { hanzi: '亭亭之格', pinyin: 'tíngtíngzhīgé' },
  baihugange: { hanzi: '白虎干格', pinyin: 'báihǔgāngé' },
  kunlongbeishang: { hanzi: '困龍被傷', pinyin: 'kùnlóngbèishāng' },
  ganhebeishi: { hanzi: '干合悖師', pinyin: 'gānhébèishī' },
  yushendeqi: { hanzi: '獄神得奇', pinyin: 'yùshéndéqí' },
  ruyuzixing: { hanzi: '入獄自刑', pinyin: 'rùyùzìxíng' },
  baihuchuli: { hanzi: '白虎出力', pinyin: 'báihǔchūlì' },
  fuyintianting: { hanzi: '伏吟天庭', pinyin: 'fúyíntiāntíng' },
  xiongsheruyu: { hanzi: '凶蛇入獄', pinyin: 'xiōngshérùyù' },
  tianlaohuagai: { hanzi: '天牢華蓋', pinyin: 'tiānláohuágài' },
  xiaoshehualong: { hanzi: '小蛇化龍', pinyin: 'xiǎoshéhuàlóng' },
  xiaosheriqi: { hanzi: '小蛇日奇', pinyin: 'xiǎoshérìqí' },
  shuisheruhuo: { hanzi: '水蛇入火', pinyin: 'shuǐshérùhuǒ' },
  ganheshexing: { hanzi: '干合蛇刑', pinyin: 'gānhéshéxíng' },
  xiongsherumu: { hanzi: '凶蛇入墓', pinyin: 'xiōngshérùmù' },
  taibaiqinshe: { hanzi: '太白擒蛇', pinyin: 'tàibáiqínshé' },
  tengshexiangchan: { hanzi: '螣蛇相纏', pinyin: 'téngshéxiāngchán' },
  sherudiluo: { hanzi: '蛇入地羅', pinyin: 'shérùdìluó' },
  younvjianyin: { hanzi: '幼女奸淫', pinyin: 'yòunǚjiānyín' },
  tianyihuihe: { hanzi: '天乙會合', pinyin: 'tiānyǐhuìhé', valence: 'ji' },
  huagaifengxing: { hanzi: '華蓋逢星', pinyin: 'huágàiféngxīng' },
  huagaidihu: { hanzi: '華蓋地戶', pinyin: 'huágàidìhù' },
  taibairuwang: { hanzi: '太白入網', pinyin: 'tàibáirùwǎng' },
  wanggaitianlao: { hanzi: '網蓋天牢', pinyin: 'wǎnggàitiānláo' },
  fujiantengshe: { hanzi: '復見螣蛇', pinyin: 'fùjiànténgshé' },
  tianwangsizhang: { hanzi: '天網四張', pinyin: 'tiānwǎngsìzhāng' },
  // 《奇門仙機》's 干論, as `stemPairs: xianji` lays it, every name read on
  // the plate of 《御定奇門大全》卷十四 and 卷十六. None carries a fortune: the
  // 干論's prose was not read cell by cell for one, and where it was read it
  // hands the verdict to the gate and the palace — 「再詳門宮生剋以分主客」.
  // 青龍入雲格 is the default's as well, named alike by 《元靈經》 and with no
  // fortune there either.
  qinglongruyunge: { hanzi: '青龍入雲格', pinyin: 'qīnglóngrùyúngé' },
  qinglongdemingge: { hanzi: '青龍得明格', pinyin: 'qīnglóngdémínggé' },
  qinglongrudi: { hanzi: '青龍入地', pinyin: 'qīnglóngrùdì' },
  qinglongxianghe: { hanzi: '青龍相合', pinyin: 'qīnglóngxiānghé' },
  qinglongshishi: { hanzi: '青龍恃勢', pinyin: 'qīnglóngshìshì' },
  qinglongxiangqin: { hanzi: '青龍相侵', pinyin: 'qīnglóngxiāngqīn' },
  qinglongpoyu: { hanzi: '青龍破獄', pinyin: 'qīnglóngpòyù' },
  qizhongfuqige: { hanzi: '奇中伏奇格', pinyin: 'qízhōngfúqígé' },
  qidimingtang: { hanzi: '奇敵明堂', pinyin: 'qídímíngtáng' },
  qizhuyunv: { hanzi: '奇助玉女', pinyin: 'qízhùyùnǚ' },
  rirudixiang: { hanzi: '日入地鄉', pinyin: 'rìrùdìxiāng' },
  qihetaibai: { hanzi: '奇合太白', pinyin: 'qíhétàibái' },
  qishenruyu: { hanzi: '奇神入獄', pinyin: 'qíshénrùyù' },
  qifengluowang: { hanzi: '奇逢羅網', pinyin: 'qíféngluówǎng' },
  yuezhaocanghai: { hanzi: '月照倉海', pinyin: 'yuèzhàocānghǎi' },
  erfengheming: { hanzi: '二鳳和鳴', pinyin: 'èrfènghémíng' },
  xingyuehuiguang: { hanzi: '星月輝光', pinyin: 'xīngyuèhuīguāng' },
  qifengchongsheng: { hanzi: '奇逢重生', pinyin: 'qíféngchóngshēng' },
  qirumingtang: { hanzi: '奇入明堂', pinyin: 'qírùmíngtáng' },
  gengrutaibai: { hanzi: '庚入太白', pinyin: 'gēngrùtàibái' },
  qishenshengtai: { hanzi: '奇神生台', pinyin: 'qíshénshēngtái' },
  shenqiyouhai: { hanzi: '神奇遊海', pinyin: 'shénqíyóuhǎi' },
  qifenghuagai: { hanzi: '奇逢華蓋', pinyin: 'qífénghuágài' },
  qishenheming: { hanzi: '奇神合明', pinyin: 'qíshénhémíng' },
  qishenxiangjiao: { hanzi: '奇神相敎', pinyin: 'qíshénxiāngjiào' },
  yunvchenglong: { hanzi: '玉女乘龍', pinyin: 'yùnǚchénglóng' },
  yunvshien: { hanzi: '玉女施恩', pinyin: 'yùnǚshīēn' },
  yunvxingsha: { hanzi: '玉女刑殺', pinyin: 'yùnǚxíngshā' },
  yunvfuhu: { hanzi: '玉女伏虎', pinyin: 'yùnǚfúhǔ' },
  yunvchenglongyouhai: { hanzi: '玉女乘龍遊海', pinyin: 'yùnǚchénglóngyóuhǎi' },
  rirudihu: { hanzi: '日入地戶', pinyin: 'rìrùdìhù' },
  dihuliguang: { hanzi: '地戶理光', pinyin: 'dìhùlǐguāng' },
  mingtangtansheng: { hanzi: '明堂貪生', pinyin: 'míngtángtānshēng' },
  mingtangconglu: { hanzi: '明堂從祿', pinyin: 'míngtángcónglù' },
  mingtangchongfeng: { hanzi: '明堂重逢', pinyin: 'míngtángchóngféng' },
  mingtangfusha: { hanzi: '明堂伏殺', pinyin: 'míngtángfúshā' },
  tiantingdeshi: { hanzi: '天庭得勢', pinyin: 'tiāntíngdéshì' },
  mingtangbeixing: { hanzi: '明堂被刑', pinyin: 'míngtángbèixíng' },
  mingtanghehuagai: { hanzi: '明堂合華蓋', pinyin: 'míngtánghéhuágài' },
  taibaitanhe: { hanzi: '太白貪合', pinyin: 'tàibáitānhé' },
  taibaiyouen: { hanzi: '太白遊恩', pinyin: 'tàibáiyóuēn' },
  taibaidaxing: { hanzi: '太白大刑', pinyin: 'tàibáidàxíng' },
  taibaichongxing: { hanzi: '太白重刑', pinyin: 'tàibáichóngxíng' },
  taibaituiwei: { hanzi: '太白退位', pinyin: 'tàibáituìwèi' },
  taibaixingrong: { hanzi: '太白刑融', pinyin: 'tàibáixíngróng' },
  tiantingdeming: { hanzi: '天庭得明', pinyin: 'tiāntíngdémíng' },
  baihushoushang: { hanzi: '白虎受傷', pinyin: 'báihǔshòushāng' },
  longhuzhengqiang: { hanzi: '龍虎爭强', pinyin: 'lónghǔzhēngqiáng' },
  huzuomingtang: { hanzi: '虎坐明堂', pinyin: 'hǔzuòmíngtáng' },
  hufengtaibai: { hanzi: '虎逢太白', pinyin: 'hǔféngtàibái' },
  tiantingzili: { hanzi: '天庭自利', pinyin: 'tiāntíngzìlì' },
  tiantingfengyu: { hanzi: '天庭逢獄', pinyin: 'tiāntíngféngyù' },
  hutouluowang: { hanzi: '虎投羅網', pinyin: 'hǔtóuluówǎng' },
  tianlaofuqi: { hanzi: '天牢伏奇', pinyin: 'tiānláofúqí' },
  taiyinpoyu: { hanzi: '太陰破獄', pinyin: 'tàiyīnpòyù' },
  qinglongruyu: { hanzi: '青龍入獄', pinyin: 'qīnglóngrùyù' },
  tiandixingchong: { hanzi: '天地刑冲', pinyin: 'tiāndìxíngchōng' },
  tianlaoyishi: { hanzi: '天牢依勢', pinyin: 'tiānláoyīshì' },
  baihufanyu: { hanzi: '白虎犯獄', pinyin: 'báihǔfànyù' },
  tianlaozixing: { hanzi: '天牢自刑', pinyin: 'tiānláozìxíng' },
  yinyangchongdi: { hanzi: '陰陽重地', pinyin: 'yīnyángchóngdì' },
  ruchenjiudi: { hanzi: '入沉九地', pinyin: 'rùchénjiǔdì' },
  mingtangfanbei: { hanzi: '明堂犯悖', pinyin: 'míngtángfànbèi' },
  huagairumingtang: { hanzi: '華蓋入明堂', pinyin: 'huágàirùmíngtáng' },
  huagaishouen: { hanzi: '華蓋受恩', pinyin: 'huágàishòuēn' },
  tianwangchongfan: { hanzi: '天網冲犯', pinyin: 'tiānwǎngchōngfàn' },
  tianwangyiyu: { hanzi: '天網役獄', pinyin: 'tiānwǎngyìyù' },
  tianwangchongzhang: { hanzi: '天網重張', pinyin: 'tiānwǎngchóngzhāng' },
};

/**
 * The same list at runtime, for the surfaces that have to offer it.
 *
 * A form cannot enumerate a union type, and neither can a command line
 * checking what it was handed. Read off the table rather than written twice,
 * so a configuration added without a fortune fails to compile.
 */
export const PATTERN_IDS: readonly PatternId[] = Object.keys(CONFIGURATIONS) as PatternId[];

/** The fortunes, for a surface that has to offer them all. */
export const VALENCE_IDS: readonly ValenceId[] = Object.keys(VALENCE) as ValenceId[];

/**
 * The fortune of a configuration, without waiting for one to occur.
 *
 * A legend has to name what it is about to show, and a form offering the
 * configurations as criteria has the same problem: 青龍返首 is rare enough
 * that reading the fortune off an occurrence means reading it off a chart
 * that may not have one.
 */
export function valenceOf(id: PatternId): Valence | undefined {
  const valence = CONFIGURATIONS[id].valence;
  return valence === undefined ? undefined : VALENCE[valence];
}

/**
 * The name of a configuration, without waiting for one to occur.
 *
 * The companion of `valenceOf`, and there for the same reason it is: a legend
 * has to write 空亡 before any chart has fallen into it. 青龍返首 occurs too
 * rarely to read its own name off an occurrence.
 */
export function patternName(id: PatternId): { hanzi: string; pinyin: string } {
  const { hanzi, pinyin } = CONFIGURATIONS[id];
  return { hanzi, pinyin };
}

/**
 * A configuration the chart has fallen into.
 *
 * Each is **checkable off the plates**: that a gate stands in a palace whose
 * element it controls is something anyone can verify, and so is the name the
 * tradition gives that. The identifiers stay transliterated for the reason
 * they always were — a name is not a sentence — and the fortune travels as
 * `valence`, an identifier and a glyph, never as prose. The gloss beside it
 * is the surface's business, as every other gloss is.
 */
export interface Pattern {
  id: PatternId;
  hanzi: string;
  /** The name said aloud, e.g. `qīnglóngfǎnshǒu`. */
  pinyin: string;
  /**
   * 吉, 凶, or both, as the sources hand it down. Absent where the text that
   * names the configuration gives it no fortune outright.
   */
  valence?: Valence;
  /** The palace it occurs in. Absent when it is a property of the whole chart. */
  palace?: number;
  /** Which layer it was found on, where more than one can carry it. */
  layer?: 'gate' | 'star' | 'both';
}

/** A configuration, named and weighed from the one table that holds both. */
function mark(
  id: PatternId,
  rest: Omit<Pattern, 'id' | 'hanzi' | 'pinyin' | 'valence'> = {},
): Pattern {
  const { hanzi, pinyin, valence } = CONFIGURATIONS[id];
  return { id, hanzi, pinyin, ...(valence === undefined ? {} : { valence: VALENCE[valence] }), ...rest };
}

/** The palace facing another across the board. The centre faces nothing. */
export function opposite(number: number): number | undefined {
  return number === 5 ? undefined : 10 - number;
}

/**
 * Where each instrument is struck (六儀擊刑).
 *
 * Not arbitrary: each decade is headed by a branch, and the palace is the one
 * belonging to the branch that head punishes — 子 punishes 卯, so the
 * instrument of the decade of 甲子 is struck in the palace of 卯. Two of the
 * six punish themselves, and 寅 punishes 巳, which is why 巽 appears twice.
 */
const STRIKE: Record<string, number> = {
  wu: 3, //   戊, decade of 甲子 — 子刑卯 → 震
  ji: 2, //   己, decade of 甲戌 — 戌刑未 → 坤
  geng: 8, // 庚, decade of 甲申 — 申刑寅 → 艮
  xin: 9, //  辛, decade of 甲午 — 午自刑   → 離
  ren: 4, //  壬, decade of 甲辰 — 辰自刑   → 巽
  gui: 4, //  癸, decade of 甲寅 — 寅刑巳 → 巽
};

/**
 * The palace each stem is buried in (入墓).
 *
 * Only these four appear on a plate and have a tomb named for them. The table
 * is transmitted rather than derived. 丙 and 戊 are here; 乙 and 丁 are the
 * cells texts part on, and each has a parameter of its own.
 *
 * 乙 in 坤 does not agree with the twelve stages, which put the tomb of 乙 at
 * 戌, in the palace of Qian: the 統宗, the 符應經 and 《吉凶格解》 put it in 坤
 * with 甲, and the 秘笈大全's verse and 奇門秘訣's 三璋 in 乾. `yiTomb` says
 * which. 《吉凶格解》's closing summary gives 乙 both, 「乙奇入二六」, and no
 * value lays that.
 *
 * 丁 is 艮 in the 統宗's 四十格, 乾 with 丙 in 《遁甲符應經》: `dingTomb`.
 */
const TOMB: Record<string, number> = {
  bing: 6, //  丙 — 乾
  wu: 6, //    戊 — 乾
};

/** Where 乙 is buried under each reading: 「六乙臨坤」, or 「乙丙臨乾」. */
const YI_TOMB: Record<ChartOptions['yiTomb'], number> = {
  kun: 2,
  qian: 6,
};

/** Where 丁 is buried under each reading: 「丁奇艮宮」, or 「六丁星奇在六宮」. */
const DING_TOMB: Record<ChartOptions['dingTomb'], number> = {
  gen: 8,
  qian: 6,
};

export interface PatternInput {
  earth: ByPalace<Stem>;
  heaven: ByPalace<Stem>;
  stars: ByPalace<Star>;
  gates: ByPalace<Gate>;
  dayStem: Stem;
  hourGanzhi: Ganzhi;
  /** Which palace 丁 is buried in. The caller's to say; nothing here assumes one. */
  dingTomb: ChartOptions['dingTomb'];
  /** Which palace 乙 is buried in, as `dingTomb` says 丁's. */
  yiTomb: ChartOptions['yiTomb'];
  /** Which relation of gate to palace carries the name 門迫. */
  menpo: ChartOptions['menpo'];
  /** What makes a 奇 得使. */
  deshi: ChartOptions['deshi'];
  /** The palace the 值使 gate stands in on the gate plate, which `deshi: zhishi` reads. */
  chiefGateAt: number;
  /** Which table of 十干克應 is laid. The caller's to say, as `dingTomb` is. */
  stemPairs: ChartOptions['stemPairs'];
  /**
   * The centre's stem where it rides the heaven plate with its host's, under
   * `centreStem: host`. A second stem over that palace, read like the first.
   */
  carried?: { palace: number; stem: Stem };
}

/**
 * Every configuration the chart has fallen into.
 *
 * Each is checkable from the plates alone, and each is reported with the
 * palace it happened in wherever that makes sense, and with the fortune its
 * name carries. Nothing here is ranked, ordered, or matched against a
 * question: a chart with six baleful configurations is not a worse chart,
 * because worse is a word about somebody's undertaking and no undertaking is
 * known here.
 *
 * 三奇得使 is laid by the rule `deshi` names: by default the 奇 over the 儀 of
 * one of its two decades, as five transmitted works pair them.
 * 十干克應 is laid by the table `stemPairs` names: by default the fourteen
 * cells the lines name alike, under `jinhan` 《金函玉鏡》's whole table bar one
 * cell. See `STEM_PAIRS`, `JINHAN_PAIRS` and `docs/sources.md`.
 */
export function findPatterns(input: PatternInput): Pattern[] {
  const found: Pattern[] = [];

  found.push(...voidPalaces(input.hourGanzhi));
  // What stands over each palace on the heaven plate: one stem, and a second
  // where the centre's rides with its host's.
  const above = overhead(input.heaven, input.carried);
  found.push(...tombs(above, input.yiTomb, input.dingTomb));
  found.push(...oppressedGates(input.gates, input.menpo));
  found.push(...struckInstruments(input.earth));
  found.push(...stemPairs(input.earth, above, input.stemPairs));
  found.push(...deshi(input.earth, above, input.deshi, input.chiefGateAt));
  found.push(...chanting(input.stars, input.gates));

  if (unmetHour(input.dayStem, input.hourGanzhi)) {
    found.push(mark('wubuyu'));
  }

  return found;
}

/**
 * The palaces of the two branches the hour's decade leaves out (空亡).
 *
 * The decade already knows which two they are; this only says where they sit.
 */
function voidPalaces(hourGanzhi: Ganzhi): Pattern[] {
  const { empty } = decade(hourGanzhi);
  const numbers = new Set(empty.map((branch: Branch) => palaceOfBranch(branch)));
  return [...numbers].map((number) => mark('kongwang', { palace: number }));
}

/** Stems standing in the palace they are buried in (入墓). */
/** Every heaven-plate stem with the palace it stands over, the carried one included. */
function overhead(
  heaven: ByPalace<Stem>,
  carried: PatternInput['carried'],
): { palace: number; stem: Stem }[] {
  const all = Object.entries(heaven).map(([number, stem]) => ({ palace: Number(number), stem }));
  return carried ? [...all, carried] : all;
}

function tombs(
  above: { palace: number; stem: Stem }[],
  yiTomb: ChartOptions['yiTomb'],
  dingTomb: ChartOptions['dingTomb'],
): Pattern[] {
  const found: Pattern[] = [];
  for (const { palace: number, stem } of above) {
    const tomb =
      stem.id === 'ding' ? DING_TOMB[dingTomb] : stem.id === 'yi' ? YI_TOMB[yiTomb] : TOMB[stem.id];
    if (tomb === number) {
      found.push(mark('rumu', { palace: number }));
    }
  }
  return found;
}

/**
 * Gates standing in a palace whose element they control (門迫), or, under
 * `menpo: gongzhimen`, in a palace whose element controls theirs.
 *
 * Derived, not tabulated. The published list — the gates of metal in the
 * palaces of wood, the gate of water in the palace of fire, and so on — is
 * the set this produces, which makes the list a test.
 *
 * The list in 《奇門遁甲統宗》卷一 迫 is eleven of these thirteen: it drops
 * 傷門臨二宮 and 景門臨七宮 while keeping both earth palaces under 杜門 and
 * both wood palaces under 開門 and 驚門, so it is a list two lines short and
 * not a rule two cells narrower. See `docs/sources.md`.
 *
 * Said in terms of `relationOf` rather than of `CONTROLS` directly, because
 * that is what it is: 門迫 is the name and the fortune the tradition attaches
 * to one of the five 門宮 relations, and the palace already reports which of
 * the five it is. Two spellings of one rule could disagree; one cannot.
 *
 * **Which of the two relations of control carries the name is a reading.**
 * 《吉凶格解》 lays thirteen cells on each and names them the other way round,
 * 「門迫宮制門，宮迫門制宮」, so under `gongzhimen` the palace controlling its
 * gate is 門迫 and these thirteen are 宮迫. The relation each palace reports
 * does not move.
 */
function oppressedGates(gates: ByPalace<Gate>, reading: ChartOptions['menpo']): Pattern[] {
  const found: Pattern[] = [];
  for (const [number, gate] of Object.entries(gates)) {
    const here = palace(Number(number));
    const relation = relationOf(palace(gate.home).element, here.element).id;
    // 我剋: the gate controls its palace. 剋我: the palace controls its gate.
    const named =
      reading === 'menzhigong'
        ? relation === 'woke' ? 'menpo' : undefined
        : relation === 'kewo' ? 'menpo' : relation === 'woke' ? 'gongpo' : undefined;
    if (named) found.push(mark(named, { palace: Number(number), layer: 'gate' }));
  }
  return found;
}

/** Instruments standing where their decade's branch is punished (擊刑). */
function struckInstruments(earth: ByPalace<Stem>): Pattern[] {
  const found: Pattern[] = [];
  for (const [number, stem] of Object.entries(earth)) {
    if (STRIKE[stem.id] === Number(number)) {
      found.push(mark('jixing', { palace: Number(number) }));
    }
  }
  return found;
}

/**
 * 十干克應 — the stem above standing over the stem below.
 *
 * The whole table has eighty-one cells, nine stems over nine, and this holds
 * fourteen of the sixteen that `stemPairs: shared` lays: the cells that at
 * least two independent lines name the same way and that 《金函玉鏡》 names so
 * too, laid under `jinhan` as well. The other two are `SHARED_ONLY`. **The rest are not here because the
 * lines name them differently**, so a whole table is one line's and is laid
 * only when a caller asks for that line — `JINHAN_PAIRS` below. Which
 * sources, and what each of these was checked against one by one, is in
 * `docs/sources.md`.
 *
 * Two things the cross-check turned up, both worth knowing before adding to
 * this table:
 *
 * - **The pairing is agreed far more widely than the name.** Every source
 *   consulted marks 庚 over 癸 as a named configuration; the 煙波釣叟歌 and
 *   the Japanese tradition call it 大格, while one modern implementation calls
 *   it 太白沖刑. The same happens for 刑格 and for 戰格. Where the sources
 *   name a pairing differently, the classical verse decides — it is the text
 *   the others descend from — and the divergence is recorded in the sources
 *   document rather than silently resolved.
 * - **One pairing is here under a name its own witnesses disagree about.**
 *   庚 over 壬 was held out for a while as 小格 on one source; it now has
 *   several, and they divide over the couplet rather than over the pairing.
 *   The verse reads 加壬之時為上格 in the Wikisource recension and in the Qing
 *   engraving of 《奇門闡秘前編》, which also grades it — 上格，一名小隔，不宜
 *   出師 — where 《統宗》 and 《奇門遁甲秘笈大全》 quote the same line as
 *   加壬之時為小格. So the rule above, that the verse decides a name, meets
 *   its first case where the verse is transmitted two ways. 上格 is what this
 *   table carries and `docs/sources.md` says what it carries it against.
 *
 * 甲 never appears on a plate — it is concealed by the instrument of its
 * decade — so the verse's 丙加甲 and 甲加丙 are read here as 丙 over 戊 and
 * 戊 over 丙, 戊 being the instrument of 甲子.
 */
const STEM_PAIRS: readonly { above: string; below: string; id: PatternId }[] = [
  // 丙加甲兮鳥跌穴，甲加丙兮龍返首 — 煙波釣叟歌
  { above: 'bing', below: 'wu', id: 'feiniaodiexue' },
  { above: 'wu', below: 'bing', id: 'qinglongfanshou' },
  // 六庚加丙白入熒，六丙加庚熒入白 — 煙波釣叟歌
  { above: 'geng', below: 'bing', id: 'taibairuying' },
  { above: 'bing', below: 'geng', id: 'yingrutaibai' },
  // 庚加癸兮為大格，加己為刑最不宜 — 煙波釣叟歌
  { above: 'geng', below: 'gui', id: 'dage' },
  { above: 'geng', below: 'ji', id: 'xingge' },
  // 加壬之時為上格 — 煙波釣叟歌, in the recension that reads 上格; see above.
  { above: 'geng', below: 'ren', id: 'shangge' },
  // 太白同宮: not in the verse. The tables name it so — 《金函玉鏡》卷二
  // 十干克應訣 and 《神奇之門》 both — and 戰格 is its 又名, which the
  // second states outright: 名為太白同宮，又名戰格.
  { above: 'geng', below: 'geng', id: 'taibaitonggong' },
  // 六癸加丁蛇夭矯，六丁加癸雀投江 — 煙波釣叟歌
  { above: 'gui', below: 'ding', id: 'tengsheyaojiao' },
  { above: 'ding', below: 'gui', id: 'zhuquetoujiang' },
  // 六乙加辛龍逃走，六辛加乙虎猖狂 — 煙波釣叟歌
  { above: 'yi', below: 'xin', id: 'qinglongtaozou' },
  { above: 'xin', below: 'yi', id: 'baihuchangkuang' },
  // Not in the verse either, and here because two lines that never met name
  // them alike and give each a fortune of its own. 青龍耀明 is 《金函玉鏡》's
  // 加丁為青龍耀明，謁貴求名吉利 and 《奇門遁甲元靈經》's 青龍耀明格…必有榮
  // 光之喜, with 《開悟之門》 listing it as its 第三吉格; 日奇入霧 is 被土暗昧
  // against 土木相剋，求事不吉. Both carry a 墓迫 rider, which is the rider
  // 青龍返首 above already ships with.
  { above: 'wu', below: 'ding', id: 'qinglongyaoming' },
  { above: 'yi', below: 'ji', id: 'riqiruwu' },
];

/**
 * Two more cells the default lays, each named alike by two lines and given no
 * fortune by either.
 *
 * Not in `STEM_PAIRS` because 《金函玉鏡》 is one of the lines that parts at
 * the first, and `STEM_PAIRS` is laid under `jinhan` as well. At 戊 over 乙
 * the 仙機's 干論 and 《元靈經》 name 青龍入雲格 where 《金函玉鏡》 names
 * 青龍合靈; at 戊 over 癸 《金函玉鏡》 and 《元靈經》 name 青龍華蓋 where the
 * 干論 names 青龍相合. Every line hands the verdict of both to the gate — 「吉格
 * 者吉招福，門凶多乖」, 「門合星吉則吉」, 「再得三奇、吉門」 — so neither
 * carries a fortune. `docs/sources.md` § "The sixty-seven, read again".
 */
const SHARED_ONLY: readonly { above: string; below: string; id: PatternId }[] = [
  { above: 'wu', below: 'yi', id: 'qinglongruyunge' },
  { above: 'wu', below: 'gui', id: 'qinglonghuagai' },
];

/**
 * The rest of 《金函玉鏡》卷二 十干克應訣, under `stemPairs: jinhan`.
 *
 * That text names all eighty-one cells. Fourteen are `STEM_PAIRS` above, laid
 * under both values and named as that table names them: at 癸 over 丁 the
 * text prints 妖矯 where the verse has 夭矯, which is a variant of one
 * character and not a second name. Sixty-six are here. **戊 over 戊 is not**:
 * the text calls it 伏吟, and this board already reports a 伏吟 that is every
 * star or gate at home, so a stem-pair 伏吟 would print the same two
 * characters meaning two things. Its own sentence gives it no fortune either,
 * 「凡事閉塞靜守為吉」.
 *
 * Read off the plate, 中州古籍 1996 上冊 pp. 30–32, simplified type converted
 * here to the traditional the engine prints. Two readings were settled on the
 * page: 乙 over 癸 is 華蓋逢星官, and 己 over 乙 is 墓神, the edition
 * stopping the sentence there — 「加乙名為墓神。不明，地戶蓬星」. `docs/sources.md`
 * § 十干克應 has the argument, the fortunes and the lines it was set against.
 */
const JINHAN_PAIRS: readonly { above: string; below: string; id: PatternId }[] = [
  { above: 'wu', below: 'yi', id: 'qinglongheling' },
  { above: 'wu', below: 'ji', id: 'guirenruyu' },
  { above: 'wu', below: 'geng', id: 'zhifufeigong' },
  { above: 'wu', below: 'xin', id: 'qinglongzhezu' },
  { above: 'wu', below: 'ren', id: 'qinglongrutianlao' },
  { above: 'wu', below: 'gui', id: 'qinglonghuagai' },
  { above: 'yi', below: 'wu', id: 'liyinhaiyang' },
  { above: 'yi', below: 'yi', id: 'riqifuyin' },
  { above: 'yi', below: 'bing', id: 'qiyishunsui' },
  { above: 'yi', below: 'ding', id: 'qiyixiangzuo' },
  { above: 'yi', below: 'geng', id: 'riqibeixing' },
  { above: 'yi', below: 'ren', id: 'riqirudi' },
  { above: 'yi', below: 'gui', id: 'huagaifengxingguan' },
  { above: 'bing', below: 'yi', id: 'riyuebingxing' },
  { above: 'bing', below: 'bing', id: 'yueqibeishi' },
  { above: 'bing', below: 'ding', id: 'yueqizhuque' },
  { above: 'bing', below: 'ji', id: 'dabeiruxing' },
  { above: 'bing', below: 'xin', id: 'moushijiucheng' },
  { above: 'bing', below: 'ren', id: 'huorutianluo' },
  { above: 'bing', below: 'gui', id: 'huagaibeishi' },
  { above: 'ding', below: 'wu', id: 'qinglongzhuanguang' },
  { above: 'ding', below: 'yi', id: 'rendunjige' },
  { above: 'ding', below: 'bing', id: 'xingsuiyuezhuan' },
  { above: 'ding', below: 'ding', id: 'qirutaiyin' },
  { above: 'ding', below: 'ji', id: 'huorugouchen' },
  { above: 'ding', below: 'geng', id: 'nianyuerishige' },
  { above: 'ding', below: 'xin', id: 'zhuqueruyu' },
  { above: 'ding', below: 'ren', id: 'wushenhuhe' },
  { above: 'ji', below: 'wu', id: 'quanyuqinglong' },
  { above: 'ji', below: 'yi', id: 'mushen' },
  { above: 'ji', below: 'bing', id: 'huobeidihu' },
  { above: 'ji', below: 'ding', id: 'zhuquerumu' },
  { above: 'ji', below: 'ji', id: 'dihufenggui' },
  { above: 'ji', below: 'geng', id: 'ligefanming' },
  { above: 'ji', below: 'xin', id: 'youhunrumu' },
  { above: 'ji', below: 'ren', id: 'diwanggaozhang' },
  { above: 'ji', below: 'gui', id: 'dixingxuanwu' },
  { above: 'geng', below: 'wu', id: 'taibaitianyifugong' },
  { above: 'geng', below: 'yi', id: 'taibaipengxing' },
  { above: 'geng', below: 'ding', id: 'tingtingzhige' },
  { above: 'geng', below: 'xin', id: 'baihugange' },
  { above: 'xin', below: 'wu', id: 'kunlongbeishang' },
  { above: 'xin', below: 'bing', id: 'ganhebeishi' },
  { above: 'xin', below: 'ding', id: 'yushendeqi' },
  { above: 'xin', below: 'ji', id: 'ruyuzixing' },
  { above: 'xin', below: 'geng', id: 'baihuchuli' },
  { above: 'xin', below: 'xin', id: 'fuyintianting' },
  { above: 'xin', below: 'ren', id: 'xiongsheruyu' },
  { above: 'xin', below: 'gui', id: 'tianlaohuagai' },
  { above: 'ren', below: 'wu', id: 'xiaoshehualong' },
  { above: 'ren', below: 'yi', id: 'xiaosheriqi' },
  { above: 'ren', below: 'bing', id: 'shuisheruhuo' },
  { above: 'ren', below: 'ding', id: 'ganheshexing' },
  { above: 'ren', below: 'ji', id: 'xiongsherumu' },
  { above: 'ren', below: 'geng', id: 'taibaiqinshe' },
  { above: 'ren', below: 'xin', id: 'tengshexiangchan' },
  { above: 'ren', below: 'ren', id: 'sherudiluo' },
  { above: 'ren', below: 'gui', id: 'younvjianyin' },
  { above: 'gui', below: 'wu', id: 'tianyihuihe' },
  { above: 'gui', below: 'yi', id: 'huagaifengxing' },
  { above: 'gui', below: 'bing', id: 'huagaibeishi' },
  { above: 'gui', below: 'ji', id: 'huagaidihu' },
  { above: 'gui', below: 'geng', id: 'taibairuwang' },
  { above: 'gui', below: 'xin', id: 'wanggaitianlao' },
  { above: 'gui', below: 'ren', id: 'fujiantengshe' },
  { above: 'gui', below: 'gui', id: 'tianwangsizhang' },
];

/**
 * 《奇門仙機》's 干論, 《御定奇門大全》卷十四 and 卷十六, under `stemPairs: xianji`.
 *
 * A line of its own, naming each cell by an image of the stem above — 戊 the
 * 青龍, 丁 the 玉女, 己 the 明堂, 庚 the 太白, 壬 the 天牢, 癸 the 華蓋 or the
 * 天網. Read on the plate of the woodblock, sheets 359–414, and laid as
 * printed: 青龍相合 stands at two cells, and so do 青龍入地 and 日入地戶. The
 * six names it shares with the verse are the engine's own ids — 龍逃走,
 * 白虎猖狂, 朱雀投江, 螣蛇妖嬌, 太白入熒, 青龍燿明 — and carry the fortune
 * those lines give them.
 *
 * **Seventy-seven cells, and four are not laid**, because the print names
 * nothing there that can be read without guessing: 乙 over 戊 has no entry;
 * 庚 over 辛 has an entry and no name; 庚 over 丁 has none, the run printing
 * 庚加丙 twice, and its second, 太白受制, names no pair in its prose; and
 * 丁 over 乙 has none either — 丁加巳 is the rule of 丁's 遁, and 丁加甲
 * 玉女奇生 says 「丁己」 in its prose. Entries the 干論 conditions on a gate or
 * a palace — 乙加己逢開門, 丙加直符之己 — are not cells and are not laid; nor is
 * its 乙加己 三奇得使, which `deshi` marks on its own rule. Two were settled
 * on the page: 己甲乙 is 己 over 乙, its prose reading 「再詳己乙所臨」, and
 * 丙 over 戊 is 奇逢重生, printed with its 生 twice. `docs/sources.md` §
 * "The 干論 read on the plate", and the cells with their sheets in
 * `texts/qimen/daquan-juan14-16-stems/xianji/cells.tsv`.
 */
const XIANJI_PAIRS: readonly { above: string; below: string; id: PatternId }[] = [
  { above: 'wu', below: 'yi', id: 'qinglongruyunge' }, // 戊加乙 青龍入雲格, 359L
  { above: 'wu', below: 'bing', id: 'qinglongdemingge' }, // 戊加丙 青龍得明格, 359L
  { above: 'wu', below: 'ding', id: 'qinglongyaoming' }, // 戊加丁 青龍燿明, 360R
  { above: 'wu', below: 'wu', id: 'qinglongrudi' }, // 戊加戊 青龍入地, 360R
  { above: 'wu', below: 'ji', id: 'qinglongxianghe' }, // 戊加己 青龍相合, 360L
  { above: 'wu', below: 'geng', id: 'qinglongshishi' }, // 戊加庚 青龍恃勢, 360L
  { above: 'wu', below: 'xin', id: 'qinglongxiangqin' }, // 戊加辛 青龍相侵, 361R
  { above: 'wu', below: 'ren', id: 'qinglongpoyu' }, // 戊加壬 青龍破獄, 361R
  { above: 'wu', below: 'gui', id: 'qinglongxianghe' }, // 戊加癸 青龍相合, 361R
  { above: 'yi', below: 'yi', id: 'qizhongfuqige' }, // 乙加乙 奇中伏奇格, 363L
  { above: 'yi', below: 'bing', id: 'qidimingtang' }, // 乙加丙 奇敵明堂, 364R
  { above: 'yi', below: 'ding', id: 'qizhuyunv' }, // 乙加丁 奇助玉女, 364R
  { above: 'yi', below: 'ji', id: 'rirudixiang' }, // 乙加己 日入地鄉, 364L
  { above: 'yi', below: 'geng', id: 'qihetaibai' }, // 乙加庚 奇合太白, 365R
  { above: 'yi', below: 'xin', id: 'qinglongtaozou' }, // 乙加辛 龍逃走, 365L
  { above: 'yi', below: 'ren', id: 'qishenruyu' }, // 乙加壬 奇神入獄, 366R
  { above: 'yi', below: 'gui', id: 'qifengluowang' }, // 乙加癸 奇逢羅網, 366L
  { above: 'bing', below: 'yi', id: 'yuezhaocanghai' }, // 丙加乙 月照倉海, 395L
  { above: 'bing', below: 'bing', id: 'erfengheming' }, // 丙加丙 二鳳和鳴, 396R
  { above: 'bing', below: 'ding', id: 'xingyuehuiguang' }, // 丙加丁 星月輝光, 396R
  { above: 'bing', below: 'wu', id: 'qifengchongsheng' }, // 丙加戊 奇逢重生生, 396L
  { above: 'bing', below: 'ji', id: 'qirumingtang' }, // 丙加己 奇入明堂, 396L
  { above: 'bing', below: 'geng', id: 'gengrutaibai' }, // 丙加庚 庚入太白, 397R
  { above: 'bing', below: 'xin', id: 'qishenshengtai' }, // 丙加辛 奇神生台, 397L
  { above: 'bing', below: 'ren', id: 'shenqiyouhai' }, // 丙加壬 神奇遊海, 397L
  { above: 'bing', below: 'gui', id: 'qifenghuagai' }, // 丙加癸 奇逢華蓋, 397L
  { above: 'ding', below: 'bing', id: 'qishenheming' }, // 丁加丙 奇神合明, 400L
  { above: 'ding', below: 'ding', id: 'qishenxiangjiao' }, // 丁加丁 奇神相敎, 401R
  { above: 'ding', below: 'wu', id: 'yunvchenglong' }, // 丁加戊 玉女乘龍, 401R
  { above: 'ding', below: 'ji', id: 'yunvshien' }, // 丁加己 玉女施恩, 401R
  { above: 'ding', below: 'geng', id: 'yunvxingsha' }, // 丁加庚 玉女刑殺, 401L
  { above: 'ding', below: 'xin', id: 'yunvfuhu' }, // 丁加辛 玉女伏虎, 401L
  { above: 'ding', below: 'ren', id: 'yunvchenglongyouhai' }, // 丁加壬 玉女乘龍遊海, 402R
  { above: 'ding', below: 'gui', id: 'zhuquetoujiang' }, // 丁加癸 朱雀投江, 402R
  { above: 'ji', below: 'yi', id: 'rirudihu' }, // 己加乙 日入地戶, 404R
  { above: 'ji', below: 'bing', id: 'dihuliguang' }, // 己加丙 地戶理光, 404R
  { above: 'ji', below: 'ding', id: 'mingtangtansheng' }, // 己加丁 明堂貪生, 404L
  { above: 'ji', below: 'wu', id: 'mingtangconglu' }, // 己加戊 明堂從祿, 405R
  { above: 'ji', below: 'ji', id: 'mingtangchongfeng' }, // 己加己 明堂重逢, 405R
  { above: 'ji', below: 'geng', id: 'mingtangfusha' }, // 己加庚 明堂伏殺, 405R
  { above: 'ji', below: 'xin', id: 'tiantingdeshi' }, // 己加辛 天庭得勢, 405L
  { above: 'ji', below: 'ren', id: 'mingtangbeixing' }, // 己加壬 明堂被刑, 405L
  { above: 'ji', below: 'gui', id: 'mingtanghehuagai' }, // 己加癸 明堂合華蓋, 405L
  { above: 'geng', below: 'yi', id: 'taibaitanhe' }, // 庚加乙 太白貪合, 406L
  { above: 'geng', below: 'bing', id: 'taibairuying' }, // 庚加丙 太白入熒, 406L
  { above: 'geng', below: 'wu', id: 'taibaiyouen' }, // 庚加戊 太白遊恩, 407R
  { above: 'geng', below: 'ji', id: 'taibaidaxing' }, // 庚加己 太白大刑, 407R
  { above: 'geng', below: 'geng', id: 'taibaichongxing' }, // 庚加庚 太白重刑, 407L
  { above: 'geng', below: 'ren', id: 'taibaituiwei' }, // 庚加壬 太白退位, 407L
  { above: 'geng', below: 'gui', id: 'taibaixingrong' }, // 庚加癸 太白刑融, 408R
  { above: 'xin', below: 'yi', id: 'baihuchangkuang' }, // 辛加乙 白虎猖狂, 408L
  { above: 'xin', below: 'bing', id: 'tiantingdeming' }, // 辛加丙 天庭得明, 409R
  { above: 'xin', below: 'ding', id: 'baihushoushang' }, // 辛加丁 白虎受傷, 409R
  { above: 'xin', below: 'wu', id: 'longhuzhengqiang' }, // 辛加戊 龍虎爭强, 409L
  { above: 'xin', below: 'ji', id: 'huzuomingtang' }, // 辛加己 虎坐明堂, 409L
  { above: 'xin', below: 'geng', id: 'hufengtaibai' }, // 辛加庚 虎逢太白, 409L
  { above: 'xin', below: 'xin', id: 'tiantingzili' }, // 辛加辛 天庭自利, 410R
  { above: 'xin', below: 'ren', id: 'tiantingfengyu' }, // 辛加壬 天庭逢獄, 410R
  { above: 'xin', below: 'gui', id: 'hutouluowang' }, // 辛加癸 虎投羅網, 410R
  { above: 'ren', below: 'yi', id: 'rirudihu' }, // 壬加乙 日入地戶, 411R
  { above: 'ren', below: 'bing', id: 'tianlaofuqi' }, // 壬加丙 天牢伏奇, 411R
  { above: 'ren', below: 'ding', id: 'taiyinpoyu' }, // 壬加丁 太陰破獄, 411R
  { above: 'ren', below: 'wu', id: 'qinglongruyu' }, // 壬加戊 青龍入獄, 411L
  { above: 'ren', below: 'ji', id: 'tiandixingchong' }, // 壬加己 天地刑冲, 411L
  { above: 'ren', below: 'geng', id: 'tianlaoyishi' }, // 壬加庚 天牢依勢, 411L
  { above: 'ren', below: 'xin', id: 'baihufanyu' }, // 壬加辛 白虎犯獄, 411L
  { above: 'ren', below: 'ren', id: 'tianlaozixing' }, // 壬加壬 天牢自刑, 412R
  { above: 'ren', below: 'gui', id: 'yinyangchongdi' }, // 壬加癸 陰陽重地, 412R
  { above: 'gui', below: 'yi', id: 'ruchenjiudi' }, // 癸加乙 入沉九地, 412L
  { above: 'gui', below: 'bing', id: 'mingtangfanbei' }, // 癸加丙 明堂犯悖, 413R
  { above: 'gui', below: 'ding', id: 'tengsheyaojiao' }, // 癸加丁 螣蛇妖嬌, 413R
  { above: 'gui', below: 'wu', id: 'qinglongrudi' }, // 癸加戊 青龍入地, 413L
  { above: 'gui', below: 'ji', id: 'huagairumingtang' }, // 癸加己 華蓋入明堂, 413L
  { above: 'gui', below: 'geng', id: 'huagaishouen' }, // 癸加庚 華蓋受恩, 413L
  { above: 'gui', below: 'xin', id: 'tianwangchongfan' }, // 癸加辛 天網冲犯, 414R
  { above: 'gui', below: 'ren', id: 'tianwangyiyu' }, // 癸加壬 天網役獄, 414R
  { above: 'gui', below: 'gui', id: 'tianwangchongzhang' }, // 癸加癸 天網重張, 414R
];

/** The cells each table lays, keyed by the value of `stemPairs` that lays it. */
const STEM_PAIR_TABLES: Record<
  ChartOptions['stemPairs'],
  readonly { above: string; below: string; id: PatternId }[]
> = {
  shared: [...STEM_PAIRS, ...SHARED_ONLY],
  jinhan: [...STEM_PAIRS, ...JINHAN_PAIRS],
  xianji: XIANJI_PAIRS,
};

/**
 * The configurations a table of 十干克應 can lay, for a surface that offers
 * them as criteria only where the board asked about can carry them.
 */
export function stemPairIds(table: ChartOptions['stemPairs']): readonly PatternId[] {
  return [...new Set(STEM_PAIR_TABLES[table].map((pair) => pair.id))];
}

/** Every configuration some table of 十干克應 lays, whichever is in force. */
export const STEM_PAIR_IDS: readonly PatternId[] = [
  ...new Set(Object.values(STEM_PAIR_TABLES).flatMap((pairs) => pairs.map((pair) => pair.id))),
];

function stemPairs(
  earth: ByPalace<Stem>,
  overhead: { palace: number; stem: Stem }[],
  table: ChartOptions['stemPairs'],
): Pattern[] {
  const pairs = STEM_PAIR_TABLES[table];
  const found: Pattern[] = [];
  for (const { palace: number, stem: above } of overhead) {
    // The centre is left out: the turn neither moves it nor reaches it, so
    // its heaven stem is its earth stem by construction. A pairing is the
    // stem the plate brought standing over the one below, and nothing is
    // brought to the centre — counting it would make 戰格 a fixture of every
    // ju that seats 庚 there, one hour in each, all term long.
    if (number === 5) continue;
    const below = earth[number] as Stem;
    for (const pair of pairs) {
      if (above.id === pair.above && below.id === pair.below) {
        found.push(mark(pair.id, { palace: number }));
      }
    }
  }
  return found;
}

/** The 儀 of the two decades each 奇 is 使 for: 「甲戌甲午乙為使…」. */
const DESHI: Record<string, readonly string[]> = {
  yi: ['ji', 'xin'], //   乙 — 甲戌己, 甲午辛
  bing: ['wu', 'geng'], // 丙 — 甲子戊, 甲申庚
  ding: ['ren', 'gui'], // 丁 — 甲辰壬, 甲寅癸
};

/**
 * A 奇 that has its 使 (三奇得使).
 *
 * Under `liuyi` the 奇 above stands over one of the two 儀 it is paired with,
 * the centre left out as it is for every stem over a stem. Under `zhishi` the
 * 奇 above stands in the palace the 值使 gate stands in, whatever is below.
 */
function deshi(
  earth: ByPalace<Stem>,
  overhead: { palace: number; stem: Stem }[],
  rule: ChartOptions['deshi'],
  chiefGateAt: number,
): Pattern[] {
  const found: Pattern[] = [];
  for (const { palace: number, stem: above } of overhead) {
    const paired = DESHI[above.id];
    if (paired === undefined || number === 5) continue;
    const met =
      rule === 'liuyi' ? paired.includes((earth[number] as Stem).id) : number === chiefGateAt;
    if (met) found.push(mark('sanqideshi', { palace: number }));
  }
  return found;
}

/**
 * Whether the whole board has come home, or turned to face itself.
 *
 * 伏吟 is every gate or star standing in the palace it belongs to; 反吟 is
 * every one standing in the palace facing it. The centre is left out of the
 * count: it faces nothing, and its star never moves.
 */
function chanting(stars: ByPalace<Star>, gates: ByPalace<Gate>): Pattern[] {
  const gateEntries = Object.entries(gates);
  const starEntries = Object.entries(stars).filter(([number]) => Number(number) !== 5);

  const gatesHome = gateEntries.every(([number, gate]) => gate.home === Number(number));
  const starsHome = starEntries.every(([number, star]) => star.home === Number(number));
  const gatesFacing = gateEntries.every(([number, gate]) => opposite(gate.home) === Number(number));
  const starsFacing = starEntries.every(([number, star]) => opposite(star.home) === Number(number));

  const found: Pattern[] = [];
  if (gatesHome || starsHome) {
    found.push(mark('fuyin', { layer: layerOf(gatesHome, starsHome) }));
  }
  if (gatesFacing || starsFacing) {
    found.push(mark('fanyin', { layer: layerOf(gatesFacing, starsFacing) }));
  }
  return found;
}

function layerOf(gate: boolean, star: boolean): 'gate' | 'star' | 'both' {
  return gate && star ? 'both' : gate ? 'gate' : 'star';
}

/**
 * The hour that does not meet (五不遇時): the hour's stem controls the day's,
 * and the two share a polarity.
 *
 * The rule and the transmitted list of ten pairings — 甲日庚午時, 乙日辛巳時,
 * and so on — are the same thing said twice, so the list is a test of the
 * rule rather than data beside it.
 */
export function unmetHour(dayStem: Stem, hourGanzhi: Ganzhi): boolean {
  const hourStem = hourGanzhi.stem;
  return CONTROLS[hourStem.element] === dayStem.element && hourStem.yang === dayStem.yang;
}

