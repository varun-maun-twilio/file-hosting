async function loadWebchat(configFile) {
  
    try {
        
        const config = await fetch(`./config/${configFile}.json`).then(d => d.json()).catch(e => { });

        const params = {
            skillsNeeded: 'ES_CAU_FR_BO', 
            brand: config?.routing.brand, 
            country: config?.routing.country
        };

        request =  ( new URLSearchParams( params ) ).toString();
    
        const isChatActive = await fetch('https://serverless-bsh-8921-dev.twil.io/features/control-interactions-chat/validateAttendanceChat?' + request).then(d => d.json()).catch(e => { });

        console.log({config});
        console.log({isChatActive});

        if (isChatActive?.data.chatIsActive === true) {
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
        }
    } catch (e) { console.error(e) }

}