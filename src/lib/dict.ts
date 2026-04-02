export const dictionaries = {
  "dict-visitor-status": [
    { label: "待签到", value: "pending", color: "amber" },
    { label: "已签到", value: "checked_in", color: "blue" },
    { label: "已签退", value: "checked_out", color: "green" },
    { label: "已取消", value: "cancelled", color: "gray" },
  ],
  "dict-visit-type": [
    { label: "商务拜访", value: "business", color: "blue" },
    { label: "面试", value: "interview", color: "violet" },
    { label: "快递", value: "delivery", color: "amber" },
    { label: "会议", value: "meeting", color: "emerald" },
  ],
  "dict-employee-status": [
    { label: "在职", value: "active", color: "green" },
    { label: "离职", value: "inactive", color: "gray" },
  ],
} as const;

export function getDictOptions(dictId: string) {
  return (dictionaries[dictId as keyof typeof dictionaries] ?? []) as {
    label: string;
    value: string;
    color: string;
  }[];
}

export function getDictLabel(dictId: string, value: string): string {
  const options = getDictOptions(dictId);
  return options.find((o) => o.value === value)?.label ?? value;
}

export function getDictColor(dictId: string, value: string): string | undefined {
  const options = getDictOptions(dictId);
  return options.find((o) => o.value === value)?.color;
}
