// Account types - single source for the homepage preview, the Account Types
// page and the comparison table. Per the client brief: Standard, ECN, PRO,
// VIP, Islamic; NO per-account minimum deposit or leverage tier is shown -
// leverage is up to 1:1000 on every account (Islamic included) and the
// general minimum deposit / withdrawal is $100.
export const ACCOUNTS = [
  {
    id: "standard",
    name: "Standard",
    tag: "Most popular",
    desc: "Simple pricing with no commission. The right start for most traders.",
    spread: "from 1.0 pip",
    commission: "No commission",
    swap: "Swap-free option",
  },
  {
    id: "ecn",
    name: "ECN",
    tag: "Tightest spreads",
    featured: true,
    desc: "Raw spreads from 0.0 pips with a small commission per lot. Built for active traders and scalpers.",
    spread: "from 0.0 pips",
    commission: "$3.50 per side, per lot",
    swap: "Swap-free option",
  },
  {
    id: "pro",
    name: "PRO",
    tag: "For professionals",
    desc: "Near-raw spreads with no commission, for larger balances and higher volume.",
    spread: "from 0.1 pips",
    commission: "No commission",
    swap: "Swap-free option",
  },
  {
    id: "vip",
    name: "VIP",
    tag: "Premium",
    desc: "Tailored pricing and a dedicated account manager for high-volume traders.",
    spread: "Tailored pricing",
    commission: "Tailored",
    swap: "Swap-free option",
  },
  {
    id: "islamic",
    name: "Islamic",
    tag: "Swap-free",
    desc: "Swap-free trading with no overnight interest, in line with Sharia principles.",
    spread: "As per pricing plan",
    commission: "No interest charged",
    swap: "Always swap-free",
  },
];

export const ACCOUNT_NOTE =
  "Leverage up to 1:1000 on every account type, including Islamic (subject to account, instrument and trading conditions). Minimum deposit $100 · minimum withdrawal $100.";
