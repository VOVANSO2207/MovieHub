import React, { useEffect, useRef } from 'react';

const Advertisement = ({ adClient, adSlot, adFormat = 'auto', adStyle = { display: 'block' }, adKey }) => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current) {
      const isAlreadyInitialized = adRef.current.getAttribute('data-adsbygoogle-status');
      if (!isAlreadyInitialized) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    }
  }, [adKey]);

  return (
    <ins className="adsbygoogle"
         ref={adRef}
         style={adStyle}
         data-ad-client={adClient}
         data-ad-slot={adSlot}
         data-ad-format={adFormat}></ins>
  );
};

export default Advertisement;
