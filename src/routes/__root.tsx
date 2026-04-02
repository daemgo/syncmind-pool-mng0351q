import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Sidebar } from "@/components/layout/sidebar";
import "@/styles/globals.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "访客应用系统" },
      { name: "description", content: "访客预约、签到、统计管理系统" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="zh-CN">
      <head>
        <HeadContent />
      </head>
      <body
        className="antialiased"
        style={{
          fontFamily: "'Inter', 'Noto Sans SC', system-ui, sans-serif",
        }}
      >
        <Sidebar />
        <div className="md:ml-60 min-h-screen">
          <Outlet />
        </div>
        <Scripts />
        <NavBridgeScript />
      </body>
    </html>
  );
}

function NavBridgeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function() {
  if (window === window.parent) return;
  var notify = function() {
    window.parent.postMessage({
      type: 'preview-navigation',
      pathname: location.pathname,
      url: location.href
    }, '*');
  };
  notify();
  var origPush = history.pushState;
  var origReplace = history.replaceState;
  history.pushState = function() {
    origPush.apply(this, arguments);
    notify();
  };
  history.replaceState = function() {
    origReplace.apply(this, arguments);
    notify();
  };
  window.addEventListener('popstate', notify);
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'preview-command') {
      if (e.data.command === 'back') history.back();
      if (e.data.command === 'forward') history.forward();
      if (e.data.command === 'navigate') {
        window.location.href = e.data.url;
      }
    }
  });
})();`,
      }}
    />
  );
}
