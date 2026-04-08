export default function StaticBanner() {
  if (process.env.NEXT_PUBLIC_STATIC !== "1") return null;
  return (
    <div className="no-print border-b border-warn/30 bg-warn/10 px-6 py-2 text-center text-xs text-warn">
      Demo mode — AI generation is disabled on this static deployment. Add points
      manually, or run the tool locally with an Anthropic API key for the full experience.
    </div>
  );
}
