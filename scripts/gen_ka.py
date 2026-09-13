# ASCII-only generator. Georgian is built with chr().
from pathlib import Path

M = {
    "a": 0x10D0,
    "b": 0x10D1,
    "g": 0x10D2,
    "d": 0x10D3,
    "e": 0x10D4,
    "v": 0x10D5,
    "z": 0x10D6,
    "T": 0x10D7,
    "i": 0x10D8,
    "k": 0x10D9,
    "l": 0x10DA,
    "m": 0x10DB,
    "n": 0x10DC,
    "o": 0x10DD,
    "p": 0x10DE,
    "J": 0x10DF,
    "r": 0x10E0,
    "s": 0x10E1,
    "t": 0x10E2,
    "u": 0x10E3,
    "f": 0x10E4,
    "q": 0x10E5,
    "R": 0x10E6,
    "y": 0x10E7,
    "S": 0x10E8,
    "C": 0x10E9,
    "c": 0x10EA,
    "Z": 0x10EB,
    "w": 0x10EC,
    "W": 0x10ED,
    "x": 0x10EE,
    "j": 0x10EF,
    "h": 0x10F0,
}


def g(s: str) -> str:
    return "".join(chr(M[ch]) if ch in M else ch for ch in s)


def js(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")


lines = []
A = lines.append
A('import type { Messages } from "./messages";')
A("")
A("export const ka: Messages = {")
A(f'  brand: "{js(g("kursi"))}",')
A('  brandEn: "Kursi",')
A("  nav: {")
A(f'    home: "{js(g("mTavari"))}",')
A(f'    rates: "{js(g("kursebi"))}",')
A(f'    about: "{js(g("Cvens Sesaxeb"))}",')
A(f'    contact: "{js(g("kontaqti"))}",')
A(f'    login: "{js(g("Sesvla"))}",')
A(f'    register: "{js(g("registracia"))}",')
A(f'    dashboard: "{js(g("kabineti"))}",')
A(f'    menu: "{js(g("meniu"))}",')
A("  },")
A("  footer: {")
A(
    f'    tagline: "{js(g("valutis gacvlis marketpleisi saqarTvelos bazrisTvis. kompaniebi aqveyneben kurs, klientebi irCeven saukeTesos."))}",'
)
A(f'    legal: "{js(g("samarTlebrivi"))}",')
A(f'    terms: "{js(g("wesebi da pirobebi"))}",')
A(f'    privacy: "{js(g("konfidencialuroba"))}",')
A(f'    contact: "{js(g("kontaqti"))}",')
A(f'    copyright: "{js("© {year} " + g("kursi. yvela ufleba daculia."))}",')
A(f'    madeIn: "{js(g("Seqmnilia TbilisSi"))}",')
A("  },")
A("  home: {")
A(f'    kicker: "{js(g("saqarTvelos valutis marketpleisi"))}",')
A(f'    title: "{js(g("Seadare kursi. gacvale ndobiT."))}",')
A(
    f'    body: "{js(g("klientebi xedaven yvela damtkicebuli organizaciis kurs, irCeven erTs da agzavnian moTxovnas. kompania adasturebs an uaryofs. orive mxare iRebs srul informacias."))}",'
)
A(f'    ctaRates: "{js(g("kursebis naxva"))}",')
A(f'    ctaRegister: "{js(g("awyeba"))}",')
A(f'    howTitle: "{js(g("rogor muSaobs"))}",')
A(f'    how1t: "{js(g("daaregistrire angariSi"))}",')
A(
    f'    how1d: "{js(g("klienti an kompania. kompanias admini amtkicebs gamoqveynebamde."))}",'
)
A(f'    how2t: "{js(g("Seitane Tanxa da airCie kursi"))}",')
A(
    f'    how2d: "{js(g("depoziti jerjerobiT xeliT Seiyvaneba. mogvianebiT daemateba gadaxdis sistemebi."))}",'
)
A(f'    how3t: "{js(g("moTxovna da dadastureba"))}",')
A(
    f'    how3d: "{js(g("kompania iRebs Setyobinebas. dadasturebis Semdeg orive xedavs garigebis detalebs."))}",'
)
A('    stat1: "8",')
A(f'    stat1l: "{js(g("valuta"))}",')
A('    stat2: "3",')
A(f'    stat2l: "{js(g("ena"))}",')
A(f'    stat3: "{js("15" + g("wT"))}",')
A(f'    stat3l: "{js(g("kotirebis vada"))}",')
A(f'    marketTitle: "{js(g("qarTuli bazrisTvis"))}",')
A(
    f'    marketBody: "{js(g("kursebi naCvenebia larTan mimarTebiT, rogorc Tbilisis gadamcvlel punqtebSi. rubli iTvleba 100 erTeulze. platforma aris Suamavali: gacvlas asrulebs registrirebuli kompania."))}",'
)
A("  },")
A("  about: {")
A(f'    title: "{js(g("Cvens Sesaxeb"))}",')
A(
    f'    body1: "{js(g("kursi aris cifruli moedani, sadac valutis gadamcvleli kompaniebi aqveyneben yidva-gayidvis kurs, xolo klientebi adareben SeTavazebs da agzavnian gacvlis moTxovnas."))}",'
)
A(
    f'    body2: "{js(g("Cven ar varT banki da ar varT erovnuli bankis mier licenzirebuli gadamcvleli punqti. realur gacvlas asrulebs damtkicebuli kompania. unagdo gacvla saqarTveloSi damatebiT regulacias eqvemdebareba."))}",'
)
A(
    f'    body3: "{js(g("pirvel versiaSi depoziti da gatana xeliT Seiyvaneba. es Sida aRricxvaa, ara sagadaxdo sistema. Semdeg etapze daemateba qarTuli gadaxdebi."))}",'
)
A("  },")
A("  contact: {")
A(f'    title: "{js(g("kontaqti"))}",')
A(
    f'    body: "{js(g("kiTxva, partnioroba an mxardacera") + " — " + g("mogwwereT. gipasuxebT samuSao saaTebSi."))}",'
)
A(f'    name: "{js(g("saxeli"))}",')
A(f'    email: "{js(g("elfosta"))}",')
A(f'    message: "{js(g("Setyobineba"))}",')
A(f'    send: "{js(g("dagzavna"))}",')
A(f'    sent: "{js(g("Setyobineba gaigzavna. gmadlobT."))}",')
A("  },")
terms = "\n\n".join(
    [
        g("1. platforma. kursi aris sainformacio da Suamavlobis servisi. Cven vakavSirebT klientebs da valutis gadamcvlel kompaniebs."),
        g("2. mxareebi. klienti da kompania Tavad arian pasuxismgebeli gacvlis kanonierebaze, identifikaciasa da ")
        + "AML/CFT "
        + g("moTxovnebze. kompaniam unda iyos uflebamosili saqarTvelos kanonmdeblobit."),
        g("3. kursebi. gamoqveynebuli kursi aris kompaniis SeTavazeba. moTxovna 15 wutiT iketeba. kompanias SeuZlia daadasturos an uaryos."),
        g("4. balans. am versiaSi depoziti aris xeliT Seyvanili ricxvi da ar niSnavs realur fulis miRebas an Senaxvas platformis mier."),
        g("5. uari pasuxismgeblobaze. platforma ar iZleva garantias kuris sargeblianobaze an kompaniis mier valdebulebis Sesrulebaze. dava wydeba mxareebs Soris."),
        g("6. angariSi. Tqven valdebuli xarT miuTitoT swori monacemebi. admins SeuZlia angariSis an kompaniis SeCereba."),
        g("7. samarTali. gamoiyeneba saqarTvelos kanonmdebloba. davebis ganxilvis adgilia Tbilisi."),
    ]
)
A("  terms: {")
A(f'    title: "{js(g("wesebi da pirobebi"))}",')
A(f'    updated: "{js(g("ganaxlda 2026 wlis seqtemberSi"))}",')
A(f'    body: "{js(terms)}",')
A("  },")
privacy = "\n\n".join(
    [
        g("Cven vagrovebT saxels, elfostas, telefons, kompaniis rekvizitebs, balansis da gacvlis historias servisis muSaobisTvis."),
        g("monacemebi inaxeba") + " Supabase-" + g("Si. ar vyidiT personalur monacemebs."),
        g("dadasturebuli gacvlis Semdeg mxareebi xedaven erTmaneTis sakontaqto informacias garisgebis dasasruleb lad."),
        g("SegiZliaT moiTxovoT angariSis waSla")
        + " hello@kursi.ge-"
        + g("ze. kanoniT gaTvaliswinebuli aRricxva SeiZleba SevinarCunoT vadiT."),
    ]
)
A("  privacy: {")
A(f'    title: "{js(g("konfidencialurobis politika"))}",')
A(f'    updated: "{js(g("ganaxlda 2026 wlis seqtemberSi"))}",')
A(f'    body: "{js(privacy)}",')
A("  },")
A("  rates: {")
A(f'    title: "{js(g("organizaciebis kursebi"))}",')
A(
    f'    body: "{js(g("yidva") + " — " + g("kompania yidulobs ucxour valutas Tqvengan. gayidva") + " — " + g("kompania gyidiT ucxour valutas."))}",'
)
A(f'    company: "{js(g("kompania"))}",')
A(f'    city: "{js(g("qalaqi"))}",')
A(f'    buy: "{js(g("yidva"))}",')
A(f'    sell: "{js(g("gayidva"))}",')
A(f'    updated: "{js(g("ganaxlda"))}",')
A(f'    exchange: "{js(g("gacvla"))}",')
A(
    f'    empty: "{js(g("jer arc erTi damtkicebuli kompania ar aqveynebs kurs."))}",'
)
A(f'    bestBuy: "{js(g("saukeTeso yidva"))}",')
A(f'    bestSell: "{js(g("saukeTeso gayidva"))}",')
A(f'    filterCurrency: "{js(g("valuta"))}",')
A(f'    allCurrencies: "{js(g("yvela"))}",')
A(f'    sort: "{js(g("dalageba"))}",')
A(f'    sortBuy: "{js(g("saukeTeso yidva"))}",')
A(f'    sortSell: "{js(g("saukeTeso gayidva"))}",')
A(f'    sortCompany: "{js(g("kompania"))}",')
A(f'    sortUpdated: "{js(g("ganaxleba"))}",')
A(f'    filterEmpty: "{js(g("am valutaze kursi ar aris."))}",')
A("  },")
A("  auth: {")
A(f'    loginTitle: "{js(g("angariSSi Sesvla"))}",')
A(f'    registerTitle: "{js(g("registracia"))}",')
A(f'    email: "{js(g("elfosta"))}",')
A(f'    password: "{js(g("paroli"))}",')
A(f'    fullName: "{js(g("saxeli da gvari"))}",')
A(f'    phone: "{js(g("telefoni"))}",')
A(f'    companyName: "{js(g("kompaniis saxeli"))}",')
A(f'    role: "{js(g("angariSis tipi"))}",')
A(f'    roleClient: "{js(g("klienti"))}",')
A(f'    roleCompany: "{js(g("gadamcvleli kompania"))}",')
A(f'    submitLogin: "{js(g("Sesvla"))}",')
A(f'    submitRegister: "{js(g("Seqmna"))}",')
A(f'    noAccount: "{js(g("ar gaqvT angariSi?"))}",')
A(f'    hasAccount: "{js(g("ukve gaqvT angariSi?"))}",')
A(f'    checkEmail: "{js(g("SeamowmeT elfosta dasadastureblad."))}",')
A(
    f'    emailNotConfirmed: "{js(g("elfosta jer ar aris dadasturebuli. gauSviT ") + "supabase/confirm_emails.sql" + g(" da Semdeg SemoidiT."))}",'
)
A(
    f'    rateLimit: "{js(g("Zalian bevri registraciis werili. dailodeT, an gauSviT ") + "supabase/confirm_emails.sql" + g(" da SemoidiT arsebuli angariSiT."))}",'
)
A("  },")
A("  app: {")
A(f'    overview: "{js(g("mimoxilva"))}",')
A(f'    wallet: "{js(g("safule"))}",')
A(f'    exchange: "{js(g("gacvla"))}",')
A(f'    requests: "{js(g("moTxovnebi"))}",')
A(f'    stats: "{js(g("statistika"))}",')
A(f'    rates: "{js(g("kursebi"))}",')
A(f'    profile: "{js(g("profili"))}",')
A(f'    logout: "{js(g("gasvla"))}",')
A(f'    notifications: "{js(g("Setyobinebebi"))}",')
A(f'    markRead: "{js(g("wakiTxulad"))}",')
A(f'    noNotifications: "{js(g("Setyobineba ar aris"))}",')
A(
    f'    pendingBanner: "{js(g("kompania elodeba adminis dadasturebas. kursebs sajarod ver gamoaqveynebT, sanam ar dagamtkiceben."))}",'
)
A(
    f'    rejectedBanner: "{js(g("kompaniis ganacxadi uaryofilia an SeCerebulia. dagvikavSirdiT."))}",'
)
A("  },")
A("  wallet: {")
A(f'    title: "{js(g("safule"))}",')
A(f'    available: "{js(g("xelmisawvdomi"))}",')
A(f'    reserved: "{js(g("dajavSnili"))}",')
A(f'    deposit: "{js(g("Setana"))}",')
A(f'    withdraw: "{js(g("gatana"))}",')
A(f'    amount: "{js(g("tanxa"))}",')
A(f'    currency: "{js(g("valuta"))}",')
A(f'    history: "{js(g("istoria"))}",')
A(f'    empty: "{js(g("balansi carielia. SeitaneT Tanxa dasawyebad."))}",')
A(f'    confirmDeposit: "{js(g("tanxis Setana"))}",')
A(f'    confirmWithdraw: "{js(g("tanxis gatana"))}",')
A("  },")
A("  wizard: {")
A(f'    title: "{js(g("gacvlis moTxovna"))}",')
A(f'    step1: "{js(g("valuta"))}",')
A(f'    step2: "{js(g("kompania"))}",')
A(f'    step3: "{js(g("dadastureba"))}",')
A(f'    from: "{js(g("gascemT"))}",')
A(f'    to: "{js(g("miiRebT"))}",')
A(f'    amount: "{js(g("tanxa"))}",')
A(f'    company: "{js(g("kompania"))}",')
A(f'    note: "{js(g("SeniSvna (arasavaldebulo)"))}",')
A(f'    review: "{js(g("SeamowmeT kotireba"))}",')
A(f'    youGive: "{js(g("Tqven gascemT"))}",')
A(f'    youGet: "{js(g("Tqven miiRebT"))}",')
A(f'    rate: "{js(g("kursi"))}",')
A(f'    submit: "{js(g("moTxovnis gagzavna"))}",')
A(f'    back: "{js(g("ukan"))}",')
A(f'    next: "{js(g("Semdegi"))}",')
A(f'    gelOnly: "{js(g("am versiaSi erT-erTi valuta unda iyos lari."))}",')
A("  },")
A("  request: {")
A(f'    code: "{js(g("kodi"))}",')
A(f'    status: "{js(g("statusi"))}",')
A(f'    created: "{js(g("Seqmna"))}",')
A(f'    expires: "{js(g("vada"))}",')
A(f'    confirm: "{js(g("dadastureba"))}",')
A(f'    reject: "{js(g("uaryofa"))}",')
A(f'    cancel: "{js(g("gauqmeba"))}",')
A(f'    reason: "{js(g("mizezi"))}",')
A(f'    details: "{js(g("garigebis detalebi"))}",')
A(f'    empty: "{js(g("moTxovnebi jer ar aris."))}",')
A(f'    counterpart: "{js(g("meore mxare"))}",')
A(f'    pending: "{js(g("molodinSi"))}",')
A(f'    confirmed: "{js(g("dadasturebuli"))}",')
A(f'    rejected: "{js(g("uaryofili"))}",')
A(f'    cancelled: "{js(g("gauqmebuli"))}",')
A(f'    expired: "{js(g("vadagasuli"))}",')
A("  },")
A("  company: {")
A(f'    profileTitle: "{js(g("kompaniis profili"))}",')
A(f'    nameKa: "{js(g("saxeli (qarTuli)"))}",')
A(f'    nameEn: "{js(g("saxeli (inglisuri)"))}",')
A(f'    nameRu: "{js(g("saxeli (rusuli)"))}",')
A(f'    descKa: "{js(g("aRwera"))}",')
A(f'    city: "{js(g("qalaqi"))}",')
A(f'    address: "{js(g("misamarTi"))}",')
A(f'    nbg: "{js(g("erovnuli bankis registraciis nomeri"))}",')
A(f'    save: "{js(g("Senaxva"))}",')
A(f'    saved: "{js(g("Senaxulia"))}",')
A(f'    ratesTitle: "{js(g("Tqveni kursebi"))}",')
A(f'    buyRate: "{js(g("yidvis kursi"))}",')
A(f'    sellRate: "{js(g("gayidvis kursi"))}",')
A(f'    min: "{js(g("min. (FX)"))}",')
A(f'    max: "{js(g("max. (FX)"))}",')
A(f'    active: "{js(g("aqtiuri"))}",')
A(f'    addRate: "{js(g("kuris damateba"))}",')
A(f'    nextTitle: "{js(g("dasawyebi nabijebi"))}",')
A(f'    nextRates: "{js(g("daamateT yidvis da gayidvis kursebi"))}",')
A(f'    nextWallet: "{js(g("SeitaneT valuta safuleSi"))}",')
A(f'    nextProfile: "{js(g("SeavseT kompaniis profili"))}",')
A(
    f'    missingCompany: "{js(g("kompaniis Canaweri jer ar Seiqmna. gauSviT ") + "SQL" + g(" sqema da gadatvirTeT gverdi."))}",'
)
A("  },")
A("  stats: {")
A(f'    title: "{js(g("statistika"))}",')
A(f'    volume: "{js(g("brunva"))}",')
A(f'    requests: "{js(g("moTxovnebi"))}",')
A(f'    confirmed: "{js(g("dadasturebuli"))}",')
A(f'    rejected: "{js(g("uaryofili"))}",')
A(f'    pending: "{js(g("molodinSi"))}",')
A(f'    wallets: "{js(g("safuleebi"))}",')
A("  },")
A("  admin: {")
A(f'    title: "{js(g("admini"))}",')
A(f'    users: "{js(g("momxmareblebi"))}",')
A(f'    companies: "{js(g("kompaniebi"))}",')
A(f'    requests: "{js(g("tranzaqciebi"))}",')
A(f'    ledger: "{js(g("lejeri"))}",')
A(f'    messages: "{js(g("Setyobinebebi"))}",')
A(f'    settings: "{js(g("parametrebi"))}",')
A(f'    translations: "{js(g("teqstebi"))}",')
A(f'    approve: "{js(g("damtkiceba"))}",')
A(f'    suspend: "{js(g("SeCereba"))}",')
A(f'    reject: "{js(g("uaryofa"))}",')
A(f'    makeAdmin: "{js(g("adminad daniSvna"))}",')
A("  },")
A("  common: {")
A(f'    save: "{js(g("Senaxva"))}",')
A(f'    cancel: "{js(g("gauqmeba"))}",')
A(f'    loading: "{js(g("itvirTeba") + "…")}",')
A(f'    error: "{js(g("Secdoma"))}",')
A(f'    success: "{js(g("warmateba"))}",')
A(f'    back: "{js(g("ukan"))}",')
A(f'    view: "{js(g("naxva"))}",')
A(f'    all: "{js(g("yvela"))}",')
A(f'    search: "{js(g("Zieba"))}",')
A("  },")
A("  errors: {")
A(f'    generic: "{js(g("RaRac arasworad wavida. cadet Tavidan."))}",')
A(f'    auth: "{js(g("elfosta an paroli arasworia."))}",')
A(f'    insufficient: "{js(g("arasakmarisi balansi."))}",')
A(
    f'    companyFunds: "{js(g("kompanias ar aqvs sakmarisi valuta dasadastureblad."))}",'
)
A(f'    rateMissing: "{js(g("am wyvilze kursi ar aris."))}",')
A(f'    notPending: "{js(g("moTxovna aRar aris molodinSi."))}",')
A(
    f'    belowMin: "{js(g("tanxa naklebia kompaniis minimumze am valutaze."))}",'
)
A(
    f'    aboveMax: "{js(g("tanxa metia kompaniis maksimumze am valutaze."))}",'
)
A("  },")
A("};")
A("")

out = Path(__file__).resolve().parents[1] / "src" / "i18n" / "ka.ts"
out.write_text("\n".join(lines) + "\n", encoding="utf-8")
print("wrote", out, "chars", out.stat().st_size)
