import { WalletPanel } from "@/components/WalletPanel";
import { getMessages } from "@/i18n/messages";
import { requireRole } from "@/lib/auth";
import { getCurrencies, getLedger, getWallets } from "@/lib/data";
import { readLocale } from "@/lib/locale-params";

export default async function ClientWalletPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await readLocale(params);
  const { profile } = await requireRole(locale, ["client"]);
  const m = getMessages(locale);
  const wallets = await getWallets("user", profile!.id);
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
      forCompany={false}
      back="/dashboard/wallet"
    />
  );
}
