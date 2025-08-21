export function getCustomColor(text: string) {
  const result: Record<string, string> = {};
  text.split(',').map(p => p.trim()).forEach(pair => {
    const [key, value] = pair.split(':').map(s => s.trim());
    if (key && value) result[key] = value;
  });

  return result;
}
