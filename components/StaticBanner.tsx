export default function StaticBanner() {
  if (process.env.NEXT_PUBLIC_STATIC !== "1") return null;
  return (
    <div className="no-print border-b border-warn/30 bg-warn/10 px-6 py-2 text-center text-xs text-warn">
      Static deployment — to use AI generation, add a free Google Gemini key in
      Settings, or load a worked sample from the landing page.
    </div>
  );
}
