async function loadWebchat(configFile) {
  
    try {
        const config = await fetch(`https://d3nhindhyt0fdr.cloudfront.net/config/${configFile}.json`).then(d => d.json()).catch(e => { });
        console.error({config});
        Twilio.initWebchat({
		serverUrl: "https://flex-webchat-dev-2040.twil.io",
            theme: {
                isLight: true,
                overrides: {
                    backgroundColors: {
                        colorBackgroundPrimary: config?.primaryColor || "#005691",
                        colorBackgroundPrimaryStronger: config?.primaryColor || "#005691",
                    }
                }
            },
            fileAttachment:config?.fileAttachment,
            configOverrides: config
        })
    } catch (e) { console.error(e) }

}
