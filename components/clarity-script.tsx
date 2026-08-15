import Script from 'next/script'

/**
 * Microsoft Clarity oturum kaydı ve ısı haritası scripti.
 * Yalnızca NEXT_PUBLIC_CLARITY_ID tanımlıysa yüklenir.
 */
export function ClarityScript() {
  const id = process.env.NEXT_PUBLIC_CLARITY_ID
  if (!id) return null

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window,document,"clarity","script","${id}");`,
      }}
    />
  )
}
