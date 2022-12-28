async function loadWebchat(configFile) {
  
    try {
        const config = await fetch(`./config/uk/${configFile}.json`).then(d => d.json()).catch(e => { });
        console.error({config})

        const rootElement = document.getElementById("twilio-webchat-widget-root");

        rootElement.style.position="relative";
        rootElement.style.zIndex = config.zIndex || 99999;


        Twilio.initWebchat({
		serverUrl: "https://twilio-webchat-serverless-7675-dev.twil.io",
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
