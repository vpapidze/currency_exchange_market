import type { Locale } from "@/lib/i18n";
import { ka } from "./ka";
export { ka };

export type Messages = {
  brand: string;
  brandEn: string;
  nav: {
    home: string;
    rates: string;
    about: string;
    contact: string;
    login: string;
    register: string;
    dashboard: string;
    menu: string;
  };
  footer: {
    tagline: string;
    legal: string;
    terms: string;
    privacy: string;
    contact: string;
    copyright: string;
    madeIn: string;
  };
  home: {
    kicker: string;
    title: string;
    body: string;
    ctaRates: string;
    ctaRegister: string;
    howTitle: string;
    how1t: string;
    how1d: string;
    how2t: string;
    how2d: string;
    how3t: string;
    how3d: string;
    stat1: string;
    stat1l: string;
    stat2: string;
    stat2l: string;
    stat3: string;
    stat3l: string;
    marketTitle: string;
    marketBody: string;
  };
  about: {
    title: string;
    body1: string;
    body2: string;
    body3: string;
  };
  contact: {
    title: string;
    body: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sent: string;
  };
  terms: { title: string; updated: string; body: string };
  privacy: { title: string; updated: string; body: string };
  rates: {
    title: string;
    body: string;
    company: string;
    city: string;
    buy: string;
    sell: string;
    updated: string;
    exchange: string;
    empty: string;
    bestBuy: string;
    bestSell: string;
    filterCurrency: string;
    allCurrencies: string;
    sort: string;
    sortBuy: string;
    sortSell: string;
    sortCompany: string;
    sortUpdated: string;
    filterEmpty: string;
  };
  auth: {
    loginTitle: string;
    registerTitle: string;
    email: string;
    password: string;
    fullName: string;
    phone: string;
    companyName: string;
    role: string;
    roleClient: string;
    roleCompany: string;
    submitLogin: string;
    submitRegister: string;
    noAccount: string;
    hasAccount: string;
    checkEmail: string;
    emailNotConfirmed: string;
    rateLimit: string;
  };
  app: {
    overview: string;
    wallet: string;
    exchange: string;
    requests: string;
    stats: string;
    rates: string;
    profile: string;
    logout: string;
    notifications: string;
    markRead: string;
    noNotifications: string;
    pendingBanner: string;
    rejectedBanner: string;
  };
  wallet: {
    title: string;
    available: string;
    reserved: string;
    deposit: string;
    withdraw: string;
    amount: string;
    currency: string;
    history: string;
    empty: string;
    confirmDeposit: string;
    confirmWithdraw: string;
  };
  wizard: {
    title: string;
    step1: string;
    step2: string;
    step3: string;
    from: string;
    to: string;
    amount: string;
    company: string;
    note: string;
    review: string;
    youGive: string;
    youGet: string;
    rate: string;
    submit: string;
    back: string;
    next: string;
    gelOnly: string;
  };
  request: {
    code: string;
    status: string;
    created: string;
    expires: string;
    confirm: string;
    reject: string;
    cancel: string;
    reason: string;
    details: string;
    empty: string;
    counterpart: string;
    pending: string;
    confirmed: string;
    rejected: string;
    cancelled: string;
    expired: string;
  };
  company: {
    profileTitle: string;
    nameKa: string;
    nameEn: string;
    nameRu: string;
    descKa: string;
    city: string;
    address: string;
    nbg: string;
    save: string;
    saved: string;
    ratesTitle: string;
    buyRate: string;
    sellRate: string;
    min: string;
    max: string;
    active: string;
    addRate: string;
    nextTitle: string;
    nextRates: string;
    nextWallet: string;
    nextProfile: string;
    missingCompany: string;
  };
  stats: {
    title: string;
    volume: string;
    requests: string;
    confirmed: string;
    rejected: string;
    pending: string;
    wallets: string;
  };
  admin: {
    title: string;
    users: string;
    companies: string;
    requests: string;
    ledger: string;
    messages: string;
    settings: string;
    translations: string;
    approve: string;
    suspend: string;
    reject: string;
    makeAdmin: string;
  };
  common: {
    save: string;
    cancel: string;
    loading: string;
    error: string;
    success: string;
    back: string;
    view: string;
    all: string;
    search: string;
  };
  errors: {
    generic: string;
    auth: string;
    insufficient: string;
    companyFunds: string;
    rateMissing: string;
    notPending: string;
    belowMin: string;
    aboveMax: string;
  };
};

export const en: Messages = {
  brand: "კურსი",
  brandEn: "Kursi",
  nav: {
    home: "Home",
    rates: "Rates",
    about: "About",
    contact: "Contact",
    login: "Log in",
    register: "Sign up",
    dashboard: "Dashboard",
    menu: "Menu",
  },
  footer: {
    tagline:
      "A currency-exchange marketplace for Georgia. Companies publish rates, clients pick the best offer.",
    legal: "Legal",
    terms: "Terms & conditions",
    privacy: "Privacy",
    contact: "Contact",
    copyright: "© {year} Kursi. All rights reserved.",
    madeIn: "Made in Tbilisi",
  },
  home: {
    kicker: "Georgia’s exchange marketplace",
    title: "Compare the rate. Exchange with trust.",
    body: "Clients see every approved office’s buy and sell prices, pick one, and send a request. The company confirms or rejects — both sides then get the full deal details.",
    ctaRates: "View rates",
    ctaRegister: "Get started",
    howTitle: "How it works",
    how1t: "Create an account",
    how1d: "Join as a client or an exchange company. Companies go live after admin approval.",
    how2t: "Fund a wallet and pick a rate",
    how2d: "Deposits are a manual amount for now. Payment rails come later.",
    how3t: "Request and confirm",
    how3d: "The company is notified. After confirmation both parties see the full information.",
    stat1: "8",
    stat1l: "Currencies",
    stat2: "3",
    stat2l: "Languages",
    stat3: "15m",
    stat3l: "Quote lifetime",
    marketTitle: "Built for the Georgian market",
    marketBody:
      "Rates are quoted against the lari, the way Tbilisi offices do it. The ruble is per 100 units. Kursi is an intermediary — the registered company completes the exchange.",
  },
  about: {
    title: "About Kursi",
    body1:
      "Kursi is a digital square where exchange companies publish buy and sell rates, and clients compare offers and request an exchange.",
    body2:
      "We are not a bank and not an NBG-registered exchange point. The approved company executes the trade. Non-cash FX in Georgia has extra licensing rules.",
    body3:
      "In this version deposits and withdrawals are typed amounts — internal bookkeeping, not a payment institution. Georgian payment providers will follow.",
  },
  contact: {
    title: "Contact us",
    body: "Questions, partnerships, or support — write to us. We reply during business hours.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    sent: "Message sent. Thank you.",
  },
  terms: {
    title: "Terms and conditions",
    updated: "Updated September 2026",
    body: `1. Platform. Kursi is an information and matching service connecting clients with currency-exchange companies.

2. Parties. Client and company are responsible for the legality of the exchange, identification, and AML/CFT duties. The company must be authorised under Georgian law.

3. Rates. A published rate is the company’s offer. A request locks a quote for 15 minutes. The company may confirm or reject.

4. Balances. In this version a deposit is a manually entered figure and does not mean Kursi received or safeguards real funds.

5. Disclaimer. The platform does not guarantee a favourable rate or that a company will perform. Disputes are between the parties.

6. Accounts. You must provide accurate data. An admin may suspend an account or company.

7. Law. Georgian law applies. Venue: Tbilisi.`,
  },
  privacy: {
    title: "Privacy policy",
    updated: "Updated September 2026",
    body: `We collect name, email, phone, company details, wallet and exchange history to operate the service.

Data is stored in Supabase. We do not sell personal data.

After a confirmed exchange, both parties see each other’s contact details to finish the deal.

You may request account deletion at hello@kursi.ge. Legally required records may be kept for a statutory period.`,
  },
  rates: {
    title: "Organisation rates",
    body: "Buy — the company buys foreign currency from you. Sell — the company sells foreign currency to you.",
    company: "Company",
    city: "City",
    buy: "Buy",
    sell: "Sell",
    updated: "Updated",
    exchange: "Exchange",
    empty: "No approved company has published rates yet.",
    bestBuy: "Best buy",
    bestSell: "Best sell",
    filterCurrency: "Currency",
    allCurrencies: "All",
    sort: "Sort",
    sortBuy: "Best buy",
    sortSell: "Best sell",
    sortCompany: "Company",
    sortUpdated: "Updated",
    filterEmpty: "No rates for this currency.",
  },
  auth: {
    loginTitle: "Log in",
    registerTitle: "Create an account",
    email: "Email",
    password: "Password",
    fullName: "Full name",
    phone: "Phone",
    companyName: "Company name",
    role: "Account type",
    roleClient: "Client",
    roleCompany: "Exchange company",
    submitLogin: "Log in",
    submitRegister: "Create account",
    noAccount: "No account yet?",
    hasAccount: "Already registered?",
    checkEmail: "Check your email to confirm the account.",
    emailNotConfirmed:
      "This email is not confirmed yet. Run supabase/confirm_emails.sql in the SQL Editor, then log in again.",
    rateLimit:
      "Too many signup emails. Wait a minute, or run supabase/confirm_emails.sql and log in with an existing account.",
  },
  app: {
    overview: "Overview",
    wallet: "Wallet",
    exchange: "Exchange",
    requests: "Requests",
    stats: "Statistics",
    rates: "Rates",
    profile: "Profile",
    logout: "Log out",
    notifications: "Notifications",
    markRead: "Mark read",
    noNotifications: "No notifications",
    pendingBanner:
      "Your company is waiting for admin approval. Rates stay private until you are approved.",
    rejectedBanner: "This company was rejected or suspended. Please contact us.",
  },
  wallet: {
    title: "Wallet",
    available: "Available",
    reserved: "Reserved",
    deposit: "Deposit",
    withdraw: "Withdraw",
    amount: "Amount",
    currency: "Currency",
    history: "History",
    empty: "No balances yet. Deposit an amount to start.",
    confirmDeposit: "Add funds",
    confirmWithdraw: "Withdraw funds",
  },
  wizard: {
    title: "Exchange request",
    step1: "Currencies",
    step2: "Company",
    step3: "Confirm",
    from: "You give",
    to: "You receive",
    amount: "Amount",
    company: "Company",
    note: "Note (optional)",
    review: "Review the quote",
    youGive: "You give",
    youGet: "You receive",
    rate: "Rate",
    submit: "Send request",
    back: "Back",
    next: "Next",
    gelOnly: "In this version one side of the pair must be GEL.",
  },
  request: {
    code: "Code",
    status: "Status",
    created: "Created",
    expires: "Expires",
    confirm: "Confirm",
    reject: "Reject",
    cancel: "Cancel",
    reason: "Reason",
    details: "Deal details",
    empty: "No requests yet.",
    counterpart: "Counterparty",
    pending: "Pending",
    confirmed: "Confirmed",
    rejected: "Rejected",
    cancelled: "Cancelled",
    expired: "Expired",
  },
  company: {
    profileTitle: "Company profile",
    nameKa: "Name (Georgian)",
    nameEn: "Name (English)",
    nameRu: "Name (Russian)",
    descKa: "Description",
    city: "City",
    address: "Address",
    nbg: "NBG registration number",
    save: "Save",
    saved: "Saved",
    ratesTitle: "Your rates",
    buyRate: "Buy rate",
    sellRate: "Sell rate",
    min: "Min (FX)",
    max: "Max (FX)",
    active: "Active",
    addRate: "Add rate",
    nextTitle: "Get started",
    nextRates: "Publish buy and sell rates",
    nextWallet: "Deposit currency into the wallet",
    nextProfile: "Complete the company profile",
    missingCompany:
      "Your company record is not in the database yet. Run supabase/schema.sql in the SQL Editor, then reload.",
  },
  stats: {
    title: "Statistics",
    volume: "Volume",
    requests: "Requests",
    confirmed: "Confirmed",
    rejected: "Rejected",
    pending: "Pending",
    wallets: "Wallets",
  },
  admin: {
    title: "Admin",
    users: "Users",
    companies: "Companies",
    requests: "Transactions",
    ledger: "Ledger",
    messages: "Messages",
    settings: "Settings",
    translations: "Copy",
    approve: "Approve",
    suspend: "Suspend",
    reject: "Reject",
    makeAdmin: "Make admin",
  },
  common: {
    save: "Save",
    cancel: "Cancel",
    loading: "Loading…",
    error: "Error",
    success: "Success",
    back: "Back",
    view: "View",
    all: "All",
    search: "Search",
  },
  errors: {
    generic: "Something went wrong. Try again.",
    auth: "Email or password is incorrect.",
    insufficient: "Insufficient balance.",
    companyFunds: "The company does not have enough currency to confirm.",
    rateMissing: "No rate for this pair.",
    notPending: "This request is no longer pending.",
    belowMin: "Amount is below this company’s minimum for that currency.",
    aboveMax: "Amount is above this company’s maximum for that currency.",
  },
};

export const ru: Messages = {
  brand: "კურსი",
  brandEn: "Kursi",
  nav: {
    home: "Главная",
    rates: "Курсы",
    about: "О нас",
    contact: "Контакты",
    login: "Вход",
    register: "Регистрация",
    dashboard: "Кабинет",
    menu: "Меню",
  },
  footer: {
    tagline:
      "Биржа обмена валюты для рынка Грузии. Компании публикуют курс, клиенты выбирают лучшее предложение.",
    legal: "Правовая информация",
    terms: "Условия использования",
    privacy: "Конфиденциальность",
    contact: "Контакты",
    copyright: "© {year} Kursi. Все права защищены.",
    madeIn: "Сделано в Тбилиси",
  },
  home: {
    kicker: "Валютная площадка Грузии",
    title: "Сравни курс. Меняй с доверием.",
    body: "Клиенты видят курсы всех одобренных пунктов, выбирают один и отправляют заявку. Компания подтверждает или отклоняет — обе стороны получают полные данные сделки.",
    ctaRates: "Смотреть курсы",
    ctaRegister: "Начать",
    howTitle: "Как это работает",
    how1t: "Создайте аккаунт",
    how1d: "Клиент или обменный пункт. Компанию публикует админ после проверки.",
    how2t: "Пополните кошелёк и выберите курс",
    how2d: "Пока депозит вводится вручную. Платёжные системы добавим позже.",
    how3t: "Заявка и подтверждение",
    how3d: "Компания получает уведомление. После подтверждения видны все детали.",
    stat1: "8",
    stat1l: "Валют",
    stat2: "3",
    stat2l: "Языка",
    stat3: "15м",
    stat3l: "Срок котировки",
    marketTitle: "Для грузинского рынка",
    marketBody:
      "Курсы к лари — как в тбилисских пунктах. Рубль считается за 100 единиц. Kursi — посредник: обмен проводит зарегистрированная компания.",
  },
  about: {
    title: "О платформе",
    body1:
      "Kursi — цифровая площадка, где обменные компании публикуют курсы покупки и продажи, а клиенты сравнивают предложения и отправляют заявку.",
    body2:
      "Мы не банк и не пункт обмена, зарегистрированный НБГ. Сделку проводит одобренная компания. Безналичный обмен в Грузии требует отдельного разрешения.",
    body3:
      "В этой версии депозит и вывод — введённые вручную суммы, внутренний учёт, а не платёжная организация. Грузинские платежи появятся позже.",
  },
  contact: {
    title: "Контакты",
    body: "Вопросы, партнёрство или поддержка — напишите нам. Отвечаем в рабочие часы.",
    name: "Имя",
    email: "Эл. почта",
    message: "Сообщение",
    send: "Отправить",
    sent: "Сообщение отправлено. Спасибо.",
  },
  terms: {
    title: "Условия использования",
    updated: "Обновлено в сентябре 2026",
    body: `1. Платформа. Kursi — информационный и посреднический сервис между клиентами и обменными компаниями.

2. Стороны. Клиент и компания отвечают за законность обмена, идентификацию и AML/CFT. Компания должна быть уполномочена по праву Грузии.

3. Курсы. Опубликованный курс — оферта компании. Заявка фиксирует котировку на 15 минут. Компания может подтвердить или отклонить.

4. Баланс. В этой версии депозит — введённое число и не означает, что платформа приняла или хранит реальные деньги.

5. Отказ. Платформа не гарантирует выгодный курс и исполнение компанией. Споры решаются между сторонами.

6. Аккаунт. Указывайте достоверные данные. Админ может приостановить аккаунт или компанию.

7. Право. Применяется право Грузии. Место рассмотрения — Тбилиси.`,
  },
  privacy: {
    title: "Политика конфиденциальности",
    updated: "Обновлено в сентябре 2026",
    body: `Мы собираем имя, почту, телефон, реквизиты компании, историю балансов и обменов для работы сервиса.

Данные хранятся в Supabase. Мы не продаём персональные данные.

После подтверждённого обмена стороны видят контакты друг друга, чтобы завершить сделку.

Удаление аккаунта: hello@kursi.ge. Обязательный учёт может храниться установленный законом срок.`,
  },
  rates: {
    title: "Курсы организаций",
    body: "Покупка — компания покупает валюту у вас. Продажа — компания продаёт вам валюту.",
    company: "Компания",
    city: "Город",
    buy: "Покупка",
    sell: "Продажа",
    updated: "Обновлено",
    exchange: "Обмен",
    empty: "Одобренные компании ещё не опубликовали курсы.",
    bestBuy: "Лучшая покупка",
    bestSell: "Лучшая продажа",
    filterCurrency: "Валюта",
    allCurrencies: "Все",
    sort: "Сортировка",
    sortBuy: "Лучшая покупка",
    sortSell: "Лучшая продажа",
    sortCompany: "Компания",
    sortUpdated: "Обновлено",
    filterEmpty: "По этой валюте курсов нет.",
  },
  auth: {
    loginTitle: "Вход",
    registerTitle: "Регистрация",
    email: "Эл. почта",
    password: "Пароль",
    fullName: "Имя и фамилия",
    phone: "Телефон",
    companyName: "Название компании",
    role: "Тип аккаунта",
    roleClient: "Клиент",
    roleCompany: "Обменная компания",
    submitLogin: "Войти",
    submitRegister: "Создать",
    noAccount: "Нет аккаунта?",
    hasAccount: "Уже есть аккаунт?",
    checkEmail: "Проверьте почту для подтверждения.",
    emailNotConfirmed:
      "Почта ещё не подтверждена. Выполните supabase/confirm_emails.sql в SQL Editor и войдите снова.",
    rateLimit:
      "Слишком много писем регистрации. Подождите минуту или выполните supabase/confirm_emails.sql и войдите существующим аккаунтом.",
  },
  app: {
    overview: "Обзор",
    wallet: "Кошелёк",
    exchange: "Обмен",
    requests: "Заявки",
    stats: "Статистика",
    rates: "Курсы",
    profile: "Профиль",
    logout: "Выход",
    notifications: "Уведомления",
    markRead: "Прочитано",
    noNotifications: "Нет уведомлений",
    pendingBanner:
      "Компания ждёт одобрения админа. Курсы не публикуются, пока вас не подтвердят.",
    rejectedBanner: "Заявка компании отклонена или приостановлена. Свяжитесь с нами.",
  },
  wallet: {
    title: "Кошелёк",
    available: "Доступно",
    reserved: "Резерв",
    deposit: "Пополнить",
    withdraw: "Вывести",
    amount: "Сумма",
    currency: "Валюта",
    history: "История",
    empty: "Баланс пуст. Внесите сумму, чтобы начать.",
    confirmDeposit: "Внести",
    confirmWithdraw: "Вывести",
  },
  wizard: {
    title: "Заявка на обмен",
    step1: "Валюты",
    step2: "Компания",
    step3: "Подтверждение",
    from: "Отдаёте",
    to: "Получаете",
    amount: "Сумма",
    company: "Компания",
    note: "Комментарий (необязательно)",
    review: "Проверьте котировку",
    youGive: "Вы отдаёте",
    youGet: "Вы получаете",
    rate: "Курс",
    submit: "Отправить заявку",
    back: "Назад",
    next: "Далее",
    gelOnly: "В этой версии одна из валют должна быть GEL.",
  },
  request: {
    code: "Код",
    status: "Статус",
    created: "Создано",
    expires: "Истекает",
    confirm: "Подтвердить",
    reject: "Отклонить",
    cancel: "Отменить",
    reason: "Причина",
    details: "Детали сделки",
    empty: "Заявок пока нет.",
    counterpart: "Вторая сторона",
    pending: "Ожидание",
    confirmed: "Подтверждено",
    rejected: "Отклонено",
    cancelled: "Отменено",
    expired: "Истекло",
  },
  company: {
    profileTitle: "Профиль компании",
    nameKa: "Название (груз.)",
    nameEn: "Название (англ.)",
    nameRu: "Название (рус.)",
    descKa: "Описание",
    city: "Город",
    address: "Адрес",
    nbg: "Регистрационный номер НБГ",
    save: "Сохранить",
    saved: "Сохранено",
    ratesTitle: "Ваши курсы",
    buyRate: "Покупка",
    sellRate: "Продажа",
    min: "Мин. (FX)",
    max: "Макс. (FX)",
    active: "Активен",
    addRate: "Добавить курс",
    nextTitle: "С чего начать",
    nextRates: "Опубликовать курсы покупки и продажи",
    nextWallet: "Внести валюту на кошелёк",
    nextProfile: "Заполнить профиль компании",
    missingCompany:
      "Запись компании ещё не создана. Выполните supabase/schema.sql в SQL Editor и обновите страницу.",
  },
  stats: {
    title: "Статистика",
    volume: "Оборот",
    requests: "Заявки",
    confirmed: "Подтверждено",
    rejected: "Отклонено",
    pending: "Ожидание",
    wallets: "Кошельки",
  },
  admin: {
    title: "Админ",
    users: "Пользователи",
    companies: "Компании",
    requests: "Транзакции",
    ledger: "Журнал",
    messages: "Сообщения",
    settings: "Настройки",
    translations: "Тексты",
    approve: "Одобрить",
    suspend: "Приостановить",
    reject: "Отклонить",
    makeAdmin: "Сделать админом",
  },
  common: {
    save: "Сохранить",
    cancel: "Отмена",
    loading: "Загрузка…",
    error: "Ошибка",
    success: "Готово",
    back: "Назад",
    view: "Открыть",
    all: "Все",
    search: "Поиск",
  },
  errors: {
    generic: "Что-то пошло не так. Попробуйте снова.",
    auth: "Неверная почта или пароль.",
    insufficient: "Недостаточно средств.",
    companyFunds: "У компании недостаточно валюты для подтверждения.",
    rateMissing: "Нет курса по этой паре.",
    notPending: "Заявка уже не в ожидании.",
    belowMin: "Сумма ниже минимума компании по этой валюте.",
    aboveMax: "Сумма выше максимума компании по этой валюте.",
  },
};

const byLocale: Record<Locale, Messages> = { ka, en, ru };

export function getMessages(locale: Locale): Messages {
  return byLocale[locale];
}

export function t(
  messages: Messages,
  path: string,
  vars?: Record<string, string | number>,
): string {
  const parts = path.split(".");
  let cur: unknown = messages;
  for (const part of parts) {
    if (cur && typeof cur === "object" && part in cur) {
      cur = (cur as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }
  if (typeof cur !== "string") return path;
  let value = cur;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replaceAll(`{${k}}`, String(v));
    }
  }
  return value;
}

export function statusLabel(messages: Messages, status: string) {
  const map: Record<string, string> = {
    pending: messages.request.pending,
    confirmed: messages.request.confirmed,
    rejected: messages.request.rejected,
    cancelled: messages.request.cancelled,
    expired: messages.request.expired,
  };
  return map[status] ?? status;
}
