import { WalletPanel } from "@/components/WalletPanel";
import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { getCurrencies, getLedger, getWallets } from "@/lib/data";
import { readLocale } from "@/lib/locale-params";

export default async function CompanyWalletPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await readLocale(params);
  const { company } = await requireRole(locale, ["company"]);
  const m = getMessages(locale);
  const wallets = company ? await getWallets("company", company.id) : [];
  const [currencies, ledger] = await Promise.all([
    getCurrencies(),
    getLedger(wallets.map((w) => w.id)),
  ]);

  return (
    <WalletPanel
      locale={locale}
      messages={m}
      wallets={wallets}
      currencies={currencies}
      ledger={ledger}
      forCompany
      back="/company/wallet"
    />
  );
}
