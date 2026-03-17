/**
 * WireframeFrame — wraps content in a browser/app window chrome
 * to make wireframes visually read as "app mockups" instead of page cards.
 */

interface WireframeFrameProps {
  title: string;
  url?: string;
  children: React.ReactNode;
}

export default function WireframeFrame({ title, url, children }: WireframeFrameProps) {
  return (
    <div className="mb-10 rounded-xl overflow-hidden shadow-xl shadow-black/30 border border-gray-600/50">
      {/* macOS-style title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 border-b border-gray-700">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        {/* Title */}
        <span className="text-xs text-gray-400 ml-2 font-medium">{title}</span>
        {/* URL bar */}
        {url && (
          <div className="ml-auto flex items-center gap-1.5 bg-gray-900/60 rounded-md px-3 py-1 max-w-[50%]">
            <svg className="w-3 h-3 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs text-gray-500 truncate font-mono">{url}</span>
          </div>
        )}
      </div>
      {/* Content */}
      {children}
    </div>
  );
}
